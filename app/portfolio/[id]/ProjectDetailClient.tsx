"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Zap,
  Palette,
  Code,
  Search,
  Monitor,
  TrendingUp,
  Layers,
  Cloud,
  BarChart2,
  ShoppingCart,
  Smartphone,
  MessageCircle as WaIcon,
  Calendar,
  Globe,
  MapPin,
  QrCode,
  Package,
  Award,
  Bell,
  Star,
  Users,
  Camera,
  Quote,
  ExternalLink,
  Clock,
} from "lucide-react";
import { getProjectLocale } from "@/lib/portfolio-data";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { MagneticWrapper } from "@/components/MagneticCursor";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─────────────────────────────────────────────────────────────────────────────
   ICON REGISTRY
───────────────────────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette, Code, Search, Monitor, TrendingUp, Layers, Cloud,
  BarChart2, ShoppingCart, Smartphone, MessageCircle: WaIcon,
  Calendar, Globe, MapPin, QrCode, Package, Award, Bell, Star,
  Users, Camera, Zap,
};

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION HELPERS
───────────────────────────────────────────────────────────────────────────── */
const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay: i * 0.1, ease: EASE },
  }),
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.95, y: 14 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.58, delay: i * 0.09, ease: EASE },
  }),
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function Section({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
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

/* ─────────────────────────────────────────────────────────────────────────────
   RELATED PROJECT CARD
───────────────────────────────────────────────────────────────────────────── */
function RelatedCard({ project, index }: { project: PortfolioProject; index: number }) {
  const { t, lang } = useLanguage();
  const localProject = getProjectLocale(project, lang);
  return (
    <motion.div variants={scaleIn} custom={index * 0.1}>
      <Link
        href={`/portfolio/${project.id}`}
        className="group block rounded-[20px] overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <Image
            src={project.img}
            alt={`${project.title} — ${project.category}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-full">
              {t.portfolio.viewProject} <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
        <div className="p-5 bg-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">
            {localProject.category}
          </p>
          <h4 className="text-base font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
            {localProject.title}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[11px] font-semibold rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMING SOON VIEW
───────────────────────────────────────────────────────────────────────────── */
function ComingSoonView({ project, related }: { project: PortfolioProject; related: PortfolioProject[] }) {
  const { t, lang } = useLanguage();
  const L = t.portfolio.labels;
  const localProject = getProjectLocale(project, lang);
  const openWhatsApp = () => window.open("https://wa.me/212669586001", "_blank");
  const heroAlt = `${project.title} — ${project.category} demo by MDigitalDev`;

  return (
    <main className="bg-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden bg-[#080808]">

        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <Link
            href="/#demos"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm font-semibold rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {L.backToPortfolio}
          </Link>
        </div>

        <motion.div
          className="absolute inset-0 will-change-transform"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.00 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={project.heroImg}
            alt={heroAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

        <motion.div
          className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
        >
          {/* Coming Soon badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-amber-300 text-xs font-bold rounded-full tracking-widest uppercase">
              <Clock className="w-3 h-3" />
              {L.comingSoon}
            </span>
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/70 text-xs font-bold rounded-full tracking-widest uppercase">
              {localProject.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.04] mb-6">
            {localProject.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/60 text-xs font-semibold rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Coming Soon message + overview ── */}
      <Section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Left: overview */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-4">
                {L.overview}
              </p>
              <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8">
                {localProject.description}
              </p>

              {/* Features */}
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-4">
                {L.features}
              </p>
              <ul className="space-y-2.5">
                {localProject.features.map((f) => (
                  <li key={f.title} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-black">{f.title}</strong> — {f.desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: tech stack + CTA */}
            <motion.div variants={fadeUp} custom={1}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-4">
                {L.techStack}
              </p>
              <div className="space-y-4 mb-10">
                {localProject.techSpecs.map((spec) => (
                  <div key={spec.category}>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                      {spec.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {spec.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 bg-[#080808] rounded-[24px] border border-white/[0.07]">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
                  {L.comingSoonTitle}
                </p>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  {L.comingSoonDesc}
                </p>
                <MagneticWrapper>
                  <motion.button
                    onClick={openWhatsApp}
                    className="w-full group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-black font-bold text-sm rounded-2xl active:scale-95 transition-transform duration-150"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    {L.requestBuild}
                  </motion.button>
                </MagneticWrapper>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── Related demos ── */}
      {related.length > 0 && (
        <Section className="py-20 sm:py-28 bg-[#f9f9f9]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-3"
              >
                {L.youMightAlsoLike}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight"
              >
                {L.relatedProjects}
              </motion.h2>
            </div>

            <div className={`grid gap-6 ${related.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {related.map((rp, i) => (
                <RelatedCard key={rp.id} project={rp} index={i} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0  }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: EASE }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/25 mb-5">
              {L.startOnWhatsApp}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {L.ctaTitle1}
              <br />
              <span className="text-white/30 font-light italic">{L.ctaTitle2}</span>
            </h2>
            <p className="text-white/40 text-lg mb-10">
              {L.ctaSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticWrapper>
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
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  {L.startOnWhatsApp}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </MagneticWrapper>

              <MagneticWrapper>
                <Link
                  href="/#demos"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold text-base rounded-full border border-white/15 hover:border-white/35 hover:bg-white/5 active:scale-95 transition-all duration-200"
                >
                  {L.viewAllProjects}
                </Link>
              </MagneticWrapper>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#080808] border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors font-medium">
            ← MDigitalDev
          </Link>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} · MDigitalDev
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function ProjectDetailClient({
  project,
  related,
}: {
  project: PortfolioProject;
  related: PortfolioProject[];
}) {
  const { t, lang } = useLanguage();
  const L = t.portfolio.labels;
  const localProject = getProjectLocale(project, lang);

  /* Route coming-soon demos to the simplified view */
  if (project.status === "coming-soon") {
    return <ComingSoonView project={project} related={related} />;
  }

  const openWhatsApp = () =>
    window.open("https://wa.me/212669586001", "_blank");

  const heroAlt = `${project.title} — ${project.category} website built by MDigitalDev`;

  return (
    <main className="bg-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden bg-[#080808]">

        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <Link
            href="/#demos"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm font-semibold rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {L.backToPortfolio}
          </Link>
        </div>

        <motion.div
          className="absolute inset-0 will-change-transform"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.00 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={project.heroImg}
            alt={heroAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

        <motion.div
          className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0   }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="inline-block px-3 py-1.5 mb-5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/70 text-xs font-bold rounded-full tracking-widest uppercase"
          >
            {localProject.category}
          </motion.span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.04] mb-6">
            {localProject.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/60 text-xs font-semibold rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          META BAR
      ══════════════════════════════════════════════════════ */}
      <div className="bg-[#0d0d0d] border-b border-white/[0.06]">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.55, delay: 0.65, ease: EASE }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: L.client,   value: project.client   },
              { label: L.year,     value: project.year     },
              { label: L.timeline, value: project.timeline },
              { label: L.category, value: localProject.category },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25 mb-1.5">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-white/70">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          CHALLENGE & SOLUTION
      ══════════════════════════════════════════════════════ */}
      <Section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  {L.challenge}
                </p>
              </div>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
                {localProject.challenge}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  {L.solution}
                </p>
              </div>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
                {localProject.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          ABOUT THE PROJECT
      ══════════════════════════════════════════════════════ */}
      <Section className="py-16 sm:py-20 bg-[#f9f9f9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-4"
          >
            {L.aboutProject}
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-xl sm:text-2xl text-gray-600 leading-relaxed font-medium"
          >
            {localProject.description}
          </motion.p>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          SCOPE OF WORK
      ══════════════════════════════════════════════════════ */}
      {localProject.scope.length > 0 && (
        <Section className="py-20 sm:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-3"
              >
                {L.scopeOfWork}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight"
              >
                {L.whatWeBuilt}
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {localProject.scope.map((s, i) => {
                const Icon = ICON_MAP[s.icon] ?? Zap;
                return (
                  <motion.div
                    key={s.title}
                    variants={scaleIn}
                    custom={i * 0.1}
                    className="bg-[#f9f9f9] rounded-[24px] p-8 border border-gray-100 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-11 h-11 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-4">{s.title}</h3>
                    <ul className="space-y-2.5">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════════════════
          TECH STACK
      ══════════════════════════════════════════════════════ */}
      {localProject.techSpecs.length > 0 && (
        <Section className="py-20 sm:py-28 bg-[#080808] overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-[0.22em] text-white/30 mb-3"
              >
                {L.techSpecs}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
              >
                {L.underTheHood}
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {localProject.techSpecs.map((spec, i) => (
                <motion.div
                  key={spec.category}
                  variants={scaleIn}
                  custom={i * 0.1}
                  className="p-6 bg-white/[0.04] border border-white/[0.07] rounded-[20px] hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                    {spec.category}
                  </p>
                  <ul className="space-y-2">
                    {spec.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/25 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════════════════
          KEY FEATURES
      ══════════════════════════════════════════════════════ */}
      {localProject.features.length > 0 && (
        <Section className="py-20 sm:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-3"
              >
                {L.keyFeatures}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight"
              >
                {L.everythingIncluded}
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localProject.features.map((f, i) => {
                const Icon = ICON_MAP[f.icon] ?? Zap;
                return (
                  <motion.div
                    key={f.title}
                    variants={scaleIn}
                    custom={i * 0.08}
                    className="group flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black mb-1">{f.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════════════════
          RESULTS
      ══════════════════════════════════════════════════════ */}
      {localProject.results.length > 0 && (
        <Section className="relative py-20 sm:py-28 bg-[#080808] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <div className="absolute top-0 left-1/4  w-[500px] h-[500px] bg-violet-600/[0.05] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/[0.05] rounded-full blur-[100px]" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            aria-hidden
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize:  "28px 28px",
            }}
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-[0.22em] text-white/30 mb-3"
              >
                {L.impact}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
              >
                {L.realResults}
              </motion.h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {localProject.results.map((r, i) => (
                <motion.div
                  key={r.label}
                  variants={scaleIn}
                  custom={i * 0.12}
                  className="text-center p-8 bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] rounded-[24px] hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300"
                >
                  <p className="text-4xl sm:text-5xl font-black text-white leading-none">
                    {r.value}
                    <span className="text-white/35">{r.suffix}</span>
                  </p>
                  <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mt-4">
                    {r.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════════════════
          TESTIMONIAL
      ══════════════════════════════════════════════════════ */}
      {project.testimonial && (
        <Section className="py-20 sm:py-28 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp}>
              <Quote className="w-10 h-10 text-gray-200 mx-auto mb-6" />
              <blockquote className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed mb-8 italic">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-px h-6 bg-gray-300" />
                <div className="text-left">
                  <p className="text-sm font-bold text-black">{project.testimonial.author}</p>
                  <p className="text-xs text-gray-500">{project.testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════════════════
          RELATED PROJECTS
      ══════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <Section className="py-20 sm:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-3"
              >
                {L.youMightAlsoLike}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight"
              >
                {L.relatedProjects}
              </motion.h2>
            </div>

            <div className={`grid gap-6 ${related.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {related.map((rp, i) => (
                <RelatedCard key={rp.id} project={rp} index={i} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#080808] border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0  }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: EASE }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/25 mb-5">
              {L.startOnWhatsApp}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {L.ctaTitle1}
              <br />
              <span className="text-white/30 font-light italic">{L.ctaTitle2}</span>
            </h2>
            <p className="text-white/40 text-lg mb-10">
              {L.ctaSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticWrapper>
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
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  {L.startOnWhatsApp}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </MagneticWrapper>

              <MagneticWrapper>
                <Link
                  href="/#demos"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold text-base rounded-full border border-white/15 hover:border-white/35 hover:bg-white/5 active:scale-95 transition-all duration-200"
                >
                  {L.viewAllProjects}
                </Link>
              </MagneticWrapper>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="bg-[#080808] border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/"
            className="text-xs text-white/30 hover:text-white/60 transition-colors font-medium"
          >
            ← MDigitalDev
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              {L.viewDemo}
            </a>
          )}
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} · MDigitalDev
          </p>
        </div>
      </footer>
    </main>
  );
}
