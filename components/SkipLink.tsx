"use client";

import { useLang } from "@/components/LanguageProvider";

export default function SkipLink() {
  const { lang } = useLang();
  return (
    <a
      href="#main-content"
      className="skip-link"
      onFocus={(e) => { e.currentTarget.style.top = "0"; }}
      onBlur={(e) => { e.currentTarget.style.top = "-100px"; }}
    >
      {lang === "en" ? "Skip to main content" : "דלג לתוכן"}
    </a>
  );
}
