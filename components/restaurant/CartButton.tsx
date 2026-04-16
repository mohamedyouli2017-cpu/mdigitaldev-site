"use client";

import { useRestaurantCart } from "@/context/RestaurantCartContext";
import { useRT } from "@/lib/restaurant/translations";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartButton() {
  const { totalItems, totalPrice } = useRestaurantCart();
  const t = useRT();

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 80, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link href="/restaurant/cart">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl
                       bg-r-gold text-r-charcoal font-semibold shadow-2xl
                       hover:bg-r-gold-light transition-colors duration-200"
          >
            {/* Cart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>

            <span className="text-sm">
              {totalItems} {t.nav.cart}
            </span>

            <span className="font-bold text-sm">
              {totalPrice} {t.common.mad}
            </span>

            {/* Pulse ring */}
            <span className="absolute -top-1 -right-1 w-3 h-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-r-red opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-r-red" />
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
