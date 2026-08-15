"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · אוטומציות",
    title: "אוטומציות שעובדות בשבילכם 24/7, גם כשאתם ישנים.",
    lead:
      "אני מחברת את הכלים שלכם, טפסים, וואטסאפ, מיילים, CRM ולוח שנה, לאוטומציות n8n + Claude שמטפלות בלידים, בתוכן ובמענה לבד. הטכנולוגיה עושה את העבודה השחורה, ואתם מתפנים לעסק עצמו.",
    primaryCta: "דברו איתי על אוטומציה",
    primaryWaMsg: "היי שני, אני רוצה אוטומציה לעסק",
    secondaryCta: "לצפייה במחירים ←",
    includesTitle: "מה אפשר לאטמט",
    includes: [
      "מענה אוטומטי בוואטסאפ ללידים",
      "לכידת לידים מטפסים ישר ל-CRM",
      "בוט וואטסאפ חכם בעברית",
      "שליחת מיילים ותזכורות אוטומטית",
      "תמחור והצעות מחיר אוטומטיות",
      "חיבור בין כל הכלים שלכם",
      "התראות פנימיות על כל פנייה",
      "דוחות חודשיים אוטומטיים",
    ],
    liveDemo: {
      title: "ככה זה נראה כשזה רץ",
      sub: "זו לא הדמיה, זה בדיוק מה שקורה אצלי כשנכנסת פנייה חדשה. אותה מכונה אני בונה לעסק שלכם.",
    },
    products: {
      title: "ארבע דרגות, מסלול אחד",
      note: "אלה לא ארבעה מוצרים נפרדים שצריך לבחור ביניהם. ככל שהפניות אצלכם מגוונות יותר, כך עולים דרגה. אפשר להתחיל בכל נקודה ולהרחיב בהמשך.",
      labels: { fit: "מתי זה מתאים", includes: "מה כלול", forWho: "למי זה מתאים", notFor: "מתי זה לא נכון", example: "לדוגמה" },
      items: [
        {
          name: "דרגה 1 · אוטומציה בודדת",
          price: "1,400 ₪",
          fit: "יש פעולה אחת שאתם עושים ידנית כמעט כל יום, ואתם יודעים בדיוק מה היא.",
          includes: "תהליך אחד מקצה לקצה, חיבור לכלים שכבר יש לכם, וניטור שמתריע אם משהו נופל.",
          forWho: "מרפאות, מספרות, סטודיו וכל עסק שמנהל תורים, שולח תזכורות או מקליד פניות לגיליון.",
        },
        {
          name: "דרגה 2 · בוט וואטסאפ",
          price: "2,400 ₪",
          fit: "אותן שתיים שלוש שאלות חוזרות אצלכם כל יום, ואתם מפספסים פניות בערב ובסופי שבוע.",
          includes: "מענה בעברית בטון של העסק, שעות פעילות, והעברה אליכם ברגע שהשיחה דורשת אתכם.",
          forWho: "מסעדות, מרפאות, מספרות, מכוני יופי, ונותני שירות שמקבלים הרבה הודעות.",
          notFor: "כל פנייה אצלכם שונה ודורשת שיקול דעת. אז דרגה 3 נכונה יותר.",
        },
        {
          name: "דרגה 3 · סוכן AI עם סקיל עברי",
          price: "4,900 ₪",
          fit: "כל פנייה אצלכם שונה, ואי אפשר לענות עליה בתשובה מוכנה מראש.",
          includes: "הבנת הקשר, זיכרון של השיחה, קביעת פגישה ביומן, תמחור לפי הכללים שלכם וסינון פניות שלא מתאימות.",
          forWho: "יועצים, בעלי מקצוע עם תמחור משתנה, ועסקים שמקבלים הרבה פניות שדורשות בירור לפני שיחה.",
        },
        {
          name: "דרגה 4 · מערכת AI מלאה",
          price: "7,900 ₪",
          fit: "אתם מתחילים מאפס, או בונים את הנוכחות הדיגיטלית מחדש ורוצים שהכל ידבר אחד עם השני.",
          includes: "אתר, סוכן AI, אוטומציות וריכוז הפניות במקום אחד. הכל מחובר, במחיר נמוך מרכישה בנפרד.",
          forWho: "עסקים שרוצים להקים הכל בבת אחת במקום להוסיף חלק כל כמה חודשים.",
        },
      ],
    },
    alsoTitle: "שירותים נוספים",
    also: [
      { label: "אתרים", href: "/websites", desc: "אתר מהיר שמותאם למובייל ומחובר לוואטסאפ." },
      { label: "ייעוץ ותכנון", href: "/ai-consulting", desc: "אבחון שמסמן מה שווה לתקן קודם." },
    ],
    sections: [
      {
        h: "מה זה אוטומציה לעסק ולמה צריך אותה?",
        p: "אוטומציה היא חיבור בין הכלים שלכם כך שהם מדברים ביניהם לבד. במקום להעתיק ידנית פרטים מטופס ל-CRM, לענות לכל לקוח באותן שאלות, ולשלוח תזכורות ידנית, המערכת עושה את זה אוטומטית, בלי טעויות אנוש ובלי לשכוח. התוצאה: מענה מהיר יותר, פחות לידים שנופלים בין הכיסאות, ושעות שחוזרות אליכם כל שבוע.",
      },
      {
        h: "אוטומציה לוואטסאפ לעסק, איך זה עובד?",
        p: "כשלקוח משאיר פנייה, האוטומציה יכולה לשלוח לו הודעת וואטסאפ אוטומטית תוך שניות, לענות על שאלות נפוצות, ואפילו לתאם פגישה, הכל בעברית טבעית ובטון של העסק שלכם. אפשר להקים בוט כפרויקט חד-פעמי, ולהוסיף תחזוקה חודשית רק אם רוצים.",
      },
      {
        h: "כמה עולה אוטומציה לעסק?",
        p: "תלוי מה בונים: אוטומציה בודדת ללכידת לידים היא פרויקט אחד, מערכת שמחברת וואטסאפ, יומן, מייל וגיליונות היא פרויקט אחר. המחירים מפורסמים במלואם בעמוד המחירים: אוטומציה בודדת ₪1,400, בוט וואטסאפ ₪2,400, סוכן AI ₪4,900, ומערכת מלאה ₪7,900. עלויות שוטפות של כלים תמיד מפורטות בנפרד ועל שמכם.",
      },
      {
        h: "מכונת הלידים שלי, הדגמה חיה",
        p: "הדף /audit באתר הזה הוא בעצמו אוטומציה חיה: לקוח ממלא טופס אבחון, אוטומציית n8n קולטת את התשובות תוך שניות, וסוכני Claude חוקרים את העסק ומכינים לי תדריך מלא לשיחה איתו, 24/7. אותה מכונה בדיוק אני יכולה לבנות לעסק שלכם.",
      },
    ],
    faqTitle: "שאלות על אוטומציות",
    faqItems: [
      {
        q: "צריך להבין בטכנולוגיה כדי להשתמש בזה?",
        a: "לא. אני בונה את כל האוטומציה, מחברת אותה למערכות שלכם, ומגדירה הכל שירוץ לבד. אתם פשוט רואים את התוצאות: לידים שנכנסים, מענה שיוצא, ודוחות. אם צריך, אני גם מדריכה אתכם איך לנהל את זה ביומיום.",
      },
      {
        q: "אילו כלים אפשר לחבר?",
        a: "כמעט הכל: וואטסאפ, טפסים, Gmail, גוגל שיטס, לוח שנה, מערכות CRM, מערכות סליקה ועוד. n8n מתחבר למאות שירותים, ומה שאין לו חיבור מוכן, אפשר לחבר דרך API. בשיחה נמפה בדיוק אילו כלים יש לכם ומה כדאי לחבר.",
      },
      {
        q: "מה קורה אם האוטומציה נתקעת?",
        a: "אני בונה את האוטומציות עם גיבוי, למשל אם וובהוק נכשל, הפנייה עדיין מגיעה אליכם בוואטסאפ, כך ששום ליד לא הולך לאיבוד. בתחזוקה החודשית אני מנטרת את האוטומציות ומתקנת בעיות לפני שאתם בכלל שמים לב.",
      },
      {
        q: "האוטומציה תעבוד בעברית?",
        a: "כן, וזה בדיוק ההתמחות שלי. רוב כלי ה-AI חושבים באנגלית ויוצא מהם עברית מוזרה. אני בונה סקילים בעברית טבעית שגורמים ל-AI לענות ולכתוב בטון של העסק שלכם, כך שהלקוחות אפילו לא ירגישו שזו מערכת אוטומטית.",
      },
    ],
    closingTitle: "בואו נמצא מה כדאי לאטמט אצלכם.",
    closingSub:
      "בשיחה קצרה נזהה איפה בורח לכם הכי הרבה זמן ומה אפשר להעביר לאוטומציה. בלי התחייבות.",
    closingCta: "דברו איתי בוואטסאפ",
    closingWaMsg: "היי שני, אני רוצה אוטומציה לעסק",
    auditLine: "או התחילו באבחון חינם",
  },
  en: {
    dir: "ltr",
    kicker: "Service · Automations",
    title: "Automations that work for you 24/7, even while you sleep.",
    lead:
      "I connect your tools, forms, WhatsApp, email, CRM and calendar, into n8n + Claude automations that handle leads, content and replies on their own. Technology does the grunt work, and you get back to running the business.",
    primaryCta: "Talk to me about automation",
    primaryWaMsg: "Hi Shani, I'd like an automation for my business",
    secondaryCta: "See pricing →",
    includesTitle: "What can be automated",
    includes: [
      "Automatic WhatsApp replies to leads",
      "Lead capture from forms straight to CRM",
      "A smart Hebrew WhatsApp bot",
      "Automatic emails and reminders",
      "Automatic pricing and proposals",
      "Connecting all your tools together",
      "Internal alerts on every inquiry",
      "Automatic monthly reports",
    ],
    liveDemo: {
      title: "This is what it looks like running",
      sub: "This is not a mockup, it is exactly what happens on my end when a new enquiry arrives. The same machine gets built for your business.",
    },
    products: {
      title: "Four levels, one path",
      note: "These are not four separate products to choose between. The more varied your enquiries are, the higher you go. You can start anywhere and extend later.",
      labels: { fit: "When it fits", includes: "What is included", forWho: "Who it is for", notFor: "When it is not right", example: "Example" },
      items: [
        {
          name: "Level 1 · Single automation",
          price: "1,400 NIS",
          fit: "There is one action you do by hand almost every day, and you know exactly what it is.",
          includes: "One end-to-end process, a connection to the tools you already use, and monitoring that alerts you if something fails.",
          forWho: "Clinics, salons, studios and any business managing appointments, sending reminders or typing enquiries into a sheet.",
        },
        {
          name: "Level 2 · WhatsApp bot",
          price: "2,400 NIS",
          fit: "The same two or three questions come up every day, and you miss enquiries in the evenings and at weekends.",
          includes: "Replies in Hebrew in your business's tone, opening hours, and a handover to you the moment the conversation needs you.",
          forWho: "Restaurants, clinics, salons, beauty studios and service providers who get a lot of messages.",
          notFor: "Every enquiry you get is different and needs judgement. Level 3 is a better fit.",
        },
        {
          name: "Level 3 · AI agent with a Hebrew skill",
          price: "4,900 NIS",
          fit: "Every enquiry is different and cannot be answered with a prepared reply.",
          includes: "Context understanding, conversation memory, booking into your calendar, pricing by your rules and filtering out enquiries that do not fit.",
          forWho: "Consultants, professionals with variable pricing, and businesses with enquiries that need qualifying before a call.",
        },
        {
          name: "Level 4 · Full AI system",
          price: "7,900 NIS",
          fit: "You are starting from scratch, or rebuilding your digital presence and want everything to talk to each other.",
          includes: "A website, an AI agent, automations and all enquiries in one place. Everything connected, for less than buying separately.",
          forWho: "Businesses that want to set everything up at once instead of adding a piece every few months.",
        },
      ],
    },
    alsoTitle: "More services",
    also: [
      { label: "Websites", href: "/websites", desc: "A fast, mobile-ready site wired to WhatsApp." },
      { label: "Consulting", href: "/ai-consulting", desc: "An audit that marks what is worth fixing first." },
    ],
    sections: [
      {
        h: "What is business automation and why do you need it?",
        p: "Automation connects your tools so they talk to each other on their own. Instead of copying details from a form to a CRM by hand, answering every client the same questions, and sending reminders manually, the system does it automatically, with no human error and nothing forgotten. The result: faster responses, fewer leads slipping through the cracks, and hours returned to you every week.",
      },
      {
        h: "WhatsApp automation for business, how does it work?",
        p: "When a client leaves an inquiry, the automation can send them a WhatsApp message within seconds, answer common questions, and even book a meeting, all in natural Hebrew and in your business's tone. A bot can be a one-off project, with monthly care added only if you want it.",
      },
      {
        h: "How much does business automation cost?",
        p: "It depends on what we build: a single lead-capture automation is one project, a system connecting WhatsApp, calendar, email and sheets is another. The full price list is published on the pricing page: single automation 1,400 NIS, WhatsApp bot 2,400 NIS, AI agent 4,900 NIS and a full system 7,900 NIS. Running tool costs are always itemized separately, in your name.",
      },
      {
        h: "My lead machine, a live demo",
        p: "The /audit page on this very site is itself a live automation: a client fills in an intake form, an n8n automation captures the answers within seconds, and Claude agents research the business and prepare a full call brief for me, 24/7. I can build that exact same machine for your business.",
      },
    ],
    faqTitle: "Automation FAQ",
    faqItems: [
      {
        q: "Do I need to be technical to use this?",
        a: "No. I build the whole automation, connect it to your systems, and set it all to run on its own. You simply see the results: leads coming in, replies going out, and reports. If needed, I also show you how to manage it day to day.",
      },
      {
        q: "Which tools can be connected?",
        a: "Almost anything: WhatsApp, forms, Gmail, Google Sheets, calendar, CRM systems, payment systems and more. n8n connects to hundreds of services, and whatever lacks a ready connector can be linked via API. On a call we'll map exactly which tools you have and what's worth connecting.",
      },
      {
        q: "What happens if the automation breaks?",
        a: "I build automations with a fallback, for example if a webhook fails, the inquiry still reaches you on WhatsApp, so no lead is ever lost. With monthly care I monitor the automations and fix issues before you even notice.",
      },
      {
        q: "Will the automation work in Hebrew?",
        a: "Yes, and that's exactly my specialty. Most AI tools think in English and produce awkward Hebrew. I build real Hebrew Skills that make AI reply and write in your business's tone, so clients won't even feel it's an automated system.",
      },
    ],
    closingTitle: "Let's find what's worth automating for you.",
    closingSub:
      "In a short call we'll spot where you lose the most time and what can move to automation. No commitment.",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like an automation for my business",
    auditLine: "Or start with a free audit",
  },
};

export default function AutomationsPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
