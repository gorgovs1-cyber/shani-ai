"use client";
import { useLang } from "@/components/LanguageProvider";

export default function NotFoundContent() {
  const { lang, dir, href } = useLang();
  const he = lang === "he";
  return (
    <section className="portfolio-page" dir={dir}>
      <header className="portfolio-heading">
        <h1>{he ? "הדף לא נמצא" : "Page not found"}</h1>
      </header>
      <aside className="portfolio-cta">
        <p>{he ? "ייתכן שהקישור ישן או שנכתב בו משהו בטעות." : "The link may be old or contain a typo."}</p>
        <a href={href("/")} className="portfolio-button">{he ? "חזרה לדף הבית" : "Back to the home page"}</a>
      </aside>
    </section>
  );
}
