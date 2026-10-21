"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · אתרים",
    title: "אתר שמציג את העסק ומוביל לפנייה",
    lead:
      "אני בונה אתר שמסביר מה אתם עושים ומקל על לקוחות לפנות אליכם, והקוד נשאר בבעלות שלכם.",
    primaryCta: "דברו איתי על אתר",
    primaryWaMsg: "היי שני, אני רוצה לבנות אתר לעסק",
    secondaryCta: "איזה אתר מתאים לכם",
    includesTitle: "מה נכלל באתר",
    includes: [
      "אתר ייחודי לעסק שלכם, לא תבנית",
      "בנוי קודם למובייל, ונטען מהר",
      "מבנה מלא לקידום בגוגל (SEO)",
      "טופס פנייה וחיבור לוואטסאפ",
      "מדידה מובנית של פניות ופרסום",
      "בעלות מלאה על הקוד",
    ],
    products: {
      title: "איזה אתר מתאים לכם?",
      labels: { includes: "מה כלול", notFor: "מתי זה לא נכון", example: "לדוגמה" },
      items: [
        {
          name: "דף נחיתה",
          includes: "עד 3 חלקים בגלילה אחת, בלי תפריט ניווט, כפתור וואטסאפ קבוע.",
          notFor: "כמה שירותים שצריך להסביר לעומק? 'אתר' יעבוד טוב יותר.",
        },
        {
          name: "אתר",
          includes: "עמוד בית + 2-4 עמודים, כל אחד מדורג בנפרד בגוגל, וגלריית עבודות משותפת עד 10 פרויקטים.",
          notFor: "מוכרים מוצרים עם עגלת קניות? זו חנות. תיק עבודות גדול? 'אתר פורטפוליו' מתאים יותר.",
        },
        {
          name: "אתר פורטפוליו",
          includes: "הכל מ'אתר', ועד 10 פרויקטים עם עמוד נפרד ומדורג לכל אחד.",
          notFor: "עד 10 פרויקטים ולא כולם צריכים דירוג נפרד? 'אתר' עושה את העבודה בפחות, ואפשר להוסיף עמוד בודד בהמשך.",
        },
        {
          name: "גרסה בשפה שנייה",
          includes: "תרגום מלא, התאמת הפריסה לכיוון הפוך, ומתג מעבר שפה בראש העמוד.",
        },
      ],
    },
    alsoTitle: "ואחרי שהאתר באוויר",
    also: [
      { label: "אוטומציות", href: "/chatbots", desc: "האתר מביא פניות, והשאלה הבאה היא כמה מהר עונים עליהן. מערכת עושה את זה גם בשתיים בלילה." },
      { label: "צ׳אטבוטים וסוכני AI", href: "/chatbots", desc: "כשהאתר כבר מביא פניות, סוכן AI יכול להבין את השיחה ולקדם אותה לצעד הבא." },
    ],
    sections: [],
    faqTitle: "שאלות על אתרים",
    faqItems: [
      {
        q: "איך מתחילים לבנות אתר לעסק?",
        a: "ממלאים בדיקת התאמה קצרה בחינם, ותוך יום עסקים אני חוזרת עם כיוונים והצעה מסודרת.",
      },
      {
        q: "למה אני בונה אתרים בקוד?",
        a: "כך אפשר להתאים את העיצוב ואת החיבורים למה שהעסק צריך, בלי להיצמד לתבנית מוכנה. הקוד נשאר שלכם, ולכן אפשר להמשיך לעבוד עליו גם עם מפתח אחר.",
      },
      {
        q: "כמה זמן לוקח לבנות אתר?",
        a: "זה תלוי בסוג האתר ובחומרים שכבר יש. לפני שמתחילים נסכם את לוח הזמנים לפרויקט שלכם ואת מה שאצטרך מכם.",
      },
      {
        q: "אפשר לחבר את האתר לוואטסאפ ולמערכות של העסק?",
        a: "כן. אפשר לחבר את הפניות מהאתר למערכת שמרכזת את הפרטים, שולחת מענה או מזכירה לכם לחזור ללקוח, לפי מה שנבחר לבנות יחד.",
      },
      {
        q: "האתר יהיה מותאם למובייל?",
        a: "כן, וזה לא תוספת אלא נקודת המוצא. אני מתכננת קודם את מסך הטלפון ורק אחר כך את המחשב, כי רוב הגולשים מגיעים מהנייד. הכל נבדק על מגוון מסכים לפני העלייה לאוויר.",
      },
      {
        q: "אני אוכל לערוך את האתר בעצמי אחר כך?",
        a: "תלוי מה רוצים לערוך. עדכוני תוכן שוטפים אפשר לבקש ממני, או שאני בונה ממשק ניהול פשוט לתכנים שמשתנים הרבה. שינויים עיצוביים עמוקים עדיף להשאיר לי, כדי לשמור על האיכות.",
      },
      {
        q: "מה עם דומיין ואחסון?",
        a: "הדומיין נרשם על שמכם ובכרטיס שלכם, ואני מלווה אתכם ברכישה ומחברת הכל. האתרים בנויים בקוד ולכן אין להם עלות אחסון חודשית, ואתם לא תלויים בי לשום דבר.",
      },
      {
        q: "האתר יהיה בעברית ובאנגלית?",
        a: "האתר בנוי מלכתחילה לעברית, מימין לשמאל, כולל הפריסה. גרסה באנגלית אפשר להוסיף בהקמה או בהמשך.",
      },
    ],
    bridge: { text: "רוצים לראות דוגמאות אמיתיות לפני שמתחילים?", linkLabel: "לתיק העבודות", href: "/work" },
    closingTitle: "רוצים שנדבר על האתר שלכם?",
    closingSub:
      "ספרו לי מה אתם עושים ומה הייתם רוצים באתר, ונבדוק יחד מה מתאים לכם בלי להתחייב לפרויקט.",
    closingCta: "דברו איתי בוואטסאפ",
    closingWaMsg: "היי שני, אני רוצה לבנות אתר לעסק",
    auditLine: "או התחילו בבדיקת התאמה חינם",
  },
  en: {
    dir: "ltr",
    kicker: "Service · Websites",
    title: "A website that presents your business and invites enquiries",
    lead:
      "I build a website that explains what you do and makes it easy for customers to contact you. The code stays yours.",
    primaryCta: "Talk to me about a website",
    primaryWaMsg: "Hi Shani, I'd like to build a website for my business",
    secondaryCta: "Which site fits you",
    includesTitle: "What's included",
    includes: [
      "A site made for your business, not a template",
      "Built for mobile first, and loads fast",
      "Built properly to rank on Google (SEO)",
      "Contact form + WhatsApp",
      "Built-in tracking of enquiries and ads",
      "Full ownership of the code",
    ],
    products: {
      title: "Which site fits you?",
      labels: { includes: "What is included", notFor: "When it is not right", example: "Example" },
      items: [
        {
          name: "Landing page",
          includes: "Up to 3 parts in one scroll, no navigation menu, fixed WhatsApp button.",
          notFor: "Several services that need explaining in depth? 'Website' works better.",
        },
        {
          name: "Website",
          includes: "Homepage + 2–4 pages, each ranking separately on Google, and a shared portfolio gallery of up to 10 projects.",
          notFor: "Selling products with a cart? That is a shop. Large portfolio? 'Portfolio site' fits better.",
        },
        {
          name: "Portfolio site",
          includes: "Everything in 'Website', plus up to 10 projects, each with its own ranking page.",
          notFor: "Up to 10 projects and not all need separate ranking? 'Website' does the job for less, and a single page can always be added later.",
        },
        {
          name: "Second language version",
          includes: "Full translation, a mirrored layout, and a language switch at the top of the page.",
        },
      ],
    },
    alsoTitle: "And once the site is live",
    also: [
      { label: "Automations", href: "/chatbots", desc: "The site brings enquiries in, and the next question is how fast they get answered. A system does that at 2am too." },
      { label: "AI chatbots and agents", href: "/chatbots", desc: "Once the site brings enquiries, an AI agent can understand the conversation and move it to the next step." },
    ],
    sections: [],
    faqTitle: "Website FAQ",
    faqItems: [
      {
        q: "How do we start building a business website?",
        a: "Fill in the short free fit check and I will come back within one business day with directions and a proposal.",
      },
      {
        q: "Why build the site in code?",
        a: "Code lets me tailor the design and connections to the business instead of forcing the project into a ready-made template. The code remains yours, so another developer can continue working on it later.",
      },
      {
        q: "How long does a website take?",
        a: "It depends on the type of site and the materials you already have. Before work begins, we agree on the schedule and what I need from you.",
      },
      {
        q: "Will the site connect to WhatsApp, automations and AI?",
        a: "Yes. The site can connect to the systems that manage enquiries, send replies and remind you to follow up. You can begin with the website and add automation later.",
      },
      {
        q: "Will the site be mobile-friendly?",
        a: "Absolutely. I build mobile-first, meaning the site is designed for the phone screen first and then adapted for desktop, because most visitors come from mobile. Everything is tested across screen sizes before launch.",
      },
      {
        q: "Can I edit the site myself later?",
        a: "It depends what you want to edit. Ongoing content updates can come to me, or I can build a simple admin for content that changes often. Deeper design changes are best left to me, to keep quality high.",
      },
      {
        q: "What about domain and hosting?",
        a: "The domain is registered in your name and on your card, and I guide you through the purchase and wire everything up. The sites are built in code, so they have no monthly hosting cost, and you are never dependent on me.",
      },
      {
        q: "Will the site be in Hebrew and English?",
        a: "The site is built Hebrew-first with full RTL. An English version is an add-on you can include at build time or add later.",
      },
    ],
    bridge: { text: "Want to see real examples before you start?", linkLabel: "See the portfolio", href: "/work" },
    closingTitle: "Ready for a site that actually works?",
    closingSub:
      "We'll talk about your business and your goals, and I'll build a site that positions you right and brings enquiries. No commitment on the first call.",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like to build a website for my business",
    auditLine: "Or start with a free fit check",
  },
};

export default function WebsitesPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
