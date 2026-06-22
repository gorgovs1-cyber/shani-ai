import Link from "next/link";
import { sortedPosts } from "@/lib/posts";
import Footer from "@/components/Footer";

export const metadata = {
  title: "בלוג — Shani AI Creator",
  description: "מחשבות על עסקים, אוטומציה ו-AI — מהזווית של מי שמגיעה מעולם העסקים, לא מההייטק.",
};

function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  return (
    <>
      <section style={{ padding: "10rem clamp(1.5rem, 5vw, 5rem) 5rem" }} dir="rtl">
        <div className="label" style={{ marginBottom: "1.5rem", color: "var(--signal)" }}>מחשבות אחרונות</div>
        <h1 className="display-lg" style={{ color: "var(--cream)", marginBottom: "4rem", maxWidth: 700 }}>
          מהשטח — על עסקים, AI ומה שביניהם
        </h1>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {sortedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="work-row-link" style={{
              textDecoration: "none", display: "block", padding: "2rem 0", borderTop: "1px solid var(--border)",
            }}>
              <div className="mono" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", fontSize: "0.7rem", color: "var(--mist)", marginBottom: "0.75rem" }}>
                <span>{fmtDate(post.date)}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{post.readTime} דק׳ קריאה</span>
                {post.draft && <span style={{ color: "var(--signal)", border: "1px solid var(--signal-line)", borderRadius: 4, padding: "0.05rem 0.4rem" }}>טיוטה</span>}
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 700, color: "var(--cream)", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                {post.title}
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--mist)", lineHeight: 1.6, maxWidth: 640 }}>{post.excerpt}</p>
            </Link>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </section>
      <Footer />
    </>
  );
}
