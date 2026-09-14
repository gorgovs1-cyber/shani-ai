import type { Metadata, Viewport } from "next";
import { Inter, Rubik, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SplashScreen from "@/components/SplashScreen";
import SkipLink from "@/components/SkipLink";
import AccessibilityWidget from "@/components/AccessibilityWidget";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://shani-ai.com"),
  title: "אתרים ואוטומציות לעסקים בישראל | שני גורגוב",
  description: "שני גורגוב בונה לעסקים בישראל את האתר, הוואטסאפ והאוטומציות כמערכת אחת. פחות פניות שמתפספסות ופחות עבודה ידנית. מתחילים בבדיקת התאמה חינם.",
  keywords: ["AI", "אוטומציה", "אתרים", "GSAP", "Next.js", "ישראל", "שני גורגוב", "פיתוח אתרים", "AI ישראל", "בניית אתרים"],
  openGraph: {
    title: "אתר, וואטסאפ ואוטומציות שעובדים יחד | שני גורגוב",
    description: "אתרים ומערכות לעסקים בישראל, עם חיבור לוואטסאפ ותהליכים שמפחיתים עבודה ידנית.",
    siteName: "Shani AI Creator",
    type: "website",
    locale: "he_IL",
    url: "https://shani-ai.com",
    images: [{ url: "/og.jpg", width: 1080, height: 1080, alt: "Shani AI Creator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shani AI Creator",
    description: "אתר, וואטסאפ ואוטומציות לעסקים בישראל. בדיקת התאמה חינם.",
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

// viewportFit: "cover" is required for env(safe-area-inset-*) to return anything
// but 0. Without it the floating WhatsApp button, the accessibility widget and
// the cookie banner all sit on the home indicator on modern iPhones.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${inter.variable} ${heebo.variable} ${playfair.variable} ${mono.variable}`}
    >
      <body>
        {/* Schema.org — ProfessionalService (local SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Shani AI Creator",
              alternateName: "שני גורגוב · Shani AI Creator",
              description:
                "בניית אתרים, חיבור לוואטסאפ ואוטומציות לעסקים בישראל. ייעוץ, תכנון והקמה לפי הצורך העסקי.",
              url: "https://shani-ai.com",
              telephone: "+972-50-4744815",
              email: "shani.creates.ai@gmail.com",
              image: "https://shani-ai.com/og.jpg",
              logo: "https://shani-ai.com/logo.svg",
              priceRange: "₪₪₪",
              areaServed: [
                { "@type": "City", name: "תל אביב" },
                { "@type": "City", name: "רמת גן" },
                { "@type": "City", name: "הרצליה" },
                { "@type": "City", name: "ירושלים" },
                { "@type": "City", name: "חיפה" },
                { "@type": "City", name: "באר שבע" },
                { "@type": "City", name: "השרון" },
                { "@type": "Country", name: "ישראל" },
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
            }),
          }}
        />
        <LanguageProvider>
          <SkipLink />
          <SplashScreen />
          <ScrollReveal />
          <div id="cursor-dot" aria-hidden="true" />
          <div id="cursor-ring" aria-hidden="true" />
          <LenisProvider>
            <Nav />
            <main id="main-content">
              <PageTransition>{children}</PageTransition>
            </main>
          </LenisProvider>
          <CustomCursor />
          <FloatingWhatsApp />
          <AccessibilityWidget />
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
