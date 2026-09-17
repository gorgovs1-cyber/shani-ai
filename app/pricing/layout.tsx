import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מחירים · אתר, אוטומציה ו-AI לעסק | Shani AI Creator",
  description:
    "מחירון מלא ופומבי: דף נחיתה 1,500 ש\"ח, אתר 2,400 ש\"ח, בוט וואטסאפ 2,400 ש\"ח, סוכן AI 4,900 ש\"ח, מערכת מלאה 7,900 ש\"ח. כל המחירים סופיים, ועלויות כלים תמיד בנפרד ועל שמכם.",
  alternates: { canonical: "https://shani-ai.com/pricing" },
  openGraph: {
    title: "מחירים · Shani AI Creator",
    description: "מחירון מלא ופומבי לאתרים, אוטומציות וסוכני AI. מחירים סופיים, בלי הפתעות.",
    url: "https://shani-ai.com/pricing",
    type: "website",
    locale: "he_IL",
  },
};

const PRICE_SCHEMA = {"@context": "https://schema.org", "@type": "OfferCatalog", "@id": "https://shani-ai.com/pricing#catalog", "name": "מחירים · Shani AI Creator", "url": "https://shani-ai.com/pricing", "offeredBy": {"@id": "https://shani-ai.com/#business"}, "itemListElement": [{"@type": "OfferCatalog", "name": "אתרים", "itemListElement": [{"@type": "Offer", "name": "דף נחיתה", "price": "1500", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "דף נחיתה"}}, {"@type": "Offer", "name": "אתר", "price": "2400", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "אתר"}}, {"@type": "Offer", "name": "אתר פורטפוליו", "price": "3700", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "אתר פורטפוליו"}}, {"@type": "Offer", "name": "גרסה בשפה שנייה", "price": "600", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "גרסה בשפה שנייה"}}]}, {"@type": "OfferCatalog", "name": "אוטומציה ו-AI", "itemListElement": [{"@type": "Offer", "name": "דרגה 1 · אוטומציה בודדת", "price": "1400", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "דרגה 1 · אוטומציה בודדת"}}, {"@type": "Offer", "name": "דרגה 2 · בוט וואטסאפ", "price": "2400", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "דרגה 2 · בוט וואטסאפ"}}, {"@type": "Offer", "name": "דרגה 3 · סוכן AI שמדבר עברית", "price": "4900", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "דרגה 3 · סוכן AI שמדבר עברית"}}, {"@type": "Offer", "name": "דרגה 4 · מערכת AI מלאה", "price": "7900", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "דרגה 4 · מערכת AI מלאה"}}]}, {"@type": "OfferCatalog", "name": "Shani Care · ליווי חודשי", "itemListElement": [{"@type": "Offer", "name": "אתר", "price": "200", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "אתר"}, "priceSpecification": {"@type": "UnitPriceSpecification", "price": "200", "priceCurrency": "ILS", "unitCode": "MON"}}, {"@type": "Offer", "name": "אתר ואוטומציות", "price": "350", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "אתר ואוטומציות"}, "priceSpecification": {"@type": "UnitPriceSpecification", "price": "350", "priceCurrency": "ILS", "unitCode": "MON"}}, {"@type": "Offer", "name": "אתר, בוט או סוכן", "price": "450", "priceCurrency": "ILS", "itemOffered": {"@type": "Service", "name": "אתר, בוט או סוכן"}, "priceSpecification": {"@type": "UnitPriceSpecification", "price": "450", "priceCurrency": "ILS", "unitCode": "MON"}}]}]};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICE_SCHEMA) }} />
      {children}
    </>
  );
}
