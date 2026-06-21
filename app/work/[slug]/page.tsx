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
    title: `${project.title} — Shani AI Creator`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[index + 1] ?? projects[0];

  const meta: { label: string; value: string }[] = [
    { label: "לקוח", value: project.client },
    { label: "סוג", value: project.categoryHe },
    { label: "שנה", value: project.year },
  ];

  return (
    <>
      <article style={{ paddingTop: "8rem" }} dir="rtl">

        {/* Hero */}
        <section style={{ padding: "4rem clamp(1.5rem, 5vw, 5rem)", borderBottom: "1px solid var(--border)" }}>
          <Link href="/work" style={{
            color: "var(--mist)", fontSize: "0.75rem", letterSpacing: "0.08em",
            textDecoration: "none", fontFamily: "var(--font-body)",
            display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem",
          }}>
            ← כל העבודות
          </Link>

          <div className="label" style={{ color: "var(--signal)", marginBottom: "1rem" }}>
            {project.categoryHe} · {project.year}
          </div>

          <h1 className="display-lg" style={{ color: "var(--cream)", marginBottom: "1.5rem" }}>
            {project.title}
          </h1>

          <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "var(--mist)", maxWidth: 620, lineHeight: 1.6 }}>
            {project.tagline}
          </p>
        </section>

        {/* Hero visual */}
        <div style={{
          height: "clamp(300px, 50vh, 600px)",
          background: "linear-gradient(135deg, var(--graphite) 0%, rgba(255,106,61,0.12) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
        }}>
          {project.video ? (
            <video src={project.video} autoPlay muted loop playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{
              fontFamily: "var(--font-inter)", fontSize: "clamp(3rem, 10vw, 8rem)",
              fontWeight: 800, color: "var(--signal)", opacity: 0.12, letterSpacing: "-0.04em",
            }}>{project.title}</span>
          )}
        </div>

        {/* Content */}
        <section style={{
          padding: "5rem clamp(1.5rem, 5vw, 5rem)",
          display: "grid", gridTemplateColumns: "1fr min(340px, 35%)", gap: "5rem",
          borderBottom: "1px solid var(--border)",
        }} className="project-content">
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700,
              color: "var(--cream)", marginBottom: "1.5rem", letterSpacing: "-0.01em",
            }}>
              על הפרויקט
            </h2>
            <p className="body-lg">{project.description}</p>
          </div>

          <div>
            {/* Meta block — CLIENT / TYPE / TECHNOLOGIES / YEAR */}
            {meta.map((m) => (
              <div key={m.label} style={{ padding: "0.85rem 0", borderTop: "1px solid var(--border)" }}>
                <div className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--mist)", textTransform: "uppercase", marginBottom: "0.3rem" }}>{m.label}</div>
                <div style={{ fontSize: "0.92rem", color: "var(--cream)", fontWeight: 600 }}>{m.value}</div>
              </div>
            ))}

            <div style={{ padding: "0.85rem 0", borderTop: "1px solid var(--border)" }}>
              <div className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--mist)", textTransform: "uppercase", marginBottom: "0.5rem" }}>טכנולוגיות</div>
              <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {project.tech.map((tch) => (
                  <li key={tch} className="mono" style={{
                    fontSize: "0.65rem", padding: "0.25rem 0.55rem",
                    border: "1px solid var(--border-2)", borderRadius: 6, color: "var(--mist)",
                  }}>{tch}</li>
                ))}
              </ul>
            </div>

            {/* View project / discuss CTA */}
            <a
              href={project.liveUrl ?? "https://wa.me/972504744815"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-grad"
              style={{ display: "block", textAlign: "center", marginTop: "1.5rem", padding: "0.85rem" }}
            >
              {project.liveUrl ? "צפה בפרויקט ←" : "בואי נדבר על פרויקט דומה ←"}
            </a>
          </div>
        </section>

        <NextProjectLink slug={next.slug} title={next.title} />
      </article>

      <Footer />
    </>
  );
}
