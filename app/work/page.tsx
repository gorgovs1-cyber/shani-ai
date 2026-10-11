import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import Footer from "@/components/Footer";
import ProjectListing from "@/components/ProjectListing";

const heMeta: Metadata = {
  title: "עבודות: אתרים, מערכות ואוטומציות | Shani AI Creator",
  description: "אתרים, מערכות ואוטומציות: דוגמאות לעבודות שמחברות בין הנוכחות הדיגיטלית להתנהלות היומיומית של העסק. כל פרויקט עם הבעיה, הפתרון והתוצאה.",
  alternates: { canonical: "https://shani-ai.com/work" },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/work", heMeta, {
    title: "Work: websites, systems and automations | Shani AI Creator",
    description: "Websites, systems and automations: examples of work that connects a business's online presence to its daily operations, each with the problem, the solution and the result.",
  });
}

export default function WorkPage() {
  return <><ProjectListing /><Footer /></>;
}
