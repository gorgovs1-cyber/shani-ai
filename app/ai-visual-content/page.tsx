"use client";

import ServicePage, { ServiceCopy } from "@/components/ServicePage";

const copyByLang: Record<"he" | "en", ServiceCopy> = {
  he: {
    dir: "rtl",
    kicker: "שירות · תוכן ויזואלי ב-AI",
    title: "תוכן ויזואלי ב-AI: מציגים את המוצר עוד לפני שהורכב",
    lead:
      "אני יוצרת הדמיות מוצר ריאליסטיות בסגנון המותג שלכם, ומהן סרטונים קצרים וקטלוג שמתעדכן לכל עונה. משנים מוצר, צבע או לוגו ומקבלים הדמיה מעודכנת, בלי צילום חוזר.",
    primaryCta: "דברו איתי על תוכן ויזואלי",
    primaryWaMsg: "היי שני, אני רוצה הדמיות ותוכן ויזואלי ב-AI לעסק",
    secondaryCta: "מהצורך לפתרון",
    includesTitle: "",
    includes: [],
    flow: {
      needLabel: "הצורך",
      needTitle: "ויזואליה חדשה לכל לקוח, חג ואירוע",
      needText:
        "כשמציגים מוצרים או מארזים ללקוחות שונים, כל אירוע וכל עונה דורשים תמונות חדשות. צילום מקצועי בכל פעם הוא איטי, יקר וקשה לתזמון.",
      needPoints: [
        { title: "ויזואליה חדשה בכל פעם", text: "לקוח חדש, חג חדש או אירוע חדש, וכל אחד צריך תמונות משלו." },
        { title: "צילום שוב ושוב", text: "הרכבה וצילום מחדש בכל שינוי קטן במוצר, בצבע או בלוגו." },
        { title: "המוצר עוד לא מוכן", text: "הלקוח רוצה לראות את המוצר לפני שהורכב, ועדיין אין מה לצלם." },
      ],
      needGoal:
        "המטרה: להראות ללקוח את המוצר עוד לפני שהורכב, ולהשתמש באותה ויזואליה בסרטון, במצגת ובקטלוג.",
      solutionLabel: "הפתרון",
      solutionTitle: "הדמיות, סרטונים וקטלוג באותה שפה ויזואלית",
      solutionText: "אני בונה לכם סדרה אחת של תוצרים, מההדמיה ועד הסרטון והקטלוג, בלי לצלם מחדש.",
      solutionItems: [
        { icon: "image", title: "הדמיות מוצר", text: "תמונות ריאליסטיות של המוצר או המארז בסגנון המותג שלכם, לכל לקוח ולכל אירוע." },
        { icon: "video", title: "סרטונים קצרים", text: "וידאו קצר שנוצר מתוך ההדמיות, לרשתות החברתיות, למצגות ולשליחה בוואטסאפ." },
        { icon: "catalog", title: "קטלוג דיגיטלי או PDF", text: "קטלוג שמתעדכן לכל עונה ולכל אירוע, ואפשר להוסיף אליו מוצר חדש בקלות." },
      ],
      solutionHighlights: [
        { icon: "refresh", title: "בלי צילום חוזר", text: "משנים מוצר, צבע או לוגו ומקבלים הדמיה מעודכנת." },
        { icon: "palette", title: "שפה ויזואלית קבועה", text: "מגדירים פעם אחת סגנון, תאורה, רקעים וצבעים (Brand Style), וכל הדמיה נראית חלק מאותה סדרה." },
        { icon: "repeat", title: "תהליך שחוזר על עצמו", text: "תבניות ותהליך עבודה קבועים לכל מוצר או לקוח חדש: מהיר, צפוי ובאיכות אחידה." },
      ],
      howLabel: "איך זה עובד",
      howTitle: "ארבעה צעדים עד התוצרים",
      steps: [
        { title: "שיחת התנעה", text: "מכירים את המוצרים, את הסגנון שאתם רוצים ואת האירוע הקרוב." },
        { title: "שפה ויזואלית", text: "אני מגדירה סגנון, תאורה, רקעים וצבעים, כדי שהכול ייראה כמו סדרה אחת." },
        { title: "תוצרים", text: "הדמיות, סרטונים קצרים וקטלוג, לפי מה שבחרתם." },
        { title: "הרחבה", text: "מוסיפים מוצרים, אירועים ועונות על אותה שפה ויזואלית, ומתקדמים לפי הצורך." },
      ],
      howNote:
        "מתחילים בפיילוט עם מוצר אחד, בודקים בשטח ורק אחר כך מרחיבים. המטרה היא תוצר עובד תוך ימים ולא חודשים, ועבודה בבנק שעות גמיש, בלי הפתעות.",
      startLabel: "להתחיל",
      startTitle: "מה אצטרך מכם לשיחת ההתנעה",
      startItems: [
        { title: "אירוע או לקוח קרוב", text: "אירוע, חג או לקוח שאפשר להציג לו את התוצרים הראשונים." },
        { title: "השראה וסגנון", text: "לוגו, צבעים ודוגמאות לסגנון שאתם אוהבים. אם אין, אציע לכם כיוון." },
        { title: "מוצר לפיילוט", text: "מוצר או מארז אחד, קיים או מתוכנן: רשימת מרכיבים, אריזה ותמונות טלפון פשוטות." },
      ],
    },
    alsoTitle: "הכול מתחבר",
    also: [
      { label: "צ׳אטבוטים וסוכני AI", href: "/chatbots", desc: "התוכן הוויזואלי יכול להשתלב בהמשך בבוט הוואטסאפ, כדי ששולחים ללקוח את הקטלוג המתאים." },
      { label: "אתרים", href: "/websites", desc: "ההדמיות והסרטונים יכולים לעלות גם לאתר שלכם, באותו סגנון בדיוק." },
      { label: "מערכת CRM", href: "/#crm", desc: "ובהמשך גם ב-CRM, כדי שמערכת אחת תעבוד בשבילכם." },
    ],
    sections: [],
    faqTitle: "שאלות על תוכן ויזואלי ב-AI",
    faqItems: [
      {
        q: "מה זו הדמיית AI של מוצר?",
        a: "תמונה ריאליסטית שנוצרת בבינה מלאכותית לפי המוצר, האריזה והמיתוג שסיכמנו. אפשר להציג אותה ללקוח עוד לפני שהמוצר הורכב.",
      },
      {
        q: "אפשר לשנות מוצר, צבע או לוגו אחרי שההדמיה מוכנה?",
        a: "כן, וזה היתרון. משנים את הפרט הרצוי ומקבלים הדמיה מעודכנת, בלי להרכיב ולצלם מחדש.",
      },
      {
        q: "האם זה מחליף צילום של המוצר האמיתי?",
        a: "לא תמיד. הדמיה מתאימה להצגת מוצר לפני שהורכב ולעדכונים מהירים לכל עונה. כשצריך תמונה של המוצר עצמו, צילום נשאר הבחירה הנכונה.",
      },
      {
        q: "כמה זמן לוקח לקבל תוצר ראשון?",
        a: "המטרה היא תוצר עובד תוך ימים ולא חודשים. את לוח הזמנים המדויק אני מסכמת איתכם אחרי שיחת ההתנעה.",
      },
      {
        q: "איך עובדים איתי על זה?",
        a: "בעבודה בבנק שעות גמיש, בלי הפתעות. מתחילים בפיילוט קטן ומרחיבים לפי הצורך.",
      },
    ],
    closingTitle: "רוצים לראות איך המוצר שלכם ייראה?",
    closingSub: "",
    closingCta: "דברו איתי בוואטסאפ",
    closingWaMsg: "היי שני, אני רוצה הדמיות ותוכן ויזואלי ב-AI לעסק",
    auditLine: "או להתחיל בבדיקת התאמה חינם",
  },
  en: {
    dir: "ltr",
    kicker: "Service · AI visual content",
    title: "AI visual content: show the product before it is assembled",
    lead:
      "I create realistic product visualizations in your brand style, and turn them into short videos and a catalog that updates each season. Change a product, a color or a logo and get an updated visualization, with no reshoot.",
    primaryCta: "Talk to me about visual content",
    primaryWaMsg: "Hi Shani, I'd like AI product visualizations and visual content for my business",
    secondaryCta: "From need to solution",
    includesTitle: "",
    includes: [],
    flow: {
      needLabel: "The need",
      needTitle: "New visuals for every client, holiday and event",
      needText:
        "When you present products or gift sets to different clients, every event and every season calls for new images. Professional photography each time is slow, expensive and hard to schedule.",
      needPoints: [
        { title: "New visuals every time", text: "A new client, a new holiday or a new event, and each one needs its own images." },
        { title: "Shooting again and again", text: "Re-assembling and re-photographing for every small change in a product, color or logo." },
        { title: "The product is not ready yet", text: "The client wants to see the product before it is assembled, and there is nothing to photograph yet." },
      ],
      needGoal:
        "The goal: show the client the product before it is assembled, and use the same visuals in a video, a presentation and a catalog.",
      solutionLabel: "The solution",
      solutionTitle: "Visualizations, videos and a catalog in one visual language",
      solutionText: "I build one series of deliverables for you, from the visualization to the video and the catalog, without reshooting.",
      solutionItems: [
        { icon: "image", title: "Product visualizations", text: "Realistic images of the product or gift set in your brand style, for every client and every event." },
        { icon: "video", title: "Short videos", text: "Short video made from the visualizations, for social media, presentations and sending on WhatsApp." },
        { icon: "catalog", title: "Digital or PDF catalog", text: "A catalog that updates for each season and event, and a new product is easy to add." },
      ],
      solutionHighlights: [
        { icon: "refresh", title: "No reshoots", text: "Change a product, a color or a logo and get an updated visualization." },
        { icon: "palette", title: "A fixed visual language", text: "Define the style, lighting, backgrounds and colors once (Brand Style), and every visualization looks like part of the same series." },
        { icon: "repeat", title: "A repeatable process", text: "Fixed templates and workflow for every new product or client: fast, predictable and consistent in quality." },
      ],
      howLabel: "How it works",
      howTitle: "Four steps to the deliverables",
      steps: [
        { title: "Kickoff call", text: "We get to know the products, the style you want and the upcoming event." },
        { title: "Visual language", text: "I define the style, lighting, backgrounds and colors, so everything looks like one series." },
        { title: "Deliverables", text: "Visualizations, short videos and a catalog, as you chose." },
        { title: "Expansion", text: "We add products, events and seasons on the same visual language, as needed." },
      ],
      howNote:
        "We start with a pilot on one product, test it in the field and only then expand. The aim is a working result within days, not months, and work in a flexible hours bank, with no surprises.",
      startLabel: "Getting started",
      startTitle: "What I will need from you for the kickoff call",
      startItems: [
        { title: "An upcoming event or client", text: "An event, a holiday or a client you can show the first deliverables to." },
        { title: "Inspiration and style", text: "A logo, colors and examples of a style you like. If you have none, I will suggest a direction." },
        { title: "A pilot product", text: "One product or gift set, existing or planned: a list of items, the packaging and simple phone photos." },
      ],
    },
    alsoTitle: "Everything connects",
    also: [
      { label: "AI chatbots and agents", href: "/chatbots", desc: "The visual content can later plug into your WhatsApp bot, so the right catalog is sent to the client." },
      { label: "Websites", href: "/websites", desc: "The visualizations and videos can also go on your website, in exactly the same style." },
      { label: "CRM system", href: "/#crm", desc: "And later into the CRM, so one system works for you." },
    ],
    sections: [],
    faqTitle: "AI visual content FAQ",
    faqItems: [
      {
        q: "What is an AI product visualization?",
        a: "A realistic image created with artificial intelligence from the product, packaging and branding we agreed on. You can show it to a client before the product is assembled.",
      },
      {
        q: "Can I change a product, color or logo after the visualization is ready?",
        a: "Yes, and that is the advantage. You change the detail you want and get an updated visualization, without re-assembling and reshooting.",
      },
      {
        q: "Does it replace photographing the real product?",
        a: "Not always. A visualization suits showing a product before it is assembled and quick updates for each season. When you need a picture of the actual product, photography is still the right choice.",
      },
      {
        q: "How long until the first result?",
        a: "The aim is a working result within days, not months. I agree the exact schedule with you after the kickoff call.",
      },
      {
        q: "How do we work together on this?",
        a: "In a flexible hours bank, with no surprises. We start with a small pilot and expand as needed.",
      },
    ],
    closingTitle: "Want to see how your product would look?",
    closingSub: "",
    closingCta: "Chat on WhatsApp",
    closingWaMsg: "Hi Shani, I'd like AI product visualizations and visual content for my business",
    auditLine: "Or start with a free fit check",
  },
};

export default function AiVisualContentPage() {
  return <ServicePage copyByLang={copyByLang} />;
}
