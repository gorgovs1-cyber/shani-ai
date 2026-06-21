import Link from "next/link";
import { projects } from "@/lib/projects";
import Footer from "@/components/Footer";

export const metadata = {
  title: "עבודות — Shani AI Creator",
  description: "פרויקטים קולנועיים, אפליקציות פול-סטאק ואוטומציות AI לעסקים בישראל.",
};

export default function WorkPage() {
  return (
    <>
      <section style={{ padding: "10rem clamp(1.5rem, 5vw, 5rem) 5rem" }} dir="rtl">
        <div className="label" style={{ marginBottom: "1.5rem", color: "var(--signal)" }}>
          כל הפרויקטים
        </div>
        <h1 className="display-lg" style={{ color: "var(--cream)", marginBottom: "5rem" }}>
          העבודות
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="work-row-link"
              style={{
                textDecoration: "none",
                display: "grid",
                gridTemplateColumns: "60px 1fr auto",
                alignItems: "center",
                gap: "2rem",
                padding: "2rem 0",
                borderTop: "1px solid var(--border)",
              }}
            >
              <span className="mono" style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--mist)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  marginBottom: "0.25rem",
                  letterSpacing: "-0.02em",
                }}>
                  {project.title}
                </h2>
                <span className="label" style={{ color: "var(--mist)" }}>
                  {project.categoryHe}
                </span>
              </div>

              <span style={{ color: "var(--signal)", fontSize: "1.2rem" }}>←</span>
            </Link>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </section>
      <Footer />
    </>
  );
}
