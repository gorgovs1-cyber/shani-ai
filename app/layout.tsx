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
  title: "Shani Gorgov — Web & AI Product Builder",
  description: "שני גורגוב — בונה אתרים, דפי נחיתה ומוצרים דיגיטליים מודרניים בעזרת AI. ישראל.",
  keywords: ["אתרים", "דפי נחיתה", "Web App", "AI", "Next.js", "ישראל", "שני גורגוב"],
  openGraph: {
    title: "Shani Gorgov — Web & AI Product Builder",
    description: "בונה אתרים, דפי נחיתה ומוצרים דיגיטליים מודרניים בעזרת AI.",
    siteName: "Shani Gorgov",
    type: "website",
    locale: "he_IL",
    url: "https://shani-ai.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shani Gorgov — Web & AI Product Builder",
    description: "אתרים, דפי נחיתה ומוצרים דיגיטליים. ישראל.",
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
      style={{ fontFamily: "'Heebo', sans-serif" }}
    >
      <body>
        <LanguageProvider>
          <SplashScreen />
          <div id="cursor-dot" aria-hidden="true" />
          <div id="cursor-ring" aria-hidden="true" />
          <LenisProvider>
            <Nav />
            <a
              href="#main-content"
              style={{
                position: "fixed",
                top: "-100px",
                left: 0,
                zIndex: 99999,
                background: "var(--acc)",
                color: "#fff",
                padding: "8px 16px",
                fontWeight: 700,
                transition: "top 0.2s",
              }}
              onFocus={(e) => { e.currentTarget.style.top = "0"; }}
              onBlur={(e) => { e.currentTarget.style.top = "-100px"; }}
            >
              Skip to main content
            </a>
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
