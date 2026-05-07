"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, Circle, Clock, AlertTriangle, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import PageHeader from "@/components/admin/page-header";
import { useAdminI18n }  from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

type Priority = "low" | "medium" | "high" | "urgent";
type Stage    = "todo" | "inProgress" | "done";

interface Task {
  id: string; title: string; description?: string;
  priority: Priority; stage: Stage; due_date?: string; tags?: string[];
}

const TASKS: Task[] = [
  { id: "1",  title: "Build HealthPlus client portal",   description: "Create a dedicated client portal with booking and report access.",       priority: "high",   stage: "inProgress", due_date: "2026-05-15", tags: ["client", "dev"]     },
  { id: "2",  title: "Update AutoMaroc website content", description: "New car listings and updated pricing for May 2026.",                      priority: "medium", stage: "inProgress", due_date: "2026-05-10", tags: ["client", "content"]  },
  { id: "3",  title: "Send May invoices",                                                                                                         priority: "urgent", stage: "todo",       due_date: "2026-05-01", tags: ["finance"]            },
  { id: "4",  title: "Set up n8n lead nurture sequence",  description: "3-email drip sequence for new leads who don't book immediately.",         priority: "high",   stage: "todo",       due_date: "2026-05-20", tags: ["automation"]         },
  { id: "5",  title: "Record YouTube intro video",        description: "2-min agency intro for YouTube/LinkedIn channel.",                        priority: "low",    stage: "todo",                               tags: ["marketing"]          },
  { id: "6",  title: "Set up Supabase RLS policies",     description: "Finish RLS for leads, clients, and payments tables.",                     priority: "high",   stage: "todo",       due_date: "2026-05-08", tags: ["dev"]                },
  { id: "7",  title: "Onboard Nour Events Phase 2",      description: "Implement event registration feature per SOW.",                            priority: "medium", stage: "todo",       due_date: "2026-06-01", tags: ["client", "dev"]     },
  { id: "8",  title: "Deploy admin dashboard to Vercel",                                                                                          priority: "urgent", stage: "done",                               tags: ["dev"]                },
  { id: "9",  title: "Install Anthropic SDK + chatbot",  description: "Switched from Groq → Claude. Chatbot now working.",                       priority: "high",   stage: "done",                               tags: ["dev"]                },
  { id: "10", title: "Update privacy policy (multilingual)",                                                                                      priority: "low",    stage: "done",                               tags: ["legal"]              },
];

const PRIORITY_STYLES: Record<Priority, string> = {
  low:    "text-white/40 bg-white/[0.06]",
  medium: "text-blue-400 bg-blue-500/10",
  high:   "text-amber-400 bg-amber-500/10",
  urgent: "text-red-400 bg-red-500/10",
};
const PRIORITY_ICONS: Record<Priority, typeof Circle> = {
  low:    Circle,
  medium: Circle,
  high:   AlertTriangle,
  urgent: AlertTriangle,
};

const STAGES: Stage[] = ["todo", "inProgress", "done"];

export default function TasksPage() {
  const { t }     = useAdminI18n();
  const { theme } = useAdminTheme();
  const isDark    = theme === "dark";
  const [tasks, setTasks] = useState(TASKS);

  const cardBg = isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  const cycleStage = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const next: Stage = t.stage === "todo" ? "inProgress" : t.stage === "inProgress" ? "done" : "todo";
      return { ...t, stage: next };
    }));
  };

  const stageLabel: Record<Stage, string> = {
    todo:       t.tasks.todo,
    inProgress: t.tasks.inProgress,
    done:       t.tasks.done,
  };

  const stageColor: Record<Stage, string> = {
    todo:       isDark ? "text-white/40" : "text-gray-400",
    inProgress: "text-amber-400",
    done:       "text-emerald-400",
  };

  return (
    <div className="space-y-6 max-w-[1000px]">
      <PageHeader
        title={t.tasks.title}
        subtitle={t.tasks.subtitle}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors">
            <Plus className="w-4 h-4" />{t.tasks.addTask}
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4 text-center">
        {STAGES.map(stage => {
          const count = tasks.filter(t => t.stage === stage).length;
          return (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={cn("rounded-2xl p-4 border", cardBg)}
            >
              <p className={cn("text-2xl font-bold", stageColor[stage])}>{count}</p>
              <p className={cn("text-xs mt-0.5", isDark ? "text-white/40" : "text-gray-500")}>{stageLabel[stage]}</p>
            </motion.div>
          );
        })}
      </div>

      {STAGES.map((stage, si) => {
        const stageTasks = tasks.filter(t => t.stage === stage);
        if (stageTasks.length === 0) return null;
        return (
          <section key={stage}>
            <h2 className={cn("text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2", stageColor[stage])}>
              {stage === "done" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
              {stageLabel[stage]} ({stageTasks.length})
            </h2>
            <div className="space-y-2">
              <AnimatePresence>
                {stageTasks.map((task, i) => {
                  const PIcon = PRIORITY_ICONS[task.priority];
                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: si * 0.05 + i * 0.04 }}
                      className={cn(
                        "rounded-xl p-4 border flex items-start gap-3 hover:border-violet-500/20 transition-colors",
                        cardBg,
                        task.stage === "done" && "opacity-60",
                      )}
                    >
                      <button
                        onClick={() => cycleStage(task.id)}
                        className={cn("mt-0.5 shrink-0 transition-colors", stageColor[task.stage])}
                      >
                        {task.stage === "done"
                          ? <CheckCircle2 className="w-5 h-5" />
                          : <Circle className="w-5 h-5" />
                        }
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start gap-2 justify-between">
                          <p className={cn("text-sm font-medium", task.stage === "done" ? "line-through opacity-50" : isDark ? "text-white" : "text-gray-900")}>
                            {task.title}
                          </p>
                          <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full capitalize shrink-0", PRIORITY_STYLES[task.priority])}>
                            {t.tasks[`priority_${task.priority}` as keyof typeof t.tasks]}
                          </span>
                        </div>
                        {task.description && (
                          <p className={cn("text-xs mt-1", isDark ? "text-white/35" : "text-gray-400")}>{task.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {task.due_date && (
                            <span className={cn("text-xs flex items-center gap-1", isDark ? "text-white/30" : "text-gray-400")}>
                              <Clock className="w-3 h-3" />
                              {format(new Date(task.due_date), "MMM d")}
                            </span>
                          )}
                          {task.tags?.map(tag => (
                            <span key={tag} className={cn("text-xs px-1.5 py-0.5 rounded-md", isDark ? "bg-white/[0.06] text-white/35" : "bg-gray-100 text-gray-400")}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </section>
        );
      })}
    </div>
  );
}
