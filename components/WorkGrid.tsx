"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
import { galleryProjects } from "@/lib/projects";
import WordReveal from "@/components/WordReveal";

const SCREENSHOT = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280`;

/** Autoplaying gallery-card video. Split out from the map body on purpose: an
    inline `ref={(el) => el?.play()}` callback re-fires on every WorkGrid
    re-render (the drag-scroll handlers set state on every pointer move),
    which restarts the same video dozens of times a second and can stall it
    at readyState 0 indefinitely. A real component with its own effect plays
    it exactly once, when the card mounts. */
function GalleryVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Mobile data/battery budget: this card sits 5th in a horizontally-scrolling
    // track, so on a phone it is off-screen at load. Playing (and with
    // preload="auto", fully downloading ~900KB) on mount spent the visitor's
    // data on something they had not looked at yet. Play only while visible.
    const conn = (navigator as any).connection;
    if (conn?.saveData) return;                       // honour Save-Data
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // poster stays

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      // "metadata", not "auto": the poster carries the card until the visitor
      // actually scrolls the video into view.
      preload="metadata"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
    />
  );
}

/** How far off-centre a card may drift before it stops receding further. */
const FALLOFF = 1.15;
const MAX_ROTATE = 20;   // deg on the Y axis
const MAX_DEPTH  = 170;  // px pushed back on the Z axis
const MAX_FADE   = 0.42; // opacity removed at the far edge

export default function WorkGrid() {
  const { lang } = useLang();
  const t = dict[lang];
  const trackRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const rafRef = useRef<number>();

  /** 3D is opt-in: skipped on small screens (cost) and for reduced-motion users. */
  const [deck3d, setDeck3d] = useState(false);
  /** True only for real pointers. On touch, mouseenter fires on tap and the
      matching mouseleave never arrives, so every hover style below would stick
      to whichever card/arrow the visitor last touched. */
  const [hoverable, setHoverable] = useState(false);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const total = galleryProjects.length;
  const enterLabel = lang === "he" ? "כניסה לאתר" : "Visit site";
  // "Drag" assumes a mouse. On a phone the gesture is a swipe and there is no
  // cursor to drag with, so the hint has to change with the input device.
  const hintLabel = hoverable
    ? (lang === "he" ? "גררו או השתמשו בחיצים" : "Drag, or use the arrows")
    : (lang === "he" ? "החליקו לצדדים" : "Swipe sideways");
  const prevLabel = lang === "he" ? "הפרויקט הקודם" : "Previous project";
  const nextLabel = lang === "he" ? "הפרויקט הבא" : "Next project";
  const trackLabel = lang === "he"
    ? "רצועת פרויקטים. השתמשו בחיצי המקלדת כדי לדפדף."
    : "Project track. Use the arrow keys to browse.";

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqWide   = window.matchMedia("(min-width: 768px)");
    const mqHover  = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setDeck3d(mqWide.matches && !mqMotion.matches);
      setHoverable(mqHover.matches);
    };
    sync();
    mqMotion.addEventListener("change", sync);
    mqWide.addEventListener("change", sync);
    mqHover.addEventListener("change", sync);
    return () => {
      mqMotion.removeEventListener("change", sync);
      mqWide.removeEventListener("change", sync);
      mqHover.removeEventListener("change", sync);
    };
  }, []);

  /** Writes the per-card 3D transform straight to the DOM.
      Deliberately NOT React state — this runs on every scroll frame, and
      re-rendering six cards at 60fps would drop frames. Only the cheap,
      low-frequency values (active index, progress) go through state. */
  const paint = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>("article"));
    const trackMid = el.scrollLeft + el.clientWidth / 2;
    const max = el.scrollWidth - el.clientWidth;

    cards.forEach((card, i) => {
      const cardMid = card.offsetLeft + card.offsetWidth / 2;
      const dist = cardMid - trackMid;
      const d = Math.max(-FALLOFF, Math.min(FALLOFF, dist / (card.offsetWidth * 1.35)));
      const away = Math.abs(d);

      const inner = card.firstElementChild as HTMLElement | null;
      if (!deck3d) {
        card.style.transform = "";
        card.style.opacity = "";
        // Also clears the deck-mode hover shadow, otherwise a card hovered on a
        // wide viewport keeps it after a rotate/resize down to the flat layout.
        card.style.boxShadow = "";
        if (inner) inner.style.transform = "";
        return;
      }

      card.style.transform =
        `perspective(1600px) rotateY(${-d * MAX_ROTATE}deg) translateZ(${-away * MAX_DEPTH}px)`;
      card.style.opacity = String(1 - away * MAX_FADE);
      // Counter-parallax on the preview so the artwork lags the card slightly.
      if (inner) inner.style.transform = `translateX(${d * 14}px)`;
    });

    const prog = max > 0 ? el.scrollLeft / max : 0;
    // Derive the counter from scroll progress, not from "which card is nearest
    // the centre". At scrollLeft 0 the centre of the viewport already sits on
    // card 2, so the nearest-card approach opened the gallery reading "02 / 06".
    setActive(Math.round(prog * (total - 1)));
    setProgress(prog);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, [deck3d, total]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = undefined;
        paint();
      });
    };

    // Capture-phase wheel listener — Lenis registers at window level with capture,
    // so we must also use capture:true to intercept before Lenis does.
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      el.scrollLeft += e.deltaY + e.deltaX;
    };

    el.addEventListener("wheel", onWheel, { passive: false, capture: true });
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    paint();

    return () => {
      el.removeEventListener("wheel", onWheel, { capture: true });
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paint]);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth ?? 400;
    el.scrollBy({ left: dir === "next" ? cardWidth + 20 : -(cardWidth + 20), behavior: "smooth" });
  };

  /** Keyboard access to the track. It was previously reachable only by mouse. */
  const onTrackKey = (e: React.KeyboardEvent) => {
    const el = trackRef.current;
    if (!el) return;
    // In RTL the visual "forward" is the left arrow, so map by language.
    const forward = lang === "he" ? "ArrowLeft" : "ArrowRight";
    const back    = lang === "he" ? "ArrowRight" : "ArrowLeft";
    if (e.key === forward)      { e.preventDefault(); scroll("next"); }
    else if (e.key === back)    { e.preventDefault(); scroll("prev"); }
    else if (e.key === "Home")  { e.preventDefault(); el.scrollTo({ left: 0, behavior: "smooth" }); }
    else if (e.key === "End")   { e.preventDefault(); el.scrollTo({ left: el.scrollWidth, behavior: "smooth" }); }
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
          <WordReveal
            text={t.workTitle}
            style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,4.4vw,58px)", lineHeight: 1.04, letterSpacing: "-0.03em", fontFamily: "'Heebo',sans-serif" }}
          />
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
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, letterSpacing: ".2em", color: "var(--acc)" }}>
              {t.galleryKicker}
            </div>
            {/* Explicit affordance. Without this nobody knows the row scrolls. */}
            <div style={{
              marginTop: 10, display: "flex", alignItems: "center", gap: 8,
              fontFamily: "'Heebo',sans-serif", fontSize: 13.5, color: "var(--dmuted)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {hintLabel}
            </div>
          </div>

          {/* Counter + arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              aria-live="polite"
              style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
                color: "var(--dmuted)", letterSpacing: ".08em", direction: "ltr",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span style={{ color: "var(--dtext)", fontWeight: 700 }}>
                {String(active + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(total).padStart(2, "0")}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {(lang === "he" ? ["next","prev"] : ["prev","next"]).map((dir) => {
                const isPrev = dir === "prev";
                const disabled = isPrev ? atStart : atEnd;
                return (
                  <button
                    key={dir}
                    onClick={() => scroll(dir as "prev" | "next")}
                    disabled={disabled}
                    aria-label={isPrev ? prevLabel : nextLabel}
                    style={{
                      width: 46, height: 46, borderRadius: "50%",
                      border: `1px solid ${disabled ? "var(--dline)" : "color-mix(in oklch,var(--acc) 55%,var(--dline))"}`,
                      background: disabled ? "transparent" : "rgba(244,237,225,0.08)",
                      color: disabled ? "var(--dmuted)" : "var(--dtext)",
                      opacity: disabled ? 0.4 : 1,
                      cursor: disabled ? "default" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18,
                      transition: "background .15s ease, border-color .15s ease, opacity .15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (disabled || !hoverable) return;
                      (e.currentTarget as HTMLElement).style.background = "var(--acc)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--acc)";
                    }}
                    onMouseLeave={(e) => {
                      if (disabled || !hoverable) return;
                      (e.currentTarget as HTMLElement).style.background = "rgba(244,237,225,0.08)";
                      (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklch,var(--acc) 55%,var(--dline))";
                    }}
                  >
                    {isPrev ? "←" : "→"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drag-scrollable track */}
        <div
          ref={trackRef}
          role="list"
          tabIndex={0}
          aria-label={trackLabel}
          onKeyDown={onTrackKey}
          data-lenis-prevent-wheel
          className="work-track"
          style={{
            display: "flex", gap: 20,
            overflowX: "auto", overflowY: "hidden",
            // Extra vertical room so cards pushed back in Z aren't clipped.
            padding: deck3d ? "30px clamp(24px,5vw,72px) 46px" : "4px clamp(24px,5vw,72px) 20px",
            direction: "ltr",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch" as any,
            // Stops a swipe that reaches the end of the track from chaining into
            // the browser's back/forward edge gesture or bouncing the whole page.
            overscrollBehaviorX: "contain",
            cursor: "grab",
            userSelect: "none",
            msOverflowStyle: "none",
            scrollbarWidth: "none" as any,
            perspective: deck3d ? "1600px" : undefined,
            perspectiveOrigin: "50% 50%",
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
          {galleryProjects.map((p, i) => {
            const card = p.card;
            const loc = card[lang];
            const project = {
              title: card.title ?? p.title,
              kind: loc.kind,
              desc: loc.desc,
              url: card.url,
              tags: card.tags,
              video: card.video,
              poster: card.poster,
              bg: card.bg,
            };
            return (
            <article
              key={p.slug}
              role="listitem"
              style={{
                flexShrink: 0,
                width: "clamp(240px, 68vw, 330px)",
                background: "var(--dpanel)",
                borderRadius: 22,
                border: "1px solid var(--dline)",
                overflow: "hidden",
                scrollSnapAlign: "start",
                // In deck mode `transform` is rewritten every scroll frame by paint(),
                // so it must NOT be transitioned — a transition here would make the
                // rotation lag the scroll and stutter. The hover lift moves to
                // box-shadow instead, which composites just as cheaply.
                transition: deck3d
                  ? "border-color .15s ease, box-shadow .15s ease"
                  : "border-color .15s ease, transform .2s ease",
                transformStyle: deck3d ? "preserve-3d" : undefined,
                willChange: deck3d ? "transform, opacity" : undefined,
                // Only needed for the 3D deck. Leaving it on unconditionally
                // forced a compositor layer per card on phones too, for nothing.
                backfaceVisibility: deck3d ? "hidden" : undefined,
                direction: t.dir,
              }}
              onMouseEnter={(e) => {
                if (!hoverable) return;
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "color-mix(in oklch,var(--acc) 50%,var(--dline))";
                if (deck3d) el.style.boxShadow = "0 24px 60px -20px rgba(0,0,0,.75)";
                else el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                if (!hoverable) return;
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--dline)";
                if (deck3d) el.style.boxShadow = "";
                else el.style.transform = "";
              }}
            >
              {/* Preview with real screenshot */}
              <div style={{
                height: 165, position: "relative", overflow: "hidden",
                background: project.bg,
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

                {/* Real capture (video loop with poster) when we have one, otherwise
                    fall back to the auto-generated mshots screenshot. mshots renders
                    a page ~2s after load, which cuts off any scroll/entrance
                    animation — fine for static sites, wrong for cinematic ones. */}
                {project.video ? (
                  <div style={{ position: "absolute", top: 28, left: 0, right: 0, bottom: 0 }}>
                    <GalleryVideo src={project.video} poster={project.poster} />
                  </div>
                ) : (
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
                )}

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
                  // .work-visit grows the pill to a 44px tap target on coarse
                  // pointers only (see globals.css); at 12px/8px padding it was
                  // ~32px tall, under the WCAG 2.5.5 minimum.
                  className="work-visit"
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
                  onMouseEnter={(e) => { if (hoverable) (e.currentTarget as HTMLElement).style.background = "var(--acc)"; }}
                  onMouseLeave={(e) => { if (hoverable) (e.currentTarget as HTMLElement).style.background = "rgba(10,8,6,0.9)"; }}
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
            );
          })}
        </div>

        {/* Progress rail — the clearest single signal that the row scrolls,
            and the only one that survives on touch where hover doesn't exist. */}
        <div
          aria-hidden="true"
          // dir="ltr" is required, not cosmetic: the track itself is forced LTR,
          // so scrollLeft 0 is its visual start. In an inherited RTL container the
          // thumb would sit at the right edge at progress 0 and then translate
          // further right, straight out of view.
          dir="ltr"
          style={{
            margin: "8px clamp(24px,5vw,72px) 0",
            height: 3,
            borderRadius: 999,
            background: "var(--dline)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${100 / total}%`,
              borderRadius: 999,
              background: "var(--acc)",
              // translateX(%) is relative to the thumb's OWN width, so travelling
              // the full rail means moving (total - 1) thumb-widths.
              // translate, not margin/left — composite-only, no layout per frame.
              transform: `translateX(${progress * (total - 1) * 100}%)`,
              transition: "transform .12s linear",
            }}
          />
        </div>

      </section>
    </>
  );
}
