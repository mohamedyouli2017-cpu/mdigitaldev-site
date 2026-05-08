interface NewBookingProps {
  inviteeName: string;
  inviteeEmail: string;
  meetingTitle: string;
  scheduledAt: string;
  durationMinutes: number;
  notes?: string | null;
  meetingLink?: string | null;
  leadId?: string | null;
  dashboardUrl: string;
}

export function newBookingSubject(inviteeName: string, meetingTitle: string) {
  return `📅 New booking — ${inviteeName} (${meetingTitle})`;
}

export function newBookingHtml(p: NewBookingProps): string {
  const dateStr = new Date(p.scheduledAt).toLocaleString('en-US', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
    hour:    '2-digit',
    minute:  '2-digit',
    timeZoneName: 'short',
  });

  const rows = [
    ['👤 Name',     p.inviteeName],
    ['📧 Email',    `<a href="mailto:${p.inviteeEmail}" style="color:#f97316;text-decoration:none">${p.inviteeEmail}</a>`],
    ['📅 Date',     dateStr],
    ['⏱️ Duration', `${p.durationMinutes} minutes`],
    ['📋 Meeting',  p.meetingTitle],
    p.meetingLink
      ? ['🔗 Link', `<a href="${p.meetingLink}" style="color:#f97316;text-decoration:none">${p.meetingLink}</a>`]
      : null,
  ]
    .filter((r): r is string[] => r !== null)
    .map(([label, value]) =>
      `<tr>
        <td style="color:#888;font-size:13px;padding:8px 16px 8px 0;white-space:nowrap;vertical-align:top">${label}</td>
        <td style="color:#fff;font-size:14px;padding:8px 0;font-weight:500">${value}</td>
      </tr>`,
    )
    .join('');

  const notesSection = p.notes
    ? `<div style="background:#111;border-radius:12px;padding:20px;border:1px solid #2a2a2a;margin-bottom:24px">
        <p style="color:#f97316;margin:0 0 10px;font-size:15px;font-weight:600">📝 Booking Notes</p>
        <p style="color:#ccc;line-height:1.65;margin:0;font-size:14px;white-space:pre-wrap">${p.notes}</p>
      </div>`
    : '';

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 16px">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#7c3aed,#2563eb);padding:32px;border-radius:16px 16px 0 0;text-align:center">
    <div style="font-size:40px;margin-bottom:12px">📅</div>
    <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700">New Booking!</h1>
    <p style="color:rgba(255,255,255,.85);margin:8px 0 0;font-size:15px">Someone just booked a meeting via Calendly</p>
  </div>

  <!-- Body -->
  <div style="background:#1a1a1a;padding:28px;border-radius:0 0 16px 16px;color:#fff">

    <!-- Meeting info table -->
    <div style="background:#111;border-radius:12px;padding:20px;border:1px solid #2a2a2a;margin-bottom:20px">
      <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </div>

    ${notesSection}

    <!-- CTA -->
    <div style="text-align:center;margin:28px 0">
      <a href="${p.dashboardUrl}"
         style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;padding:14px 32px;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px">
        View in Dashboard →
      </a>
    </div>

    <!-- Tip -->
    <div style="background:rgba(124,58,237,.1);border-left:3px solid #7c3aed;padding:14px 16px;border-radius:4px">
      <p style="color:#a78bfa;margin:0;font-size:13px">
        💡 <strong>Prepare ahead</strong> — review the booking notes and tailor your discovery call!
      </p>
    </div>

    <!-- Meta -->
    <p style="color:#555;font-size:11px;margin:20px 0 0;text-align:center">
      ${p.leadId ? `Lead ID: ${p.leadId} &nbsp;|&nbsp; ` : ''}${new Date().toUTCString()}
    </p>
  </div>

  <p style="color:#444;font-size:11px;text-align:center;margin-top:16px">
    MDigitalDev · mdigitaldev.com · Powered by Resend
  </p>
</div>
</body>
</html>`;
}
