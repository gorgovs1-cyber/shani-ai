import type { Metadata } from "next";
import { Inter, Heebo, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SplashScreen from "@/components/SplashScreen";
import SkipLink from "@/components/SkipLink";
import ScrollReveal from "@/components/ScrollReveal";
import LanguageProvider from "@/components/LanguageProvider";
import { Analytics } from "@vercel/analytics/react";

// Latin headings + body
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Hebrew headings + body
const heebo = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-heebo", display: "swap", weight: ["400", "500", "700", "800", "900"] });
// Latin emphasis word (italic)
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", style: ["italic", "normal"], weight: ["500", "600", "700"] });
// System / tags / dates / boot screen (both languages)
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://shani-ai.com"),
  title: "Shani AI Creator · ייעוץ AI, אוטומציות, כלים ואתרים לעסקים",
  description: "שני גורגוב, Shani AI Creator. מכניסה AI לעסק שלכם: מיפוי ואסטרטגיה, אוטומציות חכמות, כלים וסקילים בעברית, ואתרים שמביאים לקוחות. 10+ שנות ניסיון. ישראל.",
  keywords: ["AI", "אוטומציה", "אתרים", "GSAP", "Next.js", "ישראל", "שני גורגוב", "פיתוח אתרים", "AI ישראל", "בניית אתרים"],
  openGraph: {
    title: "Shani AI Creator · AI, אוטומציות ואתרים לעסקים",
    description: "מכניסה AI לעסק שלכם: ייעוץ, אוטומציות, כלים ואתרים שמביאים לקוחות.",
    siteName: "Shani AI Creator",
    type: "website",
    locale: "he_IL",
    url: "https://shani-ai.com",
    images: [{ url: "/og.jpg", width: 1080, height: 1080, alt: "Shani AI Creator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shani AI Creator",
    description: "אתרים קולנועיים, אוטומציות חכמות, AI לעסקים. ישראל.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${inter.variable} ${heebo.variable} ${playfair.variable} ${mono.variable}`}
    >
      <body>
        <LanguageProvider>
          <SkipLink />
          <SplashScreen />
          <ScrollReveal />
          <div id="cursor-dot" aria-hidden="true" />
          <div id="cursor-ring" aria-hidden="true" />
          <LenisProvider>
            <Nav />
            <main id="main-content">{children}</main>
          </LenisProvider>
          <CustomCursor />
          <FloatingWhatsApp />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
