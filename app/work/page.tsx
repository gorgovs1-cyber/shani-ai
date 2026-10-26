import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import Footer from "@/components/Footer";
import ProjectListing from "@/components/ProjectListing";
import PageSchema from "@/components/PageSchema";

const heMeta: Metadata = {
  title: "עבודות: אתרים, מערכות ואוטומציות | Shani AI",
  description: "אתרים, מערכות ואוטומציות: דוגמאות לעבודות שמחברות בין הנוכחות הדיגיטלית להתנהלות היומיומית של העסק. כל פרויקט עם הבעיה, הפתרון והתוצאה.",
  alternates: { canonical: "https://shani-ai.com/work" },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/work", heMeta, {
    title: "Work: websites, systems and automations | Shani AI",
    description: "Websites, systems and automations: examples of work that connects a business's online presence to its daily operations, each with the problem, the solution and the result.",
  });
}

export default function WorkPage() {
  return (
    <>
      <PageSchema
        path="/work"
        type="CollectionPage"
        he={{ name: "עבודות: אתרים, מערכות ואוטומציות", description: "אתרים, מערכות ואוטומציות: דוגמאות לעבודות של Shani AI." }}
        en={{ name: "Work: websites, systems and automations", description: "Websites, systems and automations: examples of work by Shani AI." }}
      />
      <ProjectListing />
      <Footer />
    </>
  );
}
