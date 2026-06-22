"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

export default function Testimonials() {
  const { t, lang } = useLang();
  const items = t.testimonials.items;
  const [i, setI] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const go = (n: number) => setI((prev) => (n + items.length) % items.length);

  // Auto-advance (paused for reduced-motion users)
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [items.length]);

  // Reset to first when language changes (item count is stable, but content swaps)
  useEffect(() => { setI(0); }, [lang]);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".tst-inner", {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".tst-inner", start: "top 85%" },
        });
      }, sectionRef);
    };
    init();
    return () => ctx?.revert();
  }, []);

  const current = items[i];
  const prevArrow = lang === "he" ? "→" : "←";
  const nextArrow = lang === "he" ? "←" : "→";

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="tst-inner" style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        <div className="label" style={{ color: "var(--signal)", marginBottom: "1rem" }}>
          {t.testimonials.label}
        </div>
        <h2 className="display-md" style={{ color: "var(--cream)", marginBottom: "3rem" }}>
          {t.testimonials.title}
        </h2>

        {/* Big quote mark */}
        <div
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 10vw, 7rem)",
            lineHeight: 0.7,
            color: "var(--signal)",
            opacity: 0.85,
            marginBottom: "1rem",
          }}
        >
          “
        </div>

        {/* Quote */}
        <blockquote
          key={i}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.25rem, 3vw, 1.9rem)",
            lineHeight: 1.5,
            fontWeight: 600,
            color: "var(--cream)",
            margin: 0,
            minHeight: "5.5rem",
            animation: "tst-fade 0.45s ease",
          }}
        >
          {current.quote}
        </blockquote>

        {/* Attribution */}
        <div style={{ marginTop: "2rem" }}>
          <div style={{ fontWeight: 700, color: "var(--cream)", fontSize: "1rem" }}>{current.name}</div>
          <div className="mono" style={{ color: "var(--mist)", fontSize: "0.78rem", marginTop: "0.25rem" }}>
            {current.role}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", marginTop: "2.5rem" }}>
          <button onClick={() => go(i - 1)} aria-label="הקודם" className="tst-arrow">{prevArrow}</button>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`עדות ${idx + 1}`}
                style={{
                  width: idx === i ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: idx === i ? "var(--signal)" : "var(--border-2)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
          <button onClick={() => go(i + 1)} aria-label="הבא" className="tst-arrow">{nextArrow}</button>
        </div>
      </div>
    </section>
  );
}
