"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   MAGNETIC WRAPPER
   Wrap any element to make it "attract" toward the cursor on hover.
   Usage: <MagneticWrapper><button>…</button></MagneticWrapper>
───────────────────────────────────────────────────────────────────────────── */
export function MagneticWrapper({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.5 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width  / 2)) * strength);
      y.set((e.clientY - (r.top  + r.height / 2)) * strength);
    },
    [x, y, strength]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      data-magnetic
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAGNETIC CURSOR
   • Small dot   — snaps to cursor position exactly
   • Outer ring  — follows with spring physics (lagging effect)
   • mix-blend-mode: difference  → appears as inverse color on any background
   • Only renders on fine-pointer (mouse) devices — hidden on touch
───────────────────────────────────────────────────────────────────────────── */
type CursorVariant = "default" | "hover" | "magnetic" | "text";

export default function MagneticCursor() {
  const [mounted,   setMounted]   = useState(false);
  const [isTouch,   setIsTouch]   = useState(true);
  const [visible,   setVisible]   = useState(false);
  const [variant,   setVariant]   = useState<CursorVariant>("default");

  /* Raw cursor position (dot follows this exactly) */
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  /* Spring-lagged position for the ring */
  const springCfg = { damping: 24, stiffness: 260, mass: 0.55 };
  const rx = useSpring(mx, springCfg);
  const ry = useSpring(my, springCfg);

  useEffect(() => {
    setMounted(true);

    /* Bail out on touch devices — keep native cursor */
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) return;

    /* Hide the native cursor globally */
    const style = document.createElement("style");
    style.id    = "hide-cursor";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("[data-magnetic]"))               setVariant("magnetic");
      else if (t.closest("a, button, [role='button']")) setVariant("hover");
      else if (t.closest("p, h1, h2, h3, h4, span"))   setVariant("text");
      else                                               setVariant("default");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseover",  onOver,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.getElementById("hide-cursor")?.remove();
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Don't render on SSR or touch devices */
  if (!mounted || isTouch) return null;

  /* Size & opacity based on interaction state */
  const dotSize  = variant === "magnetic" ? 0   : variant === "text" ? 4  : 8;
  const ringSize = variant === "magnetic" ? 72  : variant === "hover" ? 48 : variant === "text" ? 28 : 36;
  const ringOpacity = variant === "text" ? 0.4 : 1;

  return (
    <>
      {/* ── Dot — exact mouse position ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      >
        <motion.div
          className="rounded-full bg-white mix-blend-difference"
          animate={{ width: dotSize, height: dotSize }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>

      {/* ── Ring — spring-lagged ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? ringOpacity : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full border border-white mix-blend-difference"
          animate={{ width: ringSize, height: ringSize }}
          transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </motion.div>
    </>
  );
}
