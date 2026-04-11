/**
 * POST /api/contact
 * ─────────────────────────────────────────────────────────────────
 * Accepts contact-form submissions with:
 *   • Rate limiting  — 5 requests / 60 s per IP
 *   • Input sanitisation — strips HTML tags, trims, caps length
 *   • Basic validation  — required fields + email format
 *
 * Extend the handler body to forward the sanitised data to an
 * email service (Resend, SendGrid, Nodemailer, etc.).
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

/* ── Sanitiser ─────────────────────────────────────────────────── */

/** Escapes HTML special chars and trims whitespace. Prevents XSS. */
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
  /* 1 · Rate limiting */
  const ip = (
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "unknown"
  ).trim();

  const { success, remaining, resetAt } = rateLimit(ip, 5, 60_000);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests — please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After":          String(Math.ceil((resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit":    "5",
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

  /* 3 · Sanitise inputs */
  const { name: rawName, email: rawEmail, message: rawMessage } =
    body as Record<string, unknown>;

  const name    = sanitize(rawName,    100);
  const email   = sanitize(rawEmail,   200);
  const message = sanitize(rawMessage, 2000);

  /* 4 · Validate */
  if (!name)               return NextResponse.json({ error: "Name is required."    }, { status: 400 });
  if (!email)              return NextResponse.json({ error: "Email is required."   }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  if (!message)            return NextResponse.json({ error: "Message is required." }, { status: 400 });

  /* 5 · Forward to your email service here
   *
   * Example (Resend):
   *   await resend.emails.send({
   *     from:    "portfolio@youli.dev",
   *     to:      "youliwork2023@gmail.com",
   *     subject: `New message from ${name}`,
   *     text:    `From: ${name} <${email}>\n\n${message}`,
   *   });
   */

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
