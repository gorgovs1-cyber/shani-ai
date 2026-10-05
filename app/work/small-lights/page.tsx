import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SmallLightsReel, { SlLinkTracker } from "@/components/SmallLightsReel";
import { SL_REEL, SL_REEL_LIVE, SL_REEL_POSTER, SL_FILM_NARRATED } from "@/lib/smallLights";

const URL_ = "https://shani-ai.com/work/small-lights";
const TITLE = "SMALL LIGHTS: סרט אנימציה שנבנה מפרומפט אחד | Shani AI Creator";
const DESC = "נתתי ל-Claude Opus 5.5 פרומפט אחד. אחרי 15 דקות היה לו סיפור, אחרי 22 שעות סרט אנימציה של 4:32 דקות, והוא כתב לי בעצמו מה לא טוב בו. איך זה נבנה, עם הסרט המלא.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL_ },
  openGraph: {
    type: "article", url: URL_, title: "SMALL LIGHTS: סרט שנבנה מפרומפט אחד", description: DESC, locale: "he_IL", siteName: "Shani AI Creator",
    images: [{ url: "https://shani-ai.com/small-lights/assets/og.jpg", width: 1200, height: 630, alt: "המגדלור של SMALL LIGHTS על הסלע בשעת דמדומים" }],
  },
  twitter: { card: "summary_large_image", title: "SMALL LIGHTS: סרט שנבנה מפרומפט אחד", description: DESC, images: ["https://shani-ai.com/small-lights/assets/og.jpg"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${URL_}#article`,
      headline: "אחרי 15 דקות היה לו סיפור. אחרי 22 שעות הוא כתב לי בעצמו מה לא טוב בסרט.",
      description: DESC,
      inLanguage: "he-IL",
      mainEntityOfPage: URL_,
      image: ["https://shani-ai.com/small-lights/assets/og.jpg", "https://shani-ai.com/small-lights/bts/06D_the_first_answer.jpg"],
      author: { "@id": "https://shani-ai.com/#shani" },
      publisher: { "@id": "https://shani-ai.com/#business" },
      datePublished: "2026-10-05",
      about: { "@type": "Movie", name: "SMALL LIGHTS", duration: "PT4M32S", url: "https://shani-ai.com/small-lights" },
      ...(SL_REEL_LIVE ? { video: { "@id": `${URL_}#reel` } } : {}),
    },
    ...(SL_REEL_LIVE ? [{
      "@type": "VideoObject",
      "@id": `${URL_}#reel`,
      name: "SMALL LIGHTS: הסיפור בדקה (ריל)",
      description: "ריל של דקה על איך נוצר SMALL LIGHTS, בקול של שני. זה לא הסרט עצמו: הסרט המלא נמצא בעמוד ההקרנה.",
      thumbnailUrl: "https://shani-ai.com/small-lights/reel-poster.jpg",
      uploadDate: "2026-10-05",
      duration: "PT1M2S",
      contentUrl: SL_REEL,
      inLanguage: "he",
    }] : []),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: "https://shani-ai.com" },
        { "@type": "ListItem", position: 2, name: "עבודות", item: "https://shani-ai.com/work" },
        { "@type": "ListItem", position: 3, name: "SMALL LIGHTS", item: URL_ },
      ],
    },
  ],
};

const B = ({ children }: { children: React.ReactNode }) => <strong className="sl-num">{children}</strong>;

export default function SmallLightsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SlLinkTracker />
      <article className="sl-case" dir="rtl" lang="he">
        <header className="sl-hero">
          <nav className="sl-crumbs" aria-label="פירורי לחם"><a href="/work">עבודות</a> <span aria-hidden="true">/</span> <span aria-current="page">SMALL LIGHTS</span></nav>
          <div className="sl-hero-grid">
            <div className="sl-hero-copy">
              <p className="sl-kicker">SMALL LIGHTS · סרט אנימציה קצר</p>
              <h1>אחרי 15 דקות היה לו סיפור. אחרי 22 שעות הוא כתב לי בעצמו מה לא טוב בסרט.</h1>
              <p className="sl-lead">נתתי ל-Claude פרומפט אחד ולא אישרתי אף שלב באמצע. ככה נולד SMALL LIGHTS, סרט אנימציה קצר של 4:32 דקות.</p>
              <div className="sl-actions">
                <a className="sl-btn sl-btn-primary" href="/small-lights" data-sl="watch-film">לצפייה בסרט המלא</a>
                <a className="sl-btn sl-btn-ghost" href="/small-lights/original" data-sl="watch-original">הגרסה המקורית, בלי קריינות</a>
              </div>
              <ul className="sl-stats" aria-label="במספרים">
                <li><b>פרומפט אחד</b></li><li><b>6</b> סוכנים</li><li><b>43</b> שוטים</li><li><b>22</b> שעות ו-<b>36</b> דקות</li>
              </ul>
            </div>
            <figure className="sl-reel-wrap">
              {SL_REEL_LIVE ? (
                <SmallLightsReel src={SL_REEL} poster={SL_REEL_POSTER} label="ריל: הסיפור של SMALL LIGHTS בדקה" />
              ) : (
                <a href="/small-lights" data-sl="watch-film" className="sl-reel-fallback"><img src={SL_REEL_POSTER} alt="המגדלור של SMALL LIGHTS בלילה מלא כוכבים" width={720} height={1280} /></a>
              )}
              <figcaption>הסיפור בדקה, בקול שלי. הסרט עצמו נמצא בעמוד ההקרנה.</figcaption>
            </figure>
          </div>
        </header>

        <div className="sl-body">
          <section>
            <h2>נתתי לו בריף אחד ואמרתי לו לא לחכות לאישור שלי</h2>
            <p>הבריף היה <B>5,692</B> תווים, והוא נגמר ב-<span dir="ltr">&quot;Surprise me.&quot;</span></p>
            <p>עבדתי עם Claude Opus 5.5 בתוך Claude Code. את פרויקט הייחוס ששלחתי הוא בכלל לא ראה, כי הקישורים נחסמו.</p>
          </section>

          <section>
            <h2>תוך רבע שעה היה לו סיפור</h2>
            <p>תוך <B>10</B> דקות הוא בחר שם: SMALL LIGHTS. תוך <B>15</B> דקות היה סיפור שלם.</p>
            <p>הלילה האחרון לפני שהמגדלור נכבה לתמיד. שומר זקן כותב כבר <B>40</B> שנה את אותה שורה ביומן: <span dir="ltr">&quot;Nothing to report&quot;</span>. ואז מישהי עונה לאור שלו: Wick, דגת חכאי קטנטנה שחשבה שהמגדלור קורא לה.</p>
            <p>הוא החליט שהסרט יהיה בלי מילים, וכל הבהוב של אור הוא תו במוזיקה.</p>
            <figure className="sl-fig">
              <img src="/small-lights/bts/06D_the_first_answer.jpg" alt="Wick, דגת החכאי, מול האור של המגדלור" width={1400} height={586} loading="lazy" />
              <figcaption>התשובה הראשונה. פריים מהסרט.</figcaption>
            </figure>
          </section>

          <section>
            <h2>הוא הקים לעצמו צוות של 6 סוכנים, ואת ההחלטות השאיר אצלו</h2>
            <p>הסיפור נכתב לפני שהיה צוות. אחר כך הוא חילק את העבודה לשישה סוכני משנה: הסאונד, Wick והדג הטורף, השומר, העולם שמעל המים, החדר במגדלור והעולם שמתחת למים.</p>
            <p>מתוך <B>43</B> שוטים, <B>40</B> בנו הסוכנים ו-<B>3</B> הוא בנה בעצמו, כולל השוט הקשה ביותר.</p>
            <p>הוא גם לא אישר כל מה שחזר אליו. את הגרסה הראשונה של פני השומר הוא כינה <span dir="ltr">&quot;creepy&quot;</span>, ואת הזקן <span dir="ltr">&quot;whipped cream&quot;</span>. שניהם חזרו לתיקון.</p>
          </section>

          <section>
            <h2>באמצע נגמרה המכסה, ושום דבר לא אבד</h2>
            <p>מכסת השימוש בחשבון נגמרה, וכל הסוכנים שעבדו נעצרו תוך <B>5</B> דקות. המצב נשמר בריפו.</p>
            <p>אחרי <B>4</B> שעות ו-<B>51</B> דקות כתבתי שורה אחת: <span dir="ltr">&quot;Continue from where you left off.&quot;</span> זה הדבר היחיד שכתבתי עד שהסרט היה גמור.</p>
            <figure className="sl-fig">
              <img src="/small-lights/bts/agents_timeline.jpg" alt="ציר זמן: מי מהסוכנים עבד מתי, והעצירה כשנגמרה המכסה" width={1400} height={560} loading="lazy" />
              <figcaption>מי עבד מתי, לפי היומנים של ההפקה. הפס האדום הוא העצירה.</figcaption>
            </figure>
          </section>

          <section>
            <h2>את הטעויות הוא מצא בעצמו</h2>
            <p>בדיקה אוטומטית מצאה דיסק לבן שהופיע לפריים אחד בחמישה שוטים, מתוך <B>6,528</B> פריימים. הסיבה: מספר שגוי אחד בפיקסל, <span dir="ltr">≈ −65504</span>.</p>
            <p>הוא כתב כלי שמחפש פריימים כאלה, ורינדר מחדש רק <B>7</B> מתוך <B>87</B> חלקים. בדרך, סוכן אחד מצא באג בקוד של סוכן אחר. ואת המוזיקה, שהוא לא יכול לשמוע, הוא בדק במדידות.</p>
            <div className="sl-pair">
              <figure className="sl-fig"><img src="/small-lights/bts/whitedisc_06D_frame3812_before.jpg" alt="הפריים עם הדיסק הלבן, לפני התיקון" width={1400} height={586} loading="lazy" /><figcaption>לפני</figcaption></figure>
              <figure className="sl-fig"><img src="/small-lights/bts/whitedisc_06D_frame3812_after.jpg" alt="אותו פריים אחרי התיקון" width={1400} height={586} loading="lazy" /><figcaption>אחרי</figcaption></figure>
            </div>
          </section>

          <section>
            <h2>הסרט יצא, והוא גם אמר לי איפה הוא חלש</h2>
            <p>אחרי <B>22</B> שעות ו-<B>36</B> דקות, כולל העצירה, היה סרט של <B>4:32</B> דקות.</p>
            <p>במסירה הוא כתב בעצמו מה לא עבד: הזקן נראה כמו פלסטיק מפוסל בחלק מהתקריבים, ושוט אחד קשה לקריאה. הוא גם כתב <span dir="ltr">&quot;not true Pixar-level fidelity&quot;</span>. זה הציטוט שלו, לא טענה שלי.</p>
            <a className="sl-film" href="/small-lights" data-sl="watch-film">
              <img src="/small-lights/assets/poster.jpg" alt="המגדלור של SMALL LIGHTS בדמדומים" width={1920} height={804} loading="lazy" />
              <span className="sl-film-cta"><span className="sl-play" aria-hidden="true">▶</span> לצפייה בסרט המלא · 4:32</span>
            </a>
            <p className="sl-note">בעמוד ההקרנה יש כתוביות בעברית, וגם הגרסה המקורית בלי קריינות.</p>
          </section>

          <section>
            <h2>אחר כך באו הקריינות והסטודיו</h2>
            <p>יום אחרי ביקשתי גרסה מסופרת. הוא כתב קריינות באנגלית, עשה אודישן לקולות סינתטיים, ואני בחרתי את הקול. הוא סימן בעצמו שתי שורות שלא היה בטוח בהן, ואני חתכתי בדיוק אותן.</p>
            <p>לא הכול היה מדויק: בבדיקת הכתוביות הוא דיווח לי על תקלה שלא הייתה, וגילה את הטעות כשביקשתי לתקן.</p>
            <p>בסוף ביקשתי ממנו להפוך את כל מה שלמדנו לשיטת עבודה. כך נולד SHANI AI VIDEO STUDIO, וגם הריל שבראש העמוד הופק בו.</p>
          </section>

          <aside className="sl-guide">
            <h2>רוצים לבנות תהליך כזה בעצמכם?</h2>
            <p>כתבתי מדריך מעשי: מהבריף, דרך הסוכנים והבדיקות, ועד סרט גמור.</p>
            <a className="sl-btn sl-btn-primary" href="/guides/claude-opus-film.html" data-sl="guide">למדריך המלא</a>
          </aside>

          <details className="sl-details">
            <summary>עוד פרטים מההפקה</summary>
            <ul>
              <li>הכול בסרט הוא קוד: הדמויות, הים, המגדלור והמעמקים נבנו ונעו ב-Three.js, והמוזיקה והסאונד נוצרו מאותה רשימת רמזים שמניעה את התמונה. בסרט לא השתמשו במודלים ליצירת תמונה, וידאו או מוזיקה.</li>
              <li>ההפקה רצה על מעבד, בלי כרטיס גרפי: <span dir="ltr">6,528</span> פריימים ב-87 חלקים.</li>
              <li>הדבר הכי יקר ברינדור היה הסלע. כשהסתירו אותו, פריים ירד מ-15.6 שניות ל-3.5.</li>
              <li>הקריינות בגרסה המסופרת היא באנגלית, בקול סינתטי ממודל קוד פתוח שרץ מקומית.</li>
              <li>את הריל שבראש העמוד ערכו עם הקול שלי, ולא בקול סינתטי.</li>
            </ul>
          </details>
        </div>

        <aside className="sl-cta">
          <h2>איפה צוות סוכנים כזה יכול לעבוד אצלכם?</h2>
          <p>בבדיקת ההתאמה החינמית אתם מספרים לי בכמה דקות איך העבודה שלכם נראית היום, ואני חוזרת אליכם עם כיוונים.</p>
          <a className="sl-btn sl-btn-primary" href="/audit" data-sl="audit">לבדיקת התאמה חינם</a>
          <p className="sl-more"><a href="/automations">אוטומציות לעסק</a> <span aria-hidden="true">·</span> <a href="/work">לכל העבודות</a></p>
        </aside>
      </article>
      <Footer />
    </>
  );
}
