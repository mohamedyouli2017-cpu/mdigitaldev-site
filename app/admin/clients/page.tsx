"use client";

import { motion } from "framer-motion";
import { Plus, MoreHorizontal, DollarSign, Calendar, Clock } from "lucide-react";
import { differenceInDays, format } from "date-fns";
import PageHeader    from "@/components/admin/page-header";
import { useAdminI18n }   from "@/lib/admin-i18n";
import { useAdminTheme }  from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

type Plan   = "smart_starter" | "business_auto_pilot" | "enterprise";
type Status = "active" | "paused" | "cancelled" | "completed";

interface Client {
  id: string; name: string; email: string; company?: string;
  plan: Plan; status: Status;
  monthly_maintenance: number; start_date: string; end_date: string;
}

const DEMO: Client[] = [
  { id: "1", name: "Fatima Al-Zahra", email: "fatima@healthplus.ma",  company: "HealthPlus Clinics", plan: "business_auto_pilot", status: "active",  monthly_maintenance: 297,  start_date: "2026-02-01", end_date: "2026-08-01" },
  { id: "2", name: "Hassan Benali",   email: "hassan@automaroc.ma",   company: "AutoMaroc",          plan: "smart_starter",       status: "active",  monthly_maintenance: 97,   start_date: "2026-03-15", end_date: "2026-06-15" },
  { id: "3", name: "Nour Khalil",     email: "nour@nour-events.com",  company: "Nour Events",        plan: "enterprise",          status: "active",  monthly_maintenance: 797,  start_date: "2026-01-01", end_date: "2027-01-01" },
];

const PLAN_COLORS: Record<Plan, string> = {
  smart_starter:       "bg-blue-500/15 text-blue-400",
  business_auto_pilot: "bg-violet-500/15 text-violet-400",
  enterprise:          "bg-amber-500/15 text-amber-400",
};
const PLAN_LABELS: Record<Plan, string> = {
  smart_starter: "Smart Starter", business_auto_pilot: "Auto-Pilot", enterprise: "Enterprise",
};
const STATUS_COLORS: Record<Status, string> = {
  active: "bg-emerald-500/15 text-emerald-400",
  paused: "bg-amber-500/15 text-amber-400",
  cancelled: "bg-red-500/15 text-red-400",
  completed: "bg-white/10 text-white/50",
};

const MRR_TOTAL = DEMO.reduce((s, c) => s + c.monthly_maintenance, 0);

export default function ClientsPage() {
  const { t }     = useAdminI18n();
  const { theme } = useAdminTheme();
  const isDark    = theme === "dark";
  const cardBg    = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  return (
    <div className="space-y-5 max-w-[1400px]">
      <PageHeader
        title={t.clients.title}
        subtitle={t.clients.subtitle}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors">
            <Plus className="w-4 h-4" />{t.clients.addClient}
          </button>
        }
      />

      {/* MRR banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className={cn("rounded-2xl p-5 border flex flex-wrap items-center gap-6", cardBg)}
      >
        <div>
          <p className={cn("text-xs font-bold uppercase tracking-wider mb-1", isDark ? "text-white/40" : "text-gray-400")}>
            {t.clients.mrr}
          </p>
          <p className={cn("text-3xl font-bold", isDark ? "text-white" : "text-gray-900")}>
            ${MRR_TOTAL.toLocaleString()}<span className="text-sm font-normal text-white/35">/mo</span>
          </p>
        </div>
        <div className={cn("w-px h-10", isDark ? "bg-white/[0.07]" : "bg-gray-200")} />
        <div>
          <p className={cn("text-xs mb-1", isDark ? "text-white/40" : "text-gray-400")}>Active Clients</p>
          <p className={cn("text-xl font-bold", isDark ? "text-white" : "text-gray-900")}>{DEMO.length}</p>
        </div>
        <div className={cn("w-px h-10", isDark ? "bg-white/[0.07]" : "bg-gray-200")} />
        <div>
          <p className={cn("text-xs mb-1", isDark ? "text-white/40" : "text-gray-400")}>Annual Run Rate</p>
          <p className={cn("text-xl font-bold text-emerald-400")}>
            ${(MRR_TOTAL * 12).toLocaleString()}
          </p>
        </div>
      </motion.div>

      {/* Client cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {DEMO.map((client, i) => {
          const daysLeft = differenceInDays(new Date(client.end_date), new Date());
          return (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className={cn("rounded-2xl p-5 border flex flex-col gap-4 hover:border-violet-500/30 transition-colors", cardBg)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={cn("font-semibold text-sm", isDark ? "text-white" : "text-gray-900")}>
                    {client.name}
                  </p>
                  <p className={cn("text-xs mt-0.5", isDark ? "text-white/40" : "text-gray-500")}>
                    {client.company ?? client.email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs font-semibold px-2 py-1 rounded-lg", PLAN_COLORS[client.plan])}>
                    {PLAN_LABELS[client.plan]}
                  </span>
                  <button className={cn("w-7 h-7 rounded-lg flex items-center justify-center",
                    isDark ? "text-white/30 hover:bg-white/[0.08] hover:text-white" : "text-gray-400 hover:bg-gray-100")}>
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className={cn("grid grid-cols-3 gap-2 text-center py-3 rounded-xl",
                isDark ? "bg-white/[0.03]" : "bg-gray-50")}>
                <div>
                  <p className={cn("text-xs mb-1", isDark ? "text-white/35" : "text-gray-400")}>{t.clients.mrr}</p>
                  <p className={cn("text-sm font-bold", isDark ? "text-white" : "text-gray-900")}>
                    ${client.monthly_maintenance}
                  </p>
                </div>
                <div>
                  <p className={cn("text-xs mb-1", isDark ? "text-white/35" : "text-gray-400")}>{t.clients.status}</p>
                  <span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded-md",
                    STATUS_COLORS[client.status])}>
                    {t.clients[`status_${client.status}` as keyof typeof t.clients]}
                  </span>
                </div>
                <div>
                  <p className={cn("text-xs mb-1", isDark ? "text-white/35" : "text-gray-400")}>{t.clients.daysLeft}</p>
                  <p className={cn("text-sm font-bold", daysLeft < 30 ? "text-amber-400" : isDark ? "text-white" : "text-gray-900")}>
                    {daysLeft}d
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className={cn("flex items-center gap-1", isDark ? "text-white/35" : "text-gray-400")}>
                  <Calendar className="w-3 h-3" />
                  {format(new Date(client.start_date), "MMM d, yyyy")}
                </span>
                <span className={cn("ms-auto flex items-center gap-1", isDark ? "text-white/35" : "text-gray-400")}>
                  <Clock className="w-3 h-3" />
                  {format(new Date(client.end_date), "MMM d, yyyy")}
                </span>
              </div>

              <div className="flex gap-2">
                <button className={cn("flex-1 py-2 rounded-xl text-xs font-semibold transition-colors",
                  isDark ? "bg-white/[0.06] text-white/70 hover:bg-white/[0.1]" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}>
                  {t.clients.generateInvoice}
                </button>
                <button className={cn("flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors",
                  isDark ? "border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white" : "border-gray-200 text-gray-500 hover:border-gray-300")}>
                  {t.common.view}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
