"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/locales/admin/en.json";
import ar from "@/locales/admin/ar.json";
import fr from "@/locales/admin/fr.json";

export type AdminLang = "en" | "ar" | "fr";
type Translations = typeof en;

const dict: Record<AdminLang, Translations> = { en, ar, fr };

type AdminI18nCtx = {
  lang: AdminLang;
  dir:  "ltr" | "rtl";
  t:    Translations;
  setLang: (l: AdminLang) => void;
};

const AdminI18nContext = createContext<AdminI18nCtx>({
  lang: "ar", dir: "rtl", t: ar, setLang: () => {},
});

export function AdminI18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<AdminLang>("ar");

  useEffect(() => {
    const saved = (localStorage.getItem("admin_lang") ?? "ar") as AdminLang;
    const valid  = ["en", "ar", "fr"].includes(saved) ? saved : "ar";
    setLangState(valid as AdminLang);
    document.documentElement.lang = valid;
    document.documentElement.dir  = valid === "ar" ? "rtl" : "ltr";
  }, []);

  function setLang(l: AdminLang) {
    setLangState(l);
    localStorage.setItem("admin_lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir  = l === "ar" ? "rtl" : "ltr";
  }

  return (
    <AdminI18nContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", t: dict[lang], setLang }}>
      {children}
    </AdminI18nContext.Provider>
  );
}

export const useAdminI18n = () => useContext(AdminI18nContext);
