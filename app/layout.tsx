import type { Metadata } from "next";
import { Inter, Heebo, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LanguageProvider from "@/components/LanguageProvider";

// Latin headings + body
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Hebrew headings + body
const heebo = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-heebo", display: "swap", weight: ["400", "500", "700", "800", "900"] });
// Latin emphasis word (italic)
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", style: ["italic", "normal"], weight: ["500", "600", "700"] });
// System / tags / dates / boot screen (both languages)
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Shani AI Creator — אתרים עם AI, אוטומציות וייעוץ לעסקים בישראל",
  description: "שני גורגוב — בונה אתרים קולנועיים, אוטומציות חכמות וכלי AI לעסקים. 10+ שנות ניסיון. GSAP, Next.js, Make.com. ישראל.",
  keywords: ["AI", "אוטומציה", "אתרים", "GSAP", "Next.js", "ישראל", "שני גורגוב", "פיתוח אתרים", "AI ישראל", "בניית אתרים"],
  openGraph: {
    title: "Shani AI Creator — אתרים, אוטומציות ו-AI לעסקים",
    description: "בונה לעסקים כלים דיגיטליים שחוסכים זמן ומרשימים לקוחות — מהר.",
    siteName: "Shani AI Creator",
    type: "website",
    locale: "he_IL",
    url: "https://shani-ai.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shani AI Creator",
    description: "אתרים קולנועיים, אוטומציות חכמות, AI לעסקים. ישראל.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://shani-ai.vercel.app",
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
          <div id="cursor-dot" aria-hidden="true" />
          <div id="cursor-ring" aria-hidden="true" />
          <LenisProvider>
            <Nav />
            <main id="main-content">{children}</main>
          </LenisProvider>
          <CustomCursor />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
