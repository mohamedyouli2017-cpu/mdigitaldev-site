"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, Video, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import PageHeader   from "@/components/admin/page-header";
import { useAdminI18n }  from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

type MeetingStatus = "scheduled" | "completed" | "cancelled" | "no_show" | "rescheduled";

interface Meeting {
  id: string; title: string; invitee_name: string; invitee_email: string;
  scheduled_at: string; duration_minutes: number; status: MeetingStatus; notes?: string;
}

const now = new Date();
const DEMO: Meeting[] = [
  { id: "1", title: "15-min Discovery Call", invitee_name: "Ahmed Al-Rashid", invitee_email: "ahmed@alhilal-restaurant.com", scheduled_at: new Date(now.getTime() + 2 * 86400000).toISOString(),  duration_minutes: 15, status: "scheduled",  notes: "Interested in WhatsApp ordering" },
  { id: "2", title: "15-min Discovery Call", invitee_name: "Sophie Dupont",   invitee_email: "sophie@maison-luxe.fr",         scheduled_at: new Date(now.getTime() + 4 * 86400000).toISOString(),  duration_minutes: 15, status: "scheduled"  },
  { id: "3", title: "Monthly Check-in",      invitee_name: "Fatima Al-Zahra", invitee_email: "fatima@healthplus.ma",           scheduled_at: new Date(now.getTime() + 7 * 86400000).toISOString(),  duration_minutes: 30, status: "scheduled",  notes: "Discuss Phase 2" },
  { id: "4", title: "15-min Discovery Call", invitee_name: "Carlos Mendez",   invitee_email: "carlos@realty-pro.com",          scheduled_at: new Date(now.getTime() - 2 * 86400000).toISOString(),  duration_minutes: 15, status: "completed", notes: "Sent proposal after" },
  { id: "5", title: "Onboarding Call",       invitee_name: "Hassan Benali",   invitee_email: "hassan@automaroc.ma",            scheduled_at: new Date(now.getTime() - 8 * 86400000).toISOString(),  duration_minutes: 60, status: "completed" },
];

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

  const upcoming = DEMO.filter(m => !isPast(new Date(m.scheduled_at)));
  const past      = DEMO.filter(m => isPast(new Date(m.scheduled_at)));
  const cardBg    = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  const MeetingCard = ({ m, i }: { m: Meeting; i: number }) => {
    const Icon = STATUS_ICON[m.status];
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.06 }}
        className={cn("rounded-2xl p-4 border flex gap-4 items-start hover:border-violet-500/20 transition-colors", cardBg)}
      >
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", STATUS_COLOR[m.status])}>
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
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0", STATUS_COLOR[m.status])}>
              {t.meetings[`status_${m.status}` as keyof typeof t.meetings]}
            </span>
          </div>
          <div className={cn("flex items-center gap-4 mt-2 text-xs", isDark ? "text-white/35" : "text-gray-400")}>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{dateLabel(m.scheduled_at)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{format(new Date(m.scheduled_at), "HH:mm")}</span>
            <span className="flex items-center gap-1"><Video className="w-3 h-3" />{m.duration_minutes} min</span>
          </div>
          {m.notes && (
            <p className={cn("text-xs mt-2 italic", isDark ? "text-white/30" : "text-gray-400")}>{m.notes}</p>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6 max-w-[900px]">
      <PageHeader title={t.meetings.title} subtitle={t.meetings.subtitle} />

      <section>
        <h2 className={cn("text-xs font-bold uppercase tracking-wider mb-3",
          isDark ? "text-white/35" : "text-gray-400")}>{t.meetings.upcoming} ({upcoming.length})</h2>
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
        <h2 className={cn("text-xs font-bold uppercase tracking-wider mb-3",
          isDark ? "text-white/35" : "text-gray-400")}>{t.meetings.past} ({past.length})</h2>
        <div className="space-y-3">
          {past.map((m, i) => <MeetingCard key={m.id} m={m} i={i} />)}
        </div>
      </section>
    </div>
  );
}
