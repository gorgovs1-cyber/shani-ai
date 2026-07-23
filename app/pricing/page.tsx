"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";
const WA = "972504744815";

const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

type Factor = { title: string; desc: string };
type Step = { no: string; title: string; desc: string };
type QA = { q: string; a: string };

type Copy = {
  dir: "rtl" | "ltr";
  kicker: string;
  title: string;
  intro: string;
  factorsTitle: string;
  factors: Factor[];
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
    kicker: "05 · השקעה",
    title: "איך נקבעת ההשקעה.",
    intro:
      "אין כאן מחירון, וזו לא התחמקות. כל עסק מגיע עם צרכים אחרים, וזה ההבדל בין פתרון שעובד לתבנית גנרית. ההצעה נבנית אחרי שיחה קצרה, והמחיר שנסגר בה הוא המחיר הסופי.",
    factorsTitle: "מה משפיע על ההשקעה",
    factors: [
      {
        title: "עומק המחקר וההתאמה",
        desc: "כמה צריך להבין את העסק, הלקוחות והמתחרים לפני שבונים. התאמה אישית עולה יותר מתבנית, ומחזירה יותר.",
      },
      {
        title: "כמות התהליכים והחיבורים",
        desc: "אוטומציה אחת פשוטה או מערכת שמחברת וואטסאפ, יומן, מייל וגיליונות. כל חיבור נוסף הוא עבודה, אבל גם זמן שנחסך לכם.",
      },
      {
        title: "תוכן, עיצוב ושפה",
        desc: "כתיבת התכנים, עיצוב שמותאם למותג, עברית שנשמעת אנושית. יש עסקים שמגיעים עם הכל מוכן ויש שבונים מאפס.",
      },
      {
        title: "רמת האוטומציה והכלים",
        desc: "אילו כלים נדרשים ומה קיים בחינם. עלות שוטפת של כלים היא תמיד בנפרד, על שמכם, בשקיפות מלאה.",
      },
      {
        title: "ליווי אחרי העלייה לאוויר",
        desc: "יש מי שרוצה מסירה ולהמשיך לבד, ויש מי שרוצה ליווי שוטף. שתי האפשרויות קיימות ומדוברות מראש.",
      },
    ],
    processTitle: "איך נראה התהליך עד הצעה",
    steps: [
      { no: "01", title: "אבחון קצר", desc: "טופס של שלוש דקות על העסק, הכלים והמשימות שחוזרות על עצמן." },
      { no: "02", title: "כיוונים ראשוניים", desc: "אני עוברת על העסק וחוזרת אליכם תוך יום עסקים עם שניים-שלושה כיוונים, בלי מחיר ובלי התחייבות." },
      { no: "03", title: "שיחת היכרות", desc: "רבע שעה בטלפון או בוואטסאפ. מבינים יחד מה באמת נכון לבנות ומה לא." },
      { no: "04", title: "הצעה מסודרת", desc: "תוך יום מהשיחה: מה בדיוק נבנה, כמה זה עולה, לוח זמנים ומדדי הצלחה. מחיר סופי, בלי הפתעות." },
    ],
    principlesTitle: "עקרונות שלא משתנים",
    principles: [
      "המחיר שנסגר לפני תחילת העבודה הוא המחיר הסופי.",
      "עלויות שוטפות של כלים (דומיין, מערכות, מנויים) תמיד בנפרד, על שמכם, עם שמות ומחירים מדויקים.",
      "שני סבבי תיקונים כלולים בכל פרויקט.",
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
        q: "למה אין מחירון באתר?",
        a: "כי מחיר אמיתי דורש להבין מה בונים. מספר קבוע מראש מתאים למוצר מדף, לא לפתרון שנבנה סביב עסק ספציפי. במקום לנחש, אני מעדיפה שיחה קצרה והצעה מדויקת.",
      },
      {
        q: "מה כן אפשר לדעת מראש?",
        a: "שהמחיר נסגר לפני שמתחילים והוא סופי, שעלויות הכלים שקופות ובנפרד, ושההצעה מגיעה תוך יום מהשיחה. אין אזור אפור.",
      },
      {
        q: "כמה זמן לוקח פרויקט?",
        a: "תלוי בהיקף. דף נחיתה יכול לעלות לאוויר תוך ימים, מערכת מלאה לוקחת שבועות. לוח הזמנים המדויק מופיע בהצעה.",
      },
    ],
    ctaTitle: "הצעד הראשון לא עולה כלום.",
    ctaSub: "אבחון של שלוש דקות, ותוך יום עסקים תדעו אילו כיוונים שווה לבדוק בעסק שלכם.",
    ctaBtn: "לאבחון החינמי ←",
    ctaWa: "מעדיפה לדבר עכשיו? וואטסאפ",
    waMsg: "היי שני, אשמח לשמוע איך נקבעת ההשקעה לעסק שלי",
  },
  en: {
    dir: "ltr",
    kicker: "05 · Investment",
    title: "How pricing works.",
    intro:
      "There is no fixed price list here, and that is not an evasion. Every business needs something different, and that difference is what separates a working solution from a generic template. Your quote is built after a short call, and the price we agree on is final.",
    factorsTitle: "What shapes the investment",
    factors: [
      { title: "Research and fit", desc: "How deeply we need to understand your business, customers and competitors before building. Tailored work costs more than a template, and returns more." },
      { title: "Processes and integrations", desc: "One simple automation, or a system connecting WhatsApp, calendar, email and sheets. Every integration is work, and time saved for you." },
      { title: "Content, design and language", desc: "Copywriting, brand-fit design, Hebrew that sounds human. Some businesses arrive with everything ready, some start from zero." },
      { title: "Automation level and tools", desc: "Which tools are needed and what exists for free. Running tool costs are always separate, in your name, fully transparent." },
      { title: "Support after launch", desc: "Some want a handover, some want ongoing care. Both exist and are agreed up front." },
    ],
    processTitle: "The path to a quote",
    steps: [
      { no: "01", title: "Short audit", desc: "A three-minute form about your business, tools and recurring tasks." },
      { no: "02", title: "Initial directions", desc: "Within one business day you get two or three directions worth exploring. No price, no commitment." },
      { no: "03", title: "Intro call", desc: "Fifteen minutes by phone or WhatsApp to agree what is actually worth building." },
      { no: "04", title: "A clear proposal", desc: "Within a day of the call: exactly what gets built, the cost, timeline and success metrics. Final price, no surprises." },
    ],
    principlesTitle: "Fixed principles",
    principles: [
      "The price agreed before work starts is the final price.",
      "Running tool costs (domain, systems, subscriptions) are always separate, in your name, itemized.",
      "Two revision rounds are included in every project.",
      "You can start small and expand once you feel the value.",
    ],
    valueTitle: "What you get out of it",
    values: [
      { title: "Hours back every week", desc: "Repetitive tasks run on their own, and the freed time goes back to clients, sales and the things only you can do." },
      { title: "No inquiry gets lost", desc: "Fast, organized replies to every lead, even mid-work or after hours. Warm inquiries stop going cold." },
      { title: "A presence that builds trust", desc: "A site and tools that look like the big players, in human-sounding Hebrew and your business's tone." },
      { title: "A system, not another tool", desc: "Not another subscription abandoned after a month, but a process that runs, gets measured and improves, with someone watching over it." },
    ],
    faqTitle: "FAQ",
    faqItems: [
      { q: "Why is there no price list?", a: "Because a real price requires knowing what we are building. A fixed number fits off-the-shelf products, not solutions built around a specific business. Instead of guessing, I prefer a short call and a precise quote." },
      { q: "What can I know in advance?", a: "That the price is agreed before work starts and is final, that tool costs are transparent and separate, and that the proposal arrives within a day of the call. No gray areas." },
      { q: "How long does a project take?", a: "Depends on scope. A landing page can go live within days; a full system takes weeks. The exact timeline is in the proposal." },
    ],
    ctaTitle: "The first step costs nothing.",
    ctaSub: "A three-minute audit, and within one business day you will know which directions are worth exploring.",
    ctaBtn: "Start the free audit →",
    ctaWa: "Prefer to talk now? WhatsApp",
    waMsg: "Hi Shani, I would love to hear how pricing works for my business",
  },
};

export default function PricingPage() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <div dir={c.dir} style={{ fontFamily: HEEBO }}>
      <main style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "clamp(120px,14vw,170px) 24px 0" }}>
        {/* Hero */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>{c.kicker}</div>
          <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(38px,5.2vw,64px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)" }}>{c.title}</h1>
          <p style={{ margin: "18px 0 0", color: "var(--muted2)", fontSize: 17, lineHeight: 1.75, maxWidth: "58ch" }}>{c.intro}</p>
        </div>

        {/* Factors */}
        <h2 style={{ fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 22px" }}>{c.factorsTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 64 }}>
          {c.factors.map((f, i) => (
            <div key={i} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 18, padding: "24px 22px" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "var(--acc)", marginBottom: 10 }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontWeight: 700, fontSize: 17, color: "var(--ink)", marginBottom: 8 }}>{f.title}</div>
              <p style={{ margin: 0, color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
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
