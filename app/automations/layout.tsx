import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "אוטומציות לעסק · אוטומציה לוואטסאפ ובוט לעסק | Shani AI Creator",
  description:
    "אוטומציות n8n + Claude שעובדות 24/7: לוכדות לידים, עונות בוואטסאפ, שולחות מיילים ומזינות CRM לבד. בוט וואטסאפ מ-₪700, אוטומציה בודדת מ-₪900. פחות עבודה ידנית, יותר תוצאות.",
  alternates: { canonical: "https://shani-ai.com/automations" },
  openGraph: {
    title: "אוטומציות לעסק · Shani AI Creator",
    description: "אוטומציות n8n + Claude שעובדות 24/7: לידים, וואטסאפ, מיילים ו-CRM.",
    url: "https://shani-ai.com/automations",
    type: "website",
    locale: "he_IL",
  },
};

export default function AutomationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
