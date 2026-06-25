"use client";

import { useRef, useEffect } from "react";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

const SCREENSHOT = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280`;

const FALLBACK_BG: Record<string, string> = {
  "My Money":     "#0b1628",
  "Lilach Hazan": "#faf8f5",
  "Rox":          "#080a0c",
  "Solis":        "#1c1108",
};

export default function WorkGrid() {
  const { lang } = useLang();
  const t = dict[lang];
  const trackRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const enterLabel = lang === "he" ? "כניסה לאתר" : "Visit site";

  // Capture-phase wheel listener — Lenis registers at window level with capture,
  // so we must also use capture:true to intercept before Lenis does.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      el.scrollLeft += e.deltaY + e.deltaX;
    };
    el.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => el.removeEventListener("wheel", onWheel, { capture: true });
  }, []);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth ?? 400;
    el.scrollBy({ left: dir === "next" ? cardWidth + 20 : -(cardWidth + 20), behavior: "smooth" });
  };

  return (
    <>
      {/* Section header */}
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
          const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "none"; io.disconnect(); }
          }, { threshold: 0.1 });
          io.observe(el);
        }}
      >
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>
          {t.workKicker}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,4.4vw,58px)", lineHeight: 1.04, letterSpacing: "-0.03em", fontFamily: "'Heebo',sans-serif" }}>
            {t.workTitle}
          </h2>
          <p style={{ margin: 0, color: "var(--muted2)", fontSize: 17, lineHeight: 1.6, maxWidth: "36ch", fontFamily: "'Heebo',sans-serif" }}>
            {t.workSub}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section
        aria-label="Project gallery"
        style={{ position: "relative", zIndex: 1, background: "var(--dark)", paddingBottom: 64 }}
      >
        {/* Glow */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, insetInlineEnd: 0,
          width: 500, height: 500, pointerEvents: "none",
          background: "radial-gradient(circle, color-mix(in oklch,var(--acc) 20%,transparent),transparent 65%)",
          filter: "blur(48px)",
        }} />

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 20, padding: "clamp(44px,6vw,80px) clamp(24px,5vw,72px) 32px",
          flexWrap: "wrap",
        }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, letterSpacing: ".2em", color: "var(--acc)" }}>
            {t.galleryKicker}
          </div>
          {/* Arrow nav buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            {(lang === "he" ? ["next","prev"] : ["prev","next"]).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir as "prev" | "next")}
                aria-label={dir === "prev" ? "Previous project" : "Next project"}
                style={{
                  width: 44, height: 44, borderRadius: "50%",
                  border: "1px solid var(--dline)",
                  background: "rgba(244,237,225,0.06)",
                  color: "var(--dtext)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, transition: "background .2s, border-color .2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--acc)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--acc)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(244,237,225,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--dline)";
                }}
              >
                {dir === "prev" ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>

        {/* Drag-scrollable track */}
        <div
          ref={trackRef}
          role="list"
          data-lenis-prevent-wheel
          style={{
            display: "flex", gap: 20,
            overflowX: "auto", overflowY: "hidden",
            padding: "4px clamp(24px,5vw,72px) 20px",
            direction: "ltr",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch" as any,
            cursor: "grab",
            userSelect: "none",
            msOverflowStyle: "none",
            scrollbarWidth: "none" as any,
          } as React.CSSProperties}
          onMouseDown={(e) => {
            isDragging.current = true;
            startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
            scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
            if (trackRef.current) trackRef.current.style.cursor = "grabbing";
          }}
          onMouseLeave={() => {
            isDragging.current = false;
            if (trackRef.current) trackRef.current.style.cursor = "grab";
          }}
          onMouseUp={() => {
            isDragging.current = false;
            if (trackRef.current) trackRef.current.style.cursor = "grab";
          }}
          onMouseMove={(e) => {
            if (!isDragging.current || !trackRef.current) return;
            e.preventDefault();
            const x = e.pageX - trackRef.current.offsetLeft;
            const walk = (x - startX.current) * 1.5;
            trackRef.current.scrollLeft = scrollLeft.current - walk;
          }}
        >
          {t.projects.map((project, i) => (
            <article
              key={project.title}
              role="listitem"
              style={{
                flexShrink: 0,
                width: "clamp(300px, 76vw, 420px)",
                background: "var(--dpanel)",
                borderRadius: 22,
                border: "1px solid var(--dline)",
                overflow: "hidden",
                scrollSnapAlign: "start",
                transition: "border-color .3s, transform .35s",
                direction: t.dir,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklch,var(--acc) 50%,var(--dline))";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--dline)";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              {/* Preview with real screenshot */}
              <div style={{
                height: 240, position: "relative", overflow: "hidden",
                background: FALLBACK_BG[project.title] ?? "#0a0805",
              }}>
                {/* Browser chrome */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 28, zIndex: 10,
                  background: "rgba(10,8,6,0.96)",
                  display: "flex", alignItems: "center", gap: 5, padding: "0 10px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["#ff5f57","#febc2e","#28c840"].map(c => (
                      <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                  <div style={{
                    flex: 1, height: 16, marginLeft: 6,
                    background: "rgba(255,255,255,0.06)", borderRadius: 3,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
                      {project.url.replace("https://","").replace(/\/$/,"")}
                    </span>
                  </div>
                </div>

                {/* Screenshot image — scrolls through the page */}
                <div className={`preview-img-wrap preview-delay-${i}`} style={{
                  position: "absolute", top: 28, left: 0, right: 0,
                  pointerEvents: "none",
                }}>
                  <img
                    src={SCREENSHOT(project.url)}
                    alt={`Preview of ${project.title}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                {/* Bottom gradient */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 80, zIndex: 5,
                  background: "linear-gradient(to top, var(--dpanel) 10%, transparent)",
                  pointerEvents: "none",
                }} />

                {/* Kind chip */}
                <div style={{
                  position: "absolute", top: 38, insetInlineStart: 10, zIndex: 6,
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10, color: "var(--acc2)",
                  background: "rgba(10,8,6,0.9)", backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid var(--dline)", borderRadius: 999,
                  padding: "5px 10px", letterSpacing: ".04em", fontWeight: 700,
                }}>{project.kind}</div>

                {/* Visit link */}
                <a
                  href={project.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    position: "absolute", bottom: 10, insetInlineEnd: 10, zIndex: 6,
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 12, fontWeight: 700, color: "var(--dtext)",
                    background: "rgba(10,8,6,0.9)", backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999,
                    padding: "8px 14px", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 5,
                    transition: "background .2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--acc)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(10,8,6,0.9)"; }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {enterLabel} <span>{t.scrollArrow}</span>
                </a>
              </div>

              {/* Card body */}
              <div style={{ padding: "18px 20px 22px" }}>
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10, letterSpacing: ".08em", color: "var(--acc)",
                  marginBottom: 5, textTransform: "uppercase",
                }}>{project.kind}</div>
                <h3 style={{
                  margin: "0 0 8px", color: "var(--dtext)", fontWeight: 800,
                  fontSize: "clamp(18px,2vw,21px)", letterSpacing: "-0.01em",
                  fontFamily: "'Heebo',sans-serif",
                }}>{project.title}</h3>
                <p style={{
                  margin: "0 0 14px", color: "var(--dmuted)",
                  fontSize: 14, lineHeight: 1.65, fontFamily: "'Heebo',sans-serif",
                }}>{project.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 11, color: "var(--acc2)",
                      border: "1px solid color-mix(in oklch,var(--acc) 28%,var(--dline))",
                      padding: "4px 10px", borderRadius: 999,
                      background: "color-mix(in oklch,var(--acc) 7%,transparent)",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Scroll indicator dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, paddingTop: 8 }}>
          {t.projects.map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: i === 0 ? "var(--acc)" : "var(--dline)",
              transition: "background .3s",
            }} />
          ))}
        </div>
      </section>
    </>
  );
}
