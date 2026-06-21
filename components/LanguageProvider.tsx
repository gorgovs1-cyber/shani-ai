"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { dict, dirOf, type Lang, type Dict } from "@/lib/i18n";

type LangCtx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const Ctx = createContext<LangCtx | null>(null);

const STORAGE_KEY = "shani-lang";

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Hebrew so server-rendered <html lang="he" dir="rtl"> matches first paint.
  const [lang, setLangState] = useState<Lang>("he");

  // On mount, restore the saved preference (if any).
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (saved === "he" || saved === "en") setLangState(saved);
  }, []);

  // Reflect the active language onto <html> (drives global CSS direction + lang).
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = dirOf(lang);
    el.setAttribute("data-lang", lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "he" ? "en" : "he";
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });
  }, []);

  const value: LangCtx = {
    lang,
    dir: dirOf(lang),
    t: dict[lang],
    setLang,
    toggle,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within <LanguageProvider>");
  return ctx;
}
