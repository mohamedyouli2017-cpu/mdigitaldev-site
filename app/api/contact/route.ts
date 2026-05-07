/**
 * POST /api/contact
 * ─────────────────────────────────────────────────────────────────
 * 1. Rate-limit: 5 requests / hour per IP
 * 2. Sanitise + validate all fields
 * 3. Save lead to Supabase
 * 4. Forward to n8n webhook (if N8N_WEBHOOK_URL is set)
 * 5. Send email notification via Resend (if RESEND_API_KEY is set)
 * 6. Return success regardless of downstream failures
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendLeadEmails } from "@/lib/email/send";

/* ── Sanitiser ─────────────────────────────────────────────────── */

function sanitize(raw: unknown, maxLength = 2000): string {
  return String(raw ?? "")
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#x27;")
    .trim()
    .slice(0, maxLength);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Plan label → DB enum ──────────────────────────────────────── */

const PLAN_MAP: Record<string, string> = {
  "smart starter":          "smart_starter",
  "business auto-pilot":    "business_auto_pilot",
  "business autopilot":     "business_auto_pilot",
  "enterprise ai elite":    "enterprise",
  "enterprise":             "enterprise",
  "not sure yet":           "not_sure",
  "not sure":               "not_sure",
  // already-normalised values pass through
  "smart_starter":          "smart_starter",
  "business_auto_pilot":    "business_auto_pilot",
  "not_sure":               "not_sure",
};

function normalisePlan(raw: string): string {
  return PLAN_MAP[raw.toLowerCase().trim()] ?? "not_sure";
}

/* ── Route handler ─────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  /* 1 · Rate limiting */
  const ip = (
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "unknown"
  ).trim();

  const { success, remaining, resetAt } = rateLimit(ip, 5, 3_600_000);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests — please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After":           String(Math.ceil((resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit":     "5",
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  /* 2 · Parse body */
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  /* 3 · Sanitise */
  const name           = sanitize(raw.name,           100);
  const email          = sanitize(raw.email,          200);
  const phone          = sanitize(raw.phone,           50);
  const businessType   = sanitize(raw.businessType,  100);
  const selectedPlan   = sanitize(raw.selectedPlan,  100);
  const projectDetails = sanitize(raw.projectDetails, 2000);
  const budgetRange    = sanitize(raw.budgetRange,    100);
  const language       = sanitize(raw.language,        10) || "en";
  const consent        = Boolean(raw.consent);

  /* 4 · Validate required fields */
  if (!name)                  return NextResponse.json({ error: "Name is required."              }, { status: 400 });
  if (!email)                 return NextResponse.json({ error: "Email is required."             }, { status: 400 });
  if (!EMAIL_RE.test(email))  return NextResponse.json({ error: "Invalid email address."        }, { status: 400 });
  if (!businessType)          return NextResponse.json({ error: "Business type is required."    }, { status: 400 });
  if (!projectDetails)        return NextResponse.json({ error: "Project details are required." }, { status: 400 });
  if (!consent)               return NextResponse.json({ error: "Consent is required."          }, { status: 400 });

  /* 5 · Save to Supabase */
  const supabase = createAdminClient();
  let leadId: string | null = null;

  try {
    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        name,
        email:           email.toLowerCase(),
        phone:           phone           || null,
        business_type:   businessType,
        selected_plan:   normalisePlan(selectedPlan),
        project_details: projectDetails,
        budget_range:    budgetRange     || null,
        language,
        source:          "website",
        status:          "new",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[contact] Supabase insert error:", dbError.message);
    } else {
      leadId = lead.id;
      // Log activity (non-blocking, best-effort)
      supabase.from("activity_log").insert({
        action:      "created",
        entity_type: "lead",
        entity_id:   leadId,
        ip_address:  ip,
        user_agent:  req.headers.get("user-agent") ?? null,
      }).then(({ error: logErr }) => {
        if (logErr) console.warn("[contact] Activity log error:", logErr.message);
      });
    }
  } catch (err) {
    // Non-fatal — don't block the response
    console.error("[contact] Supabase error:", err);
  }

  /* 6 · Build payload for downstream integrations */
  const payload = {
    name,
    email,
    phone:          phone          || undefined,
    businessType,
    selectedPlan,
    projectDetails,
    budgetRange:    budgetRange    || undefined,
    timestamp:      new Date().toISOString(),
    source:         "mdigitaldev.com",
    language,
    leadId,
  };

  console.log("[contact] New submission:", { name, email, businessType, selectedPlan, leadId });

  /* 7 · Forward to n8n webhook */
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nUrl) {
    try {
      const r = await fetch(n8nUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ event: "new_lead", ...payload }),
        signal:  AbortSignal.timeout(6_000),
      });
      if (!r.ok) console.warn("[contact] n8n webhook returned", r.status);
    } catch (err) {
      console.warn("[contact] n8n webhook error:", err);
    }
  }

  /* 8 · Email notifications via Resend (admin alert + client confirmation) */
  if (leadId) {
    sendLeadEmails({
      id:             leadId,
      name,
      email,
      phone:          phone          || null,
      businessType:   businessType   || null,
      selectedPlan:   normalisePlan(selectedPlan),
      projectDetails,
      budgetRange:    budgetRange    || null,
      language,
      source:         "website",
    }).catch(err => console.error("[contact] sendLeadEmails error:", err));
  }

  return NextResponse.json(
    { success: true, remaining, leadId },
    {
      status: 200,
      headers: {
        "X-RateLimit-Limit":     "5",
        "X-RateLimit-Remaining": String(remaining),
      },
    },
  );
}
