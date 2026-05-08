"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Video, CheckCircle, XCircle, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { toast } from "sonner";
import PageHeader   from "@/components/admin/page-header";
import { useAdminI18n }  from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

type MeetingStatus = "scheduled" | "completed" | "cancelled" | "no_show" | "rescheduled";

interface Meeting {
  id: string;
  title: string;
  invitee_name: string;
  invitee_email: string;
  scheduled_at: string;
  duration_minutes: number;
  status: MeetingStatus;
  notes?: string | null;
  meeting_link?: string | null;
  calendly_event_id?: string | null;
  leads?: { id: string; name: string; email: string; status: string } | null;
}

const STATUS_ICON: Record<MeetingStatus, typeof CheckCircle> = {
  scheduled:   Clock,
  completed:   CheckCircle,
  cancelled:   XCircle,
  no_show:     AlertCircle,
  rescheduled: Clock,
};
const STATUS_COLOR: Record<MeetingStatus, string> = {
  scheduled:   "text-blue-400 bg-blue-500/10",
  completed:   "text-emerald-400 bg-emerald-500/10",
  cancelled:   "text-red-400 bg-red-500/10",
  no_show:     "text-amber-400 bg-amber-500/10",
  rescheduled: "text-violet-400 bg-violet-500/10",
};

function dateLabel(dateStr: string) {
  const d = new Date(dateStr);
  if (isToday(d))    return "Today";
  if (isTomorrow(d)) return "Tomorrow";
  return format(d, "EEE, MMM d");
}

export default function MeetingsPage() {
  const { t }     = useAdminI18n();
  const { theme } = useAdminTheme();
  const isDark    = theme === "dark";

  const [meetings,    setMeetings]    = useState<Meeting[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [syncing,     setSyncing]     = useState(false);
  const [lastSynced,  setLastSynced]  = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const cardBg = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    try {
      const url = statusFilter
        ? `/api/admin/meetings?status=${statusFilter}`
        : `/api/admin/meetings`;
      const res  = await fetch(url);
      const data = await res.json();
      if (data.meetings) setMeetings(data.meetings);
    } catch {
      toast.error("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetchMeetings(); }, [fetchMeetings]);

  async function handleSync() {
    setSyncing(true);
    try {
      const res  = await fetch("/api/admin/calendly/sync", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Sync failed");
        return;
      }

      const parts: string[] = [];
      if (data.newMeetings > 0)    parts.push(`${data.newMeetings} new meetings`);
      if (data.updatedMeetings > 0) parts.push(`${data.updatedMeetings} updated`);
      if (data.newLeads > 0)       parts.push(`${data.newLeads} new leads`);

      const msg = parts.length > 0
        ? `Synced! ${parts.join(", ")}`
        : `Synced — ${data.totalProcessed} events checked, nothing new`;

      if (data.errors?.length > 0) {
        toast.warning(msg, { description: `${data.errors.length} error(s) — check logs` });
      } else {
        toast.success(msg);
      }

      setLastSynced(new Date());
      await fetchMeetings();
    } catch {
      toast.error("Sync request failed");
    } finally {
      setSyncing(false);
    }
  }

  const upcoming = meetings.filter(m => m.status === "scheduled" && !isPast(new Date(m.scheduled_at)));
  const past      = meetings.filter(m => m.status !== "scheduled" || isPast(new Date(m.scheduled_at)));

  const MeetingCard = ({ m, i }: { m: Meeting; i: number }) => {
    const Icon = STATUS_ICON[m.status] ?? Clock;
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.06 }}
        className={cn("rounded-2xl p-4 border flex gap-4 items-start hover:border-violet-500/20 transition-colors", cardBg)}
      >
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", STATUS_COLOR[m.status] ?? "text-gray-400 bg-gray-500/10")}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>{m.title}</p>
              <p className={cn("text-xs mt-0.5 flex items-center gap-1", isDark ? "text-white/45" : "text-gray-500")}>
                <User className="w-3 h-3" />{m.invitee_name}
                <span className="opacity-40">·</span>{m.invitee_email}
              </p>
            </div>
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0", STATUS_COLOR[m.status] ?? "text-gray-400 bg-gray-500/10")}>
              {t.meetings[`status_${m.status}` as keyof typeof t.meetings] ?? m.status}
            </span>
          </div>
          <div className={cn("flex items-center gap-4 mt-2 text-xs", isDark ? "text-white/35" : "text-gray-400")}>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{dateLabel(m.scheduled_at)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{format(new Date(m.scheduled_at), "HH:mm")}</span>
            <span className="flex items-center gap-1"><Video className="w-3 h-3" />{m.duration_minutes} min</span>
            {m.meeting_link && (
              <a
                href={m.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-violet-400 hover:text-violet-300"
              >
                <ExternalLink className="w-3 h-3" />Join
              </a>
            )}
          </div>
          {m.notes && (
            <p className={cn("text-xs mt-2 italic", isDark ? "text-white/30" : "text-gray-400")}>{m.notes}</p>
          )}
        </div>
      </motion.div>
    );
  };

  const filterBtnBase = "text-xs px-3 py-1.5 rounded-lg font-medium transition-colors";
  const filterActive  = isDark ? "bg-violet-600 text-white" : "bg-violet-600 text-white";
  const filterInactive = isDark ? "bg-white/5 text-white/50 hover:bg-white/10" : "bg-gray-100 text-gray-500 hover:bg-gray-200";

  return (
    <div className="space-y-6 max-w-[900px]">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <PageHeader title={t.meetings.title} subtitle={t.meetings.subtitle} />
        <div className="flex items-center gap-3 shrink-0">
          {lastSynced && (
            <span className={cn("text-xs", isDark ? "text-white/30" : "text-gray-400")}>
              Last sync: {format(lastSynced, "HH:mm")}
            </span>
          )}
          <button
            onClick={handleSync}
            disabled={syncing}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
              "bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <RefreshCw className={cn("w-4 h-4", syncing && "animate-spin")} />
            {syncing ? "Syncing..." : "Sync Now"}
          </button>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["", "scheduled", "completed", "cancelled", "no_show"] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(filterBtnBase, statusFilter === s ? filterActive : filterInactive)}
          >
            {s === "" ? "All" : t.meetings[`status_${s}` as keyof typeof t.meetings] ?? s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={cn("rounded-2xl h-24 animate-pulse", isDark ? "bg-white/[0.03]" : "bg-gray-100")}
            />
          ))}
        </div>
      ) : (
        <>
          <section>
            <h2 className={cn("text-xs font-bold uppercase tracking-wider mb-3", isDark ? "text-white/35" : "text-gray-400")}>
              {t.meetings.upcoming} ({upcoming.length})
            </h2>
            <div className="space-y-3">
              {upcoming.map((m, i) => <MeetingCard key={m.id} m={m} i={i} />)}
              {upcoming.length === 0 && (
                <p className={cn("text-sm text-center py-8", isDark ? "text-white/30" : "text-gray-400")}>
                  {t.meetings.noMeetings}
                </p>
              )}
            </div>
          </section>

          <section>
            <h2 className={cn("text-xs font-bold uppercase tracking-wider mb-3", isDark ? "text-white/35" : "text-gray-400")}>
              {t.meetings.past} ({past.length})
            </h2>
            <div className="space-y-3">
              {past.map((m, i) => <MeetingCard key={m.id} m={m} i={i} />)}
              {past.length === 0 && (
                <p className={cn("text-sm text-center py-8", isDark ? "text-white/30" : "text-gray-400")}>
                  No past meetings
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
