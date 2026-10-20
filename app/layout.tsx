import type { Metadata, Viewport } from "next";
import { localizedMeta, requestLang } from "@/lib/seo";
import { Inter, Rubik, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import LenisProvider from "@/components/LenisProvider";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SkipLink from "@/components/SkipLink";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import LanguageProvider from "@/components/LanguageProvider";
import { Analytics } from "@vercel/analytics/react";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import CookieConsent from "@/components/CookieConsent";
import StickyAssessment from "@/components/StickyAssessment";

// Latin headings + body
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Hebrew headings + body
const heebo = Rubik({ subsets: ["hebrew", "latin"], variable: "--font-heebo", display: "swap", weight: ["400", "500", "700", "800", "900"] });
// Latin emphasis word (italic)
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", style: ["italic", "normal"], weight: ["500", "600", "700"] });
// System / tags / dates / boot screen (both languages)
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "700"] });

const heMeta: Metadata = {
  metadataBase: new URL("https://shani-ai.com"),
  title: "צ׳אטבוטים וסוכני AI, CRM ואתרים לעסקים | שני גורגוב",
  description: "שני גורגוב בונה לעסקים בישראל ובארה״ב צ׳אטבוטים וסוכני AI, מערכת CRM מודולרית, אתרים ואוטומציות, בשיתוף עם ai2u.pro של ליאור. מתחילים בבדיקת התאמה חינם.",
  keywords: ["צ׳אטבוט לעסק", "סוכן AI", "CRM", "אוטומציה", "בניית אתרים", "ישראל", "ארה״ב", "Shani AI Creator"],
  openGraph: {
    title: "צ׳אטבוטים וסוכני AI, CRM ואתרים לעסקים | שני גורגוב",
    description: "צ׳אטבוטים וסוכני AI, CRM מודולרי, אתרים ואוטומציות לעסקים בישראל ובארה״ב.",
    siteName: "Shani AI Creator",
    type: "website",
    locale: "he_IL",
    url: "https://shani-ai.com",
    images: [{ url: "/og.jpg", width: 1080, height: 1080, alt: "Shani AI Creator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "צ׳אטבוטים וסוכני AI, CRM ואתרים לעסקים | שני גורגוב",
    description: "צ׳אטבוטים וסוכני AI, CRM, אתרים ואוטומציות לעסקים בישראל ובארה״ב. בדיקת התאמה חינם.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://shani-ai.com",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/", heMeta, {
    title: "AI chatbots, agents, CRM and websites | Shani Gorgov",
    description: "AI chatbots and agents, a modular CRM, websites and automations for businesses in Israel and the US, with partner Lior of ai2u.pro. Start with a free fit check.",
  });
}

// viewportFit: "cover" is required for env(safe-area-inset-*) to return anything
// but 0. Without it the floating WhatsApp button and cookie banner sit on the
// home indicator on modern iPhones.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = requestLang();
  return (
    <html
      lang={lang}
      dir={lang === "en" ? "ltr" : "rtl"}
      className={`${inter.variable} ${heebo.variable} ${playfair.variable} ${mono.variable}`}
    >
      <body>
        {/* Schema.org — ProfessionalService (local SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
              {
              "@type": "WebSite",
              "@id": "https://shani-ai.com/#website",
              url: "https://shani-ai.com",
              name: "Shani AI Creator",
              inLanguage: "he-IL",
              publisher: { "@id": "https://shani-ai.com/#business" },
              },
              {
              "@type": "Person",
              "@id": "https://shani-ai.com/#shani",
              name: "שני גורגוב",
              alternateName: "Shani Gorgov",
              url: "https://shani-ai.com",
              worksFor: { "@id": "https://shani-ai.com/#business" },
              sameAs: [
                "https://www.instagram.com/shani.creates.ai/",
                "https://www.tiktok.com/@shani.creates.ai",
                "https://www.linkedin.com/in/shani-ai/",
              ],
              },
              {
              "@type": "ProfessionalService",
              "@id": "https://shani-ai.com/#business",
              founder: { "@id": "https://shani-ai.com/#shani" },
              name: "Shani AI Creator",
              alternateName: "SHANI AI",
              description:
                "צ׳אטבוטים וסוכני AI, מערכת CRM מודולרית, אתרים ואוטומציות לעסקים בישראל ובארה״ב.",
              url: "https://shani-ai.com",
              telephone: "+972-50-4744815",
              email: "shani.creates.ai@gmail.com",
              image: "https://shani-ai.com/og.jpg",
              logo: "https://shani-ai.com/logo.svg",
              areaServed: [
                { "@type": "City", name: "תל אביב" },
                { "@type": "City", name: "רמת גן" },
                { "@type": "City", name: "הרצליה" },
                { "@type": "City", name: "ירושלים" },
                { "@type": "City", name: "חיפה" },
                { "@type": "City", name: "באר שבע" },
                { "@type": "City", name: "השרון" },
                { "@type": "Country", name: "ישראל" },
                { "@type": "Country", name: "United States" },
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "IL",
                addressRegion: "גוש דן",
              },
              knowsLanguage: ["he", "en"],
              sameAs: [
                "https://www.instagram.com/shani.creates.ai/",
                "https://www.tiktok.com/@shani.creates.ai",
                "https://www.linkedin.com/in/shani-ai/",
              ],
              },
              ],
            }),
          }}
        />
        <LanguageProvider initialLang={lang}>
          <SkipLink />
          <ScrollReveal />
          <LenisProvider>
            <Nav />
            <main id="main-content">
              <PageTransition>{children}</PageTransition>
            </main>
          </LenisProvider>
          <FloatingWhatsApp />
          {/* Cookie consent banner — gates GA4 + Meta Pixel below */}
          <CookieConsent />
          <StickyAssessment />
        </LanguageProvider>
        <Analytics />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
