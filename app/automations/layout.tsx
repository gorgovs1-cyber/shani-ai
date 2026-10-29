import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

const heMeta: Metadata = {
  title: "אוטומציות לעסק | Shani AI",
  description: "אוטומציות שחוסכות זמן: הפנייה נשמרת, נשלחים אישורים ותזכורות, בלי העתקות ידניות.",
  alternates: { canonical: "https://shani-ai.com/automations" },
  openGraph: {
    title: "אוטומציות לעסק · Shani AI",
    description: "אוטומציות שחוסכות זמן: הפנייה נשמרת, נשלחים אישורים ותזכורות, בלי העתקות ידניות.",
    url: "https://shani-ai.com/automations",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/automations", heMeta, {
    title: "Business automations | Shani AI",
    description: "Automations that save time: the enquiry is saved, confirmations and reminders go out, with no manual copying.",
  });
}

export default function AutomationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema path="/automations" he={{ name: "אוטומציות לעסק", description: "אוטומציות שחוסכות זמן: הפנייה נשמרת, נשלחים אישורים ותזכורות, בלי העתקות ידניות." }} en={{ name: "Business automations", description: "Automations that save time: the enquiry is saved, confirmations and reminders go out, with no manual copying." }} service={{ he: "אוטומציות לעסק", en: "Business automations" }} />
      {children}
    </>
  );
}
