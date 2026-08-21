"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";
import ROICalculator from "@/components/ROICalculator";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · אוטומציות",
    title: "אוטומציות שעובדות בשבילכם 24/7, גם כשאתם ישנים",
    lead:
      "אני מחברת את הכלים שכבר יש לכם, טפסים, וואטסאפ, מיילים, יומן ומערכת ניהול הלקוחות, למערכת אחת שמטפלת בפניות ובמענה לבד. הטכנולוגיה עושה את העבודה השחורה, ואתם מתפנים לעסק עצמו.",
    primaryCta: "דברו איתי על אוטומציה",
    primaryWaMsg: "היי שני, אני רוצה אוטומציה לעסק",
    secondaryCta: "לצפייה במחירים",
    includesTitle: "מה אפשר להעביר לאוטומציה",
    includes: [
      "מענה אוטומטי בוואטסאפ לכל פנייה",
      "פניות מהטופס נכנסות ישר למערכת",
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
          fit: "פעולה אחת שעושים ידנית כמעט כל יום, וברור בדיוק מה היא.",
          includes: "תהליך אחד מקצה לקצה, מחובר לכלים שיש לכם, וניטור שמתריע על תקלה.",
          forWho: "מרפאות, מספרות, סטודיו — כל עסק שמנהל תורים או מקליד פניות לגיליון.",
        },
        {
          name: "דרגה 2 · בוט וואטסאפ",
          price: "2,400 ₪",
          fit: "אותן שאלות חוזרות כל יום, ופניות נופלות בערב ובסופ״ש.",
          includes: "מענה בעברית בטון העסק, שעות פעילות, והעברה אליכם כשצריך.",
          forWho: "מסעדות, מרפאות, מספרות, מכוני יופי, ונותני שירות שמקבלים הרבה הודעות.",
          notFor: "כל פנייה אצלכם שונה ודורשת שיקול דעת? דרגה 3 נכונה יותר.",
        },
        {
          name: "דרגה 3 · סוכן AI שמדבר עברית",
          price: "4,900 ₪",
          fit: "כל פנייה אצלכם שונה, ואי אפשר לענות עליה בתשובה מוכנה מראש.",
          includes: "הבנת הקשר וזיכרון שיחה, קביעת פגישה, תמחור לפי הכללים שלכם, וסינון פניות.",
          forWho: "יועצים, בעלי תמחור משתנה, ועסקים עם פניות שדורשות בירור לפני שיחה.",
        },
        {
          name: "דרגה 4 · מערכת AI מלאה",
          price: "7,900 ₪",
          fit: "מתחילים מאפס, או בונים נוכחות דיגיטלית מחדש ורוצים שהכל מחובר.",
          includes: "אתר, סוכן AI, אוטומציות וריכוז הפניות — הכל מחובר, במחיר נמוך מרכישה בנפרד.",
          forWho: "עסקים שרוצים להקים הכל בבת אחת במקום להוסיף חלק כל כמה חודשים.",
        },
      ],
    },
    alsoTitle: "לפני האוטומציה, ואחריה",
    also: [
      { label: "ייעוץ ותכנון", href: "/ai-consulting", desc: "עוד לא ברור מה להעביר לאוטומציה קודם? האבחון מראה איפה בורח הזמן, ומשם בונים." },
      { label: "אתרים", href: "/websites", desc: "אוטומציה שווה כשיש פניות שנכנסות אליה. האתר הוא זה שמביא אותן." },
    ],
    sections: [
      {
        h: "מה זה אוטומציה לעסק ולמה צריך אותה?",
        p: "אוטומציה מחברת בין הכלים שלכם כך שהם מדברים לבד — במקום להעתיק פרטים ביד, לענות שוב ושוב על אותן שאלות, או לשלוח תזכורות ידנית. התוצאה: מענה מהיר יותר, פחות פניות שנופלות, ושעות שחוזרות אליכם כל שבוע.",
      },
      {
        h: "אוטומציה לוואטסאפ לעסק, איך זה עובד?",
        p: "כשלקוח משאיר פנייה, האוטומציה שולחת וואטסאפ תוך שניות, עונה על השאלות הנפוצות ואפילו קובעת פגישה — בעברית של בן אדם ובטון העסק. אפשר להקים כפרויקט חד-פעמי, ולהוסיף Shani Care רק אם רוצים.",
      },
      {
        h: "כמה עולה אוטומציה לעסק?",
        p: "המחירים המלאים למעלה, ליד כל דרגה, ובעמוד המחירים. עלויות שוטפות של כלים תמיד מפורטות בנפרד ורשומות על שמכם.",
      },
      {
        h: "מכונת הלידים שלי, הדגמה חיה",
        p: "טופס האבחון באתר הזה הוא בעצמו ההדגמה: פנייה נכנסת, וסוכני AI מכינים לי תדריך מלא תוך שניות, בכל שעה. את אותה מכונה אני בונה לעסק שלכם.",
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
        a: "כמעט הכל: וואטסאפ, טפסים, מייל, גוגל שיטס, יומן, מערכות ניהול לקוחות, מערכות סליקה ועוד. הכלים שאני עובדת איתם מתחברים למאות שירותים, ומה שאין לו חיבור מוכן, אפשר לחבר בהתאמה אישית. בשיחה נמפה בדיוק אילו כלים יש לכם ומה כדאי לחבר.",
      },
      {
        q: "מה קורה אם האוטומציה נתקעת?",
        a: "אני בונה כל אוטומציה עם רשת ביטחון, כך שאם חלק מהתהליך נופל, הפנייה עדיין מגיעה אליכם בוואטסאפ ואף אחד לא הולך לאיבוד. ב-Shani Care, הליווי החודשי, אני עוקבת אחרי האוטומציות ומתקנת בעיות לפני שאתם בכלל שמים לב.",
      },
      {
        q: "האוטומציה תעבוד בעברית?",
        a: "כן, וזה בדיוק ההתמחות שלי. רוב כלי ה-AI חושבים באנגלית, ויוצאת מהם עברית מוזרה שמריחים ממרחק. אני מלמדת את המערכת לכתוב בעברית של בן אדם ובטון של העסק שלכם, כך שהלקוחות לא ירגישו שהם מדברים עם מכונה.",
      },
    ],
    bridge: { text: "האוטומציה מטפלת בפניות שכבר נכנסות. השלב הבא הוא שיהיו יותר פניות.", linkLabel: "לאתרים", href: "/websites" },
    closingTitle: "בואו נמצא מה כדאי להעביר לאוטומציה אצלכם",
    closingSub:
      "בשיחה קצרה נזהה איפה בורח לכם הכי הרבה זמן ומה אפשר להעביר למערכת, בלי התחייבות.",
    closingCta: "דברו איתי בוואטסאפ",
    closingWaMsg: "היי שני, אני רוצה אוטומציה לעסק",
    auditLine: "או התחילו באבחון חינם",
  },
  en: {
    dir: "ltr",
    kicker: "Service · Automations",
    title: "Automations that work for you 24/7, even while you sleep",
    lead:
      "I connect the tools you already have, forms, WhatsApp, email, calendar and your customer records, into one system that handles enquiries and replies on its own. Technology does the grunt work, and you get back to running the business.",
    primaryCta: "Talk to me about automation",
    primaryWaMsg: "Hi Shani, I'd like an automation for my business",
    secondaryCta: "See pricing",
    includesTitle: "What can be automated",
    includes: [
      "Automatic WhatsApp replies to every enquiry",
      "Form submissions land straight in the system",
      "A smart Hebrew WhatsApp bot",
      "Automatic emails and reminders",
      "Automatic pricing and proposals",
      "Connecting all your tools together",
      "Internal alerts on every enquiry",
      "Automatic monthly reports",
    ],
    liveDemo: {
      title: "This is what it looks like running",
      sub: "This is not a mockup; it is exactly what happens on my end when a new enquiry arrives. The same machine gets built for your business.",
    },
    products: {
      title: "Four levels, one path",
      note: "These are not four separate products to choose between. The more varied your enquiries are, the higher you go. You can start anywhere and extend later.",
      labels: { fit: "When it fits", includes: "What is included", forWho: "Who it is for", notFor: "When it is not right", example: "Example" },
      items: [
        {
          name: "Level 1 · Single automation",
          price: "₪1,400",
          fit: "One action you do by hand almost every day, and you know exactly what it is.",
          includes: "One end-to-end process, connected to the tools you already use, with monitoring that alerts on failure.",
          forWho: "Clinics, salons, studios — any business managing appointments or typing enquiries into a sheet.",
        },
        {
          name: "Level 2 · WhatsApp bot",
          price: "₪2,400",
          fit: "The same questions come up every day, and enquiries slip through in the evenings and weekends.",
          includes: "Replies in Hebrew in your business's tone, opening hours, and a handover to you when needed.",
          forWho: "Restaurants, clinics, salons, beauty studios and service providers who get a lot of messages.",
          notFor: "Every enquiry is different and needs judgement? Level 3 is a better fit.",
        },
        {
          name: "Level 3 · An AI agent that speaks Hebrew",
          price: "₪4,900",
          fit: "Every enquiry is different and cannot be answered with a prepared reply.",
          includes: "Context and memory, booking into your calendar, pricing by your rules, and filtering enquiries.",
          forWho: "Consultants, variable-pricing professionals, and businesses with enquiries that need qualifying first.",
        },
        {
          name: "Level 4 · Full AI system",
          price: "₪7,900",
          fit: "Starting from scratch, or rebuilding your digital presence and want everything connected.",
          includes: "Website, AI agent, automations and every enquiry — connected, for less than buying separately.",
          forWho: "Businesses that want to set everything up at once instead of adding a piece every few months.",
        },
      ],
    },
    alsoTitle: "Before the automation, and after",
    also: [
      { label: "Consulting", href: "/ai-consulting", desc: "Not sure yet what to automate first? The audit marks where the time leaks, and you build from there." },
      { label: "Websites", href: "/websites", desc: "Automation is worth most when enquiries are coming in. The site is what brings them." },
    ],
    sections: [
      {
        h: "What is business automation and why do you need it?",
        p: "Automation connects your tools so they talk to each other on their own — instead of copying details by hand, answering the same questions over and over, or sending reminders yourself. The result: faster replies, fewer enquiries slipping through, and hours back every week.",
      },
      {
        h: "WhatsApp automation for business — how does it work?",
        p: "When a client leaves an enquiry, the automation sends a WhatsApp reply within seconds, answers common questions, and can even book a meeting — in natural Hebrew and your business's tone. It can be a one-off project, with Shani Care added only if you want it.",
      },
      {
        h: "How much does business automation cost?",
        p: "Full prices are above, next to each level, and on the pricing page. Running tool costs are always itemised separately, in your name.",
      },
      {
        h: "My lead machine — a live demo",
        p: "The audit form on this site is itself the demo: an enquiry comes in, and AI agents prepare a full call brief for me within seconds, any hour. I build that same machine for your business.",
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
        a: "Almost anything: WhatsApp, forms, email, Google Sheets, calendar, customer-record systems, payment systems and more. The tools I work with connect to hundreds of services, and whatever has no ready connector can be wired up custom. On a call we'll map exactly which tools you have and what's worth connecting.",
      },
      {
        q: "What happens if the automation breaks?",
        a: "I build every automation with a safety net, so if part of the process fails the enquiry still reaches you on WhatsApp and nothing is ever lost. With Shani Care I keep watch over the automations and fix issues before you even notice.",
      },
      {
        q: "Will the automation work in Hebrew?",
        a: "Yes, and that's exactly my specialty. Most AI tools think in English, and the Hebrew that comes out is stilted in a way you can smell from a distance. I teach the system to write in the Hebrew of a real person and in your business's tone, so clients won't feel they're talking to a machine.",
      },
    ],
    bridge: { text: "Automation handles the enquiries that already come in. The next step is getting more of them.", linkLabel: "See websites", href: "/websites" },
    closingTitle: "Let's find what's worth automating for you",
    closingSub:
      "In a short call we'll spot where you lose the most time and what can move to automation. No commitment.",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like an automation for my business",
    auditLine: "Or start with a free audit",
  },
};

export default function AutomationsPage() {
  return <ServicePage copyByLang={copyByLang} beforeClosing={<ROICalculator />} />;
}
