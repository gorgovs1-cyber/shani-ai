"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
export default function Hero() {
  const { lang } = useLang();
  const t = dict[lang];
  const portraitRef = useRef<HTMLDivElement>(null);

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
        padding: "26px 24px 0",
      }}
    >
      {/* Dark panel */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          position: "relative",
          background: "var(--dark)",
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
          <div style={{ animation: "scl-fadeup 0.8s ease 0.1s both" }}>
            {/* Role badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "color-mix(in oklch, var(--acc) 16%, transparent)",
                border: "1px solid color-mix(in oklch, var(--acc) 40%, transparent)",
                color: "var(--acc2)",
                padding: "8px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 28,
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                letterSpacing: ".02em",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--acc)",
                  boxShadow: "0 0 10px var(--acc)",
                  display: "inline-block",
                }}
              />
              {t.role}
            </div>

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
                fontSize: "clamp(17px, 1.5vw, 21px)",
                lineHeight: 1.62,
                maxWidth: "44ch",
                fontWeight: 400,
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
            >
              {t.heroSub}
            </p>

            {/* CTAs */}
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40 }}
            >
              <a
                href="#work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: "var(--acc)",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "17px 30px",
                  borderRadius: 14,
                  transition: "transform .2s, box-shadow .2s",
                  boxShadow: "0 18px 40px -16px var(--acc)",
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 26px 52px -16px var(--acc)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 18px 40px -16px var(--acc)";
                }}
              >
                {t.heroCta1}
              </a>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: "rgba(244,237,225,0.05)",
                  color: "var(--dtext)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 16,
                  padding: "17px 28px",
                  borderRadius: 14,
                  border: "1px solid var(--dline)",
                  transition: "border-color .2s, background .2s",
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--dmuted)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(244,237,225,0.09)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--dline)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(244,237,225,0.05)";
                }}
              >
                {t.heroCta2}
              </a>
            </div>

            {/* AI Audit mini-CTA */}
            <div style={{ marginTop: 18, fontSize: 14, color: "var(--dmuted)", fontFamily: "'Heebo', var(--font-heebo), sans-serif" }}>
              {t.auditCtaPrefix}{" "}
              <a href="#contact" style={{ color: "var(--acc)", textDecoration: "underline", textUnderlineOffset: 3, fontWeight: 600 }}>
                {t.auditCtaLink}
              </a>
            </div>

            {/* Meta row */}
            <div
              className="hero-meta-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginTop: 42,
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: ".03em",
                color: "var(--dmuted)",
                flexWrap: "wrap",
              }}
            >
              <span>{t.meta1}</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span>{t.meta2}</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span>{t.meta3}</span>
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
                src="/portrait.png"
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
