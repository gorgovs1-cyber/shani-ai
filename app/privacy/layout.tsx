import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

// The privacy page itself is a client component, so it can't export metadata.
// This layout supplies it — and, critically, its own canonical: without one it
// inherits the root canonical and tells Google it *is* the homepage.
const heMeta: Metadata = {
  title: "מדיניות פרטיות ועוגיות · Shani AI",
  description:
    "איזה מידע נאסף באתר של Shani AI Creator, למה הוא משמש, אילו עוגיות פועלות, מי הספקים שמעבדים אותו, ומה הזכויות שלכם לפי חוק הגנת הפרטיות.",
  alternates: { canonical: "https://shani-ai.com/privacy" },
  openGraph: {
    title: "מדיניות פרטיות ועוגיות · Shani AI",
    description: "מדיניות הפרטיות של Shani AI Creator.",
    url: "https://shani-ai.com/privacy",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/privacy", heMeta, {
    title: "Privacy policy · Shani AI",
    description: "What information this site collects, why, which cookies run, which providers process it, and your rights under Israeli privacy law.",
  });
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema path="/privacy" he={{ name: "מדיניות פרטיות ועוגיות", description: "איזה מידע נאסף באתר של Shani AI Creator, למה הוא משמש ומה הזכויות שלכם." }} en={{ name: "Privacy policy", description: "What information this site collects, why, and your rights under Israeli privacy law." }} dateModified="2026-10-26" />
      {children}
    </>
  );
}
