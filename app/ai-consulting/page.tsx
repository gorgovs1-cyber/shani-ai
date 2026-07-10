"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · ייעוץ AI",
    title: "יועצת AI שמדברת עסקים, לא רק טכנולוגיה.",
    lead:
      "ניהלתי עסק משלי 10 שנים, אז אני יודעת בדיוק איפה נשרף הזמן ואיפה AI באמת יזיז את המחט. אני ממפה את התהליכים שלכן, בונה אסטרטגיה, ומלווה בהטמעה, בעברית אמיתית, בלי באזז וורדס ובלי הבטחות ריקות.",
    primaryCta: "דברו איתי על ייעוץ",
    primaryWaMsg: "היי שני, אני רוצה ייעוץ והטמעת AI לעסק",
    secondaryCta: "לצפייה במחירים ←",
    includesTitle: "מה כולל הייעוץ",
    includes: [
      "מיפוי מלא של תהליכי העסק",
      "זיהוי איפה AI יחסוך הכי הרבה זמן",
      "תכנית עבודה מדורגת וברורה",
      "המלצה על כלים ו-AI מתאימים",
      "סקילים בעברית בטון של העסק",
      "ליווי בהטמעה, לא רק מסמך",
      "הדרכת צוות בשימוש נכון ב-AI",
      "מדידה של החיסכון בפועל",
    ],
    sections: [
      {
        h: "מה עושה יועץ AI לעסקים?",
        p: "יועצת AI עוזרת לכן להבין איפה בעסק אפשר להשתמש ב-AI כדי לחסוך זמן וכסף, ואיך לעשות את זה נכון בלי לבזבז חודשים על ניסוי וטעייה. אני לא מוכרת לכן כלי, אלא קודם מבינה את העסק, ואז ממליצה בדיוק מה להטמיע, באיזה סדר, ומה יחזיר לכן הכי הרבה שעות.",
      },
      {
        h: "איך מתחילים? אבחון AI",
        p: "מתחילים בשיחת אבחון ממוקדת. אנחנו יושבות, ממפות את כל התהליכים שלכן ומזהות איפה בדיוק בורח הזמן. בסוף אתן יוצאות עם תכנית עבודה ברורה. יש אבחון חינמי דרך הטופס באתר, ואבחון מעמיק (מיפוי + תכנית עבודה מלאה) ב-₪950, שמתקזז במלואו אם תזמינו פרויקט.",
      },
      {
        h: "מה זה סקיל בעברית ולמה זה משנה?",
        p: "רוב כלי ה-AI חושבים באנגלית ומתרגמים, ולכן העברית שיוצאת נשמעת מוזרה ולא מקצועית. אני בונה סקילים, מערכות הוראות שמלמדות את ה-AI לכתוב ולחשוב בעברית אמיתית, בדיוק בשפה ובטון של העסק שלכן, כך שמה שיוצא מוכן לשימוש ונשמע כמוכן.",
      },
      {
        h: "הטמעת AI בעסק, לא נשארות לבד עם מסמך",
        p: "ייעוץ ששווה משהו לא נגמר במסמך יפה. אני מלווה אתכן בהטמעה בפועל: מגדירה את הכלים, בונה את הסקילים והאוטומציות, מדריכה את הצוות, ומוודאת שזה באמת נכנס לשגרת העבודה. המטרה היא תוצאות מדידות, לא עוד קובץ שנשכח בדרייב.",
      },
    ],
    faqTitle: "שאלות על ייעוץ AI",
    faqItems: [
      {
        q: "העסק שלי קטן, AI רלוונטי בכלל אליי?",
        a: "דווקא לעסקים קטנים AI משנה הכי הרבה, כי כל שעה שחוזרת אליכן שווה המון. גם עסק של אדם אחד מבזבז שעות על תוכן, מענה ללקוחות וסדר בדאטה, וזה בדיוק מה ש-AI יכול לקחת. באבחון נראה בדיוק איפה זה רלוונטי אצלכן.",
      },
      {
        q: "כמה עולה ייעוץ AI?",
        a: "אבחון בסיסי דרך הטופס באתר הוא חינם. אבחון מעמיק עם מיפוי ותכנית עבודה מלאה עולה ₪950 (ומתקזז אם מזמינות פרויקט). ליווי הטמעה מלא מתומחר לפי היקף, ונסגור אותו יחד אחרי שנבין מה בדיוק צריך.",
      },
      {
        q: "כמה זמן לוקח לראות תוצאות?",
        a: "חלק מהדברים מרגישים כבר בשבוע הראשון, למשל סקיל שהופך כתיבת תוכן משעות לדקות. הטמעה רחבה יותר לוקחת כמה שבועות. אני מתמקדת קודם ב\"ניצחונות מהירים\" שנותנים החזר מיידי, ומשם בונים הלאה.",
      },
      {
        q: "אני צריכה ידע טכני כדי לעבוד איתך?",
        a: "ממש לא. אני מסבירה הכל בשפה פשוטה, בעברית, בלי להניח שום רקע טכני, ובלי לזלזל בכן. אתן מביאות את ההיכרות עם העסק, אני מביאה את הטכנולוגיה, וביחד מוצאות מה הכי מתאים.",
      },
    ],
    closingTitle: "בואו נמפה איפה AI יחסוך לכן הכי הרבה.",
    closingSub:
      "שיחת אבחון ראשונה, ממוקדת ובלי התחייבות, שבסופה תדעו בדיוק מאיפה להתחיל.",
    closingCta: "דברו איתי בוואטסאפ",
    closingWaMsg: "היי שני, אני רוצה ייעוץ והטמעת AI לעסק",
    auditLine: "או התחילו באבחון חינם",
  },
  en: {
    dir: "ltr",
    kicker: "Service · AI Consulting",
    title: "An AI consultant who speaks business, not just tech.",
    lead:
      "I ran my own business for 10 years, so I know exactly where time gets wasted and where AI actually moves the needle. I map your processes, build a strategy, and guide the rollout, in plain language, no buzzwords and no empty promises.",
    primaryCta: "Talk to me about consulting",
    primaryWaMsg: "Hi Shani, I'd like AI consulting and rollout for my business",
    secondaryCta: "See pricing →",
    includesTitle: "What consulting includes",
    includes: [
      "Full mapping of your business processes",
      "Finding where AI saves the most time",
      "A clear, staged action plan",
      "Recommending the right tools & AI",
      "Hebrew Skills in your business's tone",
      "Guidance through rollout, not just a doc",
      "Training your team to use AI well",
      "Measuring the actual time saved",
    ],
    sections: [
      {
        h: "What does an AI consultant for business do?",
        p: "An AI consultant helps you understand where in your business you can use AI to save time and money, and how to do it right without wasting months on trial and error. I don't sell you a tool, I first understand the business, then recommend exactly what to implement, in what order, and what will return the most hours.",
      },
      {
        h: "How do you start? An AI audit",
        p: "You start with a focused audit session. We sit down, map all your processes and pinpoint where time leaks. You leave with a clear action plan. There's a free audit via the site's form, and a deep audit (mapping + a full action plan) for ₪950, fully credited if you commission a project.",
      },
      {
        h: "What is a Hebrew Skill and why does it matter?",
        p: "Most AI tools think in English and translate, so the Hebrew they produce sounds off and unprofessional. I build Skills, instruction systems that teach AI to write and think in real Hebrew, in your business's exact voice and tone, so what comes out is ready to use and sounds like you.",
      },
      {
        h: "AI rollout, you're not left alone with a document",
        p: "Consulting worth anything doesn't end with a pretty document. I guide the actual rollout: set up the tools, build the Skills and automations, train the team, and make sure it truly enters your workflow. The goal is measurable results, not another file forgotten in a drive.",
      },
    ],
    faqTitle: "AI consulting FAQ",
    faqItems: [
      {
        q: "My business is small, is AI even relevant for me?",
        a: "AI changes the most precisely for small businesses, because every hour returned to you is worth a lot. Even a one-person business wastes hours on content, client replies and data cleanup, which is exactly what AI can take. In the audit we'll see where it's relevant for you.",
      },
      {
        q: "How much does AI consulting cost?",
        a: "A basic audit via the site's form is free. A deep audit with mapping and a full action plan is ₪950 (credited if you commission a project). Full rollout guidance is priced by scope, and we'll set it together once we understand what's needed.",
      },
      {
        q: "How long until I see results?",
        a: "Some things you feel in the first week, like a Skill that turns content writing from hours into minutes. Broader rollout takes a few weeks. I focus first on 'quick wins' that give an immediate return, and build from there.",
      },
      {
        q: "Do I need technical knowledge to work with you?",
        a: "Not at all. I explain everything in plain language, in Hebrew, assuming no technical background, and never talking down to you. You bring the knowledge of your business, I bring the technology, and together we find what fits best.",
      },
    ],
    closingTitle: "Let's map where AI will save you the most.",
    closingSub:
      "A first audit call, focused and no-commitment, that ends with you knowing exactly where to start.",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like AI consulting and rollout for my business",
    auditLine: "Or start with a free audit",
  },
};

export default function AiConsultingPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
