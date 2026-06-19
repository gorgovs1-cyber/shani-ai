import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/projects";
import Footer from "@/components/Footer";
import NextProjectLink from "@/components/NextProjectLink";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Shifted Tech`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next  = projects[index + 1] ?? projects[0];

  return (
    <>
      <article style={{ paddingTop: "8rem" }}>

        {/* Hero */}
        <section
          style={{
            padding: "4rem clamp(1.5rem, 5vw, 5rem)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Link
            href="/work"
            style={{
              color: "var(--muted)",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "3rem",
            }}
          >
            ← All Work
          </Link>

          <div className="label" style={{ color: project.accent, marginBottom: "1rem" }}>
            {project.category} · {project.year}
          </div>

          <h1
            className="display-lg"
            style={{ color: "var(--white)", marginBottom: "1.5rem" }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: "var(--muted)",
              maxWidth: "600px",
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            {project.tagline}
          </p>
        </section>

        {/* Thumbnail placeholder */}
        <div
          style={{
            height: "clamp(300px, 50vh, 600px)",
            background: `linear-gradient(135deg, var(--surface) 0%, ${project.accent}18 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(3rem, 10vw, 8rem)",
              fontWeight: 700,
              color: project.accent,
              opacity: 0.12,
              letterSpacing: "-0.04em",
            }}
          >
            {project.title}
          </span>
        </div>

        {/* Content */}
        <section
          style={{
            padding: "5rem clamp(1.5rem, 5vw, 5rem)",
            display: "grid",
            gridTemplateColumns: "1fr min(360px, 35%)",
            gap: "5rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              About the Project
            </h2>
            <p className="body-lg">{project.description}</p>
          </div>

          <div>
            <h3 className="label" style={{ marginBottom: "1.5rem" }}>
              Tech Stack
            </h3>
            <ul style={{ listStyle: "none" }}>
              {project.tech.map((t) => (
                <li
                  key={t}
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    padding: "0.75rem 0",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ color: project.accent, fontSize: "0.5rem" }}>■</span>
                  {t}
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--border)" }} />
            </ul>
          </div>
        </section>

        {/* Next project */}
        <NextProjectLink slug={next.slug} title={next.title} />
      </article>

      <Footer />
    </>
  );
}
