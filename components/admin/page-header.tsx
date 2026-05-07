"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useAdminTheme } from "@/lib/admin-theme";
import { type ReactNode } from "react";

interface Props {
  title:    string;
  subtitle?: string;
  actions?:  ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: Props) {
  const { theme } = useAdminTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6"
    >
      <div>
        <h1 className={cn("text-xl font-bold", isDark ? "text-white" : "text-gray-900")}>{title}</h1>
        {subtitle && (
          <p className={cn("text-sm mt-0.5", isDark ? "text-white/45" : "text-gray-500")}>{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </motion.div>
  );
}
