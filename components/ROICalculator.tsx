"use client";

import { useState, useEffect, useRef } from "react";

export default function ROICalculator() {
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(150);
  const ref = useRef<HTMLElement>(null);

  const monthlySaving = hours * 4 * rate;
  const yearlySaving = monthlySaving * 12;

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".roi-section", {
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
      dir="rtl"
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div className="label" style={{ color: "var(--purple)", marginBottom: "1rem" }}>
          כמה זמן את מבזבזת?
        </div>
        <h2 className="display-md" style={{ color: "var(--white)" }}>
          חשבי כמה שווה הזמן שלך
        </h2>
      </div>

      <div style={{
        maxWidth: 640,
        margin: "0 auto",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "2.5rem",
      }}>
        {/* Slider 1 */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>שעות עבודה ידנית בשבוע</span>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--white)", fontSize: "1.1rem" }}>
              {hours} שעות
            </span>
          </div>
          <input
            type="range" min={1} max={40} value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--purple)", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.3rem" }}>
            <span>1</span><span>40</span>
          </div>
        </div>

        {/* Slider 2 */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>שווי שעת העבודה שלך (₪)</span>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--white)", fontSize: "1.1rem" }}>
              {rate} ₪
            </span>
          </div>
          <input
            type="range" min={50} max={500} step={25} value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--purple)", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.3rem" }}>
            <span>50 ₪</span><span>500 ₪</span>
          </div>
        </div>

        {/* Result */}
        <div style={{
          background: "rgba(139,92,246,0.08)",
          border: "1px solid rgba(139,92,246,0.2)",
          borderRadius: 14,
          padding: "1.5rem",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
            אוטומציה יכולה לחסוך לך
          </div>
          <div style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            background: "linear-gradient(90deg, var(--purple), var(--cyan))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}>
            {monthlySaving.toLocaleString("he-IL")} ₪
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.4rem" }}>
            בחודש ({yearlySaving.toLocaleString("he-IL")} ₪ בשנה)
          </div>
        </div>

        <a
          href="https://wa.me/972504744815"
          className="btn-grad"
          style={{ display: "block", textAlign: "center", padding: "1rem" }}
        >
          בואי נחסוך את הזמן הזה ←
        </a>
      </div>
    </section>
  );
}
