"use client";

import { useRef, useEffect } from "react";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function WorkGrid() {
  const { lang } = useLang();
  const t = dict[lang];
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = pinRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;

    let dist = 0;
    let rafId = 0;
    let lastScroll = -1;

    const computeLayout = () => {
      const pad = 0;
      dist = Math.max(track.scrollWidth - window.innerWidth + pad, 0);
      sec.style.height = (window.innerHeight + dist) + "px";
    };

    const applyScroll = () => {
      if (!sec || !track) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY === lastScroll) return;
      lastScroll = scrollY;

      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      if (total > 0) {
        const prog = Math.min(Math.max(-rect.top / total, 0), 1);
        const sign = lang === "he" ? 1 : -1;
        track.style.transform = `translateX(${sign * prog * dist}px)`;
      } else {
        track.style.transform = "translateX(0)";
      }
    };

    // RAF loop — works with Lenis (which updates scrollY each frame via GSAP ticker)
    const loop = () => {
      applyScroll();
      rafId = requestAnimationFrame(loop);
    };

    const onResize = () => {
      computeLayout();
      applyScroll();
    };

    computeLayout();
    applyScroll();
    rafId = requestAnimationFrame(loop);

    window.addEventListener("resize", onResize);
    // Extra settle passes for fonts/images
    const t1 = setTimeout(() => { computeLayout(); }, 500);
    const t2 = setTimeout(() => { computeLayout(); }, 1500);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [lang]);

  const enterLabel = lang === "he" ? "כניסה לאתר" : "Visit site";

  return (
    <>
      {/* Work intro — light section */}
      <section
        id="work"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(72px,9vw,128px) 24px clamp(28px,4vw,44px)",
          opacity: 0,
          transform: "translateY(28px)",
          transition: "opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)",
        }}
        ref={(el) => {
          if (!el) return;
          const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              el.style.opacity = "1";
              el.style.transform = "none";
              io.disconnect();
            }
          }, { threshold: 0.1 });
          io.observe(el);
        }}
      >
        <div style={{
          fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
          fontSize: 13,
          letterSpacing: ".2em",
          color: "var(--acc)",
          marginBottom: 16,
        }}>
          {t.workKicker}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <h2 style={{
            margin: 0,
            fontWeight: 800,
            fontSize: "clamp(34px,4.4vw,58px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}>
            {t.workTitle}
          </h2>
          <p style={{ margin: 0, color: "var(--muted2)", fontSize: 17, lineHeight: 1.6, maxWidth: "36ch", fontFamily: "'Heebo', var(--font-heebo), sans-serif" }}>
            {t.workSub}
          </p>
        </div>
      </section>

      {/* Pinned horizontal gallery */}
      <section
        ref={pinRef}
        aria-label="Project gallery"
        style={{ position: "relative", zIndex: 1, background: "var(--dark)" }}
      >
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          {/* Ambient glow */}
          <div aria-hidden="true" style={{
            position: "absolute",
            top: 0,
            insetInlineEnd: -120,
            width: 560,
            height: 560,
            background: "radial-gradient(circle, color-mix(in oklch, var(--acc) 30%, transparent), transparent 65%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }} />

          {/* Header */}
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            padding: "0 clamp(24px,5vw,72px)",
            marginBottom: 34,
            flexWrap: "wrap",
          }}>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                fontSize: 13,
                letterSpacing: ".2em",
                color: "var(--acc)",
                marginBottom: 12,
              }}>{t.galleryKicker}</div>
              <h2 style={{
                margin: 0,
                color: "var(--dtext)",
                fontWeight: 800,
                fontSize: "clamp(28px,3.4vw,46px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}>{t.galleryTitle}</h2>
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
              fontSize: 12,
              color: "var(--dmuted)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              {t.scrollHint} <span style={{ color: "var(--acc)" }}>{t.scrollArrow}</span>
            </div>
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: 26,
              padding: "4px clamp(24px,5vw,72px)",
              direction: "ltr",
              willChange: "transform",
              position: "relative",
            }}
          >
            {t.projects.map((project) => (
              <article
                key={project.title}
                style={{
                  width: 380,
                  flexShrink: 0,
                  background: "var(--dpanel)",
                  borderRadius: 24,
                  border: "1px solid var(--dline)",
                  overflow: "hidden",
                  transition: "border-color .3s",
                  direction: t.dir,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklch, var(--acc) 45%, var(--dline))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--dline)";
                }}
              >
                {/* Preview — static thumbnail of site top */}
                <div style={{
                  height: 220,
                  overflow: "hidden",
                  position: "relative",
                  background: "#0a0806",
                }}>
                  <iframe
                    src={project.url}
                    title={`${project.title} preview`}
                    loading="lazy"
                    style={{
                      width: 1280,
                      height: 740,
                      transform: "scale(0.297)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                      border: "none",
                    }}
                  />
                  {/* Kind chip */}
                  <div style={{
                    position: "absolute",
                    top: 14,
                    insetInlineStart: 14,
                    fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                    fontSize: 11,
                    color: "var(--acc2)",
                    background: "rgba(12,10,8,0.85)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid var(--dline)",
                    borderRadius: 999,
                    padding: "6px 12px",
                    letterSpacing: ".04em",
                    fontWeight: 700,
                  }}>{project.kind}</div>
                  {/* Bottom scrim */}
                  <div style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: 60,
                    background: "linear-gradient(to top, var(--dpanel), transparent)",
                    pointerEvents: "none",
                  }} />
                  {/* Visit link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${enterLabel} — ${project.title}`}
                    style={{
                      position: "absolute",
                      bottom: 12,
                      insetInlineEnd: 12,
                      fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--dtext)",
                      background: "rgba(12,10,8,0.85)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid var(--dline)",
                      borderRadius: 999,
                      padding: "8px 14px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--acc)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(12,10,8,0.85)"; }}
                  >
                    {enterLabel} <span>{t.scrollArrow}</span>
                  </a>
                </div>

                {/* Card body */}
                <div style={{ padding: "22px 24px 26px" }}>
                  <h3 style={{
                    margin: "0 0 8px",
                    color: "var(--dtext)",
                    fontWeight: 800,
                    fontSize: 22,
                    letterSpacing: "-0.01em",
                    fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                  }}>{project.title}</h3>
                  <p style={{
                    margin: "0 0 16px",
                    color: "var(--dmuted)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                  }}>{project.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                        fontSize: 11,
                        letterSpacing: ".03em",
                        color: "var(--acc2)",
                        border: "1px solid color-mix(in oklch, var(--acc) 30%, var(--dline))",
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: "color-mix(in oklch, var(--acc) 8%, transparent)",
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
