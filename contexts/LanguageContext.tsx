"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang, LangTranslations } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: LangTranslations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    const initial: Lang = saved === "fr" || saved === "ar" ? saved : "en";
    setLangState(initial);
    document.documentElement.lang = initial;
    document.documentElement.dir = initial === "ar" ? "rtl" : "ltr";
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
