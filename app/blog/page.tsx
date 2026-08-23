"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";
import { sortedPosts } from "@/lib/posts";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

/**
 * אינדקס הבלוג. אותו דפוס כמו /guides: רשת כרטיסים, מקור נתונים יחיד
 * ב-lib, ומתג השפה הקיים באתר מחליף גם את התוכן וגם את הכיווניות.
 * ההבדל היחיד: מדריך נפתח כקובץ HTML בלשונית חדשה, ומאמר הוא עמוד באתר.
 */

type Copy = {
  kicker: string;
  title: string;
  intro: string;
  read: string;
  min: (n: number) => string;
};

const COPY: Record<"he" | "en", Copy> = {
  he: {
    kicker: "בלוג",
    title: "מאמרים",
    intro:
      "התשובות המלאות לשאלות שאני מקבלת הכי הרבה, עם המספרים האמיתיים. כתובות ככה שגם אם לא נעבוד יחד, תדעו מה לעשות הלאה.",
    read: "לקריאה",
    min: (n) => `${n} דקות קריאה`,
  },
  en: {
    kicker: "Blog",
    title: "Articles",
    intro:
      "Full answers to the questions I get most, with the real numbers. Written so that even if we never work together, you know what to do next.",
    read: "Read",
    min: (n) => `${n} min read`,
  },
};

export default function BlogPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <>
      <main dir={dir} style={{ padding: "9rem clamp(20px,5vw,40px) 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>
          {c.kicker}
        </div>
        <h1
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: "clamp(34px,5vw,56px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            fontFamily: HEEBO,
          }}
        >
          {c.title}
        </h1>
        <p
          style={{
            margin: "28px 0 0",
            color: "var(--ink)",
            fontSize: "clamp(17px,1.6vw,21px)",
            lineHeight: 1.7,
            maxWidth: "60ch",
            fontFamily: HEEBO,
          }}
        >
          {c.intro}
        </p>

        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {sortedPosts.map((p) => {
            const title = lang === "he" ? p.title : p.titleEn;
            const desc = lang === "he" ? p.description : p.descriptionEn;
            const tag = lang === "he" ? p.tag : p.tagEn;
            return (
              <article
                key={p.slug}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: 20,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".18em", color: "var(--acc)", textTransform: "uppercase" }}>
                  {tag}
                </span>
                <h2 style={{ margin: 0, fontWeight: 800, fontSize: 19, lineHeight: 1.25, color: "var(--ink)", fontFamily: HEEBO }}>
                  {title}
                </h2>
                <p style={{ margin: 0, color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.6, flex: 1, fontFamily: HEEBO }}>
                  {desc}
                </p>
                <span style={{ fontFamily: MONO, fontSize: 11.5, color: "var(--muted2)" }}>{c.min(p.readingMinutes)}</span>
                <a
                  href={`/blog/${p.slug}`}
                  style={{
                    marginTop: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    // 44px מינימום לפי תקן 5568 / WCAG 2.5.5
                    minHeight: 44,
                    background: "var(--acc)",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 15,
                    padding: "12px 18px",
                    borderRadius: 12,
                    fontFamily: HEEBO,
                  }}
                >
                  {c.read}
                </a>
              </article>
            );
          })}
        </div>

        <div style={{ height: 80 }} />
      </main>
      <Footer />
    </>
  );
}
