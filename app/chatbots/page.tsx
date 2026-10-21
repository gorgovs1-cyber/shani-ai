"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · צ׳אטבוטים וסוכני AI",
    title: "צ׳אטבוטים וסוכני AI שעונים ללקוחות שלכם",
    lead:
      "בוט שמכיר את העסק עונה בוואטסאפ ובאתר, מסנן פניות וקובע פגישות, ומעביר אליכם רק את מה שצריך אדם. בונים את סוג הבוט שמתאים לעסק ומחברים אותו לכלים שכבר עובדים איתם.",
    primaryCta: "דברו איתי על בוט",
    primaryWaMsg: "היי שני, אני רוצה צ׳אטבוט לעסק",
    secondaryCta: "סוגי הבוטים",
    includesTitle: "מה בוט יכול לעשות בשבילכם",
    includes: [
      "עונה על שאלות חוזרות בטון של העסק",
      "מסנן פניות ושואל שאלות הבהרה",
      "מציע מועדים וקובע פגישות",
      "שומר כל פנייה במקום אחד, כולל ב-CRM",
      "מעביר אליכם שיחה שצריכה אדם",
      "עונה גם בערב ובסופ״ש",
    ],
    liveDemo: {
      title: "ככה בוט מטפל בפנייה",
      sub: "פנייה נכנסת, הבוט מבין מה מבקשים, עונה ושומר את הפנייה עם תזכורת מעקב.",
    },
    products: {
      title: "סוגי בוטים",
      labels: { includes: "מה כלול", forWho: "למי זה מתאים", notFor: "מתי זה לא נכון", example: "לדוגמה" },
      items: [
        {
          name: "בוט וואטסאפ לעסק",
          includes: "מענה בטון העסק, שעות פעילות, תשובות לשאלות נפוצות, והעברה אליכם כשצריך.",
          forWho: "נותני שירות, מרפאות, סטודיו ועסקים שמקבלים הרבה הודעות.",
        },
        {
          name: "צ׳אטבוט לאתר",
          includes: "חלון שיחה באתר שעונה מתוך המידע של העסק, ומשאיר פרטים כשמישהו רוצה שתחזרו אליו.",
          forWho: "עסקים שהאתר שלהם מביא תנועה, ורוצים שיותר ממנה יהפוך לפניות.",
        },
        {
          name: "סוכן AI בעברית",
          includes: "הבנת הקשר וזיכרון שיחה, תשובות לפי הכללים שלכם, ופעולות כמו עדכון ה-CRM או שליחת סיכום.",
          forWho: "יועצים, נותני שירות מקצועי ועסקים שהפניות שלהם דורשות בירור.",
        },
        {
          name: "בוט שמסנן פניות וקובע פגישות",
          includes: "שאלות סינון שאתם מגדירים, הצעת מועדים מהיומן, קביעת פגישה וסיכום הפנייה אליכם.",
          forWho: "עסקים שעובדים עם שיחות היכרות או פגישות ייעוץ.",
        },
      ],
    },
    alsoTitle: "מה מתחבר לבוט",
    also: [
      { label: "מערכת CRM מודולרית", href: "/#crm", desc: "כל השיחות והפניות שהבוט מטפל בהן נכנסות למקום אחד." },
      { label: "אתר שמביא פניות", href: "/websites", desc: "האתר מביא את הפניות, והבוט עונה להן." },
    ],
    sections: [
      {
        h: "אוטומציות כהרחבה לבוט",
        p: "את הבוט אפשר להרחיב באוטומציות: הפנייה נשמרת ב-CRM, נשלח אישור במייל, נקבעת תזכורת והכלים שלכם מתעדכנים לבד, בלי העתקות ידניות.",
      },
    ],
    faqTitle: "שאלות על צ׳אטבוטים וסוכני AI",
    faqItems: [
      {
        q: "מה ההבדל בין צ׳אטבוט לסוכן AI?",
        a: "צ׳אטבוט עונה לפי תסריט ומידע שהגדרנו מראש. סוכן AI מבין את ההקשר של השיחה, שואל שאלות המשך ויכול לבצע פעולות כמו קביעת פגישה או עדכון CRM, לפי הכללים שלכם.",
      },
      {
        q: "בוט וואטסאפ לעסק: איך זה עובד?",
        a: "אנחנו מגדירים על אילו שאלות הבוט עונה, באיזה טון, ומתי הוא מעביר את השיחה אליכם, בהתאם לשירות שלכם ולדרך שבה אתם מדברים עם לקוחות.",
      },
      {
        q: "איך מחליטים איזה בוט מתאים?",
        a: "מתחילים בבדיקת התאמה חינם ושיחה קצרה, מבינים מאיפה מגיעות הפניות ומה שואלים אתכם, ואז אני שולחת הצעה מסודרת לסוג הבוט שמתאים לעסק.",
      },
      {
        q: "מה קורה כשהבוט לא יודע לענות?",
        a: "הבוט מעביר את השיחה אליכם עם סיכום של מה שנשאל, כדי שאף פנייה לא תלך לאיבוד.",
      },
      {
        q: "הבוט יעבוד בעברית?",
        a: "כן. אני מלמדת את הבוט לכתוב בעברית טבעית ובטון של העסק שלכם, כדי שלקוחות לא ירגישו שהם מדברים עם מכונה.",
      },
      {
        q: "צריך ידע טכני כדי להשתמש בזה?",
        a: "לא. אני בונה את הבוט, מחברת אותו לכלים שלכם ומראה לכם איך לעקוב אחרי השיחות ולעדכן את המידע שלו.",
      },
    ],
    bridge: { text: "הבוט עונה לפניות שכבר נכנסות. השלב הבא הוא להביא יותר מהן.", linkLabel: "לאתרים", href: "/websites" },
    closingTitle: "בואו נבדוק איזה בוט מתאים לעסק שלכם",
    closingSub: "בשיחה קצרה נבין מאיפה מגיעות הפניות ומה כדאי שהבוט יעשה קודם.",
    closingCta: "דברו איתי בוואטסאפ",
    closingWaMsg: "היי שני, אני רוצה צ׳אטבוט לעסק",
    auditLine: "או התחילו בבדיקת התאמה חינם",
  },
  en: {
    dir: "ltr",
    kicker: "Service · AI chatbots and agents",
    title: "AI chatbots and agents that answer your customers",
    lead:
      "A bot that knows your business answers on WhatsApp and on your website, qualifies enquiries and books meetings, and hands you only what needs a person. We build the type of bot that fits your business and connect it to the tools you already use.",
    primaryCta: "Talk to me about a bot",
    primaryWaMsg: "Hi Shani, I'd like a chatbot for my business",
    secondaryCta: "Types of bots",
    includesTitle: "What a bot can do for you",
    includes: [
      "Answers repeat questions in your tone",
      "Qualifies enquiries and asks follow-up questions",
      "Offers times and books meetings",
      "Saves every enquiry in one place, including the CRM",
      "Hands you a conversation that needs a person",
      "Replies in the evening and at weekends too",
    ],
    liveDemo: {
      title: "How a bot handles an enquiry",
      sub: "An enquiry arrives, the bot understands the request, replies and saves it with a follow-up reminder.",
    },
    products: {
      title: "Types of bots",
      labels: { includes: "What is included", forWho: "Who it is for", notFor: "When it is not right", example: "Example" },
      items: [
        {
          name: "WhatsApp bot for your business",
          includes: "Replies in your business's tone, opening hours, answers to common questions, and a handover to you when needed.",
          forWho: "Service providers, clinics, studios and businesses that get a lot of messages.",
        },
        {
          name: "Website chatbot",
          includes: "A chat window on your site that answers from your business information and takes details when someone wants you to call back.",
          forWho: "Businesses whose website brings traffic and who want more of it to become enquiries.",
        },
        {
          name: "AI agent in Hebrew",
          includes: "Context and conversation memory, replies by your rules, and actions such as updating the CRM or sending a summary.",
          forWho: "Consultants, professional service providers and businesses whose enquiries need qualifying.",
        },
        {
          name: "Lead-qualifying and booking bot",
          includes: "Screening questions you define, times offered from your calendar, booking, and a summary of each enquiry sent to you.",
          forWho: "Businesses that work with intro calls or consultations.",
        },
      ],
    },
    alsoTitle: "What connects to the bot",
    also: [
      { label: "A modular CRM", href: "/#crm", desc: "Every conversation and enquiry the bot handles lands in one place." },
      { label: "Websites that bring enquiries", href: "/websites", desc: "The website brings the enquiries, and the bot answers them." },
    ],
    sections: [
      {
        h: "Automations as a bot add-on",
        p: "A bot can be extended with automations: the enquiry is saved to the CRM, a confirmation email goes out, a reminder is set and your tools update themselves, with no manual copying.",
      },
    ],
    faqTitle: "AI chatbot and agent FAQ",
    faqItems: [
      {
        q: "What is the difference between a chatbot and an AI agent?",
        a: "A chatbot answers from a script and information we set up in advance. An AI agent understands the context of the conversation, asks follow-up questions and can take actions such as booking a meeting or updating the CRM, by your rules.",
      },
      {
        q: "How does a WhatsApp bot for a business work?",
        a: "We define which questions the bot answers, in what tone, and when it hands the conversation to you, based on your service and the way you talk to customers.",
      },
      {
        q: "How do we decide which bot fits?",
        a: "We start with the free fit check and a short call, look at where enquiries come from and what people ask you, and then I send a clear proposal for the type of bot that fits your business.",
      },
      {
        q: "What happens when the bot cannot answer?",
        a: "The bot hands the conversation to you with a summary of what was asked, so no enquiry gets lost.",
      },
      {
        q: "Will the bot work in Hebrew?",
        a: "Yes. I teach the bot to write natural Hebrew in your business's tone, so customers do not feel they are talking to a machine.",
      },
      {
        q: "Do I need to be technical to use this?",
        a: "No. I build the bot, connect it to your tools and show you how to follow the conversations and update what it knows.",
      },
    ],
    bridge: { text: "The bot answers the enquiries that already come in. The next step is getting more of them.", linkLabel: "See websites", href: "/websites" },
    closingTitle: "Let's find the bot that fits your business",
    closingSub: "In a short call we will see where enquiries come from and what the bot should do first.",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like a chatbot for my business",
    auditLine: "Or start with a free fit check",
  },
};

export default function ChatbotsPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
