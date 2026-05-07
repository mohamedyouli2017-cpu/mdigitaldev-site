"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle, XCircle, Clock, ExternalLink, RefreshCw } from "lucide-react";
import PageHeader from "@/components/admin/page-header";
import { useAdminI18n }  from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

type WorkflowStatus = "active" | "inactive" | "error";

interface Workflow {
  id: string; name: string; description: string;
  status: WorkflowStatus; trigger: string;
  last_run?: string; runs_today: number;
}

const WORKFLOWS: Workflow[] = [
  { id: "1", name: "New Lead → Email Sequence",  description: "Sends a welcome email + follow-up series when a lead submits the contact form.", status: "active",   trigger: "Webhook (contact form)", last_run: "2 min ago",  runs_today: 3  },
  { id: "2", name: "Calendly Booked → Notify",   description: "Sends a Telegram/WhatsApp notification to Mohamed when a discovery call is booked.", status: "active",   trigger: "Calendly webhook",       last_run: "1 hr ago",   runs_today: 1  },
  { id: "3", name: "Lead Qualified → CRM Update", description: "Automatically moves qualified leads to the 'Qualified' stage in Supabase.", status: "active",   trigger: "Manual / Chatbot",       last_run: "3 hr ago",   runs_today: 2  },
  { id: "4", name: "Monthly Invoice Generator",  description: "Creates and emails invoices to active clients on the 1st of each month.", status: "inactive", trigger: "Schedule (1st of month)", last_run: "May 1",      runs_today: 0  },
  { id: "5", name: "Chatbot → Lead Capture",     description: "Saves chatbot conversations to Supabase and notifies on qualified leads.", status: "active",   trigger: "Chatbot API",            last_run: "8 min ago",  runs_today: 6  },
  { id: "6", name: "Lost Lead Re-engagement",    description: "Sends a re-engagement email 14 days after a lead is marked as lost.", status: "error",    trigger: "Schedule (daily)",        last_run: "Failed",     runs_today: 0  },
];

const STATUS_STYLE: Record<WorkflowStatus, string> = {
  active:   "text-emerald-400 bg-emerald-500/10",
  inactive: "text-white/35 bg-white/[0.06]",
  error:    "text-red-400 bg-red-500/10",
};
const STATUS_ICON: Record<WorkflowStatus, typeof CheckCircle> = {
  active:   CheckCircle,
  inactive: Clock,
  error:    XCircle,
};

export default function WorkflowsPage() {
  const { t }     = useAdminI18n();
  const { theme } = useAdminTheme();
  const isDark    = theme === "dark";
  const cardBg    = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  const active = WORKFLOWS.filter(w => w.status === "active").length;
  const errors = WORKFLOWS.filter(w => w.status === "error").length;

  return (
    <div className="space-y-6 max-w-[1200px]">
      <PageHeader
        title="Workflows"
        subtitle="n8n automation workflows connected to MDigitalDev"
        actions={
          <a
            href="https://n8n.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open n8n
          </a>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active",   value: active,             color: "text-emerald-400" },
          { label: "Inactive", value: WORKFLOWS.length - active - errors, color: isDark ? "text-white/50" : "text-gray-400" },
          { label: "Errors",   value: errors,             color: "text-red-400"    },
        ].map(({ label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className={cn("rounded-2xl p-5 border text-center", cardBg)}
          >
            <p className={cn("text-3xl font-bold", color)}>{value}</p>
            <p className={cn("text-xs mt-1", isDark ? "text-white/40" : "text-gray-500")}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Workflow cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WORKFLOWS.map((wf, i) => {
          const Icon = STATUS_ICON[wf.status];
          return (
            <motion.div
              key={wf.id}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}
              className={cn("rounded-2xl p-5 border flex flex-col gap-3 hover:border-violet-500/30 transition-colors", cardBg)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", STATUS_STYLE[wf.status])}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>{wf.name}</p>
                    <p className={cn("text-xs mt-0.5", isDark ? "text-white/35" : "text-gray-400")}>{wf.trigger}</p>
                  </div>
                </div>
                <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 capitalize", STATUS_STYLE[wf.status])}>
                  {wf.status}
                </span>
              </div>

              <p className={cn("text-xs leading-relaxed", isDark ? "text-white/45" : "text-gray-500")}>{wf.description}</p>

              <div className={cn("flex items-center justify-between text-xs pt-1 border-t", isDark ? "border-white/[0.06] text-white/30" : "border-gray-100 text-gray-400")}>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Last: {wf.last_run ?? "Never"}
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  {wf.runs_today} runs today
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
