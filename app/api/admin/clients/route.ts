import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const clients = [
    { id: "1", name: "Fatima Al-Zahra", email: "fatima@healthplus.ma",  company: "HealthPlus Clinics", plan: "business_auto_pilot", status: "active",  monthly_maintenance: 297 },
    { id: "2", name: "Hassan Benali",   email: "hassan@automaroc.ma",   company: "AutoMaroc",          plan: "smart_starter",       status: "active",  monthly_maintenance: 97  },
    { id: "3", name: "Nour Khalil",     email: "nour@nour-events.com",  company: "Nour Events",        plan: "enterprise",          status: "active",  monthly_maintenance: 797 },
  ];

  const mrr = clients.reduce((s, c) => s + c.monthly_maintenance, 0);
  return NextResponse.json({ clients, total: clients.length, mrr });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ id: crypto.randomUUID(), ...body, created_at: new Date().toISOString() }, { status: 201 });
}
