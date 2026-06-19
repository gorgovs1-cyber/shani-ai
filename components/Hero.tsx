"use client";

import AutomationTree from "@/components/AutomationTree";

export default function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "6rem clamp(1.5rem, 5vw, 4rem) 3rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient blobs */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 70% 50% at 15% 50%, rgba(139,92,246,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 20%, rgba(6,182,212,0.06) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 70% 80%, rgba(236,72,153,0.04) 0%, transparent 50%)
        `,
      }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        width: "100%",
      }} className="hero-grid">
        {/* Right — text content */}
        <div>
          {/* Eyebrow — pill badge */}
          <div className="hero-line" style={{ marginBottom: "2rem" }}>
            <span className="pill" style={{ color: "var(--cyan)", borderColor: "rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.08)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", display: "inline-block" }} />
              זמינה לפרויקטים חדשים
            </span>
          </div>

          {/* Headline */}
          <div className="hero-line display-xl" style={{ color: "var(--white)" }}>
            אני הופכת עסקים
          </div>
          <div className="hero-line display-xl grad-text">
            מבולגנים למערכות
          </div>
          <div className="hero-line display-xl" style={{ color: "var(--white)" }}>
            שעובדות לבד.
          </div>

          {/* Sub */}
          <p className="hero-sub body-lg" style={{ maxWidth: 520, marginTop: "2rem" }}>
            אתרים, אוטומציות וכלי AI שחוסכים לעסק שלך{" "}
            <span style={{ color: "var(--white)", fontWeight: 600 }}>5 עד 20 שעות בשבוע.</span>
          </p>

          {/* CTAs */}
          <div className="hero-cta" style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap", flexDirection: "column", alignItems: "flex-start" }}>
            <a href="https://wa.me/972504744815" className="btn-grad" style={{ padding: "1rem 2.5rem", fontSize: "0.95rem" }}>
              בדיקת AI לעסק ללא עלות
            </a>
            <a href="#work" className="btn-ghost">
              ראי את העבודות
            </a>
            <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.75rem" }}>ממוצע תגובה 48 שעות · ישראל</p>
          </div>

          {/* Trust bar */}
          <div className="hero-stat" style={{
            display: "flex", flexWrap: "wrap", gap: "1.5rem",
            marginTop: "2.5rem",
          }}>
            {[
              "10+ שנות ניסיון עסקי",
              "5 פרויקטי AI בנויים",
              "תגובה ממוצעת 48 שעות",
              "מבוססת בישראל",
            ].map((item) => (
              <span key={item} style={{
                fontSize: "0.78rem", color: "var(--muted)",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                <span style={{ color: "var(--cyan)", fontWeight: 700 }}>✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Left — automation network */}
        <div className="hero-line hero-flow-col">
          <AutomationTree />
        </div>
      </div>

      {/* Responsive CSS moved to globals.css */}
    </section>
  );
}
