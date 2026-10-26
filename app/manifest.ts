import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shani AI Creator",
    short_name: "Shani AI",
    description: "צ׳אטבוטים, אתרים ומערכות CRM בשילוב AI לעסקים",
    lang: "he",
    dir: "rtl",
    start_url: "/",
    display: "browser",
    background_color: "#f4eee4",
    theme_color: "#f4eee4",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
