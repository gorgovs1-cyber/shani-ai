"use client";

import { useEffect, useRef } from "react";

const tools = [
  "Make.com", "n8n", "WhatsApp API",
  "Next.js", "GSAP", "Vercel",
  "Google OAuth", "AI Image Gen",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".about-content", {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".about-content", start: "top 85%" },
        });
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="section-padding" style={{ borderTop: "1px solid var(--border)" }} dir="rtl">
      <div className="about-content" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
        gap: "5rem",
        alignItems: "start",
      }}>

        {/* Story */}
        <div>
          <div className="label" style={{ color: "var(--cyan)", marginBottom: "1rem" }}>עליי</div>
          <h2 className="display-md" style={{ color: "var(--white)", marginBottom: "2rem" }}>
            אני לא באה מעולם ההייטק.<br />אני באה מעולם העסקים.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p className="body-lg">
              במשך שנים ניהלתי עסק משלי, ולכן אני מכירה מקרוב את התחושה שאין מספיק שעות ביום, שהכול עובר דרך הראש שלך ושכל משימה קטנה גוזלת זמן ואנרגיה.
            </p>
            <p className="body-lg">
              כשהתחלתי לעבוד עם AI הבנתי שאפשר לבנות לעצמאים ולעסקים קטנים את הכלים שפעם היו זמינים רק לחברות גדולות.
            </p>
            <p className="body-lg">
              מאז אני בונה אתרים, אוטומציות ומערכות שעוזרות לעסקים לעבוד בצורה פשוטה, מסודרת ויעילה יותר.
            </p>
          </div>

          <div style={{
            marginTop: "2rem",
            padding: "1.25rem 1.5rem",
            background: "rgba(6,182,212,0.06)",
            border: "1px solid rgba(6,182,212,0.15)",
            borderRadius: 12,
          }}>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7 }}>
              הכי נוח לכתוב לי בוואטסאפ — עונה תוך שעה.
            </div>
          </div>
        </div>

        {/* Right */}
        <div>

          {/* Photo — circular, centered */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <div style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: "2px solid rgba(139,92,246,0.45)",
              boxShadow: "0 0 40px rgba(139,92,246,0.18), 0 0 0 6px rgba(139,92,246,0.07)",
              background: "var(--surface)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/shani.jpg"
                alt="שני גורגוב"
                width={200}
                height={200}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 12%",
                  display: "block",
                }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem",
          }}>
            {[
              { n: "10+", label: "שנות ניסיון עסקי" },
              { n: "5",   label: "פרויקטי AI שנמסרו" },
              { n: "48h", label: "זמן תגובה ממוצע" },
              { n: "1",   label: "אדם. בלי צוות ובלי ביורוקרטיה" },
            ].map(({ n, label }) => (
              <div key={label} style={{
                padding: "1.25rem",
                border: "1px solid var(--border)",
                borderRadius: 12,
              }}>
                <div style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--white)",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}>{n}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Tools — reduced */}
          <div className="label" style={{ color: "var(--muted)", marginBottom: "1rem" }}>כלים שאני עובדת איתם</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {tools.map((t) => (
              <span key={t} className="pill" style={{ fontSize: "0.7rem" }}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
