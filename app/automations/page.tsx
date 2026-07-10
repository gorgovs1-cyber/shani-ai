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
    sections: [
      {
        h: "מה זה אוטומציה לעסק ולמה צריך אותה?",
        p: "אוטומציה היא חיבור בין הכלים שלכם כך שהם מדברים ביניהם לבד. במקום להעתיק ידנית פרטים מטופס ל-CRM, לענות לכל לקוח באותן שאלות, ולשלוח תזכורות ידנית, המערכת עושה את זה אוטומטית, בלי טעויות אנוש ובלי לשכוח. התוצאה: מענה מהיר יותר, פחות לידים שנופלים בין הכיסאות, ושעות שחוזרות אליכם כל שבוע.",
      },
      {
        h: "אוטומציה לוואטסאפ לעסק, איך זה עובד?",
        p: "כשלקוח משאיר פנייה, האוטומציה יכולה לשלוח לו הודעת וואטסאפ אוטומטית תוך שניות, לענות על שאלות נפוצות, ואפילו לתאם פגישה, הכל בעברית טבעית ובטון של העסק שלכם. בוט וואטסאפ חכם עולה מ-₪1,200 להקמה, או כלול במנוי Shani Care AI מלא.",
      },
      {
        h: "כמה עולה אוטומציה לעסק?",
        p: "אוטומציה בודדת (למשל לכידת לידים או מענה אוטומטי) מתחילה ב-₪1,500, בוט וואטסאפ מ-₪1,200, וסוכן AI מותאם עם סקיל בעברית מ-₪4,500 (לפני מע\"מ). אם רוצים שהאוטומציה תמשיך לרוץ ולהשתפר, מנוי Shani Care מ-₪690 לחודש כולל אוטומציה פעילה ותחזוקה שוטפת.",
      },
      {
        h: "מכונת הלידים שלי, הדגמה חיה",
        p: "הדף /audit באתר הזה הוא בעצמו אוטומציה חיה: לקוח ממלא טופס אבחון, אוטומציית n8n מעבדת את התשובות, מנוע Claude כותב תכנית עבודה והצעת מחיר, והכל חוזר תוך שניות, 24/7. אותה מכונה בדיוק אני יכולה לבנות לעסק שלכם.",
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
        a: "אני בונה את האוטומציות עם גיבוי, למשל אם וובהוק נכשל, הפנייה עדיין מגיעה אליכם בוואטסאפ, כך ששום ליד לא הולך לאיבוד. במנוי Shani Care אני מנטרת את האוטומציות ומתקנת בעיות לפני שאתם בכלל שמים לב.",
      },
      {
        q: "האוטומציה תעבוד בעברית?",
        a: "כן, וזה בדיוק ההתמחות שלי. רוב כלי ה-AI חושבים באנגלית ומייצרים עברית מוזרה. אני בונה סקילים בעברית אמיתית שגורמים ל-AI לענות ולכתוב בטון של העסק שלכם, כך שהלקוחות אפילו לא ירגישו שזו מערכת אוטומטית.",
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
    sections: [
      {
        h: "What is business automation and why do you need it?",
        p: "Automation connects your tools so they talk to each other on their own. Instead of copying details from a form to a CRM by hand, answering every client the same questions, and sending reminders manually, the system does it automatically, with no human error and nothing forgotten. The result: faster responses, fewer leads slipping through the cracks, and hours returned to you every week.",
      },
      {
        h: "WhatsApp automation for business, how does it work?",
        p: "When a client leaves an inquiry, the automation can send them a WhatsApp message within seconds, answer common questions, and even book a meeting, all in natural Hebrew and in your business's tone. A smart WhatsApp bot starts at ₪1,200 to set up, or is included in the Shani Care Full AI plan.",
      },
      {
        h: "How much does business automation cost?",
        p: "A single automation (say lead capture or auto-replies) starts at ₪1,500, a WhatsApp bot from ₪1,200, and a custom AI agent with a Hebrew Skill from ₪4,500 (excl. VAT). If you want the automation to keep running and improving, a Shani Care membership from ₪690/mo includes an active automation and ongoing maintenance.",
      },
      {
        h: "My lead machine, a live demo",
        p: "The /audit page on this very site is itself a live automation: a client fills in an intake form, an n8n automation processes the answers, a Claude engine writes an action plan and a proposal, and it all comes back within seconds, 24/7. I can build that exact same machine for your business.",
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
        a: "I build automations with a fallback, for example if a webhook fails, the inquiry still reaches you on WhatsApp, so no lead is ever lost. On a Shani Care membership I monitor the automations and fix issues before you even notice.",
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
