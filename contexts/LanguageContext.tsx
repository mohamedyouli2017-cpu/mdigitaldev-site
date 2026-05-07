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
  const [lang,    setLangState] = useState<Lang>("en");
  const [mounted, setMounted]   = useState(false);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir  = l === "ar" ? "rtl" : "ltr";
  }

  useEffect(() => {
    const saved   = localStorage.getItem("lang") as Lang | null;
    const initial: Lang = saved === "fr" || saved === "ar" ? saved : "en";
    setLangState(initial);
    setMounted(true);
    document.documentElement.lang = initial;
    document.documentElement.dir  = initial === "ar" ? "rtl" : "ltr";
  }, []);

  // Always serve "en" on the first render (matches server HTML).
  // Switch to the saved language only after the component has mounted,
  // preventing the React 18 concurrent-renderer from detecting a mismatch
  // between the server-rendered HTML and the client's re-render.
  const effectiveLang = mounted ? lang : "en";

  return (
    <LanguageContext.Provider value={{ lang: effectiveLang, setLang, t: translations[effectiveLang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
