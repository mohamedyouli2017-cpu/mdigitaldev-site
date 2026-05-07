"use client";

import { motion } from "framer-motion";
import { MessageSquare, TrendingUp, DollarSign, Users, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import StatCard   from "@/components/admin/stat-card";
import PageHeader from "@/components/admin/page-header";
import { useAdminI18n }  from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

interface Conversation {
  id: string; visitor_id: string; started_at: string;
  message_count: number; outcome: "browsing" | "booked" | "lead" | "exited";
  last_message: string;
}

const DEMO: Conversation[] = [
  { id: "1", visitor_id: "v_8f3a2",  started_at: new Date(Date.now() - 1  * 3600000).toISOString(), message_count: 6,  outcome: "booked",  last_message: "I'd like to book a discovery call for next week." },
  { id: "2", visitor_id: "v_9d1c4",  started_at: new Date(Date.now() - 3  * 3600000).toISOString(), message_count: 4,  outcome: "lead",    last_message: "Can you send me more info about the Enterprise plan?" },
  { id: "3", visitor_id: "v_2b7e9",  started_at: new Date(Date.now() - 7  * 3600000).toISOString(), message_count: 2,  outcome: "exited",  last_message: "How much does it cost?" },
  { id: "4", visitor_id: "v_5f0a1",  started_at: new Date(Date.now() - 14 * 3600000).toISOString(), message_count: 9,  outcome: "booked",  last_message: "Perfect, I booked for Thursday at 3pm." },
  { id: "5", visitor_id: "v_3c8d2",  started_at: new Date(Date.now() - 26 * 3600000).toISOString(), message_count: 3,  outcome: "browsing", last_message: "Interesting. I'll think about it." },
  { id: "6", visitor_id: "v_7e2f4",  started_at: new Date(Date.now() - 48 * 3600000).toISOString(), message_count: 11, outcome: "booked",  last_message: "Done! See you on the call." },
];

const OUTCOME_STYLE: Record<Conversation["outcome"], string> = {
  booked:   "bg-emerald-500/15 text-emerald-400",
  lead:     "bg-violet-500/15 text-violet-400",
  browsing: "bg-blue-500/15 text-blue-400",
  exited:   "bg-white/[0.07] text-white/35",
};

export default function ChatbotPage() {
  const { t }     = useAdminI18n();
  const { theme } = useAdminTheme();
  const isDark    = theme === "dark";
  const cardBg    = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  const booked = DEMO.filter(c => c.outcome === "booked").length;
  const rate   = Math.round((booked / DEMO.length) * 100);

  return (
    <div className="space-y-6 max-w-[1200px]">
      <PageHeader title={t.chatbot.title} subtitle={t.chatbot.subtitle} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t.chatbot.totalConversations} value={String(DEMO.length)}         icon={MessageSquare} iconColor="text-violet-400"  iconBg="bg-violet-500/10"  trend={12} delay={0} />
        <StatCard title={t.chatbot.today}              value="3"                            icon={Users}         iconColor="text-blue-400"    iconBg="bg-blue-500/10"    trend={5}  delay={1} />
        <StatCard title={t.chatbot.conversionRate}     value={`${rate}%`}                   icon={TrendingUp}    iconColor="text-emerald-400" iconBg="bg-emerald-500/10" trend={3}  delay={2} />
        <StatCard title={t.chatbot.totalCost}          value="$0.42"                        icon={DollarSign}    iconColor="text-amber-400"   iconBg="bg-amber-500/10"             delay={3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className={cn("rounded-2xl border overflow-hidden", isDark ? "border-white/[0.07]" : "border-gray-200 shadow-sm")}
      >
        <div className={cn("px-5 py-4 border-b", isDark ? "border-white/[0.07] bg-white/[0.02]" : "border-gray-100 bg-gray-50")}>
          <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>{t.chatbot.recentConversations}</p>
        </div>

        {DEMO.map((conv, i) => (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className={cn(
              "flex items-center gap-4 px-5 py-4 border-b last:border-0 cursor-pointer transition-colors",
              isDark ? "border-white/[0.04] hover:bg-white/[0.02]" : "border-gray-50 hover:bg-gray-50",
            )}
          >
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", OUTCOME_STYLE[conv.outcome])}>
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm font-medium truncate", isDark ? "text-white" : "text-gray-900")}>{conv.last_message}</p>
              <p className={cn("text-xs mt-0.5", isDark ? "text-white/35" : "text-gray-400")}>
                {conv.visitor_id} · {conv.message_count} messages · {format(new Date(conv.started_at), "MMM d, HH:mm")}
              </p>
            </div>
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 capitalize", OUTCOME_STYLE[conv.outcome])}>
              {conv.outcome}
            </span>
            <ChevronRight className={cn("w-4 h-4 shrink-0", isDark ? "text-white/20" : "text-gray-300")} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
