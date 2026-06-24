"use client";

import { useRef, useEffect } from "react";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function WorkGrid() {
  const { lang } = useLang();
  const t = dict[lang];
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<any>(null);

  useEffect(() => {
    const sec = pinRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;

    let killed = false;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Let layout settle
      await new Promise((r) => setTimeout(r, 500));
      if (killed) return;

      const computeAndBind = () => {
        stRef.current?.kill();
        const dist = Math.max(track.scrollWidth - window.innerWidth, 0);
        sec.style.height = window.innerHeight + dist + "px";
        const sign = lang === "he" ? 1 : -1;

        stRef.current = ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: `+=${dist}`,
          scrub: 0.1,
          onUpdate: (self: any) => {
            track.style.transform = `translateX(${sign * self.progress * dist}px)`;
          },
        });
      };

      computeAndBind();

      const onResize = () => {
        computeAndBind();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      setTimeout(() => { computeAndBind(); ScrollTrigger.refresh(); }, 1200);

      return () => window.removeEventListener("resize", onResize);
    };

    init();

    return () => {
      killed = true;
      stRef.current?.kill();
      if (sec) sec.style.height = "";
    };
  }, [lang]);

  const enterLabel = lang === "he" ? "כניסה לאתר" : "Visit site";

  return (
    <>
      {/* Work intro */}
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
          fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16,
        }}>
          {t.workKicker}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <h2 style={{
            margin: 0, fontWeight: 800, fontSize: "clamp(34px,4.4vw,58px)",
            lineHeight: 1.04, letterSpacing: "-0.03em",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}>{t.workTitle}</h2>
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
          position: "sticky", top: 0, height: "100vh", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          {/* Glow */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, insetInlineEnd: -120,
            width: 560, height: 560,
            background: "radial-gradient(circle, color-mix(in oklch, var(--acc) 28%, transparent), transparent 65%)",
            filter: "blur(40px)", pointerEvents: "none",
          }} />

          {/* Header */}
          <div style={{
            position: "relative", display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", gap: 24,
            padding: "0 clamp(24px,5vw,72px)", marginBottom: 34, flexWrap: "wrap",
          }}>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 12,
              }}>{t.galleryKicker}</div>
              <h2 style={{
                margin: 0, color: "var(--dtext)", fontWeight: 800,
                fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1.04,
                letterSpacing: "-0.03em", fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}>{t.galleryTitle}</h2>
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
              fontSize: 12, color: "var(--dmuted)", display: "flex", alignItems: "center", gap: 10,
            }}>
              {t.scrollHint} <span style={{ color: "var(--acc)" }}>{t.scrollArrow}</span>
            </div>
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            style={{
              display: "flex", gap: 26,
              padding: "4px clamp(24px,5vw,72px)",
              direction: "ltr", willChange: "transform", position: "relative",
            }}
          >
            {t.projects.map((project, i) => (
              <article
                key={project.title}
                style={{
                  width: 380, flexShrink: 0, background: "var(--dpanel)",
                  borderRadius: 24, border: "1px solid var(--dline)",
                  overflow: "hidden", transition: "border-color .3s, transform .3s",
                  direction: t.dir,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "color-mix(in oklch, var(--acc) 50%, var(--dline))";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--dline)";
                  el.style.transform = "";
                }}
              >
                {/* Live iframe preview with auto-scroll */}
                <div style={{
                  height: 220, position: "relative",
                  background: "#0a0805", overflow: "hidden",
                }}>
                  {/* Browser chrome */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: 28, background: "rgba(12,10,8,0.92)",
                    display: "flex", alignItems: "center", gap: 6, padding: "0 10px",
                    zIndex: 3, borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57" }} />
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#febc2e" }} />
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840" }} />
                    </div>
                    <div style={{
                      flex: 1, height: 16, marginLeft: 6,
                      background: "rgba(255,255,255,0.07)", borderRadius: 3,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>
                        {project.url.replace("https://", "").replace(/\/$/, "")}
                      </span>
                    </div>
                  </div>

                  {/* Iframe with auto-scroll animation */}
                  <div
                    className={`preview-scroll preview-scroll-${i % 3}`}
                    style={{
                      position: "absolute",
                      top: 28,
                      left: 0,
                      width: 1280,
                      transformOrigin: "top left",
                      transform: "scale(0.2969)",
                      pointerEvents: "none",
                    }}
                  >
                    <iframe
                      src={project.url}
                      width={1280}
                      height={2600}
                      scrolling="no"
                      style={{
                        border: "none",
                        display: "block",
                        pointerEvents: "none",
                      }}
                      title={`Preview of ${project.title}`}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>

                  {/* Bottom gradient scrim */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 72,
                    background: "linear-gradient(to top, var(--dpanel) 0%, transparent 100%)",
                    pointerEvents: "none", zIndex: 2,
                  }} />

                  {/* Kind chip */}
                  <div style={{
                    position: "absolute", top: 38, insetInlineStart: 10, zIndex: 4,
                    fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                    fontSize: 11, color: "var(--acc2)",
                    background: "rgba(12,10,8,0.88)", backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid var(--dline)", borderRadius: 999,
                    padding: "5px 10px", letterSpacing: ".04em", fontWeight: 700,
                  }}>{project.kind}</div>

                  {/* Visit link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${enterLabel} — ${project.title}`}
                    style={{
                      position: "absolute", bottom: 10, insetInlineEnd: 10, zIndex: 4,
                      fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                      fontSize: 12, fontWeight: 700, color: "var(--dtext)",
                      background: "rgba(12,10,8,0.88)", backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid var(--dline)", borderRadius: 999,
                      padding: "7px 13px", textDecoration: "none",
                      display: "inline-flex", alignItems: "center", gap: 5,
                      transition: "background .2s, color .2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--acc)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(12,10,8,0.88)"; }}
                  >
                    {enterLabel} <span style={{ fontSize: 14 }}>{t.scrollArrow}</span>
                  </a>
                </div>

                {/* Card body */}
                <div style={{ padding: "20px 22px 24px" }}>
                  <h3 style={{
                    margin: "0 0 7px", color: "var(--dtext)", fontWeight: 800,
                    fontSize: 21, letterSpacing: "-0.01em",
                    fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                  }}>{project.title}</h3>
                  <p style={{
                    margin: "0 0 14px", color: "var(--dmuted)",
                    fontSize: 14, lineHeight: 1.6,
                    fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                  }}>{project.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                        fontSize: 11, letterSpacing: ".03em", color: "var(--acc2)",
                        border: "1px solid color-mix(in oklch, var(--acc) 30%, var(--dline))",
                        padding: "4px 10px", borderRadius: 999,
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
