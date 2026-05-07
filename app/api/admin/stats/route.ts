import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const now      = new Date();

  const startOfMonth    = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
  const endOfLastMonth   = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString();
  const next7Days        = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: totalLeads },
    { count: leadsThisMonth },
    { count: leadsLastMonth },
    { count: activeClients },
    { data: clientRows },
    { count: upcomingMeetings },
    { data: funnelRows },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", startOfMonth),
    supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", startOfLastMonth).lte("created_at", endOfLastMonth),
    supabase.from("clients").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("clients").select("monthly_maintenance").eq("status", "active"),
    supabase.from("meetings").select("*", { count: "exact", head: true }).gte("scheduled_at", now.toISOString()).lte("scheduled_at", next7Days).eq("status", "scheduled"),
    supabase.from("leads").select("status"),
  ]);

  const mrr = clientRows?.reduce((s, c) => s + Number(c.monthly_maintenance ?? 0), 0) ?? 0;

  const leadsChange = leadsLastMonth
    ? Math.round(((( leadsThisMonth ?? 0) - leadsLastMonth) / leadsLastMonth) * 1000) / 10
    : 0;

  // Revenue chart — last 6 months
  const revenueChart = await Promise.all(
    Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const start = d.toISOString();
      const end   = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59).toISOString();
      return supabase
        .from("payments")
        .select("amount")
        .eq("status", "paid")
        .gte("paid_at", start)
        .lte("paid_at", end)
        .then(({ data }) => ({
          month:   d.toLocaleDateString("en", { month: "short" }),
          revenue: data?.reduce((s, p) => s + Number(p.amount ?? 0), 0) ?? 0,
        }));
    }),
  );

  // Leads activity — last 8
  const { data: recentActivity } = await supabase
    .from("activity_log")
    .select("*")
    .eq("entity_type", "lead")
    .order("created_at", { ascending: false })
    .limit(8);

  const funnel = {
    new:       funnelRows?.filter(l => l.status === "new").length       ?? 0,
    contacted: funnelRows?.filter(l => l.status === "contacted").length ?? 0,
    qualified: funnelRows?.filter(l => l.status === "qualified").length ?? 0,
    won:       funnelRows?.filter(l => l.status === "won").length       ?? 0,
    lost:      funnelRows?.filter(l => l.status === "lost").length      ?? 0,
  };

  return NextResponse.json({
    stats: {
      totalLeads:       totalLeads       ?? 0,
      leadsThisMonth:   leadsThisMonth   ?? 0,
      leadsChange,
      activeClients:    activeClients    ?? 0,
      mrr,
      upcomingMeetings: upcomingMeetings ?? 0,
    },
    revenueChart,
    leadsFunnel:    funnel,
    recentActivity: recentActivity ?? [],
  });
}
