"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

// Short page built only from approved copy. No CRM features beyond what the site already states.
const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · מערכות משולבות AI",
    title: "מערכת CRM מודולרית",
    lead: "כל הפניות והשיחות במקום אחד, עם אפשרות להתחבר גם ל-CRM או לממשק אחר שלכם.",
    primaryCta: "דברו איתנו על מערכת",
    primaryWaMsg: "היי, אני רוצה לשמוע על מערכת CRM לעסק",
    secondaryCta: "מה המערכת עושה",
    includesTitle: "מה המערכת עושה",
    includes: [
      "כל הלקוחות והפניות במקום אחד",
      "השיחות מהבוט נכנסות לאותו מקום",
      "מודולים שמתאימים מעסק קטן ועד ארגון גדול",
      "חיבור ל-CRM או לממשק קיים שלכם",
    ],
    alsoTitle: "עובד יחד עם",
    also: [
      { label: "בוטים וסוכנים", href: "/chatbots", desc: "כל השיחות והפניות שהבוט מטפל בהן נכנסות למקום אחד." },
      { label: "אוטומציות", href: "/automations", desc: "הפנייה נשמרת, נשלחים אישורים ותזכורות." },
    ],
    sections: [],
    faqTitle: "",
    faqItems: [],
    closingTitle: "רוצים לבדוק איזו מערכת מתאימה לעסק",
    closingSub: "",
    closingCta: "דברו איתנו בוואטסאפ",
    closingWaMsg: "היי, אני רוצה לשמוע על מערכת CRM לעסק",
    auditLine: "",
  },
  en: {
    dir: "ltr",
    kicker: "Service · AI-integrated systems",
    title: "A modular CRM",
    lead: "Every enquiry and conversation in one place, with the option to connect to your own CRM or another interface.",
    primaryCta: "Talk to us about a system",
    primaryWaMsg: "Hi, I'd like to hear about a CRM for my business",
    secondaryCta: "What the system does",
    includesTitle: "What the system does",
    includes: [
      "Every customer and enquiry in one place",
      "Conversations from the bot land in the same place",
      "Modules that fit a small business or a large organisation",
      "Connects to your existing CRM or interface",
    ],
    alsoTitle: "Works together with",
    also: [
      { label: "Bots and agents", href: "/chatbots", desc: "Every conversation and enquiry the bot handles lands in one place." },
      { label: "Automations", href: "/automations", desc: "The enquiry is saved, confirmations and reminders go out." },
    ],
    sections: [],
    faqTitle: "",
    faqItems: [],
    closingTitle: "Want to check which system fits your business",
    closingSub: "",
    closingCta: "Message us on WhatsApp",
    closingWaMsg: "Hi, I'd like to hear about a CRM for my business",
    auditLine: "",
  },
};

export default function CrmPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
