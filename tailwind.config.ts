import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:         ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        playfair:     ["var(--font-playfair)", "Georgia", "serif"],
        "dm-sans":    ["var(--font-dm-sans)", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        brand: {
          black:  "#0a0a0a",
          gray:   "#f5f5f7",
          muted:  "#6e6e73",
          border: "#d2d2d7",
        },
        r: {
          charcoal:       "#1a1a2e",
          "charcoal-mid": "#16213e",
          "charcoal-card":"#0f2040",
          gold:           "#d4a574",
          "gold-dark":    "#b8895a",
          "gold-light":   "#e8c99a",
          cream:          "#f5f0e8",
          "cream-muted":  "#c9c0b0",
          red:            "#8b2635",
          "red-dark":     "#6d1e29",
          overlay:        "rgba(26,26,46,0.88)",
        },
      },
      boxShadow: {
        card:       "0 2px 20px 0 rgba(0,0,0,0.06)",
        "card-hover": "0 8px 40px 0 rgba(0,0,0,0.12)",
        glass:      "0 8px 32px 0 rgba(0,0,0,0.24)",
      },
      backgroundImage: {
        "dot-pattern":
          "radial-gradient(circle, rgba(0,0,0,0.14) 1.2px, transparent 1.2px)",
        "dot-pattern-light":
          "radial-gradient(circle, rgba(255,255,255,0.08) 1.2px, transparent 1.2px)",
      },
      backgroundSize: {
        "dot-md": "28px 28px",
      },
      keyframes: {
        "glow-breathe": {
          "0%, 100%": { boxShadow: "0 4px 14px 0 rgba(0,0,0,0.18), 0 0 0px 0 rgba(0,0,0,0)" },
          "50%":       { boxShadow: "0 8px 40px 0 rgba(0,0,0,0.38), 0 0 28px 6px rgba(0,0,0,0.12)" },
        },
        "dot-drift": {
          "0%":   { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "28px 28px" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "glow-breathe": "glow-breathe 2.8s ease-in-out infinite",
        "dot-drift":    "dot-drift 12s linear infinite",
        "fade-up":      "fade-up 0.6s ease-out forwards",
        "scale-in":     "scale-in 0.3s ease-out forwards",
        "shimmer":      "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
