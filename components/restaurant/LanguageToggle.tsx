"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "ع"  },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center gap-0.5 p-0.5 rounded-full border border-r-gold/30
                 bg-r-charcoal/60 backdrop-blur-sm"
      role="group"
      aria-label="Select language"
    >
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide
                      transition-all duration-200 select-none
                      ${lang === code
                        ? "bg-r-gold text-r-charcoal shadow-sm"
                        : "text-r-cream/50 hover:text-r-gold"
                      }`}
          aria-pressed={lang === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
