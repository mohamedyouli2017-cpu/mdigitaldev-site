/**
 * POST /api/contact
 * ─────────────────────────────────────────────────────────────────
 * Handles smart booking form submissions.
 *
 * Flow:
 *   1. Rate-limit: 5 requests / hour per IP
 *   2. Sanitise + validate all fields
 *   3. Forward payload to n8n webhook (if N8N_WEBHOOK_URL is set)
 *   4. Send email notification via Resend (if RESEND_API_KEY is set)
 *   5. Return success regardless of downstream failures so the UI
 *      is never broken by a missing env variable.
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

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

/* ── Route handler ─────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  /* 1 · Rate limiting — 5 per hour per IP */
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
  const budgetRange    = sanitize(raw.budgetRange,   100);
  const language       = sanitize(raw.language,       10);
  const consent        = Boolean(raw.consent);

  /* 4 · Validate required fields */
  if (!name)                  return NextResponse.json({ error: "Name is required."             }, { status: 400 });
  if (!email)                 return NextResponse.json({ error: "Email is required."            }, { status: 400 });
  if (!EMAIL_RE.test(email))  return NextResponse.json({ error: "Invalid email address."       }, { status: 400 });
  if (!businessType)          return NextResponse.json({ error: "Business type is required."   }, { status: 400 });
  if (!projectDetails)        return NextResponse.json({ error: "Project details are required."}, { status: 400 });
  if (!consent)               return NextResponse.json({ error: "Consent is required."         }, { status: 400 });

  /* 5 · Build payload */
  const payload = {
    name,
    email,
    phone:          phone          || undefined,
    businessType,
    selectedPlan:   selectedPlan   || undefined,
    projectDetails,
    budgetRange:    budgetRange    || undefined,
    timestamp:      new Date().toISOString(),
    source:         "mdigitaldev.com",
    language:       language       || "en",
  };

  console.log("[contact] New submission:", { name, email, businessType, selectedPlan });

  /* 6 · Primary: forward to n8n webhook */
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nUrl) {
    try {
      const r = await fetch(n8nUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
        signal:  AbortSignal.timeout(6_000),
      });
      if (!r.ok) console.warn("[contact] n8n webhook returned", r.status);
    } catch (err) {
      console.warn("[contact] n8n webhook error:", err);
    }
  } else {
    console.warn("[contact] N8N_WEBHOOK_URL not configured — skipping webhook.");
  }

  /* 7 · Fallback: email notification via Resend */
  const resendKey  = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "contact@mdigitaldev.com";

  if (resendKey) {
    const subject = `New inquiry: ${name} — ${selectedPlan || "plan not selected"}`;
    const text = [
      `New contact form submission from mdigitaldev.com`,
      ``,
      `Name:            ${name}`,
      `Email:           ${email}`,
      `Phone:           ${phone || "—"}`,
      `Business Type:   ${businessType}`,
      `Selected Plan:   ${selectedPlan || "—"}`,
      `Budget Range:    ${budgetRange || "—"}`,
      `Language:        ${language || "en"}`,
      `Submitted:       ${payload.timestamp}`,
      ``,
      `Project Details:`,
      projectDetails,
    ].join("\n");

    try {
      const r = await fetch("https://api.resend.com/emails", {
        method:  "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from:    "MDigitalDev <noreply@mdigitaldev.com>",
          to:      [adminEmail],
          subject,
          text,
        }),
        signal: AbortSignal.timeout(6_000),
      });
      if (!r.ok) console.warn("[contact] Resend returned", r.status, await r.text());
    } catch (err) {
      console.warn("[contact] Resend error:", err);
    }
  } else {
    console.warn("[contact] RESEND_API_KEY not configured — skipping email notification.");
  }

  return NextResponse.json(
    { success: true, remaining },
    {
      status: 200,
      headers: {
        "X-RateLimit-Limit":     "5",
        "X-RateLimit-Remaining": String(remaining),
      },
    },
  );
}
