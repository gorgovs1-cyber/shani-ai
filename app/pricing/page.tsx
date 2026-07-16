"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";
const WA = "972504744815";

const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

type Pkg = {
  no: string;
  title: string;
  price: string;
  was?: string;
  from?: boolean;
  who: string;
  featured?: boolean;
  badge?: string;
  features: string[];
  waMsg: string;
};

type Tier = { name: string; price: string; desc: string };
type AddOn = { label: string; price: string; note?: string };
type QA = { q: string; a: string };

type Copy = {
  dir: "rtl" | "ltr";
  kicker: string;
  title: string;
  intro: string;
  launchBadge: string;
  trust: string[];
  vatNote: string;
  packages: Pkg[];
  ctaBtn: string;
  whoLabel: string;
  subKicker: string;
  subTitle: string;
  subIntro: string;
  subTiers: Tier[];
  subFine: string;
  subCta: string;
  subWaMsg: string;
  addOnsTitle: string;
  addOns: AddOn[];
  auditBoxTitle: string;
  auditBoxSub: string;
  auditBoxBtn: string;
  scarcity: string;
  faqTitle: string;
  faqItems: QA[];
};

const COPY: Record<"he" | "en", Copy> = {
  he: {
    dir: "rtl",
    kicker: "מחירים",
    title: "מחירים שקופים, בלי הפתעות.",
    intro:
      "פרימיום שמחזיר את עצמו, עם נקודת כניסה נוחה. בוחרים חבילה, או מתחילים במנוי חודשי. לא בטוחים מה מתאים? האבחון החינמי ימליץ.",
    launchBadge: "מחירי השקה עד 1.9 או 5 הפרויקטים הראשונים, המוקדם מביניהם · בתמורה לעדות והצגה בתיק העבודות",
    trust: ["תגובה תוך 24 שעות", "הקוד שלך, בבעלותך", "מחיר סופי מראש, בלי הפתעות"],
    vatNote: "כל המחירים לפני מע\"מ · תשלום: 50% מקדמה · 30% באבן דרך · 20% במסירה",
    packages: [
      {
        no: "01",
        title: "דף נחיתה קולנועי",
        price: "₪890",
        was: "₪2,400",
        who: "קמפיין, השקה, או שירות אחד ממוקד המרה.",
        features: [
          "דף יחיד Next.js + אנימציות GSAP",
          "טופס פנייה + חיבור וואטסאפ",
          "SEO מלא + Analytics + Pixel",
          "Lighthouse 90+ · מובייל-first",
          "הקוד שלך, בבעלותך המלאה",
          "מסירה תוך 7–10 ימים",
          "חודש תמיכה",
        ],
        waMsg: "היי שני, מעניין אותי דף הנחיתה הקולנועי (₪890)",
      },
      {
        no: "02",
        title: "אתר תדמית קולנועי",
        price: "החל מ-₪1,900",
        was: "₪6,500",
        from: true,
        featured: true,
        badge: "הכי פופולרי",
        who: "עסק שרוצה למצב את עצמו ברמה של החברות הגדולות.",
        features: [
          "עד 5 עמודים",
          "שפה ויזואלית מלאה + אנימציות קולנועיות",
          "SEO + Schema + Analytics",
          "חיבור CRM / אוטומציה בסיסית",
          "מובייל-first · Lighthouse גבוה",
          "מסירה תוך 14–21 יום",
          "3 חודשי תמיכה",
        ],
        waMsg: "היי שני, מעניין אותי אתר התדמית הקולנועי (החל מ-₪1,900)",
      },
      {
        no: "03",
        title: "מערכת AI מלאה",
        price: "החל מ-₪3,900",
        was: "₪12,000",
        from: true,
        who: "עסק שרוצה אתר + מכונת לידים כמו שלי (shani-ai.com/audit כהדגמה חיה).",
        features: [
          "אתר תדמית מלא",
          "טופס אבחון חכם",
          "אוטומציית n8n + Claude שעונה ומתמחרת לבד",
          "CRM לניהול הלידים",
          "סקיל בעברית בטון של העסק",
          "הדרכה מלאה + 3 חודשי Shani Care כלולים (שווי ₪1,950)",
        ],
        waMsg: "היי שני, מעניין אותי מערכת ה-AI המלאה (החל מ-₪3,900)",
      },
    ],
    ctaBtn: "דברו איתי בוואטסאפ",
    whoLabel: "למי זה מתאים",
    subKicker: "נקודת הכניסה",
    subTitle: "מנוי Shani Care",
    subIntro:
      "לא רוצים פרויקט גדול עכשיו? נכנסים במנוי חודשי, ואני שומרת על האתר שלכם חי, מעודכן ומשתפר. ביטול בהתראה של 30 יום.",
    subTiers: [
      {
        name: "בסיס",
        price: "₪250 / חודש",
        desc: "אחסון ודומיין מנוהלים, עדכוני תוכן (2 בקשות בחודש), גיבויים וניטור.",
      },
      {
        name: "צמיחה",
        price: "₪450 / חודש",
        desc: "כל מה שבבסיס + אוטומציה פעילה אחת (לידים/מיילים), דוח חודשי, 4 בקשות.",
      },
      {
        name: "AI מלא",
        price: "₪650 / חודש",
        desc: "כל מה שבצמיחה + סוכן AI / בוט וואטסאפ פעיל, שיפור שוטף של הסקילים, עדיפות במענה.",
      },
    ],
    subFine: "ביטול בהתראה של 30 יום · שנה מראש = 10% הנחה · מחירים לפני מע\"מ",
    subCta: "לפרטים על המנוי",
    subWaMsg: "היי שני, מעניין אותי מנוי Shani Care",
    addOnsTitle: "תוספות",
    addOns: [
      { label: "בוט וואטסאפ", price: "₪900 הקמה + ₪150 לחודש", note: "כולל תחזוקה ושיפורים שוטפים · או כלול במנוי AI מלא" },
      { label: "אוטומציה בודדת (n8n)", price: "החל מ-₪900" },
      { label: "סוכן AI מותאם + סקיל בעברית", price: "החל מ-₪2,900" },
      { label: "AI Audit עצמאי (מיפוי + תכנית עבודה)", price: "₪450", note: "מתקזז במלואו בהזמנת פרויקט" },
      { label: "עמוד נוסף", price: "₪250" },
      { label: "סבב שינויים נוסף", price: "₪250" },
      { label: "מאמר בלוג SEO", price: "₪250" },
      { label: "גרסה באנגלית לאתר", price: "החל מ-₪700" },
    ],
    auditBoxTitle: "לא בטוחים מה מתאים?",
    auditBoxSub:
      "האבחון החינמי שלי ממפה את העסק וממליץ בדיוק מה כדאי לכם, בלי התחייבות.",
    auditBoxBtn: "התחילו עם אבחון AI חינם ←",
    scarcity: "אני לוקחת מספר מצומצם של פרויקטים בכל חודש, כדי לשמור על איכות.",
    faqTitle: "שאלות על מחירים",
    faqItems: [
      {
        q: "כמה עולה לבנות אתר לעסק?",
        a: "תלוי במורכבות. במחירי השקה: דף נחיתה ממוקד המרה מ-₪890, אתר תדמית מלא (עד 5 עמודים) מ-₪1,900, ומערכת AI שלמה עם מכונת לידים מ-₪3,900. כל המחירים לפני מע\"מ, עם 50% מקדמה. לא בטוחים? האבחון החינמי ימליץ מה מתאים לכם.",
      },
      {
        q: "אפשר לשלם בתשלומים?",
        a: "כן, המבנה הקבוע הוא שלושה חלקים: 50% מקדמה בתחילת העבודה, 30% באבן דרך מוסכמת באמצע, ו-20% במסירה. לפרויקטים גדולים אפשר לפרוס יותר, נסגור יחד לפי מה שנוח לכם.",
      },
      {
        q: "המחיר כולל מע\"מ?",
        a: "כל המחירים באתר הם לפני מע\"מ. המע\"מ מתווסף בחשבונית לפי החוק.",
      },
      {
        q: "מה קורה אחרי המסירה?",
        a: "כל חבילה כוללת תקופת תמיכה, ובמערכת AI מלאה כלולים 3 חודשי Shani Care מהיום הראשון, כי מערכת חיה צריכה מישהי שמשגיחה עליה. אחרי התקופה ממשיכים במנוי מ-₪250 לחודש (אחסון, עדכונים, גיבויים וניטור), ומי שמשלם שנה מראש מקבל 10% הנחה.",
      },
      {
        q: "למה אתר אצלך עולה יותר מוויקס או אלמנטור?",
        a: "כי זה לא אותו מוצר. תבנית וויקס נראית כמו עוד תבנית, נטענת לאט ומוגבלת ב-SEO. אני בונה קוד קאסטום Next.js, מהיר, עם Lighthouse גבוה, SEO אמיתי, אנימציות קולנועיות, ובעלות מלאה שלכם על הקוד. ומעל הכל, אני מחברת אוטומציות ו-AI שאף תבנית לא נותנת. משלמים יותר, אבל מקבלים נכס שמחזיר את עצמו.",
      },
      {
        q: "יש התחייבות לטווח ארוך?",
        a: "בפרויקט חד-פעמי אין שום התחייבות מתמשכת, מסיימים ואתם חופשיים עם הקוד שלכם. מנוי Shani Care הוא חודשי, עם ביטול בהתראה של 30 יום.",
      },
    ],
  },
  en: {
    dir: "ltr",
    kicker: "Pricing",
    title: "Transparent pricing, no surprises.",
    intro:
      "Premium that pays for itself, with an easy entry point. Pick a package, or start with a monthly plan. Not sure what fits? The free audit will recommend.",
    launchBadge: "Launch pricing until Sep 1 or the first 5 projects, whichever comes first · in exchange for a testimonial and portfolio rights",
    trust: ["Replies within 24h", "You own the code", "Final price up front, no surprises"],
    vatNote: "All prices exclude VAT · Payment: 50% deposit · 30% at milestone · 20% on delivery",
    packages: [
      {
        no: "01",
        title: "Cinematic Landing Page",
        price: "₪890",
        was: "₪2,400",
        who: "A campaign, a launch, or one conversion-focused service.",
        features: [
          "Single-page Next.js + GSAP animations",
          "Contact form + WhatsApp",
          "Full SEO + Analytics + Pixel",
          "Lighthouse 90+ · mobile-first",
          "You own the code, fully",
          "Delivery in 7–10 days",
          "One month of support",
        ],
        waMsg: "Hi Shani, I'm interested in the Cinematic Landing Page (₪890)",
      },
      {
        no: "02",
        title: "Cinematic Brand Website",
        price: "From ₪1,900",
        was: "₪6,500",
        from: true,
        featured: true,
        badge: "Most popular",
        who: "A business that wants to position itself alongside the big players.",
        features: [
          "Up to 5 pages",
          "Full visual language + cinematic animation",
          "SEO + Schema + Analytics",
          "CRM / basic automation hook-up",
          "Mobile-first · high Lighthouse",
          "Delivery in 14–21 days",
          "3 months of support",
        ],
        waMsg: "Hi Shani, I'm interested in the Cinematic Brand Website (from ₪1,900)",
      },
      {
        no: "03",
        title: "Full AI System",
        price: "From ₪3,900",
        was: "₪12,000",
        from: true,
        who: "A business that wants a site + a lead machine like mine (shani-ai.com/audit, live demo).",
        features: [
          "Full brand website",
          "Smart intake / audit form",
          "n8n + Claude automation that replies & prices on its own",
          "CRM to manage leads",
          "A Hebrew Skill in your business's voice",
          "Full training + 3 months of support",
        ],
        waMsg: "Hi Shani, I'm interested in the Full AI System (from ₪3,900)",
      },
    ],
    ctaBtn: "Chat on WhatsApp",
    whoLabel: "Who it's for",
    subKicker: "Entry point",
    subTitle: "Shani Care membership",
    subIntro:
      "Not ready for a big project? Start on a monthly plan and I keep your site alive, updated and improving. Cancel with 30 days' notice.",
    subTiers: [
      {
        name: "Base",
        price: "₪250 / mo",
        desc: "Managed hosting & domain, content updates (2 requests/mo), backups and monitoring.",
      },
      {
        name: "Growth",
        price: "₪450 / mo",
        desc: "Everything in Base + one active automation (leads/emails), a monthly report, 4 requests.",
      },
      {
        name: "Full AI",
        price: "₪650 / mo",
        desc: "Everything in Growth + an active AI agent / WhatsApp bot, ongoing Skill improvement, priority replies.",
      },
    ],
    subFine: "Cancel with 30 days' notice · prices exclude VAT",
    subCta: "Ask about the membership",
    subWaMsg: "Hi Shani, I'm interested in the Shani Care membership",
    addOnsTitle: "Add-ons",
    addOns: [
      { label: "WhatsApp bot", price: "₪900 setup + ₪150/mo", note: "includes ongoing maintenance and improvements · or included in Full AI plan" },
      { label: "Single automation (n8n)", price: "from ₪900" },
      { label: "Custom AI agent + Hebrew Skill", price: "from ₪2,900" },
      { label: "Standalone AI Audit (mapping + plan)", price: "₪450", note: "fully credited toward a project" },
      { label: "Extra page", price: "₪250" },
      { label: "Extra revision round", price: "₪250" },
      { label: "SEO blog article", price: "₪250" },
      { label: "English version of the site", price: "from ₪700" },
    ],
    auditBoxTitle: "Not sure what fits?",
    auditBoxSub:
      "My free audit maps your business and recommends exactly what's worth doing, no commitment.",
    auditBoxBtn: "Start a free AI Audit →",
    scarcity: "I take on a limited number of projects each month, to keep quality high.",
    faqTitle: "Pricing FAQ",
    faqItems: [
      {
        q: "How much does a business website cost?",
        a: "It depends on complexity. At launch pricing: a conversion-focused landing page from ₪890, a full brand website (up to 5 pages) from ₪1,900, and a complete AI system with a lead machine from ₪3,900. All prices exclude VAT, with a 50% deposit. Not sure? The free audit will recommend what fits.",
      },
      {
        q: "Can I pay in installments?",
        a: "Yes. The standard structure is three parts: 50% deposit to start, 30% at an agreed milestone, and 20% on delivery. For larger projects we can split further, we'll set it up in a way that works for you.",
      },
      {
        q: "Does the price include VAT?",
        a: "All prices on the site exclude VAT. VAT is added on the invoice as required by law.",
      },
      {
        q: "What happens after delivery?",
        a: "Every package includes a support window (one to three months depending on the package). After that you can stay on a Shani Care membership from ₪250/mo, covering hosting, updates, backups and monitoring, so your site stays alive and current.",
      },
      {
        q: "Why does a site with you cost more than Wix or Elementor?",
        a: "Because it isn't the same product. A Wix template looks like another template, loads slowly and is limited on SEO. I build custom Next.js code, fast, with a high Lighthouse score, real SEO, cinematic animation, and full ownership of the code, plus automations and AI no template can give you. You pay more, but you get an asset that pays for itself.",
      },
      {
        q: "Is there a long-term commitment?",
        a: "A one-off project has no ongoing commitment, we finish and you're free with your code. The Shani Care membership is monthly, cancellable with 30 days' notice.",
      },
    ],
  },
};

export default function PricingPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const dir = c.dir;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <main dir={dir} style={{ padding: "9rem clamp(20px,5vw,40px) 0", maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>
          {c.kicker}
        </div>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,5vw,58px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)", fontFamily: HEEBO, maxWidth: "18ch" }}>
          {c.title}
        </h1>
        <p style={{ margin: "26px 0 0", color: "var(--muted2)", fontSize: "clamp(16px,1.6vw,20px)", lineHeight: 1.7, maxWidth: "58ch", fontFamily: HEEBO }}>
          {c.intro}
        </p>

        {/* Trust row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 26 }}>
          {c.trust.map((item) => (
            <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 12.5, color: "var(--muted2)", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 16px" }}>
              <span style={{ color: "var(--acc)" }}>✓</span> {item}
            </span>
          ))}
        </div>

        {/* Launch pricing banner */}
        <div style={{ marginTop: 22, background: "rgba(242,98,46,0.08)", border: "1px solid color-mix(in oklch, var(--acc) 32%, var(--line))", borderRadius: 14, padding: "14px 20px", color: "var(--ink)", fontSize: 14.5, fontWeight: 600, fontFamily: HEEBO, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--acc)", fontSize: 16 }}>★</span>
          {c.launchBadge}
        </div>

        {/* Package cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 44 }}>
          {c.packages.map((p) => (
            <div
              key={p.no}
              style={{
                position: "relative",
                background: "var(--card)",
                border: p.featured ? "1.5px solid color-mix(in oklch, var(--acc) 55%, var(--line))" : "1px solid var(--line)",
                borderRadius: 22,
                padding: "34px 30px",
                display: "flex",
                flexDirection: "column",
                boxShadow: p.featured ? "0 30px 60px -34px rgba(242,98,46,.28)" : "none",
              }}
            >
              {p.badge && (
                <span style={{ position: "absolute", top: -12, insetInlineStart: 28, background: "var(--acc)", color: "#fff", fontSize: 11.5, fontWeight: 700, letterSpacing: ".08em", padding: "5px 14px", borderRadius: 999, fontFamily: MONO }}>
                  {p.badge}
                </span>
              )}
              <div style={{ fontFamily: MONO, fontSize: 13, color: "var(--acc)", marginBottom: 18 }}>{p.no}</div>
              <h2 style={{ margin: "0 0 12px", fontWeight: 800, fontSize: 24, letterSpacing: "-0.01em", color: "var(--ink)", fontFamily: HEEBO }}>
                {p.title}
              </h2>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 800, fontSize: 30, color: "var(--acc)", fontFamily: HEEBO }}>{p.price}</span>
                {p.was && (
                  <span style={{ color: "var(--muted2)", fontSize: 17, textDecoration: "line-through", fontFamily: HEEBO }}>{p.was}</span>
                )}
              </div>
              <p style={{ margin: "14px 0 0", color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.6, fontFamily: HEEBO }}>
                <span style={{ color: "var(--ink)", fontWeight: 700 }}>{c.whoLabel}: </span>{p.who}
              </p>
              <ul style={{ listStyle: "none", margin: "22px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 11, flexGrow: 1 }}>
                {p.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--ink)", fontSize: 14.5, lineHeight: 1.5, fontFamily: HEEBO }}>
                    <span style={{ color: "var(--acc)", flexShrink: 0, marginTop: 1 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={wa(p.waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: 28,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: p.featured ? "var(--acc)" : "transparent",
                  color: p.featured ? "#fff" : "var(--acc)",
                  border: p.featured ? "none" : "1.5px solid var(--acc)",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "14px 20px",
                  borderRadius: 14,
                  fontFamily: HEEBO,
                }}
              >
                {c.ctaBtn}
              </a>
            </div>
          ))}
        </div>

        {/* Subscription — Shani Care */}
        <section style={{ marginTop: 72 }}>
          <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 14 }}>
            {c.subKicker}
          </div>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(28px,3.6vw,42px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
            {c.subTitle}
          </h2>
          <p style={{ margin: "16px 0 0", color: "var(--muted2)", fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.7, maxWidth: "60ch", fontFamily: HEEBO }}>
            {c.subIntro}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginTop: 30 }}>
            {c.subTiers.map((tier, idx) => (
              <div key={tier.name} style={{ background: idx === 1 ? "rgba(242,98,46,0.05)" : "var(--card)", border: "1px solid var(--line)", borderRadius: 20, padding: "28px 26px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: ".14em", color: "var(--acc)", textTransform: "uppercase", marginBottom: 10 }}>{tier.name}</div>
                <div style={{ fontWeight: 800, fontSize: 26, color: "var(--ink)", fontFamily: HEEBO, marginBottom: 12 }}>{tier.price}</div>
                <p style={{ margin: 0, color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.6, fontFamily: HEEBO }}>{tier.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 22, flexWrap: "wrap" }}>
            <a href={wa(c.subWaMsg)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--acc)", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "13px 26px", borderRadius: 14, fontFamily: HEEBO }}>
              {c.subCta} ←
            </a>
            <span style={{ color: "var(--muted2)", fontSize: 13, fontFamily: MONO }}>{c.subFine}</span>
          </div>
        </section>

        {/* Add-ons table */}
        <section style={{ marginTop: 72 }}>
          <h2 style={{ margin: "0 0 22px", fontWeight: 800, fontSize: "clamp(26px,3.2vw,38px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
            {c.addOnsTitle}
          </h2>
          <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 20, overflow: "hidden" }}>
            {c.addOns.map((a, idx) => (
              <div key={a.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 24px", borderTop: idx === 0 ? "none" : "1px solid var(--line)", flexWrap: "wrap" }}>
                <span style={{ color: "var(--ink)", fontSize: 15.5, fontWeight: 600, fontFamily: HEEBO }}>
                  {a.label}
                  {a.note && <span style={{ color: "var(--muted2)", fontWeight: 400, fontSize: 13.5 }}> · {a.note}</span>}
                </span>
                <span style={{ color: "var(--acc)", fontSize: 15.5, fontWeight: 700, fontFamily: HEEBO, whiteSpace: "nowrap" }}>{a.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Audit CTA box */}
        <section style={{ marginTop: 60, background: "var(--dark)", borderRadius: 24, padding: "clamp(30px,4vw,48px)", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", color: "var(--dtext)", fontFamily: HEEBO }}>
            {c.auditBoxTitle}
          </h2>
          <p style={{ margin: "14px auto 0", color: "var(--dmuted)", fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.6, maxWidth: "48ch", fontFamily: HEEBO }}>
            {c.auditBoxSub}
          </p>
          <a href="/audit" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, background: "var(--acc)", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "15px 32px", borderRadius: 14, fontFamily: HEEBO }}>
            {c.auditBoxBtn}
          </a>
          <p style={{ margin: "20px 0 0", color: "var(--dmuted)", fontSize: 13, fontFamily: MONO }}>{c.scarcity}</p>
        </section>

        {/* Pricing FAQ */}
        <section style={{ marginTop: 72 }}>
          <h2 style={{ margin: "0 0 30px", fontWeight: 800, fontSize: "clamp(28px,3.6vw,44px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
            {c.faqTitle}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 860 }}>
            {c.faqItems.map((item, i) => (
              <div key={i} style={{ border: "1px solid", borderColor: open === i ? "color-mix(in oklch, var(--acc) 40%, var(--line))" : "var(--line)", borderRadius: 16, overflow: "hidden", background: open === i ? "var(--card)" : "transparent", transition: "background .2s, border-color .2s" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px", background: "none", border: "none", cursor: "pointer", textAlign: dir === "rtl" ? "right" : "left", direction: dir, gap: 16 }}
                >
                  <span style={{ fontWeight: 700, fontSize: 17, color: "var(--ink)", fontFamily: HEEBO, lineHeight: 1.4 }}>{item.q}</span>
                  <span aria-hidden="true" style={{ color: "var(--acc)", fontSize: 24, flexShrink: 0, lineHeight: 1, transition: "transform .25s", transform: open === i ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
                </button>
                <div aria-hidden={open !== i} style={{ overflow: "hidden", maxHeight: open === i ? 500 : 0, transition: "max-height .35s ease" }}>
                  <p style={{ margin: 0, padding: "0 28px 26px", color: "var(--muted2)", fontSize: 16, lineHeight: 1.72, fontFamily: HEEBO, direction: dir }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p style={{ margin: "40px 0 0", color: "var(--muted2)", fontSize: 13.5, fontFamily: MONO }}>{c.vatNote}</p>

        <div style={{ height: 90 }} />

        {/* FAQPage schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: c.faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
