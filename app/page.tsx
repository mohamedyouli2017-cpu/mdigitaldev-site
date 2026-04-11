"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";

/* Framer Motion + Next.js Link hybrid — used for bento cards */
const MotionLink = motion(Link);
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
} from "lucide-react";
import Navbar from "@/components/Navbar";

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
   HERO CAROUSEL DATA
═══════════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  {
    img:      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=760&q=90",
    label:    "Restaurant Website",
    tag:      "Web Design",
    // Warm orange-to-purple overlay
    overlay:  "from-orange-600/30 via-rose-500/10 to-purple-900/50",
    glow:     "rgba(251,146,60,0.45)",   // orange glow
  },
  {
    img:      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=760&q=90",
    label:    "Vibrant Food Photography",
    tag:      "Visual Identity",
    // Pink-to-violet overlay
    overlay:  "from-pink-600/30 via-fuchsia-400/10 to-violet-900/50",
    glow:     "rgba(232,72,230,0.45)",   // pink/fuchsia glow
  },
  {
    img:      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=760&q=90",
    label:    "Mobile Ordering App",
    tag:      "PWA Experience",
    // Indigo-to-purple overlay
    overlay:  "from-indigo-600/30 via-purple-400/10 to-violet-900/60",
    glow:     "rgba(139,92,246,0.5)",    // purple glow
  },
];

/* ═══════════════════════════════════════════════════════════════
   HERO CAROUSEL COMPONENT
═══════════════════════════════════════════════════════════════ */
function HeroCarousel() {
  const [active, setActive]  = useState(0);
  const [paused, setPaused]  = useState(false);

  // Auto-advance every 3.8 s, pauses on hover
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
          // Dynamic purple/pink/orange glow changes with slide
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
            {/* Photo */}
            <Image
              src={slide.img}
              alt={slide.label}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />

            {/* Vibrant colour overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.overlay}`} />

            {/* Bottom label badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: 0.3, duration: 0.45, ease: EASE_LUXURY }}
              className="absolute bottom-5 left-5 flex items-center gap-2.5"
            >
              <span className="px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold rounded-full tracking-wide">
                {slide.tag}
              </span>
              <span className="text-white/60 text-xs font-medium">{slide.label}</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Shine overlay */}
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
        className="absolute -top-4 -right-4 sm:-right-6 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-lg"
      >
        <div className="w-7 h-7 bg-green-500/20 rounded-lg flex items-center justify-center">
          <span className="text-green-400 text-sm font-black">↑</span>
        </div>
        <div>
          <p className="text-white text-xs font-bold leading-none">+300%</p>
          <p className="text-white/40 text-[10px] mt-0.5">Online Orders</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-10 -left-4 sm:-left-6 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-lg"
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

/** Slowly drifting dot-grid for the Hero background */
function AnimatedDotGrid() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
    >
      {/* Extend the div so the moving pattern never shows an edge */}
      <motion.div
        className="absolute -inset-[10%] w-[120%] h-[120%]"
        animate={{ x: ["0%", "4%"], y: ["0%", "4%"] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const POWER_TRIO = [
  {
    icon:       Zap,
    title:      "Lightning Speed",
    gradient:   "from-amber-50 to-orange-50",
    accent:     "text-orange-500",
    iconBg:     "bg-orange-50",
    score:      "100",
    scoreLabel: "PageSpeed",
    desc:       "Sub-second loads via Next.js static generation, edge CDN, and automatic image optimisation. Faster sites rank higher and keep hungry guests from bouncing.",
    bullets:    ["Core Web Vitals optimised", "Edge-cached globally", "< 1 s first paint"],
  },
  {
    icon:       Palette,
    title:      "Stunning Design",
    gradient:   "from-sky-50 to-indigo-50",
    accent:     "text-blue-500",
    iconBg:     "bg-blue-50",
    score:      "✦",
    scoreLabel: "Pixel-Perfect",
    desc:       "Apple-grade UI with micro-animations, custom typography, and layouts engineered to convert. Every pixel earns its place on every screen.",
    bullets:    ["Mobile-first responsive", "Custom brand identity", "Conversion-focused UX"],
  },
  {
    icon:       Smartphone,
    title:      "Installable App (PWA)",
    gradient:   "from-emerald-50 to-green-50",
    accent:     "text-emerald-500",
    iconBg:     "bg-emerald-50",
    score:      "PWA",
    scoreLabel: "App-Ready",
    desc:       "Customers add your restaurant to their home screen — no App Store needed. Offline menus, push notifications, and instant access keep you top-of-mind.",
    bullets:    ["Home screen install", "Offline-capable menu", "Push notifications"],
  },
];

const WA_BASE = "https://wa.me/212669586001?text=";

const SERVICES = [
  {
    icon:      Globe,
    tier:      "Starter Pack",
    name:      "Digital Menu & Landing Page",
    price:     "$80",
    oldPrice:  "$150",
    suffix:    "+",
    desc:      "A blazing-fast, beautifully designed landing page with a digital menu that replaces printed cards and drives foot traffic from Google.",
    features:  ["Responsive landing page", "Digital menu with photos", "Google Maps integration", "WhatsApp CTA button", "Basic SEO setup", "1-week delivery"],
    cta:       "Get Started",
    waMsg:     "Hello Mohamed, I want to start with the Starter Pack for my restaurant.",
    highlight: false,
  },
  {
    icon:      ShoppingCart,
    tier:      "Professional Pack",
    name:      "Full Restaurant System",
    price:     "$150",
    oldPrice:  "$400",
    suffix:    "+",
    desc:      "Complete online presence with ordering, WhatsApp alerts, reservations, and an admin dashboard. Everything a modern restaurant needs.",
    features:  ["Everything in Starter", "Online ordering system", "WhatsApp order alerts", "Reservation booking", "Admin dashboard", "PWA (installable app)", "2-week delivery"],
    cta:       "Most Popular",
    waMsg:     "Hello Mohamed, I'm interested in the Professional Pack to grow my business.",
    highlight: true,
  },
  {
    icon:      Cloud,
    tier:      "Ultimate Pack",
    name:      "SaaS / Cloud Platform",
    price:     "$480",
    oldPrice:  "$800",
    suffix:    "+",
    desc:      "Custom cloud solutions: multi-branch management, loyalty programs, analytics dashboards, and scalable SaaS platforms for ambitious brands.",
    features:  ["Everything in Professional", "Multi-branch management", "Loyalty & rewards system", "Analytics dashboard", "Custom integrations", "Dedicated support", "Custom timeline"],
    cta:       "Let's Talk",
    waMsg:     "Hello Mohamed, I want the full Ultimate Experience for my restaurant brand.",
    highlight: false,
  },
];

/** Bento layout:  wide | tall | normal | normal | normal | wide
 *  Grid (3 cols): [0 col-span-2][1 row-span-2][2][3][4][5 col-span-2]  */
/* Portfolio list is sourced from the shared data file so card links
   and detail pages always stay in sync.                           */

const TESTIMONIALS = [
  { name: "Karim B.",   role: "Owner, Bella Vista",       avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&q=80", rating: 5, text: "Our online orders increased 300 % in the first month. The site loads instantly and customers love the app experience." },
  { name: "Fatima R.",  role: "Manager, Saffron Kitchen", avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&q=80", rating: 5, text: "Mohamed delivered in under a week. The design is stunning and our Google ranking jumped immediately after launch." },
  { name: "Youssef M.", role: "CEO, Nomad Café Group",    avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&q=80", rating: 5, text: "The multi-branch dashboard saved us hours every week. Absolutely worth every dirham." },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO FILTER CATEGORIES
   Add new niches here as the portfolio grows.
═══════════════════════════════════════════════════════════════ */
const FILTER_TABS = [
  { label: "All",         value: "All"        },
  { label: "Restaurants", value: "Restaurant" },
  { label: "Services",    value: "Service"    },
];

export default function Home() {
  const openWhatsApp = () => window.open("https://wa.me/212669586001", "_blank");
  const openEmail    = () => { window.location.href = "mailto:youliwork2023@gmail.com"; };
  const scrollTo     = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const [activeFilter, setActiveFilter] = useState<string>("All");

  return (
    <main className="bg-white overflow-x-hidden">
      <Navbar />

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  1 · HERO  (dark, two-column)                        ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <section className="relative min-h-screen flex items-center bg-[#080808] overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        {/* Animated dot grid — white dots on dark */}
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

        {/* Radial vignette — keeps edges dark */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 30%, #080808 100%)",
          }}
        />

        {/* Purple accent blob — far left */}
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        {/* Orange accent blob — far right */}
        <div className="absolute -right-40 top-1/3 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* ── Two-column grid ── */}
        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-10">

          {/* ── LEFT: text content ── */}
          <div className="flex flex-col items-start">

            {/* Badge */}
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-white/60 mb-8 tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for New Projects
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp} custom={1} initial="hidden" animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.06] tracking-tight mb-6"
            >
              Elevating Dining
              <br />
              Experiences with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-violet-400">
                Digital Solutions.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp} custom={2} initial="hidden" animate="visible"
              className="text-base sm:text-lg text-white/45 leading-relaxed mb-10 font-medium max-w-lg"
            >
              I build blazing-fast, PWA-ready websites for restaurants that turn
              visitors into loyal customers — with speed, design, and tech that
              sets you apart.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp} custom={3} initial="hidden" animate="visible"
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              {/* Breathing glow CTA — white glow on dark */}
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
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => scrollTo("#portfolio")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold text-base rounded-full border border-white/15 hover:border-white/35 hover:bg-white/5 active:scale-95 transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Portfolio
              </motion.button>
            </motion.div>

            {/* Stats strip — dark glass pill */}
            <motion.div
              variants={fadeUp} custom={4} initial="hidden" animate="visible"
              className="mt-12 inline-flex flex-wrap gap-px bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              {[
                { value: "50+",  label: "Projects"      },
                { value: "100",  label: "PageSpeed"     },
                { value: "3×",   label: "Revenue Lift"  },
                { value: "24 h", label: "Response Time" },
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

          {/* ── RIGHT: Image carousel ── */}
          <motion.div
            variants={fadeUp} custom={2} initial="hidden" animate="visible"
            className="relative w-full px-6 sm:px-8 lg:px-4"
          >
            <HeroCarousel />
          </motion.div>
        </div>

        {/* Scroll nudge */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase font-semibold">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-7 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  2 · POWER TRIO                                      ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <Section id="why-me" className="py-24 sm:py-32 bg-[#f9f9f9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
              The Power Trio
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              Three Things That Make
              <br />
              <span className="text-gray-400 font-light italic">Restaurants Win Online.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              Every project is built on this foundation — no exceptions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {POWER_TRIO.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  custom={i * 0.12}
                  className={`relative bg-gradient-to-br ${item.gradient} rounded-[28px] p-8 border border-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-400 group overflow-hidden`}
                >
                  {/* Subtle inner highlight */}
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

                  {/* Score badge */}
                  <div className="absolute top-6 right-7 text-right">
                    <span className={`text-2xl font-black ${item.accent} leading-none block`}>{item.score}</span>
                    <span className="text-[10px] text-gray-400 font-semibold tracking-wider">{item.scoreLabel}</span>
                  </div>

                  {/* Icon */}
                  <div className={`relative w-12 h-12 ${item.iconBg} rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${item.accent}`} />
                  </div>

                  <h3 className="relative text-xl font-bold text-black mb-3">{item.title}</h3>
                  <p className="relative text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>

                  <ul className="relative space-y-2.5">
                    {item.bullets.map((b) => (
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

        {/* Background gradient blobs — give glass something to blur against */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4  w-[500px] h-[500px] bg-white/[0.025] rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-white/[0.03]  rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.015] rounded-full blur-[140px]" />
        </div>

        {/* Dot grid for texture */}
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
              Services & Pricing
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Choose Your
              <span className="text-white/40 font-light italic"> Growth Level.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-white/40 text-lg max-w-xl mx-auto">
              Transparent pricing. All tiers include clean code, mobile-first design, and post-launch support.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.name}
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
                  {/* Popular pill */}
                  {svc.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                      ✦ Most Popular
                    </div>
                  )}

                  {/* Inner top highlight line */}
                  {svc.highlight && (
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                  )}

                  {/* Tier row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/30">{svc.tier}</span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${svc.highlight ? "bg-white/15" : "bg-white/[0.07]"}`}>
                      <Icon className="w-5 h-5 text-white/70" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{svc.name}</h3>

                  {/* Price */}
                  <div className="flex items-end gap-2.5 mb-4">
                    <span className="text-4xl font-black text-white leading-none">{svc.price}</span>
                    <span className="text-lg font-semibold text-white/30 leading-none mb-0.5">{svc.suffix}</span>
                    <span className="text-base font-medium text-white/25 line-through leading-none mb-0.5">
                      {svc.oldPrice}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mb-6 text-white/40">{svc.desc}</p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                        <span className="text-white/60">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`${WA_BASE}${encodeURIComponent(svc.waMsg)}`}
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
                    {svc.cta}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>

          <motion.p variants={fadeUp} custom={4} className="text-center text-sm text-white/25 mt-8">
            Prices are starting points — final quote depends on scope.{" "}
            <button onClick={openWhatsApp} className="underline underline-offset-4 hover:text-white/60 transition-colors">
              Get a free estimate →
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
              Portfolio
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              Recent Work.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              Every project is crafted with precision, purpose, and performance as the north star.
            </motion.p>
          </div>

          {/* ── Filter Tabs ── */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex items-center justify-center gap-2 mb-12 flex-wrap"
          >
            {FILTER_TABS.map((tab) => (
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

          {/*
            Bento layout (lg, 3 cols × auto-rows 260px):
            Bento spans only apply when all 6 projects are visible (All / Restaurants).
            When filtered to fewer items, normal grid is used.
          */}
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
                    No projects in this category yet — check back soon!
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
                    // Mobile: fixed height so images show
                    "h-64 sm:h-72",
                    // Desktop bento spans
                    isColWide ? "lg:col-span-2 lg:h-auto" : "",
                    isRowTall ? "lg:row-span-2 lg:h-auto" : !isColWide ? "lg:h-auto" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* Photo */}
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Hover tint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                  {/* "View Project" pill — appears on hover */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                      <ExternalLink className="w-3.5 h-3.5 text-black" />
                      <span className="text-black text-[11px] font-bold">View Project</span>
                    </div>
                  </div>

                  {/* Info — slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-1">
                      {item.category}
                    </p>
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
              Social Proof
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
              What Clients Say.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={scaleIn}
                custom={i * 0.1}
                className="relative bg-white rounded-[28px] p-8 border border-gray-100 shadow-[0_2px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Top highlight */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                    <Image
                      src={t.avatarImg}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{t.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
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

        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-white/25 mb-4">
            Let&apos;s Work Together
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ready to Get a Website
            <br />
            <span className="text-white/30 font-light italic">That Actually Works?</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/40 text-lg max-w-xl mx-auto mb-14">
            Let&apos;s discuss your project. I respond within 24 hours and offer a free consultation for every new client.
          </motion.p>

          {/* Contact cards */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 max-w-xl mx-auto w-full"
          >
            {/* WhatsApp */}
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
                <p className="text-white font-semibold text-sm">WhatsApp</p>
                <p className="text-white/30 text-xs mt-0.5">0669 586 001</p>
              </div>
            </motion.button>

            {/* Email */}
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
                <p className="text-white font-semibold text-sm">Email</p>
                <p className="text-white/30 text-xs mt-0.5">youliwork2023@gmail.com</p>
              </div>
            </motion.button>
          </motion.div>

          {/* Primary CTA — breathing glow on dark bg */}
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
              Start on WhatsApp — It&apos;s Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </Section>

      {/* ╔═══════════════════════════════════════════════════════╗
          ║  FOOTER                                              ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <footer className="bg-[#080808] border-t border-white/[0.06] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-black" fill="black" />
            </div>
            <span className="font-bold text-sm text-white">
              Mohamed<span className="text-white/25">.dev</span>
            </span>
          </div>

          <p className="text-xs text-white/20 font-medium">
            Made with{" "}
            <span className="text-white/50 font-semibold">Next.js</span>
            {" "}&amp;{" "}
            <span className="text-red-400">♥</span>
            {" "}Passion
          </p>

          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Mohamed Youli. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
