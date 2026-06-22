export type Post = {
  slug: string;
  date: string;       // ISO yyyy-mm-dd
  readTime: number;   // minutes
  tags: string[];     // HE
  tagsEn: string[];   // EN
  title: string;      // HE
  titleEn: string;
  excerpt: string;    // HE
  excerptEn: string;
  body: string[];     // HE paragraphs
  bodyEn: string[];
  draft: boolean;     // true = שלד טיוטה, להרחיב לפני פרסום
};

// NOTE: these are DRAFT outlines (intro only). Expand the body before publishing.
export const posts: Post[] = [
  {
    slug: "system-not-website",
    date: "2026-06-22",
    readTime: 4,
    tags: ["אסטרטגיה", "מערכות", "עסקים קטנים"],
    tagsEn: ["Strategy", "Systems", "Small business"],
    title: "למה רוב בעלי העסקים לא צריכים אתר — הם צריכים מערכת",
    titleEn: "Why most business owners don't need a website — they need a system",
    excerpt:
      "אתר יפה שלא חוסך לך זמן הוא ברושור יקר. ההבדל בין אתר למערכת הוא ההבדל בין להיראות טוב לבין לעבוד פחות.",
    excerptEn:
      "A pretty website that doesn't save you time is an expensive brochure. The difference between a website and a system is the difference between looking good and working less.",
    body: [
      "במשך שנים כעצמאית חשבתי שמה שחסר לי זה אתר יפה יותר. רק כשעברתי לעבוד עם AI הבנתי שטעיתי בשאלה.",
      "אתר הוא חלון ראווה. מערכת היא מה שקורה מאחורי החלון — איך פנייה הופכת ללקוח, איך לקוח הופך לתשלום, ואיך כל זה קורה בלי שתעני לכל הודעה ידנית.",
      "בפוסט הזה אני אפרק את ההבדל, ואראה מתי אתר באמת מספיק — ומתי הוא בזבוז כסף.",
    ],
    bodyEn: [
      "For years as a freelancer I thought what I was missing was a prettier website. Only when I moved to working with AI did I realize I was asking the wrong question.",
      "A website is a storefront. A system is what happens behind the glass — how an inquiry becomes a client, how a client becomes a payment, and how all of it happens without you answering every message by hand.",
      "In this post I'll break down the difference, and show when a website really is enough — and when it's a waste of money.",
    ],
    draft: true,
  },
  {
    slug: "whatsapp-automations-israel",
    date: "2026-06-18",
    readTime: 5,
    tags: ["אוטומציה", "וואטסאפ", "עסקים בישראל"],
    tagsEn: ["Automation", "WhatsApp", "Israeli business"],
    title: "3 אוטומציות וואטסאפ שכל עסק קטן בישראל צריך",
    titleEn: "3 WhatsApp automations every small business in Israel needs",
    excerpt:
      "בישראל העסק נסגר בוואטסאפ — לא במייל. אז למה רוב העסקים עדיין מנהלים את זה ידני? שלוש אוטומציות שמחזירות לך שעות.",
    excerptEn:
      "In Israel business gets closed on WhatsApp — not email. So why do most businesses still run it by hand? Three automations that buy back your hours.",
    body: [
      "כל בעל עסק בישראל מכיר את זה: הטלפון לא מפסיק לזמזם, וכל הודעה דורשת תשובה. ניהלתי עסק ככה שנים, אז אני יודעת בדיוק כמה זה שוחק.",
      "הבשורה: רוב ההודעות האלה חוזרות על עצמן. מענה ראשוני, תיאום, תזכורת. כל אחת מהן אפשר להפוך לאוטומציה — בלי לאבד את הטון האישי.",
      "כאן אפרט שלוש אוטומציות וואטסאפ שאני בונה לעסקים קטנים, ומה כל אחת חוסכת בפועל.",
    ],
    bodyEn: [
      "Every business owner in Israel knows the feeling: the phone won't stop buzzing, and every message wants a reply. I ran a business like that for years, so I know exactly how draining it is.",
      "The good news: most of those messages repeat. First response, scheduling, reminders. Each one can become an automation — without losing the personal tone.",
      "Here I'll lay out three WhatsApp automations I build for small businesses, and what each one actually saves.",
    ],
    draft: true,
  },
  {
    slug: "ten-years-before-ai",
    date: "2026-06-12",
    readTime: 6,
    tags: ["סיפור אישי", "עצמאות", "AI"],
    tagsEn: ["Personal", "Freelancing", "AI"],
    title: "מה 10 שנים כעצמאית לימדו אותי לפני שעברתי ל-AI",
    titleEn: "What 10 years of freelancing taught me before I moved to AI",
    excerpt:
      "לא הגעתי לעולם ה-AI מההייטק. הגעתי אליו מעשר שנים של עסק משלי — וזה בדיוק היתרון.",
    excerptEn:
      "I didn't come to AI from hi-tech. I came to it from ten years of running my own business — and that's exactly the advantage.",
    body: [
      "כשאני אומרת לאנשים שאני בונה אתרים ואוטומציות, ההנחה היא שאני מתכנתת ותיקה. האמת אחרת: עשר שנים הייתי עצמאית בעולם אחר לגמרי.",
      "השנים האלה לימדו אותי משהו שאי אפשר ללמוד בקורס — איך עסק קטן באמת מרגיש מבפנים: הלחץ, התזרים, ההחלטות בלי רשת ביטחון.",
      "כשפגשתי את ה-AI, לא ראיתי טכנולוגיה. ראיתי את כל הכלים שהיו חסרים לי אז. בפוסט הזה אני מספרת איך הניסיון העסקי הפך ליתרון התחרותי שלי.",
    ],
    bodyEn: [
      "When I tell people I build websites and automations, they assume I'm a veteran programmer. The truth is different: for ten years I was a freelancer in a completely different world.",
      "Those years taught me something you can't learn in a course — how a small business actually feels from the inside: the pressure, the cash flow, the decisions with no safety net.",
      "When I met AI, I didn't see technology. I saw all the tools I'd been missing back then. In this post I share how business experience became my competitive edge.",
    ],
    draft: true,
  },
];

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
