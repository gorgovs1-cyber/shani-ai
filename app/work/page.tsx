import Footer from "@/components/Footer";
import ProjectListing from "@/components/ProjectListing";

export const metadata = {
  title: "עבודות: אתרים, מערכות ואוטומציות | Shani AI Creator",
  description: "אתרים, מערכות ואוטומציות: דוגמאות לעבודות שמחברות בין הנוכחות הדיגיטלית להתנהלות העסק.",
  alternates: { canonical: "https://shani-ai.com/work" },
};

export default function WorkPage() {
  return <><ProjectListing /><Footer /></>;
}
