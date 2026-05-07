"use client";

import { useEffect } from "react";

export default function PWAInit() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.__pwaPromptEvent) return; // already captured before mount

    const handler = (e: Event) => {
      e.preventDefault();
      w.__pwaPromptEvent = e;
      window.dispatchEvent(new Event("pwa-ready"));
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return null;
}
