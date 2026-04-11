"use client";

/**
 * PWAInstallPrompt
 * ─────────────────────────────────────────────────────────────────
 * Shows a native-style "Add to Home Screen" banner on mobile only.
 *
 * WHY THE RACE-CONDITION FIX IS NEEDED
 * `beforeinstallprompt` fires once, very early in the page lifecycle —
 * often before React finishes hydrating. A plain useEffect listener
 * always misses it. The fix is a two-part approach:
 *
 *   1. An inline <script> in layout.tsx <head> captures the event
 *      synchronously into window.__pwaPromptEvent and also re-dispatches
 *      a "pwa-ready" custom event.
 *   2. This component reads window.__pwaPromptEvent on mount (covers
 *      the case the event fired before React), AND listens for
 *      "pwa-ready" (covers the rare case it fires after mount).
 *
 * Platform behaviour:
 *   • Android / Chrome  → triggers the browser's native install dialog.
 *   • iOS Safari        → shows manual "Share → Add to Home Screen" tip
 *                         (iOS doesn't fire beforeinstallprompt).
 *
 * Dismissal is stored in localStorage and suppressed for 7 days.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Extend window with our globally-captured event
declare global {
  interface Window {
    __pwaPromptEvent: BeforeInstallPromptEvent | null;
  }
}

type PromptVariant = "android" | "ios" | null;

export default function PWAInstallPrompt() {
  const [variant,       setVariant] = useState<PromptVariant>(null);
  const [deferredPrompt, setDeferred] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    /* ── Guard checks ── */
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return;

    // Already running as an installed PWA — no need to prompt
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Dismissed recently → wait 7 days
    const dismissed = localStorage.getItem("pwa-dismissed");
    if (dismissed && Date.now() - Number(dismissed) < 7 * 86_400_000) return;

    const isIos    = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    /* ── iOS Safari → manual instructions ── */
    if (isIos && isSafari) {
      const id = setTimeout(() => setVariant("ios"), 2500);
      return () => clearTimeout(id);
    }

    /* ── Android / Chrome ── */

    // Case A: event already fired before this component mounted
    // (captured by the inline <script> in layout.tsx <head>)
    const already = window.__pwaPromptEvent;
    if (already) {
      setDeferred(already);
      setVariant("android");
      return;
    }

    // Case B: event fires after mount → listen for our custom re-dispatch
    const onReady = () => {
      const e = window.__pwaPromptEvent;
      if (e) {
        setDeferred(e);
        setVariant("android");
      }
    };
    window.addEventListener("pwa-ready", onReady);
    return () => window.removeEventListener("pwa-ready", onReady);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") dismiss();
    setDeferred(null);
    window.__pwaPromptEvent = null;
  };

  const dismiss = () => {
    localStorage.setItem("pwa-dismissed", String(Date.now()));
    setVariant(null);
  };

  return (
    <AnimatePresence>
      {variant && (
        <motion.div
          key="pwa-banner"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{   y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          /* sits just above the floating WhatsApp button */
          className="fixed bottom-24 left-3 right-3 z-50 md:hidden"
          role="dialog"
          aria-label="Install app banner"
        >
          <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center gap-3">

            {/* App icon — matches the Navbar logo */}
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-black" fill="black" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold leading-tight">
                Install App
              </p>
              {variant === "android" ? (
                <p className="text-white/40 text-xs mt-0.5">
                  Add to your home screen — works offline too
                </p>
              ) : (
                <p className="text-white/40 text-xs mt-0.5">
                  Tap <Share className="w-3 h-3 inline mx-0.5" />
                  then &ldquo;Add to Home Screen&rdquo;
                </p>
              )}
            </div>

            {/* Install CTA (Android only — iOS shows instructions inline) */}
            {variant === "android" && (
              <button
                onClick={handleInstall}
                className="flex-shrink-0 px-3.5 py-1.5 bg-white text-black text-xs font-bold rounded-full active:scale-95 transition-transform"
              >
                Install
              </button>
            )}

            {/* Dismiss */}
            <button
              onClick={dismiss}
              className="flex-shrink-0 p-1 -mr-1"
              aria-label="Dismiss install prompt"
            >
              <X className="w-4 h-4 text-white/30" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
