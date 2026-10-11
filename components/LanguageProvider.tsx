"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { dict, dirOf, type Lang, type Dict } from "@/lib/translations";

type LangCtx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
  href: (path: string) => string;
};

const Ctx = createContext<LangCtx | null>(null);

const STORAGE_KEY = "shani-lang";

export default function LanguageProvider({ children, initialLang = "he" }: { children: React.ReactNode; initialLang?: Lang }) {
  // The URL decides the language: /en/* is English, everything else Hebrew.
  // initialLang comes from the server (x-lang header), so SSR and first paint agree.
  const [lang] = useState<Lang>(initialLang);

  // Reflect the active language onto <html> (drives global CSS direction + lang).
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = dirOf(lang);
    el.setAttribute("data-lang", lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  }, [lang]);

  /** Same page in the other language. */
  const counterpart = useCallback((l: Lang) => {
    if (typeof window === "undefined") return "/";
    const { pathname, hash } = window.location;
    const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const next = l === "en" ? (bare === "/" ? "/en" : `/en${bare}`) : bare;
    return next + hash;
  }, []);

  const setLang = useCallback((l: Lang) => {
    if (l === lang) return;
    window.location.assign(counterpart(l));
  }, [lang, counterpart]);

  const toggle = useCallback(() => setLang(lang === "he" ? "en" : "he"), [lang, setLang]);

  /** Localise an internal path: in English, /websites becomes /en/websites. Guides and SMALL LIGHTS are single-language. */
  const href = useCallback((p: string) => {
    if (lang !== "en" || !p.startsWith("/") || p.startsWith("/en") || p.startsWith("/guides/") || p.startsWith("/small-lights")) return p;
    if (p === "/") return "/en";
    if (p.startsWith("/#")) return "/en" + p.slice(1);
    return "/en" + p;
  }, [lang]);

  const value: LangCtx = {
    lang,
    dir: dirOf(lang),
    t: dict[lang],
    setLang,
    toggle,
    href,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within <LanguageProvider>");
  return ctx;
}
