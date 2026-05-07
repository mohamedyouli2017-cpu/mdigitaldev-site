"use client";

import { motion } from "framer-motion";
import { BarChart2, Eye, MousePointerClick, Clock, Globe, TrendingUp } from "lucide-react";
import PageHeader from "@/components/admin/page-header";
import StatCard   from "@/components/admin/stat-card";
import { useAdminI18n }  from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

const TOP_PAGES = [
  { path: "/",           label: "Home",          views: 1284, bounce: "42%" },
  { path: "/pricing",    label: "Pricing",       views: 743,  bounce: "31%" },
  { path: "/portfolio",  label: "Portfolio",     views: 512,  bounce: "55%" },
  { path: "/about",      label: "About",         views: 298,  bounce: "61%" },
  { path: "/contact",    label: "Contact",       views: 187,  bounce: "28%" },
];

const TOP_COUNTRIES = [
  { country: "Morocco",       code: "MA", pct: 41 },
  { country: "Saudi Arabia",  code: "SA", pct: 18 },
  { country: "France",        code: "FR", pct: 14 },
  { country: "UAE",           code: "AE", pct: 9  },
  { country: "Other",         code: "🌍", pct: 18 },
];

export default function AnalyticsPage() {
  const { t }     = useAdminI18n();
  const { theme } = useAdminTheme();
  const isDark    = theme === "dark";
  const cardBg    = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  return (
    <div className="space-y-6 max-w-[1200px]">
      <PageHeader
        title="Analytics"
        subtitle="Website traffic and user behavior — last 30 days"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Page Views"       value="3,024"  icon={Eye}              iconColor="text-violet-400"  iconBg="bg-violet-500/10"  trend={18} delay={0} />
        <StatCard title="Unique Visitors"  value="1,187"  icon={Globe}            iconColor="text-blue-400"    iconBg="bg-blue-500/10"    trend={9}  delay={1} />
        <StatCard title="Click-Through"    value="6.2%"   icon={MousePointerClick} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" trend={4}  delay={2} />
        <StatCard title="Avg. Time on Site" value="2m 14s" icon={Clock}            iconColor="text-amber-400"   iconBg="bg-amber-500/10"   trend={-2} delay={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top pages */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className={cn("rounded-2xl border overflow-hidden", isDark ? "border-white/[0.07]" : "border-gray-200 shadow-sm")}
        >
          <div className={cn("px-5 py-4 border-b flex items-center gap-2", isDark ? "border-white/[0.07] bg-white/[0.02]" : "border-gray-100 bg-gray-50")}>
            <BarChart2 className={cn("w-4 h-4", isDark ? "text-white/40" : "text-gray-400")} />
            <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>Top Pages</p>
          </div>
          {TOP_PAGES.map((page, i) => (
            <div
              key={page.path}
              className={cn("flex items-center gap-4 px-5 py-3.5 border-b last:border-0",
                isDark ? "border-white/[0.04]" : "border-gray-50")}
            >
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>{page.label}</p>
                <p className={cn("text-xs", isDark ? "text-white/30" : "text-gray-400")}>{page.path}</p>
              </div>
              <div className="text-end shrink-0">
                <p className={cn("text-sm font-bold", isDark ? "text-white" : "text-gray-900")}>{page.views.toLocaleString()}</p>
                <p className={cn("text-xs", isDark ? "text-white/30" : "text-gray-400")}>bounce {page.bounce}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Top countries */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className={cn("rounded-2xl border p-5", cardBg)}
        >
          <div className="flex items-center gap-2 mb-5">
            <Globe className={cn("w-4 h-4", isDark ? "text-white/40" : "text-gray-400")} />
            <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>Visitors by Country</p>
          </div>
          <div className="space-y-4">
            {TOP_COUNTRIES.map(({ country, code, pct }) => (
              <div key={country} className="flex items-center gap-3">
                <span className="text-lg w-6 text-center">{code.length === 2 ? "🏳️" : code}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className={cn("text-xs font-medium", isDark ? "text-white/70" : "text-gray-700")}>{country}</span>
                    <span className={cn("text-xs", isDark ? "text-white/40" : "text-gray-400")}>{pct}%</span>
                  </div>
                  <div className={cn("h-1.5 rounded-full overflow-hidden", isDark ? "bg-white/[0.06]" : "bg-gray-100")}>
                    <div
                      className="h-full rounded-full bg-violet-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Coming soon */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className={cn("rounded-2xl border p-8 text-center", cardBg)}
      >
        <TrendingUp className={cn("w-10 h-10 mx-auto mb-3", isDark ? "text-white/20" : "text-gray-300")} />
        <p className={cn("text-sm font-semibold", isDark ? "text-white/50" : "text-gray-500")}>Advanced analytics coming soon</p>
        <p className={cn("text-xs mt-1", isDark ? "text-white/25" : "text-gray-400")}>Connect Google Analytics or Plausible for live data.</p>
      </motion.div>
    </div>
  );
}
