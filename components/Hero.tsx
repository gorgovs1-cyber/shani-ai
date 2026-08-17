"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";
import Magnetic from "@/components/Magnetic";
import { dict } from "@/lib/translations";
export default function Hero() {
  const { lang } = useLang();
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

            {/* CTAs — primary: free AI audit (lead funnel), secondary: view work */}
            <div
              className="hero-cta-row"
              style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40 }}
            >
              {/* Primary: Free AI Audit */}
              <Magnetic>
              <a
                href="/audit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                {lang === "he" ? "אבחון חינם לעסק שלכם" : "A free audit for your business"}
              </a>
              </Magnetic>
            </div>

            {/* Triage — three doors in.
                The hero sells one outcome, but the business sells three services.
                Rather than flattening them into the headline (which is what made
                the old H1 say nothing), the visitor self-selects here and lands
                on the page that matches their actual problem. */}
            <div style={{ marginTop: 34 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                  fontSize: 12,
                  letterSpacing: ".16em",
                  color: "var(--dmuted)",
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                {t.triageTitle}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {t.triage.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      minHeight: 44,
                      // Without this an inline-flex pill sizes to its text and
                      // pushes past the panel on a 360px screen — the English
                      // labels ("I want a site that brings enquiries") are long
                      // enough to overflow. maxWidth lets the label wrap inside.
                      maxWidth: "100%",
                      padding: "11px 18px",
                      borderRadius: 999,
                      border: "1px solid var(--dline)",
                      background: "rgba(244,237,225,0.05)",
                      color: "var(--dtext)",
                      textDecoration: "none",
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                      transition: "background .12s ease, border-color .12s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!hoverable) return;
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "color-mix(in oklch, var(--acc) 18%, transparent)";
                      el.style.borderColor = "color-mix(in oklch, var(--acc) 55%, var(--dline))";
                    }}
                    onMouseLeave={(e) => {
                      if (!hoverable) return;
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(244,237,225,0.05)";
                      el.style.borderColor = "var(--dline)";
                    }}
                  >
                    {item.label}
                    <span aria-hidden="true" style={{ color: "var(--acc)" }}>
                      {lang === "he" ? "←" : "→"}
                    </span>
                  </a>
                ))}
              </div>
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
