"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import StatCard      from "@/components/admin/stat-card";
import PageHeader    from "@/components/admin/page-header";
import RevenueChart  from "@/components/admin/charts/revenue-chart";
import { useAdminI18n }  from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

type PayStatus = "paid" | "pending" | "failed";

interface Payment {
  id: string; client: string; type: string; amount: number;
  status: PayStatus; due_date?: string; paid_at?: string; description: string;
}

const PAYMENTS: Payment[] = [
  { id: "1",  client: "HealthPlus",  type: "maintenance", amount: 297, status: "paid",    paid_at: "2026-04-30", description: "Monthly maintenance — April 2026" },
  { id: "2",  client: "AutoMaroc",   type: "maintenance", amount: 97,  status: "paid",    paid_at: "2026-04-30", description: "Monthly maintenance — April 2026" },
  { id: "3",  client: "Nour Events", type: "maintenance", amount: 797, status: "paid",    paid_at: "2026-04-30", description: "Monthly maintenance — Jan–Apr 2026" },
  { id: "4",  client: "HealthPlus",  type: "maintenance", amount: 297, status: "pending", due_date: "2026-05-31", description: "Monthly maintenance — May 2026" },
  { id: "5",  client: "AutoMaroc",   type: "maintenance", amount: 97,  status: "pending", due_date: "2026-05-31", description: "Monthly maintenance — May 2026" },
  { id: "6",  client: "Nour Events", type: "maintenance", amount: 797, status: "pending", due_date: "2026-05-31", description: "Monthly maintenance — May 2026" },
];

const STATUS_STYLE: Record<PayStatus, string> = {
  paid:    "text-emerald-400 bg-emerald-500/15",
  pending: "text-amber-400 bg-amber-500/15",
  failed:  "text-red-400 bg-red-500/15",
};
const STATUS_ICON: Record<PayStatus, typeof CheckCircle> = {
  paid:    CheckCircle,
  pending: AlertCircle,
  failed:  AlertCircle,
};

export default function FinancesPage() {
  const { t }     = useAdminI18n();
  const { theme } = useAdminTheme();
  const isDark    = theme === "dark";
  const cardBg    = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  const mrr       = PAYMENTS.filter(p => p.status === "paid" && p.type === "maintenance").reduce((s, p) => s + p.amount, 0) / 4;
  const pending   = PAYMENTS.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const totalRevenue = 1800 + 497 + 4800 + mrr * 4;

  return (
    <div className="space-y-6 max-w-[1400px]">
      <PageHeader title={t.finances.title} subtitle={t.finances.subtitle} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t.finances.mrr}          value={`$${Math.round(mrr).toLocaleString()}`} icon={DollarSign}   iconColor="text-violet-400"  iconBg="bg-violet-500/10"  trend={8}  delay={0} />
        <StatCard title={t.finances.totalRevenue} value={`$${Math.round(totalRevenue).toLocaleString()}`} icon={TrendingUp}  iconColor="text-emerald-400" iconBg="bg-emerald-500/10" delay={1} />
        <StatCard title={t.finances.avgClientValue} value="$3,967" icon={DollarSign}  iconColor="text-amber-400"  iconBg="bg-amber-500/10"   delay={2} />
        <StatCard title={t.finances.pendingPayments} value={`$${pending.toLocaleString()}`} icon={AlertCircle} iconColor="text-red-400"     iconBg="bg-red-500/10"     delay={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className={cn("rounded-2xl p-5 border", cardBg)}>
        <p className={cn("text-sm font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>{t.overview.revenueChart}</p>
        <RevenueChart />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className={cn("rounded-2xl border overflow-hidden", isDark ? "border-white/[0.07]" : "border-gray-200 shadow-sm")}>
        <div className={cn("px-5 py-4 border-b",
          isDark ? "border-white/[0.07] bg-white/[0.02]" : "border-gray-100 bg-gray-50")}>
          <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>{t.finances.paymentHistory}</p>
        </div>
        {PAYMENTS.map((p, i) => {
          const Icon = STATUS_ICON[p.status];
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={cn("flex items-center gap-4 px-5 py-4 border-b last:border-0",
                isDark ? "border-white/[0.04] hover:bg-white/[0.02]" : "border-gray-50 hover:bg-gray-50")}
            >
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", STATUS_STYLE[p.status])}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>{p.description}</p>
                <p className={cn("text-xs", isDark ? "text-white/40" : "text-gray-400")}>{p.client}</p>
              </div>
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", STATUS_STYLE[p.status])}>
                {t.finances[`status_${p.status}` as keyof typeof t.finances]}
              </span>
              <div className="text-end shrink-0">
                <p className={cn("text-sm font-bold", isDark ? "text-white" : "text-gray-900")}>${p.amount}</p>
                <p className={cn("text-xs", isDark ? "text-white/35" : "text-gray-400")}>
                  {p.paid_at ? format(new Date(p.paid_at), "MMM d") : p.due_date ? `Due ${format(new Date(p.due_date), "MMM d")}` : ""}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
