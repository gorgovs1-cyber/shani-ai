"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · אתרים",
    title: "אתרים קולנועיים שמביאים לקוחות, לא רק נראים טוב",
    lead:
      "אני בונה אתרים בקוד שנכתב מאפס, מהירים, עם תנועה חלקה ומבנה שגוגל אוהב, שנותנים לעסק שלכם נוכחות של חברה גדולה והופכים מבקרים ללקוחות. הקוד נשאר שלכם, בבעלות מלאה.",
    primaryCta: "דברו איתי על אתר",
    primaryWaMsg: "היי שני, אני רוצה לבנות אתר לעסק",
    secondaryCta: "לצפייה במחירים",
    includesTitle: "מה נכלל באתר",
    includes: [
      "קוד שנכתב מאפס (Next.js), לא תבנית",
      "תנועה ואנימציות חלקות",
      "בנוי קודם למובייל, ונטען מהר",
      "מבנה מלא לקידום בגוגל (SEO)",
      "טופס פנייה וחיבור לוואטסאפ",
      "מדידה מובנית של פניות ופרסום",
      "בעלות מלאה על הקוד",
      "מסירה תוך 7 עד 21 יום",
    ],
    products: {
      title: "שלושה גדלים, לפי כמה יש לכם לספר",
      note: "ההבדל בין השלושה הוא כמה תוכן צריך להסביר, ולא כמה יפה האתר. אפשר להתחיל בקטן ולהרחיב בהמשך.",
      labels: { fit: "מתי זה מתאים", includes: "מה כלול", forWho: "למי זה מתאים", notFor: "מתי זה לא נכון", example: "לדוגמה" },
      items: [
        {
          name: "דף נחיתה",
          price: "1,500 ₪",
          fit: "שירות אחד ברור להציע, או קמפיין ממומן שצריך יעד אחד.",
          includes: "עד 3 חלקים בגלילה אחת, בלי תפריט ניווט, כפתור וואטסאפ קבוע. גרסה ראשונה עד 5 ימי עבודה.",
          forWho: "עצמאים, מאמנים, קוסמטיקאיות, ומי שמריץ קמפיין ממומן.",
          notFor: "כמה שירותים שצריך להסביר לעומק? 'אתר' יעבוד טוב יותר.",
        },
        {
          name: "אתר",
          price: "2,400 ₪",
          fit: "מסבירים שיטה או תהליך, ואנשים שואלים אותן שאלות לפני שסוגרים.",
          includes: "עמוד בית + 2-4 עמודים, כל אחד מדורג בנפרד בגוגל. גלריית עבודות משותפת עד 10 פרויקטים, ושני חודשי ליווי כלולים. גרסה ראשונה 8-10 ימי עבודה.",
          forWho: "מאמנים, מטפלים, יועצים, ואדריכלים/מעצבים עם תיק עבודות קטן-בינוני.",
          notFor: "מוכרים מוצרים עם עגלת קניות? זו חנות. תיק עבודות גדול? 'אתר פורטפוליו' מתאים יותר.",
        },
        {
          name: "אתר פורטפוליו",
          price: "3,700 ₪",
          fit: "תיק עבודות גדול (כ-15 פרויקטים ומעלה), וחשוב שכל עבודה תימצא בנפרד בגוגל.",
          includes: "הכל מ'אתר', ועד 10 פרויקטים עם עמוד נפרד ומדורג לכל אחד. עמוד נוסף: 250 ₪. גרסה ראשונה 13-15 ימי עבודה.",
          forWho: "אדריכלים, סטודיו עיצוב, קבלנים, צלמים — כל פרויקט שווה הצגה נפרדת.",
          notFor: "עד 10 פרויקטים ולא כולם צריכים דירוג נפרד? 'אתר' עושה את העבודה בפחות, ואפשר להוסיף עמוד בודד בהמשך.",
        },
        {
          name: "גרסה בשפה שנייה",
          price: "600 ₪",
          fit: "יש לכם לקוחות בחו״ל, או שאתם רוצים להופיע גם בחיפושים באנגלית.",
          includes: "תרגום מלא, התאמת הפריסה לכיוון הפוך, ומתג מעבר שפה בראש העמוד. אותו מחיר לכל סוג אתר.",
          forWho: "מיתוג אישי, יועצים שעובדים מול חו״ל, תיירות, ומי שמגיש מועמדות בינלאומית.",
        },
      ],
    },
    alsoTitle: "ואחרי שהאתר באוויר",
    also: [
      { label: "אוטומציות", href: "/automations", desc: "האתר מביא פניות, והשאלה הבאה היא כמה מהר עונים עליהן. מערכת עושה את זה גם בשתיים בלילה." },
      { label: "ייעוץ ותכנון", href: "/ai-consulting", desc: "לא בטוחים שאתר הוא הדבר הראשון שחסר לכם? האבחון מראה מה שווה לתקן קודם." },
    ],
    sections: [
      {
        h: "כמה עולה לבנות אתר לעסק?",
        p: "המחירים המלאים למעלה, ליד כל חבילה, ובעמוד המחירים: מ-1,500 ₪ לדף נחיתה ועד 3,700 ₪ לאתר פורטפוליו, כולם סופיים בלי הפתעות. ממלאים אבחון קצר בחינם, ותוך יום עסקים אני חוזרת עם כיוונים והצעה מסודרת.",
      },
      {
        h: "למה אתר בקוד עדיף על וויקס או אלמנטור?",
        p: "תבנית מוכנה נראית כמו כולם, נטענת לאט ומוגבלת בעיצוב ובקידום. קוד שנכתב מאפס נטען מהר, מדורג טוב יותר, ומאפשר תנועה שתבנית לא יודעת לעשות. והקוד נשאר שלכם, בלי תלות בפלטפורמה חיצונית ובלי דמי מנוי כפויים.",
      },
      {
        h: "כמה זמן לוקח לבנות אתר?",
        p: "הזמנים המדויקים לכל גודל אתר מפורטים למעלה, ליד כל חבילה. אני עובדת עם כלי AI לאורך הפיתוח, ולכן המסירה מהירה מהמקובל בלי להתפשר על האיכות.",
      },
      {
        h: "האם האתר יהיה מחובר לאוטומציות ו-AI?",
        p: "כן. בניגוד לרוב בוני האתרים, אני מחברת את האתר למערכות שמנהלות פניות ולסוכני AI שמדברים עברית — האתר קולט לידים ועונה ללקוחות לבד. אפשר להתחיל באתר ולהוסיף אוטומציה בהמשך.",
      },
    ],
    faqTitle: "שאלות על אתרים",
    faqItems: [
      {
        q: "האתר יהיה מותאם למובייל?",
        a: "כן, וזה לא תוספת אלא נקודת המוצא. אני מתכננת קודם את מסך הטלפון ורק אחר כך את המחשב, כי רוב הגולשים מגיעים מהנייד. הכל נבדק על מגוון מסכים לפני העלייה לאוויר.",
      },
      {
        q: "אני אוכל לערוך את האתר בעצמי אחר כך?",
        a: "תלוי מה רוצים לערוך. עדכוני תוכן שוטפים אפשר לנהל דרך Shani Care, הליווי החודשי, או שאני בונה ממשק ניהול פשוט לתכנים שמשתנים הרבה. שינויים עיצוביים עמוקים עדיף להשאיר לי, כדי לשמור על האיכות.",
      },
      {
        q: "מה עם דומיין ואחסון?",
        a: "הדומיין נרשם על שמכם ובכרטיס שלכם, בממוצע כ-60 עד 90 ₪ לשנה תלוי בסיומת ובספק, ואני מלווה אתכם ברכישה ומחברת הכל. האתרים בנויים בקוד ולכן אין להם עלות אחסון חודשית. ב-Shani Care אני שומרת על העדכונים, הגיבויים והניטור, ואתם לא תלויים בי לשום דבר.",
      },
      {
        q: "האתר יהיה בעברית ובאנגלית?",
        a: "האתר בנוי מלכתחילה לעברית, מימין לשמאל, על כל המשמעויות של זה בעיצוב ובפריסה. גרסה באנגלית היא תוספת שאפשר להוסיף בהקמה או בהמשך, במחיר אחיד של 600 ₪.",
      },
    ],
    bridge: { text: "רוצים לראות דוגמאות אמיתיות לפני שמתחילים?", linkLabel: "לתיק העבודות", href: "/work" },
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
    title: "Cinematic websites that bring clients in, not just look good",
    lead:
      "I build websites in code written from scratch, fast, with smooth motion and a structure Google likes, giving your business the presence of a much bigger company and turning visitors into clients. The code stays yours, fully owned.",
    primaryCta: "Talk to me about a website",
    primaryWaMsg: "Hi Shani, I'd like to build a website for my business",
    secondaryCta: "See pricing",
    includesTitle: "What's included",
    includes: [
      "Code written from scratch (Next.js), not a template",
      "Smooth, cinematic motion",
      "Built for mobile first, and loads fast",
      "Built properly to rank on Google (SEO)",
      "Contact form + WhatsApp",
      "Built-in tracking of enquiries and ads",
      "Full ownership of the code",
      "Delivery in 7 to 21 days",
    ],
    products: {
      title: "Three sizes, by how much you have to say",
      note: "The difference between them is how much content there is to explain, not how good the site looks. You can start small and extend later.",
      labels: { fit: "When it fits", includes: "What is included", forWho: "Who it is for", notFor: "When it is not right", example: "Example" },
      items: [
        {
          name: "Landing page",
          price: "₪1,500",
          fit: "One clear service to offer, or a paid campaign that needs a single destination.",
          includes: "Up to 3 parts in one scroll, no navigation menu, fixed WhatsApp button. First version within 5 working days.",
          forWho: "Solo professionals, trainers, beauticians, and anyone running paid campaigns.",
          notFor: "Several services that need explaining in depth? 'Website' works better.",
        },
        {
          name: "Website",
          price: "₪2,400",
          fit: "You explain a method or process, and people ask the same questions before they buy.",
          includes: "Homepage + 2–4 pages, each ranking separately on Google. Shared portfolio gallery up to 10 projects, plus two months of Shani Care included. First version 8–10 working days.",
          forWho: "Coaches, therapists, consultants, and architects/designers with a small-to-mid portfolio.",
          notFor: "Selling products with a cart? That is a shop. Large portfolio? 'Portfolio site' fits better.",
        },
        {
          name: "Portfolio site",
          price: "₪3,700",
          fit: "A large portfolio (roughly 15 projects and up), where each piece deserves its own visibility on Google.",
          includes: "Everything in 'Website', plus up to 10 projects, each with its own ranking page. Extra page: ₪250. First version 13–15 working days.",
          forWho: "Architects, design studios, contractors, photographers — every project deserves its own page.",
          notFor: "Up to 10 projects and not all need separate ranking? 'Website' does the job for less, and a single page can always be added later.",
        },
        {
          name: "Second language version",
          price: "₪600",
          fit: "You have clients abroad, or you want to appear in English searches too.",
          includes: "Full translation, a mirrored layout, and a language switch at the top of the page. Same price for every site type.",
          forWho: "Personal brands, consultants working with clients abroad, tourism, and anyone applying internationally.",
        },
      ],
    },
    alsoTitle: "And once the site is live",
    also: [
      { label: "Automations", href: "/automations", desc: "The site brings enquiries in, and the next question is how fast they get answered. A system does that at 2am too." },
      { label: "Consulting", href: "/ai-consulting", desc: "Not sure a site is the first thing missing? The audit marks what is worth fixing first." },
    ],
    sections: [
      {
        h: "How much does a business website cost?",
        p: "Full prices are above next to each package, and on the pricing page: from ₪1,500 for a landing page up to ₪3,700 for a portfolio site, all final with no surprises. Fill in the short audit at no cost, and within one business day I come back with directions and a proposal.",
      },
      {
        h: "Why is a coded site better than Wix or Elementor?",
        p: "A ready template looks like everyone else, loads slowly and is limited on both search and design. A site written from scratch loads fast, ranks better, and allows motion a template simply cannot do. And the code stays yours, with no dependency on an outside platform and no forced subscription.",
      },
      {
        h: "How long does a website take?",
        p: "Exact timelines for every site size are listed above, next to each package. I work with AI-assisted development throughout, so delivery is faster than the industry norm without compromising quality.",
      },
      {
        h: "Will the site connect to automations and AI?",
        p: "Yes. Unlike most website builders, I wire the site into the systems that manage your enquiries and into AI agents that speak Hebrew — the site captures leads and answers clients on its own. You can start with the site and add automation later.",
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
        a: "It depends what you want to edit. Ongoing content updates can run through Shani Care, the monthly plan, or I can build a simple admin for content that changes often. Deeper design changes are best left to me, to keep quality high.",
      },
      {
        q: "What about domain and hosting?",
        a: "The domain is registered in your name and on your card, on average ₪60 to ₪90 a year depending on the extension and provider, and I guide you through the purchase and wire everything up. The sites are built in code, so they have no monthly hosting cost. With Shani Care I handle updates, backups and monitoring, and you are never dependent on me.",
      },
      {
        q: "Will the site be in Hebrew and English?",
        a: "The site is built Hebrew-first with full RTL. An English version is an add-on you can include at build time or add later, priced in the proposal by content scope.",
      },
    ],
    bridge: { text: "Want to see real examples before you start?", linkLabel: "See the portfolio", href: "/work" },
    closingTitle: "Ready for a site that actually works?",
    closingSub:
      "We'll talk about your business and your goals, and I'll build a site that positions you right and brings enquiries. No commitment on the first call.",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like to build a website for my business",
    auditLine: "Or start with a free audit",
  },
};

export default function WebsitesPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
