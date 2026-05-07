"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { useAdminTheme } from "@/lib/admin-theme";

const DEMO = [
  { month: "Dec", revenue: 4200 },
  { month: "Jan", revenue: 5100 },
  { month: "Feb", revenue: 6800 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 8400 },
  { month: "May", revenue: 9191 },
];

interface Props { data?: typeof DEMO }

export default function RevenueChart({ data = DEMO }: Props) {
  const { theme } = useAdminTheme();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#7c3aed" stopOpacity={isDark ? 0.3 : 0.15} />
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fill: isDark ? "rgba(255,255,255,0.35)" : "#9ca3af", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: isDark ? "rgba(255,255,255,0.35)" : "#9ca3af", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `$${v.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            background: isDark ? "#1a1a1a" : "#fff",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb"}`,
            borderRadius: 12,
            color: isDark ? "#fff" : "#111",
            fontSize: 12,
          }}
          formatter={(val) => [`$${Number(val ?? 0).toLocaleString()}`, "Revenue"]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#7c3aed"
          strokeWidth={2}
          fill="url(#revenueGrad)"
          dot={false}
          activeDot={{ r: 5, fill: "#7c3aed", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
