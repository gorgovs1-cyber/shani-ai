"use client";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "2rem clamp(1.5rem, 5vw, 4rem)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "1rem",
    }}>
      <span style={{
        fontFamily: "var(--font-syne)", fontSize: "0.9rem",
        fontWeight: 700, color: "var(--white)",
      }}>
        Shani<span style={{ color: "var(--purple)" }}> AI</span> Creator
      </span>

      <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
        © {new Date().getFullYear()} Shani Gorgov. כל הזכויות שמורות.
      </span>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        {["Instagram", "LinkedIn", "WhatsApp"].map(s => (
          <a key={s} href="#" style={{
            fontSize: "0.72rem", color: "var(--muted)", textDecoration: "none",
            transition: "color 0.2s ease",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--purple)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >{s}</a>
        ))}
      </div>
    </footer>
  );
}
