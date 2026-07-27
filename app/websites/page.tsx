"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · אתרים",
    title: "אתרים קולנועיים שמביאים לקוחות, לא רק נראים טוב.",
    lead:
      "אני בונה אתרים בקוד קאסטום Next.js, מהירים, עם אנימציות GSAP קולנועיות ו-SEO אמיתי, שממצבים את העסק שלכם ברמה של החברות הגדולות והופכים מבקרים ללקוחות. הקוד שלכם, בבעלותכם המלאה.",
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
        p: "המחירים מפורסמים במלואם בעמוד המחירים. דף נחיתה 1,500 ₪, אתר 2,900 ₪, וגרסה בשפה שנייה 600 ₪ לדף נחיתה או 900 ₪ לאתר. אלה מחירים סופיים, ומה שלא כלול מופיע כתוספת עם מחיר משלה. ממלאים אבחון קצר בלי עלות, ותוך יום עסקים אני חוזרת עם כיוונים ועם הצעה מסודרת.",
      },
      {
        h: "למה אתר בקוד עדיף על וויקס או אלמנטור?",
        p: "תבנית מוכנה נראית כמו עוד תבנית, נטענת לאט ומוגבלת ב-SEO ובעיצוב. אתר בקוד קאסטום נטען מהר, מקבל ציון Lighthouse גבוה, מדורג טוב יותר בגוגל, ומאפשר אנימציות וחוויית משתמש שאי אפשר לשחזר בתבנית. וחשוב מכל, הקוד שלכם, בלי תלות בפלטפורמה חיצונית ובלי דמי מנוי כפויים.",
      },
      {
        h: "כמה זמן לוקח לבנות אתר?",
        p: "גרסה ראשונה מלאה עד חמישה ימי עבודה מרגע שהחומרים אצלי, ובאוויר תוך שבוע עד שבועיים. אני עובדת בפיתוח מבוסס-AI, ולכן המסירה מהירה מהמקובל בתעשייה בלי להתפשר על האיכות.",
      },
      {
        h: "האם האתר יהיה מחובר לאוטומציות ו-AI?",
        p: "כן. בניגוד לרוב בוני האתרים, אני מחברת את האתר לאוטומציות n8n, ל-CRM ולסוכני AI בעברית, כך שהוא לא רק חלון ראווה אלא כלי עבודה: לוכד לידים, עונה ללקוחות ומזין את המערכות שלכם לבד. אפשר להתחיל באתר ולהוסיף אוטומציה בהמשך.",
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
        a: "תלוי מה רוצים לערוך. עדכוני תוכן שוטפים אפשר לנהל דרך התחזוקה החודשית, או שאני בונה ממשק ניהול פשוט לתכנים שמשתנים הרבה. שינויים עיצוביים עמוקים עדיף להשאיר לי, כדי לשמור על האיכות.",
      },
      {
        q: "מה עם דומיין ואחסון?",
        a: "הדומיין נרשם על שמכם ובכרטיס שלכם, כ-74 ₪ לשנה, ואני מלווה אתכם ברכישה ומחברת הכל. האתרים בנויים בקוד ולכן אין להם עלות אחסון חודשית. בתחזוקה החודשית אני שומרת על העדכונים, הגיבויים והניטור, ואתם לא תלויים בי לשום דבר.",
      },
      {
        q: "האתר יהיה בעברית ובאנגלית?",
        a: "האתר נבנה מלכתחילה לעברית עם RTL מלא. גרסה באנגלית היא תוספת שאפשר להוסיף בהקמה או בהמשך, ומתומחרת בהצעה לפי היקף התוכן.",
      },
    ],
    closingTitle: "מוכנים לאתר שבאמת עובד?",
    closingSub:
      "נדבר על העסק שלכם, על המטרות, ואבנה לכם אתר שממצב אתכם נכון ומביא פניות. בלי התחייבות בשיחה הראשונה.",
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
        p: "The full price list is published on the pricing page. Landing page 1,500 NIS, website 2,900 NIS, and a second-language version 600 NIS for a landing page or 900 NIS for a website. These are final prices, and anything not included appears as an add-on with its own price. Fill in the short audit at no cost, and within one business day I come back with directions and a proper proposal.",
      },
      {
        h: "Why is coded better than Wix or Elementor?",
        p: "A ready template looks like another template, loads slowly and is limited on SEO and design. Custom code loads fast, earns a high Lighthouse score, ranks better on Google, and enables animation and UX a template can't reproduce. Most importantly, the code is yours, no dependency on an external platform and no forced subscription.",
      },
      {
        h: "How long does a website take?",
        p: "A full first version within five working days of receiving your materials, and live within one to two weeks. I work with AI-assisted development, so delivery is faster than the industry norm without compromising quality.",
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
        a: "Depends what you want to edit. Ongoing content updates can run through monthly care, or I build a simple admin for content that changes often. Deeper design changes are best left to me, to keep quality high.",
      },
      {
        q: "What about domain and hosting?",
        a: "The domain is registered in your name and on your card, around 74 NIS a year, and I guide you through the purchase and wire everything up. The sites are built in code, so they have no monthly hosting cost. With monthly care I handle updates, backups and monitoring, and you are never dependent on me.",
      },
      {
        q: "Will the site be in Hebrew and English?",
        a: "The site is built Hebrew-first with full RTL. An English version is an add-on you can include at build time or add later, priced in the proposal by content scope.",
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
