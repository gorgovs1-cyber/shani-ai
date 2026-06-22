// ─── SHANI AI — BILINGUAL DICTIONARY (HE / EN) ───
// Phase 1 covers: nav, hero, ROI calculator, trusted-by, boot screen.
// Later phases (portfolio, blog, services, etc.) extend this dictionary.

export type Lang = "he" | "en";

export const dirOf = (l: Lang): "rtl" | "ltr" => (l === "he" ? "rtl" : "ltr");

/** A headline token. `em` marks the emphasis word, styled per-language in the component. */
export type TitleToken = { text: string; em?: boolean };

export const dict = {
  he: {
    nav: {
      links: [
        { label: "עבודות", href: "#work" },
        { label: "שירותים", href: "#services" },
        { label: "עליי", href: "#about" },
      ],
      cta: "דברי איתי",
      menu: "תפריט",
    },
    hero: {
      badge: "זמינה לפרויקטים חדשים",
      title: [
        { text: "אני הופכת עסקים" },
        { text: "מבולגנים למערכות" },
        { text: "שעובדות לבד.", em: true },
      ] as TitleToken[],
      subPre: "אתרים, אוטומציות וכלי AI שחוסכים לעסק שלך ",
      subStrong: "5 עד 20 שעות בשבוע.",
      ctaPrimary: "בדיקת AI לעסק — ללא עלות",
      ctaSecondary: "ראי את העבודות",
      responseLine: "תגובה תוך 24 שעות · ישראל",
      trust: [
        "10+ שנות ניסיון עסקי",
        "20+ שעות נחסכות בשבוע ללקוח",
        "תגובה תוך 24 שעות",
        "מבוססת בישראל",
      ],
    },
    roi: {
      label: "כמה זמן את מבזבזת?",
      title: "חשבי כמה שווה הזמן שלך",
      hoursLabel: "שעות עבודה ידנית בשבוע",
      hoursUnit: "שעות",
      rateLabel: "שווי שעת העבודה שלך (₪)",
      resultPre: "אוטומציה יכולה לחסוך לך",
      perMonth: "בחודש",
      perYearTpl: "({v} ₪ בשנה)",
      cta: "בואי נחסוך את הזמן הזה",
    },
    trusted: {
      label: "לקוחות סומכים",
      title: "מותגים ועסקים שכבר עבדתי איתם",
    },
    work: {
      label: "עבודות נבחרות",
      title: "פרויקטים שמשנים את הסטנדרט",
      viewAll: "כל העבודות",
      back: "כל העבודות",
      about: "על הפרויקט",
      client: "לקוח",
      type: "סוג",
      tech: "טכנולוגיות",
      year: "שנה",
      viewProject: "צפה בפרויקט",
      discuss: "בואי נדבר על פרויקט דומה",
      next: "הפרויקט הבא",
    },
    testimonials: {
      label: "עדויות",
      title: "מה לקוחות אומרים",
      items: [
        { quote: "[להחליף בציטוט אמיתי מלקוחה]", name: "שם הלקוח/ה", role: "תפקיד / שם העסק" },
        { quote: "[להחליף בציטוט אמיתי מלקוחה]", name: "שם הלקוח/ה", role: "תפקיד / שם העסק" },
      ],
    },
    blog: {
      label: "מחשבות אחרונות",
      title: "מהשטח — על עסקים, AI ומה שביניהם",
      viewAll: "כל הפוסטים",
      readMore: "קראי עוד",
      minRead: "דק׳ קריאה",
      draft: "טיוטה",
    },
    boot: {
      skip: "לחצי לדילוג",
    },
    a11y: { langSwitch: "החלפת שפה" },
  },

  en: {
    nav: {
      links: [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "About", href: "#about" },
      ],
      cta: "Let's talk",
      menu: "Menu",
    },
    hero: {
      badge: "Available for new projects",
      title: [
        { text: "I turn messy" },
        { text: "businesses into systems" },
        { text: "that run themselves.", em: true },
      ] as TitleToken[],
      subPre: "Websites, automations and AI tools that save your business ",
      subStrong: "5 to 20 hours a week.",
      ctaPrimary: "Free AI audit for your business",
      ctaSecondary: "See the work",
      responseLine: "Reply within 24 hours · Israel",
      trust: [
        "10+ years in business",
        "20+ hours saved per week, per client",
        "Reply within 24 hours",
        "Based in Israel",
      ],
    },
    roi: {
      label: "How much time are you losing?",
      title: "See what your time is worth",
      hoursLabel: "Manual work hours per week",
      hoursUnit: "hrs",
      rateLabel: "Your hourly value (₪)",
      resultPre: "Automation could save you",
      perMonth: "per month",
      perYearTpl: "(₪{v} per year)",
      cta: "Let's save that time",
    },
    trusted: {
      label: "Trusted by",
      title: "Brands and businesses I've worked with",
    },
    work: {
      label: "Selected work",
      title: "Projects that raise the standard",
      viewAll: "All work",
      back: "All work",
      about: "About the project",
      client: "Client",
      type: "Type",
      tech: "Technologies",
      year: "Year",
      viewProject: "View project",
      discuss: "Let's talk about a similar project",
      next: "Next project",
    },
    testimonials: {
      label: "Testimonials",
      title: "What clients say",
      items: [
        { quote: "[Replace with a real client testimonial]", name: "Client name", role: "Role / business" },
        { quote: "[Replace with a real client testimonial]", name: "Client name", role: "Role / business" },
      ],
    },
    blog: {
      label: "Latest thoughts",
      title: "From the field — on business, AI and the space between",
      viewAll: "All posts",
      readMore: "Read more",
      minRead: "min read",
      draft: "Draft",
    },
    boot: {
      skip: "Tap to skip",
    },
    a11y: { langSwitch: "Switch language" },
  },
};

export type Dict = (typeof dict)["he"];
