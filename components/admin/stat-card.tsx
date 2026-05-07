"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { useAdminTheme } from "@/lib/admin-theme";

interface StatCardProps {
  title:      string;
  value:      string | number;
  subtitle?:  string;
  icon:       LucideIcon;
  iconColor?: string;
  iconBg?:    string;
  trend?:     number;      // percentage, positive = up
  trendLabel?: string;
  loading?:   boolean;
  delay?:     number;
}

export default function StatCard({
  title, value, subtitle, icon: Icon, iconColor = "text-violet-400",
  iconBg = "bg-violet-500/10", trend, trendLabel, loading = false, delay = 0,
}: StatCardProps) {
  const { theme } = useAdminTheme();
  const isDark = theme === "dark";

  if (loading) {
    return (
      <div className={cn("rounded-2xl p-5 border animate-pulse",
        isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-gray-50 border-gray-200")}>
        <div className="flex items-start justify-between mb-4">
          <div className={cn("w-10 h-10 rounded-xl", isDark ? "bg-white/[0.06]" : "bg-gray-200")} />
          <div className={cn("w-16 h-5 rounded-lg", isDark ? "bg-white/[0.06]" : "bg-gray-200")} />
        </div>
        <div className={cn("w-24 h-7 rounded-lg mb-1", isDark ? "bg-white/[0.06]" : "bg-gray-200")} />
        <div className={cn("w-32 h-4 rounded", isDark ? "bg-white/[0.04]" : "bg-gray-100")} />
      </div>
    );
  }

  const trendUp   = trend !== undefined && trend > 0;
  const trendDown = trend !== undefined && trend < 0;
  const TrendIcon = trendUp ? TrendingUp : trendDown ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.08, duration: 0.4 }}
      className={cn(
        "rounded-2xl p-5 border transition-all duration-200 hover:border-violet-500/30",
        isDark
          ? "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.05]"
          : "bg-white border-gray-200 hover:border-violet-300 shadow-sm",
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        {trend !== undefined && (
          <span className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
            trendUp
              ? "text-emerald-400 bg-emerald-500/10"
              : trendDown
                ? "text-red-400 bg-red-500/10"
                : isDark ? "text-white/40 bg-white/[0.06]" : "text-gray-400 bg-gray-100",
          )}>
            <TrendIcon className="w-3 h-3" />
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <p className={cn("text-2xl font-bold mb-0.5", isDark ? "text-white" : "text-gray-900")}>
        {value}
      </p>
      <p className={cn("text-sm font-medium", isDark ? "text-white/50" : "text-gray-500")}>
        {title}
      </p>
      {(subtitle ?? trendLabel) && (
        <p className={cn("text-xs mt-1", isDark ? "text-white/30" : "text-gray-400")}>
          {subtitle ?? trendLabel}
        </p>
      )}
    </motion.div>
  );
}
