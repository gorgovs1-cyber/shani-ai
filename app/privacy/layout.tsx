import type { Metadata } from "next";

// The privacy page itself is a client component, so it can't export metadata.
// This layout supplies it — and, critically, its own canonical: without one it
// inherits the root canonical and tells Google it *is* the homepage.
export const metadata: Metadata = {
  title: "מדיניות פרטיות · Shani AI Creator",
  description:
    "איזה מידע נאסף באתר של Shani AI Creator (שני גורגוב), למה הוא משמש, אילו עוגיות פועלות, מי הספקים שמעבדים אותו, ומה הזכויות שלכם לפי חוק הגנת הפרטיות.",
  alternates: { canonical: "https://shani-ai.com/privacy" },
  openGraph: {
    title: "מדיניות פרטיות · Shani AI Creator",
    description: "מדיניות הפרטיות של Shani AI Creator (שני גורגוב).",
    url: "https://shani-ai.com/privacy",
    type: "website",
    locale: "he_IL",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
