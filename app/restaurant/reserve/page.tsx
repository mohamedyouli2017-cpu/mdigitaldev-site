"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRT } from "@/lib/restaurant/translations";
import Link from "next/link";

const TIME_SLOTS = ["12:00", "13:00", "14:00", "19:00", "20:00", "21:00", "22:00"];
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

function formatDate(d: Date, lang: "en" | "ar") {
  const opts: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" };
  return d.toLocaleDateString(lang === "ar" ? "ar-MA" : "en-US", opts);
}

function getNext14Days(): Date[] {
  const days: Date[] = [];
  for (let i = 1; i <= 14; i++) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function ReservePage() {
  const t = useRT();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests]             = useState(2);
  const [name, setName]                 = useState("");
  const [phone, setPhone]               = useState("");
  const [submitted, setSubmitted]       = useState(false);

  const days = useMemo(() => getNext14Days(), []);

  const canSubmit = selectedDate && selectedTime && name.trim() && phone.trim();

  function handleReserve() {
    if (!canSubmit) return;

    const dateStr = selectedDate!.toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    const msg = [
      "📅 Table Reservation — Dar Al Yasmine",
      "━━━━━━━━━━━━━━━",
      `📆 Date: ${dateStr}`,
      `🕐 Time: ${selectedTime}`,
      `👥 Party: ${guests} ${guests === 1 ? "guest" : "guests"}`,
      "━━━━━━━━━━━━━━━",
      `👤 Name: ${name}`,
      `📱 Phone: ${phone}`,
    ].join("\n");

    window.open(
      `https://wa.me/212669586001?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
  }

  /* ── Success state ────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-r-gold/15 border border-r-gold/30
                       flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-3xl">🎉</span>
          </motion.div>
          <h1 className="font-playfair text-2xl font-bold text-r-cream mb-2">{t.reserve.successTitle}</h1>
          <p className="text-r-cream/50 mb-8">{t.reserve.successMsg}</p>
          <button
            onClick={() => { setSubmitted(false); setSelectedDate(null); setSelectedTime(null); setName(""); setPhone(""); }}
            className="inline-block px-8 py-3 rounded-full bg-r-gold text-r-charcoal
                       font-semibold hover:bg-r-gold-light transition-colors"
          >
            {t.reserve.newReserve}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Page header */}
      <div className="relative overflow-hidden bg-r-charcoal-mid border-b border-white/5">
        <div className="absolute inset-0 bg-dot-pattern-light bg-dot-md opacity-30" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
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
            {t.reserve.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-r-cream/50 text-base"
          >
            {t.reserve.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">

        {/* ── Step 1: Date ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-r-charcoal-mid border border-white/5"
        >
          <h2 className="text-r-cream font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-r-gold text-r-charcoal text-xs font-bold flex items-center justify-center">1</span>
            {t.reserve.date}
          </h2>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {days.map((day, i) => {
              const isSelected = selectedDate?.toDateString() === day.toDateString();
              const weekday = day.toLocaleDateString("en-US", { weekday: "short" });
              const dayNum  = day.toLocaleDateString("en-US", { day: "numeric" });
              const month   = day.toLocaleDateString("en-US", { month: "short" });
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  className={`flex flex-col items-center px-4 py-3 rounded-xl min-w-[64px]
                              transition-all duration-200 flex-shrink-0
                              ${isSelected
                                ? "bg-r-gold text-r-charcoal shadow-[0_2px_16px_rgba(212,165,116,0.3)]"
                                : "border border-white/10 text-r-cream/60 hover:border-r-gold/30 hover:text-r-cream"
                              }`}
                >
                  <span className="text-xs font-medium">{weekday}</span>
                  <span className="text-xl font-bold leading-tight">{dayNum}</span>
                  <span className="text-xs">{month}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Step 2: Time ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-r-charcoal-mid border border-white/5"
        >
          <h2 className="text-r-cream font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-r-gold text-r-charcoal text-xs font-bold flex items-center justify-center">2</span>
            {t.reserve.time}
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2.5 rounded-xl text-sm font-semibold text-center
                              transition-all duration-200
                              ${isSelected
                                ? "bg-r-gold text-r-charcoal"
                                : "border border-white/10 text-r-cream/60 hover:border-r-gold/30 hover:text-r-cream"
                              }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Step 3: Guests ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-r-charcoal-mid border border-white/5"
        >
          <h2 className="text-r-cream font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-r-gold text-r-charcoal text-xs font-bold flex items-center justify-center">3</span>
            {t.reserve.guests}
          </h2>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setGuests(Math.max(MIN_GUESTS, guests - 1))}
              disabled={guests <= MIN_GUESTS}
              className="w-11 h-11 rounded-full border border-r-gold/30 text-r-gold text-xl
                         flex items-center justify-center hover:bg-r-gold/10 transition-colors
                         disabled:opacity-30 disabled:cursor-not-allowed"
            >
              −
            </button>
            <div className="text-center min-w-[80px]">
              <motion.p
                key={guests}
                initial={{ scale: 1.3, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-playfair text-4xl font-bold text-r-gold"
              >
                {guests}
              </motion.p>
              <p className="text-r-cream/50 text-sm mt-0.5">
                {guests === 1 ? "guest" : "guests"}
              </p>
            </div>
            <button
              onClick={() => setGuests(Math.min(MAX_GUESTS, guests + 1))}
              disabled={guests >= MAX_GUESTS}
              className="w-11 h-11 rounded-full bg-r-gold text-r-charcoal text-xl
                         flex items-center justify-center hover:bg-r-gold-light transition-colors
                         disabled:opacity-30 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </motion.div>

        {/* ── Step 4: Contact ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-r-charcoal-mid border border-white/5 space-y-4"
        >
          <h2 className="text-r-cream font-semibold flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-r-gold text-r-charcoal text-xs font-bold flex items-center justify-center">4</span>
            Your Details
          </h2>

          <div>
            <label className="block text-r-cream/60 text-xs mb-1.5 font-medium uppercase tracking-wide">
              {t.reserve.name}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ahmed Al Fassi"
              className="w-full bg-r-charcoal border border-white/10 rounded-xl px-4 py-3
                         text-r-cream text-sm placeholder:text-r-cream/20
                         focus:outline-none focus:border-r-gold/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-r-cream/60 text-xs mb-1.5 font-medium uppercase tracking-wide">
              {t.reserve.phone}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+212 6XX XXX XXX"
              className="w-full bg-r-charcoal border border-white/10 rounded-xl px-4 py-3
                         text-r-cream text-sm placeholder:text-r-cream/20
                         focus:outline-none focus:border-r-gold/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* ── Reservation summary + CTA ──────────────────────────────────── */}
        <AnimatePresence>
          {canSubmit && (
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-5 rounded-2xl border border-r-gold/20 bg-r-gold/5"
            >
              <p className="text-r-cream/60 text-sm mb-1">Your reservation:</p>
              <p className="text-r-gold font-semibold">
                {selectedDate!.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                {" at "}{selectedTime}
                {" · "}{guests} {guests === 1 ? "guest" : "guests"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReserve}
          disabled={!canSubmit}
          className="w-full py-4 rounded-xl font-bold text-base
                     bg-[#25D366] text-white
                     flex items-center justify-center gap-2.5
                     hover:bg-[#20c05a] transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed
                     shadow-[0_4px_24px_rgba(37,211,102,0.3)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t.reserve.confirm}
        </motion.button>
      </div>
    </div>
  );
}
