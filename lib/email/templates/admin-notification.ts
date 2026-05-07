interface AdminNotificationProps {
  name: string;
  email: string;
  phone?: string;
  businessType?: string;
  selectedPlan: string;
  projectDetails: string;
  budgetRange?: string;
  language?: string;
  source: string;
  leadId: string;
  dashboardUrl: string;
}

const PLAN_LABELS: Record<string, string> = {
  smart_starter:       "🥉 Smart Starter ($497 + $97/mo)",
  business_auto_pilot: "🥈 Business Auto-Pilot ($1,800 + $297/mo)",
  enterprise:          "🥇 Enterprise AI Elite ($4,800 + $797/mo)",
  not_sure:            "🤔 Not Sure Yet",
};

const PLAN_EMOJI: Record<string, string> = {
  smart_starter:       "🥉",
  business_auto_pilot: "🥈",
  enterprise:          "🥇",
  not_sure:            "🤔",
};

export function adminNotificationSubject(plan: string, name: string) {
  return `${PLAN_EMOJI[plan] ?? "🎯"} New lead — ${name} (${PLAN_LABELS[plan]?.split(" ")[1] ?? plan})`;
}

export function adminNotificationHtml(p: AdminNotificationProps): string {
  const rows = [
    ["👤 Name",     p.name],
    ["📧 Email",    `<a href="mailto:${p.email}" style="color:#f97316;text-decoration:none">${p.email}</a>`],
    p.phone        ? ["📱 Phone",    `<a href="tel:${p.phone}" style="color:#f97316;text-decoration:none">${p.phone}</a>`] : null,
    p.businessType ? ["🏢 Business", p.businessType] : null,
    ["💼 Plan",     `<span style="color:#f97316;font-weight:600">${PLAN_LABELS[p.selectedPlan] ?? p.selectedPlan}</span>`],
    p.budgetRange  ? ["💰 Budget",   p.budgetRange]  : null,
    ["🌐 Language", p.language ?? "en"],
    ["📍 Source",   p.source],
  ]
    .filter((r): r is string[] => r !== null)
    .map(([label, value]) =>
      `<tr>
        <td style="color:#888;font-size:13px;padding:8px 16px 8px 0;white-space:nowrap;vertical-align:top">${label}</td>
        <td style="color:#fff;font-size:14px;padding:8px 0;font-weight:500">${value}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 16px">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#f97316,#ec4899);padding:32px;border-radius:16px 16px 0 0;text-align:center">
    <div style="font-size:40px;margin-bottom:12px">🎯</div>
    <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700">New Lead!</h1>
    <p style="color:rgba(255,255,255,.85);margin:8px 0 0;font-size:15px">Someone is interested in your services</p>
  </div>

  <!-- Body -->
  <div style="background:#1a1a1a;padding:28px;border-radius:0 0 16px 16px;color:#fff">

    <!-- Lead info table -->
    <div style="background:#111;border-radius:12px;padding:20px;border:1px solid #2a2a2a;margin-bottom:20px">
      <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </div>

    <!-- Project details -->
    <div style="background:#111;border-radius:12px;padding:20px;border:1px solid #2a2a2a;margin-bottom:24px">
      <p style="color:#f97316;margin:0 0 10px;font-size:15px;font-weight:600">📝 Project Details</p>
      <p style="color:#ccc;line-height:1.65;margin:0;font-size:14px;white-space:pre-wrap">${p.projectDetails}</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin:28px 0">
      <a href="${p.dashboardUrl}"
         style="display:inline-block;background:linear-gradient(135deg,#f97316,#ec4899);color:#fff;padding:14px 32px;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px">
        View in Dashboard →
      </a>
    </div>

    <!-- Tip -->
    <div style="background:rgba(249,115,22,.1);border-left:3px solid #f97316;padding:14px 16px;border-radius:4px">
      <p style="color:#fbbf24;margin:0;font-size:13px">
        💡 <strong>Respond within 5 minutes</strong> to maximise conversion rate!
      </p>
    </div>

    <!-- Meta -->
    <p style="color:#555;font-size:11px;margin:20px 0 0;text-align:center">
      Lead ID: ${p.leadId} &nbsp;|&nbsp; ${new Date().toUTCString()}
    </p>
  </div>

  <p style="color:#444;font-size:11px;text-align:center;margin-top:16px">
    MDigitalDev · mdigitaldev.com · Powered by Resend
  </p>
</div>
</body>
</html>`;
}
