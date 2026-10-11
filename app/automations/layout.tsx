import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";

const heMeta: Metadata = {
  title: "אוטומציות לעסק · אוטומציה לוואטסאפ ובוט לעסק | Shani AI Creator",
  description:
    "אוטומציות לעסק: פניות מהטופס נכנסות למערכת, וואטסאפ עונה, מיילים ותזכורות נשלחים לבד. פחות עבודה ידנית. מתחילים בבדיקת התאמה חינם.",
  alternates: { canonical: "https://shani-ai.com/automations" },
  openGraph: {
    title: "אוטומציות לעסק · Shani AI Creator",
    description: "אוטומציות לעסק: פניות, וואטסאפ, מיילים ו-CRM בלי עבודה ידנית.",
    url: "https://shani-ai.com/automations",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/automations", heMeta, {
    title: "Business automations and WhatsApp bots | Shani AI Creator",
    description: "Form enquiries land in one system, WhatsApp replies, and emails and reminders go out on their own. Less manual work. Start with a free fit check.",
  });
}

export default function AutomationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
