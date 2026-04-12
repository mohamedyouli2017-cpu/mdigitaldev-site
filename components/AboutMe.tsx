"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Gauge, Code2, Sparkles } from "lucide-react";

/* ─── shared animation config ─────────────────────────────────────────────── */
const EASE_LUXURY = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, delay: i * 0.1, ease: EASE_LUXURY },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

/* ─── stat-card data ───────────────────────────────────────────────────────── */
const STATS = [
  {
    icon:  Gauge,
    label: "100% PageSpeed",
    desc:  "Lighthouse perfect score on every delivery",
  },
  {
    icon:  Code2,
    label: "Next.js Expert",
    desc:  "App Router, RSC & edge-ready architectures",
  },
  {
    icon:  Sparkles,
    label: "UI/UX Specialist",
    desc:  "Pixel-perfect interfaces that convert",
  },
];

/* ─── component ───────────────────────────────────────────────────────────── */
export default function AboutMe() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-[#07070f] py-24 sm:py-32"
    >
      {/* ── ambient violet bloom ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.20) 0%, rgba(109,40,217,0.09) 40%, transparent 70%)",
          filter: "blur(72px)",
        }}
      />

      {/* ── subtle purple dot-grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.50) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-20"
        >

          {/* ══════════════════════════════════════
              LEFT — photo
          ══════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            className="relative flex-shrink-0 w-64 sm:w-80 lg:w-[360px]"
          >
            {/* Outer glow halo */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(139,92,246,0.30) 0%, transparent 70%)",
                filter: "blur(32px)",
              }}
            />

            {/* 2-px gradient border */}
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-violet-500/60 via-fuchsia-400/25 to-purple-700/50" />

            {/* Photo frame */}
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="/about-photo.jpg"
                alt="Mohamed — MDigitalDev founder"
                width={360}
                height={460}
                className="object-cover w-full object-top"
                priority
              />
              {/* bottom fade into section bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070f]/50 via-transparent to-transparent" />
            </div>

            {/* Floating "available" badge */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.88 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5, ease: EASE_LUXURY }}
              className="absolute -bottom-4 -right-4 flex items-center gap-2.5 rounded-2xl border border-violet-500/30 bg-white/[0.07] px-4 py-2.5 backdrop-blur-xl shadow-xl shadow-purple-950/50"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-white/75 tracking-wide whitespace-nowrap">
                Available for projects
              </span>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════
              RIGHT — content
          ══════════════════════════════════════ */}
          <div className="flex flex-col gap-7 lg:flex-1 text-center lg:text-left">

            {/* Label pill */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                About Me
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl xl:text-[2.85rem]"
            >
              The Mind Behind the{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
                Digital Transformation
              </span>
            </motion.h2>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base leading-relaxed text-white/50 sm:text-[1.05rem]"
            >
              I&apos;m{" "}
              <span className="font-semibold text-white/85">Mohamed</span>, a
              Web &amp; PWA Developer specialized in creating high-performance
              digital ecosystems for the modern restaurant industry. I bridge
              the gap between{" "}
              <span className="font-medium text-violet-300">
                gourmet hospitality
              </span>{" "}
              and cutting-edge tech.
            </motion.p>

            {/* ── Stat cards ── */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {STATS.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  whileHover={{ y: -5, scale: 1.025 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] p-5 backdrop-blur-sm cursor-default
                             hover:border-violet-500/35 hover:bg-violet-500/[0.06] transition-colors duration-300 text-left"
                >
                  {/* inner radial glow on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% -10%, rgba(139,92,246,0.14) 0%, transparent 65%)",
                    }}
                  />

                  <Icon
                    size={21}
                    className="mb-3 text-violet-400 group-hover:text-violet-300 transition-colors duration-300"
                    strokeWidth={1.75}
                  />
                  <p className="text-sm font-bold text-white/88 mb-1 leading-snug">
                    {label}
                  </p>
                  <p className="text-[11.5px] text-white/38 leading-snug">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
