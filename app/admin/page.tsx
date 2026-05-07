"use client";

import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import {
  Users, UserCheck, DollarSign, Calendar,
  Plus, UserPlus, CheckSquare, ArrowRight, Clock,
} from "lucide-react";
import Link from "next/link";
import StatCard      from "@/components/admin/stat-card";
import RevenueChart  from "@/components/admin/charts/revenue-chart";
import LeadsChart    from "@/components/admin/charts/leads-chart";
import { useAdminI18n } from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

const RECENT_ACTIVITY = [
  { id: 1, text: "New lead from Ahmed Al-Rashid",         time: "2 min ago",  color: "bg-violet-500" },
  { id: 2, text: "Payment received from HealthPlus ($297)", time: "1 hr ago",  color: "bg-emerald-500" },
  { id: 3, text: "Meeting scheduled with Sophie Dupont",  time: "3 hrs ago",  color: "bg-blue-500"   },
  { id: 4, text: "Lead lost — James Thornton (Corporate)","time": "1 day ago", color: "bg-red-500"    },
  { id: 5, text: "AutoMaroc site backup verified ✓",       time: "1 day ago",  color: "bg-amber-500"  },
];

function getGreeting(t: ReturnType<typeof useAdminI18n>["t"]) {
  const h = new Date().getHours();
  if (h < 12)  return t.overview.greeting_morning;
  if (h < 18)  return t.overview.greeting_afternoon;
  return t.overview.greeting_evening;
}

export default function AdminOverviewPage() {
  const { user }   = useUser();
  const { t }      = useAdminI18n();
  const { theme }  = useAdminTheme();
  const isDark     = theme === "dark";
  const firstName  = user?.firstName ?? "Mohamed";

  const cardBg = isDark
    ? "bg-white/[0.03] border-white/[0.07]"
    : "bg-white border-gray-200 shadow-sm";

  return (
    <div className="space-y-6 max-w-[1400px]">

      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-gray-900")}>
          {getGreeting(t)}, {firstName} 👋
        </h1>
        <p className={cn("text-sm mt-0.5", isDark ? "text-white/45" : "text-gray-500")}>
          {t.overview.subtitle}
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t.overview.totalLeads}
          value="24"
          icon={Users}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/10"
          trend={12}
          trendLabel={t.overview.vsLastMonth}
          delay={0}
        />
        <StatCard
          title={t.overview.activeClients}
          value="3"
          icon={UserCheck}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
          trend={0}
          trendLabel={t.overview.vsLastMonth}
          delay={1}
        />
        <StatCard
          title={t.overview.mrr}
          value="$1,191"
          icon={DollarSign}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
          trend={8}
          trendLabel={t.overview.vsLastMonth}
          delay={2}
        />
        <StatCard
          title={t.overview.upcomingMeetings}
          value="3"
          subtitle={t.overview.next7days}
          icon={Calendar}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
          delay={3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn("rounded-2xl p-5 border", cardBg)}
        >
          <p className={cn("text-sm font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>
            {t.overview.revenueChart}
          </p>
          <RevenueChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className={cn("rounded-2xl p-5 border", cardBg)}
        >
          <p className={cn("text-sm font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>
            {t.overview.leadsFunnel}
          </p>
          <LeadsChart />
        </motion.div>
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={cn("lg:col-span-2 rounded-2xl p-5 border", cardBg)}
        >
          <p className={cn("text-sm font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>
            {t.overview.recentActivity}
          </p>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                className="flex items-start gap-3"
              >
                <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", item.color)} />
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm leading-snug", isDark ? "text-white/80" : "text-gray-700")}>
                    {item.text}
                  </p>
                  <p className={cn("text-xs mt-0.5 flex items-center gap-1",
                    isDark ? "text-white/30" : "text-gray-400")}>
                    <Clock className="w-3 h-3" />{item.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn("rounded-2xl p-5 border", cardBg)}
        >
          <p className={cn("text-sm font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>
            {t.overview.quickActions}
          </p>
          <div className="space-y-2.5">
            {[
              { label: t.overview.addLead,     href: "/admin/leads",   icon: UserPlus,   color: "text-violet-400 bg-violet-500/10"  },
              { label: t.overview.addClient,   href: "/admin/clients", icon: UserCheck,  color: "text-emerald-400 bg-emerald-500/10" },
              { label: t.overview.createTask,  href: "/admin/tasks",   icon: CheckSquare,color: "text-amber-400 bg-amber-500/10"     },
            ].map(({ label, href, icon: Icon, color }) => (
              <Link key={href} href={href}>
                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all group cursor-pointer",
                  isDark ? "hover:bg-white/[0.06]" : "hover:bg-gray-50",
                )}>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={cn("text-sm font-medium flex-1", isDark ? "text-white/75" : "text-gray-700")}>
                    {label}
                  </span>
                  <ArrowRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0",
                    isDark ? "text-white/40" : "text-gray-400")} />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
