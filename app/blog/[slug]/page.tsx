import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getPost, sortedPosts } from "@/lib/posts";
import PostArticle from "@/components/PostArticle";

const BASE = "https://shani-ai.com";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `${BASE}/blog/${post.slug}`;
  return {
    title: `${post.title} · Shani AI Creator`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: "he_IL",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // עד שני מאמרים נוספים, בסדר החדש-קודם, בלי המאמר הנוכחי
  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // BlogPosting יורש מ-Article, אז סוג אחד מספיק ומדויק יותר משניהם.
  // inLanguage הוא he-IL כי הגרסה הקנונית של המאמר היא העברית; האנגלית
  // היא תצוגה חלופית של אותה כתובת ולא כתובת נפרדת.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    inLanguage: "he-IL",
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    wordCount: post.body.reduce(
      (n, b) => n + (b.type === "ul" ? b.items.join(" ") : b.text).split(/\s+/).filter(Boolean).length,
      0
    ),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },
    url: `${BASE}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "שני גורגוב",
      url: BASE,
      jobTitle: "יועצת AI ומפתחת אתרים",
    },
    publisher: {
      "@type": "Organization",
      name: "Shani AI Creator",
      url: BASE,
    },
    articleSection: post.tag,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PostArticle post={post} related={related} />
    </>
  );
}
