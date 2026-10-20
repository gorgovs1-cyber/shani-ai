"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";
import Magnetic from "@/components/Magnetic";
import { dict } from "@/lib/translations";
import { waLink } from "@/lib/whatsapp";
export default function Hero() {
  const { lang } = useLang(); const L = useLang().href;
  const t = dict[lang];
  const portraitRef = useRef<HTMLDivElement>(null);
  /** On touch, mouseenter fires on tap and mouseleave never follows, so the
      inline hover styles below would stick to the last-tapped pill/CTA. */
  const [hoverable, setHoverable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHoverable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Parallax on hero portrait
  useEffect(() => {
    const onScroll = () => {
      if (!portraitRef.current) return;
      const y = Math.min(window.scrollY, 600) * 0.05;
      portraitRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="top"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "26px 24px 26px",
      }}
    >
      {/* Dark panel */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          background: "var(--dark)",
          ...({ "--acc": "var(--acc-bright)" } as React.CSSProperties),
          borderRadius: 30,
          overflow: "hidden",
          border: "1px solid var(--dline)",
          boxShadow: "0 50px 120px -50px rgba(20,16,9,.55)",
        }}
      >
        {/* Orange glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -120,
            insetInlineStart: -80,
            width: 520,
            height: 520,
            background: "radial-gradient(circle, color-mix(in oklch, var(--acc) 42%, transparent), transparent 65%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />
        {/* Grid overlay */}
        <div
          aria-hidden="true"
          className="hero-grid-overlay"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(var(--dline) 1px, transparent 1px), linear-gradient(90deg, var(--dline) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(circle at 70% 30%, #000, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle at 70% 30%, #000, transparent 78%)",
            pointerEvents: "none",
          }}
        />

        {/* 2-col grid */}
        <div
          className="hero-grid"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1.12fr 0.88fr",
            gap: 44,
            padding: "clamp(44px,5vw,80px)",
            alignItems: "center",
          }}
        >
          {/* Left: content */}
          <div className="hero-copy" style={{ animation: "scl-fadeup 0.8s ease 0.1s both" }}>
            {/* H1 */}
            <h1
              style={{
                margin: 0,
                color: "var(--dtext)",
                fontWeight: 800,
                fontSize: "clamp(32px, 4.2vw, 62px)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                textWrap: "balance" as any,
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
            >
              {t.heroTitle}
            </h1>

            {/* Sub */}
            <p
              style={{
                margin: "30px 0 0",
                color: "var(--dmuted)",
                fontSize: "clamp(18px, 1.5vw, 20px)",
                lineHeight: 1.62,
                maxWidth: "44ch",
                fontWeight: 400,
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
            >
              {t.heroSub}
            </p>

            {/* CTAs — primary: free AI audit (lead funnel), secondary: view work */}
            <div
              className="hero-cta-row"
              style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap", gap: 14, marginTop: 40 }}
            >
              {/* Primary: Free AI Audit */}
              <Magnetic>
              <a
                href={L("/audit")}
                className="hero-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  background: "var(--acc-bright)",
                  color: "var(--ink)",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "17px 30px",
                  borderRadius: 12,
                  transition: "transform var(--t-fast), box-shadow var(--t-fast)",
                  boxShadow: "0 18px 40px -16px var(--acc)",
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!hoverable) return;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 26px 52px -16px var(--acc)";
                }}
                onMouseLeave={(e) => {
                  if (!hoverable) return;
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 18px 40px -16px var(--acc)";
                }}
              >
                {lang === "he" ? "בדיקת התאמה חינם" : "Free fit check"}
              </a>
              </Magnetic>
              <a href={waLink(lang)} target="_blank" rel="noopener noreferrer" className="hero-work-link">{lang === "he" ? "דברו איתי בוואטסאפ" : "Message me on WhatsApp"}</a>
            </div>

            {/* Numbers row: only figures the owner can stand behind */}
            <div
              className="hero-meta-row"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px 36px",
                marginTop: 42,
                flexWrap: "wrap",
              }}
            >
              {t.heroStats.map((s) => (
                <div key={s.l} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', var(--font-mono), monospace", fontSize: 28, fontWeight: 700, lineHeight: 1.1, color: "var(--acc-bright)" }}>{s.n}</span>
                  <span style={{ fontFamily: "'Heebo', var(--font-heebo), sans-serif", fontSize: 15, color: "var(--dmuted)" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: portrait card */}
          <div
            ref={portraitRef}
            className="portrait"
            style={{ position: "relative", animation: "scl-fadeup 0.8s ease 0.2s both" }}
          >
            {/* Glow behind card */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-6% 8% 8% -6%",
                background: "linear-gradient(140deg, var(--acc), transparent 70%)",
                borderRadius: 26,
                filter: "blur(10px)",
                opacity: 0.5,
                pointerEvents: "none",
              }}
            />
            {/* Card */}
            <div
              style={{
                position: "relative",
                borderRadius: 22,
                overflow: "hidden",
                border: "1px solid var(--dline)",
                boxShadow: "0 30px 70px -30px rgba(0,0,0,.6)",
              }}
            >
              <Image
                src="/portrait.webp"
                alt="Shani Gorgov — SHANI AI CREATOR"
                width={1448}
                height={1086}
                priority
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {/* Bottom scrim */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(20,16,9,0.5), transparent 38%)",
                  pointerEvents: "none",
                }}
              />
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
