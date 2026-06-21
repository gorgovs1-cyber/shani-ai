import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:       "#0b0d10",
        graphite:  "#1c1f24",
        cream:     "#f3efe6",
        mist:      "#9aa1ab",
        signal:    "#ff6a3d",
        "signal-dim": "#e0512a",
        // legacy aliases → new palette
        "st-black":   "#0b0d10",
        "st-surface": "#1c1f24",
        "st-border":  "#23262d",
        "st-cyan":    "#ff6a3d",
        "st-white":   "#f3efe6",
        "st-muted":   "#9aa1ab",
        "st-dim":     "#2a2e36",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
        heebo:   ["var(--font-heebo)", "sans-serif"],
        emph:    ["var(--font-playfair)", "serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
