"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "AI Audit",
    description: "שיחת מיפוי ממוקדת. מבינים ביחד איפה העסק שלך מבזבז זמן ומה אפשר להפוך לאוטומטי. יוצאת עם מסמך אסטרטגיה ותכנית מימוש ברורה.",
    tags: ["Discovery Session", "מסמך אסטרטגיה", "ROI ברור"],
    color: "var(--cyan)",
  },
  {
    number: "02",
    title: "תכנון מדויק",
    description: "מגדירות ביחד מה בונים ובאיזה סדר. כל כלי, כל חיבור, כל אוטומציה — ממופות לפני שמתחילים. אין הפתעות אחרי.",
    tags: ["לו\"ז ברור", "בחירת כלים", "Make.com / n8n"],
    color: "var(--purple)",
  },
  {
    number: "03",
    title: "בנייה מואצת",
    description: "בונה בסיוע AI עם הכלים הכי מתקדמים בשוק. אתר Next.js עם GSAP, אוטומציות Make.com ו-n8n, חיבורים ל-WhatsApp API, CRM ומייל — הכל מחובר ועובד.",
    tags: ["Next.js", "Make.com", "n8n", "WhatsApp API", "GSAP"],
    color: "var(--pink)",
  },
  {
    number: "04",
    title: "השקה ותמיכה",
    description: "מעבירה הכל, מלמדת אותך להשתמש, ונשארת זמינה 30 יום אחרי ההשקה. אם משהו לא עובד — אני כאן.",
    tags: ["Vercel Deploy", "הדרכה", "תמיכה 30 יום"],
    color: "var(--purple)",
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".process-header", {
          y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".process-header", start: "top 85%" },
        });
        gsap.from(".process-step", {
          y: 40, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".process-steps", start: "top 80%" },
        });
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="process"
      className="section-padding"
      style={{ borderTop: "1px solid var(--border)" }}
      dir="rtl"
    >
      {/* Header */}
      <div
        className="process-header"
        style={{ textAlign: "center", marginBottom: "4rem" }}
      >
        <div className="label" style={{ color: "var(--purple)", marginBottom: "1rem" }}>
          איך עובדים ביחד
        </div>
        <h2 className="display-md" style={{ color: "var(--white)" }}>
          פשוט, מהיר, ובלי הפתעות.
        </h2>
      </div>

      {/* Steps */}
      <div
        className="process-steps"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: "2rem",
        }}
      >
        {/* Connecting line — desktop only */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "2.25rem",
            right: "calc(12.5% + 1rem)",
            left: "calc(12.5% + 1rem)",
            height: "1px",
            background:
              "linear-gradient(90deg, var(--purple), var(--cyan), var(--pink), var(--purple))",
            opacity: 0.3,
            pointerEvents: "none",
          }}
          className="process-connector"
        />

        {steps.map((step) => (
          <div
            key={step.number}
            className="process-step"
            style={{
              position: "relative",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "2rem 1.5rem",
              textAlign: "center",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = step.color;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
            }}
          >
            {/* Step number */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: `${step.color}22`,
                border: `2px solid ${step.color}`,
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  color: step.color,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {step.number}
              </span>
            </div>

            {/* Title */}
            <h3
              dir="ltr"
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "0.75rem",
              }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {step.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem", justifyContent: "center" }}>
              {step.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.2rem 0.55rem",
                  border: `1px solid ${step.color}44`,
                  color: step.color,
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Styles moved to globals.css */}
    </section>
  );
}
