import Link from "next/link";
import { projects } from "@/lib/projects";
import Footer from "@/components/Footer";

export const metadata = {
  title: "עבודות · Shani AI Creator",
  description: "פרויקטים קולנועיים, אפליקציות פול-סטאק ואוטומציות AI לעסקים בישראל.",
  alternates: { canonical: "https://shani-ai.com/work" },
};

// אותו מקור צילומי מסך אוטומטיים שמזין את גלריית עמוד הבית (components/WorkGrid.tsx),
// כדי שלא נצטרך לצלם שום דבר חדש כדי שלשורות כאן תהיה תמונה אמיתית.
const SCREENSHOT = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=640`;

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
          {projects.map((project, i) => {
            const previewUrl = project.card?.url ?? project.liveUrl;
            const videoSrc = project.card?.video;
            const isExternal = Boolean(project.noDetailPage && project.liveUrl);

            return (
              <Link
                key={project.slug}
                href={project.noDetailPage ? (project.liveUrl ?? "/work") : `/work/${project.slug}`}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="work-row-link"
                style={{
                  textDecoration: "none",
                  display: "grid",
                  gridTemplateColumns: "clamp(84px,18vw,124px) 1fr auto",
                  alignItems: "center",
                  gap: "clamp(1rem,3vw,2rem)",
                  padding: "1.5rem 0",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {/* תצוגה מקדימה: וידאו אמיתי כשיש (or-eisenstadt), אחרת צילום מסך
                    חי של האתר הציבורי, ורק כשאין בכלל כתובת ציבורית (למשל
                    אוטומציה פנימית בלי חזית) — אריח ממותג עם האות הראשונה. */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: 10,
                    overflow: "hidden",
                    background: "var(--panel, #1a140d)",
                    border: "1px solid var(--border)",
                    flexShrink: 0,
                  }}
                >
                  {videoSrc ? (
                    <video
                      src={videoSrc}
                      poster={project.card?.poster}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : previewUrl ? (
                    <img
                      src={SCREENSHOT(previewUrl)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-display)",
                        fontSize: "1.6rem",
                        fontWeight: 700,
                        color: "var(--signal)",
                        background: "color-mix(in oklch, var(--signal) 10%, var(--panel, #1a140d))",
                      }}
                    >
                      {project.title.charAt(0)}
                    </div>
                  )}

                  <span
                    className="mono"
                    style={{
                      position: "absolute",
                      top: 6,
                      insetInlineStart: 6,
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "#fff",
                      background: "rgba(10,8,6,0.75)",
                      borderRadius: 5,
                      padding: "2px 6px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

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

                {isExternal ? (
                  <span
                    aria-hidden="true"
                    title="נפתח באתר חיצוני"
                    style={{
                      color: "var(--mist)",
                      fontSize: "1.1rem",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    ↗
                  </span>
                ) : (
                  <span aria-hidden="true" />
                )}
              </Link>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </section>
      <Footer />
    </>
  );
}
