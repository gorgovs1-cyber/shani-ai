import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Single source of truth for color is :root in app/globals.css.
      // The old cool-toned palette that used to live here (ink #0b0d10,
      // graphite, cream, mist, signal #ff6a3d, st-*) was unused — zero
      // Tailwind classes referenced it — and its orange conflicted with
      // the real accent (--acc #f2622e). Removed so there's one palette.
      // Use the CSS variables instead, e.g. style={{ color: "var(--acc)" }}.
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
