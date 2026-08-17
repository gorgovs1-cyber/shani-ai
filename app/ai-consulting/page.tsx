"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · ייעוץ AI",
    title: "יועצת AI שמדברת עסקים, לא רק טכנולוגיה",
    lead:
      "ניהלתי עסק משלי 10 שנים, אז אני יודעת בדיוק איפה נשרף הזמן ואיפה AI יחסוך לכם הכי הרבה. אני ממפה את התהליכים שלכם, בונה תוכנית עבודה ומלווה אתכם בהטמעה, בשפה פשוטה ובלי הבטחות ריקות.",
    primaryCta: "דברו איתי על ייעוץ",
    primaryWaMsg: "היי שני, אני רוצה ייעוץ והטמעת AI לעסק",
    secondaryCta: "לצפייה במחירים",
    includesTitle: "מה כולל הייעוץ",
    includes: [
      "מיפוי מלא של תהליכי העסק",
      "זיהוי איפה AI יחסוך הכי הרבה זמן",
      "תכנית עבודה מדורגת וברורה",
      "המלצה על הכלים שמתאימים לכם",
      "AI שכותב בעברית ובטון של העסק",
      "ליווי בהטמעה, לא רק מסמך",
      "הדרכת צוות בשימוש נכון ב-AI",
      "מדידה של החיסכון בפועל",
    ],
    products: {
      title: "איך מתחילים",
      note: "יש דרך כניסה אחת, והיא בלי עלות. משם ההצעה נבנית לפי מה שנמצא בפועל.",
      labels: { fit: "מתי זה מתאים", includes: "מה מקבלים", forWho: "למי זה מתאים", notFor: "מתי זה לא נכון", example: "לדוגמה" },
      items: [
        {
          name: "אבחון ראשוני",
          price: "ללא עלות",
          fit: "אתם יודעים שמשהו בעסק גוזל יותר מדי זמן, אבל לא בטוחים מה לתקן קודם ואיפה AI בכלל רלוונטי.",
          includes: "טופס קצר על העסק, הכלים והמשימות שחוזרות. תוך יום עסקים אני חוזרת עם שניים שלושה כיוונים, ואז שיחת היכרות של עשרים דקות שבה מחליטים מה נכון לבנות ומה לא. בסיום מגיעה הצעה מסודרת עם מה נבנה, כמה זה עולה ולוח זמנים.",
          forWho: "בעלי עסקים קטנים ובינוניים שרוצים להבין מה אפשרי לפני שמתחייבים לפרויקט.",
          notFor: "אתם כבר יודעים בדיוק מה אתם רוצים לבנות. אז אפשר לדלג ולפנות ישירות בוואטסאפ.",
        },
      ],
    },
    alsoTitle: "אחרי האבחון, לאן זה ממשיך",
    also: [
      { label: "אוטומציות", href: "/automations", desc: "אם מה שגוזל הכי הרבה זמן זו עבודה שחוזרת על עצמה, שם היא עוברת למערכת." },
      { label: "אתרים", href: "/websites", desc: "אם הבעיה היא שלא מגיעות מספיק פניות, קודם צריך כתובת שאפשר לשלוח אליה אנשים." },
    ],
    sections: [
      {
        h: "מה עושה יועץ AI לעסקים?",
        p: "יועצת AI עוזרת לכם להבין איפה בעסק אפשר להשתמש ב-AI כדי לחסוך זמן וכסף, ואיך לעשות את זה נכון בלי לבזבז חודשים על ניסוי וטעייה. אני לא מוכרת לכם כלי, אלא קודם מבינה את העסק, ואז ממליצה בדיוק מה להטמיע, באיזה סדר, ומה יחזיר לכם הכי הרבה שעות.",
      },
      {
        h: "איך מתחילים? אבחון AI",
        p: "מתחילים בשיחת אבחון ממוקדת. אנחנו יושבים, ממפים את כל התהליכים שלכם ומזהים איפה בדיוק בורח הזמן. בסוף אתם יוצאים עם תכנית עבודה ברורה. מתחילים באבחון חינמי דרך הטופס באתר, ותוך יום עסקים אני חוזרת עם כיוונים.",
      },
      {
        h: "למה AI כותב עברית שנשמעת מוזרה, ואיך מתקנים את זה?",
        p: "רוב כלי ה-AI חושבים באנגלית ומתרגמים, ולכן העברית שיוצאת מהם קצת עקומה, מנופחת ומיד מסגירה את עצמה. אני בונה למערכת מערכת הוראות שמלמדת אותה לכתוב בעברית של בן אדם, בשפה ובטון של העסק שלכם, כך שמה שיוצא מוכן לשליחה ונשמע כמוכם ולא כמו מכונה.",
      },
      {
        h: "הטמעת AI בעסק, לא נשארים לבד עם מסמך",
        p: "ייעוץ ששווה משהו לא נגמר במסמך יפה. אני מלווה אתכם בהטמעה בפועל: מגדירה את הכלים, בונה את האוטומציות, מדריכה את הצוות ומוודאת שזה באמת נכנס לשגרת העבודה. המטרה היא תוצאות שאפשר למדוד, ולא עוד קובץ שנשכח בדרייב.",
      },
    ],
    faqTitle: "שאלות על ייעוץ AI",
    faqItems: [
      {
        q: "העסק שלי קטן, AI רלוונטי בכלל אליי?",
        a: "דווקא לעסקים קטנים AI משנה הכי הרבה, כי כל שעה שחוזרת אליכם שווה המון. גם עסק של אדם אחד מבזבז שעות על תוכן, על מענה ללקוחות ועל סידור מידע, וזה בדיוק מה שאפשר להעביר הלאה. באבחון נראה איפה זה רלוונטי אצלכם.",
      },
      {
        q: "כמה זמן לוקח לראות תוצאות?",
        a: "חלק מהדברים מרגישים כבר בשבוע הראשון, למשל כלי שהופך כתיבת תוכן משעות לדקות. הטמעה רחבה יותר לוקחת כמה שבועות. אני מתחילה תמיד מהדברים שנותנים החזר מיידי, ורק אחר כך בונים הלאה.",
      },
      {
        q: "צריך ידע טכני כדי לעבוד איתך?",
        a: "ממש לא. אני מסבירה הכל בשפה פשוטה, בעברית, בלי להניח שום רקע טכני, ובלי לזלזל בכם. אתם מביאים את ההיכרות עם העסק, אני מביאה את הטכנולוגיה, וביחד מוצאים מה הכי מתאים.",
      },
    ],
    closingTitle: "בואו נמפה איפה AI יחסוך לכם הכי הרבה",
    closingSub:
      "שיחת אבחון ראשונה, ממוקדת ובלי התחייבות, שבסופה תדעו בדיוק מאיפה להתחיל.",
    closingCta: "דברו איתי בוואטסאפ",
    closingWaMsg: "היי שני, אני רוצה ייעוץ והטמעת AI לעסק",
    auditLine: "או התחילו באבחון חינם",
  },
  en: {
    dir: "ltr",
    kicker: "Service · AI Consulting",
    title: "An AI consultant who speaks business, not just tech",
    lead:
      "I ran my own business for 10 years, so I know exactly where time gets wasted and where AI actually moves the needle. I map your processes, build an action plan and guide you through the rollout, in plain language and with no empty promises.",
    primaryCta: "Talk to me about consulting",
    primaryWaMsg: "Hi Shani, I'd like AI consulting and rollout for my business",
    secondaryCta: "See pricing",
    includesTitle: "What consulting includes",
    includes: [
      "Full mapping of your business processes",
      "Finding where AI saves the most time",
      "A clear, staged action plan",
      "Recommending the right tools & AI",
      "AI that writes Hebrew in your tone",
      "Guidance through rollout, not just a doc",
      "Training your team to use AI well",
      "Measuring the actual time saved",
    ],
    products: {
      title: "How it starts",
      note: "There is one way in, and it costs nothing. The proposal is built from what the audit actually finds.",
      labels: { fit: "When it fits", includes: "What you get", forWho: "Who it is for", notFor: "When it is not right", example: "Example" },
      items: [
        {
          name: "First audit",
          price: "Free",
          fit: "You know something in the business is eating too much time, but you are not sure what to fix first or where AI is even relevant.",
          includes: "A short form about the business, the tools and the recurring tasks. Within one working day I come back with two or three directions, followed by a twenty-minute call where we decide what is worth building and what is not. A full proposal follows, with what gets built, what it costs and a timeline.",
          forWho: "Owners of small and mid-sized businesses who want to understand what is possible before committing to a project.",
          notFor: "You already know exactly what you want built, so you can skip ahead and message me directly.",
        },
      ],
    },
    alsoTitle: "Where the audit leads next",
    also: [
      { label: "Automations", href: "/automations", desc: "If what eats the most time is work that repeats, that is where it moves to a system." },
      { label: "Websites", href: "/websites", desc: "If the problem is that not enough enquiries come in, you first need an address to send people to." },
    ],
    sections: [
      {
        h: "What does an AI consultant for business do?",
        p: "An AI consultant helps you understand where in your business you can use AI to save time and money, and how to do it right without wasting months on trial and error. I don't sell you a tool; I first understand the business, then recommend exactly what to implement, in what order, and what will return the most hours.",
      },
      {
        h: "How do you start? An AI audit",
        p: "You start with a focused audit session. We sit down, map all your processes and pinpoint where time leaks. You leave with a clear action plan. Start with the free audit via the site's form, and within one working day I come back with directions.",
      },
      {
        h: "Why does AI write such odd Hebrew, and how do you fix it?",
        p: "Most AI tools think in English and translate, so the Hebrew they produce comes out slightly bent, inflated, and gives itself away immediately. I build the system an instruction set that teaches it to write the Hebrew of a real person, in your business's voice and tone, so what comes out is ready to send and sounds like you rather than like a machine.",
      },
      {
        h: "AI rollout — you're not left alone with a document",
        p: "Consulting worth anything doesn't end with a pretty document. I guide the actual rollout: set up the tools, build the automations, train the team and make sure it truly enters your workflow. The goal is results you can measure, not another file forgotten in a drive.",
      },
    ],
    faqTitle: "AI consulting FAQ",
    faqItems: [
      {
        q: "My business is small, is AI even relevant for me?",
        a: "It is precisely small businesses that AI changes the most, because every hour returned to you is worth a lot. Even a one-person business wastes hours on content, client replies and data cleanup, which is exactly what AI can take. In the audit we'll see where it's relevant for you.",
      },
      {
        q: "How long until I see results?",
        a: "Some things you feel in the first week, like a tool that turns content writing from hours into minutes. Broader rollout takes a few weeks. I always start with what gives an immediate return, and build from there.",
      },
      {
        q: "Do I need technical knowledge to work with you?",
        a: "Not at all. I explain everything in plain language, in Hebrew, assuming no technical background, and never talking down to you. You bring the knowledge of your business, I bring the technology, and together we find what fits best.",
      },
    ],
    closingTitle: "Let's map where AI will save you the most.",
    closingSub:
      "A first audit call, focused and with no commitment, that ends with you knowing exactly where to start.",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like AI consulting and rollout for my business",
    auditLine: "Or start with a free audit",
  },
};

export default function AiConsultingPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
