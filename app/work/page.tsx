import Link from "next/link";
import { projects } from "@/lib/projects";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Work — Shifted Tech",
  description: "Cinematic frontend builds, full-stack apps, and automation pipelines.",
};

export default function WorkPage() {
  return (
    <>
      <section
        style={{
          paddingTop: "10rem",
          padding: "10rem clamp(1.5rem, 5vw, 5rem) 5rem",
        }}
      >
        <div className="label" style={{ marginBottom: "1.5rem" }}>
          All Projects
        </div>
        <h1
          className="display-lg"
          style={{ color: "var(--white)", marginBottom: "5rem" }}
        >
          The Work
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="work-row-link"
              style={{
                textDecoration: "none",
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                alignItems: "center",
                gap: "2rem",
                padding: "2rem 0",
                borderTop: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "var(--dim)",
                  fontFamily: "var(--font-syne)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: "0.25rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </h2>
                <span className="label" style={{ color: "var(--muted)" }}>
                  {project.category}
                </span>
              </div>

              <span
                style={{
                  color: "var(--cyan)",
                  fontSize: "1.2rem",
                  transition: "transform 0.25s ease",
                }}
              >
                →
              </span>
            </Link>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </section>
      <Footer />
    </>
  );
}
