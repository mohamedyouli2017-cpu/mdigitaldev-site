"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRestaurantCart } from "@/context/RestaurantCartContext";
import { useRT } from "@/lib/restaurant/translations";
import LanguageToggle from "./LanguageToggle";

export default function RNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useRestaurantCart();
  const t = useRT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/restaurant/menu",    label: t.nav.menu    },
    { href: "/restaurant/reserve", label: t.nav.reserve },
    { href: "/restaurant/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300
          ${scrolled
            ? "bg-r-charcoal/95 backdrop-blur-md shadow-[0_1px_0_rgba(212,165,116,0.15)]"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/restaurant" className="flex flex-col leading-none group">
            <span className="font-playfair text-r-gold text-lg font-bold tracking-wide group-hover:opacity-80 transition-opacity">
              Dar Al Yasmine
            </span>
            <span className="text-r-cream/40 text-[10px] tracking-[0.2em] uppercase mt-0.5">
              دار الياسمين
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative
                  ${isActive(link.href)
                    ? "text-r-gold"
                    : "text-r-cream/70 hover:text-r-cream"
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-r-gold rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle />

            {/* Cart */}
            <Link href="/restaurant/cart" className="relative p-2 text-r-cream/70 hover:text-r-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-r-red text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-r-cream/70 hover:text-r-gold transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-30 bg-r-charcoal/97 backdrop-blur-md
                       border-b border-r-gold/10 py-4 md:hidden"
          >
            <nav className="flex flex-col max-w-6xl mx-auto px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 text-base font-medium border-b border-white/5 last:border-0
                    ${isActive(link.href) ? "text-r-gold" : "text-r-cream/70"}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/"
                className="py-3 text-sm text-r-cream/40 hover:text-r-cream/60 transition-colors"
              >
                {t.nav.back}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
