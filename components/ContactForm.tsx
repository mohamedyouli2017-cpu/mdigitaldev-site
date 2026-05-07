"use client";

import { useState, useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, ChevronDown, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CALENDLY = "https://calendly.com/mohamedyouli2017/30min";

const schema = z.object({
  name:           z.string().min(2),
  email:          z.string().email(),
  phone:          z.string(),         // optional — no min validation
  businessType:   z.string().min(1),
  selectedPlan:   z.string(),         // auto-filled, can be empty
  projectDetails: z.string().min(10),
  budgetRange:    z.string(),         // optional — no min validation
  consent:        z.boolean().refine((v) => v === true),
});

type FormData = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  selectedPlan: string;
  projectDetails: string;
  budgetRange: string;
  consent: boolean;
};

interface ContactFormProps {
  initialPlan?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export default function ContactForm({ initialPlan = "", onBack, showBack = false }: ContactFormProps) {
  // ALL hooks must be called before any early return (Rules of Hooks).
  const { t, lang } = useLanguage();
  const b = t.booking;
  const uid = useId();

  // mounted guard — prevents SSR rendering and the useId / react-hook-form
  // hydration mismatch caused by the BookingModal ssr:false Suspense boundary.
  const [mounted, setMounted] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { selectedPlan: initialPlan, consent: false },
    mode: "onChange",
  });

  useEffect(() => { setMounted(true); }, []);

  // Server render (and first client paint) returns null — no hydration delta.
  // After mount, the full form renders client-side only.
  if (!mounted) return null;

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language: lang }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError((json as { error?: string }).error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmittedName(data.name.split(" ")[0]);
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center gap-5 py-6"
      >
        <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{b.successTitle}</h3>
          <p className="text-white/55 text-sm leading-relaxed max-w-xs mx-auto">
            {submittedName && <span className="text-white font-semibold">{submittedName}! </span>}
            {b.successMsg}
          </p>
        </div>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-100 active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4" />
          {b.successCalendlyBtn}
        </a>
      </motion.div>
    );
  }

  /* ── Shared styles ── */
  const inputCls =
    "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 focus:bg-white/[0.09] transition-colors";
  const labelCls = "block text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-1.5";
  const errCls   = "text-red-400 text-xs mt-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

      {/* Back button */}
      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/35 hover:text-white/65 text-sm transition-colors mb-1"
        >
          <ArrowLeft className="w-4 h-4" />
          {b.backBtn}
        </button>
      )}

      <h3 className="text-base font-bold text-white mb-3">{b.formTitle}</h3>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${uid}-name`} className={labelCls}>{b.fieldName} *</label>
          <input
            id={`${uid}-name`}
            {...register("name")}
            placeholder="John Doe"
            autoComplete="name"
            className={inputCls}
          />
          {errors.name && <p className={errCls}>{b.errName}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={labelCls}>{b.fieldEmail} *</label>
          <input
            id={`${uid}-email`}
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            autoComplete="email"
            className={inputCls}
          />
          {errors.email && <p className={errCls}>{b.errEmail}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor={`${uid}-phone`} className={labelCls}>{b.fieldPhone}</label>
        <input
          id={`${uid}-phone`}
          type="tel"
          {...register("phone")}
          placeholder="+212 669 586 001"
          autoComplete="tel"
          className={inputCls}
        />
      </div>

      {/* Business Type + Selected Plan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${uid}-biz`} className={labelCls}>{b.fieldBusinessType} *</label>
          <div className="relative">
            <select
              id={`${uid}-biz`}
              {...register("businessType")}
              className={`${inputCls} appearance-none cursor-pointer`}
            >
              <option value="" className="bg-[#111]">—</option>
              {b.bizOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#111]">{opt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          </div>
          {errors.businessType && <p className={errCls}>{b.errBusinessType}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-plan`} className={labelCls}>{b.fieldSelectedPlan}</label>
          <div className="relative">
            <select
              id={`${uid}-plan`}
              {...register("selectedPlan")}
              className={`${inputCls} appearance-none cursor-pointer`}
            >
              <option value="" className="bg-[#111]">—</option>
              {b.planOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#111]">{opt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div>
        <label htmlFor={`${uid}-details`} className={labelCls}>{b.fieldProjectDetails} *</label>
        <textarea
          id={`${uid}-details`}
          {...register("projectDetails")}
          rows={4}
          placeholder="Tell me what you're building, your goals, and any specific requirements…"
          className={`${inputCls} resize-none`}
        />
        {errors.projectDetails && <p className={errCls}>{b.errProjectDetails}</p>}
      </div>

      {/* Budget */}
      <div>
        <label htmlFor={`${uid}-budget`} className={labelCls}>{b.fieldBudget}</label>
        <div className="relative">
          <select
            id={`${uid}-budget`}
            {...register("budgetRange")}
            className={`${inputCls} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-[#111]">—</option>
            {b.budgetOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#111]">{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        </div>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3 pt-1">
        <input
          id={`${uid}-consent`}
          type="checkbox"
          {...register("consent")}
          className="mt-0.5 w-4 h-4 cursor-pointer flex-shrink-0 accent-white"
        />
        <label htmlFor={`${uid}-consent`} className="text-sm text-white/45 cursor-pointer leading-relaxed">
          {b.consentText}
        </label>
      </div>
      {errors.consent && <p className={errCls}>{b.errConsent}</p>}

      {/* Server error */}
      {serverError && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
          {serverError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="w-full py-3.5 bg-white text-black rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all duration-200"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {b.sendingText}
          </>
        ) : (
          <>
            {b.submitBtn}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
