"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, categories, MenuCategory } from "@/lib/restaurant/menu-data";
import { useRT } from "@/lib/restaurant/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import MenuCard from "@/components/restaurant/MenuCard";

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MenuPage() {
  const t = useRT();
  const { lang } = useLanguage();
  const [active, setActive] = useState<MenuCategory>("starters");

  const filtered = menuItems.filter((m) => m.category === active);
  const activeCategory = categories.find((c) => c.id === active)!;

  return (
    <div className="min-h-screen pt-16">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-r-charcoal-mid border-b border-white/5">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-dot-pattern-light bg-dot-md opacity-30" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
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
            {t.menu.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-r-cream/50 text-base"
          >
            {t.menu.subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── Category tabs ───────────────────────────────────────────────── */}
      <div className="sticky top-16 z-20 bg-r-charcoal/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-none py-2" role="tablist">
            {categories.map((cat) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full
                              text-sm font-medium whitespace-nowrap flex-shrink-0
                              transition-all duration-200
                              ${isActive
                                ? "bg-r-gold text-r-charcoal shadow-[0_2px_16px_rgba(212,165,116,0.3)]"
                                : "text-r-cream/50 hover:text-r-cream hover:bg-white/5"
                              }`}
                >
                  <span>{cat.icon}</span>
                  <span>{lang === "ar" ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Menu grid ───────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Category heading */}
        <motion.div
          key={active}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="text-2xl">{activeCategory.icon}</span>
          <h2 className="font-playfair text-2xl font-bold text-r-cream">
            {lang === "ar" ? activeCategory.labelAr : activeCategory.labelEn}
          </h2>
          <span className="text-r-cream/30 text-sm">
            ({filtered.length} items)
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <MenuCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
