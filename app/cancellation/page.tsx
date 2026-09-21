"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

type Section = { heading: string; body?: string; items?: string[] };
type Copy = { kicker: string; title: string; updated: string; intro: string; sections: Section[] };

const COPY: Record<"he" | "en", Copy> = {
  he: {
    kicker: "מדיניות ביטולים",
    title: "ביטול עסקה והחזר כספי",
    updated: "עודכן: אוגוסט 2026",
    intro:
      "כאן כתוב בדיוק מה קורה אם מחליטים לעצור: איך מודיעים, מה מקבלים בחזרה, ומה כבר לא ניתן להחזר. כתבתי את זה בשפה פשוטה, בלי אותיות קטנות, כדי שתדעו מראש איפה אתם עומדים.",
    sections: [
      {
        heading: "מי עומדת מאחורי העסק",
        body:
          "שני גורגוב, עוסק פטור מספר 300585536, רשומה בישראל מאז 1 באוגוסט 2026. השירותים שאני נותנת הם ייעוץ AI, בניית אוטומציות וסוכנים, ובניית אתרים בהתאמה אישית. אלה שירותים, לא מוצרים פיזיים, ולכן כללי הביטול שלהלן הם כללי ביטול של שירות. יצירת קשר בכל נושא ביטול: shani.creates.ai@gmail.com או 972-50-4744815+.",
      },
      {
        heading: "איך מבטלים",
        body:
          "אפשר להודיע לי על ביטול בכל אחד מהערוצים האלה, ולבחירתכם:",
        items: [
          "מייל: shani.creates.ai@gmail.com",
          "וואטסאפ או טלפון: 972-50-4744815+",
          "בעל פה בשיחה איתי, אם ככה נוח לכם יותר",
          "ההודעה תקפה גם אם היא בעל פה, אבל עדיף בכתב, כדי ששנינו נחזיק תיעוד של התאריך.",
          "כדאי לציין: שם העסק, איזה שירות מבטלים, ומאיזה תאריך.",
          "אני מאשרת קבלה של כל הודעת ביטול בכתב, בדרך כלל תוך יום עסקים, וכותבת בה מה בוצע עד אותו רגע ומה ההתחשבנות.",
        ],
      },
      {
        heading: "הזכות החוקית לבטל, ומה שאני נותנת מעבר לה",
        body:
          "רוב הלקוחות שלי סוגרים איתי בלי שנפגשנו פנים אל פנים, דרך האתר, הוואטסאפ או הטלפון. עסקה כזאת היא עסקת מכר מרחוק לפי סעיף 14ג לחוק הגנת הצרכן, התשמ״א-1981. בעסקה כזאת לשירות, הזכות לבטל היא בתוך 14 ימים ממועד עשיית העסקה או מקבלת המסמך עם פרטי העסקה, לפי המאוחר. בשירות חד-פעמי הביטול צריך להיעשות לפחות שני ימים שאינם ימי מנוחה לפני המועד שבו השירות אמור להינתן. בשירות מתמשך, כמו מנוי Shani Care, אפשר לבטל תוך 14 יום גם אם השירות כבר התחיל.",
      },
      {
        heading: "ועכשיו הנקודה שחשוב שתדעו: לקוח עסקי",
        body:
          "חוק הגנת הצרכן מגן על ״צרכן״, ולפי סעיף 1 לחוק זה מי שקונה שירות לשימוש שעיקרו אישי, ביתי או משפחתי. הלקוחות שלי הם עסקים, והם קונים את השירות לצורך העסק. לכן, בפרשנות המקובלת, פרק הביטול בחוק הגנת הצרכן לא חל עליהם באופן אוטומטי, ומה שמחייב הוא ההסכם בינינו. זה לא נטול ספק: יש עוסקים קטנים ועצמאיים שהגבול אצלם בין שימוש עסקי לאישי מטושטש, ובתי המשפט בחנו את זה לפי הנסיבות. אני לא מנצלת את הפער הזה. בחרתי להחיל על כל הלקוחות שלי, גם על עסקים, את אותם כללי ביטול שהחוק היה מקנה ללקוח פרטי, ולפעמים מיטיבים מהם. מה שכתוב בעמוד הזה מחייב אותי כלפי כל לקוח.",
      },
      {
        heading: "ביטול לפני שהתחלתי לעבוד",
        body:
          "אם ביטלתם לפני שהתחלתי בפועל לעבוד על הפרויקט, כלומר לפני מחקר, אפיון, כתיבה, עיצוב או קוד, אני מחזירה את מלוא המקדמה. אני לא גובה דמי ביטול, למרות שהחוק מתיר לגבות עד 5 אחוזים מסכום העסקה או 100 שקל, לפי הנמוך מביניהם. שיחת ההיכרות, האבחון הקצר וההצעה הם ממילא ללא עלות ואינם נחשבים תחילת עבודה.",
      },
      {
        heading: "ביטול אחרי שהעבודה כבר התחילה",
        body:
          "אם ביטלתם באמצע, אתם משלמים על החלק שכבר בוצע בפועל, והיתרה חוזרת אליכם. אני שולחת פירוט בכתב של מה נעשה עד רגע הביטול, ולפי זה נעשית ההתחשבנות. אם המקדמה גדולה מהחלק שבוצע, ההפרש מוחזר. אם החלק שבוצע גדול ממה ששולם, אשלח חשבון על ההפרש בלבד. הבסיס הוא עבודה שבוצעה בפועל, לא קנס ולא פיצוי.",
      },
      {
        heading: "מה קורה לתוצרים שכבר נבנו",
        body:
          "התוצרים עוברים לבעלותכם עם השלמת התשלום המלא, כפי שכתוב גם בתקנון. בביטול באמצע הדרך, החלקים שנבנו ולא שולמו במלואם נשארים אצלי ולא נמסרים. אם תבחרו לשלם על החלק שנבנה, אשמח למסור לכם אותו כמו שהוא, כדי שתוכלו להמשיך איתו אצל מפתח אחר. הקוד תמיד שלכם ואף פעם לא ננעל אצלי.",
      },
      {
        heading: "מה לא ניתן להחזר, ולמה",
        items: [
          "עבודה שכבר נמסרה ואושרה על ידכם. שירות שכבר סופק אי אפשר להשיב, ולכן אין עליו החזר.",
          "עלויות צד שלישי ששולמו כבר על שמכם, כמו דומיין, כלי AI או מנוי חיצוני. הכלים האלה נרשמים על שמכם ובכרטיס שלכם, הכסף מעולם לא עבר דרכי, ולכן ההחזר עליהם, ככל שקיים, הוא מול הספק לפי מדיניות הביטול שלו. מה שנשאר, נשאר שלכם.",
          "סבב שינויים נוסף בתשלום שכבר ביצעתי בפועל.",
          "תוספת שהוזמנה, נבנתה ונמסרה, כמו חלק נוסף באתר, מאמר או עמוד פרויקט נוסף.",
        ],
      },
      {
        heading: "והקשר לסבבי השינויים",
        body:
          "בכל פרויקט כלולים שני סבבי שינויים אחרי שראיתם את הגרסה הראשונה. בקשת שינוי היא לא ביטול, והיא לא פוגעת בזכות שלכם לבטל בהמשך. אם ניצלתם את שני הסבבים ואז ביטלתם, שני הסבבים נחשבים עבודה שבוצעה. סבב שלישי מתומחר מראש ובנפרד, ואם ביקשתם אותו ועדיין לא התחלתי אותו, הוא מוחזר במלואו.",
      },
      {
        heading: "ביטול Shani Care, הליווי החודשי",
        body:
          "Shani Care הוא מנוי חודשי בלי התחייבות. אפשר להפסיק בכל חודש, בהודעה אחת, והאתר ממשיך לעבוד בדיוק כמו קודם. אין דמי יציאה ואין קנס. הודעה שמגיעה לפני מועד החיוב החודשי הבא עוצרת את החיוב הבא, והחודש ששולם כבר ממשיך עד סופו. אם החיוב כבר ירד ובאותו חודש עדיין לא ניתן שירות, אני מחזירה אותו במלואו. שני חודשי הליווי הכלולים במחיר של אתר הם חלק ממחיר האתר ואינם ניתנים לפדיון בכסף, אבל אפשר כמובן לא להשתמש בהם.",
      },
      {
        heading: "איך ומתי חוזר הכסף",
        body:
          "ההחזר מבוצע לאותו אמצעי תשלום שבו שילמתם, ולא יאוחר מ-14 ימים ממועד קבלת הודעת הביטול, כפי שהחוק דורש בעסקת מכר מרחוק. בפועל אני משתדלת להעביר מהר יותר. אם קיבלתם חשבונית, אוציא חשבונית זיכוי מתאימה.",
      },
      {
        heading: "כשהביטול הוא באשמתי",
        body:
          "אם השירות לא תואם למה שהובטח, אם לא עמדתי בלוח הזמנים שסוכם, או אם הפרתי את תנאי ההסכם, אתם רשאים לבטל בלי לשלם כלום על החלק שלא סופק כראוי, ואני לא גובה שום דמי ביטול. זה גם מה שהחוק קובע בסעיף 14ה לחוק הגנת הצרכן.",
      },
      {
        heading: "אם אני זו שמבטלת",
        body:
          "במקרים נדירים, למשל אם התברר שאני לא הכתובת הנכונה לפרויקט או שנוצר ניגוד עניינים, אני רשאית להפסיק את ההתקשרות. במקרה כזה אני מחזירה את מלוא התשלום על החלק שלא בוצע, מוסרת את מה שכבר נבנה, ומסייעת במעבר מסודר.",
      },
      {
        heading: "אם משהו לא הסתדר",
        body:
          "קודם כל דברו איתי, ברוב המקרים זה נפתר בשיחה. אם עדיין לא הסתדר, אפשר לפנות לרשות להגנת הצרכן ולסחר הוגן בטלפון 073-3717777 או דרך האתר שלה.",
      },
      {
        heading: "דין וסמכות שיפוט",
        body:
          "על מדיניות זו יחולו דיני מדינת ישראל, וסמכות השיפוט הבלעדית תהיה לבתי המשפט המוסמכים בישראל. מדיניות זו משלימה את התקנון ואת מדיניות הפרטיות באתר. בכל מקרה של סתירה בין עמוד זה לבין הצעת מחיר או הסכם פרטני שנחתם מולכם, ההוראה המיטיבה עם הלקוח היא הקובעת.",
      },
      {
        heading: "שינויים במדיניות",
        body:
          "אני רשאית לעדכן מדיניות זו מעת לעת. הגרסה שתחול על העסקה שלכם היא זו שהייתה בתוקף ביום שסגרנו. הגרסה העדכנית תמיד תפורסם בעמוד הזה, עם תאריך עדכון.",
      },
      {
        heading: "יצירת קשר",
        body:
          "שני גורגוב, עוסק פטור 300585536. מייל: shani.creates.ai@gmail.com. טלפון ווואטסאפ: 972-50-4744815+.",
      },
    ],
  },
  en: {
    kicker: "Cancellation policy",
    title: "Cancellation & Refunds",
    updated: "Updated: August 2026",
    intro:
      "This page sets out exactly what happens if you decide to stop: how to give notice, what comes back to you, and what can no longer be refunded. Written in plain language, with no small print, so you know where you stand before you start.",
    sections: [
      {
        heading: "Who you are dealing with",
        body:
          "Shani Gorgov, exempt sole trader (עוסק פטור) no. 300585536, registered in Israel since 1 August 2026. The services I provide are AI consulting, automations and agents, and custom website builds. These are services, not physical goods, so the rules below are the cancellation rules for a service. For anything to do with cancellation: shani.creates.ai@gmail.com or +972-50-4744815.",
      },
      {
        heading: "How to cancel",
        body: "You can give notice of cancellation through any of these channels, whichever suits you:",
        items: [
          "Email: shani.creates.ai@gmail.com",
          "WhatsApp or phone: +972-50-4744815",
          "Verbally, on a call with me, if that is easier",
          "Verbal notice is valid, but writing is better, so we both have a record of the date.",
          "Worth including: your business name, which service you are cancelling, and from what date.",
          "I confirm every cancellation notice in writing, usually within one business day, setting out what has been done so far and how the account settles.",
        ],
      },
      {
        heading: "The legal right to cancel, and what I give beyond it",
        body:
          "Most of my clients sign up without our ever having met in person — through the site, WhatsApp or the phone. That makes it a distance sale (עסקת מכר מרחוק) under section 14C of the Consumer Protection Law, 5741-1981. For a service bought this way, the right to cancel runs for 14 days from the date of the transaction or from receipt of the document setting out its details, whichever is later. For a one-off service, cancellation must be given at least two non-rest days before the service is due to be provided. For a continuing service, such as a Shani Care subscription, you can cancel within 14 days even if the service has already begun.",
      },
      {
        heading: "One thing you should know: business clients",
        body:
          "The Consumer Protection Law protects a \"consumer\", defined in section 1 as someone buying a service for use that is mainly personal, domestic or family use. My clients are businesses, buying for the business. On the accepted reading, the cancellation chapter of the Consumer Protection Law therefore does not apply to them automatically, and what binds is our agreement. This is not free of doubt: for small sole traders and freelancers the line between business and personal use can blur, and the courts have looked at it case by case. I do not take advantage of that gap. I have chosen to apply to all my clients, businesses included, the same cancellation rules the law would give a private consumer, and in places better ones. Everything on this page binds me towards every client.",
      },
      {
        heading: "Cancelling before work begins",
        body:
          "If you cancel before I have actually started work on the project — before any research, planning, writing, design or code — I refund the advance payment in full. I do not charge a cancellation fee, even though the law allows one of up to 5% of the transaction or ₪100, whichever is lower. The intro call, the short audit and the proposal are free anyway and do not count as the start of work.",
      },
      {
        heading: "Cancelling after work has begun",
        body:
          "If you cancel mid-project, you pay for the part actually completed, and the balance comes back to you. I send a written breakdown of what was done up to the moment of cancellation, and the account is settled on that basis. If the advance is larger than the completed part, the difference is refunded. If the completed part is larger than what was paid, I invoice for the difference only. The basis is work actually performed — not a penalty and not compensation.",
      },
      {
        heading: "What happens to work already built",
        body:
          "Deliverables become yours on full payment, as the Terms also state. If you cancel mid-way, parts that were built but not paid for in full stay with me and are not handed over. If you choose to pay for the part that was built, I am happy to hand it over as-is so you can continue with another developer. Your code is always yours and is never locked away with me.",
      },
      {
        heading: "What cannot be refunded, and why",
        items: [
          "Work already delivered and approved by you. A service already provided cannot be returned, so it is not refundable.",
          "Third-party costs already paid in your name — a domain, an AI tool, an external subscription. These are registered in your name and on your card, the money never passed through me, so any refund is between you and that provider under its own policy. Whatever remains, remains yours.",
          "A paid additional revision round that I have already carried out.",
          "An add-on that was ordered, built and delivered — an extra section, an article, an extra project page.",
        ],
      },
      {
        heading: "How this works with the included revision rounds",
        body:
          "Every project includes two revision rounds after you have seen the first version. Asking for a revision is not a cancellation, and it does not affect your right to cancel later. If you used both rounds and then cancelled, both rounds count as work performed. A third round is priced separately and in advance; if you ordered it and I have not started it, it is refunded in full.",
      },
      {
        heading: "Cancelling Shani Care, the monthly plan",
        body:
          "Shani Care is a monthly plan with no commitment. You can stop any month, with a single message, and the site keeps working exactly as before. There is no exit fee and no penalty. Notice given before the next monthly charge stops that charge, and the month already paid for runs to its end. If the charge has already gone through and no service was provided that month, I refund it in full. The two months included in the price of a website are part of the website price and cannot be cashed out, though of course you are free not to use them.",
      },
      {
        heading: "How and when the money comes back",
        body:
          "Refunds go back to the same payment method you used, no later than 14 days from the date I receive your cancellation notice, as the law requires for a distance sale. In practice I try to be faster. If you were issued an invoice, I issue a matching credit note.",
      },
      {
        heading: "When the cancellation is my fault",
        body:
          "If the service does not match what was promised, if I miss the agreed timeline, or if I breach the terms of our agreement, you may cancel without paying anything for the part not properly delivered, and I charge no cancellation fee at all. That is also what section 14E of the Consumer Protection Law provides.",
      },
      {
        heading: "If I am the one cancelling",
        body:
          "In rare cases — if it turns out I am not the right fit for the project, or a conflict of interest arises — I may end the engagement. If that happens I refund in full for the part not carried out, hand over what has already been built, and help with an orderly handover.",
      },
      {
        heading: "If something goes wrong",
        body:
          "Talk to me first; most things get resolved in a conversation. If it still is not resolved, you can contact the Israeli Consumer Protection and Fair Trade Authority on 073-3717777 or through its website.",
      },
      {
        heading: "Governing law & jurisdiction",
        body:
          "This policy is governed by the laws of the State of Israel, and the competent courts in Israel have exclusive jurisdiction. It complements the Terms of Use and the Privacy Policy on this site. Where this page conflicts with a proposal or an individual signed agreement, whichever provision is more favourable to the client prevails.",
      },
      {
        heading: "Changes to this policy",
        body:
          "I may update this policy from time to time. The version that applies to your engagement is the one in force on the day we agreed it. The current version is always published on this page, with its update date.",
      },
      {
        heading: "Contact",
        body:
          "Shani Gorgov, exempt sole trader (עוסק פטור) 300585536. Email: shani.creates.ai@gmail.com. Phone and WhatsApp: +972-50-4744815.",
      },
    ],
  },
};

export default function CancellationPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <>
      <main dir={dir} style={{ padding: "9rem clamp(20px,5vw,40px) 0", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>{c.kicker}</div>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,5vw,56px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)", fontFamily: HEEBO }}>{c.title}</h1>
        <p className="page-meta" style={{ margin: "12px 0 0", fontFamily: MONO, fontSize: 13, color: "var(--muted2)" }}>{c.updated}</p>
        <p style={{ margin: "28px 0 0", color: "var(--ink)", fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.7, fontFamily: HEEBO }}>{c.intro}</p>

        {c.sections.map((s, i) => (
          <section key={i} style={{ marginTop: 44 }}>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>{s.heading}</h2>
            {s.body && <p style={{ margin: "14px 0 0", color: "var(--ink)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, fontFamily: HEEBO }}>{s.body}</p>}
            {s.items && (
              <ul style={{ margin: "14px 0 0", paddingInlineStart: 22, color: "var(--ink)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, fontFamily: HEEBO }}>
                {s.items.map((it, j) => (
                  <li key={j} style={{ marginBottom: 8 }}>{it}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div style={{ height: 80 }} />
      </main>
      <Footer />
    </>
  );
}
