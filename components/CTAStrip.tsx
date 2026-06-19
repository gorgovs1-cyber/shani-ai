"use client";

export default function CTAStrip({ text = "רוצה לדעת מה AI יכול לעשות לעסק שלך?" }: { text?: string }) {
  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "2rem clamp(1.5rem, 5vw, 4rem)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "2rem",
      flexWrap: "wrap",
      background: "rgba(139,92,246,0.04)",
    }} dir="rtl">
      <p style={{
        fontFamily: "var(--font-syne)",
        fontSize: "clamp(1rem, 2vw, 1.3rem)",
        fontWeight: 600,
        color: "var(--white)",
        margin: 0,
      }}>
        {text}
      </p>
      <a
        href="https://wa.me/972504744815"
        className="btn-grad"
        style={{ padding: "0.8rem 1.75rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}
      >
        בדיקת AI ללא עלות ←
      </a>
    </div>
  );
}
