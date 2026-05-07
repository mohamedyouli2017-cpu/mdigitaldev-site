"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "./ContactForm";

const CALENDLY = "https://calendly.com/mohamedyouli2017/30min";

type Step = "choose" | "form";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export default function BookingModal({ isOpen, onClose, selectedPlan = "" }: BookingModalProps) {
  const { t } = useLanguage();
  const b = t.booking;
  const [step, setStep] = useState<Step>("choose");
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  /* Reset to choose step and focus first button on each open */
  useEffect(() => {
    if (isOpen) {
      setStep("choose");
      const timer = setTimeout(() => firstBtnRef.current?.focus(), 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* ESC to close */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const openCalendly = () => {
    const planSlug = selectedPlan.replace(/\s+/g, "");
    window.open(
      `${CALENDLY}?utm_source=mdigitaldev&utm_content=${planSlug}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative w-full max-w-md bg-[#0d0d0d] border border-white/[0.10] rounded-[28px] shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-7">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 id="booking-title" className="text-lg font-bold text-white leading-snug">
                      {b.modalTitle}
                    </h2>
                    {selectedPlan && (
                      <p className="text-xs text-white/35 mt-1">
                        {b.selectedPlanLabel}:{" "}
                        <span className="text-white/60 font-semibold">{selectedPlan}</span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    aria-label={b.closeBtn}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/40 hover:text-white transition-all ms-3"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Steps */}
                <AnimatePresence mode="wait">
                  {step === "choose" ? (
                    <motion.div
                      key="choose"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-3"
                    >
                      {/* Book a Call */}
                      <button
                        ref={firstBtnRef}
                        onClick={openCalendly}
                        className="group w-full text-start p-5 rounded-2xl bg-white/[0.04] border border-white/[0.10] hover:bg-white/[0.09] hover:border-white/[0.22] transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 bg-blue-500/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            <Calendar className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0 text-start">
                            <p className="text-white font-semibold text-sm">{b.bookCallTitle}</p>
                            <p className="text-white/45 text-xs mt-0.5">{b.bookCallDesc}</p>
                            <p className="text-white/25 text-xs">{b.bookCallSub}</p>
                          </div>
                          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                            {b.scheduleBtn} →
                          </span>
                        </div>
                      </button>

                      {/* OR divider */}
                      <div className="flex items-center gap-3 py-1">
                        <div className="flex-1 h-px bg-white/[0.08]" />
                        <span className="text-white/20 text-[11px] font-bold tracking-widest">{b.orText}</span>
                        <div className="flex-1 h-px bg-white/[0.08]" />
                      </div>

                      {/* Send Message */}
                      <button
                        onClick={() => setStep("form")}
                        className="group w-full text-start p-5 rounded-2xl bg-white/[0.04] border border-white/[0.10] hover:bg-white/[0.09] hover:border-white/[0.22] transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 bg-violet-500/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            <MessageSquare className="w-5 h-5 text-violet-400" />
                          </div>
                          <div className="flex-1 min-w-0 text-start">
                            <p className="text-white font-semibold text-sm">{b.sendMsgTitle}</p>
                            <p className="text-white/45 text-xs mt-0.5">{b.sendMsgDesc}</p>
                          </div>
                          <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                            {b.continueBtn} →
                          </span>
                        </div>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.22 }}
                    >
                      <ContactForm
                        initialPlan={selectedPlan}
                        onBack={() => setStep("choose")}
                        showBack
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
