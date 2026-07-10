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
    slug: "claude-canva-designs",
    file: "claude-canva-designs.html",
    date: "2026-07-10",
    title: "קלוד מעצב לכם את הפוסטים: חיבור Canva לקלוד",
    titleEn: "Let Claude design your posts: the Canva connector",
    description:
      "מחברים את Canva לקלוד, וכותבים משפט אחד. קלוד מחזיר פוסט או קרוסלה מעוצבים וקישור לעריכה בקנבה. כולל שלושה פרומפטים מוכנים.",
    descriptionEn:
      "Connect Canva to Claude and write one sentence. Claude returns a designed post or carousel plus an edit link in Canva. Includes three ready-to-copy prompts.",
    tag: "עיצוב",
    tagEn: "Design",
  },
  {
    slug: "chatgpt-in-excel",
    file: "chatgpt-in-excel.html",
    date: "2026-07-10",
    title: "ChatGPT בתוך האקסל",
    titleEn: "ChatGPT inside Excel and Google Sheets",
    description:
      "מדריך התקנה ושימוש מלא בעברית לתוסף הרשמי שמכניס את ChatGPT לתוך אקסל וגוגל שיטס. חמישה פרומפטים מוכנים לעסק קטן: תקציב, ניקוי נתונים, תיקון נוסחאות ועוד.",
    descriptionEn:
      "A full Hebrew install-and-use guide for the official add-in that brings ChatGPT into Excel and Google Sheets. Five ready prompts for small business: budgets, data cleanup, formula fixes and more.",
    tag: "מדריך",
    tagEn: "Guide",
  },
  {
    slug: "claude-watch-videos",
    file: "claude-watch-videos.html",
    date: "2026-07-10",
    title: "לתת ל-Claude לצפות בסרטוני וידאו",
    titleEn: "Let Claude watch videos",
    description:
      "התקנה מלאה של הסקיל /watch — Claude מוריד, צופה ומנתח ריילסים מאינסטגרם, טיקטוק ויוטיוב. מושלם לפירוק ריילסים של מתחרים.",
    descriptionEn:
      "Full install of the /watch skill — Claude downloads, watches and analyzes reels from Instagram, TikTok and YouTube. Perfect for breaking down competitors' reels.",
    tag: "מדריך",
    tagEn: "Guide",
  },
  {
    slug: "claude-to-income",
    file: "claude-to-income.html",
    date: "2026-07-05",
    title: "איך הופכים שורת קוד בקלוד להכנסה",
    titleEn: "How to turn a line of Claude code into income",
    description:
      "התהליך המלא לבניית אתרים ושירותי AI לעסקים קטנים ולמכור אותם. 6 פרומפטים מוכנים להעתקה.",
    descriptionEn:
      "The full process for building AI websites and services for small businesses and selling them. 6 ready-to-copy prompts.",
    tag: "הכנסה",
    tagEn: "Income",
  },
  {
    slug: "brand-website-ai",
    file: "build-brand-website.html",
    date: "2026-07-01",
    title: "לבנות אתר מותג בגלילה קולנועית עם AI",
    titleEn: "Build a cinematic brand website with AI",
    description:
      "השיטה לבניית אתר תדמית יוקרתי בקובץ אחד עם Claude — בלי קוד. כולל המפרט המדויק לבנייה.",
    descriptionEn:
      "The method for building a luxury single-file brand website with Claude — no code. Includes the exact build spec.",
    tag: "אתרים",
    tagEn: "Websites",
  },
  {
    slug: "n8n-claude-automations",
    file: "n8n-claude-automations.html",
    date: "2026-06-30",
    title: "לבנות אוטומציות n8n מפרומפט אחד עם Claude",
    titleEn: "Ship n8n automations from one prompt with Claude",
    description:
      "איך מקימים פרויקט Claude שמייצר אוטומציות n8n מוכנות לשימוש — בלי קוד, מתיאור בשפה רגילה. כולל ההוראות המדויקות ודוגמאות.",
    descriptionEn:
      "Set up a Claude Project that turns a single sentence into a working n8n automation — no code. Includes the exact instructions and examples.",
    tag: "אוטומציות",
    tagEn: "Automations",
  },
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
