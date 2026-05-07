"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu, Bell, Sun, Moon, Search, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminI18n, type AdminLang } from "@/lib/admin-i18n";
import { useAdminTheme } from "@/lib/admin-theme";
import { cn } from "@/lib/cn";

interface Props { onMobileMenuOpen: () => void }

export default function AdminHeader({ onMobileMenuOpen }: Props) {
  const { t, lang, setLang } = useAdminI18n();
  const { theme, toggle }    = useAdminTheme();
  const isDark = theme === "dark";
  const [langOpen, setLangOpen] = useState(false);

  const langs: { code: AdminLang; label: string }[] = [
    { code: "ar", label: "العربية" },
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-30 h-16 flex items-center gap-3 px-4 sm:px-6 border-b shrink-0",
      isDark
        ? "bg-[#0a0a0a]/90 border-white/[0.07] backdrop-blur-md"
        : "bg-white/90 border-black/[0.07] backdrop-blur-md",
    )}>
      {/* Mobile menu button */}
      <button
        onClick={onMobileMenuOpen}
        className={cn("lg:hidden p-2 rounded-xl transition-colors",
          isDark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100")}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className={cn("hidden sm:flex flex-1 max-w-xs items-center gap-2 px-3 py-2 rounded-xl border text-sm",
        isDark
          ? "bg-white/[0.04] border-white/[0.08] text-white/40"
          : "bg-gray-50 border-gray-200 text-gray-400")}>
        <Search className="w-4 h-4 shrink-0" />
        <span>{t.common.search}…</span>
      </div>

      <div className="flex-1" />

      {/* Lang switcher */}
      <div className="relative">
        <button
          onClick={() => setLangOpen(v => !v)}
          className={cn("flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors",
            isDark
              ? "border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.06]"
              : "border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100")}
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="uppercase">{lang}</span>
        </button>
        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute end-0 mt-1 w-36 rounded-xl border shadow-xl overflow-hidden z-50",
                isDark ? "bg-[#1a1a1a] border-white/[0.1]" : "bg-white border-gray-200",
              )}
            >
              {langs.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setLangOpen(false); }}
                  className={cn(
                    "w-full text-start px-3 py-2.5 text-sm transition-colors",
                    lang === l.code
                      ? "text-violet-400 bg-violet-600/10"
                      : isDark
                        ? "text-white/70 hover:bg-white/[0.06] hover:text-white"
                        : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-colors border",
          isDark
            ? "border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.06]"
            : "border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100")}
        title={isDark ? t.settings.lightMode : t.settings.darkMode}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Notifications */}
      <button
        className={cn("relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors border",
          isDark
            ? "border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.06]"
            : "border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100")}
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-2 end-2 w-1.5 h-1.5 bg-violet-500 rounded-full" />
      </button>

      {/* Clerk user button */}
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-8 h-8 rounded-xl",
            userButtonPopoverCard: isDark ? "bg-[#1a1a1a] border border-white/10" : undefined,
          },
        }}
        signInUrl="/admin/sign-in"
      />
    </header>
  );
}
