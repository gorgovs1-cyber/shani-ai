"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "כמה זמן לוקח לבנות אתר?",
    a: "אתר Cinematic לוקח 7–14 ימים. אוטומציה לוקחת 3–7 ימים. AI Audit מוכן תוך 48 שעות.",
  },
  {
    q: "מה אני צריך להכין לפני שמתחילים?",
    a: "כלום מיוחד — רק לוגו (אם יש), תמונות (אם יש), וטקסטים בסיסיים. אם אין — עוזרת לך ליצור.",
  },
  {
    q: "אפשר לשלם בשלבים?",
    a: "כן. בדרך כלל 50% בהתחלה ו-50% במסירה. עבור פרויקטים גדולים אפשר לחלק ל-3.",
  },
  {
    q: "מה ההבדל בינך לבין סוכנות?",
    a: "סוכנות = תקשורת דרך מנהל פרויקט, עיצוב דרך מעצב, פיתוח דרך מפתח. אצלי — הכל בנאדם אחד, פחות טלפון שבור, יותר תוצאה.",
  },
  {
    q: "האם אני מקבלת את הקוד?",
    a: "כן. הכל שלך — קוד, דומיין, שרת. אין נעילה.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="faq-item"
      style={{
        borderBottom: "1px solid var(--border)",
        opacity: 0,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.25rem 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "right",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: open ? "var(--purple)" : "var(--white)",
            lineHeight: 1.5,
            transition: "color 0.2s",
            flex: 1,
          }}
        >
          {q}
        </span>

        {/* Toggle icon */}
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: `1.5px solid ${open ? "var(--purple)" : "var(--border)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: open ? "var(--purple)" : "var(--muted)",
            fontSize: "1.1rem",
            lineHeight: 1,
            transition: "border-color 0.2s, color 0.2s, transform 0.25s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      {/* Answer — simple CSS height transition */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 300 : 0,
          transition: "max-height 0.35s ease",
        }}
      >
        <p
          style={{
            paddingBottom: "1.25rem",
            fontSize: "0.9rem",
            color: "var(--muted)",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".faq-header",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".faq-header", start: "top 85%" },
          }
        );
        gsap.fromTo(
          ".faq-item",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
          }
        );
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="faq"
      className="section-padding"
      style={{ borderTop: "1px solid var(--border)" }}
      dir="rtl"
    >
      {/* Header */}
      <div
        className="faq-header"
        style={{ textAlign: "center", marginBottom: "3rem", opacity: 0 }}
      >
        <div className="label" style={{ color: "var(--cyan)", marginBottom: "1rem" }}>
          שאלות נפוצות
        </div>
        <h2 className="display-md" style={{ color: "var(--white)" }}>
          יש שאלה? כנראה שיש פה תשובה.
        </h2>
      </div>

      {/* FAQ list */}
      <div
        className="faq-list"
        style={{ maxWidth: 720, margin: "0 auto" }}
      >
        {faqs.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </section>
  );
}
