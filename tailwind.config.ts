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
        "st-black":    "#080808",
        "st-surface":  "#111111",
        "st-border":   "#1c1c1c",
        "st-cyan":     "#00E5FF",
        "st-cyan-dim": "#00B8CC",
        "st-white":    "#F2F2F2",
        "st-muted":    "#666666",
        "st-dim":      "#333333",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body:    ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
