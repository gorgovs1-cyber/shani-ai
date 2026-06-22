"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { sortedPosts, type Post } from "@/lib/posts";
import { useLang } from "@/components/LanguageProvider";

function fmtDate(iso: string, lang: "he" | "en") {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(lang === "he" ? "he-IL" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function PostCard({ post, lang, t, index }: { post: Post; lang: "he" | "en"; t: any; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const title = lang === "he" ? post.title : post.titleEn;
  const excerpt = lang === "he" ? post.excerpt : post.excerptEn;
  const tags = lang === "he" ? post.tags : post.tagsEn;
  const arrow = lang === "he" ? "←" : "→";

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(ref.current, {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%" },
          delay: index * 0.08,
        });
      });
    };
    init();
    return () => ctx?.revert();
  }, [index]);

  return (
    <Link ref={ref} href={`/blog/${post.slug}`} className="glow-card" style={{ display: "block", textDecoration: "none", padding: "1.75rem" }}>
      {/* Meta row */}
      <div className="mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", fontSize: "0.68rem", color: "var(--mist)", marginBottom: "1rem" }}>
        <span>{fmtDate(post.date, lang)}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>{post.readTime} {t.blog.minRead}</span>
        {post.draft && (
          <span style={{ color: "var(--signal)", border: "1px solid var(--signal-line)", borderRadius: 4, padding: "0.05rem 0.4rem" }}>{t.blog.draft}</span>
        )}
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--cream)", lineHeight: 1.3, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
        {title}
      </h3>

      <p style={{ fontSize: "0.9rem", color: "var(--mist)", lineHeight: 1.6, marginBottom: "1.25rem" }}>{excerpt}</p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
        {tags.map((tag) => (
          <span key={tag} className="mono" style={{ fontSize: "0.6rem", letterSpacing: "0.05em", padding: "0.2rem 0.55rem", border: "1px solid var(--border)", borderRadius: 6, color: "var(--mist)" }}>{tag}</span>
        ))}
      </div>

      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--signal)" }}>{t.blog.readMore} {arrow}</span>
    </Link>
  );
}

export default function BlogSection() {
  const { t, lang } = useLang();
  const arrow = lang === "he" ? "←" : "→";

  return (
    <section id="blog" className="section-padding" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="work-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
        <div>
          <div className="label" style={{ marginBottom: "1rem", color: "var(--signal)" }}>{t.blog.label}</div>
          <h2 className="display-lg" style={{ color: "var(--cream)", maxWidth: 600 }}>{t.blog.title}</h2>
        </div>
        <Link href="/blog" style={{ color: "var(--signal)", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>{t.blog.viewAll} {arrow}</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.5rem" }}>
        {sortedPosts.map((post, i) => (
          <PostCard key={post.slug} post={post} lang={lang} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}
