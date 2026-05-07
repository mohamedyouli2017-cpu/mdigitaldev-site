"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Plus, Filter, Download, MoreHorizontal,
  Mail, UserCheck, Trash2, ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import PageHeader from "@/components/admin/page-header";
import { useAdminI18n } from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

type Status  = "new" | "contacted" | "qualified" | "won" | "lost";
type Source  = "website" | "calendly" | "whatsapp" | "email" | "chatbot" | "other";
type Plan    = "smart_starter" | "business_auto_pilot" | "enterprise" | "not_sure";

interface Lead {
  id: string; name: string; email: string; phone?: string;
  business_type?: string; selected_plan?: Plan;
  status: Status; source: Source; language: string;
  created_at: string;
}

const DEMO_LEADS: Lead[] = [
  { id: "1", name: "Ahmed Al-Rashid",  email: "ahmed@alhilal-restaurant.com",  selected_plan: "business_auto_pilot", status: "qualified",  source: "website",  language: "ar", created_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: "2", name: "Sophie Dupont",    email: "sophie@maison-luxe.fr",          selected_plan: "enterprise",          status: "contacted",  source: "calendly", language: "fr", created_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: "3", name: "Carlos Mendez",    email: "carlos@realty-pro.com",          selected_plan: "smart_starter",       status: "new",        source: "whatsapp", language: "en", created_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { id: "4", name: "Fatima Al-Zahra", email: "fatima@healthplus.ma",           selected_plan: "business_auto_pilot", status: "won",        source: "website",  language: "ar", created_at: new Date(Date.now() - 12 * 86400000).toISOString() },
  { id: "5", name: "James Thornton",   email: "james@corporatehub.co.uk",       selected_plan: "enterprise",          status: "lost",       source: "email",    language: "en", created_at: new Date(Date.now() - 20 * 86400000).toISOString() },
];

const STATUS_STYLES: Record<Status, string> = {
  new:       "bg-blue-500/15 text-blue-400",
  contacted: "bg-amber-500/15 text-amber-400",
  qualified: "bg-violet-500/15 text-violet-400",
  won:       "bg-emerald-500/15 text-emerald-400",
  lost:      "bg-red-500/15 text-red-400",
};

const PLAN_LABELS: Record<Plan, string> = {
  smart_starter:        "Smart Starter",
  business_auto_pilot:  "Auto-Pilot",
  enterprise:           "Enterprise",
  not_sure:             "Not Sure",
};

export default function LeadsPage() {
  const { t }     = useAdminI18n();
  const { theme } = useAdminTheme();
  const isDark    = theme === "dark";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filtered = DEMO_LEADS.filter(l => {
    const matchSearch = search === "" ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const cardBg  = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";
  const inputCls = cn(
    "px-3 py-2 rounded-xl text-sm border outline-none focus:border-violet-500/50 transition-colors",
    isDark
      ? "bg-white/[0.05] border-white/[0.08] text-white placeholder-white/30"
      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400",
  );

  return (
    <div className="space-y-5 max-w-[1400px]">
      <PageHeader
        title={t.leads.title}
        subtitle={t.leads.subtitle}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors">
            <Plus className="w-4 h-4" />
            {t.leads.addLead}
          </button>
        }
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={cn("rounded-2xl p-4 border flex flex-wrap gap-3 items-center", cardBg)}
      >
        {/* Search */}
        <div className={cn("flex items-center gap-2 flex-1 min-w-[200px]",
          isDark ? "bg-white/[0.05] border border-white/[0.08]" : "bg-gray-50 border border-gray-200",
          "rounded-xl px-3 py-2")}>
          <Search className={cn("w-4 h-4 shrink-0", isDark ? "text-white/35" : "text-gray-400")} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.leads.search}
            className={cn("flex-1 bg-transparent text-sm outline-none",
              isDark ? "text-white placeholder-white/30" : "text-gray-900 placeholder-gray-400")}
          />
        </div>

        {/* Status filter */}
        {(["all", "new", "contacted", "qualified", "won", "lost"] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize",
              statusFilter === s
                ? s === "all"
                  ? "bg-violet-600 text-white"
                  : cn(STATUS_STYLES[s as Status], "ring-1 ring-current")
                : isDark
                  ? "text-white/40 hover:text-white hover:bg-white/[0.06]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
            )}
          >
            {s === "all" ? "All" : t.leads[`status_${s}` as keyof typeof t.leads]}
          </button>
        ))}

        <div className="ms-auto flex items-center gap-2">
          <button className={cn("w-9 h-9 rounded-xl flex items-center justify-center border transition-colors",
            isDark ? "border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.06]"
                   : "border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-100")}>
            <Download className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className={cn("rounded-2xl border overflow-hidden", isDark ? "border-white/[0.07]" : "border-gray-200 shadow-sm")}
      >
        {/* Table header */}
        <div className={cn("grid grid-cols-[1fr_1fr_auto_auto_auto_auto] gap-4 px-4 py-3 text-xs font-bold uppercase tracking-wide",
          isDark ? "bg-white/[0.03] text-white/35 border-b border-white/[0.07]"
                 : "bg-gray-50 text-gray-500 border-b border-gray-200")}>
          <span>{t.leads.name}</span>
          <span className="hidden sm:block">{t.leads.email}</span>
          <span className="hidden md:block">{t.leads.plan}</span>
          <span>{t.leads.status}</span>
          <span className="hidden lg:block">{t.leads.date}</span>
          <span>{t.leads.actions}</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className={cn("text-sm", isDark ? "text-white/35" : "text-gray-400")}>{t.leads.noLeads}</p>
            <p className={cn("text-xs mt-1", isDark ? "text-white/20" : "text-gray-300")}>{t.leads.noLeadsDesc}</p>
          </div>
        ) : (
          filtered.map((lead, i) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={cn(
                "grid grid-cols-[1fr_1fr_auto_auto_auto_auto] gap-4 px-4 py-3.5 items-center border-b last:border-0",
                isDark
                  ? "border-white/[0.05] hover:bg-white/[0.02]"
                  : "border-gray-100 hover:bg-gray-50",
              )}
            >
              {/* Name */}
              <div className="min-w-0">
                <p className={cn("text-sm font-semibold truncate", isDark ? "text-white" : "text-gray-900")}>
                  {lead.name}
                </p>
                <p className={cn("text-xs truncate sm:hidden", isDark ? "text-white/40" : "text-gray-500")}>
                  {lead.email}
                </p>
              </div>

              {/* Email */}
              <p className={cn("text-sm truncate hidden sm:block", isDark ? "text-white/55" : "text-gray-600")}>
                {lead.email}
              </p>

              {/* Plan */}
              <div className="hidden md:block">
                {lead.selected_plan && (
                  <span className={cn("text-xs font-medium px-2.5 py-1 rounded-lg",
                    isDark ? "bg-white/[0.06] text-white/60" : "bg-gray-100 text-gray-600")}>
                    {PLAN_LABELS[lead.selected_plan]}
                  </span>
                )}
              </div>

              {/* Status */}
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap",
                STATUS_STYLES[lead.status])}>
                {t.leads[`status_${lead.status}` as keyof typeof t.leads]}
              </span>

              {/* Date */}
              <span className={cn("text-xs hidden lg:block whitespace-nowrap",
                isDark ? "text-white/35" : "text-gray-400")}>
                {format(new Date(lead.created_at), "MMM d")}
              </span>

              {/* Actions */}
              <div className="relative flex items-center justify-end">
                <button
                  onClick={() => setActiveMenu(activeMenu === lead.id ? null : lead.id)}
                  className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    isDark ? "text-white/40 hover:text-white hover:bg-white/[0.08]"
                           : "text-gray-400 hover:text-gray-700 hover:bg-gray-100")}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {activeMenu === lead.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                    <div className={cn(
                      "absolute end-0 top-9 z-20 w-44 rounded-xl border shadow-xl overflow-hidden",
                      isDark ? "bg-[#1a1a1a] border-white/[0.1]" : "bg-white border-gray-200",
                    )}>
                      {[
                        { icon: ExternalLink, label: t.common.view,               action: () => {} },
                        { icon: Mail,         label: t.leads.sendEmail,            action: () => {} },
                        { icon: UserCheck,    label: t.leads.convertToClient,      action: () => {} },
                        { icon: Trash2,       label: t.common.delete,              action: () => {}, danger: true },
                      ].map(({ icon: Icon, label, action, danger }) => (
                        <button
                          key={label}
                          onClick={() => { action(); setActiveMenu(null); }}
                          className={cn(
                            "w-full text-start flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors",
                            danger
                              ? "text-red-400 hover:bg-red-500/10"
                              : isDark
                                ? "text-white/70 hover:bg-white/[0.06] hover:text-white"
                                : "text-gray-700 hover:bg-gray-50",
                          )}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Count */}
      <p className={cn("text-xs", isDark ? "text-white/30" : "text-gray-400")}>
        {filtered.length} / {DEMO_LEADS.length} leads
      </p>
    </div>
  );
}
