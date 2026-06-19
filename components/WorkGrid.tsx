"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { featuredProjects, type Project } from "@/lib/projects";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(cardRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
          delay: index * 0.12,
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
      className="project-card"
      style={{
        display: "block",
        textDecoration: "none",
        background: "var(--surface)",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      {/* Thumbnail / Video */}
      <div
        style={{
          aspectRatio: "16/10",
          background: `linear-gradient(135deg, #0d0d0d 0%, ${project.accent}22 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              color: project.accent,
              opacity: 0.25,
              letterSpacing: "-0.04em",
            }}
          >
            {project.title}
          </span>
        )}
        {/* Cyan corner accent */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "8px",
            height: "8px",
            background: "var(--cyan)",
            opacity: 0.6,
            zIndex: 1,
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.75rem",
          }}
        >
          <span className="label" style={{ color: project.accent }}>
            {project.category}
          </span>
          <span className="label" style={{ color: "var(--dim)" }}>
            {project.year}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--muted)",
            lineHeight: 1.6,
            marginBottom: "1.25rem",
          }}
        >
          {project.tagline}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.25rem 0.6rem",
                border: "1px solid var(--border)",
                color: "var(--dim)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function WorkGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(titleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        });
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-padding"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="work-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "4rem",
        }}
      >
        <div>
          <div className="label" style={{ marginBottom: "1rem" }}>
            עבודות נבחרות
          </div>
          <h2
            ref={titleRef}
            className="display-lg"
            style={{ color: "var(--white)", maxWidth: "500px" }}
          >
            פרויקטים שמשנים את הסטנדרט
          </h2>
        </div>
        <Link
          href="/work"
          style={{
            color: "var(--cyan)",
            fontSize: "0.78rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          כל העבודות ←
        </Link>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
