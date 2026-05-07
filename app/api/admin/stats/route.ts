import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    leads:         5,
    activeClients: 3,
    mrr:           1191,
    meetings:      3,
  });
}
