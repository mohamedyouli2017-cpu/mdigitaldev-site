"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";
type ThemeCtx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const ThemeContext = createContext<ThemeCtx>({ theme: "dark", toggle: () => {}, setTheme: () => {} });

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("admin_theme") ?? "dark") as Theme;
    setThemeState(saved);
    document.documentElement.setAttribute("data-admin-theme", saved);
  }, []);

  function applyTheme(next: Theme) {
    setThemeState(next);
    localStorage.setItem("admin_theme", next);
    document.documentElement.setAttribute("data-admin-theme", next);
  }

  function toggle() { applyTheme(theme === "dark" ? "light" : "dark"); }

  return <ThemeContext.Provider value={{ theme, toggle, setTheme: applyTheme }}>{children}</ThemeContext.Provider>;
}

export const useAdminTheme = () => useContext(ThemeContext);
