"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/components/LanguageProvider";

/** Smoothly animates a number toward `target` (eased), for a premium count-up. */
function useCountUp(target: number, duration = 650) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number>();

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    cancelAnimationFrame(rafRef.current!);

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const current = Math.round(from + (target - from) * eased);
      setValue(current);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [target, duration]);

  return value;
}

export default function ROICalculator() {
  const { t, lang } = useLang();
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(150);
  const ref = useRef<HTMLElement>(null);

  const monthlySaving = hours * 4 * rate;
  const yearlySaving = monthlySaving * 12;

  const animMonthly = useCountUp(monthlySaving);
  const animYearly = useCountUp(yearlySaving);
  const fmt = (n: number) => n.toLocaleString(lang === "he" ? "he-IL" : "en-US");
  const arrow = lang === "he" ? "←" : "→";

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".roi-card", {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".roi-section", start: "top 85%" },
        });
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="roi"
      className="section-padding roi-section"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div className="label" style={{ color: "var(--signal)", marginBottom: "1rem" }}>
          {t.roi.label}
        </div>
        <h2 className="display-md" style={{ color: "var(--cream)" }}>
          {t.roi.title}
        </h2>
      </div>

      <div className="roi-card" style={{
        maxWidth: 640,
        margin: "0 auto",
        background: "var(--graphite)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "2.5rem",
      }}>
        {/* Slider 1 — hours */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.88rem", color: "var(--mist)" }}>{t.roi.hoursLabel}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--cream)", fontSize: "1.05rem" }}>
              {hours} {t.roi.hoursUnit}
            </span>
          </div>
          <input
            type="range" min={1} max={40} value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            aria-label={t.roi.hoursLabel}
            style={{ width: "100%", accentColor: "var(--signal)", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--mist)", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>
            <span>1</span><span>40</span>
          </div>
        </div>

        {/* Slider 2 — rate */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.88rem", color: "var(--mist)" }}>{t.roi.rateLabel}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--cream)", fontSize: "1.05rem" }}>
              {rate} ₪
            </span>
          </div>
          <input
            type="range" min={50} max={500} step={25} value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            aria-label={t.roi.rateLabel}
            style={{ width: "100%", accentColor: "var(--signal)", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--mist)", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>
            <span>50 ₪</span><span>500 ₪</span>
          </div>
        </div>

        {/* Result */}
        <div style={{
          background: "var(--signal-soft)",
          border: "1px solid var(--signal-line)",
          borderRadius: 14,
          padding: "1.5rem",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}>
          <div style={{ fontSize: "0.78rem", color: "var(--mist)", marginBottom: "0.5rem" }}>
            {t.roi.resultPre}
          </div>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            color: "var(--signal)",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            direction: "ltr",
          }}>
            {fmt(animMonthly)} ₪
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--mist)", marginTop: "0.5rem" }}>
            {t.roi.perMonth} {t.roi.perYearTpl.replace("{v}", fmt(animYearly))}
          </div>
        </div>

        <a
          href="https://wa.me/972504744815"
          className="btn-grad"
          style={{ display: "block", textAlign: "center", padding: "1rem" }}
        >
          {t.roi.cta} {arrow}
        </a>
      </div>
    </section>
  );
}
