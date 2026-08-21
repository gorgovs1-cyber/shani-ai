"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";
import type { Post, Block } from "@/lib/posts";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";
const WA = "972504744815";

/**
 * גוף המאמר מגיע כבלוקים מ-lib/posts.ts ולא כ-HTML, אז אין כאן
 * dangerouslySetInnerHTML. התחביר היחיד שמותר בתוך טקסט הוא [טקסט](/כתובת),
 * והוא מפוענח כאן לאלמנטים אמיתיים של React. גם אם מישהו יכתוב תגית HTML
 * בתוך התוכן, היא תוצג כטקסט ולא תרוץ.
 */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function withLinks(text: string, keyPrefix: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const href = m[2];
    // רק קישורים פנימיים. כל דבר אחר מוצג כטקסט, כדי שתוכן לא יוכל
    // להפוך לקישור יוצא (או ל-javascript:) בלי שינוי קוד.
    if (href.startsWith("/")) {
      out.push(
        <a
          key={`${keyPrefix}-${m.index}`}
          href={href}
          style={{ color: "var(--acc)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          {m[1]}
        </a>
      );
    } else {
      out.push(m[1]);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function BlockView({ block, lang, i }: { block: Block; lang: "he" | "en"; i: number }) {
  if (block.type === "h2") {
    return (
      <h2
        style={{
          margin: "44px 0 14px",
          fontWeight: 800,
          fontSize: "clamp(22px,2.8vw,30px)",
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          fontFamily: HEEBO,
        }}
      >
        {lang === "he" ? block.text : block.textEn}
      </h2>
    );
  }

  if (block.type === "p") {
    const text = lang === "he" ? block.text : block.textEn;
    return (
      <p style={{ margin: "0 0 18px", color: "var(--ink)", fontSize: "clamp(16.5px,1.5vw,18.5px)", lineHeight: 1.85, fontFamily: HEEBO }}>
        {withLinks(text, `p${i}`)}
      </p>
    );
  }

  if (block.type === "ul") {
    const items = lang === "he" ? block.items : block.itemsEn;
    return (
      // paddingInlineStart ולא paddingLeft, כדי שהתבליטים יישבו נכון גם ב-RTL וגם ב-LTR
      <ul style={{ margin: "0 0 22px", paddingInlineStart: 22, listStyle: "none" }}>
        {items.map((it, k) => (
          <li
            key={k}
            style={{
              position: "relative",
              margin: "0 0 12px",
              color: "var(--ink)",
              fontSize: "clamp(16px,1.45vw,17.5px)",
              lineHeight: 1.8,
              fontFamily: HEEBO,
            }}
          >
            <span aria-hidden style={{ color: "var(--acc)", fontWeight: 800, marginInlineEnd: 8 }}>
              ·
            </span>
            {withLinks(it, `li${i}-${k}`)}
          </li>
        ))}
      </ul>
    );
  }

  // note
  return (
    <div
      style={{
        margin: "0 0 24px",
        background: "rgba(242,98,46,.07)",
        border: "1px solid rgba(242,98,46,.3)",
        borderRadius: 16,
        padding: "18px 20px",
      }}
    >
      <p style={{ margin: 0, color: "var(--ink)", fontSize: 16.5, lineHeight: 1.75, fontWeight: 600, fontFamily: HEEBO }}>
        {withLinks(lang === "he" ? block.text : block.textEn, `n${i}`)}
      </p>
    </div>
  );
}

export default function PostArticle({ post, related }: { post: Post; related: Post[] }) {
  const { lang } = useLang();
  const dir = lang === "he" ? "rtl" : "ltr";
  const he = lang === "he";

  const title = he ? post.title : post.titleEn;
  const desc = he ? post.description : post.descriptionEn;
  const tag = he ? post.tag : post.tagEn;

  const date = new Date(post.date).toLocaleDateString(he ? "he-IL" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const waMsg = he
    ? `היי שני, קראתי את המאמר "${post.title}" ואשמח לשאול משהו`
    : `Hi Shani, I read "${post.titleEn}" and would like to ask something`;

  return (
    <div dir={dir} style={{ fontFamily: HEEBO }}>
      <main style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "clamp(120px,14vw,170px) clamp(20px,5vw,40px) 0" }}>
        <a
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 44,
            color: "var(--muted2)",
            fontSize: 14.5,
            textDecoration: "none",
            fontFamily: HEEBO,
          }}
        >
          {he ? "כל המאמרים ←" : "← All articles"}
        </a>

        <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".18em", color: "var(--acc)", textTransform: "uppercase", margin: "10px 0 14px" }}>
          {tag}
        </div>

        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.06, letterSpacing: "-0.03em", color: "var(--ink)" }}>
          {title}
        </h1>

        <p style={{ margin: "20px 0 0", color: "var(--muted2)", fontSize: "clamp(16.5px,1.6vw,19px)", lineHeight: 1.75 }}>{desc}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", margin: "18px 0 0", color: "var(--muted2)", fontFamily: MONO, fontSize: 12.5 }}>
          <time dateTime={post.date}>{date}</time>
          <span aria-hidden>·</span>
          <span>{he ? `${post.readingMinutes} דקות קריאה` : `${post.readingMinutes} min read`}</span>
        </div>

        <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "30px 0 34px" }} />

        <article>
          {post.body.map((b, i) => (
            <BlockView key={i} block={b} lang={lang} i={i} />
          ))}
        </article>

        {/* CTA */}
        <div
          style={{
            marginTop: 46,
            background: "linear-gradient(135deg, rgba(242,98,46,.14), rgba(242,98,46,.05))",
            border: "1px solid rgba(242,98,46,.4)",
            borderRadius: 22,
            padding: "32px 26px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: 800, fontSize: "clamp(22px,3vw,30px)", color: "var(--ink)", margin: "0 0 10px" }}>
            {he ? "הצעד הראשון לא עולה כלום." : "The first step costs nothing."}
          </h2>
          <p style={{ margin: "0 0 22px", color: "var(--muted2)", fontSize: 16, lineHeight: 1.7 }}>
            {he
              ? "אבחון קצר, ותוך יום עסקים תדעו אילו כיוונים שווה לבדוק בעסק שלכם."
              : "A short audit, and within one business day you will know which directions are worth exploring."}
          </p>
          <a
            href="/audit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              background: "var(--acc)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              padding: "14px 30px",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            {he ? "לאבחון החינמי" : "Start the free audit"}
          </a>
          <div style={{ marginTop: 14 }}>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", minHeight: 44, color: "var(--muted2)", fontSize: 14, textDecoration: "underline" }}
            >
              {he ? "מעדיפים לדבר עכשיו? וואטסאפ" : "Prefer to talk now? WhatsApp"}
            </a>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section style={{ marginTop: 56 }}>
            <h2 style={{ fontWeight: 800, fontSize: 22, color: "var(--ink)", margin: "0 0 18px" }}>
              {he ? "עוד מאמרים" : "More articles"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  style={{
                    display: "block",
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: 18,
                    padding: 20,
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".18em", color: "var(--acc)", textTransform: "uppercase" }}>
                    {he ? r.tag : r.tagEn}
                  </span>
                  <h3 style={{ margin: "8px 0 0", fontWeight: 800, fontSize: 17.5, lineHeight: 1.3, color: "var(--ink)" }}>
                    {he ? r.title : r.titleEn}
                  </h3>
                </a>
              ))}
            </div>
          </section>
        )}

        <div style={{ height: 90 }} />
      </main>
      <Footer />
    </div>
  );
}
