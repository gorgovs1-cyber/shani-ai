import type { Metadata } from "next";
import { requestLang } from "@/lib/seo";
import NotFoundContent from "@/components/NotFoundContent";
import Footer from "@/components/Footer";

// A real 404 page: its own title and robots, no canonical (the root one would point at the home page),
// and the site's header and footer instead of the framework default.
export function generateMetadata(): Metadata {
  const en = requestLang() === "en";
  return {
    title: en ? "Page not found · Shani AI" : "הדף לא נמצא · Shani AI",
    description: en ? "The page you were looking for was not found." : "הדף שחיפשתם לא נמצא.",
    robots: { index: false, follow: false },
    alternates: { canonical: null },
    openGraph: null,
    twitter: null,
  };
}

export default function NotFound() {
  return (
    <>
      <NotFoundContent />
      <Footer />
    </>
  );
}
