"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Cinematic Website",
    subtitle: "אתר קולנועי שמביא לקוחות",
    desc: "פיתוח ממשקי קצה וחוויית משתמש אינטראקטיבית (Interactive Digital Experiences). אנחנו בונים אתר תדמית חכם, מהיר ומעוצב בטירוף, שזז בצורה מהפנטת בגלילה וגורם למותג שלכם להיראות בליגה של הגדולים.",
    tags: ["Interactive UI/UX", "Scroll Animation", "Next.js", "Vercel Deploy"],
    time: "שבוע עד שבועיים",
    accent: "var(--purple)",
  },
  {
    number: "02",
    title: "AI Automation Sprint",
    subtitle: "אוטומציה וייעול תהליכים",
    desc: 'בניית "מערכת העצבים" הדיגיטלית של העסק (Smart Business Automation). אנחנו מחברים את האתר והכלים שלכם למערכות אוטומטיות שיטפלו בלידים, יסנכרנו יומנים וישלחו מיילים לבד. הטכנולוגיה עובדת בשבילכם 24/7.',
    tags: ["Lead Automation", "CRM Sync", "Email + WhatsApp", "תמיכה 30 יום"],
    time: "3 עד 7 ימים",
    accent: "var(--pink)",
  },
  {
    number: "03",
    title: "AI Audit",
    subtitle: "שיחת מיפוי ואסטרטגיה טכנולוגית",
    desc: "נקודת הכניסה המושלמת לעסק שלכם (Discovery & Strategy Session). לא בטוחים מאיפה להתחיל? נשב יחד לשיחה ממוקדת, נמפה את העסק, נבין איפה מבזבזים זמן, ונבנה תוכנית עבודה דיגיטלית מדויקת עם הכלים שיקפיצו אתכם קדימה.",
    tags: ["Discovery Session", "מסמך אסטרטגיה", "תכנית מימוש", "ROI ברור"],
    time: "48 שעות",
    accent: "var(--cyan)",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".svc-header", { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".svc-header", start: "top 85%" },
        });
        gsap.utils.toArray<Element>(".svc-row").forEach((el, i) => {
          gsap.fromTo(el, { y: 24, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: ".svc-rows", start: "top 80%" },
          });
        });
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} id="services" className="section-padding" style={{
      borderTop: "1px solid var(--border)",
    }} dir="rtl">

      {/* Header */}
      <div className="svc-header" style={{ marginBottom: "4rem" }}>
        <div className="label" style={{ color: "var(--purple)", marginBottom: "1rem" }}>מה אני עושה</div>
        <h2 className="display-lg" style={{ color: "var(--white)", maxWidth: 480 }}>
          שלושה שירותים.<br />תוצאות מהירות.
        </h2>
      </div>

      {/* Rows */}
      <div className="svc-rows" style={{ borderTop: "1px solid var(--border)" }}>
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <div
              key={s.number}
              className="svc-row"
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                borderBottom: "1px solid var(--border)",
                padding: isOpen ? "2rem 0 2.5rem" : "1.75rem 0",
                cursor: "pointer",
                transition: "padding 0.35s ease",
              }}
            >
              {/* Top row: number + title + price */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "3rem 1fr auto",
                alignItems: "center",
                gap: "2rem",
              }}>
                {/* Number */}
                <span style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: isOpen ? s.accent : "var(--muted)",
                  letterSpacing: "0.08em",
                  transition: "color 0.3s",
                }}>
                  {s.number}
                </span>

                {/* Title block */}
                <div>
                  {/* English title: LTR so letters don't flip */}
                  <h3 dir="ltr" style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                    fontWeight: 700,
                    color: "var(--white)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    transition: "color 0.3s",
                    textAlign: "right",
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    fontSize: "0.82rem",
                    color: isOpen ? s.accent : "var(--muted)",
                    marginTop: "0.25rem",
                    transition: "color 0.3s",
                  }}>
                    {s.subtitle}
                  </p>
                </div>

                {/* Right: time + toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", textAlign: "left" }}>
                  <div>
                    <div style={{
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                      letterSpacing: "0.05em",
                    }}>
                      {s.time}
                    </div>
                  </div>
                  <div style={{
                    width: 28, height: 28,
                    border: `1px solid ${isOpen ? s.accent : "var(--border)"}`,
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isOpen ? s.accent : "var(--muted)",
                    fontSize: "1rem",
                    transition: "all 0.3s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    flexShrink: 0,
                  }}>
                    +
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {isOpen && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr",
                  gap: "2rem",
                  marginTop: "2rem",
                  animation: "fadeSlideDown 0.3s ease forwards",
                }}>
                  <div /> {/* spacer for number column */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start" }}>
                    <p style={{
                      fontSize: "0.95rem",
                      color: "var(--muted)",
                      lineHeight: 1.8,
                      maxWidth: "520px",
                    }}>
                      {s.desc}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start" }}>
                      {s.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "0.3rem 0.75rem",
                          border: `1px solid ${s.accent}44`,
                          color: s.accent,
                          whiteSpace: "nowrap",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ marginTop: "3rem", display: "flex", justifyContent: "flex-end" }}>
        <a
          href="https://wa.me/972504744815"
          className="btn-grad"
          style={{ padding: "0.9rem 2rem", fontSize: "0.85rem" }}
        >
          דברי איתי ←
        </a>
      </div>

      {/* CSS moved to globals.css to avoid hydration mismatch */}
    </section>
  );
}
