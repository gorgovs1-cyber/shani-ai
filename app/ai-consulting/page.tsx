"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · ייעוץ ותכנון",
    title: "בואו נעשה סדר במה שהעסק צריך",
    lead:
      "לפעמים ברור שמשהו צריך להשתנות בעסק, אבל קשה לדעת מאיפה להתחיל, אז אני עוברת איתכם על מה שקורה ביומיום ועוזרת להבין מה כדאי לבנות, לחבר או פשוט לעשות אחרת.",
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
      "עזרה בהגדרה ובהפעלת הכלים",
      "הדרכת צוות בשימוש נכון ב-AI",
      "מדידה של החיסכון בפועל",
    ],
    products: {
      title: "איך מתחילים",
      note: "מתחילים באבחון חינמי כדי להבין מה אתם צריכים, ואם נחליט להתקדם לפרויקט אשלח לכם הצעה בהתאם.",
      labels: { fit: "מתי זה מתאים", includes: "מה מקבלים", forWho: "למי זה מתאים", notFor: "מתי זה לא נכון", example: "לדוגמה" },
      items: [
        {
          name: "אבחון העסק ללא עלות",
          cta: { label: "למילוי האבחון החינמי", href: "/audit" },
          price: "ללא עלות",
          fit: "יודעים שמשהו בעסק גוזל זמן, אבל לא בטוחים מה לתקן קודם או איפה AI רלוונטי.",
          includes: "טופס קצר על העסק והכלים. תוך יום עסקים אני חוזרת עם כיוונים, ואז שיחת היכרות של 20 דקות. בסיום מגיעה הצעה מסודרת: מה נבנה, כמה זה עולה, ולוח זמנים.",
          forWho: "בעלי עסקים שרוצים להבין מה נחוץ להם לפני שמתחייבים לפרויקט.",
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
        h: "איך אני יכולה לעזור לכם לעשות סדר?",
        p: "אני בודקת איתכם איך מגיעות פניות, מה קורה איתן אחר כך ואילו משימות לוקחות לכם זמן, ומשם נבין אילו כלים יכולים לעזור ומה כדאי לקדם קודם.",
      },
      {
        h: "איך מתחילים? בדיקת התאמה חינם",
        p: "ממלאים את האבחון החינמי על העסק. אני עוברת על התשובות, חוזרת עם כיוונים ראשוניים ובודקת איתכם מה נכון לקדם. זה אותו אבחון שאליו מגיעים דרך ״בדיקת התאמה חינם״.",
      },
      {
        h: "ואיך שומרים על השפה של העסק?",
        p: "אם משלבים כלי שכותב תוכן או עונה ללקוחות, אני מגדירה איתכם איך הוא צריך להתנסח ועוברת על דוגמאות, כדי שהשפה תתאים לכם וללקוחות שלכם.",
      },
      {
        h: "מה קורה אם מחליטים להתקדם?",
        p: "נסכם מה בונים ומה כלול בעבודה, ואני אדאג לחיבורים ולהסבר על השימוש בכלים כדי שתוכלו לעבוד איתם ביומיום.",
      },
    ],
    faqTitle: "עוד דברים שאולי תרצו לדעת",
    faqItems: [
      {
        q: "איך יודעים אם אוטומציה מתאימה לעסק שלי?",
        a: "בודקים אילו משימות חוזרות על עצמן, איפה פניות מתעכבות ומה דורש את שיקול הדעת שלכם. לא כל תהליך צריך אוטומציה, ולא כל אוטומציה צריכה בינה מלאכותית. ההמלצה נבנית לפי הצורך בפועל.",
      },
      {
        q: "כמה זמן לוקח לראות תוצאות?",
        a: "זה תלוי במה שבונים ובכלים שכבר יש בעסק, אז לפני שמתחילים נסכם לוח זמנים ונבחר מה כדאי להפעיל קודם.",
      },
      {
        q: "צריך ידע טכני כדי לעבוד איתך?",
        a: "לא צריך ידע טכני, אתם מכירים את העסק שלכם ואני כאן כדי להסביר את האפשרויות ולעזור לבחור מה מתאים.",
      },
    ],
    bridge: { text: "רוצים להבין אילו פעולות אפשר להעביר למערכת?", linkLabel: "לאוטומציות", href: "/automations" },
    closingTitle: "ספרו לי מה הייתם רוצים לשפר",
    closingSub:
      "אבחון חינמי שעוזר לעשות סדר בצרכים ולבחור מה כדאי לקדם בעסק.",
    closingCta: "דברו איתי בוואטסאפ",
    closingWaMsg: "היי שני, אני רוצה ייעוץ והטמעת AI לעסק",
    auditLine: "או התחילו באבחון חינם",
  },
  en: {
    dir: "ltr",
    kicker: "Service · Consulting & planning",
    title: "Understand what your business needs — and what to build first",
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
          name: "Free business assessment",
          cta: { label: "Start the free assessment", href: "/audit" },
          price: "Free",
          fit: "Something in the business is eating too much time, but you're not sure what to fix first or where AI is relevant.",
          includes: "A short form about the business and tools. Within one working day I come back with directions, then a 20-minute call. A full proposal follows: what gets built, what it costs, and a timeline.",
          forWho: "Business owners who want to understand what they need before committing to a project.",
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
        p: "An AI consultant helps you find where AI saves time and money, without wasting months on trial and error. I don't sell a tool — I first understand the business, then recommend what to implement, in what order, and what returns the most hours.",
      },
      {
        h: "How do you start? An AI audit",
        p: "You start with a focused audit that maps your processes and pinpoints where time leaks — full details above. You leave with a clear action plan.",
      },
      {
        h: "Why does AI write such odd Hebrew, and how do you fix it?",
        p: "Most AI tools think in English and translate, so the Hebrew comes out bent and inflated. I teach the system to write like a real person, in your business's tone — ready to send, sounding like you, not a machine.",
      },
      {
        h: "AI rollout — you're not left alone with a document",
        p: "Consulting worth anything doesn't end with a pretty document. I guide the rollout: set up tools, build automations, train the team. The goal is results you can measure, not another file forgotten in a drive.",
      },
    ],
    faqTitle: "AI consulting FAQ",
    faqItems: [
      {
        q: "How do I know if automation fits my business?",
        a: "We look at recurring tasks, delayed enquiries and decisions that need your judgement. Not every process needs automation, and not every automation needs AI. Recommendations follow your actual needs.",
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
    bridge: { text: "Once we've mapped what's leaking, the next step is closing that gap.", linkLabel: "See automations", href: "/automations" },
    closingTitle: "Let's map where AI will save you the most",
    closingSub:
      "One free business assessment to clarify your needs and decide what to work on next.",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like AI consulting and rollout for my business",
    auditLine: "Or start with a free audit",
  },
};

export default function AiConsultingPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
