"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/components/LanguageProvider";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

/** Smoothly animates a number toward `target` (eased), for a premium count-up. */
function useCountUp(target: number, duration = 650) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number>();

  useEffect(() => {
    // The global prefers-reduced-motion block in globals.css only neutralises
    // CSS animations; a JS rAF count-up runs regardless. Jump straight to the
    // value instead.
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fromRef.current = target;
      setValue(target);
      return;
    }

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

  useEffect(() => {
    // gsap.from() with opacity:0 leaves the card invisible until ScrollTrigger
    // fires. Under reduced motion we skip the tween entirely rather than
    // risking a blank card, and honour the preference at the same time.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
      className="roi-section"
      dir={lang === "he" ? "rtl" : "ltr"}
      style={{ marginTop: 64, paddingTop: 8 }}
    >
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{
          fontFamily: MONO, fontSize: 13, letterSpacing: ".18em",
          color: "var(--acc)", marginBottom: 14, textTransform: "uppercase",
        }}>
          {t.roi.label}
        </div>
        <h2 style={{
          margin: 0, fontWeight: 800, fontFamily: HEEBO,
          fontSize: "clamp(24px,3vw,36px)", letterSpacing: "-0.02em",
          color: "var(--ink)",
        }}>
          {t.roi.title}
        </h2>
      </div>

      <div className="roi-card" style={{
        maxWidth: 640,
        margin: "0 auto",
        background: "var(--card)",
        border: "1px solid var(--line)",
        borderRadius: 20,
        padding: "clamp(24px,3vw,40px)",
      }}>
        {/* Slider 1 — hours */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: 15, color: "var(--muted2)", fontFamily: HEEBO }}>{t.roi.hoursLabel}</span>
            <span style={{ fontFamily: MONO, fontWeight: 700, color: "var(--ink)", fontSize: 17 }}>
              {hours} {t.roi.hoursUnit}
            </span>
          </div>
          <input
            type="range" min={1} max={40} value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            aria-label={t.roi.hoursLabel}
            // .roi-range lifts the control to a 44px hit area on coarse
            // pointers only (globals.css) — 24px is a mistap on a phone.
            className="roi-range"
            style={{ width: "100%", accentColor: "var(--acc)", cursor: "pointer", minHeight: 24 }}
          />
          <div dir="ltr" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted2)", marginTop: 6, fontFamily: MONO }}>
            <span>1</span><span>40</span>
          </div>
        </div>

        {/* Slider 2 — rate */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: 15, color: "var(--muted2)", fontFamily: HEEBO }}>{t.roi.rateLabel}</span>
            <span style={{ fontFamily: MONO, fontWeight: 700, color: "var(--ink)", fontSize: 17 }}>
              {rate} ₪
            </span>
          </div>
          <input
            type="range" min={50} max={500} step={25} value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            aria-label={t.roi.rateLabel}
            className="roi-range"
            style={{ width: "100%", accentColor: "var(--acc)", cursor: "pointer", minHeight: 24 }}
          />
          <div dir="ltr" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted2)", marginTop: 6, fontFamily: MONO }}>
            <span>50 ₪</span><span>500 ₪</span>
          </div>
        </div>

        {/* Result */}
        <div style={{
          background: "color-mix(in oklch, var(--acc) 8%, transparent)",
          border: "1px solid color-mix(in oklch, var(--acc) 30%, transparent)",
          borderRadius: 14,
          padding: 24,
          textAlign: "center",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 14, color: "var(--muted2)", marginBottom: 8, fontFamily: HEEBO }}>
            {t.roi.resultPre}
          </div>
          <div style={{
            fontFamily: HEEBO,
            fontSize: "clamp(30px, 4vw, 46px)",
            fontWeight: 800,
            color: "var(--acc)",
            lineHeight: 1.05,
            fontVariantNumeric: "tabular-nums",
            direction: "ltr",
          }}>
            {fmt(animMonthly)} ₪
          </div>
          <div style={{ fontSize: 14, color: "var(--muted2)", marginTop: 8, fontFamily: HEEBO }}>
            {t.roi.perMonth} {t.roi.perYearTpl.replace("{v}", fmt(animYearly))}
          </div>
        </div>

        <a
          href={`https://wa.me/972504744815?text=${encodeURIComponent(
            lang === "he"
              ? "היי שני, בדקתי במחשבון ואני רוצה לדבר על אוטומציה"
              : "Hi Shani, I used the calculator and I'd like to talk about automation"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block", textAlign: "center", padding: "16px 24px",
            background: "var(--acc)", color: "#fff", textDecoration: "none",
            fontWeight: 700, fontSize: 16, borderRadius: 14, fontFamily: HEEBO,
          }}
        >
          {t.roi.cta}
        </a>

        <p style={{
          margin: "14px 0 0", fontSize: 13, lineHeight: 1.6,
          color: "var(--muted2)", fontFamily: HEEBO, textAlign: "center",
        }}>
          {t.roi.disclaimer}
        </p>
      </div>
    </section>
  );
}
