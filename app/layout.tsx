import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SplashScreen from "@/components/SplashScreen";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });

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
    <html lang="he" dir="rtl" className={`${inter.variable} ${syne.variable}`}>
      <body>
        <SplashScreen />
        <div id="cursor-dot" aria-hidden="true" />
        <div id="cursor-ring" aria-hidden="true" />
        <LenisProvider>
          <Nav />
          <main id="main-content">{children}</main>
        </LenisProvider>
        <AccessibilityWidget />
        <CustomCursor />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
