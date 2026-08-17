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
          fit: "יש לכם שירות אחד ברור להציע, או שאתם מפרסמים בתשלום ורוצים מקום אחד שהפרסום מוביל אליו.",
          includes: "עד שלושה חלקים בגלילה אחת רציפה, בלי תפריט ניווט, עם כפתור וואטסאפ קבוע. גרסה ראשונה עד חמישה ימי עבודה.",
          forWho: "בעלי מקצוע שעובדים לבד, מאמני כושר, קוסמטיקאיות, מדריכים, וכל מי שמריץ קמפיין ממומן ורוצה עמוד נחיתה אליו.",
          notFor: "יש לכם כמה שירותים שונים שצריך להסביר לעומק. אז אתר יעבוד לכם טוב יותר.",
        },
        {
          name: "אתר",
          price: "2,400 ₪",
          fit: "אתם מסבירים שיטה, תהליך או שירות, ואנשים שואלים אתכם אותן שאלות לפני שהם סוגרים.",
          includes: "עמוד בית ועוד 2 עד 4 עמודים, לכל אחד כתובת, כותרת ותיאור משלו, ולכן הוא מדורג בנפרד בגוגל ולא רק דרך עמוד הבית. אם יש לכם תיק עבודות, עד 10 פרויקטים מוצגים ככרטיסים בגלריה משותפת. שני חודשי ליווי כלולים, בשווי 400 ₪. גרסה ראשונה 8 עד 10 ימי עבודה.",
          forWho: "מאמנים, מטפלים, יועצים ואנשים עצמאיים שמוכרים ידע או תהליך. גם אדריכלים ומעצבים עם תיק עבודות קטן עד בינוני.",
          notFor: "אתם מוכרים מוצרים ורוצים עגלת קניות ותשלום באתר, זו כבר חנות. או שיש לכם תיק עבודות גדול שרובו צריך עמוד נפרד, ואז אתר פורטפוליו נכון יותר.",
        },
        {
          name: "אתר פורטפוליו",
          price: "3,700 ₪",
          fit: "יש לכם תיק עבודות גדול, בערך 15 פרויקטים ומעלה, וחשוב לכם שהעבודות המובילות יימצאו בנפרד בחיפוש בגוגל.",
          includes: "הכל מ'אתר', ובנוסף כל אחד מעד 10 הפרויקטים מקבל עמוד נפרד עם כתובת, כותרת ותיאור משלו. עמוד נוסף מעבר ל-10 הוא 250 ₪. גרסה ראשונה 13 עד 15 ימי עבודה.",
          forWho: "אדריכלים, סטודיו עיצוב, קבלנים, צלמים ומעצבים עם תיק עבודות גדול, שכל פרויקט בו שווה הצגה נפרדת.",
          notFor: "יש לכם עד 10 פרויקטים ולא כולם חייבים להימצא לבד בגוגל. 'אתר' הרגיל עושה את העבודה בפחות כסף, ותמיד אפשר להוסיף עמוד פרויקט בודד בהמשך.",
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
        p: "המחירים מפורסמים במלואם בעמוד המחירים. דף נחיתה 1,500 ₪, אתר בכמה עמודים כולל גלריית פרויקטים משותפת 2,400 ₪, אתר פורטפוליו עם עד 10 עמודי פרויקט נפרדים 3,700 ₪, וגרסה בשפה שנייה 600 ₪, אותו מחיר לכל סוג אתר. אלה מחירים סופיים, ומה שלא כלול מופיע כתוספת עם מחיר משלה. ממלאים אבחון קצר בלי עלות, ותוך יום עסקים אני חוזרת עם כיוונים ועם הצעה מסודרת.",
      },
      {
        h: "למה אתר בקוד עדיף על וויקס או אלמנטור?",
        p: "תבנית מוכנה נראית כמו עוד תבנית, נטענת לאט ומוגבלת גם בקידום וגם בעיצוב. אתר שנכתב מאפס נטען מהר, מדורג טוב יותר בגוגל, ומאפשר תנועה וחוויית גלישה שתבנית פשוט לא יודעת לעשות. ומעבר לכל זה, הקוד שלכם, בלי תלות בפלטפורמה חיצונית ובלי דמי מנוי כפויים.",
      },
      {
        h: "כמה זמן לוקח לבנות אתר?",
        p: "דף נחיתה: גרסה ראשונה מלאה עד חמישה ימי עבודה מרגע שהחומרים אצלי, ובאוויר תוך שבוע עד שבועיים. אתר עם כמה עמודים וגלריית פרויקטים משותפת: 8 עד 10 ימי עבודה, ובאוויר תוך שבועיים עד שלושה, כי יש יותר חלקים לסדר. אתר פורטפוליו עם עמודי פרויקט נפרדים: 13 עד 15 ימי עבודה, ובאוויר תוך שלושה עד ארבעה שבועות. אני עובדת עם כלי AI לאורך כל הפיתוח, ולכן המסירה מהירה מהמקובל בלי להתפשר על האיכות.",
      },
      {
        h: "האם האתר יהיה מחובר לאוטומציות ו-AI?",
        p: "כן. בניגוד לרוב בוני האתרים, אני מחברת את האתר למערכות שמנהלות את הפניות ולסוכני AI שמדברים עברית, כך שהאתר קולט לידים, עונה ללקוחות ומעדכן את המערכות שלכם לבד. אפשר להתחיל באתר ולהוסיף אוטומציה בהמשך.",
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
          fit: "You have one clear service to offer, or you run paid ads and want one place they lead to.",
          includes: "Up to three parts in a single continuous scroll, no navigation menu, with a fixed WhatsApp button. First version within five working days.",
          forWho: "Solo professionals, personal trainers, beauticians, instructors, and anyone running paid campaigns who needs a landing page.",
          notFor: "You have several different services that need explaining in depth. A website will work better.",
        },
        {
          name: "Website",
          price: "₪2,400",
          fit: "You explain a method, a process or a service, and people ask you the same questions before they buy.",
          includes: "A homepage plus 2 to 4 more pages, each with its own URL, title and description, so it ranks separately on Google. If you have a portfolio, up to 10 projects appear as cards in a shared gallery. Two months of Shani Care included, worth ₪400. First version 8 to 10 working days.",
          forWho: "Coaches, therapists, consultants and freelancers selling knowledge or a process. Also architects and designers with a small to mid-sized portfolio.",
          notFor: "You sell products and need a cart and checkout — that is a shop. Or you have a large portfolio where most pieces need their own page, in which case a portfolio site fits better.",
        },
        {
          name: "Portfolio site",
          price: "₪3,700",
          fit: "You have a large portfolio, roughly 15 projects and up, and you want your leading work to be found separately on Google.",
          includes: "Everything in 'Website', plus each of up to 10 projects gets its own page with its own URL, title and description. An extra page beyond 10 is ₪250. First version 13 to 15 working days.",
          forWho: "Architects, design studios, contractors, photographers and designers with a large portfolio where each project deserves its own page.",
          notFor: "You have up to 10 projects and they do not all need to be found separately on Google. The regular 'Website' does the job for less, and a single project page can always be added later.",
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
        p: "The full price list is published on the pricing page. Landing page ₪1,500, a multi-page website with a shared project gallery ₪2,400, a portfolio website with up to 10 dedicated project pages ₪3,700, and a second-language version ₪600, the same price for every site type. These are final prices, and anything not included appears as an add-on with its own price. Fill in the short audit at no cost, and within one business day I come back with directions and a proper proposal.",
      },
      {
        h: "Why is a coded site better than Wix or Elementor?",
        p: "A ready template looks like another template, loads slowly and is limited both on search and on design. A site written from scratch loads fast, ranks better on Google, and allows motion and a browsing experience a template simply cannot do. Beyond all of that, the code is yours, with no dependency on an outside platform and no forced subscription.",
      },
      {
        h: "How long does a website take?",
        p: "Landing page: a full first version within five working days of receiving your materials, and live within one to two weeks. A website with several pages and a shared project gallery: 8–10 working days, and live within two to three weeks, since there's simply more to put together. A portfolio website with dedicated project pages: 13–15 working days, and live within three to four weeks. I work with AI-assisted development, so delivery is faster than the industry norm without compromising quality.",
      },
      {
        h: "Will the site connect to automations and AI?",
        p: "Yes. Unlike most website builders, I wire the site into the systems that manage your enquiries and into AI agents that speak Hebrew, so the site captures leads, answers clients and updates your systems on its own. You can start with the site and add automation later.",
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
