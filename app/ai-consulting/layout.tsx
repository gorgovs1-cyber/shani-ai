import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "בדיקת התאמה לעסק | Shani AI Creator",
  description: "אבחון קצר ללא עלות כדי להבין מה נכון לבנות ולחבר בעסק.",
  robots: { index: false, follow: true },
};

export default function FormerConsultingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
