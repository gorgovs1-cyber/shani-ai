import type { Metadata } from "next";
import { headers } from "next/headers";

export const BASE = "https://shani-ai.com";
export const SITE_NAME = "Shani AI";

/** Language of the current request: /en/* is rewritten by middleware.ts with x-lang: en. */
export function requestLang(): "he" | "en" {
  return headers().get("x-lang") === "en" ? "en" : "he";
}

const enPath = (path: string) => (path === "/" ? "/en" : `/en${path}`);

// Share-preview images are 1200x630 (what WhatsApp and Facebook show as a large card).
// A new file name busts the WhatsApp/Facebook preview caches, so bump it when the artwork changes.
const OG_IMAGES = {
  he: { url: `${BASE}/og-he-v7.jpg`, alt: "שני גורגוב, Shani AI: צ׳אטבוטים, אתרים ומערכות CRM מודולריות בשילוב AI לעסק שלכם" },
  en: { url: `${BASE}/og-en-v7.jpg`, alt: "Shani Gorgov, Shani AI: chatbots, websites and modular CRM systems powered by AI for your business" },
};

export function ogImage(lang: "he" | "en") {
  const { url, alt } = OG_IMAGES[lang];
  return { url, secureUrl: url, width: 1200, height: 630, type: "image/jpeg", alt };
}

/** Hebrew or English metadata for a page, with self-canonical, hreflang alternates and full share tags. */
export function localizedMeta(
  path: string,
  he: Metadata,
  en: { title: string; description: string; ogTitle?: string; ogDescription?: string },
): Metadata {
  const hePath = path === "/" ? "" : path;
  const languages = { "he-IL": `${BASE}${hePath}` || BASE, en: `${BASE}${enPath(path)}`, "x-default": `${BASE}${hePath}` || BASE };
  const lang = requestLang();
  const heOg = he.openGraph || {};
  const page =
    lang === "en"
      ? { url: `${BASE}${enPath(path)}`, title: en.ogTitle || en.title, description: en.ogDescription || en.description }
      : { url: `${BASE}${hePath}` || BASE, title: String(heOg.title || he.title), description: String(heOg.description || he.description) };
  const image = ogImage(lang);

  const share: Metadata = {
    openGraph: {
      type: "website",
      ...heOg,
      siteName: SITE_NAME,
      locale: lang === "en" ? "en_US" : "he_IL",
      alternateLocale: lang === "en" ? ["he_IL"] : ["en_US"],
      url: page.url,
      title: page.title,
      description: page.description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [{ url: image.url, alt: image.alt }] },
  };

  if (lang === "en") {
    return {
      ...he,
      title: en.title,
      description: en.description,
      alternates: { canonical: `${BASE}${enPath(path)}`, languages },
      ...share,
    };
  }
  return { ...he, alternates: { ...(he.alternates || {}), languages }, ...share };
}
