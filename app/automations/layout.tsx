import type { Metadata } from "next";

export const metadata: Metadata = {
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

export default function AutomationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
