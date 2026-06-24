"use client";

import { useRef, useEffect } from "react";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

/* ─── Per-project visual themes for mockup previews ─── */
const THEMES: Record<string, {
  bg: string; nav: string; navText: string;
  hero: string; heroText: string; accent: string; accentText: string;
  blocks: string[]; textLines: string;
}> = {
  "My Money": {
    bg: "#0b1628", nav: "#0f1e38", navText: "rgba(255,255,255,0.5)",
    hero: "#0f1e38", heroText: "rgba(255,255,255,0.9)",
    accent: "#3b82f6", accentText: "#fff",
    blocks: ["#1e3a5f", "#162d50", "#1a3360"], textLines: "rgba(255,255,255,0.2)",
  },
  "Lilach Hazan": {
    bg: "#faf8f5", nav: "#ffffff", navText: "rgba(30,20,60,0.5)",
    hero: "#f3eff9", heroText: "#1e143c",
    accent: "#8b5cf6", accentText: "#fff",
    blocks: ["#ede8f8", "#e8e2f5", "#f0ecfb"], textLines: "rgba(30,20,60,0.12)",
  },
  "Rox": {
    bg: "#080a0c", nav: "#0f1214", navText: "rgba(255,255,255,0.35)",
    hero: "#0f1214", heroText: "rgba(255,255,255,0.95)",
    accent: "#d4af37", accentText: "#0a0a0a",
    blocks: ["#161a1e", "#1a1e22", "#141820"], textLines: "rgba(255,255,255,0.08)",
  },
  "Solis": {
    bg: "#1c1108", nav: "#241609", navText: "rgba(255,230,180,0.5)",
    hero: "#241609", heroText: "#fde8b0",
    accent: "#f2622e", accentText: "#fff",
    blocks: ["#2e1c0e", "#351f0e", "#2a1a0c"], textLines: "rgba(255,200,120,0.15)",
  },
};

function SiteMockup({ title, url }: { title: string; url: string }) {
  const theme = THEMES[title] ?? {
    bg: "#141009", nav: "#1d160e", navText: "rgba(255,255,255,0.4)",
    hero: "#1d160e", heroText: "rgba(255,255,255,0.9)",
    accent: "#f2622e", accentText: "#fff",
    blocks: ["#28200f", "#231b0d", "#2e2410"], textLines: "rgba(255,255,255,0.1)",
  };
  const domain = url.replace("https://", "").replace(/\/$/, "");
  const isLight = theme.bg.startsWith("#f") || theme.bg.startsWith("#e");

  return (
    <div
      className="site-mockup"
      style={{
        width: 380,
        background: theme.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Nav bar ── */}
      <div style={{
        background: theme.nav,
        padding: "10px 14px",
        display: "flex", alignItems: "center", gap: 8,
        borderBottom: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
      }}>
        {/* Logo dot */}
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: theme.accent, flexShrink: 0 }} />
        {/* Name */}
        <div style={{ width: 70, height: 8, borderRadius: 3, background: theme.navText }} />
        <div style={{ flex: 1 }} />
        {/* Nav links */}
        {[40, 32, 36].map((w, i) => (
          <div key={i} style={{ width: w, height: 6, borderRadius: 3, background: theme.navText }} />
        ))}
        {/* CTA button */}
        <div style={{ width: 56, height: 24, borderRadius: 999, background: theme.accent }} />
      </div>

      {/* ── Hero ── */}
      <div style={{
        background: theme.hero,
        padding: "22px 16px 20px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Accent glow */}
        <div style={{
          position: "absolute", top: -40, right: -40, width: 150, height: 150,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accent}30, transparent 70%)`,
          pointerEvents: "none",
        }} />
        {/* Kicker */}
        <div style={{ width: 60, height: 6, borderRadius: 3, background: theme.accent, marginBottom: 10 }} />
        {/* H1 */}
        <div style={{ width: "82%", height: 18, borderRadius: 4, background: theme.heroText, marginBottom: 6, opacity: 0.9 }} />
        <div style={{ width: "68%", height: 18, borderRadius: 4, background: theme.heroText, marginBottom: 14, opacity: 0.9 }} />
        {/* Sub */}
        <div style={{ width: "90%", height: 7, borderRadius: 3, background: theme.textLines, marginBottom: 5 }} />
        <div style={{ width: "75%", height: 7, borderRadius: 3, background: theme.textLines, marginBottom: 18 }} />
        {/* CTAs */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 90, height: 28, borderRadius: 999, background: theme.accent }} />
          <div style={{ width: 72, height: 28, borderRadius: 999, border: `1.5px solid ${theme.accent}`, background: "transparent" }} />
        </div>
      </div>

      {/* ── Feature strip ── */}
      <div style={{
        padding: "16px 14px",
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8,
      }}>
        {theme.blocks.map((bg, i) => (
          <div key={i} style={{ background: bg, borderRadius: 10, padding: "10px 10px 12px" }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: theme.accent, marginBottom: 8, opacity: 0.85 }} />
            <div style={{ width: "80%", height: 6, borderRadius: 3, background: theme.textLines, marginBottom: 5 }} />
            <div style={{ width: "60%", height: 6, borderRadius: 3, background: theme.textLines }} />
          </div>
        ))}
      </div>

      {/* ── Content section ── */}
      <div style={{ padding: "6px 14px 14px" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {/* Image placeholder */}
          <div style={{
            width: 130, height: 100, borderRadius: 10, flexShrink: 0,
            background: `linear-gradient(135deg, ${theme.blocks[0]}, ${theme.accent}30)`,
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ width: "90%", height: 11, borderRadius: 3, background: theme.textLines, marginBottom: 8, opacity: 0.7 }} />
            {[90, 75, 80, 60].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 6, borderRadius: 3, background: theme.textLines, marginBottom: 5 }} />
            ))}
            <div style={{ width: 70, height: 24, borderRadius: 999, background: theme.accent, marginTop: 10 }} />
          </div>
        </div>
      </div>

      {/* ── Card grid ── */}
      <div style={{ padding: "8px 14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ background: theme.blocks[i % 3], borderRadius: 10, padding: "12px 10px" }}>
            <div style={{
              width: "100%", height: 56, borderRadius: 7, marginBottom: 8,
              background: `linear-gradient(135deg, ${theme.accent}22, ${theme.accent}08)`,
            }} />
            <div style={{ width: "75%", height: 7, borderRadius: 3, background: theme.textLines, marginBottom: 5 }} />
            <div style={{ width: "55%", height: 7, borderRadius: 3, background: theme.textLines }} />
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div style={{
        background: isLight ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.3)",
        padding: "12px 14px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
      }}>
        <div style={{ width: 60, height: 7, borderRadius: 3, background: theme.textLines }} />
        <div style={{ display: "flex", gap: 6 }}>
          {[24, 32, 24].map((w, i) => (
            <div key={i} style={{ width: w, height: 7, borderRadius: 3, background: theme.textLines }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main gallery ─── */
export default function WorkGrid() {
  const { lang } = useLang();
  const t = dict[lang];
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisOffRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const sec = pinRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;

    const CARD_W = 380;
    const GAP = 26;
    const PAD = Math.max(24, Math.min(window.innerWidth * 0.05, 72));
    const N = t.projects.length;
    // Compute how far the track overflows the viewport
    const trackTotalW = PAD + N * CARD_W + (N - 1) * GAP + PAD;
    const dist = Math.max(trackTotalW - window.innerWidth, 0);
    // Give 3× the dist in scroll space so motion feels comfortable
    const scrollH = dist * 3;
    sec.style.height = `${window.innerHeight + scrollH}px`;

    // applyProgress: called every Lenis scroll tick with current scroll Y
    const applyProgress = ({ scroll }: { scroll: number }) => {
      const sectionTop = sec.getBoundingClientRect().top + scroll; // abs top
      const scrolled = scroll - sectionTop;          // how far into section
      const progress = Math.max(0, Math.min(1, scrolled / scrollH));
      track.style.transform = `translateX(${-progress * dist}px)`;
    };

    const bindLenis = (lenis: any) => {
      lenis.on("scroll", applyProgress);
      lenisOffRef.current = () => lenis.off("scroll", applyProgress);
    };

    const existing = (window as any).__lenis;
    if (existing) {
      bindLenis(existing);
    } else {
      const handler = (e: Event) => bindLenis((e as CustomEvent).detail);
      window.addEventListener("lenis:ready", handler, { once: true });
      lenisOffRef.current = () => window.removeEventListener("lenis:ready", handler);
    }

    const onResize = () => {
      const newPad = Math.max(24, Math.min(window.innerWidth * 0.05, 72));
      const newTrackW = newPad + N * CARD_W + (N - 1) * GAP + newPad;
      const newDist = Math.max(newTrackW - window.innerWidth, 0);
      const newScrollH = newDist * 3;
      sec.style.height = `${window.innerHeight + newScrollH}px`;
    };
    window.addEventListener("resize", onResize);

    return () => {
      lenisOffRef.current?.();
      window.removeEventListener("resize", onResize);
      sec.style.height = "";
    };
  }, [lang, t.projects.length]);

  const enterLabel = lang === "he" ? "כניסה לאתר" : "Visit site";

  return (
    <>
      {/* Work intro */}
      <section
        id="work"
        style={{
          position: "relative", zIndex: 1,
          maxWidth: 1320, margin: "0 auto",
          padding: "clamp(72px,9vw,128px) 24px clamp(28px,4vw,44px)",
          opacity: 0, transform: "translateY(28px)",
          transition: "opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)",
        }}
        ref={(el) => {
          if (!el) return;
          const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              el.style.opacity = "1"; el.style.transform = "none"; io.disconnect();
            }
          }, { threshold: 0.1 });
          io.observe(el);
        }}
      >
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>
          {t.workKicker}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,4.4vw,58px)", lineHeight: 1.04, letterSpacing: "-0.03em", fontFamily: "'Heebo', sans-serif" }}>
            {t.workTitle}
          </h2>
          <p style={{ margin: 0, color: "var(--muted2)", fontSize: 17, lineHeight: 1.6, maxWidth: "36ch", fontFamily: "'Heebo', sans-serif" }}>
            {t.workSub}
          </p>
        </div>
      </section>

      {/* ── Pinned horizontal gallery ── */}
      <section
        ref={pinRef}
        aria-label="Project gallery"
        style={{ position: "relative", zIndex: 1, background: "var(--dark)" }}
      >
        <div style={{
          position: "sticky", top: 0, height: "100vh", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          {/* Glow */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, insetInlineEnd: -120,
            width: 560, height: 560,
            background: "radial-gradient(circle, color-mix(in oklch, var(--acc) 22%, transparent), transparent 65%)",
            filter: "blur(48px)", pointerEvents: "none",
          }} />

          {/* Header */}
          <div style={{
            position: "relative", display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", gap: 24,
            padding: "0 clamp(24px,5vw,72px)", marginBottom: 28, flexWrap: "wrap",
          }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 12 }}>
                {t.galleryKicker}
              </div>
              <h2 style={{
                margin: 0, color: "var(--dtext)", fontWeight: 800,
                fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1.04,
                letterSpacing: "-0.03em", fontFamily: "'Heebo', sans-serif",
              }}>{t.galleryTitle}</h2>
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: "var(--dmuted)", display: "flex", alignItems: "center", gap: 10,
            }}>
              {t.scrollHint} <span style={{ color: "var(--acc)" }}>{t.scrollArrow}</span>
            </div>
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            style={{
              display: "flex", gap: 26,
              padding: "0 clamp(24px,5vw,72px)",
              direction: "ltr", willChange: "transform",
            }}
          >
            {t.projects.map((project) => (
              <article
                key={project.title}
                style={{
                  width: 380, flexShrink: 0,
                  background: "var(--dpanel)",
                  borderRadius: 20,
                  border: "1px solid var(--dline)",
                  overflow: "hidden",
                  transition: "border-color .3s, transform .35s cubic-bezier(.2,.7,.2,1)",
                  direction: t.dir,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "color-mix(in oklch, var(--acc) 55%, var(--dline))";
                  el.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--dline)";
                  el.style.transform = "";
                }}
              >
                {/* ── Preview window ── */}
                <div style={{ height: 240, position: "relative", overflow: "hidden", background: "#080a0c" }}>
                  {/* Browser chrome */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 30, zIndex: 10,
                    background: "rgba(10,8,6,0.94)", backdropFilter: "blur(6px)",
                    display: "flex", alignItems: "center", gap: 5, padding: "0 10px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
                    </div>
                    <div style={{
                      flex: 1, height: 17, marginLeft: 6,
                      background: "rgba(255,255,255,0.06)", borderRadius: 3,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
                        {project.url.replace("https://", "").replace(/\/$/, "")}
                      </span>
                    </div>
                  </div>

                  {/* Auto-scroll mockup */}
                  <div
                    className="site-mockup-anim"
                    style={{
                      position: "absolute", top: 30, left: 0, right: 0,
                      pointerEvents: "none",
                    }}
                  >
                    <SiteMockup title={project.title} url={project.url} />
                  </div>

                  {/* Bottom gradient */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 80, zIndex: 5,
                    background: "linear-gradient(to top, var(--dpanel) 15%, transparent)",
                    pointerEvents: "none",
                  }} />

                  {/* Visit link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position: "absolute", bottom: 12, insetInlineEnd: 12, zIndex: 6,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12, fontWeight: 700, color: "var(--dtext)",
                      background: "rgba(10,8,6,0.9)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999,
                      padding: "8px 14px", textDecoration: "none",
                      display: "inline-flex", alignItems: "center", gap: 5,
                      transition: "background .2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--acc)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(10,8,6,0.9)"; }}
                  >
                    {enterLabel} <span style={{ fontSize: 13 }}>{t.scrollArrow}</span>
                  </a>
                </div>

                {/* Card body */}
                <div style={{ padding: "20px 22px 24px" }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, letterSpacing: ".08em", color: "var(--acc)",
                    marginBottom: 6, textTransform: "uppercase",
                  }}>{project.kind}</div>
                  <h3 style={{
                    margin: "0 0 8px", color: "var(--dtext)", fontWeight: 800,
                    fontSize: 21, letterSpacing: "-0.01em", fontFamily: "'Heebo', sans-serif",
                  }}>{project.title}</h3>
                  <p style={{
                    margin: "0 0 14px", color: "var(--dmuted)",
                    fontSize: 14, lineHeight: 1.65, fontFamily: "'Heebo', sans-serif",
                  }}>{project.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11, letterSpacing: ".03em", color: "var(--acc2)",
                        border: "1px solid color-mix(in oklch, var(--acc) 28%, var(--dline))",
                        padding: "4px 10px", borderRadius: 999,
                        background: "color-mix(in oklch, var(--acc) 7%, transparent)",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
