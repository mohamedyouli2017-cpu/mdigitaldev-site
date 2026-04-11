"use client";

/**
 * PWAInstallPrompt
 * ─────────────────────────────────────────────────────────────────
 * Shows a native-style "Add to Home Screen" banner exclusively on
 * mobile devices (phones / tablets).
 *
 * • Android / Chrome  → listens for `beforeinstallprompt` and
 *   triggers the browser's native install dialog.
 * • iOS Safari        → shows manual "Share → Add to Home Screen"
 *   instructions, since iOS doesn't fire beforeinstallprompt.
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

type PromptVariant = "android" | "ios" | null;

export default function PWAInstallPrompt() {
  const [variant, setVariant]       = useState<PromptVariant>(null);
  const [deferredPrompt, setDeferred] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Only show on mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return;

    // Already running as installed PWA
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Dismissed recently — wait 7 days before showing again
    const dismissed = localStorage.getItem("pwa-dismissed");
    if (dismissed && Date.now() - Number(dismissed) < 7 * 86_400_000) return;

    const isIos     = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isSafari  = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIos && isSafari) {
      // iOS Safari — show manual instructions after a short delay
      const id = setTimeout(() => setVariant("ios"), 3000);
      return () => clearTimeout(id);
    }

    // Android / Chrome — wait for the browser event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVariant("android");
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") dismiss();
    setDeferred(null);
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
          /* sits just above the floating WhatsApp button (bottom-20) */
          className="fixed bottom-24 left-3 right-3 z-50 md:hidden"
          role="dialog"
          aria-label="Install app banner"
        >
          <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center gap-3">

            {/* App icon */}
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-black" fill="black" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold leading-tight">
                Add to Home Screen
              </p>
              {variant === "android" ? (
                <p className="text-white/40 text-xs mt-0.5">
                  Open like a native app — no App Store needed
                </p>
              ) : (
                <p className="text-white/40 text-xs mt-0.5 flex items-center gap-1">
                  Tap <Share className="w-3 h-3 inline" /> then
                  &ldquo;Add to Home Screen&rdquo;
                </p>
              )}
            </div>

            {/* CTA */}
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
