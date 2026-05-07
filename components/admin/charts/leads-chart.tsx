"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useAdminTheme } from "@/lib/admin-theme";
import { useAdminI18n } from "@/lib/admin-i18n";

const COLORS = {
  new:       "#6366f1",
  contacted: "#8b5cf6",
  qualified: "#f59e0b",
  won:       "#10b981",
  lost:      "#ef4444",
};

interface LeadStat { status: string; count: number }
interface Props { data?: LeadStat[] }

const DEMO: LeadStat[] = [
  { status: "new",       count: 12 },
  { status: "contacted", count: 8  },
  { status: "qualified", count: 5  },
  { status: "won",       count: 3  },
  { status: "lost",      count: 2  },
];

export default function LeadsChart({ data = DEMO }: Props) {
  const { theme } = useAdminTheme();
  const { t }     = useAdminI18n();
  const isDark    = theme === "dark";

  const labeled = data.map(d => ({
    ...d,
    label: t.leads[`status_${d.status}` as keyof typeof t.leads] ?? d.status,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={labeled} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fill: isDark ? "rgba(255,255,255,0.35)" : "#9ca3af", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: isDark ? "rgba(255,255,255,0.35)" : "#9ca3af", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: isDark ? "#1a1a1a" : "#fff",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb"}`,
            borderRadius: 12,
            color: isDark ? "#fff" : "#111",
            fontSize: 12,
          }}
          cursor={{ fill: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={40}>
          {labeled.map((entry) => (
            <Cell
              key={entry.status}
              fill={COLORS[entry.status as keyof typeof COLORS] ?? "#7c3aed"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
