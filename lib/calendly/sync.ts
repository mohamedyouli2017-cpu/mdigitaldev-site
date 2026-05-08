import { createAdminClient } from '@/lib/supabase/admin';
import { sendBookingNotification } from '@/lib/email/send';
import {
  getCalendlyUser,
  listScheduledEvents,
  getEventInvitees,
  CalendlyEvent,
  CalendlyInvitee,
} from './client';

export interface SyncResult {
  newMeetings: number;
  updatedMeetings: number;
  newLeads: number;
  errors: string[];
  totalProcessed: number;
}

export async function syncCalendlyMeetings(options: {
  daysBack?: number;
  daysForward?: number;
} = {}): Promise<SyncResult> {
  const { daysBack = 7, daysForward = 60 } = options;

  const result: SyncResult = {
    newMeetings: 0,
    updatedMeetings: 0,
    newLeads: 0,
    errors: [],
    totalProcessed: 0,
  };

  const supabase = createAdminClient();

  try {
    const user = await getCalendlyUser();

    const minDate = new Date();
    minDate.setDate(minDate.getDate() - daysBack);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + daysForward);

    const allEvents: CalendlyEvent[] = [];

    const [activeResult, canceledResult] = await Promise.all([
      listScheduledEvents({
        user: user.uri,
        min_start_time: minDate.toISOString(),
        max_start_time: maxDate.toISOString(),
        status: 'active',
        count: 100,
      }),
      listScheduledEvents({
        user: user.uri,
        min_start_time: minDate.toISOString(),
        max_start_time: maxDate.toISOString(),
        status: 'canceled',
        count: 100,
      }),
    ]);

    allEvents.push(...activeResult.events, ...canceledResult.events);
    result.totalProcessed = allEvents.length;

    for (const event of allEvents) {
      try {
        const calendlyEventId = event.uri.split('/').pop()!;

        const invitees = await getEventInvitees(event.uri);
        const primaryInvitee = invitees[0];

        if (!primaryInvitee) continue;

        let status: 'scheduled' | 'completed' | 'cancelled' | 'no_show' = 'scheduled';
        if (event.status === 'canceled' || primaryInvitee.status === 'canceled') {
          status = 'cancelled';
        } else if (new Date(event.end_time) < new Date()) {
          status = 'completed';
        }

        const { data: existingMeeting } = await supabase
          .from('meetings')
          .select('id, status, lead_id')
          .eq('calendly_event_id', calendlyEventId)
          .single();

        if (existingMeeting) {
          if (existingMeeting.status !== status) {
            await supabase
              .from('meetings')
              .update({ status, updated_at: new Date().toISOString() })
              .eq('id', existingMeeting.id);

            result.updatedMeetings++;
          }
        } else {
          const { data: existingLead } = await supabase
            .from('leads')
            .select('id')
            .eq('email', primaryInvitee.email.toLowerCase())
            .single();

          let leadId = existingLead?.id;

          if (!existingLead) {
            const notes = primaryInvitee.questions_and_answers
              .map(qa => `${qa.question}: ${qa.answer}`)
              .join('\n');

            const { data: newLead, error: leadError } = await supabase
              .from('leads')
              .insert({
                name:            primaryInvitee.name,
                email:           primaryInvitee.email.toLowerCase(),
                project_details: notes || `Booked a Calendly meeting: ${event.name}`,
                source:          'calendly',
                status:          'new',
                selected_plan:   'not_sure',
              })
              .select()
              .single();

            if (!leadError && newLead) {
              leadId = newLead.id;
              result.newLeads++;
            } else if (leadError) {
              result.errors.push(`Lead creation failed for ${primaryInvitee.email}: ${leadError.message}`);
            }
          }

          const meetingNotes = primaryInvitee.questions_and_answers
            .map(qa => `${qa.question}: ${qa.answer}`)
            .join('\n') || null;

          const durationMinutes = Math.round(
            (new Date(event.end_time).getTime() - new Date(event.start_time).getTime()) / 60000
          );

          const { data: newMeeting, error: meetingError } = await supabase
            .from('meetings')
            .insert({
              calendly_event_id: calendlyEventId,
              lead_id:           leadId || null,
              title:             event.name,
              invitee_name:      primaryInvitee.name,
              invitee_email:     primaryInvitee.email.toLowerCase(),
              scheduled_at:      event.start_time,
              duration_minutes:  durationMinutes,
              status,
              meeting_link:      event.location?.join_url || null,
              notes:             meetingNotes,
            })
            .select()
            .single();

          if (meetingError) {
            result.errors.push(`Meeting creation failed: ${meetingError.message}`);
          } else {
            result.newMeetings++;

            // Send email notification for new bookings only (not cancelled ones)
            if (status !== 'cancelled') {
              sendBookingNotification({
                inviteeName:     primaryInvitee.name,
                inviteeEmail:    primaryInvitee.email.toLowerCase(),
                meetingTitle:    event.name,
                scheduledAt:     event.start_time,
                durationMinutes,
                notes:           meetingNotes,
                meetingLink:     event.location?.join_url || null,
                leadId:          leadId || null,
              }).catch(err => console.error('[sync] Email notification failed:', err));
            }
          }
        }
      } catch (error: any) {
        result.errors.push(`Event processing error: ${error.message}`);
      }
    }

    return result;
  } catch (error: any) {
    result.errors.push(`Sync failed: ${error.message}`);
    return result;
  }
}
