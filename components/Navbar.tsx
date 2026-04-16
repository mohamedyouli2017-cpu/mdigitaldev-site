"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Facebook, Instagram, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

/* ── Language options ─────────────────────────────────────────────────────── */
const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English"  },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "ar", flag: "🇲🇦", label: "العربية"  },
];

/* ── Language Switcher ────────────────────────────────────────────────────── */
function LangSwitcher({ onDark }: { onDark: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      {/* Trigger pill */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border transition-all duration-200 ${
          onDark
            ? "border-white/15 text-white/70 hover:border-white/35 hover:text-white hover:bg-white/8"
            : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-black hover:bg-gray-50"
        }`}
        aria-label="Switch language"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: -6,  scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 w-40 rounded-2xl border border-white/10 bg-[#0e0e16]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                  lang === l.code
                    ? "bg-violet-500/20 text-white font-semibold"
                    : "text-white/60 hover:bg-white/8 hover:text-white"
                }`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span className="font-bold text-xs tracking-widest">{l.code.toUpperCase()}</span>
                <span className="text-white/50 text-xs">{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Navbar ───────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const onDark = !scrolled;

  const navLinks = [
    { label: t.nav.about,     href: "#about"    },
    { label: t.nav.whyMe,     href: "#why-me"   },
    { label: t.nav.services,  href: "#services"  },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.contact,   href: "#contact"   },
  ];

  return (
    <>
      {/* ── Main bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 ${
                onDark ? "bg-white" : "bg-black"
              }`}
            >
              <Zap
                className={`w-4 h-4 transition-colors duration-300 ${onDark ? "text-black" : "text-white"}`}
                fill={onDark ? "black" : "white"}
              />
            </div>
            <span
              className={`font-bold text-sm tracking-tight transition-colors duration-300 ${
                onDark ? "text-white" : "text-black"
              }`}
            >
              MDigital
              <span className={`font-light transition-colors duration-300 ${onDark ? "text-white/30" : "text-gray-400"}`}>
                Dev
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  onDark
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-gray-500 hover:text-black hover:bg-gray-100"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right-side controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social links */}
            <a
              href="https://www.facebook.com/profile.php?id=61570999496194"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={`transition-colors duration-300 hover:text-purple-500 ${
                onDark ? "text-white/60" : "text-gray-400"
              }`}
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/mdigitaldev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`transition-colors duration-300 hover:text-purple-500 ${
                onDark ? "text-white/60" : "text-gray-400"
              }`}
            >
              <Instagram size={20} />
            </a>

            {/* Language switcher */}
            <LangSwitcher onDark={onDark} />

            {/* CTA */}
            <button
              onClick={() => scrollTo("#contact")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full active:scale-95 transition-all duration-300 ${
                onDark
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile: lang switcher + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher onDark={onDark} />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`p-2 rounded-lg transition-colors ${
                onDark ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X    className={`w-5 h-5 ${onDark ? "text-white" : "text-black"}`} />
              ) : (
                <Menu className={`w-5 h-5 ${onDark ? "text-white" : "text-black"}`} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y:  0 }}
            exit={{   opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 inset-x-0 z-40 bg-[#0d0d0d] border-b border-white/10 shadow-2xl md:hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-4 px-4 pt-3 pb-1">
                <a
                  href="https://www.facebook.com/profile.php?id=61570999496194"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-white/50 hover:text-purple-400 transition-colors duration-300"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/mdigitaldev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/50 hover:text-purple-400 transition-colors duration-300"
                >
                  <Instagram size={20} />
                </a>
              </div>
              <div className="pt-2 pb-1">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-all"
                >
                  {t.nav.cta}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
