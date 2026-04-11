"use client";

/**
 * app/template.tsx
 * Re-renders on every navigation, giving us smooth enter animations
 * between pages without needing a manual AnimatePresence wrapper.
 */
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{
        duration: 0.42,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
