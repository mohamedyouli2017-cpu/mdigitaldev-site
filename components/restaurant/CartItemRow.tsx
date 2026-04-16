"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRestaurantCart, CartItem } from "@/context/RestaurantCartContext";
import { useRT } from "@/lib/restaurant/translations";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = { cartItem: CartItem };

export default function CartItemRow({ cartItem }: Props) {
  const { item, quantity } = cartItem;
  const { updateQty, removeItem } = useRestaurantCart();
  const { lang } = useLanguage();
  const t = useRT();

  const name = lang === "ar" ? item.nameAr : item.nameEn;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-r-charcoal-mid border border-white/5"
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-r-cream font-semibold truncate">{name}</p>
        <p className="text-r-gold text-sm mt-0.5">
          {item.price} {t.common.mad}
        </p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQty(item.id, -1)}
          className="w-7 h-7 rounded-full border border-r-gold/30 text-r-gold
                     flex items-center justify-center hover:bg-r-gold/10
                     transition-colors duration-150 text-sm font-bold"
        >
          −
        </button>
        <span className="w-5 text-center text-r-cream font-semibold text-sm">
          {quantity}
        </span>
        <button
          onClick={() => updateQty(item.id, 1)}
          className="w-7 h-7 rounded-full border border-r-gold/30 text-r-gold
                     flex items-center justify-center hover:bg-r-gold/10
                     transition-colors duration-150 text-sm font-bold"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <div className="text-right min-w-[64px]">
        <p className="text-r-cream font-bold text-sm">
          {item.price * quantity} {t.common.mad}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-r-cream-muted hover:text-r-red text-xs transition-colors mt-1"
        >
          {t.common.remove}
        </button>
      </div>
    </motion.div>
  );
}
