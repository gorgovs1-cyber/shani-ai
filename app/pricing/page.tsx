"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";
const WA = "972504744815";

const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

type Item = { name: string; desc: string; price: string; unit?: string; flag?: boolean };
type Group = { title: string; items: Item[] };
type Factor = { title: string; desc: string };
type Step = { no: string; title: string; desc: string };
type QA = { q: string; a: string };

type Copy = {
  dir: "rtl" | "ltr";
  kicker: string;
  title: string;
  intro: string;
  groups: Group[];
  includedTitle: string;
  included: string[];
  toolsTitle: string;
  toolsIntro: string;
  tools: string[];
  toolsNote: string;
  maintNote: string;
  friendTitle: string;
  friendText: string;
  processTitle: string;
  steps: Step[];
  principlesTitle: string;
  principles: string[];
  valueTitle: string;
  values: Factor[];
  faqTitle: string;
  faqItems: QA[];
  ctaTitle: string;
  ctaSub: string;
  ctaBtn: string;
  ctaWa: string;
  waMsg: string;
};

const COPY: Record<"he" | "en", Copy> = {
  he: {
    dir: "rtl",
    kicker: "05 · מחירים",
    title: "מחירים.",
    intro:
      "כל המחירים כאן סופיים ומלאים. בלי תוספות שמתגלות בסוף, ובלי מחיר שמשתנה לפי מי שואל. אם משהו לא ברור, אפשר פשוט לשאול.",
    groups: [
      {
        title: "אתרים",
        items: [
          {
            name: "דף נחיתה",
            desc: "עמוד אחד רציף. מציג מי אתם, מה אתם עושים, ואיך יוצרים קשר.",
            price: "1,500 ₪",
          },
          {
            name: "אתר",
            desc: "עמוד אחד עם תפריט צף וקפיצות לחלקים. מסביר שיטה או שירות לעומק, כולל שאלות נפוצות.",
            price: "2,900 ₪",
          },
          {
            name: "גרסה בשפה שנייה",
            desc: "תרגום, התאמת פריסה, ומתג שפה. 600 ₪ לדף נחיתה, 900 ₪ לאתר.",
            price: "600 ₪",
            unit: "ומעלה",
          },
        ],
      },
      {
        title: "אוטומציה ו-AI",
        items: [
          {
            name: "אוטומציה בודדת",
            desc: "תהליך אחד שרץ לבד. תזכורת לפני תור, פנייה שנכנסת ישר לגיליון, מייל שנשלח אחרי כל לקוח.",
            price: "1,400 ₪",
          },
          {
            name: "בוט וואטסאפ",
            desc: "עונה על השאלות שחוזרות אצלכם שוב ושוב, בעברית ובטון של העסק, מסביב לשעון.",
            price: "2,400 ₪",
          },
          {
            name: "סוכן AI עם סקיל עברי",
            desc: "לא רק עונה. מבין הקשר, זוכר שיחה, ומבצע: קובע פגישה ביומן, מתמחר לפי הכללים שלכם, מסנן פניות.",
            price: "4,900 ₪",
          },
          {
            name: "מערכת AI מלאה",
            desc: "אתר, סוכן AI, אוטומציות וריכוז הפניות במקום אחד. הכל מחובר, במחיר נמוך מרכישה בנפרד.",
            price: "7,900 ₪",
            flag: true,
          },
        ],
      },
      {
        title: "תוספות",
        items: [
          { name: "חלק נוסף באתר", desc: "סקשן חדש מעבר למה שסוכם.", price: "450 ₪" },
          { name: "סבב שינויים נוסף", desc: "מעבר לשני הסבבים שכלולים בכל פרויקט.", price: "350 ₪" },
          { name: "מאמר לאתר", desc: "כתיבה, התאמה לחיפוש בגוגל, והעלאה.", price: "450 ₪" },
        ],
      },
      {
        title: "תחזוקה חודשית",
        items: [
          {
            name: "אתר",
            desc: "שינויי טקסט ותמונות, עדכוני אבטחה, ודוח חודשי על התנועה.",
            price: "200 ₪",
            unit: "לחודש",
          },
          {
            name: "אתר ואוטומציות",
            desc: "כל מה שלמעלה, וגם ניטור שהאוטומציות רצות ותיקון תקלות.",
            price: "350 ₪",
            unit: "לחודש",
          },
          {
            name: "אתר, בוט או סוכן",
            desc: "כולל קריאת שיחות אמיתיות, הוספת תשובות חדשות, וכיול שוטף.",
            price: "450 ₪",
            unit: "לחודש",
          },
        ],
      },
    ],
    maintNote:
      "התחזוקה היא לא חובה ואין בה התחייבות. אפשר להפסיק בכל חודש, והאתר ממשיך לעבוד. מי שמעדיף פונה כשצריך משהו ומקבל הצעה לאותה עבודה.",
    includedTitle: "כלול בכל אתר, בלי תוספת תשלום",
    included: [
      "התאמת נגישות לתקן הישראלי 5568. נדרש בחוק לאתר עסקי, ורוב האתרים הזולים מגיעים בלעדיו.",
      "מדיניות פרטיות ותקנון.",
      "הקוד שלכם, בבעלות מלאה. אפשר לקחת אותו לכל מפתח אחר.",
      "מותאם לנייד, ושני סבבי שינויים אחרי שראיתם.",
    ],
    toolsTitle: "עלויות שוטפות אצלכם",
    toolsIntro:
      "כלים ותשתית נרשמים על שמכם ובכרטיס שלכם, ואני מקימה ומחברת הכל. אתם לא תלויים בי לשום דבר.",
    tools: [
      "דומיין: כ-74 ₪ לשנה.",
      "אחסון ואבטחה לאתר: 0 ₪.",
      "כלים לבוט או לסוכן, לפי שימוש: 0 עד 150 ₪ לחודש.",
    ],
    toolsNote:
      "האתרים בנויים בקוד ולכן אין להם עלות אחסון חודשית. אתר וורדפרס עולה 60 עד 100 שקל בחודש, כל עוד הוא באוויר.",
    friendTitle: "מחיר חבר",
    friendText:
      "מי שהגיע דרך המלצה של לקוח שלי מקבל 20% הנחה על כל פרויקט. זה כתוב כאן כדי שיהיה ברור לכולם, ולא משהו שצריך לבקש. התחזוקה החודשית היא ממילא במחיר אחד לכולם.",
    processTitle: "איך נראה התהליך",
    steps: [
      { no: "01", title: "אבחון קצר", desc: "טופס קצר על העסק, הכלים והמשימות שחוזרות על עצמן. בלי עלות." },
      { no: "02", title: "כיוונים ראשוניים", desc: "אני עוברת על העסק וחוזרת אליכם תוך יום עסקים עם שניים-שלושה כיוונים." },
      { no: "03", title: "שיחת היכרות", desc: "עשרים דקות בטלפון או בוואטסאפ. מבינים יחד מה נכון לבנות ומה לא." },
      { no: "04", title: "הצעה מסודרת", desc: "תוך יום מהשיחה: מה בדיוק נבנה, כמה זה עולה, ולוח זמנים." },
    ],
    principlesTitle: "עקרונות שלא משתנים",
    principles: [
      "המחיר שבמחירון הוא המחיר. אין מחיר אחר למי ששואל אחרת.",
      "50% בהתחלה, 50% במסירה.",
      "עלויות שוטפות של כלים תמיד בנפרד, על שמכם, עם שמות ומחירים מדויקים.",
      "שני סבבי שינויים כלולים בכל פרויקט. סבב שלישי מתומחר בנפרד ומראש.",
      "אתר: גרסה ראשונה מלאה עד 5 ימי עבודה, ובאוויר תוך שבוע עד שבועיים.",
      "אפשר להתחיל בפתרון קטן ולהרחיב כשמרגישים את הערך.",
    ],
    valueTitle: "מה יוצא לכם מזה",
    values: [
      {
        title: "שעות שחוזרות כל שבוע",
        desc: "משימות שחוזרות על עצמן קורות לבד, והזמן שהתפנה חוזר ללקוחות, למכירות ולדברים שרק אתם יודעים לעשות.",
      },
      {
        title: "אף פנייה לא הולכת לאיבוד",
        desc: "מענה מהיר ומסודר לכל מתעניין, גם כשאתם באמצע עבודה וגם אחרי שעות הפעילות. פניות חמות לא מתקררות.",
      },
      {
        title: "נוכחות שבונה אמון",
        desc: "אתר וכלים שנראים ברמה של העסקים הגדולים, בעברית שנשמעת אנושית ובטון של העסק שלכם.",
      },
      {
        title: "מערכת שעובדת, לא עוד כלי",
        desc: "לא עוד מנוי שנזנח אחרי חודש, אלא תהליך שרץ לבד, נמדד ומשתפר, עם מישהי שמשגיחה עליו.",
      },
    ],
    faqTitle: "שאלות נפוצות",
    faqItems: [
      {
        q: "המחירים האלה סופיים?",
        a: "כן. המחיר שמופיע כאן הוא מה שתשלמו, והוא נסגר לפני שמתחילים. מה שלא כלול מופיע כתוספת עם מחיר משלה, ואף פעם לא מתגלה בסוף.",
      },
      {
        q: "ומה אם הפרויקט שלי לא בדיוק אחד מאלה?",
        a: "אז נבנה אותו מהחלקים שכן מופיעים כאן. אם יש משהו שלא ברשימה בכלל, אני מתמחרת אותו בנפרד ומסבירה לפי מה.",
      },
      {
        q: "כמה זמן לוקח פרויקט?",
        a: "אתר: גרסה ראשונה מלאה עד חמישה ימי עבודה מרגע שהחומרים אצלי, ובאוויר תוך שבוע עד שבועיים. מערכת מלאה לוקחת יותר, ולוח הזמנים המדויק נמצא בהצעה.",
      },
      {
        q: "אני משלם על הכלים בנפרד?",
        a: "כן, וזה לטובתכם. הדומיין והכלים נרשמים על שמכם ובכרטיס שלכם, כך שהם שלכם ואתם לא תלויים בי. אני מקימה ומחברת הכל.",
      },
    ],
    ctaTitle: "הצעד הראשון לא עולה כלום.",
    ctaSub: "אבחון קצר, ותוך יום עסקים תדעו אילו כיוונים שווה לבדוק בעסק שלכם.",
    ctaBtn: "לאבחון החינמי ←",
    ctaWa: "מעדיפים לדבר עכשיו? וואטסאפ",
    waMsg: "היי שני, ראיתי את המחירון ואשמח לשאול משהו",
  },

  en: {
    dir: "ltr",
    kicker: "05 · Pricing",
    title: "Pricing.",
    intro:
      "Every price here is final and complete. No extras that surface at the end, and no price that changes depending on who is asking. If something is unclear, just ask.",
    groups: [
      {
        title: "Websites",
        items: [
          {
            name: "Landing page",
            desc: "One continuous page. Who you are, what you do, and how to reach you.",
            price: "₪1,500",
          },
          {
            name: "Website",
            desc: "One page with a floating menu that jumps to each section. Explains a method or a service in depth, including an FAQ.",
            price: "₪2,900",
          },
          {
            name: "Second language",
            desc: "Translation, layout adaptation, and a language switch. ₪600 for a landing page, ₪900 for a website.",
            price: "₪600",
            unit: "and up",
          },
        ],
      },
      {
        title: "Automation and AI",
        items: [
          {
            name: "Single automation",
            desc: "One process that runs on its own. A reminder before an appointment, an enquiry that lands straight in a sheet, an email sent after every client.",
            price: "₪1,400",
          },
          {
            name: "WhatsApp bot",
            desc: "Answers the questions you get again and again, in Hebrew and in your business tone, around the clock.",
            price: "₪2,400",
          },
          {
            name: "AI agent with a Hebrew skill",
            desc: "It does more than answer. It understands context, remembers the conversation, and acts: books a meeting, quotes by your rules, filters enquiries.",
            price: "₪4,900",
          },
          {
            name: "Full AI system",
            desc: "Website, AI agent, automations and every enquiry in one place. All connected, priced below buying each part separately.",
            price: "₪7,900",
            flag: true,
          },
        ],
      },
      {
        title: "Add-ons",
        items: [
          { name: "Extra section", desc: "A new section beyond what we agreed.", price: "₪450" },
          { name: "Extra revision round", desc: "Beyond the two rounds included in every project.", price: "₪350" },
          { name: "Article for the site", desc: "Writing, search optimisation, and publishing.", price: "₪450" },
        ],
      },
      {
        title: "Monthly care",
        items: [
          {
            name: "Website",
            desc: "Text and image changes, security updates, and a monthly traffic report.",
            price: "₪200",
            unit: "per month",
          },
          {
            name: "Website and automations",
            desc: "Everything above, plus monitoring that the automations are running and fixing what breaks.",
            price: "₪350",
            unit: "per month",
          },
          {
            name: "Website, bot or agent",
            desc: "Includes reading real conversations, adding new answers, and ongoing tuning.",
            price: "₪450",
            unit: "per month",
          },
        ],
      },
    ],
    maintNote:
      "Monthly care is optional and there is no commitment. You can stop any month and the site keeps working. If you prefer, reach out when something is needed and get a quote for that job.",
    includedTitle: "Included in every website, at no extra cost",
    included: [
      "Accessibility to Israeli standard 5568. Required by law for a business site, and most cheap sites arrive without it.",
      "Privacy policy and terms of use.",
      "Your code, fully owned. You can take it to any other developer.",
      "Mobile ready, and two revision rounds after you have seen it.",
    ],
    toolsTitle: "Running costs on your side",
    toolsIntro:
      "Tools and infrastructure are registered in your name and on your card, and I set everything up and connect it. You are not dependent on me for anything.",
    tools: [
      "Domain: around ₪74 per year.",
      "Hosting and security for the site: ₪0.",
      "Tools for a bot or an agent, based on usage: ₪0 to ₪150 per month.",
    ],
    toolsNote:
      "The sites are built in code, so they carry no monthly hosting cost. A WordPress site costs ₪60 to ₪100 every month for as long as it is live.",
    friendTitle: "Referral price",
    friendText:
      "Anyone who comes through a recommendation from one of my clients gets 20% off any project. It is written here so it is clear to everyone, and not something you need to ask for. Monthly care is one price for everyone.",
    processTitle: "How it works",
    steps: [
      { no: "01", title: "Short audit", desc: "A short form about your business, your tools and the tasks that repeat. Free." },
      { no: "02", title: "First directions", desc: "I go through your business and come back within one business day with two or three directions." },
      { no: "03", title: "Intro call", desc: "Twenty minutes by phone or WhatsApp. We work out together what is worth building and what is not." },
      { no: "04", title: "Written proposal", desc: "Within a day of the call: exactly what gets built, what it costs, and the timeline." },
    ],
    principlesTitle: "Principles that do not change",
    principles: [
      "The price on this page is the price. There is no different price for people who ask differently.",
      "50% to start, 50% on delivery.",
      "Running tool costs are always separate, in your name, with exact names and prices.",
      "Two revision rounds are included in every project. A third round is priced separately and in advance.",
      "Website: a full first version within 5 working days, and live within one to two weeks.",
      "You can start small and expand once you feel the value.",
    ],
    valueTitle: "What you get out of it",
    values: [
      { title: "Hours back every week", desc: "Repeating tasks happen on their own, and the time you free up goes back to clients, to sales, and to the work only you can do." },
      { title: "No enquiry gets lost", desc: "A fast, organised reply to everyone who reaches out, even mid-job and after hours. Warm enquiries do not go cold." },
      { title: "A presence that builds trust", desc: "A site and tools that look like the big companies, in Hebrew that sounds human and in your business tone." },
      { title: "A system that works, not another tool", desc: "Not another subscription abandoned after a month, but a process that runs, gets measured, improves, and has someone watching it." },
    ],
    faqTitle: "Frequently asked",
    faqItems: [
      { q: "Are these prices final?", a: "Yes. What you see here is what you pay, and it is agreed before we start. Anything not included appears as an add-on with its own price, and never surfaces at the end." },
      { q: "What if my project is not exactly one of these?", a: "Then we build it from the parts that are listed here. If something is not on the list at all, I price it separately and explain what it is based on." },
      { q: "How long does a project take?", a: "Website: a full first version within five working days from the moment I have your materials, and live within one to two weeks. A full system takes longer, and the exact timeline is in the proposal." },
      { q: "Do I pay for the tools separately?", a: "Yes, and that is in your favour. The domain and the tools are registered in your name and on your card, so they are yours and you are not dependent on me. I set everything up and connect it." },
    ],
    ctaTitle: "The first step costs nothing.",
    ctaSub: "A short audit, and within one business day you will know which directions are worth exploring.",
    ctaBtn: "Start the free audit →",
    ctaWa: "Prefer to talk now? WhatsApp",
    waMsg: "Hi Shani, I saw the pricing page and would like to ask something",
  },
};

export default function PricingPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const end: "left" | "right" = c.dir === "rtl" ? "left" : "right";

  return (
    <div dir={c.dir} style={{ fontFamily: HEEBO }}>
      <main style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "clamp(120px,14vw,170px) 24px 0" }}>
        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>{c.kicker}</div>
          <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(38px,5.2vw,64px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)" }}>{c.title}</h1>
          <p style={{ margin: "18px 0 0", color: "var(--muted2)", fontSize: 17, lineHeight: 1.75, maxWidth: "58ch" }}>{c.intro}</p>
        </div>

        {/* Price groups */}
        {c.groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 40 }}>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(21px,2.6vw,28px)", letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 16px" }}>{g.title}</h2>
            <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 20, padding: "6px 26px" }}>
              {g.items.map((it, ii) => (
                <div
                  key={ii}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "baseline",
                    gap: 14,
                    padding: "18px 0",
                    borderBottom: ii === g.items.length - 1 ? "none" : "1px solid rgba(150,143,132,.16)",
                  }}
                >
                  <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 17.5, color: it.flag ? "var(--acc)" : "var(--ink)", lineHeight: 1.4 }}>{it.name}</div>
                    <p style={{ margin: "4px 0 0", color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.65 }}>{it.desc}</p>
                  </div>
                  <div style={{ whiteSpace: "nowrap", textAlign: end }}>
                    <div style={{ fontWeight: 800, fontSize: 22, color: "var(--acc)", letterSpacing: "-0.02em" }}>{it.price}</div>
                    {it.unit ? <div style={{ fontSize: 12.5, color: "var(--muted2)", fontWeight: 500 }}>{it.unit}</div> : null}
                  </div>
                </div>
              ))}
            </div>
            {g.title === c.groups[3].title ? (
              <p style={{ margin: "14px 2px 0", color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.75 }}>{c.maintNote}</p>
            ) : null}
          </div>
        ))}

        {/* Included */}
        <div style={{ background: "rgba(242,98,46,.07)", border: "1px solid rgba(242,98,46,.3)", borderRadius: 20, padding: "26px 26px", marginBottom: 40 }}>
          <h2 style={{ fontWeight: 800, fontSize: 21, color: "var(--ink)", margin: "0 0 14px" }}>{c.includedTitle}</h2>
          {c.included.map((p, i) => (
            <p key={i} style={{ margin: "0 0 10px", color: "var(--muted2)", fontSize: 15.5, lineHeight: 1.7 }}>
              <span style={{ color: "var(--acc)", fontWeight: 700 }}>· </span>{p}
            </p>
          ))}
        </div>

        {/* Tools */}
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 20, padding: "26px 26px", marginBottom: 40 }}>
          <h2 style={{ fontWeight: 800, fontSize: 21, color: "var(--ink)", margin: "0 0 12px" }}>{c.toolsTitle}</h2>
          <p style={{ margin: "0 0 12px", color: "var(--muted2)", fontSize: 15.5, lineHeight: 1.7 }}>{c.toolsIntro}</p>
          {c.tools.map((p, i) => (
            <p key={i} style={{ margin: "0 0 8px", color: "var(--muted2)", fontSize: 15.5, lineHeight: 1.7 }}>
              <span style={{ color: "var(--acc)", fontWeight: 700 }}>· </span>{p}
            </p>
          ))}
          <p style={{ margin: "12px 0 0", color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.7 }}>{c.toolsNote}</p>
        </div>

        {/* Referral price */}
        <div style={{ background: "linear-gradient(135deg, rgba(242,98,46,.14), rgba(242,98,46,.04))", border: "1px solid rgba(242,98,46,.35)", borderRadius: 20, padding: "24px 26px", marginBottom: 64 }}>
          <div style={{ fontWeight: 800, fontSize: 19, color: "var(--acc)", marginBottom: 8 }}>{c.friendTitle}</div>
          <p style={{ margin: 0, color: "var(--muted2)", fontSize: 15.5, lineHeight: 1.75 }}>{c.friendText}</p>
        </div>

        {/* Process */}
        <h2 style={{ fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 22px" }}>{c.processTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16, marginBottom: 64 }}>
          {c.steps.map((s) => (
            <div key={s.no} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 18, padding: "24px 22px" }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 15, color: "var(--acc)", marginBottom: 10 }}>{s.no}</div>
              <div style={{ fontWeight: 700, fontSize: 16.5, color: "var(--ink)", marginBottom: 8 }}>{s.title}</div>
              <p style={{ margin: 0, color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 20, padding: "28px 26px", marginBottom: 64 }}>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: "var(--ink)", margin: "0 0 16px" }}>{c.principlesTitle}</h2>
          {c.principles.map((p, i) => (
            <p key={i} style={{ margin: "0 0 10px", color: "var(--muted2)", fontSize: 15.5, lineHeight: 1.7 }}>
              <span style={{ color: "var(--acc)", fontWeight: 700 }}>· </span>{p}
            </p>
          ))}
        </div>

        {/* Value */}
        <h2 style={{ fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 22px" }}>{c.valueTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 64 }}>
          {c.values.map((v, i) => (
            <div key={i} style={{ background: "var(--card)", border: "1px solid rgba(242,98,46,.35)", borderRadius: 18, padding: "24px 22px" }}>
              <div style={{ fontWeight: 700, fontSize: 16.5, color: "var(--acc)", marginBottom: 8 }}>{v.title}</div>
              <p style={{ margin: 0, color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 22px" }}>{c.faqTitle}</h2>
        <div style={{ marginBottom: 64 }}>
          {c.faqItems.map((f, i) => (
            <div key={i} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: "20px 22px", marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", marginBottom: 8 }}>{f.q}</div>
              <p style={{ margin: 0, color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.75 }}>{f.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg, rgba(242,98,46,.14), rgba(242,98,46,.05))", border: "1px solid rgba(242,98,46,.4)", borderRadius: 22, padding: "36px 30px", textAlign: "center", marginBottom: 90 }}>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(24px,3.4vw,38px)", color: "var(--ink)", margin: "0 0 10px" }}>{c.ctaTitle}</h2>
          <p style={{ margin: "0 0 22px", color: "var(--muted2)", fontSize: 16, lineHeight: 1.7 }}>{c.ctaSub}</p>
          <a href="/audit" style={{ display: "inline-block", background: "var(--acc)", color: "#14100a", fontWeight: 700, fontSize: 16, padding: "14px 30px", borderRadius: 999, textDecoration: "none" }}>{c.ctaBtn}</a>
          <div style={{ marginTop: 14 }}>
            <a href={wa(c.waMsg)} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted2)", fontSize: 14, textDecoration: "underline" }}>{c.ctaWa}</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
