"use client";

import Link from "next/link";

export default function NextProjectLink({
  slug, title,
}: {
  slug: string;
  title: string;
}) {
  return (
    <Link
      href={`/work/${slug}`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "3rem clamp(1.5rem, 5vw, 5rem)",
        textDecoration: "none",
        transition: "background 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--signal-soft)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      <div>
        <div className="label" style={{ color: "var(--mist)", marginBottom: "0.5rem" }}>
          הפרויקט הבא
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--cream)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </span>
      </div>
      <span style={{ color: "var(--signal)", fontSize: "2rem" }}>←</span>
    </Link>
  );
}
