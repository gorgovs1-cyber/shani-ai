import type { Metadata } from "next";
import { Heebo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SplashScreen from "@/components/SplashScreen";
import LanguageProvider from "@/components/LanguageProvider";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import SkipLink from "@/components/SkipLink";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "בניית אתרים עסקיים ואוטומציה AI | שני גורגוב — ישראל",
  description:
    "שני גורגוב — אתרים קולנועיים, אוטומציות AI ושיחת מיפוי לעסקים קטנים ובינוניים בישראל. תגובה תוך 24 שעות.",
  keywords: ["בניית אתרים", "אתרים עסקיים", "דפי נחיתה", "אוטומציה AI", "AI לעסקים", "ישראל", "שני גורגוב", "SHANI AI CREATOR"],
  openGraph: {
    title: "שני גורגוב | SHANI AI CREATOR",
    description: "אתרים קולנועיים, אוטומציות AI ושיחת מיפוי לעסקים קטנים ובינוניים בישראל.",
    siteName: "SHANI AI CREATOR",
    type: "website",
    locale: "he_IL",
    url: "https://shani-ai.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "שני גורגוב | SHANI AI CREATOR",
    description: "אתרים קולנועיים, אוטומציות AI ושיחת מיפוי לעסקים בישראל.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://shani-ai.vercel.app" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "שני גורגוב | SHANI AI CREATOR",
              "url": "https://shani-ai.vercel.app",
              "telephone": "+972504744815",
              "email": "gorgovs1@gmail.com",
              "address": { "@type": "PostalAddress", "addressCountry": "IL" },
              "description": "בניית אתרים עסקיים, אוטומציות AI ושיחת מיפוי לעסקים קטנים ובינוניים בישראל",
              "priceRange": "₪₪",
              "knowsLanguage": ["he", "en"],
              "sameAs": [
                "https://www.instagram.com/shani.gorgov/",
                "https://www.linkedin.com/in/shani-gorgov/"
              ]
            })
          }}
        />
        <LanguageProvider>
          <SplashScreen />
          <div id="cursor-dot" aria-hidden="true" />
          <div id="cursor-ring" aria-hidden="true" />
          <LenisProvider>
            <SkipLink />
            <Nav />
            <main id="main-content">{children}</main>
          </LenisProvider>
          <AccessibilityWidget />
          <CustomCursor />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
