"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRestaurantCart } from "@/context/RestaurantCartContext";
import { useRT } from "@/lib/restaurant/translations";
import CartItemRow from "@/components/restaurant/CartItemRow";

type OrderType = "dine-in" | "delivery";

function buildWhatsAppMessage(
  items: ReturnType<typeof useRestaurantCart>["items"],
  orderType: OrderType,
  name: string,
  phone: string,
  tableOrAddress: string,
  total: number,
  deliveryFee: number,
  madLabel: string
) {
  const lineItems = items
    .map((ci) => `• ${ci.quantity}× ${ci.item.nameEn} — ${ci.item.price * ci.quantity} ${madLabel}`)
    .join("\n");

  const lines = [
    "🍽️ New Order — Dar Al Yasmine",
    "━━━━━━━━━━━━━━━",
    "📋 Items:",
    lineItems,
    "━━━━━━━━━━━━━━━",
    `💰 Subtotal: ${total} ${madLabel}`,
    ...(deliveryFee > 0 ? [`🚚 Delivery: ${deliveryFee} ${madLabel}`, `💳 Total: ${total + deliveryFee} ${madLabel}`] : [`💳 Total: ${total} ${madLabel}`]),
    "━━━━━━━━━━━━━━━",
    orderType === "delivery"
      ? `🏠 Delivery to: ${tableOrAddress}`
      : `🪑 Table: ${tableOrAddress}`,
    `📱 Phone: ${phone}`,
    `👤 Name: ${name}`,
  ];

  return encodeURIComponent(lines.join("\n"));
}

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useRestaurantCart();
  const t = useRT();

  const [orderType, setOrderType]   = useState<OrderType>("dine-in");
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [tableOrAddr, setTableOrAddr] = useState("");
  const [submitted, setSubmitted]   = useState(false);

  const DELIVERY_FEE = orderType === "delivery" ? 20 : 0;

  function handleConfirm() {
    if (!name.trim() || !phone.trim() || !tableOrAddr.trim()) return;

    const msg = buildWhatsAppMessage(
      items, orderType, name, phone, tableOrAddr,
      totalPrice, DELIVERY_FEE, t.common.mad
    );
    window.open(`https://wa.me/212669586001?text=${msg}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    clearCart();
  }

  /* ── Empty state ──────────────────────────────────────────────────────── */
  if (totalItems === 0 && !submitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="font-playfair text-2xl font-bold text-r-cream mb-2">{t.cart.empty}</h1>
          <p className="text-r-cream/50 mb-8">{t.cart.emptySubtitle}</p>
          <Link
            href="/restaurant/menu"
            className="inline-block px-8 py-3 rounded-full bg-r-gold text-r-charcoal
                       font-semibold hover:bg-r-gold-light transition-colors"
          >
            {t.cart.browseMenu}
          </Link>
        </motion.div>
      </div>
    );
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
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30
                       flex items-center justify-center mx-auto mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="font-playfair text-2xl font-bold text-r-cream mb-2">{t.cart.successTitle}</h1>
          <p className="text-r-cream/50 mb-8">{t.cart.successMsg}</p>
          <Link
            href="/restaurant/menu"
            className="inline-block px-8 py-3 rounded-full bg-r-gold text-r-charcoal
                       font-semibold hover:bg-r-gold-light transition-colors"
          >
            {t.cart.newOrder}
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ── Main cart ────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-r-cream">
            {t.cart.title}
          </h1>
          <p className="text-r-cream/40 mt-1 text-sm">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* ── Left: items + form ────────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Cart items */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <AnimatePresence>
                {items.map((ci) => (
                  <CartItemRow key={ci.item.id} cartItem={ci} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Order type */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-r-charcoal-mid border border-white/5"
            >
              <p className="text-r-cream/70 text-sm font-medium mb-4">{t.cart.orderType}</p>
              <div className="flex gap-3">
                {(["dine-in", "delivery"] as OrderType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold
                                transition-all duration-200
                                ${orderType === type
                                  ? "bg-r-gold text-r-charcoal shadow-[0_2px_12px_rgba(212,165,116,0.25)]"
                                  : "border border-white/10 text-r-cream/50 hover:border-r-gold/30 hover:text-r-cream"
                                }`}
                  >
                    {type === "dine-in" ? `🪑 ${t.cart.dineIn}` : `🚚 ${t.cart.delivery}`}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Customer info form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl bg-r-charcoal-mid border border-white/5 space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block text-r-cream/60 text-xs mb-1.5 font-medium uppercase tracking-wide">
                  {t.cart.yourName}
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

              {/* Phone */}
              <div>
                <label className="block text-r-cream/60 text-xs mb-1.5 font-medium uppercase tracking-wide">
                  {t.cart.phone}
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

              {/* Table or Address */}
              <div>
                <label className="block text-r-cream/60 text-xs mb-1.5 font-medium uppercase tracking-wide">
                  {orderType === "dine-in" ? t.cart.tableNumber : t.cart.address}
                </label>
                <AnimatePresence mode="wait">
                  <motion.input
                    key={orderType}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    type="text"
                    value={tableOrAddr}
                    onChange={(e) => setTableOrAddr(e.target.value)}
                    placeholder={orderType === "dine-in" ? "Table 5" : "123 Rue Mohammed V, Casablanca"}
                    className="w-full bg-r-charcoal border border-white/10 rounded-xl px-4 py-3
                               text-r-cream text-sm placeholder:text-r-cream/20
                               focus:outline-none focus:border-r-gold/50 transition-colors"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── Right: summary + CTA ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="h-fit sticky top-24"
          >
            <div className="p-6 rounded-2xl bg-r-charcoal-mid border border-white/5 space-y-4">
              <h2 className="font-playfair text-xl font-bold text-r-cream">Order Summary</h2>

              {/* Line items summary */}
              <div className="space-y-2">
                {items.map((ci) => (
                  <div key={ci.item.id} className="flex justify-between text-sm">
                    <span className="text-r-cream/60 truncate max-w-[160px]">
                      {ci.quantity}× {ci.item.nameEn}
                    </span>
                    <span className="text-r-cream font-medium flex-shrink-0 ms-2">
                      {ci.item.price * ci.quantity} {t.common.mad}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-r-cream/60">{t.cart.subtotal}</span>
                  <span className="text-r-cream">{totalPrice} {t.common.mad}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-r-cream/60">{t.cart.deliveryFee}</span>
                  <span className={DELIVERY_FEE === 0 ? "text-green-400" : "text-r-cream"}>
                    {DELIVERY_FEE === 0 ? t.cart.free : `${DELIVERY_FEE} ${t.common.mad}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-white/5 pt-3 mt-2">
                  <span className="text-r-cream">{t.cart.total}</span>
                  <span className="text-r-gold">{totalPrice + DELIVERY_FEE} {t.common.mad}</span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={!name.trim() || !phone.trim() || !tableOrAddr.trim()}
                className="w-full py-4 rounded-xl font-bold text-base
                           bg-[#25D366] text-white
                           flex items-center justify-center gap-2.5
                           hover:bg-[#20c05a] transition-colors
                           disabled:opacity-40 disabled:cursor-not-allowed
                           shadow-[0_4px_24px_rgba(37,211,102,0.3)]"
              >
                {/* WhatsApp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.cart.confirmWhatsApp}
              </motion.button>

              <p className="text-r-cream/30 text-xs text-center">
                You'll be redirected to WhatsApp to send your order
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
