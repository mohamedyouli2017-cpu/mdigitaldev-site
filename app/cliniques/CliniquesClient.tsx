"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import {
  Globe, CalendarCheck, BellRing, CheckCircle2, Languages, Star,
  LayoutDashboard, ListOrdered, HeartHandshake, BarChart3,
  Moon, Sparkles, ShieldCheck, Phone, Clapperboard, Workflow,
  MapPin, ArrowUpRight, Gift,
} from "lucide-react";
import {
  clinicTranslations, CLINIC_LANGS, PHONE_TEL, PHONE_PRETTY, TRUST_LINKS,
  waLink, type ClinicLang,
} from "./translations";

/* Brand palette (page-scoped) — teal #0a7c8c → turquoise #0bb1c4, navy #0f1724, gold #c9a24b */

const FEATURE_ICONS = [
  Globe, CalendarCheck, BellRing, CheckCircle2, Languages,
  Star, LayoutDashboard, ListOrdered, HeartHandshake, BarChart3,
];

const TRUST_ICONS = [Clapperboard, Workflow];

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** Fade-up once when scrolled into view (below-the-fold sections only) */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Section eyebrow label — letter-spacing only in LTR (it breaks Arabic letter joining) */
function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase ltr:tracking-[0.2em] mb-3 ${className}`}>
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════ */

export default function CliniquesClient({ initialLang }: { initialLang: ClinicLang }) {
  const [lang, setLangState] = useState<ClinicLang>(initialLang);
  const t     = clinicTranslations[lang];
  const isRtl = lang === "ar";
  const wa    = waLink(lang);

  function setLang(l: ClinicLang) {
    setLangState(l);
    // Keep the URL shareable in the chosen language; FR (default) stays clean
    const url = new URL(window.location.href);
    if (l === "fr") url.searchParams.delete("lang");
    else url.searchParams.set("lang", l);
    window.history.replaceState(null, "", url);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div dir={isRtl ? "rtl" : "ltr"} lang={lang} className="min-h-screen bg-white text-[#0f1724]">

        {/* ╔═══════════════ 1 · HERO ═══════════════╗ */}
        <section className="relative overflow-hidden bg-[#0f1724] text-white">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -top-40 -end-40 h-[28rem] w-[28rem] rounded-full bg-[#0bb1c4]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-48 -start-32 h-[26rem] w-[26rem] rounded-full bg-[#0a7c8c]/25 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
            {/* Top bar: brand + language switcher */}
            <div className="flex items-center justify-between gap-4 py-5">
              <span className="text-base font-extrabold ltr:tracking-tight" dir="ltr">
                MDigital<span className="text-[#0bb1c4]">Dev</span>
              </span>

              <div role="group" aria-label={t.switcherAria} className="flex rounded-full bg-white/10 p-1 ring-1 ring-white/15" dir="ltr">
                {CLINIC_LANGS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    lang={l}
                    className={`min-h-[40px] min-w-[48px] rounded-full px-3 text-sm font-bold transition-colors ${
                      lang === l ? "bg-white text-[#0f1724]" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero content — no entrance animation so it paints immediately on mobile */}
            <div className="pb-16 pt-8 sm:pb-24 sm:pt-14 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0bb1c4]/40 bg-[#0bb1c4]/10 px-4 py-1.5 text-sm font-semibold text-[#7fe3ee]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {t.hero.badge}
              </span>

              <h1 className="mx-auto mt-6 max-w-3xl text-[2rem] font-extrabold leading-tight sm:text-5xl md:text-[3.5rem] ltr:tracking-tight text-balance">
                {t.hero.titleLead}{" "}
                <span className="bg-gradient-to-r from-[#0bb1c4] to-[#5fe0ec] bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                {t.hero.sub}
              </p>

              <div className="mt-9 flex flex-col items-center gap-4">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[58px] w-full max-w-sm items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 text-lg font-bold text-[#0f1724] shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                >
                  <WhatsAppIcon />
                  {t.hero.cta}
                </a>

                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex min-h-[44px] items-center gap-2 px-3 text-white/80 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>{t.hero.orCall}</span>
                  <span dir="ltr" className="font-bold text-white underline decoration-white/30 underline-offset-4">
                    {PHONE_PRETTY}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ╔═══════════════ 2 · PROBLEM ═══════════════╗ */}
        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a7c8c]/10 text-[#0a7c8c]">
              <Moon className="h-7 w-7" aria-hidden="true" />
            </div>
            <Eyebrow className="text-[#0a7c8c]">{t.problem.label}</Eyebrow>
            <p className="text-xl leading-relaxed text-[#0f1724]/80 sm:text-2xl">
              {t.problem.text}
            </p>
            <p className="mt-6 text-xl font-extrabold text-[#0a7c8c] sm:text-2xl">
              {t.problem.punch}
            </p>
          </Reveal>
        </section>

        {/* ╔═══════════════ 3 · 10 FEATURES ═══════════════╗ */}
        <section className="bg-[#f4f8f9] px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-10 text-center sm:mb-14">
              <Eyebrow className="text-[#0a7c8c]">{t.features.label}</Eyebrow>
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl ltr:tracking-tight text-balance">
                {t.features.title}
              </h2>
            </Reveal>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-5">
              {t.features.items.map((item, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <li key={i}>
                    <Reveal delay={Math.min(i, 5) * 0.04} className="h-full">
                      <div className="flex h-full gap-4 rounded-2xl border border-[#0f1724]/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(15,23,36,0.04)] transition-shadow hover:shadow-[0_8px_28px_rgba(10,124,140,0.12)] xl:flex-col xl:p-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0a7c8c] to-[#0bb1c4] text-white">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold leading-snug">{item.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-[#0f1724]/60">{item.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ╔═══════════════ 4 · OFFER ═══════════════╗ */}
        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-2xl">
            <div className="relative overflow-hidden rounded-[28px] border-2 border-[#c9a24b] bg-[#0f1724] p-6 text-white shadow-[0_20px_60px_rgba(201,162,75,0.18)] sm:p-10">
              <div className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-[#c9a24b]/15 blur-3xl" />

              <div className="relative">
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#c9a24b] px-4 py-2 text-center text-xs font-extrabold uppercase text-[#0f1724] ltr:tracking-[0.12em] sm:text-sm">
                    <Gift className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {t.offer.badge}
                  </span>
                </div>

                <dl className="mt-8 divide-y divide-white/10">
                  {/* Setup fee */}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-5">
                    <dt className="text-white/70">{t.offer.setupLabel}</dt>
                    <dd className="ms-auto text-end">
                      <span className="text-3xl font-extrabold text-[#c9a24b]">{t.offer.setupPrice}</span>
                      <span className="ms-2 text-sm text-white/50">
                        {t.offer.setupWasPrefix} <s>{t.offer.setupWas}</s>
                      </span>
                    </dd>
                  </div>

                  {/* First month */}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-5">
                    <dt className="text-white/70">{t.offer.monthLabel}</dt>
                    <dd className="ms-auto text-end">
                      <span className="text-3xl font-extrabold text-[#c9a24b]">{t.offer.monthValue}</span>
                      <span className="ms-2 text-sm text-white/50">{t.offer.monthNote}</span>
                    </dd>
                  </div>

                  {/* Then */}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-5">
                    <dt className="text-white/70">{t.offer.thenLabel}</dt>
                    <dd className="ms-auto text-end">
                      <span className="text-3xl font-extrabold">{t.offer.thenPrice}</span>
                      <span className="text-lg font-semibold text-white/70">{t.offer.perMonth}</span>
                      <span className="mt-1 block text-sm text-white/50">{t.offer.thenNote}</span>
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-white/80">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a24b]" aria-hidden="true" />
                  {t.offer.note}
                </p>

                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#c9a24b] px-6 text-base font-bold text-[#0f1724] transition-colors hover:bg-[#d8b465]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.offer.cta}
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ╔═══════════════ 5 · TRUST ═══════════════╗ */}
        <section className="bg-[#f4f8f9] px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-10 text-center">
              <Eyebrow className="text-[#0a7c8c]">{t.trust.label}</Eyebrow>
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl ltr:tracking-tight text-balance">
                {t.trust.title}
              </h2>
              <p className="mt-4 inline-flex items-center gap-2 text-[#0f1724]/65">
                <MapPin className="h-4 w-4 shrink-0 text-[#0a7c8c]" aria-hidden="true" />
                {t.trust.local}
              </p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {t.trust.cards.map((card, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <Reveal key={i} delay={i * 0.08} className="h-full">
                    <a
                      href={TRUST_LINKS[i]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0f1724] to-[#16263a] p-6 text-white ring-1 ring-white/5 transition-shadow hover:shadow-[0_16px_40px_rgba(10,124,140,0.25)] sm:p-8"
                    >
                      <div className="pointer-events-none absolute -top-20 -end-20 h-56 w-56 rounded-full bg-[#0bb1c4]/15 blur-3xl" />
                      <div className="relative flex h-full flex-col">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0bb1c4]/15 text-[#5fe0ec]">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="mb-2 text-[11px] font-bold uppercase text-[#5fe0ec]/80 ltr:tracking-[0.2em]">
                          ✦ {card.label}
                        </p>
                        <h3 className="mb-3 text-xl font-extrabold leading-snug sm:text-2xl">{card.title}</h3>
                        <p className="mb-6 text-sm leading-relaxed text-white/70 sm:text-base">{card.desc}</p>
                        <span className="mt-auto inline-flex min-h-[44px] items-center gap-2 font-bold text-white">
                          {card.cta}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden="true" />
                        </span>
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ╔═══════════════ 6 · FINAL CTA ═══════════════╗ */}
        <section className="bg-gradient-to-br from-[#0a7c8c] to-[#0bb1c4] px-5 py-16 text-white sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-5xl ltr:tracking-tight">{t.final.title}</h2>
            <p className="mt-4 text-lg text-white/90">{t.final.sub}</p>

            <div className="mt-9 flex flex-col items-center gap-4">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[62px] w-full max-w-sm items-center justify-center gap-3 rounded-full bg-white px-8 text-lg font-bold text-[#0f1724] shadow-[0_10px_36px_rgba(15,23,36,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <WhatsAppIcon className="h-7 w-7 text-[#25D366]" />
                {t.final.cta}
              </a>

              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex min-h-[44px] items-center gap-2 px-3 text-white/90 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{t.final.orCall}</span>
                <span dir="ltr" className="font-bold underline decoration-white/40 underline-offset-4">
                  {PHONE_PRETTY}
                </span>
              </a>
            </div>
          </Reveal>
        </section>

        {/* Discreet link back to the main site — extra bottom padding clears the global floating buttons */}
        <footer className="bg-[#0f1724] px-5 pb-44 pt-8 text-center">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center text-sm text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {t.footerLink}
          </Link>
        </footer>
      </div>
    </MotionConfig>
  );
}
