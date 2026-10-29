"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

// Short page built only from copy that already exists on the site (home services, /chatbots).
const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · אוטומציות",
    title: "אוטומציות שחוסכות זמן",
    lead: "הפנייה נשמרת, נשלחים אישורים ותזכורות, בלי העתקות ידניות.",
    primaryCta: "דברו איתנו על אוטומציה",
    primaryWaMsg: "היי, אני רוצה אוטומציה לעסק",
    secondaryCta: "מה אפשר לחבר",
    includesTitle: "מה קורה לבד",
    includes: [
      "פרטי הפנייה נשמרים במקום אחד",
      "נשלח אישור במייל",
      "נקבעת תזכורת",
      "הכלים שלכם מתעדכנים לבד",
    ],
    alsoTitle: "עובד יחד עם",
    also: [
      { label: "בוטים וסוכנים", href: "/chatbots", desc: "את הבוט אפשר להרחיב באוטומציות." },
      { label: "מערכות משולבות AI", href: "/crm", desc: "כל הפניות והשיחות במקום אחד." },
    ],
    sections: [],
    faqTitle: "",
    faqItems: [],
    closingTitle: "רוצים לבדוק מה אפשר לחבר",
    closingSub: "",
    closingCta: "דברו איתנו בוואטסאפ",
    closingWaMsg: "היי, אני רוצה אוטומציה לעסק",
    auditLine: "",
  },
  en: {
    dir: "ltr",
    kicker: "Service · Automations",
    title: "Automations that save time",
    lead: "The enquiry is saved, confirmations and reminders go out, with no manual copying.",
    primaryCta: "Talk to us about automation",
    primaryWaMsg: "Hi, I'd like an automation for my business",
    secondaryCta: "What can be connected",
    includesTitle: "What happens by itself",
    includes: [
      "Enquiry details are saved in one place",
      "A confirmation email goes out",
      "A reminder is set",
      "Your tools update themselves",
    ],
    alsoTitle: "Works together with",
    also: [
      { label: "Bots and agents", href: "/chatbots", desc: "A bot can be extended with automations." },
      { label: "AI-integrated systems", href: "/crm", desc: "Every enquiry and conversation in one place." },
    ],
    sections: [],
    faqTitle: "",
    faqItems: [],
    closingTitle: "Want to see what can be connected",
    closingSub: "",
    closingCta: "Message us on WhatsApp",
    closingWaMsg: "Hi, I'd like an automation for my business",
    auditLine: "",
  },
};

export default function AutomationsPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
