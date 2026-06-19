export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  tech: string[];
  accent: string;
  thumbnail: string; // path under /public/projects/
  video?: string;    // optional autoplay clip under /public/
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "solis",
    title: "SOLIS",
    category: "Cinematic Frontend",
    year: "2024",
    tagline: "מותג מיצים יוקרתי שנראה כמו כולם.",
    description:
      "בעיה: המותג נראה גנרי ולא שידר יוקרה. פתרון: חוויית גלילה קולנועית עם video scrubbing וסאונד אמביינט. תוצאה: אתר שגורם לאנשים לשתף ולזכור.",
    tech: ["GSAP", "ScrollTrigger", "Lenis", "Video Scrubbing", "HTML/CSS"],
    accent: "#D97706",
    thumbnail: "/projects/solis-thumb.jpg",
    video: "/solis.mp4",
    featured: true,
  },
  {
    slug: "rox-watch",
    title: "ROX | Meridian",
    category: "Cinematic Frontend",
    year: "2024",
    tagline: "מותג שעונים שלא הצליח לשדר פרימיום.",
    description:
      "בעיה: עיצוב שלא הלם את רמת המוצר. פתרון: חוויה ויזואלית עם אנימציות מכניות ואודיו אמביינט. תוצאה: נוכחות דיגיטלית ברמה של מותגי שעונים מובילים.",
    tech: ["GSAP", "ScrollTrigger", "Lenis", "Ambient Audio", "CSS Animation"],
    accent: "#7C3AED",
    thumbnail: "/projects/rox-thumb.jpg",
    featured: true,
  },
  {
    slug: "air-jordan",
    title: "AIR JORDAN",
    category: "Cinematic Frontend",
    year: "2024",
    tagline: "קולקציית נעליים פרימיום ללא חוויה פרימיום.",
    description:
      "בעיה: דף מוצר שלא שיקף את ערך הקולקציה. פתרון: video scrubbing עם soundscape ועיצוב mobile-first. תוצאה: חוויית קנייה שמרגישה כמו כניסה לחנות יוקרה.",
    tech: ["GSAP", "Video Scrubbing", "Lenis", "Responsive", "Motion Design"],
    accent: "#DC2626",
    thumbnail: "/projects/jordan-thumb.jpg",
    featured: true,
  },
  {
    slug: "lilach-hazan",
    title: "Lilach Hazan",
    category: "Client Website",
    year: "2024",
    tagline: "מטפלת מוכשרת שלא הצליחה להעביר את הערך שלה אונליין.",
    description:
      "בעיה: אתר ישן שלא יצר אמון ולא הביא פניות. פתרון: אתר חם ואנושי עם CTA ברורים וטפסי יצירת קשר. תוצאה: נוכחות דיגיטלית שמשקפת את הסמכות של המטפלת.",
    tech: ["HTML/CSS/JS", "Responsive", "UI/UX", "CTA Optimization"],
    accent: "#059669",
    thumbnail: "/projects/lilach-thumb.jpg",
    featured: false,
  },
  {
    slug: "my-money",
    title: "My Money",
    category: "SaaS / Full-Stack",
    year: "2024",
    tagline: "עצמאים שמבזבזים שעות על ניהול כספים ידני.",
    description:
      "בעיה: עצמאים מתקשים לעקוב אחרי תזרים מזומנים. פתרון: אפליקציית SaaS עם Google OAuth, סנכרון יומן וגוגל מייל, ודשבורד הכנסות/הוצאות בזמן אמת. תוצאה: חיסכון של שעות בחודש וראייה פיננסית ברורה.",
    tech: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Google OAuth 2.0",
      "Calendar API",
      "Gmail API",
      "Vercel",
    ],
    accent: "#1D4ED8",
    thumbnail: "/projects/mymoney-thumb.jpg",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
