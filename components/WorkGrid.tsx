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
    re-render, which restarts the same video dozens of times a second and can
    stall it at readyState 0 indefinitely. A real component with its own
    effect plays it exactly once, when the card mounts. */
function GalleryVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Mobile data/battery budget: this card can sit off-screen (behind the
    // active one) at load. Playing (and with preload="auto", fully
    // downloading ~900KB) on mount spent the visitor's data on something
    // they had not looked at yet. Play only while it's the active card.
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
      preload="metadata"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
    />
  );
}

/** How many cards on either side of the active one stay visible before
    fading out completely. Anything farther is invisible and inert. */
const MAX_VISIBLE = 2;
/** How far each step fans a card out, as a percentage of the card's OWN
    width — percentages in translateX are relative to the element's own box,
    so this needs no measuring of container/card pixel sizes at all. */
const STEP_PERCENT = 58;
const MAX_ROTATE = 28;   // deg on the Y axis, at the outermost visible step
const MAX_DEPTH = 190;   // px pushed back on the Z axis, at the outermost step
const MAX_FADE = 0.82;   // opacity removed at the outermost visible step
const SCALE_STEP = 0.1;  // scale removed per step away from active

export default function WorkGrid() {
  const { lang } = useLang();
  const t = dict[lang];
  const stageRef = useRef<HTMLDivElement>(null);

  /** 3D is opt-in: skipped on small screens (cost) and for reduced-motion users. */
  const [deck3d, setDeck3d] = useState(false);
  /** True only for real pointers. On touch, mouseenter fires on tap and the
      matching mouseleave never arrives, so every hover style below would stick
      to whichever card/arrow the visitor last touched. */
  const [hoverable, setHoverable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [index, setIndex] = useState(0);

  const total = galleryProjects.length;
  const atStart = index === 0;
  const atEnd = index === total - 1;
  const enterLabel = lang === "he" ? "כניסה לאתר" : "Visit site";
  // There is no more drag-to-scroll (see below) — the hint has to say what
  // actually works on this input device instead.
  const hintLabel = hoverable
    ? (lang === "he" ? "לחצו על החיצים, או על כרטיס בצד" : "Click the arrows, or a card on the side")
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
      setReducedMotion(mqMotion.matches);
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

  const go = useCallback((dir: "prev" | "next") => {
    setIndex((i) => {
      const next = dir === "next" ? i + 1 : i - 1;
      return Math.max(0, Math.min(total - 1, next));
    });
  }, [total]);

  /** Swipe replaces drag-to-scroll on touch. Attached as a real (non-passive)
      listener because React's own onTouchMove is passive by default, which
      would silently ignore preventDefault() — and preventDefault is what
      stops a horizontal swipe here from also dragging the whole page. Only
      a gesture that turns out to be MORE horizontal than vertical is claimed;
      a mostly-vertical touch is left alone so the page still scrolls. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let intent: "none" | "horizontal" | "vertical" = "none";

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      intent = "none";
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (intent === "none" && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        intent = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
      }
      if (intent === "horizontal") e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (intent !== "horizontal") return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      if (Math.abs(dx) < 40) return;
      // Swipe left (finger moves left) reveals what's next, from the right —
      // same physical mapping as the arrow buttons below, in both languages.
      go(dx < 0 ? "next" : "prev");
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [go]);

  /** Keyboard access to the stage. In RTL the visual "forward" is the left
      arrow, so map by language — same rule the arrow buttons below use. */
  const onStageKey = (e: React.KeyboardEvent) => {
    const forward = lang === "he" ? "ArrowLeft" : "ArrowRight";
    const back    = lang === "he" ? "ArrowRight" : "ArrowLeft";
    if (e.key === forward)      { e.preventDefault(); go("next"); }
    else if (e.key === back)    { e.preventDefault(); go("prev"); }
    else if (e.key === "Home")  { e.preventDefault(); setIndex(0); }
    else if (e.key === "End")   { e.preventDefault(); setIndex(total - 1); }
  };

  const cardTransition = reducedMotion
    ? "opacity .2s ease"
    : "transform .55s cubic-bezier(.2,.8,.2,1), opacity .4s ease, box-shadow .15s ease, border-color .15s ease";

  return (
    <>
      {/* Section header */}
      <section
        id="work"
        style={{
          position: "relative", zIndex: 1,
          maxWidth: 1200, margin: "0 auto",
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
        style={{ position: "relative", zIndex: 1, paddingBottom: 64 }}
      >
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
            {/* Explicit affordance. Without this nobody knows the deck is interactive. */}
            <div style={{
              marginTop: 10, display: "flex", alignItems: "center", gap: 8,
              fontFamily: "'Heebo',sans-serif", fontSize: 13.5, color: "var(--muted2)",
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
                color: "var(--muted2)", letterSpacing: ".08em", direction: "ltr",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span style={{ color: "var(--cream)", fontWeight: 700 }}>
                {String(index + 1).padStart(2, "0")}
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
                    onClick={() => go(dir as "prev" | "next")}
                    disabled={disabled}
                    aria-label={isPrev ? prevLabel : nextLabel}
                    style={{
                      width: 46, height: 46, borderRadius: "50%",
                      border: `1px solid ${disabled ? "var(--border)" : "color-mix(in oklch,var(--acc) 55%,var(--border))"}`,
                      background: disabled ? "transparent" : "color-mix(in oklch, var(--acc) 6%, transparent)",
                      color: disabled ? "var(--muted2)" : "var(--cream)",
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
                      (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklch,var(--acc) 55%,var(--border))";
                    }}
                  >
                    {isPrev ? "←" : "→"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Coverflow stage. Cards share one grid cell (gridArea 1/1) and are
            fanned out purely with transform — no scroll container, so there
            is nothing left for a drag/wheel/RTL scroll-direction bug to live
            in. Navigation is discrete: arrows, keyboard, a tap on a side
            card, or a swipe — never a free-running scrollLeft. */}
        <div
          ref={stageRef}
          role="list"
          tabIndex={0}
          aria-label={trackLabel}
          onKeyDown={onStageKey}
          style={{
            display: "grid",
            overflow: "hidden",
            padding: deck3d ? "36px clamp(16px,6vw,72px) 46px" : "16px clamp(16px,6vw,72px) 24px",
            perspective: deck3d ? "1600px" : undefined,
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

            const dist = i - index;
            const abs = Math.min(Math.abs(dist), MAX_VISIBLE);
            const sign = Math.sign(dist);
            const isActive = dist === 0;
            const visible = Math.abs(dist) <= MAX_VISIBLE;
            const depthFrac = abs / MAX_VISIBLE;

            const translateX = sign * abs * STEP_PERCENT;
            const scale = 1 - abs * SCALE_STEP;
            const opacity = visible ? 1 - depthFrac * MAX_FADE : 0;
            const transform = deck3d
              ? `translateX(${translateX}%) perspective(1600px) rotateY(${-sign * depthFrac * MAX_ROTATE}deg) translateZ(${-depthFrac * MAX_DEPTH}px) scale(${scale})`
              : `translateX(${translateX}%) scale(${scale})`;

            return (
            <article
              key={p.slug}
              role="listitem"
              aria-hidden={!isActive}
              aria-current={isActive ? "true" : undefined}
              onClick={() => { if (!isActive) setIndex(i); }}
              style={{
                gridColumn: 1, gridRow: 1,
                justifySelf: "center", alignSelf: "start",
                width: "clamp(260px, 74vw, 420px)",
                background: "var(--dpanel)",
                borderRadius: 22,
                border: "1px solid var(--dline)",
                overflow: "hidden",
                transformStyle: "flat",
                willChange: "transform, opacity",
                backfaceVisibility: deck3d ? "hidden" : undefined,
                direction: t.dir,
                zIndex: total - abs + (isActive ? 10 : 0),
                pointerEvents: visible ? (isActive ? "auto" : "auto") : "none",
                cursor: isActive ? "default" : "pointer",
                transform,
                opacity,
                transition: cardTransition,
              }}
              onMouseEnter={(e) => {
                if (!hoverable || !isActive) return;
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "color-mix(in oklch,var(--acc) 50%,var(--dline))";
                if (deck3d) el.style.boxShadow = "0 24px 60px -20px rgba(0,0,0,.75)";
              }}
              onMouseLeave={(e) => {
                if (!hoverable || !isActive) return;
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--dline)";
                el.style.boxShadow = "";
              }}
            >
              {/* Preview with real screenshot */}
              <div style={{
                height: 200, position: "relative", overflow: "hidden",
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
                    <span style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                      {project.url.replace("https://","").replace(/\/$/,"")}
                    </span>
                  </div>
                </div>

                {/* Real capture (video loop with poster) when we have one, otherwise
                    fall back to the auto-generated mshots screenshot. mshots renders
                    a page ~2s after load, which cuts off any scroll/entrance
                    animation — fine for static sites, wrong for cinematic ones. */}
                {isActive && project.video ? (
                  <div style={{ position: "absolute", top: 28, left: 0, right: 0, bottom: 0 }}>
                    <GalleryVideo src={project.video} poster={project.poster} />
                  </div>
                ) : project.video ? (
                  <img
                    src={project.poster}
                    alt=""
                    aria-hidden="true"
                    style={{ position: "absolute", top: 28, left: 0, right: 0, width: "100%", height: "calc(100% - 28px)", objectFit: "cover", objectPosition: "top" }}
                  />
                ) : (
                  <div className={`preview-img-wrap ${isActive ? `preview-delay-${i}` : ""}`} style={{
                    position: "absolute", top: 28, left: 0, right: 0,
                    pointerEvents: "none",
                    animationPlayState: isActive ? "running" : "paused",
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
                  fontSize: 12, color: "var(--acc2)",
                  background: "rgba(10,8,6,0.9)", backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid var(--dline)", borderRadius: 999,
                  padding: "5px 10px", letterSpacing: ".04em", fontWeight: 700,
                }}>{project.kind}</div>

                {/* Visit link — only really reachable once the card is active;
                    on a receding card the tap should bring it forward instead,
                    so the link stops being an independent target until then. */}
                <a
                  href={project.url} target="_blank" rel="noopener noreferrer"
                  className="work-visit"
                  tabIndex={isActive ? 0 : -1}
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
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  onMouseEnter={(e) => { if (hoverable) (e.currentTarget as HTMLElement).style.background = "var(--acc)"; }}
                  onMouseLeave={(e) => { if (hoverable) (e.currentTarget as HTMLElement).style.background = "rgba(10,8,6,0.9)"; }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {enterLabel}
                </a>
              </div>

              {/* Card body */}
              <div style={{ padding: "18px 20px 22px" }}>
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 12, letterSpacing: ".08em", color: "var(--acc)",
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

        {/* Progress rail — the clearest single signal of where we are in the
            deck, and the only one that survives on touch where hover doesn't
            exist. Driven straight off `index`, not a scroll position. */}
        <div
          aria-hidden="true"
          dir="ltr"
          style={{
            margin: "8px clamp(24px,5vw,72px) 0",
            height: 3,
            borderRadius: 999,
            background: "var(--border)",
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
              transform: `translateX(${(total > 1 ? index / (total - 1) : 0) * (total - 1) * 100}%)`,
              transition: reducedMotion ? "none" : "transform .3s cubic-bezier(.2,.8,.2,1)",
            }}
          />
        </div>

      </section>
    </>
  );
}
