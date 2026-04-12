"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";

import {
  Zap,
  Palette,
  Smartphone,
  ArrowRight,
  Star,
  CheckCircle2,
  MessageCircle,
  Mail,
  ExternalLink,
  ChevronRight,
  Globe,
  ShoppingCart,
  Cloud,
  Gauge,
  Code2,
  Sparkles,
  X,
  Shield,
  FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { policies } from "@/lib/policies";
import type { PolicyType } from "@/lib/policies";

/* Framer Motion + Next.js Link hybrid — used for bento cards */
const MotionLink = motion(Link);

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════════════════ */
const EASE_LUXURY = [0.21, 0.47, 0.32, 0.98] as const;

/** Blur-up fade — the signature luxury reveal */
const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, delay: i * 0.1, ease: EASE_LUXURY },
  }),
};

/** Scale + fade for cards */
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE_LUXURY },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */

/** Section wrapper — fires stagger animation once in view */
function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`w-full ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT ME — inline component
═══════════════════════════════════════════════════════════════ */
/* Icons stay here — labels/descs come from translations */
/* ═══════════════════════════════════════════════════════════════
   POLICY MODAL
═══════════════════════════════════════════════════════════════ */
function PolicyModal({
  type,
  onClose,
}: {
  type: PolicyType | null;
  onClose: () => void;
}) {
  const { lang } = useLanguage();

  /* lock body scroll while open */
  useEffect(() => {
    if (!type) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [type]);

  /* close on Escape */
  useEffect(() => {
    if (!type) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [type, onClose]);

  const doc = type ? policies[lang][type] : null;
  const isAr = lang === "ar";

  return (
    <AnimatePresence>
      {type && doc && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ── Modal panel ── */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.96,  y: 24 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-0 z-[121] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              dir={isAr ? "rtl" : "ltr"}
              className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl overflow-hidden pointer-events-auto
                         border border-violet-500/20 bg-[#09080f]
                         shadow-[0_0_0_1px_rgba(139,92,246,0.08),0_40px_80px_-12px_rgba(0,0,0,0.9)]"
            >
              {/* top gradient line */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

              {/* ── Header ── */}
              <div className="flex-shrink-0 flex items-start justify-between gap-4 px-7 pt-7 pb-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-violet-500/15 ring-1 ring-violet-500/25 flex items-center justify-center">
                    {type === "privacy"
                      ? <Shield size={17} className="text-violet-400" />
                      : <FileText size={17} className="text-violet-400" />}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white leading-tight">{doc.title}</h2>
                    <p className="text-[11px] text-white/35 mt-0.5">{doc.lastUpdated}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-150"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ── Scrollable body ── */}
              <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6
                              [scrollbar-width:thin] [scrollbar-color:rgba(139,92,246,0.3)_transparent]">
                {doc.sections.map((section) => (
                  <div key={section.heading}>
                    <h3 className="text-sm font-bold text-violet-300 mb-2 leading-snug">
                      {section.heading}
                    </h3>
                    {section.body.split("\n\n").map((para, j) => (
                      <p key={j} className={`text-[13.5px] leading-[1.85] text-white/60 ${j > 0 ? "mt-3" : ""}`}>
                        {para}
                      </p>
                    ))}
                  </div>
                ))}

                {/* bottom padding so last section isn't flush to edge */}
                <div className="h-2" />
              </div>

              {/* ── Footer CTA ── */}
              <div className="flex-shrink-0 px-7 py-5 border-t border-white/[0.06] flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-violet-600/80 hover:bg-violet-600 rounded-full transition-colors duration-150 ring-1 ring-violet-500/40"
                >
                  {lang === "ar" ? "إغلاق" : lang === "fr" ? "Fermer" : "Close"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const ABOUT_ICONS = [Gauge, Code2, Sparkles];

/* ── icon background gradients per card ── */
const ABOUT_ICON_STYLES = [
  { bg: "bg-violet-500/15", ring: "ring-violet-500/25", text: "text-violet-300" },
  { bg: "bg-blue-500/15",   ring: "ring-blue-500/25",   text: "text-blue-300"   },
  { bg: "bg-fuchsia-500/15",ring: "ring-fuchsia-500/25",text: "text-fuchsia-300" },
];

function AboutMe() {
  const aboutRef    = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-80px" });
  const { t, lang } = useLanguage();
  const a = t.about;

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative overflow-hidden bg-[#06060f] py-28 sm:py-36"
    >
      {/* ── Ambient blobs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* large top-left bloom */}
        <div
          className="absolute -top-64 -left-32 w-[800px] h-[700px] rounded-full opacity-50"
          style={{
            background: "radial-gradient(ellipse at 30% 30%, rgba(139,92,246,0.35) 0%, rgba(109,40,217,0.15) 45%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* bottom-right accent */}
        <div
          className="absolute -bottom-48 -right-24 w-[600px] h-[500px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(ellipse at 70% 70%, rgba(168,85,247,0.30) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        {/* centre connecting glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, rgba(139,92,246,0.40) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* ── subtle dot-grid texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-14 lg:flex-row lg:items-stretch lg:gap-16 xl:gap-24"
        >

          {/* ╔══════════════ LEFT — PHOTO COLUMN ══════════════╗ */}
          <motion.div
            variants={fadeUp}
            className="relative flex-shrink-0 w-72 sm:w-80 lg:w-[360px] xl:w-[400px]"
          >
            {/* floating wrapper */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full"
            >
              {/* ── glow halo behind figure ── */}
              <div
                aria-hidden
                className="absolute inset-x-[5%] top-[8%] h-[84%] rounded-full"
                style={{
                  background: "radial-gradient(ellipse at 50% 38%, rgba(139,92,246,0.30) 0%, transparent 66%)",
                  filter: "blur(56px)",
                }}
              />
              {/* ── ground shadow ── */}
              <div
                aria-hidden
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-20 rounded-full"
                style={{
                  background: "radial-gradient(ellipse, rgba(139,92,246,0.60) 0%, transparent 70%)",
                  filter: "blur(32px)",
                }}
              />

              {/* ── photo frame with gradient border ── */}
              <div
                className="relative rounded-3xl p-[2px]"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.60) 0%, rgba(109,40,217,0.15) 50%, rgba(168,85,247,0.40) 100%)",
                }}
              >
                {/* inner dark inset so the border looks crisp */}
                <div className="rounded-[22px] overflow-hidden bg-[#0e0c1a]">
                  <div
                    className="relative aspect-[3/4] w-full"
                    style={{
                      filter:
                        "drop-shadow(0 0 42px rgba(139,92,246,0.50)) drop-shadow(0 0 100px rgba(109,40,217,0.28))",
                    }}
                  >
                    <Image
                      src="/about-photo.jpg"
                      alt="Mohamed — MDigitalDev founder"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width:640px) 288px, (max-width:1024px) 320px, 400px"
                      priority
                    />
                    {/* bottom dissolve into section bg */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c1a]/80 via-[#0e0c1a]/10 to-transparent" />
                    {/* very subtle left-edge fade */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c1a]/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* ── Available badge ── */}
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.85 }}
                animate={aboutInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.75, duration: 0.5, ease: EASE_LUXURY }}
                className="absolute -bottom-5 -end-4 sm:-end-5 flex items-center gap-2.5 rounded-2xl border border-violet-400/25 bg-[#0e0c1a]/90 px-4 py-2.5 backdrop-blur-2xl shadow-2xl shadow-purple-950/60 ring-1 ring-inset ring-white/5"
              >
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[11px] font-semibold text-white/80 tracking-wide whitespace-nowrap">
                  {a.available}
                </span>
              </motion.div>

              {/* ── Experience chip — top-left ── */}
              <motion.div
                initial={{ opacity: 0, x: lang === "ar" ? 12 : -12, scale: 0.85 }}
                animate={aboutInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.5, ease: EASE_LUXURY }}
                className="absolute -top-4 -start-4 sm:-start-5 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0e0c1a]/90 px-3.5 py-2 backdrop-blur-2xl shadow-xl ring-1 ring-inset ring-white/5"
              >
                <Zap size={13} className="text-violet-400" fill="currentColor" />
                <span className="text-[11px] font-bold text-white/75 tracking-wide whitespace-nowrap">
                  MDigitalDev
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* ╚═════════════════════════════════════════════════╝ */}

          {/* ╔══════════════ RIGHT — CONTENT ══════════════════╗ */}
          <div className="flex flex-col justify-center gap-8 lg:flex-1 text-center lg:text-start">

            {/* pill label */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300 ring-1 ring-inset ring-violet-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
                {a.pill}
              </span>
            </motion.div>

            {/* headline */}
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl xl:text-[2.9rem]"
            >
              {a.headline1}{" "}
              <span
                className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent"
              >
                {a.headline2}
              </span>
            </motion.h2>

            {/* body copy */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base leading-[1.8] text-white/65 sm:text-[1.05rem] max-w-xl"
            >
              {a.bodyPre}{" "}
              <span className="font-semibold text-white">{a.name}</span>
              {a.bodyMid}{" "}
              <span className="relative font-semibold text-violet-300">{a.highlight}</span>{" "}
              {a.bodyEnd}
            </motion.p>

            {/* ── Divider ── */}
            <motion.div variants={fadeUp} custom={2.5}>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            </motion.div>

            {/* ── Stat cards ── */}
            <motion.div variants={stagger} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {a.stats.map(({ label, desc }, i) => {
                const Icon  = ABOUT_ICONS[i];
                const style = ABOUT_ICON_STYLES[i];
                return (
                  <motion.div
                    key={label}
                    variants={scaleIn}
                    custom={i}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-md cursor-default hover:border-violet-500/35 transition-all duration-300 text-start ring-1 ring-inset ring-white/[0.04]"
                  >
                    {/* hover glow sweep */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.18) 0%, transparent 70%)" }}
                    />
                    {/* top-edge shimmer line */}
                    <div
                      aria-hidden
                      className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* icon circle */}
                    <div className={`mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl ${style.bg} ring-1 ${style.ring}`}>
                      <Icon size={19} className={style.text} strokeWidth={1.8} />
                    </div>

                    <p className="text-sm font-bold text-white mb-1.5 leading-snug tracking-tight">{label}</p>
                    <p className="text-[11px] text-white/50 leading-relaxed">{desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          {/* ╚═════════════════════════════════════════════════╝ */}

        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO CAROUSEL DATA
═══════════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  {
    img:      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=760&q=90",
    label:    "Restaurant Website",
    tag:      "Web Design",
    overlay:  "from-orange-600/30 via-rose-500/10 to-purple-900/50",
    glow:     "rgba(251,146,60,0.45)",
  },
  {
    img:      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=760&q=90",
    label:    "Vibrant Food Photography",
    tag:      "Visual Identity",
    overlay:  "from-pink-600/30 via-fuchsia-400/10 to-violet-900/50",
    glow:     "rgba(232,72,230,0.45)",
  },
  {
    img:      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=760&q=90",
    label:    "Mobile Ordering App",
    tag:      "PWA Experience",
    overlay:  "from-indigo-600/30 via-purple-400/10 to-violet-900/60",
    glow:     "rgba(139,92,246,0.5)",
  },
];

/* ═══════════════════════════════════════════════════════════════
   HERO CAROUSEL COMPONENT
═══════════════════════════════════════════════════════════════ */
function HeroCarousel() {
  const [active, setActive]  = useState(0);
  const [paused, setPaused]  = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((p) => (p + 1) % HERO_SLIDES.length),
      3800,
    );
    return () => clearInterval(t);
  }, [paused]);

  const slide = HERO_SLIDES[active];

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Main card ── */}
      <div
        className="relative w-full overflow-hidden rounded-[28px]"
        style={{
          boxShadow: `0 0 70px 12px ${slide.glow}, 0 30px 60px rgba(0,0,0,0.5)`,
          transition: "box-shadow 0.8s ease",
          aspectRatio: "4 / 3",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 50, scale: 1.04 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            exit={{   opacity: 0, x: -50, scale: 0.97 }}
            transition={{ duration: 0.65, ease: EASE_LUXURY }}
            className="absolute inset-0"
          >
            <Image
              src={slide.img}
              alt={slide.label}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.overlay}`} />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: 0.3, duration: 0.45, ease: EASE_LUXURY }}
              className="absolute bottom-5 start-5 flex items-center gap-2.5"
            >
              <span className="px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold rounded-full tracking-wide">
                {slide.tag}
              </span>
              <span className="text-white/60 text-xs font-medium">{slide.label}</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 pointer-events-none rounded-[28px] bg-gradient-to-b from-white/[0.06] to-transparent" />
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex items-center gap-2.5 mt-5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1.5 rounded-full overflow-hidden transition-all duration-400 focus:outline-none"
            style={{ width: active === i ? 28 : 8, background: "rgba(255,255,255,0.2)" }}
          >
            {active === i && (
              <motion.span
                layoutId="dot-fill"
                className="absolute inset-0 rounded-full"
                style={{ background: `${slide.glow.replace("0.45", "1").replace("0.5", "1")}` }}
                transition={{ duration: 0.35, ease: EASE_LUXURY }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Floating mini-cards (decorative) ── */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -end-4 sm:-end-6 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-lg"
      >
        <div className="w-7 h-7 bg-green-500/20 rounded-lg flex items-center justify-center">
          <span className="text-green-400 text-sm font-black">↑</span>
        </div>
        <div>
          <p className="text-white text-xs font-bold leading-none">+35%</p>
          <p className="text-white/40 text-[10px] mt-0.5">Online Orders</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-10 -start-4 sm:-start-6 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-lg"
      >
        <div className="w-7 h-7 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <span className="text-purple-400 text-xs font-black">⚡</span>
        </div>
        <div>
          <p className="text-white text-xs font-bold leading-none">100 / 100</p>
          <p className="text-white/40 text-[10px] mt-0.5">PageSpeed Score</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
/* Static (language-agnostic) structural data — text comes from translations */
const POWER_TRIO_STATIC = [
  { icon: Zap,        gradient: "from-amber-50 to-orange-50",  accent: "text-orange-500",  iconBg: "bg-orange-50",  score: "100", scoreLabel: "PageSpeed"    },
  { icon: Palette,    gradient: "from-sky-50 to-indigo-50",    accent: "text-blue-500",    iconBg: "bg-blue-50",    score: "✦",   scoreLabel: "Pixel-Perfect" },
  { icon: Smartphone, gradient: "from-emerald-50 to-green-50", accent: "text-emerald-500", iconBg: "bg-emerald-50", score: "PWA", scoreLabel: "App-Ready"     },
];

const WA_BASE = "https://wa.me/212669586001?text=";

const SERVICES_STATIC = [
  { icon: Globe,        price: "$80",  oldPrice: "$150", suffix: "+", highlight: false },
  { icon: ShoppingCart, price: "$150", oldPrice: "$400", suffix: "+", highlight: true  },
  { icon: Cloud,        price: "$480", oldPrice: "$800", suffix: "+", highlight: false },
];

const TESTIMONIALS_STATIC = [
  { name: "Karim B.",   role: "Owner, Bella Vista",       avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&q=80", rating: 5 },
  { name: "Fatima R.",  role: "Manager, Saffron Kitchen", avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&q=80", rating: 5 },
  { name: "Youssef M.", role: "CEO, Nomad Café Group",    avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&q=80", rating: 5 },
];

const FILTER_VALUES = ["All", "Restaurant", "Service"] as const;

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { t, lang } = useLanguage();
  const [policyOpen, setPolicyOpen] = useState<PolicyType | null>(null);
  const openWhatsApp = () => window.open("https://wa.me/212669586001", "_blank");
  const openEmail    = () => { window.location.href = "mailto:youliwork2023@gmail.com"; };
  const scrollTo     = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterTabs = [
    { label: t.portfolio.filterAll,         value: "All"        },
    { label: t.portfolio.filterRestaurants, value: "Restaurant" },
    { label: t.portfolio.filterServices,    value: "Service"    },
  ];

  return (
    <main
      className="bg-white overflow-x-hidden"
      style={lang === "ar" ? { fontFamily: "var(--font-cairo), Tahoma, Arial, sans-serif" } : undefined}
    >
      <Navbar />

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  1 · HERO  (dark, two-column)                        ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <section className="relative min-h-screen flex items-center bg-[#080808] overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute -inset-[10%] w-[120%] h-[120%]"
            animate={{ x: ["0%", "4%"], y: ["0%", "4%"] }}
            transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1.2px, transparent 1.2px)",
              backgroundSize: "28px 28px",
            }}
          />
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 30%, #080808 100%)",
          }}
        />

        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -right-40 top-1/3 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-10">

          {/* LEFT: text content */}
          <div className="flex flex-col items-start">
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-white/60 mb-8 tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.hero.badge}
            </motion.div>

            <motion.h1
              variants={fadeUp} custom={1} initial="hidden" animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.06] tracking-tight mb-6"
            >
              {t.hero.h1a}
              <br />
              {t.hero.h1b}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-violet-400">
                {t.hero.h1c}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp} custom={2} initial="hidden" animate="visible"
              className="text-base sm:text-lg text-white/45 leading-relaxed mb-10 font-medium max-w-lg"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              variants={fadeUp} custom={3} initial="hidden" animate="visible"
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <motion.button
                onClick={openWhatsApp}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black font-bold text-base rounded-full active:scale-95 transition-transform duration-150"
                animate={{
                  boxShadow: [
                    "0 4px 20px 0 rgba(255,255,255,0.10), 0 0 0px  0 rgba(255,255,255,0)",
                    "0 8px 50px 0 rgba(255,255,255,0.28), 0 0 40px 8px rgba(255,255,255,0.08)",
                    "0 4px 20px 0 rgba(255,255,255,0.10), 0 0 0px  0 rgba(255,255,255,0)",
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => scrollTo("#portfolio")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold text-base rounded-full border border-white/15 hover:border-white/35 hover:bg-white/5 active:scale-95 transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.hero.cta2}
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUp} custom={4} initial="hidden" animate="visible"
              className="mt-12 inline-flex flex-wrap gap-px bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              {[
                { value: "+35%", label: t.hero.stats.projects  },
                { value: "-75%", label: t.hero.stats.pagespeed },
                { value: "500+", label: t.hero.stats.revenue   },
                { value: "+20%", label: t.hero.stats.response  },
              ].map((s, i, arr) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center px-5 py-3.5 ${
                    i < arr.length - 1 ? "border-r border-white/10" : ""
                  }`}
                >
                  <p className="text-lg sm:text-xl font-black text-white leading-none">{s.value}</p>
                  <p className="text-[10px] text-white/30 font-semibold mt-1 tracking-wide">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Image carousel */}
          <motion.div
            variants={fadeUp} custom={2} initial="hidden" animate="visible"
            className="relative w-full px-6 sm:px-8 lg:px-4"
          >
            <HeroCarousel />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase font-semibold">{t.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-7 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      <AboutMe />

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  2 · POWER TRIO                                      ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <Section id="why-me" className="py-24 sm:py-32 bg-[#f9f9f9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
              {t.powerTrio.label}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              {t.powerTrio.headline1}
              <br />
              <span className="text-gray-400 font-light italic">{t.powerTrio.headline2}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              {t.powerTrio.sub}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {POWER_TRIO_STATIC.map((item, i) => {
              const Icon = item.icon;
              const td   = t.powerTrio.items[i];
              return (
                <motion.div
                  key={td.title}
                  variants={scaleIn}
                  custom={i * 0.12}
                  className={`relative bg-gradient-to-br ${item.gradient} rounded-[28px] p-8 border border-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-400 group overflow-hidden`}
                >
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                  <div className="absolute top-6 end-7 text-end">
                    <span className={`text-2xl font-black ${item.accent} leading-none block`}>{item.score}</span>
                    <span className="text-[10px] text-gray-400 font-semibold tracking-wider">{item.scoreLabel}</span>
                  </div>
                  <div className={`relative w-12 h-12 ${item.iconBg} rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${item.accent}`} />
                  </div>
                  <h3 className="relative text-xl font-bold text-black mb-3">{td.title}</h3>
                  <p className="relative text-gray-500 text-sm leading-relaxed mb-6">{td.desc}</p>
                  <ul className="relative space-y-2.5">
                    {td.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className={`w-4 h-4 ${item.accent} flex-shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  3 · SERVICES — Dark + Glassmorphism                ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <Section id="services" className="relative py-24 sm:py-32 bg-[#080808] overflow-hidden">

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4  w-[500px] h-[500px] bg-white/[0.025] rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-white/[0.03]  rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.015] rounded-full blur-[140px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-3">
              {t.services.label}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.services.headline1}
              <span className="text-white/40 font-light italic"> {t.services.headline2}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-white/40 text-lg max-w-xl mx-auto">
              {t.services.sub}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {SERVICES_STATIC.map((svc, i) => {
              const Icon = svc.icon;
              const td   = t.services.items[i];
              return (
                <motion.div
                  key={td.name}
                  variants={scaleIn}
                  custom={i * 0.12}
                  className={`
                    relative flex flex-col rounded-[28px] p-8 border backdrop-blur-xl
                    transition-all duration-300
                    ${svc.highlight
                      ? "bg-white/[0.10] border-white/25 shadow-[0_0_60px_rgba(255,255,255,0.06)] md:scale-[1.035]"
                      : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/15"
                    }
                  `}
                >
                  {svc.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                      {t.services.popular}
                    </div>
                  )}
                  {svc.highlight && (
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                  )}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/30">{td.tier}</span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${svc.highlight ? "bg-white/15" : "bg-white/[0.07]"}`}>
                      <Icon className="w-5 h-5 text-white/70" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{td.name}</h3>
                  <div className="flex items-end gap-2.5 mb-4">
                    <span className="text-4xl font-black text-white leading-none">{svc.price}</span>
                    <span className="text-lg font-semibold text-white/30 leading-none mb-0.5">{svc.suffix}</span>
                    <span className="text-base font-medium text-white/25 line-through leading-none mb-0.5">{svc.oldPrice}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-6 text-white/40">{td.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {td.features.map((f) => {
                      const isDelivery = f.startsWith("⚡");
                      return (
                        <li key={f} className="flex items-center gap-2.5 text-sm">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                          {isDelivery ? (
                            <span className="font-semibold text-emerald-400 tracking-wide">
                              {f}
                            </span>
                          ) : (
                            <span className="text-white/60">{f}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <a
                    href={`${WA_BASE}${encodeURIComponent(td.waMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2
                      active:scale-95 transition-all duration-200
                      ${svc.highlight
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-white/10 text-white border border-white/15 hover:bg-white/20"
                      }
                    `}
                  >
                    {td.cta}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>

          <motion.p variants={fadeUp} custom={4} className="text-center text-sm text-white/25 mt-8">
            {t.services.footerNote}{" "}
            <button onClick={openWhatsApp} className="underline underline-offset-4 hover:text-white/60 transition-colors">
              {t.services.estimate}
            </button>
          </motion.p>
        </div>
      </Section>

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  4 · PORTFOLIO — Bento Grid                         ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <Section id="portfolio" className="py-24 sm:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
              {t.portfolio.label}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              {t.portfolio.headline}
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              {t.portfolio.sub}
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex items-center justify-center gap-2 mb-12 flex-wrap"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeFilter === tab.value
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {(() => {
            const filtered = activeFilter === "All"
              ? PORTFOLIO_PROJECTS
              : PORTFOLIO_PROJECTS.filter((p) => p.niche === activeFilter);

            const isBento = filtered.length === 6;

            if (filtered.length === 0) {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <p className="text-gray-400 text-lg font-medium">
                    {t.portfolio.empty}
                  </p>
                </motion.div>
              );
            }

            return (
              <motion.div
                variants={stagger}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${isBento ? "lg:[grid-auto-rows:260px]" : ""}`}
              >
                {filtered.map((item, i) => {
                  const isColWide = isBento && (i === 0 || i === 5);
                  const isRowTall = isBento && i === 1;

                  return (
                    <MotionLink
                      key={item.id}
                      href={`/portfolio/${item.id}`}
                      variants={scaleIn}
                      custom={i * 0.08}
                      className={[
                        "group relative overflow-hidden rounded-[24px] cursor-pointer bg-gray-100",
                        "h-64 sm:h-72",
                        isColWide ? "lg:col-span-2 lg:h-auto" : "",
                        isRowTall ? "lg:row-span-2 lg:h-auto" : !isColWide ? "lg:h-auto" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                      <div className="absolute top-4 end-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                          <ExternalLink className="w-3.5 h-3.5 text-black" />
                          <span className="text-black text-[11px] font-bold">{t.portfolio.viewProject}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-1">{item.category}</p>
                        <h3 className="text-white font-bold text-lg leading-tight mb-2.5">{item.title}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-white/70 text-[11px] font-semibold rounded-full border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </MotionLink>
                  );
                })}
              </motion.div>
            );
          })()}
        </div>
      </Section>

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  5 · TESTIMONIALS                                   ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <Section className="py-24 sm:py-32 bg-[#f9f9f9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
              {t.testimonials.label}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
              {t.testimonials.headline}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS_STATIC.map((person, i) => (
              <motion.div
                key={person.name}
                variants={scaleIn}
                custom={i * 0.1}
                className="relative bg-white rounded-[28px] p-8 border border-gray-100 shadow-[0_2px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: person.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                  &ldquo;{t.testimonials.items[i].text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                    <Image src={person.avatarImg} alt={person.name} fill className="object-cover" sizes="44px" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{person.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{person.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  6 · CONTACT                                        ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <Section id="contact" className="relative py-24 sm:py-32 bg-[#080808] overflow-hidden">

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-white/25 mb-4">
            {t.contact.label}
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            {t.contact.headline1}
            <br />
            <span className="text-white/30 font-light italic">{t.contact.headline2}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/40 text-lg max-w-xl mx-auto mb-14">
            {t.contact.sub}
          </motion.p>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 max-w-xl mx-auto w-full"
          >
            <motion.button
              variants={scaleIn} custom={0}
              onClick={openWhatsApp}
              whileHover={{ scale: 1.04, y: -3 }}
              className="group flex flex-col items-center gap-3 p-7 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 rounded-2xl backdrop-blur-xl transition-all duration-200"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.contact.whatsapp}</p>
                <p className="text-white/30 text-xs mt-0.5">0669 586 001</p>
              </div>
            </motion.button>

            <motion.button
              variants={scaleIn} custom={1}
              onClick={openEmail}
              whileHover={{ scale: 1.04, y: -3 }}
              className="group flex flex-col items-center gap-3 p-7 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 rounded-2xl backdrop-blur-xl transition-all duration-200"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.contact.email}</p>
                <p className="text-white/30 text-xs mt-0.5">youliwork2023@gmail.com</p>
              </div>
            </motion.button>
          </motion.div>

          <motion.div variants={fadeUp} custom={4}>
            <motion.button
              onClick={openWhatsApp}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-base rounded-full active:scale-95 transition-transform duration-150"
              animate={{
                boxShadow: [
                  "0 4px 20px 0 rgba(255,255,255,0.08), 0 0 0px 0 rgba(255,255,255,0)",
                  "0 8px 50px 0 rgba(255,255,255,0.22), 0 0 40px 8px rgba(255,255,255,0.08)",
                  "0 4px 20px 0 rgba(255,255,255,0.08), 0 0 0px 0 rgba(255,255,255,0)",
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              {t.contact.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </Section>

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  FOOTER                                              ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <footer className="bg-[#080808] border-t border-white/[0.06] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-black" fill="black" />
            </div>
            <span className="font-bold text-sm text-white">
              Mohamed<span className="text-white/25">.dev</span>
            </span>
          </div>

          {/* centre — made with + policy links */}
          <div className="flex flex-col items-center gap-2.5">
            <p className="text-xs text-white/20 font-medium">
              {t.footer.madeWith}{" "}
              <span className="text-white/50 font-semibold">Next.js</span>
              {" "}&amp;{" "}
              <span className="text-red-400">♥</span>
              {" "}{t.footer.passion}
            </p>
            {/* policy links */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPolicyOpen("privacy")}
                className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-violet-400 transition-colors duration-200 group"
              >
                <Shield size={11} className="group-hover:text-violet-400 transition-colors" />
                {t.footer.privacyLink}
              </button>
              <span className="text-white/10 text-xs">·</span>
              <button
                onClick={() => setPolicyOpen("terms")}
                className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-violet-400 transition-colors duration-200 group"
              >
                <FileText size={11} className="group-hover:text-violet-400 transition-colors" />
                {t.footer.termsLink}
              </button>
            </div>
          </div>

          {/* rights */}
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </footer>

      {/* ── Legal policy modal — rendered at root so it overlays everything ── */}
      <PolicyModal type={policyOpen} onClose={() => setPolicyOpen(null)} />
    </main>
  );
}
