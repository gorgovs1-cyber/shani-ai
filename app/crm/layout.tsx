import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

const heMeta: Metadata = {
  title: "מערכת CRM מודולרית | Shani AI",
  description: "מערכת CRM מודולרית: כל הפניות והשיחות במקום אחד, עם אפשרות להתחבר גם ל-CRM או לממשק אחר שלכם.",
  alternates: { canonical: "https://shani-ai.com/crm" },
  openGraph: {
    title: "מערכת CRM מודולרית · Shani AI",
    description: "מערכת CRM מודולרית: כל הפניות והשיחות במקום אחד, עם אפשרות להתחבר גם ל-CRM או לממשק אחר שלכם.",
    url: "https://shani-ai.com/crm",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/crm", heMeta, {
    title: "A modular CRM | Shani AI",
    description: "A modular CRM: every enquiry and conversation in one place, with the option to connect to your own CRM or another interface.",
  });
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema path="/crm" he={{ name: "מערכת CRM מודולרית", description: "מערכת CRM מודולרית: כל הפניות והשיחות במקום אחד, עם אפשרות להתחבר גם ל-CRM או לממשק אחר שלכם." }} en={{ name: "A modular CRM", description: "A modular CRM: every enquiry and conversation in one place, with the option to connect to your own CRM or another interface." }} service={{ he: "מערכת CRM מודולרית", en: "A modular CRM" }} />
      {children}
    </>
  );
}
