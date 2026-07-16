"use client";

import { useLang } from "@/components/LanguageProvider";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

/**
 * ─────────────────────────────────────────────────────────────
 *  עדויות לקוחות — PLACEHOLDER, יש להחליף בעדויות אמיתיות
 *  לכל עדות: name (שם מלא) · city (עיר) · result (התוצאה במספרים)
 *  · quote (המשפט של הלקוחה) · photo (נתיב לתמונה ב-/public/testimonials/)
 *  אם photo ריק — מוצג עיגול ראשי תיבות אוטומטית.
 * ─────────────────────────────────────────────────────────────
 */
type Item = {
  name: string;
  city: string;
  result: string;
  quote: string;
  photo?: string; // e.g. "/testimonials/michal.jpg"
};

const COPY: Record<"he" | "en", { kicker: string; title: string; sub: string; items: Item[] }> = {
  he: {
    kicker: "06 · המלצות",
    title: "מה לקוחות אומרות.",
    sub: "תוצאות אמיתיות מעסקים אמיתיים.",
    items: [
      {
        name: "מאור",
        city: "בעל עסק",
        result: "האוטומציה עונה במקומו",
        quote:
          "שני זיהתה בדיוק איפה בזבזתי זמן, ובנתה לי אוטומציה שמטפלת בפניות לבד. אני כבר לא עונה לאותן שאלות עשר פעמים ביום.",
        photo: "", // "/testimonials/xxx.jpg"
      },
      {
        name: "הילה איתן",
        city: "מיתוג אישי",
        result: "דף אישי ממותג באוויר",
        quote:
          "רציתי נוכחות אישית שמציגה אותי ברמה אחרת, ושני בנתה לי דף ממותג ומדויק. התהליך היה מהיר וקל, והתוצאה בדיוק אני.",
        photo: "",
      },
      {
        name: "לילך חזן",
        city: "בעלת עסק",
        result: "אתר עסקי חדש באוויר",
        quote:
          "רציתי אתר שממצב אותי ברמה של הגדולים. קיבלתי אתר מהיר, יפה ומחובר לוואטסאפ, וכל התהליך היה פשוט ונעים.",
        photo: "",
      },
    ],
  },
  en: {
    kicker: "06 · Reviews",
    title: "What clients say.",
    sub: "Real results from real businesses.",
    items: [
      {
        name: "Maor",
        city: "Business owner",
        result: "Automation answers for him",
        quote:
          "Shani found exactly where I was wasting time and built me an automation that handles inquiries on its own. I no longer answer the same questions ten times a day.",
        photo: "",
      },
      {
        name: "Hila Eitan",
        city: "Personal brand",
        result: "Branded personal page live",
        quote:
          "I wanted a personal presence on a different level, and Shani built me a precise, branded page. The process was fast and easy, and the result is exactly me.",
        photo: "",
      },
      {
        name: "Lilach Hazan",
        city: "Business owner",
        result: "New business site live",
        quote:
          "I wanted a site that positions me alongside the big players. I got a fast, beautiful site wired to WhatsApp, and the whole process was simple and pleasant.",
        photo: "",
      },
    ],
  },
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]).join("");
}

export default function TestimonialsSection() {
  const { lang } = useLang();
  const c = COPY[lang];
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <section
      id="testimonials"
      dir={dir}
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1320,
        margin: "0 auto",
        padding: "clamp(72px,9vw,128px) 24px 0",
        opacity: 0,
        transform: "translateY(28px)",
        transition: "opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)",
      }}
      ref={(el) => {
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "none";
            io.disconnect();
          }
        }, { threshold: 0.08 });
        io.observe(el);
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 46 }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>
          {c.kicker}
        </div>
        <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,4.4vw,58px)", lineHeight: 1.04, letterSpacing: "-0.03em", fontFamily: HEEBO, color: "var(--ink)" }}>
          {c.title}
        </h2>
        <p style={{ margin: "16px 0 0", color: "var(--muted2)", fontSize: 16, lineHeight: 1.6, maxWidth: "52ch", fontFamily: HEEBO }}>
          {c.sub}
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {c.items.map((it, i) => (
          <figure key={i} style={{ margin: 0, background: "var(--card)", border: "1px solid var(--line)", borderRadius: 22, padding: "30px 28px", display: "flex", flexDirection: "column" }}>
            {/* Result metric */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start", background: "rgba(242,98,46,0.08)", color: "var(--acc)", fontWeight: 700, fontSize: 13.5, padding: "7px 14px", borderRadius: 999, fontFamily: HEEBO, marginBottom: 20 }}>
              ★ {it.result}
            </div>

            {/* Quote */}
            <blockquote style={{ margin: 0, color: "var(--ink)", fontSize: 16.5, lineHeight: 1.7, fontFamily: HEEBO, flexGrow: 1 }}>
              “{it.quote}”
            </blockquote>

            {/* Attribution: photo + name + city */}
            <figcaption style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
              {it.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.photo} alt={it.name} width={48} height={48} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
              ) : (
                <span aria-hidden="true" style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--dark)", color: "var(--acc)", fontWeight: 800, fontSize: 17, fontFamily: MONO }}>
                  {initials(it.name)}
                </span>
              )}
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
                <span style={{ fontWeight: 700, fontSize: 15.5, color: "var(--ink)", fontFamily: HEEBO }}>{it.name}</span>
                <span style={{ fontSize: 13, color: "var(--muted2)", fontFamily: MONO }}>{it.city}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
