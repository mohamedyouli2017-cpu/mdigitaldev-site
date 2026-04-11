"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Facebook, Instagram } from "lucide-react";

const navLinks = [
  { label: "Why Me",    href: "#why-me"   },
  { label: "Services",  href: "#services"  },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact",   href: "#contact"   },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // When not scrolled the hero is dark — flip colours accordingly
  const onDark = !scrolled;

  return (
    <>
      {/* ── Main bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            {/* Icon bg flips: white icon on dark bg, black icon on white bg */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 ${
                onDark ? "bg-white" : "bg-black"
              }`}
            >
              <Zap
                className={`w-4 h-4 transition-colors duration-300 ${onDark ? "text-black" : "text-white"}`}
                fill={onDark ? "black" : "white"}
              />
            </div>
            <span
              className={`font-bold text-sm tracking-tight transition-colors duration-300 ${
                onDark ? "text-white" : "text-black"
              }`}
            >
              Mohamed
              <span className={`font-light transition-colors duration-300 ${onDark ? "text-white/30" : "text-gray-400"}`}>
                .dev
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  onDark
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-gray-500 hover:text-black hover:bg-gray-100"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social links — desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=61570999496194"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={`transition-colors duration-300 hover:text-purple-500 ${
                onDark ? "text-white/60" : "text-gray-400"
              }`}
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/mdigitaldev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`transition-colors duration-300 hover:text-purple-500 ${
                onDark ? "text-white/60" : "text-gray-400"
              }`}
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo("#contact")}
            className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full active:scale-95 transition-all duration-300 ${
              onDark
                ? "bg-white text-black hover:bg-gray-100"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Start Project
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              onDark ? "hover:bg-white/10" : "hover:bg-gray-100"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X    className={`w-5 h-5 ${onDark ? "text-white" : "text-black"}`} />
            ) : (
              <Menu className={`w-5 h-5 ${onDark ? "text-white" : "text-black"}`} />
            )}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer — always white bg ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y:  0 }}
            exit={{   opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 inset-x-0 z-40 bg-[#0d0d0d] border-b border-white/10 shadow-2xl md:hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
              {/* Social links — mobile */}
              <div className="flex items-center gap-4 px-4 pt-3 pb-1">
                <a
                  href="https://www.facebook.com/profile.php?id=61570999496194"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-white/50 hover:text-purple-400 transition-colors duration-300"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/mdigitaldev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/50 hover:text-purple-400 transition-colors duration-300"
                >
                  <Instagram size={20} />
                </a>
              </div>

              <div className="pt-2 pb-1">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-all"
                >
                  Start Your Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
