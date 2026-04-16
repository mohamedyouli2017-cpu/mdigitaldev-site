"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-r-gold/30
                 text-r-gold text-sm font-medium tracking-wide
                 hover:bg-r-gold/10 hover:border-r-gold/60
                 transition-all duration-200 select-none"
      aria-label="Toggle language"
    >
      <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
      <span className="text-r-gold/30">|</span>
      <span className={lang === "ar" ? "opacity-100" : "opacity-40"}>ع</span>
    </button>
  );
}
