"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { featuredProjects, type Project } from "@/lib/projects";
import { useLang } from "@/components/LanguageProvider";

function ProjectCard({ project, index, lang, viewLabel }: { project: Project; index: number; lang: "he" | "en"; viewLabel: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const arrow = lang === "he" ? "←" : "→";
  const category = lang === "he" ? project.categoryHe : project.category;
  const tagline = lang === "he" ? project.tagline : project.taglineEn;

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(cardRef.current, {
          y: 60, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
          delay: index * 0.1,
        });
      });
    };
    init();
    return () => ctx?.revert();
  }, [index]);

  return (
    <Link
      ref={cardRef}
      href={`/work/${project.slug}`}
      className="glow-card"
      style={{ display: "block", textDecoration: "none" }}
    >
      {/* Thumbnail / Video */}
      <div style={{
        aspectRatio: "16/10",
        background: "linear-gradient(135deg, var(--ink-2) 0%, rgba(255,106,61,0.10) 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", position: "relative",
      }}>
        {project.video ? (
          <video src={project.video} autoPlay muted loop playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{
            fontFamily: "var(--font-inter)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800, color: "var(--signal)", opacity: 0.22, letterSpacing: "-0.04em",
          }}>{project.title}</span>
        )}
        <div style={{ position: "absolute", top: "1rem", insetInlineEnd: "1rem", width: 8, height: 8, background: "var(--signal)", opacity: 0.7, borderRadius: "50%" }} />
      </div>

      {/* Info */}
      <div style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
          <span className="label" style={{ color: "var(--signal)" }}>{category}</span>
          <span className="mono" style={{ color: "var(--mist)", fontSize: "0.7rem" }}>{project.year}</span>
        </div>

        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700,
          color: "var(--cream)", marginBottom: "0.5rem", letterSpacing: "-0.02em",
        }}>{project.title}</h3>

        <p style={{ fontSize: "0.85rem", color: "var(--mist)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
          {tagline}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="mono" style={{
              fontSize: "0.62rem", letterSpacing: "0.06em",
              padding: "0.25rem 0.6rem", border: "1px solid var(--border)",
              borderRadius: 6, color: "var(--mist)",
            }}>{t}</span>
          ))}
        </div>

        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--signal)" }}>
          {viewLabel} {arrow}
        </span>
      </div>
    </Link>
  );
}

export default function WorkGrid() {
  const { t, lang } = useLang();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrow = lang === "he" ? "←" : "→";

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(titleRef.current, {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        });
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="work" className="section-padding" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="work-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem" }}>
        <div>
          <div className="label" style={{ marginBottom: "1rem", color: "var(--signal)" }}>{t.work.label}</div>
          <h2 ref={titleRef} className="display-lg" style={{ color: "var(--cream)", maxWidth: 520 }}>{t.work.title}</h2>
        </div>
        <Link href="/work" style={{
          color: "var(--signal)", fontSize: "0.78rem", fontWeight: 600,
          letterSpacing: "0.06em", textDecoration: "none", whiteSpace: "nowrap",
        }}>{t.work.viewAll} {arrow}</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", gap: "1.5rem" }}>
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} lang={lang} viewLabel={t.work.viewProject} />
        ))}
      </div>
    </section>
  );
}
