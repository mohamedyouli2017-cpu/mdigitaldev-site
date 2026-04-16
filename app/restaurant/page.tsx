"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRT } from "@/lib/restaurant/translations";
import { menuItems } from "@/lib/restaurant/menu-data";
import { useLanguage } from "@/contexts/LanguageContext";
import MenuCard from "@/components/restaurant/MenuCard";

/* ── Animation variants ──────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

/* ── Featured items (3 picks from different categories) ─────────────────── */
const FEATURED_IDS = ["tajine-chicken", "couscous-royal", "pastilla"];

export default function RestaurantHome() {
  const t    = useRT();
  const { lang } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY   = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = FEATURED_IDS.map((id) => menuItems.find((m) => m.id === id)!);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="Dar Al Yasmine — fine dining"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-r-charcoal/60 via-r-charcoal/40 to-r-charcoal" />
        <div className="absolute inset-0 bg-r-charcoal/30" />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-px bg-r-gold mx-auto mb-6"
          />

          {/* Arabic subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-r-gold/70 text-sm tracking-[0.35em] uppercase mb-3 font-dm-sans"
            dir="rtl"
          >
            دار الياسمين
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold text-r-cream
                       leading-tight tracking-tight"
          >
            {lang === "ar" ? "دار الياسمين" : "Dar Al Yasmine"}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-4 text-r-cream/60 text-lg sm:text-xl font-light tracking-wide"
          >
            {t.home.tagline}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-16 h-px bg-r-gold mx-auto mt-6 mb-8"
          />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/restaurant/menu"
              className="px-8 py-3.5 rounded-full bg-r-gold text-r-charcoal font-semibold
                         hover:bg-r-gold-light transition-all duration-200 hover:scale-105
                         shadow-[0_4px_24px_rgba(212,165,116,0.35)]"
            >
              {t.home.viewMenu}
            </Link>
            <Link
              href="/restaurant/reserve"
              className="px-8 py-3.5 rounded-full border border-r-gold/50 text-r-cream
                         hover:bg-r-gold/10 hover:border-r-gold transition-all duration-200 hover:scale-105"
            >
              {t.home.reserve}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-r-cream/30 text-xs tracking-widest uppercase">
            {t.home.scrollHint}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-r-gold/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Opening Hours strip ───────────────────────────────────────────── */}
      <section className="bg-r-charcoal-mid border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center
                        justify-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <span className="text-r-gold text-lg">🕐</span>
            <div>
              <p className="text-r-cream/50 text-xs uppercase tracking-widest mb-1">
                {t.home.openingHours}
              </p>
              <p className="text-r-cream text-sm font-medium">{t.home.hoursWeekday}</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div className="flex items-center gap-3">
            <span className="text-r-gold text-lg">✨</span>
            <div>
              <p className="text-r-cream/50 text-xs uppercase tracking-widest mb-1">
                &nbsp;
              </p>
              <p className="text-r-cream text-sm font-medium">{t.home.hoursWeekend}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured dishes ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-r-gold text-xs tracking-[0.3em] uppercase mb-3">
              ✦ Chef's Selection ✦
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-r-cream">
              {t.home.featuredTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featured.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <MenuCard item={item} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="text-center mt-10">
            <Link
              href="/restaurant/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                         border border-r-gold/30 text-r-gold hover:bg-r-gold/10
                         hover:border-r-gold transition-all duration-200 font-medium"
            >
              View Full Menu
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── About / Story strip ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-r-charcoal-mid border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-r-gold text-xs tracking-[0.3em] uppercase mb-4">
              ✦ Our Story ✦
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-playfair text-3xl sm:text-4xl font-bold text-r-cream mb-6 leading-snug">
              {t.home.aboutTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-r-cream/60 leading-relaxed text-base">
              {t.home.aboutText}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/restaurant/contact"
                className="inline-flex items-center gap-2 text-r-gold hover:text-r-gold-light
                           transition-colors font-medium text-sm"
              >
                Learn more about us
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-[380px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
              alt="Dar Al Yasmine restaurant interior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-r-charcoal-mid/60 to-transparent" />

            {/* Decorative corner */}
            <div className="absolute top-4 start-4 w-12 h-12 border-t border-s border-r-gold/40" />
            <div className="absolute bottom-4 end-4 w-12 h-12 border-b border-e border-r-gold/40" />
          </motion.div>
        </div>
      </section>

      {/* ── Reserve CTA ───────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="w-px h-12 bg-gradient-to-b from-r-gold/50 to-transparent mx-auto mb-8" />
          <motion.h2 variants={fadeUp} className="font-playfair text-3xl sm:text-4xl font-bold text-r-cream mb-4">
            Reserve Your Table
          </motion.h2>
          <motion.p variants={fadeUp} className="text-r-cream/50 mb-8 text-base">
            Join us for an unforgettable evening of authentic Moroccan flavours.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/restaurant/reserve"
              className="inline-block px-10 py-4 rounded-full bg-r-gold text-r-charcoal
                         font-semibold text-base hover:bg-r-gold-light transition-all duration-200
                         hover:scale-105 shadow-[0_4px_32px_rgba(212,165,116,0.3)]"
            >
              {t.home.reserve}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
