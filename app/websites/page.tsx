"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · אתרים",
    title: "אתרים קולנועיים שמביאים לקוחות, לא רק נראים טוב.",
    lead:
      "אני בונה אתרים בקוד קאסטום Next.js, מהירים, עם אנימציות GSAP קולנועיות ו-SEO אמיתי, שממצבים את העסק שלכן ברמה של החברות הגדולות והופכים מבקרים ללקוחות. הקוד שלכן, בבעלותכן המלאה.",
    primaryCta: "דברו איתי על אתר",
    primaryWaMsg: "היי שני, אני רוצה לבנות אתר לעסק",
    secondaryCta: "לצפייה במחירים ←",
    includesTitle: "מה נכלל באתר",
    includes: [
      "קוד קאסטום Next.js, לא תבנית",
      "אנימציות GSAP קולנועיות",
      "מובייל-first · Lighthouse 90+",
      "SEO מלא + Schema.org",
      "טופס פנייה + חיבור וואטסאפ",
      "Analytics + Meta Pixel מובנים",
      "בעלות מלאה על הקוד",
      "מסירה תוך 7–21 יום",
    ],
    sections: [
      {
        h: "כמה עולה לבנות אתר לעסק?",
        p: "דף נחיתה קולנועי ממוקד המרה מתחיל ב-₪2,400, ואתר תדמית מלא של עד 5 עמודים מ-₪6,500 (כל המחירים לפני מע\"מ). המחיר תלוי בכמות העמודים, במורכבות האנימציות ובחיבורים למערכות. בדף המחירים יש פירוט מלא של כל חבילה ומה היא כוללת, ואם לא בטוחות מה מתאים, האבחון החינמי ימליץ.",
      },
      {
        h: "למה אתר בקוד עדיף על וויקס או אלמנטור?",
        p: "תבנית מוכנה נראית כמו עוד תבנית, נטענת לאט ומוגבלת ב-SEO ובעיצוב. אתר בקוד קאסטום נטען מהר, מקבל ציון Lighthouse גבוה, מדורג טוב יותר בגוגל, ומאפשר אנימציות וחוויית משתמש שאי אפשר לשחזר בתבנית. וחשוב מכל, הקוד שלכן, בלי תלות בפלטפורמה חיצונית ובלי דמי מנוי כפויים.",
      },
      {
        h: "כמה זמן לוקח לבנות אתר?",
        p: "דף נחיתה מוכן תוך 7 עד 10 ימים, אתר תדמית תוך שבועיים עד שלושה. אני עובדת בשיטות פיתוח מבוססות-AI, מה שמאפשר לספק אתר מהיר, נקי ומדויק בזמן קצר בהרבה מהתעשייה, בלי להתפשר על האיכות.",
      },
      {
        h: "האם האתר יהיה מחובר לאוטומציות ו-AI?",
        p: "כן. בניגוד לרוב בוני האתרים, אני מחברת את האתר לאוטומציות n8n, ל-CRM ולסוכני AI בעברית, כך שהוא לא רק חלון ראווה אלא כלי עבודה: לוכד לידים, עונה ללקוחות ומזין את המערכות שלכן לבד. אפשר להתחיל באתר ולהוסיף אוטומציה בהמשך.",
      },
    ],
    faqTitle: "שאלות על אתרים",
    faqItems: [
      {
        q: "האתר יהיה מותאם למובייל?",
        a: "בהחלט. אני בונה מובייל-first, כלומר האתר מתוכנן קודם למסך הטלפון ואז מותאם למחשב, כי רוב הגולשים מגיעים מהנייד. הכל נבדק על מגוון מסכים לפני העלייה לאוויר.",
      },
      {
        q: "אני אוכל לערוך את האתר בעצמי אחר כך?",
        a: "תלוי מה רוצות לערוך. עדכוני תוכן שוטפים אפשר לנהל דרך מנוי Shani Care (עדכונים חודשיים), או שאני בונה ממשק ניהול פשוט לתכנים שמשתנים הרבה. שינויים עיצוביים עמוקים עדיף להשאיר לי, כדי לשמור על האיכות.",
      },
      {
        q: "מה עם דומיין ואחסון?",
        a: "אני מלווה אתכן ברכישת הדומיין ומעלה את האתר לאחסון מהיר ומאובטח. במנוי Shani Care אני מנהלת עבורכן את האחסון, הדומיין, הגיבויים והניטור, כך שאתן לא צריכות להתעסק בזה בכלל.",
      },
      {
        q: "האתר יהיה בעברית ובאנגלית?",
        a: "האתר נבנה מלכתחילה לעברית עם RTL מלא. גרסה באנגלית היא תוספת (החל מ-₪1,200) שאפשר להוסיף בהקמה או בהמשך.",
      },
    ],
    closingTitle: "מוכנות לאתר שבאמת עובד?",
    closingSub:
      "נדבר על העסק שלכן, על המטרות, ואבנה לכן אתר שממצב אתכן נכון ומביא פניות. בלי התחייבות בשיחה הראשונה.",
    closingCta: "דברו איתי בוואטסאפ",
    closingWaMsg: "היי שני, אני רוצה לבנות אתר לעסק",
    auditLine: "או התחילו באבחון חינם",
  },
  en: {
    dir: "ltr",
    kicker: "Service · Websites",
    title: "Cinematic websites that bring clients in, not just look good.",
    lead:
      "I build websites in custom Next.js code, fast, with cinematic GSAP animation and real SEO, that position your business alongside the big players and turn visitors into clients. Your code, fully owned by you.",
    primaryCta: "Talk to me about a website",
    primaryWaMsg: "Hi Shani, I'd like to build a website for my business",
    secondaryCta: "See pricing →",
    includesTitle: "What's included",
    includes: [
      "Custom Next.js code, not a template",
      "Cinematic GSAP animation",
      "Mobile-first · Lighthouse 90+",
      "Full SEO + Schema.org",
      "Contact form + WhatsApp",
      "Analytics + Meta Pixel built in",
      "Full ownership of the code",
      "Delivery in 7–21 days",
    ],
    sections: [
      {
        h: "How much does a business website cost?",
        p: "A conversion-focused cinematic landing page starts at ₪2,400, and a full brand site of up to 5 pages from ₪6,500 (all prices exclude VAT). Price depends on the number of pages, animation complexity and system integrations. The pricing page breaks down each package in full, and if you're not sure what fits, the free audit will recommend.",
      },
      {
        h: "Why is coded better than Wix or Elementor?",
        p: "A ready template looks like another template, loads slowly and is limited on SEO and design. Custom code loads fast, earns a high Lighthouse score, ranks better on Google, and enables animation and UX a template can't reproduce. Most importantly, the code is yours, no dependency on an external platform and no forced subscription.",
      },
      {
        h: "How long does a website take?",
        p: "A landing page is ready in 7 to 10 days, a brand site in two to three weeks. I work with AI-assisted development methods, which lets me deliver a fast, clean, precise site far quicker than the industry norm, without compromising quality.",
      },
      {
        h: "Will the site connect to automations and AI?",
        p: "Yes. Unlike most website builders, I wire the site into n8n automations, a CRM and Hebrew AI agents, so it's not just a storefront but a working tool: it captures leads, answers clients and feeds your systems on its own. You can start with the site and add automation later.",
      },
    ],
    faqTitle: "Website FAQ",
    faqItems: [
      {
        q: "Will the site be mobile-friendly?",
        a: "Absolutely. I build mobile-first, meaning the site is designed for the phone screen first and then adapted for desktop, because most visitors come from mobile. Everything is tested across screen sizes before launch.",
      },
      {
        q: "Can I edit the site myself later?",
        a: "Depends what you want to edit. Ongoing content updates can run through a Shani Care membership (monthly updates), or I build a simple admin for content that changes often. Deeper design changes are best left to me, to keep quality high.",
      },
      {
        q: "What about domain and hosting?",
        a: "I guide you through buying the domain and deploy the site to fast, secure hosting. On a Shani Care membership I manage hosting, domain, backups and monitoring for you, so you don't have to touch any of it.",
      },
      {
        q: "Will the site be in Hebrew and English?",
        a: "The site is built Hebrew-first with full RTL. An English version is an add-on (from ₪1,200) you can include at build time or add later.",
      },
    ],
    closingTitle: "Ready for a site that actually works?",
    closingSub:
      "We'll talk about your business and your goals, and I'll build a site that positions you right and brings inquiries. No commitment on the first call.",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like to build a website for my business",
    auditLine: "Or start with a free audit",
  },
};

export default function WebsitesPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
