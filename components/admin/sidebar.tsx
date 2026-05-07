"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, UserCheck, Calendar, DollarSign,
  Bot, Workflow, BarChart3, CheckSquare, Settings, X, Zap,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useAdminI18n } from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

const navItems = [
  { key: "overview",   href: "/admin",           icon: LayoutDashboard },
  { key: "leads",      href: "/admin/leads",      icon: Users           },
  { key: "clients",    href: "/admin/clients",    icon: UserCheck       },
  { key: "meetings",   href: "/admin/meetings",   icon: Calendar        },
  { key: "finances",   href: "/admin/finances",   icon: DollarSign      },
  { key: "chatbot",    href: "/admin/chatbot",    icon: Bot             },
  { key: "workflows",  href: "/admin/workflows",  icon: Workflow        },
  { key: "analytics",  href: "/admin/analytics",  icon: BarChart3       },
  { key: "tasks",      href: "/admin/tasks",      icon: CheckSquare     },
  { key: "settings",   href: "/admin/settings",   icon: Settings        },
] as const;

interface Props {
  collapsed:    boolean;
  onCollapse:   (v: boolean) => void;
  mobileOpen:   boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ collapsed, onCollapse, mobileOpen, onMobileClose }: Props) {
  const pathname = usePathname();
  const { t, dir } = useAdminI18n();
  const { theme }  = useAdminTheme();
  const isDark     = theme === "dark";

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const SidebarContent = () => (
    <aside
      className={cn(
        "flex flex-col h-full transition-all duration-300",
        isDark ? "bg-[#090909] border-white/[0.07]" : "bg-white border-black/[0.07]",
        "border-e",
        collapsed ? "w-[68px]" : "w-[240px]",
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-2.5 h-16 px-4 border-b shrink-0",
        isDark ? "border-white/[0.07]" : "border-black/[0.07]")}>
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" fill="white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className={cn("font-bold text-sm whitespace-nowrap overflow-hidden",
                isDark ? "text-white" : "text-gray-900")}
            >
              MDigital<span className={isDark ? "text-white/30" : "text-gray-400"}>Dev</span>
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={() => onCollapse(!collapsed)}
          className={cn(
            "hidden lg:flex ms-auto w-6 h-6 rounded-md items-center justify-center shrink-0 transition-colors",
            isDark ? "text-white/40 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100",
          )}
        >
          {(dir === "rtl" ? !collapsed : collapsed)
            ? <ChevronRight className="w-3.5 h-3.5" />
            : <ChevronLeft  className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map(({ key, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link key={key} href={href} onClick={onMobileClose}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-violet-600/15 text-violet-400"
                  : isDark
                    ? "text-white/50 hover:text-white hover:bg-white/[0.06]"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
              )}>
                <Icon className={cn("shrink-0 w-[18px] h-[18px]", active ? "text-violet-400" : "")} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {t.nav[key as keyof typeof t.nav]}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ms-auto w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Version */}
      {!collapsed && (
        <div className={cn("px-4 py-3 border-t text-[10px]",
          isDark ? "border-white/[0.07] text-white/20" : "border-black/[0.07] text-gray-400")}>
          MDigitalDev Admin v1.0
        </div>
      )}
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            />
            <motion.div
              initial={{ x: dir === "rtl" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: dir === "rtl" ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className={cn("fixed inset-y-0 z-50 lg:hidden",
                dir === "rtl" ? "right-0" : "left-0")}
            >
              <div className="relative h-full">
                <button
                  onClick={onMobileClose}
                  className="absolute top-4 end-[-44px] w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
                {/* Force uncollapsed on mobile */}
                <aside className={cn(
                  "flex flex-col h-full w-[240px] border-e",
                  isDark ? "bg-[#090909] border-white/[0.07]" : "bg-white border-black/[0.07]",
                )}>
                  <div className={cn("flex items-center gap-2.5 h-16 px-4 border-b",
                    isDark ? "border-white/[0.07]" : "border-black/[0.07]")}>
                    <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" fill="white" />
                    </div>
                    <span className={cn("font-bold text-sm", isDark ? "text-white" : "text-gray-900")}>
                      MDigital<span className={isDark ? "text-white/30" : "text-gray-400"}>Dev</span>
                    </span>
                  </div>
                  <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
                    {navItems.map(({ key, href, icon: Icon }) => {
                      const active = isActive(href);
                      return (
                        <Link key={key} href={href} onClick={onMobileClose}>
                          <div className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                            active
                              ? "bg-violet-600/15 text-violet-400"
                              : isDark
                                ? "text-white/50 hover:text-white hover:bg-white/[0.06]"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
                          )}>
                            <Icon className="shrink-0 w-[18px] h-[18px]" />
                            <span>{t.nav[key as keyof typeof t.nav]}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </nav>
                </aside>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
