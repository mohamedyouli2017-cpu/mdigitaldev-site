"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRT } from "@/lib/restaurant/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

/* Casablanca coordinates: 33.5731° N, -7.5898° W */
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26701.43186978826!2d-7.6191677!3d33.5731104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1699000000000!5m2!1sen!2sus";

const contactCards = [
  {
    icon: "📞",
    labelKey: "callUs"  as const,
    value:    "+212 669 586 001",
    href:     "tel:+212669586001",
  },
  {
    icon: "💬",
    labelKey: "whatsapp" as const,
    value:    "wa.me/212669586001",
    href:     "https://wa.me/212669586001",
  },
  {
    icon: "📸",
    labelKey: "instagram" as const,
    value:    "@daralyasmine",
    href:     "https://instagram.com",
  },
];

export default function ContactPage() {
  const t = useRT();

  return (
    <div className="min-h-screen pt-16">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-r-charcoal-mid border-b border-white/5">
        <div className="absolute inset-0 bg-dot-pattern-light bg-dot-md opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-r-gold text-xs tracking-[0.3em] uppercase mb-3"
          >
            ✦ Dar Al Yasmine ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl sm:text-5xl font-bold text-r-cream mb-3"
          >
            {t.contact.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-r-cream/50 text-base"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── Our Story ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-r-gold text-xs tracking-[0.3em] uppercase mb-4">
              ✦ Since 2010 ✦
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-playfair text-3xl sm:text-4xl font-bold text-r-cream mb-6 leading-snug">
              {t.contact.storyTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-r-cream/60 leading-relaxed text-base">
              {t.contact.storyText}
            </motion.p>

            {/* Decorative divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mt-8">
              <div className="h-px flex-1 bg-r-gold/20" />
              <span className="text-r-gold text-sm">✦</span>
              <div className="h-px flex-1 bg-r-gold/20" />
            </motion.div>

            {/* Stats */}
            <motion.div variants={stagger} className="grid grid-cols-3 gap-6 mt-8">
              {[
                { value: "15+", label: "Years" },
                { value: "50+", label: "Dishes" },
                { value: "10K+", label: "Guests" },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center">
                  <p className="font-playfair text-2xl font-bold text-r-gold">{stat.value}</p>
                  <p className="text-r-cream/40 text-sm mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-[420px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Dar Al Yasmine interior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-r-charcoal/50 to-transparent" />
            {/* Corners */}
            <div className="absolute top-4 start-4 w-12 h-12 border-t border-s border-r-gold/40" />
            <div className="absolute bottom-4 end-4 w-12 h-12 border-b border-e border-r-gold/40" />
          </motion.div>
        </div>
      </section>

      {/* ── Contact cards ───────────────────────────────────────────────── */}
      <section className="bg-r-charcoal-mid border-y border-white/5 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-4"
          >
            {contactCards.map((card) => (
              <motion.a
                key={card.labelKey}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl
                           border border-white/5 hover:border-r-gold/25
                           transition-all duration-300 group
                           hover:shadow-[0_8px_32px_rgba(212,165,116,0.1)]"
              >
                <span className="text-3xl">{card.icon}</span>
                <p className="text-r-cream/50 text-xs uppercase tracking-widest">
                  {t.contact[card.labelKey]}
                </p>
                <p className="text-r-cream group-hover:text-r-gold transition-colors font-medium text-sm">
                  {card.value}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Map + Hours ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-[1fr_320px] gap-8">

          {/* Google Maps embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden h-[380px] border border-white/5"
          >
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.6)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dar Al Yasmine location"
            />
            {/* Dark overlay for brand consistency */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-r-charcoal via-r-charcoal/80 to-transparent">
              <p className="text-r-cream/80 text-sm font-medium">📍 {t.contact.address}</p>
              <a
                href="https://maps.google.com/?q=Casablanca,Morocco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-r-gold text-xs hover:text-r-gold-light transition-colors mt-1 inline-block"
              >
                {t.contact.directions} →
              </a>
            </div>
          </motion.div>

          {/* Opening hours */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-r-charcoal-mid border border-white/5 h-fit"
          >
            <h3 className="font-playfair text-xl font-bold text-r-cream mb-6 flex items-center gap-2">
              <span className="text-r-gold">🕐</span>
              {t.contact.hoursTitle}
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-start pb-4 border-b border-white/5">
                <div>
                  <p className="text-r-cream/80 text-sm font-medium">{t.contact.hoursWeekday}</p>
                  <p className="text-r-cream/40 text-xs mt-0.5">5 days</p>
                </div>
                <span className="text-r-gold font-semibold text-sm">{t.contact.hoursTime1}</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-r-cream/80 text-sm font-medium">{t.contact.hoursWeekend}</p>
                  <p className="text-r-cream/40 text-xs mt-0.5">2 days</p>
                </div>
                <span className="text-r-gold font-semibold text-sm">{t.contact.hoursTime2}</span>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-r-cream/50 text-xs uppercase tracking-widest mb-2">Address</p>
              <p className="text-r-cream/70 text-sm leading-relaxed">{t.contact.address}</p>
            </div>

            {/* Phone */}
            <div className="mt-4">
              <p className="text-r-cream/50 text-xs uppercase tracking-widest mb-2">Phone</p>
              <a
                href="tel:+212669586001"
                className="text-r-gold hover:text-r-gold-light transition-colors text-sm font-medium"
              >
                {t.contact.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
