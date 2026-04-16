"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRestaurantCart } from "@/context/RestaurantCartContext";
import { useRT } from "@/lib/restaurant/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import { MenuItem } from "@/lib/restaurant/menu-data";

type Props = { item: MenuItem };

export default function MenuCard({ item }: Props) {
  const { addItem, items, updateQty } = useRestaurantCart();
  const { lang } = useLanguage();
  const t = useRT();

  const [flash, setFlash] = useState(false);

  const cartItem = items.find((ci) => ci.item.id === item.id);
  const qty = cartItem?.quantity ?? 0;

  const name = lang === "ar" ? item.nameAr : item.nameEn;
  const desc = lang === "ar" ? item.descAr : item.descEn;

  function handleAdd() {
    addItem(item);
    setFlash(true);
    setTimeout(() => setFlash(false), 1200);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col rounded-2xl overflow-hidden
                 bg-r-charcoal-mid border border-white/5
                 hover:border-r-gold/25 transition-all duration-300
                 hover:shadow-[0_8px_40px_rgba(212,165,116,0.12)]"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-r-charcoal-mid via-transparent to-transparent opacity-60" />

        {/* Price badge */}
        <div className="absolute top-3 end-3 px-2.5 py-1 rounded-full
                        bg-r-charcoal/80 backdrop-blur-sm border border-r-gold/20
                        text-r-gold text-xs font-bold">
          {item.price} {t.common.mad}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="text-r-cream font-semibold leading-tight">{name}</h3>
          {lang === "ar" ? null : (
            <p className="text-r-cream/50 text-xs mt-0.5 font-dm-sans" dir="rtl">{item.nameAr}</p>
          )}
          <p className="text-r-cream-muted text-sm mt-2 leading-relaxed line-clamp-2">{desc}</p>
        </div>

        {/* Add/Qty controls */}
        <div className="mt-auto">
          <AnimatePresence mode="wait">
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleAdd}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold
                           transition-all duration-200
                           ${flash
                             ? "bg-green-600/20 text-green-400 border border-green-500/30"
                             : "bg-r-gold/10 text-r-gold border border-r-gold/20 hover:bg-r-gold hover:text-r-charcoal"
                           }`}
              >
                {flash ? t.menu.added : t.menu.addToCart}
              </motion.button>
            ) : (
              <motion.div
                key="qty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between gap-2"
              >
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="flex-1 py-2.5 rounded-xl border border-r-gold/30 text-r-gold
                             hover:bg-r-gold/10 transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span className="text-r-cream font-bold text-lg min-w-[2ch] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="flex-1 py-2.5 rounded-xl bg-r-gold text-r-charcoal
                             hover:bg-r-gold-light transition-colors font-bold text-lg"
                >
                  +
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
