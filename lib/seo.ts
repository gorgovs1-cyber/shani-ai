import type { Metadata } from "next";
import { headers } from "next/headers";

export const BASE = "https://shani-ai.com";

/** Language of the current request: /en/* is rewritten by middleware.ts with x-lang: en. */
export function requestLang(): "he" | "en" {
  return headers().get("x-lang") === "en" ? "en" : "he";
}

const enPath = (path: string) => (path === "/" ? "/en" : `/en${path}`);

/** Hebrew or English metadata for a page, with self-canonical and hreflang alternates. */
export function localizedMeta(
  path: string,
  he: Metadata,
  en: { title: string; description: string },
): Metadata {
  const languages = { "he-IL": `${BASE}${path === "/" ? "" : path}` || BASE, en: `${BASE}${enPath(path)}`, "x-default": `${BASE}${path === "/" ? "" : path}` || BASE };
  if (requestLang() === "en") {
    return {
      ...he,
      title: en.title,
      description: en.description,
      alternates: { canonical: `${BASE}${enPath(path)}`, languages },
      openGraph: { ...(he.openGraph || {}), title: en.title, description: en.description, url: `${BASE}${enPath(path)}`, locale: "en_US" },
      twitter: he.twitter ? { ...he.twitter, title: en.title, description: en.description } : undefined,
    };
  }
  return { ...he, alternates: { ...(he.alternates || {}), languages } };
}
