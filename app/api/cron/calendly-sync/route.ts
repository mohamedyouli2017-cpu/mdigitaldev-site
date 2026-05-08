import { NextRequest, NextResponse } from 'next/server';
import { syncCalendlyMeetings } from '@/lib/calendly/sync';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Starting Calendly sync...');

    const result = await syncCalendlyMeetings({ daysBack: 7, daysForward: 60 });

    console.log('Calendly sync completed:', result);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error: any) {
    console.error('Calendly cron error:', error);
    return NextResponse.json(
      { error: 'Cron failed', message: error.message },
      { status: 500 }
    );
  }
}
