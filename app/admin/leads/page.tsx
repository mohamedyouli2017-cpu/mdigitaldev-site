"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search, Plus, Download, MoreHorizontal,
  Mail, UserCheck, Trash2, ExternalLink, RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import PageHeader from "@/components/admin/page-header";
import { useAdminI18n }  from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

type Status = "new" | "contacted" | "qualified" | "won" | "lost";
type Plan   = "smart_starter" | "business_auto_pilot" | "enterprise" | "not_sure";

interface Lead {
  id: string; name: string; email: string; phone?: string;
  business_type?: string; selected_plan?: Plan;
  status: Status; source: string; language: string;
  created_at: string;
}

const STATUS_STYLES: Record<Status, string> = {
  new:       "bg-blue-500/15 text-blue-400",
  contacted: "bg-amber-500/15 text-amber-400",
  qualified: "bg-violet-500/15 text-violet-400",
  won:       "bg-emerald-500/15 text-emerald-400",
  lost:      "bg-red-500/15 text-red-400",
};

const PLAN_LABELS: Record<Plan, string> = {
  smart_starter:       "Smart Starter",
  business_auto_pilot: "Auto-Pilot",
  enterprise:          "Enterprise",
  not_sure:            "Not Sure",
};

export default function LeadsPage() {
  const { t }     = useAdminI18n();
  const { theme } = useAdminTheme();
  const isDark    = theme === "dark";

  const [leads,        setLeads]        = useState<Lead[]>([]);
  const [total,        setTotal]        = useState(0);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [activeMenu,   setActiveMenu]   = useState<string | null>(null);

  const fetchLeads = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (search.trim())          params.set("search", search.trim());

    fetch(`/api/admin/leads?${params}`)
      .then(r => r.json())
      .then(d => {
        setLeads(d.leads ?? []);
        setTotal(d.total ?? 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, statusFilter]);

  useEffect(() => {
    const id = setTimeout(fetchLeads, search ? 300 : 0);
    return () => clearTimeout(id);
  }, [fetchLeads, search]);

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
    setLeads(prev => prev.filter(l => l.id !== id));
    setTotal(prev => prev - 1);
  };

  const updateStatus = async (id: string, status: Status) => {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    setActiveMenu(null);
  };

  const cardBg = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  return (
    <div className="space-y-5 max-w-[1400px]">
      <PageHeader
        title={t.leads.title}
        subtitle={t.leads.subtitle}
        actions={
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        }
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className={cn("rounded-2xl p-4 border flex flex-wrap gap-3 items-center", cardBg)}
      >
        <div className={cn(
          "flex items-center gap-2 flex-1 min-w-[200px] rounded-xl px-3 py-2",
          isDark ? "bg-white/[0.05] border border-white/[0.08]" : "bg-gray-50 border border-gray-200",
        )}>
          <Search className={cn("w-4 h-4 shrink-0", isDark ? "text-white/35" : "text-gray-400")} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.leads.search}
            className={cn("flex-1 bg-transparent text-sm outline-none",
              isDark ? "text-white placeholder-white/30" : "text-gray-900 placeholder-gray-400")}
          />
        </div>

        {(["all", "new", "contacted", "qualified", "won", "lost"] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize",
              statusFilter === s
                ? s === "all" ? "bg-violet-600 text-white" : cn(STATUS_STYLES[s as Status], "ring-1 ring-current")
                : isDark ? "text-white/40 hover:text-white hover:bg-white/[0.06]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
            )}
          >
            {s === "all" ? "All" : t.leads[`status_${s}` as keyof typeof t.leads]}
          </button>
        ))}

        <div className="ms-auto">
          <button className={cn("w-9 h-9 rounded-xl flex items-center justify-center border transition-colors",
            isDark ? "border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.06]"
                   : "border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-100")}>
            <Download className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
        className={cn("rounded-2xl border overflow-hidden", isDark ? "border-white/[0.07]" : "border-gray-200 shadow-sm")}
      >
        <div className={cn(
          "grid grid-cols-[1fr_1fr_auto_auto_auto_auto] gap-4 px-4 py-3 text-xs font-bold uppercase tracking-wide",
          isDark ? "bg-white/[0.03] text-white/35 border-b border-white/[0.07]" : "bg-gray-50 text-gray-500 border-b border-gray-200",
        )}>
          <span>{t.leads.name}</span>
          <span className="hidden sm:block">{t.leads.email}</span>
          <span className="hidden md:block">{t.leads.plan}</span>
          <span>{t.leads.status}</span>
          <span className="hidden lg:block">{t.leads.date}</span>
          <span>{t.leads.actions}</span>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <RefreshCw className={cn("w-5 h-5 mx-auto animate-spin mb-2", isDark ? "text-white/30" : "text-gray-300")} />
            <p className={cn("text-sm", isDark ? "text-white/35" : "text-gray-400")}>Loading leads…</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center">
            <p className={cn("text-sm", isDark ? "text-white/35" : "text-gray-400")}>{t.leads.noLeads}</p>
            <p className={cn("text-xs mt-1", isDark ? "text-white/20" : "text-gray-300")}>{t.leads.noLeadsDesc}</p>
          </div>
        ) : (
          leads.map((lead, i) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.04 }}
              className={cn(
                "grid grid-cols-[1fr_1fr_auto_auto_auto_auto] gap-4 px-4 py-3.5 items-center border-b last:border-0",
                isDark ? "border-white/[0.05] hover:bg-white/[0.02]" : "border-gray-100 hover:bg-gray-50",
              )}
            >
              <div className="min-w-0">
                <p className={cn("text-sm font-semibold truncate", isDark ? "text-white" : "text-gray-900")}>{lead.name}</p>
                <p className={cn("text-xs truncate sm:hidden", isDark ? "text-white/40" : "text-gray-500")}>{lead.email}</p>
              </div>

              <p className={cn("text-sm truncate hidden sm:block", isDark ? "text-white/55" : "text-gray-600")}>{lead.email}</p>

              <div className="hidden md:block">
                {lead.selected_plan && (
                  <span className={cn("text-xs font-medium px-2.5 py-1 rounded-lg",
                    isDark ? "bg-white/[0.06] text-white/60" : "bg-gray-100 text-gray-600")}>
                    {PLAN_LABELS[lead.selected_plan] ?? lead.selected_plan}
                  </span>
                )}
              </div>

              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap", STATUS_STYLES[lead.status])}>
                {t.leads[`status_${lead.status}` as keyof typeof t.leads]}
              </span>

              <span className={cn("text-xs hidden lg:block whitespace-nowrap", isDark ? "text-white/35" : "text-gray-400")}>
                {format(new Date(lead.created_at), "MMM d")}
              </span>

              <div className="relative flex items-center justify-end">
                <button
                  onClick={() => setActiveMenu(activeMenu === lead.id ? null : lead.id)}
                  className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    isDark ? "text-white/40 hover:text-white hover:bg-white/[0.08]" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100")}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {activeMenu === lead.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                    <div className={cn(
                      "absolute end-0 top-9 z-20 w-48 rounded-xl border shadow-xl overflow-hidden",
                      isDark ? "bg-[#1a1a1a] border-white/[0.1]" : "bg-white border-gray-200",
                    )}>
                      {(["contacted", "qualified", "won", "lost"] as Status[]).map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(lead.id, s)}
                          className={cn(
                            "w-full text-start flex items-center gap-2.5 px-3 py-2 text-xs font-semibold transition-colors capitalize",
                            STATUS_STYLES[s],
                            "hover:opacity-80",
                          )}
                        >
                          Mark as {t.leads[`status_${s}` as keyof typeof t.leads]}
                        </button>
                      ))}
                      <div className={cn("border-t my-0.5", isDark ? "border-white/[0.07]" : "border-gray-100")} />
                      {[
                        { icon: ExternalLink, label: t.common.view,          action: () => {} },
                        { icon: Mail,         label: t.leads.sendEmail,       action: () => {} },
                        { icon: UserCheck,    label: t.leads.convertToClient, action: () => {} },
                      ].map(({ icon: Icon, label, action }) => (
                        <button key={label} onClick={() => { action(); setActiveMenu(null); }}
                          className={cn("w-full text-start flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors",
                            isDark ? "text-white/70 hover:bg-white/[0.06] hover:text-white" : "text-gray-700 hover:bg-gray-50")}>
                          <Icon className="w-4 h-4 shrink-0" />{label}
                        </button>
                      ))}
                      <button
                        onClick={() => { deleteLead(lead.id); setActiveMenu(null); }}
                        className="w-full text-start flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />{t.common.delete}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      <p className={cn("text-xs", isDark ? "text-white/30" : "text-gray-400")}>
        {leads.length} / {total} leads
      </p>
    </div>
  );
}
