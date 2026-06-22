import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, sortedPosts } from "@/lib/posts";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: `${post.title} — Shani AI Creator`, description: post.excerpt };
}

function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const idx = sortedPosts.findIndex((p) => p.slug === post.slug);
  const next = sortedPosts[(idx + 1) % sortedPosts.length];

  return (
    <>
      <article style={{ paddingTop: "9rem" }} dir="rtl">
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
          <Link href="/blog" style={{ color: "var(--mist)", fontSize: "0.75rem", letterSpacing: "0.08em", textDecoration: "none", display: "inline-block", marginBottom: "2.5rem" }}>
            ← כל הפוסטים
          </Link>

          {/* Meta */}
          <div className="mono" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", fontSize: "0.72rem", color: "var(--mist)", marginBottom: "1.25rem" }}>
            <span>{fmtDate(post.date)}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{post.readTime} דק׳ קריאה</span>
            {post.draft && <span style={{ color: "var(--signal)", border: "1px solid var(--signal-line)", borderRadius: 4, padding: "0.05rem 0.4rem" }}>טיוטה</span>}
          </div>

          <h1 className="display-md" style={{ color: "var(--cream)", marginBottom: "1.5rem", lineHeight: 1.2 }}>
            {post.title}
          </h1>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "3rem" }}>
            {post.tags.map((tag) => (
              <span key={tag} className="mono" style={{ fontSize: "0.62rem", padding: "0.2rem 0.55rem", border: "1px solid var(--border)", borderRadius: 6, color: "var(--mist)" }}>{tag}</span>
            ))}
          </div>

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {post.body.map((para, i) => (
              <p key={i} className="body-lg" style={{ color: "var(--mist)" }}>{para}</p>
            ))}
          </div>

          {post.draft && (
            <div style={{ marginTop: "2.5rem", padding: "1rem 1.25rem", background: "var(--signal-soft)", border: "1px solid var(--signal-line)", borderRadius: 12, fontSize: "0.85rem", color: "var(--mist)" }}>
              ✎ זו טיוטה — שלד הפוסט. להרחיב ולאשר לפני פרסום.
            </div>
          )}

          {/* CTA */}
          <a href="https://wa.me/972504744815" className="btn-grad" style={{ display: "inline-block", marginTop: "3rem", padding: "0.85rem 2rem" }}>
            יש לך עסק שצריך מערכת? בואי נדבר ←
          </a>
        </div>

        {/* Next post */}
        <div style={{ marginTop: "5rem", borderTop: "1px solid var(--border)" }}>
          <Link href={`/blog/${next.slug}`} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "3rem clamp(1.5rem, 5vw, 5rem)", textDecoration: "none",
          }}>
            <div>
              <div className="label" style={{ color: "var(--mist)", marginBottom: "0.5rem" }}>הפוסט הבא</div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "var(--cream)", letterSpacing: "-0.02em" }}>
                {next.title}
              </span>
            </div>
            <span style={{ color: "var(--signal)", fontSize: "2rem" }}>←</span>
          </Link>
        </div>
      </article>
      <Footer />
    </>
  );
}
