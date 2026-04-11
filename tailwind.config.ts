import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          black:  "#0a0a0a",
          gray:   "#f5f5f7",
          muted:  "#6e6e73",
          border: "#d2d2d7",
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
          "0%, 100%": {
            boxShadow:
              "0 4px 14px 0 rgba(0,0,0,0.18), 0 0 0px 0 rgba(0,0,0,0)",
          },
          "50%": {
            boxShadow:
              "0 8px 40px 0 rgba(0,0,0,0.38), 0 0 28px 6px rgba(0,0,0,0.12)",
          },
        },
        "dot-drift": {
          "0%":   { backgroundPosition: "0px 0px"   },
          "100%": { backgroundPosition: "28px 28px" },
        },
      },
      animation: {
        "glow-breathe": "glow-breathe 2.8s ease-in-out infinite",
        "dot-drift":    "dot-drift 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
