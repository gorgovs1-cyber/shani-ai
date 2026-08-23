"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";
import { sortedGuides } from "@/lib/guides";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

/**
 * The guides used to sit behind an email gate. It was removed on purpose.
 *
 * Two reasons. Commercially, there is no mailing list yet, so the addresses
 * were being collected with nothing to send. Legally, the guides are static
 * files served straight from /guides/<file> — nothing was ever delivered by
 * email — so the address was collected purely for marketing, and gating a
 * free resource behind marketing consent is exactly the "consent as a
 * condition of service" pattern the Israeli Privacy Protection Authority's
 * גילוי דעת on הסכמה warns against.
 *
 * Removing the gate deletes that exposure and removes a step between the
 * visitor and the thing they came for.
 */

type Copy = {
  kicker: string;
  title: string;
  intro: string;
  view: string;
};

const COPY: Record<"he" | "en", Copy> = {
  he: {
    kicker: "ספריית מדריכים",
    title: "מדריכים להורדה",
    intro:
      "כל מדריך שאני מעלה כפוסט נשמר כאן. הכול פתוח וחינם, בלי להשאיר מייל ובלי הרשמה. פשוט פותחים וקוראים.",
    view: "צפייה / הורדה",
  },
  en: {
    kicker: "Guides library",
    title: "Downloadable guides",
    intro:
      "Every guide I publish as a post is kept here. All of it is free and open — no email, no signup. Just open and read.",
    view: "View / Download",
  },
};

export default function GuidesPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <>
      <main dir={dir} style={{ padding: "9rem clamp(20px,5vw,40px) 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>
          {c.kicker}
        </div>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,5vw,56px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)", fontFamily: HEEBO }}>
          {c.title}
        </h1>
        <p style={{ margin: "28px 0 0", color: "var(--ink)", fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.7, maxWidth: "60ch", fontFamily: HEEBO }}>
          {c.intro}
        </p>

        {/* Guides list */}
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {sortedGuides.map((g) => {
            const title = lang === "he" ? g.title : g.titleEn;
            const desc = lang === "he" ? g.description : g.descriptionEn;
            const tag = lang === "he" ? g.tag : g.tagEn;
            return (
              <article
                key={g.slug}
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
                <h3 style={{ margin: 0, fontWeight: 800, fontSize: 19, lineHeight: 1.25, color: "var(--ink)", fontFamily: HEEBO }}>
                  {title}
                </h3>
                <p style={{ margin: 0, color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.6, flex: 1, fontFamily: HEEBO }}>
                  {desc}
                </p>
                <a
                  href={`/guides/${g.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
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
                  {c.view} ↓
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
