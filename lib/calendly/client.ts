const CALENDLY_API_BASE = 'https://api.calendly.com';

export interface CalendlyUser {
  uri: string;
  name: string;
  email: string;
  current_organization: string;
  scheduling_url: string;
  timezone: string;
}

export async function getCalendlyUser(): Promise<CalendlyUser> {
  const response = await fetch(`${CALENDLY_API_BASE}/users/me`, {
    headers: {
      'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Calendly API error: ${response.status}`);
  }

  const data = await response.json();
  return data.resource;
}

export interface CalendlyEvent {
  uri: string;
  name: string;
  status: 'active' | 'canceled';
  start_time: string;
  end_time: string;
  event_type: string;
  location: {
    type: string;
    join_url?: string;
  };
  invitees_counter: {
    total: number;
    active: number;
    limit: number;
  };
  created_at: string;
  updated_at: string;
}

export interface CalendlyInvitee {
  uri: string;
  email: string;
  name: string;
  first_name?: string;
  last_name?: string;
  status: 'active' | 'canceled';
  questions_and_answers: Array<{
    question: string;
    answer: string;
    position: number;
  }>;
  cancellation?: {
    reason: string;
    canceled_by: string;
  };
  created_at: string;
}

export async function listScheduledEvents(params: {
  organization?: string;
  user?: string;
  min_start_time?: string;
  max_start_time?: string;
  status?: 'active' | 'canceled';
  count?: number;
}): Promise<{
  events: CalendlyEvent[];
  next_page?: string;
}> {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, String(value));
  });

  const response = await fetch(
    `${CALENDLY_API_BASE}/scheduled_events?${queryParams}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Calendly API error: ${response.status} - ${await response.text()}`);
  }

  const data = await response.json();
  return {
    events: data.collection,
    next_page: data.pagination?.next_page,
  };
}

export async function getEventInvitees(eventUri: string): Promise<CalendlyInvitee[]> {
  const eventId = eventUri.split('/').pop();

  const response = await fetch(
    `${CALENDLY_API_BASE}/scheduled_events/${eventId}/invitees`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Calendly invitees error: ${response.status}`);
  }

  const data = await response.json();
  return data.collection;
}
