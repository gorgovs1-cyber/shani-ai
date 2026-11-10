import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";

const heMeta: Metadata = {
  title: "הסרה מרשימת התפוצה · Shani AI",
  description:
    "בקשה להסרה מרשימת הדיוור של Shani AI Creator. ממלאים כתובת אימייל, הבקשה נשלחת לטיפול ידני תוך 24 שעות.",
  alternates: { canonical: "https://shani-ai.com/unsubscribe" },
  // An unsubscribe page has no business in search results: it is a private
  // action reached from a link inside an email, not a landing page.
  robots: { index: false, follow: false },
  openGraph: {
    title: "הסרה מרשימת התפוצה · Shani AI",
    description: "בקשה להסרה מרשימת הדיוור של Shani AI Creator.",
    url: "https://shani-ai.com/unsubscribe",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/unsubscribe", heMeta, {
    title: "Unsubscribe from the mailing list · Shani AI",
    description:
      "A request to be removed from the Shani AI Creator mailing list. Enter your email address and the request is handled manually within 24 hours.",
    ogDescription: "A request to be removed from the Shani AI Creator mailing list.",
  });
}

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
