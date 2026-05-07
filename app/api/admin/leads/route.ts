import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const leads = [
    { id: "1", name: "Ahmed Al-Rashid",  email: "ahmed@alhilal-restaurant.com",  selected_plan: "business_auto_pilot", status: "qualified",  source: "website",  language: "ar" },
    { id: "2", name: "Sophie Dupont",    email: "sophie@maison-luxe.fr",          selected_plan: "enterprise",          status: "contacted",  source: "calendly", language: "fr" },
    { id: "3", name: "Carlos Mendez",    email: "carlos@realty-pro.com",          selected_plan: "smart_starter",       status: "new",        source: "whatsapp", language: "en" },
  ];

  const filtered = status ? leads.filter(l => l.status === status) : leads;
  return NextResponse.json({ leads: filtered, total: filtered.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ id: crypto.randomUUID(), ...body, created_at: new Date().toISOString() }, { status: 201 });
}
