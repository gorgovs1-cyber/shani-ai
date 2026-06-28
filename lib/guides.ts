// ─── SHANI AI, GUIDES / DOWNLOADS ───
// כל מדריך שמתפרסם כפוסט נוסף גם כאן. כדי להוסיף מדריך חדש:
//   1. שמרי את קובץ ה-HTML ב-public/guides/<file>.html
//   2. הוסיפי רשומה אחת למערך למטה.
// הקובץ נפתח לצפייה בדפדפן (עם אפשרות הדפסה/שמירה כ-PDF מתוך הדף).

export type Guide = {
  slug: string;        // מזהה ייחודי
  file: string;        // שם הקובץ ב-public/guides/
  date: string;        // ISO yyyy-mm-dd
  title: string;       // HE
  titleEn: string;
  description: string; // HE
  descriptionEn: string;
  tag: string;         // HE
  tagEn: string;
};

export const guides: Guide[] = [
  {
    slug: "claude-desktop-hebrew",
    file: "guide-hebrew-claude-desktop.html",
    date: "2026-06-28",
    title: "המדריך לעבודה עם Claude Desktop בעברית",
    titleEn: "The guide to working with Claude Desktop in Hebrew",
    description:
      "מדריך מלא להתקנה, הגדרה ושימוש יומיומי ב-Claude Desktop, כולל טיפים לכתיבת פרומפטים בעברית.",
    descriptionEn:
      "A complete guide to installing, setting up, and using Claude Desktop daily, including tips for writing prompts in Hebrew.",
    tag: "מדריך",
    tagEn: "Guide",
  },
  {
    slug: "5-prompts",
    file: "lead-magnet-5-prompts.html",
    date: "2026-06-28",
    title: "5 פרומפטים שחוסכים לעסק שלך 5 שעות בשבוע",
    titleEn: "5 prompts that save your business 5 hours a week",
    description:
      "חמישה פרומפטים מוכנים להעתקה, כתיבת תוכן, מענה ללקוחות, תמחור ועוד. פשוט להעתיק ולהדביק.",
    descriptionEn:
      "Five ready-to-copy prompts, content writing, customer replies, pricing and more. Just copy and paste.",
    tag: "פרומפטים",
    tagEn: "Prompts",
  },
  {
    slug: "content-calendar",
    file: "content-calendar-month1.html",
    date: "2026-06-28",
    title: "קלנדר תוכן לחודש הראשון",
    titleEn: "First-month content calendar",
    description:
      "תכנון תוכן מוכן לחודש שלם, רעיונות לפוסטים, רילים וסטוריז לעסק שמתחיל עם AI.",
    descriptionEn:
      "A ready-made content plan for a full month, ideas for posts, reels and stories for a business starting with AI.",
    tag: "תכנון",
    tagEn: "Planning",
  },
];

export const sortedGuides = [...guides].sort((a, b) => b.date.localeCompare(a.date));
