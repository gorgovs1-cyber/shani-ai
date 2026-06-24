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
  thumbnail: string;
  video?: string;
  liveUrl?: string;
  featured: boolean;
};

const SIGNAL = "#ff6a3d";

export const projects: Project[] = [
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
    thumbnail: "/projects/solis-thumb.jpg",
    video: "/solis.mp4",
    liveUrl: "https://solis-orange.vercel.app/",
    featured: true,
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
    thumbnail: "/projects/rox-thumb.jpg",
    liveUrl: "https://rox-watches.vercel.app/",
    featured: true,
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
    thumbnail: "/projects/lilach-thumb.jpg",
    liveUrl: "https://www.lilachhazan.com/",
    featured: false,
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
    thumbnail: "/projects/mymoney-thumb.jpg",
    liveUrl: "https://my-money-app-tau.vercel.app/",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
