import { Resend } from "resend";
import { adminNotificationHtml, adminNotificationSubject } from "./templates/admin-notification";
import { clientConfirmationHtml, clientConfirmationSubject } from "./templates/client-confirmation";
import { newBookingHtml, newBookingSubject } from "./templates/new-booking";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADMIN  = "MDigitalDev <notifications@mdigitaldev.com>";
const FROM_CLIENT = "Mohamed at MDigitalDev <contact@mdigitaldev.com>";
const ADMIN_TO    = process.env.ADMIN_EMAIL ?? "contact@mdigitaldev.com";
const APP_URL     = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.mdigitaldev.com";

export interface LeadEmailData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  businessType?: string | null;
  selectedPlan: string;
  projectDetails: string;
  budgetRange?: string | null;
  language?: string | null;
  source?: string | null;
}

export async function sendLeadEmails(lead: LeadEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping");
    return { adminSent: false, clientSent: false };
  }

  const dashboardUrl = `${APP_URL}/admin/leads`;
  const lang = lead.language ?? "en";

  const [adminResult, clientResult] = await Promise.allSettled([
    resend.emails.send({
      from:    FROM_ADMIN,
      to:      ADMIN_TO,
      replyTo: lead.email,
      subject: adminNotificationSubject(lead.selectedPlan, lead.name),
      html:    adminNotificationHtml({
        name:           lead.name,
        email:          lead.email,
        phone:          lead.phone          ?? undefined,
        businessType:   lead.businessType   ?? undefined,
        selectedPlan:   lead.selectedPlan,
        projectDetails: lead.projectDetails,
        budgetRange:    lead.budgetRange    ?? undefined,
        language:       lang,
        source:         lead.source         ?? "website",
        leadId:         lead.id,
        dashboardUrl,
      }),
      tags: [
        { name: "type", value: "admin_notification" },
        { name: "plan", value: lead.selectedPlan },
      ],
    }),

    resend.emails.send({
      from:    FROM_CLIENT,
      to:      lead.email,
      replyTo: ADMIN_TO,
      subject: clientConfirmationSubject(lang),
      html:    clientConfirmationHtml({
        name:         lead.name,
        selectedPlan: lead.selectedPlan,
        language:     lang,
      }),
      tags: [
        { name: "type",     value: "client_confirmation" },
        { name: "language", value: lang },
      ],
    }),
  ]);

  const adminSent  = adminResult.status  === "fulfilled" && !adminResult.value.error;
  const clientSent = clientResult.status === "fulfilled" && !clientResult.value.error;

  if (adminResult.status  === "rejected") console.error("[email] Admin send failed:",  adminResult.reason);
  if (clientResult.status === "rejected") console.error("[email] Client send failed:", clientResult.reason);

  if (adminResult.status  === "fulfilled" && adminResult.value.error)
    console.error("[email] Admin Resend error:",  adminResult.value.error);
  if (clientResult.status === "fulfilled" && clientResult.value.error)
    console.error("[email] Client Resend error:", clientResult.value.error);

  console.log(`[email] admin=${adminSent} client=${clientSent}`);
  return { adminSent, clientSent };
}

export interface BookingEmailData {
  inviteeName: string;
  inviteeEmail: string;
  meetingTitle: string;
  scheduledAt: string;
  durationMinutes: number;
  notes?: string | null;
  meetingLink?: string | null;
  leadId?: string | null;
}

export async function sendBookingNotification(booking: BookingEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping booking notification");
    return { sent: false };
  }

  const dashboardUrl = `${APP_URL}/admin/meetings`;

  const result = await resend.emails.send({
    from:    FROM_ADMIN,
    to:      ADMIN_TO,
    replyTo: booking.inviteeEmail,
    subject: newBookingSubject(booking.inviteeName, booking.meetingTitle),
    html:    newBookingHtml({
      ...booking,
      dashboardUrl,
    }),
    tags: [{ name: "type", value: "booking_notification" }],
  });

  const sent = !result.error;
  if (result.error) console.error("[email] Booking notification failed:", result.error);
  console.log(`[email] booking notification sent=${sent}`);
  return { sent };
}
