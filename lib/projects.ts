// ─── SHANI AI · מקור האמת היחיד לפרויקטים ───
// עד 17/08/2026 היו כאן שתי רשימות פרויקטים נפרדות: הקובץ הזה הזין את /work,
// ורשימה כפולה ב-lib/translations.ts הזינה את הגלריה בעמוד הבית. הן לא היו
// מסונכרנות, ולכן פרויקט שנוסף לאחת לא הופיע בשנייה.
// עכשיו הכל כאן. פרויקט שאמור להופיע בגלריית עמוד הבית מקבל בלוק `card`.

/** ההצגה של הפרויקט ככרטיס בגלריית עמוד הבית. בלי הבלוק הזה הוא מופיע רק ב-/work. */
export type ProjectCard = {
  /** סדר בגלריה, קטן קודם. מנותק מסדר המערך כדי ש-/work ו-/ יוכלו להיות שונים. */
  order: number;
  mono: string;
  /** לפעמים הכרטיס מקשר למקום ספציפי יותר מה-liveUrl (למשל /audit ולא לדף הבית). */
  url: string;
  /** שם קצר לכרטיס, אם השם המלא ארוך מדי לגלריה. */
  title?: string;
  /** צבע רקע מאחורי התצוגה המקדימה, עד שהיא נטענת. */
  bg: string;
  tags: string[];
  he: { kind: string; desc: string };
  en: { kind: string; desc: string };
  /** לופ וידאו אמיתי במקום צילום מסך אוטומטי. חובה יחד עם poster. */
  video?: string;
  poster?: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  categoryHe: string;
  year: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  tech: string[];
  accent: string;
  video?: string;
  liveUrl?: string;
  featured: boolean;
  /** true = הכרטיס מוצג בגלריה אבל אין לו עמוד פרויקט נפרד, והוא מקשר ישירות לאתר החי */
  noDetailPage?: boolean;
  /** נוכחות הבלוק הזה = הפרויקט מופיע בגלריית עמוד הבית. */
  card?: ProjectCard;
};

const SIGNAL = "#ff6a3d";

export const projects: Project[] = [
  {
    slug: "ai-lead-machine",
    title: "AI Lead Machine",
    client: "Shani AI Creator",
    category: "AI Automation",
    categoryHe: "אוטומציית AI",
    year: "2026",
    tagline: "עסקים שמפספסים לידים כי אין מי שיענה בזמן.",
    taglineEn: "Businesses losing leads because no one answers in time.",
    description:
      "בעיה: פניות נופלות בין הכיסאות ולקוחות אבודים. פתרון: מכונת לידים מקצה לקצה. טופס אבחון חכם, אוטומציית n8n, CRM בגוגל שיטס, מיילים ממותגים, ומנוע Claude שכותב תכנית והצעת מחיר מלאה לכל ליד, אוטומטית. תוצאה: כל פנייה מקבלת מענה ותכנית תוך שניות, 24/7, בלי מגע יד.",
    descriptionEn:
      "Problem: enquiries fall through the cracks and leads are lost. Solution: an end-to-end lead machine — a smart intake form, n8n automation, Google Sheets CRM, branded emails and a Claude engine that writes a full plan and proposal for every lead, automatically. Result: every enquiry gets a response and a plan within seconds, 24/7, hands-free.",
    tech: ["n8n", "Claude API", "Google Sheets", "Gmail API", "Webhooks", "HTML/CSS"],
    accent: SIGNAL,
    liveUrl: "https://shani-ai.com",
    featured: true,
    card: {
      order: 1,
      mono: "A",
      url: "https://shani-ai.com/audit",
      bg: "#141009",
      tags: ["Automation", "n8n", "Claude"],
      he: {
        kind: "אוטומציה",
        desc: "מכונת לידים מקצה לקצה: טופס אבחון חכם, אוטומציית n8n, CRM ומנוע Claude שכותב תכנית והצעת מחיר לכל פנייה. מענה תוך שניות, 24/7.",
      },
      en: {
        kind: "Automation",
        desc: "An end-to-end lead machine: a smart intake form, an n8n automation, a CRM, and a Claude engine that writes a plan and a proposal for every enquiry. A response within seconds, 24/7.",
      },
    },
  },
  {
    slug: "ai-content-engine",
    title: "AI Content Engine",
    client: "Shani AI Creator",
    category: "AI Automation",
    categoryHe: "אוטומציית AI",
    year: "2026",
    tagline: "יצירת תוכן עקבי אוכלת שעות בכל שבוע.",
    taglineEn: "Consistent content creation eats hours every week.",
    description:
      "בעיה: תוכן עקבי לרשתות דורש שעות בכל שבוע, והעקביות נשברת ברגע שהעומס עולה. פתרון: סוכן Claude שקורא מסמך מותג קבוע עם קול, צבעים, פורמטים ולוח פרסום, ומנסח שבוע שלם של תוכן: רילים, קרוסלות וסטוריז, מוכנים לעריכה קצרה ופרסום. תוצאה: מעבר משעות מול דף ריק לבחירה מתוך בנק תוכן מוכן, עם קול מותג אחיד לאורך זמן.",
    descriptionEn:
      "Problem: consistent social content takes hours every week, and consistency breaks the moment the workload rises. Solution: a Claude agent that reads a fixed brand document — voice, colors, formats and publishing calendar — and drafts a full week of content: reels, carousels and stories, ready for a quick edit and publish. Result: from hours in front of a blank page to picking from a ready content bank, with a consistent brand voice over time.",
    tech: ["Claude API", "Scheduled Agents", "n8n", "Brand System", "Content Ops"],
    accent: SIGNAL,
    featured: true,
  },
  {
    slug: "solis",
    title: "SOLIS",
    client: "Solis",
    category: "Cinematic Frontend",
    categoryHe: "פרונטאנד קולנועי",
    year: "2024",
    tagline: "מותג מיצים יוקרתי שנראה כמו כולם.",
    taglineEn: "A premium juice brand that looked like everyone else.",
    description:
      "בעיה: המותג נראה גנרי ולא שידר יוקרה. פתרון: חוויית גלילה קולנועית עם video scrubbing וסאונד אמביינט. תוצאה: אתר שגורם לאנשים לשתף ולזכור.",
    descriptionEn:
      "Problem: the brand looked generic and didn't convey premium. Solution: a cinematic scroll experience with video scrubbing and ambient sound. Result: a site people share and remember.",
    tech: ["GSAP", "ScrollTrigger", "Lenis", "Video Scrubbing", "HTML/CSS"],
    accent: SIGNAL,
    liveUrl: "https://solis-orange.vercel.app/",
    featured: true,
    card: {
      order: 5,
      mono: "S",
      title: "Solis",
      url: "https://solis-orange.vercel.app/",
      bg: "#1c1108",
      tags: ["Brand Experience", "Design"],
      he: { kind: "פרויקט הדגמה", desc: "חוויית מותג למשקה פרימיום." },
      en: { kind: "Demo Project", desc: "A premium beverage brand experience." },
    },
  },
  {
    slug: "rox-watch",
    title: "ROX | Meridian",
    client: "ROX",
    category: "Cinematic Frontend",
    categoryHe: "פרונטאנד קולנועי",
    year: "2024",
    tagline: "מותג שעונים שלא הצליח לשדר פרימיום.",
    taglineEn: "A watch brand that couldn't convey premium.",
    description:
      "בעיה: עיצוב שלא הלם את רמת המוצר. פתרון: חוויה ויזואלית עם אנימציות מכניות ואודיו אמביינט. תוצאה: נוכחות דיגיטלית ברמה של מותגי שעונים מובילים.",
    descriptionEn:
      "Problem: a design that didn't match the product's level. Solution: a visual experience with mechanical animations and ambient audio. Result: a digital presence on par with leading watch brands.",
    tech: ["GSAP", "ScrollTrigger", "Lenis", "Ambient Audio", "CSS Animation"],
    accent: SIGNAL,
    liveUrl: "https://meridian-watch-eight.vercel.app/",
    featured: true,
    card: {
      order: 4,
      mono: "R",
      title: "Rox",
      url: "https://meridian-watch-eight.vercel.app/",
      bg: "#080a0c",
      tags: ["Ecommerce", "Design"],
      he: { kind: "פרויקט הדגמה", desc: "חוויית איקומרס למותג שעוני יוקרה." },
      en: { kind: "Demo Project", desc: "A luxury watch ecommerce experience." },
    },
  },
  {
    slug: "lilach-hazan",
    title: "Lilach Hazan",
    client: "Lilach Hazan",
    category: "Client Website",
    categoryHe: "אתר תדמית",
    year: "2024",
    tagline: "מטפלת מוכשרת שלא הצליחה להעביר את הערך שלה אונליין.",
    taglineEn: "A talented therapist who couldn't convey her value online.",
    description:
      "בעיה: אתר ישן שלא יצר אמון ולא הביא פניות. פתרון: אתר חם ואנושי עם CTA ברורים וטפסי יצירת קשר. תוצאה: נוכחות דיגיטלית שמשקפת את הסמכות של המטפלת.",
    descriptionEn:
      "Problem: an old site that built no trust and brought no leads. Solution: a warm, human site with clear CTAs and contact forms. Result: a digital presence that reflects the therapist's authority.",
    tech: ["HTML/CSS/JS", "Responsive", "UI/UX", "CTA Optimization"],
    accent: SIGNAL,
    liveUrl: "https://www.lilachhazan.com/",
    featured: false,
    noDetailPage: true,
    card: {
      order: 3,
      mono: "L",
      url: "https://www.lilachhazan.com/",
      bg: "#faf8f5",
      tags: ["Website", "Client Work"],
      he: { kind: "פרויקט לקוח", desc: "אתר עסקי מקצועי שבניתי עבור לילך חזן." },
      en: { kind: "Client Project", desc: "A professional business website I built for Lilach Hazan." },
    },
  },
  {
    slug: "my-money",
    title: "My Money",
    client: "My Money",
    category: "SaaS / Full-Stack",
    categoryHe: "SaaS / פול-סטאק",
    year: "2024",
    tagline: "עצמאים שמבזבזים שעות על ניהול כספים ידני.",
    taglineEn: "Freelancers wasting hours on manual money management.",
    description:
      "בעיה: עצמאים מתקשים לעקוב אחרי תזרים מזומנים. פתרון: אפליקציית SaaS עם Google OAuth, סנכרון יומן וגוגל מייל, ודשבורד הכנסות/הוצאות בזמן אמת. תוצאה: חיסכון של שעות בחודש וראייה פיננסית ברורה.",
    descriptionEn:
      "Problem: freelancers struggle to track cash flow. Solution: a SaaS app with Google OAuth, calendar + Gmail sync, and a real-time income/expense dashboard. Result: hours saved each month and clear financial visibility.",
    tech: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Google OAuth 2.0",
      "Calendar API",
      "Gmail API",
      "Vercel",
    ],
    accent: SIGNAL,
    liveUrl: "https://my-money-app-shani7.vercel.app/",
    featured: true,
    card: {
      order: 2,
      mono: "M",
      url: "https://my-money-app-shani7.vercel.app/",
      bg: "#0b1628",
      tags: ["Web App", "Finance", "AI"],
      he: { kind: "מוצר אישי", desc: "פלטפורמה לניהול פיננסי שבניתי לעצמאיות ובעלות עסקים קטנים." },
      en: { kind: "Personal Product", desc: "A financial management platform designed for self-employed women and small business owners." },
    },
  },
  {
    slug: "or-eisenstadt",
    title: "אור איזנשטדט",
    client: "אור איזנשטדט",
    category: "Personal Brand",
    categoryHe: "מיתוג אישי",
    year: "2026",
    tagline: "מאמן ששיטת העבודה שלו קשה להסביר במילים.",
    taglineEn: "A coach whose method is hard to put into words.",
    description:
      "בעיה: תהליך אימון שמדבר על שינוי פנימי קשה להעביר בטקסט שיווקי, וכל ניסוח ישיר מדי נשמע כמו הבטחה. פתרון: אתר שבו אלמנט המותג עצמו מספר את הסיפור, פניקס שמשתנה לאורך הגלילה, לצד טקסט שקט שפונה קודם לאדם ורק אחר כך מסביר על השיטה. תוצאה: אתר שמעביר את הגישה עוד לפני שקוראים מילה, כולל התאמת נגישות לתקן הישראלי.",
    descriptionEn:
      "Problem: a coaching practice built on inner change is hard to convey in marketing copy, and anything too direct reads as a promise. Solution: a site where the brand element carries the story — a phoenix that transforms as you scroll — alongside quiet copy that speaks to the person first and explains the method second. Result: a site that conveys the approach before a word is read, built to the Israeli accessibility standard.",
    tech: ["HTML/CSS/JS", "Scroll Animation", "RTL", "נגישות 5568", "SEO"],
    accent: SIGNAL,
    liveUrl: "https://or-eisenstadt.vercel.app",
    featured: false,
    noDetailPage: true,
    card: {
      order: 6,
      mono: "O",
      url: "https://or-eisenstadt.vercel.app",
      bg: "#f4eee4",
      tags: ["Personal Brand", "RTL", "נגישות 5568"],
      he: { kind: "מיתוג אישי", desc: "אתר מאמן אישי בשיטת סאטיה, עם פניקס שמספר את הסיפור לאורך הדף." },
      en: { kind: "Personal Brand", desc: "A personal-training coach site built around the Satya method, with a phoenix motif that tells the story down the page." },
      video: "/projects/or-loop.mp4",
      poster: "/projects/or-poster.jpg",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/** הפרויקטים שמופיעים בגלריית עמוד הבית, לפי הסדר שנקבע ב-card.order. */
export const galleryProjects = projects
  .filter((p): p is Project & { card: ProjectCard } => Boolean(p.card))
  .sort((a, b) => a.card.order - b.card.order);
