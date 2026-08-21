// ─── SHANI AI, BLOG POSTS ───
// מקור האמת היחיד לבלוג: /blog, /blog/<slug> וה-sitemap כולם נגזרים מהמערך כאן,
// כדי שלא ייווצר מצב שהסייטמאפ מצביע על מאמר שלא קיים.
//
// למה מבנה בלוקים ולא HTML גולמי:
//   1. הבלוג דו-לשוני. כל בלוק מחזיק גם עברית וגם אנגלית, אז מתג השפה הקיים
//      באתר עובד על גוף המאמר בדיוק כמו על שאר העמודים.
//   2. אין תלות חדשה (בלי MDX, בלי CMS), ואין dangerouslySetInnerHTML בגוף
//      המאמר, אז אין דרך להזריק HTML דרך התוכן.
//
// קישורים בתוך פסקה נכתבים כ-[טקסט](/כתובת) ומפוענחים ב-components/PostArticle.tsx.
// זו התחביר היחיד שנתמך בתוך טקסט. אין הדגשות, אין HTML.
//
// כדי להוסיף מאמר: מוסיפים רשומה אחת למערך למטה. זהו.

export type Block =
  | { type: "h2"; text: string; textEn: string }
  | { type: "p"; text: string; textEn: string }
  | { type: "ul"; items: string[]; itemsEn: string[] }
  // note = תיבה מודגשת. לשימוש נדיר, למשפט אחד שחייב לבלוט.
  | { type: "note"; text: string; textEn: string };

export type Post = {
  slug: string;         // הכתובת: /blog/<slug>
  date: string;         // ISO yyyy-mm-dd, תאריך פרסום
  updated?: string;     // ISO, רק אם המאמר עודכן אחרי הפרסום
  readingMinutes: number;
  title: string;        // HE
  titleEn: string;
  description: string;  // HE, משמש גם כ-meta description
  descriptionEn: string;
  tag: string;          // HE
  tagEn: string;
  // הביטוי שהמאמר תוקף, מתוך מפת מילות המפתח. שדה פנימי, לא מוצג בעמוד.
  // keywordVerified=false פירושו שאין נתוני נפח חיפוש שאימתו את הביטוי,
  // הוא נבחר לפי שיקול דעת. נכון להיום זה המצב בכל הביטויים במפה.
  keyword: string;
  keywordVerified: boolean;
  body: Block[];
};

export const posts: Post[] = [
  // ────────────────────────────────────────────────────────────────
  // 1 · "כמה עולה אתר לעסק קטן" — הביטוי בעדיפות ראשונה במפת המילים
  // ────────────────────────────────────────────────────────────────
  {
    slug: "kama-ole-atar-le-esek-katan",
    date: "2026-08-18",
    readingMinutes: 5,
    keyword: "כמה עולה אתר לעסק קטן 2026",
    keywordVerified: false,
    title: "כמה עולה אתר לעסק קטן ב-2026",
    titleEn: "What a small-business website really costs in 2026",
    description:
      "המחירים לדף נחיתה, לאתר ולאתר פורטפוליו, מה נכנס למחיר ומה תמיד נשאר בחוץ, כמה זה עולה כל חודש אחרי שהאתר באוויר, ושבע שאלות לשאול כל מי שמציע לכם הצעה.",
    descriptionEn:
      "Real prices for a landing page, a website and a portfolio site, what is inside the price and what is always left out, what it costs every month once it is live, and seven questions to ask anyone who sends you a quote.",
    tag: "מחירים",
    tagEn: "Pricing",
    body: [
      {
        type: "p",
        text: "אם חיפשתם בגוגל כמה עולה אתר לעסק קטן, כנראה קיבלתם טווח שנע בין 500 ₪ ל-30 אלף. הטווח הזה לא באמת עוזר לכם, והוא גם לא מקרי: רוב מי שבונה אתרים לא רוצה לנקוב במחיר לפני שיחה, כי המחיר משתנה לפי מי שואל.",
        textEn:
          "If you googled what a small-business website costs, you probably got a range somewhere between a few hundred shekels and thirty thousand. That range does not help you, and it is not an accident: most people who build websites would rather not name a price before a call, because the price changes depending on who is asking.",
      },
      {
        type: "p",
        text: "עשר שנים ניהלתי עסק משלי לפני שהתחלתי לבנות אתרים ומערכות לאחרים, והייתי בצד שמקבל את ההצעות האלה. אז המאמר הזה כתוב כמו שהייתי רוצה שמישהו יכתוב לי אז: מספרים, מה נכנס פנימה, מה נשאר בחוץ, ואיך מחליטים.",
        textEn:
          "I ran my own business for ten years before I started building websites and systems for other people, and I was on the receiving end of those quotes. So this is written the way I wish someone had written it for me back then: numbers, what is inside, what is left out, and how to decide.",
      },

      {
        type: "h2",
        text: "למה כל כך קשה לקבל מחיר",
        textEn: "Why a straight price is so hard to get",
      },
      {
        type: "p",
        text: "שלוש סיבות, ורק השלישית בעייתית. הראשונה: המילה אתר מתארת שלושה דברים שונים לגמרי, מעמוד אחד שאפשר לגלול ועד לעשרים עמודים שכל אחד מהם מדורג בגוגל בנפרד. השנייה: חלק מהמחיר תלוי בכם, בטקסטים ובתמונות שיש לכם ביד. השלישית, והפחות נעימה: יש מי שמתמחר לפי איך שאתם נשמעים בטלפון.",
        textEn:
          "Three reasons, and all of them are real. First: the word 'website' describes three completely different things, from a single scrollable page to twenty pages that each rank on Google separately. Second: part of the price depends on you, on the text and images you already have. Third, and less pleasant: some people price by how you sound on the phone.",
      },
      {
        type: "p",
        text: "על הראשונה והשנייה אפשר לענות. על השלישית אפשר רק להתעקש שהמחיר יהיה כתוב מראש, וזה מה שאני עושה: המחיר במחירון הוא המחיר, ואין מחיר אחר למי ששואל אחרת.",
        textEn:
          "The first two can be answered. For the third, the only defence is insisting the price is published in advance, which is what I do: the price on the pricing page is the price, and there is no different price for people who ask differently.",
      },

      {
        type: "h2",
        text: "שלוש רמות של אתר, ומה מבדיל ביניהן",
        textEn: "Three levels of website, and what actually separates them",
      },
      {
        type: "p",
        text: "ההבדל האמיתי בין הרמות הוא לא כמה יפה זה נראה. הוא כמה כניסות נפרדות לגוגל יש לכם. כל עמוד באתר הוא כתובת נפרדת שיכולה לדרג על ביטוי משלה, וזה כל הסיפור.",
        textEn:
          "The real difference between the levels is not how pretty it looks. It is how many separate doors into Google you own. Every page is its own address that can rank for its own search term, and that is the whole story.",
      },
      {
        type: "ul",
        items: [
          "דף נחיתה, 1,500 ₪. עמוד אחד רציף, עד שלושה חלקים, כפתור וואטסאפ קבוע, בלי תפריט ניווט. מתאים כשיש לכם דבר אחד למכור והמטרה היא שיצרו איתכם קשר.",
          "אתר, 2,400 ₪. עמוד בית ועוד שניים עד ארבעה עמודים, כשכל אחד מהם מדורג בגוגל בנפרד. כולל גלריית עבודות משותפת עד עשרה פריטים, שאלות נפוצות והמלצות, ושני חודשי ליווי כלולים בשווי 400 ₪.",
          "אתר פורטפוליו, 3,700 ₪. כל מה שיש באתר, ועוד עד עשרה עמודי פרויקט נפרדים שכל אחד מהם מדורג בגוגל בעצמו. עמוד נוסף מעבר לעשרה עולה 250 ₪.",
          "גרסה בשפה שנייה, 600 ₪. אותו מחיר לכל סוג אתר, כולל תרגום, היפוך הפריסה ומתג שפה.",
        ],
        itemsEn: [
          "Landing page, ₪1,500. One continuous page, up to three sections, a fixed WhatsApp button, no navigation menu. Right when you have one thing to sell and the goal is to get contacted.",
          "Website, ₪2,400. A homepage plus two to four more pages, each ranking on Google on its own. Includes a shared portfolio gallery of up to ten pieces, an FAQ and testimonials, and two months of support worth ₪400.",
          "Portfolio website, ₪3,700. Everything in 'Website', plus up to ten dedicated project pages that each rank on Google by themselves. An extra page beyond ten costs ₪250.",
          "Second language version, ₪600. Same price for any site type, including translation, mirrored layout and a language switch.",
        ],
      },
      {
        type: "p",
        text: "המחירים האלה סופיים ומלאים, וכל הפירוט נמצא [בעמוד המחירים](/pricing). מה שנבנה בכל רמה מפורט [בעמוד האתרים](/websites).",
        textEn:
          "These prices are final and complete, and the full breakdown is [on the pricing page](/pricing). What gets built at each level is detailed [on the websites page](/websites).",
      },

      {
        type: "h2",
        text: "מה שכמעט תמיד לא נמצא בהצעה הזולה",
        textEn: "What the cheap quote almost always leaves out",
      },
      {
        type: "p",
        text: "כשאתם משווים שתי הצעות ואחת זולה בהרבה, ההפרש כמעט תמיד יושב באחד מארבעת הדברים האלה. שווה לבדוק אותם אחד אחד לפני שמחליטים.",
        textEn:
          "When you compare two quotes and one is far cheaper, the gap almost always sits in one of these four things. Worth checking each one before you decide.",
      },
      {
        type: "ul",
        items: [
          "התאמת נגישות לתקן הישראלי 5568. נדרשת בחוק לאתר עסקי, ורוב האתרים הזולים מגיעים בלעדיה. אצלי היא כלולה בכל אתר.",
          "מדיניות פרטיות ותקנון. שני עמודים שאף אחד לא קורא עד הרגע שבו הם חסרים.",
          "בעלות על הקוד. אם אתם לא יכולים לקחת את האתר למפתח אחר, אתם לא באמת בעלים שלו. אני מוסרת את הקוד, בלי נעילה לפלטפורמה.",
          "סבבי שינויים. שני סבבים כלולים אצלי בכל פרויקט, וסבב שלישי מתומחר מראש ב-350 ₪. חלק נוסף באתר מעבר למה שסוכם עולה 450 ₪.",
        ],
        itemsEn: [
          "Accessibility to Israeli standard 5568. Required by law for a business site, and most cheap sites arrive without it. With me it is included in every website.",
          "A privacy policy and terms of use. Two pages nobody reads until the moment they are missing.",
          "Ownership of the code. If you cannot take the site to another developer, you do not really own it. I hand over the code, with no platform lock-in.",
          "Revision rounds. Two are included in every project here, and a third is priced in advance at ₪350. An extra section beyond what we agreed is ₪450.",
        ],
      },

      {
        type: "h2",
        text: "מה תשלמו כל חודש, בלי קשר למי בונה",
        textEn: "What you pay every month, whoever builds it",
      },
      {
        type: "p",
        text: "החלק הזה מפתיע הרבה אנשים, כי הוא לא מופיע בהצעה. דומיין עולה בממוצע 60 עד 90 ₪ לשנה, תלוי בסיומת ובספק, ונרשם על השם שלכם ובכרטיס שלכם. אחסון תלוי בטכנולוגיה: אתר בנוי בקוד לא נושא עלות אחסון חודשית, ואתר וורדפרס עולה 60 עד 100 ₪ בחודש כל עוד הוא באוויר. זה הפרש של יותר מאלף שקלים בשנה, כל שנה.",
        textEn:
          "This part surprises people, because it does not show up in the quote. A domain averages ₪60 to ₪90 a year depending on the extension and provider, and it is registered in your name and on your card. Hosting depends on the technology: a site built in code carries no monthly hosting cost, while a WordPress site runs ₪60 to ₪100 every month for as long as it is live. That is a difference of over a thousand shekels a year, every year.",
      },
      {
        type: "p",
        text: "ליווי חודשי הוא נפרד ולא חובה. אצלי הוא נקרא Shani Care ומתחיל ב-200 ₪ לחודש לאתר. מי שמזמין אתר מקבל את החודשיים הראשונים כלולים, ואחר כך אפשר להפסיק בכל חודש והאתר ממשיך לעבוד בדיוק אותו דבר.",
        textEn:
          "Monthly support is separate and optional. Mine is called Shani Care and starts at ₪200 a month for a website. Order a site and the first two months are included; after that you can stop any month and the site keeps working exactly the same.",
      },

      {
        type: "h2",
        text: "כמה זמן זה לוקח",
        textEn: "How long it takes",
      },
      {
        type: "ul",
        items: [
          "דף נחיתה: גרסה ראשונה מלאה עד חמישה ימי עבודה מרגע שהחומרים אצלי, ובאוויר תוך שבוע עד שבועיים.",
          "אתר: גרסה ראשונה מלאה תוך שמונה עד עשרה ימי עבודה, ובאוויר תוך שבועיים עד שלושה.",
          "אתר פורטפוליו: 13 עד 15 ימי עבודה, ובאוויר תוך שלושה עד ארבעה שבועות, כי יש עוד עמודי פרויקט לבנות ולקדם.",
        ],
        itemsEn: [
          "Landing page: a full first version within five working days from the moment I have your materials, and live within one to two weeks.",
          "Website: a full first version within eight to ten working days, and live within two to three weeks.",
          "Portfolio website: 13 to 15 working days, and live within three to four weeks, because there are more project pages to build and optimise.",
        ],
      },
      {
        type: "note",
        text: "ההפרש בין גרסה ראשונה לבין באוויר הוא כמעט תמיד אתם: טקסטים, תמונות, אישורים. ככל שהחומרים מוכנים מראש, הפער נסגר.",
        textEn:
          "The gap between 'first version' and 'live' is almost always you: text, images, approvals. The more your materials are ready in advance, the smaller that gap gets.",
      },

      {
        type: "h2",
        text: "איך בוחרים, בלי לשלם על מה שלא צריך",
        textEn: "How to choose without paying for what you do not need",
      },
      {
        type: "p",
        text: "שאלה אחת מסדרת את זה: על כמה ביטויים שונים אתם רוצים שיימצאו אתכם בגוגל. אם התשובה היא אחד, דף נחיתה מספיק ואל תשלמו יותר. אם יש שניים עד ארבעה נושאים שאנשים מחפשים בנפרד, למשל שירות מסוים, אזור גיאוגרפי ומחירים, אתר עם עמוד לכל אחד מהם יעבוד הרבה יותר קשה בשבילכם. ואם תיק העבודות הוא זה שמוכר, כמו אצל אדריכלים, מעצבי פנים או קבלני שיפוצים, עמוד נפרד לכל פרויקט הוא ההבדל בין להיראות לבין להימצא.",
        textEn:
          "One question sorts it out: how many different search terms do you want to be found for. If the answer is one, a landing page is enough and you should not pay more. If there are two to four topics people search separately, say a specific service, an area and prices, a site with a page for each will work much harder for you. And if the portfolio is what sells, as with architects, interior designers or contractors, a dedicated page per project is the difference between looking good and being found.",
      },
      {
        type: "p",
        text: "אפשר גם להתחיל קטן ולהרחיב. דף נחיתה שעובד ומביא פניות הוא בסיס טוב יותר להחלטה מאשר אתר גדול שנבנה על ניחוש.",
        textEn:
          "You can also start small and expand. A landing page that works and brings enquiries is a better basis for a decision than a big site built on a guess.",
      },

      {
        type: "h2",
        text: "שבע שאלות לשאול כל מי שמציע לכם אתר",
        textEn: "Seven questions to ask anyone quoting you a website",
      },
      {
        type: "p",
        text: "גם אם לא תעבדו איתי, קחו את הרשימה הזאת לשיחה הבאה. היא מסננת את רוב ההפתעות.",
        textEn:
          "Even if you never work with me, take this list into your next call. It filters out most of the surprises.",
      },
      {
        type: "ul",
        items: [
          "האתר יעמוד בתקן נגישות 5568, וזה כלול במחיר?",
          "הקוד יימסר לי, ואוכל לקחת אותו למפתח אחר?",
          "כמה סבבי שינויים כלולים, וכמה עולה סבב נוסף?",
          "מה העלות החודשית שלי אחרי שהאתר באוויר, בשקלים?",
          "כמה עמודים נפרדים יש, וכל אחד מהם יכול לדרג בגוגל בעצמו?",
          "על שם מי נרשמים הדומיין והכלים?",
          "מה קורה אם אני צריך שינוי בעוד חצי שנה, כמה זה עולה?",
        ],
        itemsEn: [
          "Will the site meet accessibility standard 5568, and is that included in the price?",
          "Will the code be handed to me, so I can take it to another developer?",
          "How many revision rounds are included, and what does an extra round cost?",
          "What is my monthly cost once the site is live, in actual numbers?",
          "How many separate pages are there, and can each one rank on Google by itself?",
          "In whose name are the domain and the tools registered?",
          "What happens if I need a change in six months, and what does it cost?",
        ],
      },

      {
        type: "h2",
        text: "בשורה אחת",
        textEn: "In one line",
      },
      {
        type: "p",
        text: "אתר לעסק קטן ב-2026 נע בין 1,500 ₪ לדף נחיתה ל-3,700 ₪ לאתר פורטפוליו, פלוס 60 עד 90 ₪ בשנה על דומיין. כל מה שמעבר לזה הוא בחירה שלכם, ולא הפתעה. אם אתם לא בטוחים איזו רמה נכונה לכם, [האבחון החינמי](/audit) הוא טופס קצר, ותוך יום עסקים אני חוזרת עם שניים-שלושה כיוונים קונקרטיים. גם אם בסוף לא נעבוד יחד, תדעו מה אתם צריכים.",
        textEn:
          "A small-business website in 2026 runs from ₪1,500 for a landing page to ₪3,700 for a portfolio site, plus ₪60 to ₪90 a year for a domain. Everything beyond that is your choice, not a surprise. If you are not sure which level fits, [the free audit](/audit) is a short form, and within one business day I come back with two or three concrete directions. Even if we never work together, you will know what you need.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 2 · "בוט וואטסאפ לעסק מחיר" — הביטוי בעדיפות שנייה במפת המילים
  // ────────────────────────────────────────────────────────────────
  {
    slug: "bot-whatsapp-le-esek-mehir",
    date: "2026-08-18",
    readingMinutes: 5,
    keyword: "בוט וואטסאפ לעסק מחיר",
    keywordVerified: false,
    title: "בוט וואטסאפ לעסק: כמה זה עולה ואיך זה עובד",
    titleEn: "A WhatsApp bot for your business: what it costs and how it works",
    description:
      "מה בוט וואטסאפ באמת עושה ומה הוא לא עושה, כמה עולה להקים אותו וכמה הוא עולה כל חודש, מתי הוא בזבוז כסף, ומה כדאי להכין לפני שמזמינים אחד.",
    descriptionEn:
      "What a WhatsApp bot actually does and what it does not, what it costs to build and what it costs monthly, when it is a waste of money, and what to prepare before you order one.",
    tag: "אוטומציה",
    tagEn: "Automation",
    body: [
      {
        type: "p",
        text: "רוב בעלי העסקים שמדברים איתי על בוט וואטסאפ מגיעים מאותה נקודה: הודעות נכנסות בערב, בשבת, באמצע טיפול, והתשובה מגיעה אחרי שלוש שעות. עד אז המתעניין כבר כתב לעוד שניים. זו לא בעיה של שירות גרוע, זו בעיה של אדם אחד ויום אחד.",
        textEn:
          "Most business owners who talk to me about a WhatsApp bot arrive from the same place: messages come in at night, on Saturday, mid-treatment, and the reply goes out three hours later. By then the prospect has messaged two other people. That is not a service problem, it is a one-person, one-day problem.",
      },

      {
        type: "h2",
        text: "מה בוט וואטסאפ באמת עושה",
        textEn: "What a WhatsApp bot actually does",
      },
      {
        type: "p",
        text: "בוט וואטסאפ יושב על מספר העסק שלכם ועונה על השאלות שחוזרות אצלכם שוב ושוב, בעברית ובטון של העסק, מסביב לשעון. שעות פעילות, מחירים, איפה אתם, מה כולל הטיפול, האם יש חניה. ברגע שהשיחה דורשת אתכם, הוא מעביר אותה אליכם עם כל מה שכבר נאמר, כדי שלא תתחילו מהתחלה.",
        textEn:
          "A WhatsApp bot sits on your business number and answers the questions you get again and again, in Hebrew and in your business tone, around the clock. Opening hours, prices, where you are, what a treatment includes, whether there is parking. The moment a conversation needs you, it hands it over with everything that has already been said, so you do not start from scratch.",
      },
      {
        type: "p",
        text: "מה שהוא לא עושה: הוא לא מנהל מכירה מורכבת, לא מקבל החלטות במקומכם ולא ממציא תשובות. הוא עונה מתוך מה שהגדרתם, ובכל מקרה אחר אומר שתחזרו אליהם. זה בכוונה. בוט שממציא מחיר עולה יותר ממה שהוא חוסך.",
        textEn:
          "What it does not do: it does not run a complex sale, does not make decisions for you, and does not invent answers. It replies from what you defined, and in any other case it says you will get back to them. That is deliberate. A bot that invents a price costs more than it saves.",
      },

      {
        type: "h2",
        text: "איך זה מורכב מבפנים",
        textEn: "How it is put together",
      },
      {
        type: "p",
        text: "בפועל צריך שלושה דברים. חשבון וואטסאפ עסקי על מספר של העסק, מאגר תשובות שנבנה מהשיחות האמיתיות שלכם, וכללי מעבר, כלומר מתי הבוט מפסיק לענות ומעביר אליכם. החלק שלוקח הכי הרבה זמן הוא לא הטכנולוגיה אלא השני: לנסח את התשובות בטון שלכם, ולהחליט מה מותר לו להגיד על מחירים.",
        textEn:
          "In practice you need three things. A WhatsApp business account on your business number, a set of answers built from your real conversations, and handover rules, meaning when the bot stops answering and passes it to you. The part that takes longest is not the technology, it is the second one: phrasing the answers in your tone, and deciding what it is allowed to say about prices.",
      },

      {
        type: "h2",
        text: "איך זה נראה בפועל",
        textEn: "What it looks like in practice",
      },
      {
        type: "p",
        text: "נניח שמישהי כותבת לכם בשמונה בערב, אחרי שסגרתם. היא שואלת כמה עולה טיפול ומתי יש מקום. הבוט עונה לה תוך שניות עם המחיר ועם שעות הפעילות, שואל אם היא רוצה שתחזרו אליה מחר, לוקח שם ושעה נוחה, ורושם את הכל במקום שאתם רואים בבוקר. אתם לא עניתם בשמונה בערב, אבל היא גם לא המשיכה לחפש מישהי אחרת.",
        textEn:
          "Say someone messages you at eight in the evening, after you have closed. She asks what a treatment costs and when there is an opening. The bot answers within seconds with the price and the opening hours, asks whether she would like you to get back to her tomorrow, takes her name and a convenient time, and logs all of it where you will see it in the morning. You did not reply at eight in the evening, but she also did not carry on looking for someone else.",
      },
      {
        type: "p",
        text: "הערך פה הוא לא בהודעה עצמה. הוא בזה שהפנייה לא התקררה בזמן שאתם ישנתם, ושכשאתם פותחים את הטלפון בבוקר יש לכם שם, טלפון ומה היא ביקשה, במקום שורה שכתוב בה רק היי.",
        textEn:
          "The value is not in the message itself. It is that the enquiry did not go cold while you were asleep, and that when you open your phone in the morning you have a name, a number and what she asked for, instead of a line that just says 'hi'.",
      },

      {
        type: "h2",
        text: "בוט או סוכן: איך מחליטים בלי לנחש",
        textEn: "Bot or agent: deciding without guessing",
      },
      {
        type: "p",
        text: "ההבדל בין בוט לסוכן הוא לא כמה חכם הוא נשמע, אלא האם התשובה שלכם ידועה מראש. יש בדיקה פשוטה: פתחו את עשר הפניות האחרונות ושאלו על כל אחת אם יכולתם לענות עליה בהודעה מוכנה מראש, בלי לחשוב. אם התשובה היא שבע ומעלה, בוט יעשה את העבודה ואין סיבה לשלם על יותר. אם התשובה היא שלוש, כל תשובה מוכנה תהיה חלקית והלקוח ירגיש את זה, ואז סוכן, שמבין הקשר וזוכר את השיחה, הוא הכלי הנכון.",
        textEn:
          "The difference between a bot and an agent is not how clever it sounds, it is whether your answer is known in advance. There is a simple test: open your last ten enquiries and ask, for each one, whether you could have answered it with a pre-written message, without thinking. If the answer is seven or more, a bot will do the job and there is no reason to pay for more. If the answer is three, every pre-written reply will be partial and the customer will feel it, and then an agent, one that understands context and remembers the conversation, is the right tool.",
      },

      {
        type: "h2",
        text: "כמה זה עולה",
        textEn: "What it costs",
      },
      {
        type: "p",
        text: "בוט וואטסאפ הוא דרגה שנייה מתוך מסלול של ארבע דרגות אוטומציה, והמחיר שלו 2,400 ₪, חד פעמי. הדרגות מסביב קיימות כי לא כל עסק צריך בוט.",
        textEn:
          "A WhatsApp bot is the second of four automation levels, and it costs ₪2,400 as a one-off. The levels around it exist because not every business needs a bot.",
      },
      {
        type: "ul",
        items: [
          "דרגה 1, אוטומציה בודדת, 1,400 ₪. תהליך אחד שרץ לבד, למשל תזכורת לפני תור או פנייה שנכנסת ישר לגיליון. מתאים כשיש פעולה ידנית אחת שחוזרת כל יום.",
          "דרגה 2, בוט וואטסאפ, 2,400 ₪. מענה 24/7 בעברית, בטון של העסק, עם העברה אליכם כשצריך.",
          "דרגה 3, סוכן AI עם סקיל עברי, 4,900 ₪. מבין הקשר, זוכר שיחה, קובע פגישה ביומן, מתמחר לפי הכללים שלכם ומסנן פניות שלא מתאימות.",
          "דרגה 4, מערכת AI מלאה, 7,900 ₪. אתר, סוכן, אוטומציות וריכוז הפניות במקום אחד, במחיר נמוך מרכישה בנפרד.",
        ],
        itemsEn: [
          "Level 1, single automation, ₪1,400. One process that runs on its own, say a reminder before an appointment or an enquiry that lands straight in a sheet. Right when there is one manual action that repeats daily.",
          "Level 2, WhatsApp bot, ₪2,400. Answers 24/7 in Hebrew, in your tone, handing over to you when needed.",
          "Level 3, AI agent with a Hebrew skill, ₪4,900. Understands context, remembers the conversation, books meetings, quotes by your rules and filters out enquiries that do not fit.",
          "Level 4, full AI system, ₪7,900. Website, agent, automations and every enquiry in one place, priced below buying each part separately.",
        ],
      },
      {
        type: "p",
        text: "מעבר להקמה יש עלות שוטפת של הכלים עצמם, בין 0 ל-150 ₪ בחודש לפי כמות השימוש. הכלים נרשמים על שמכם ובכרטיס שלכם, כך שאתם לא תלויים בי בשביל להמשיך. ליווי חודשי לבוט הוא נפרד ולא חובה, 450 ₪ בחודש, וכולל קריאה של שיחות אמיתיות והוספת תשובות חדשות. הפירוט המלא נמצא [בעמוד המחירים](/pricing), וכל דרגה מוסברת [בעמוד האוטומציות](/automations).",
        textEn:
          "Beyond the build there is a running cost for the tools themselves, between ₪0 and ₪150 a month depending on usage. The tools are registered in your name and on your card, so you are not dependent on me to keep going. Monthly support for a bot is separate and optional, ₪450 a month, and includes reading real conversations and adding new answers. Full detail is [on the pricing page](/pricing), and every level is explained [on the automations page](/automations).",
      },

      {
        type: "h2",
        text: "מתי בוט וואטסאפ הוא בזבוז כסף",
        textEn: "When a WhatsApp bot is a waste of money",
      },
      {
        type: "p",
        text: "אני מעדיפה להגיד את זה מראש מאשר אחרי שמישהו שילם. שלושה מקרים שבהם בוט הוא הכלי הלא נכון:",
        textEn:
          "I would rather say this upfront than after someone has paid. Three cases where a bot is the wrong tool:",
      },
      {
        type: "ul",
        items: [
          "אתם מקבלים שלוש הודעות בשבוע. בוט לא יחזיר את ההשקעה, ומענה מהיר ידני יספיק. אולי חסר לכם אתר שיביא פניות, לא בוט שיענה עליהן.",
          "כל פנייה אצלכם שונה ודורשת שיקול דעת, למשל תמחור שמשתנה לפי היקף. תשובות מוכנות מראש ייתנו כאן תשובה גרועה. זה בדיוק המקרה שבו סוכן, ולא בוט, הוא הכלי הנכון.",
          "אין לכם תשובות כתובות. אם אתם לא יודעים מה אתם עונים על השאלות החוזרות, אין ממה לבנות. זה שלב שקודם לבוט, וכדאי לעשות אותו גם לבד.",
        ],
        itemsEn: [
          "You get three messages a week. A bot will not pay for itself, and replying fast by hand is enough. You may be missing a website that brings enquiries, not a bot that answers them.",
          "Every enquiry is different and needs judgement, say pricing that changes with scope. Pre-written answers will give a poor answer here. This is exactly where an agent, not a bot, is the right tool.",
          "You have no written answers. If you do not know what you reply to the recurring questions, there is nothing to build from. That step comes before the bot, and it is worth doing on your own anyway.",
        ],
      },

      {
        type: "h2",
        text: "מה להכין לפני שמזמינים",
        textEn: "What to prepare before you order",
      },
      {
        type: "p",
        text: "העבודה הזאת שווה גם אם לא תזמינו בוט בכלל. פתחו את הוואטסאפ העסקי, גללו חודש אחורה, וכתבו בקובץ אחד:",
        textEn:
          "This work is worth doing even if you never order a bot. Open your business WhatsApp, scroll back a month, and write down in one file:",
      },
      {
        type: "ul",
        items: [
          "את חמש עשרה השאלות שחזרו הכי הרבה, בניסוח שבו הלקוחות שואלים אותן ולא בניסוח שלכם.",
          "את התשובה שלכם לכל אחת, במשפט או שניים, בדיוק כמו שאתם עונים בפועל.",
          "מה אתם מוכנים להגיד על מחיר בהודעה, ומה רק בשיחה.",
          "שלוש סיטואציות שבהן אתם רוצים שהשיחה תעבור אליכם מיד.",
        ],
        itemsEn: [
          "The fifteen questions that came up most, phrased the way customers ask them and not the way you would.",
          "Your answer to each one, in a sentence or two, exactly as you actually reply.",
          "What you are willing to say about price in a message, and what only on a call.",
          "Three situations where you want the conversation handed to you immediately.",
        ],
      },
      {
        type: "note",
        text: "הקובץ הזה הוא הבוט. כל השאר הוא חיבור.",
        textEn: "That file is the bot. Everything else is wiring.",
      },

      {
        type: "h2",
        text: "איך יודעים שזה עובד",
        textEn: "How you know it is working",
      },
      {
        type: "p",
        text: "לא לפי כמה הודעות הבוט שלח. שלושה דברים ששווה למדוד בחודש הראשון: כמה זמן עובר מהודעה נכנסת ועד תשובה ראשונה, כמה שיחות נסגרו בלי שנגעתם בהן בכלל, וכמה שיחות עברו אליכם ובכמה מהן הבוט כבר אסף את הפרטים החשובים. אם המספר הראשון ירד והשלישי עלה, זה עובד.",
        textEn:
          "Not by how many messages the bot sent. Three things worth measuring in the first month: how long it takes from an incoming message to a first reply, how many conversations closed without you touching them at all, and how many were handed to you with the important details already collected. If the first number drops and the third rises, it is working.",
      },
      {
        type: "p",
        text: "אם אתם לא בטוחים אם אתם במקרה של בוט או במקרה של אוטומציה בודדת, [האבחון החינמי](/audit) הוא טופס קצר על העסק, הכלים והמשימות שחוזרות. תוך יום עסקים אני חוזרת עם שניים-שלושה כיוונים, כולל האפשרות שהתשובה היא שעדיין לא כדאי לכם.",
        textEn:
          "If you are not sure whether you are a bot case or a single-automation case, [the free audit](/audit) is a short form about your business, your tools and the tasks that repeat. Within one business day I come back with two or three directions, including the possibility that the answer is 'not yet'.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // 3 · "אוטומציה לעסק קטן" — מאמר תומך. הוא מפנה ל-/automations
  //     ולא נלחם בו על אותו ביטוי, לפי הכלל במפת המילים.
  // ────────────────────────────────────────────────────────────────
  {
    slug: "automatsia-le-esek-katan-meifo-matchilim",
    date: "2026-08-18",
    readingMinutes: 5,
    keyword: "אוטומציה לעסק קטן, מאיפה מתחילים",
    keywordVerified: false,
    title: "אוטומציה לעסק קטן: מאיפה מתחילים",
    titleEn: "Automation for a small business: where to start",
    description:
      "תרגיל של שבוע שמראה לכם איפה בורח הזמן, הכלל שבוחר את האוטומציה הראשונה, חמש אוטומציות ששוות כמעט לכל עסק, וכמה זה עולה.",
    descriptionEn:
      "A one-week exercise that shows where your time leaks, the rule that picks your first automation, five automations worth it for almost any business, and what it actually costs.",
    tag: "אוטומציה",
    tagEn: "Automation",
    body: [
      {
        type: "p",
        text: "עשר שנים ניהלתי עסק משלי. הדבר שגזל לי הכי הרבה זמן לא היה העבודה עצמה, אלא כל מה שמסביבה: להעתיק פרטים מטופס לגיליון, לענות שוב על אותה שאלה, לשלוח תזכורת לפני תור, לזכור לחזור למישהו שכתב בשבת. כל אחד מהדברים האלה לוקח שתי דקות, וזה בדיוק מה שהופך אותם לבלתי נראים.",
        textEn:
          "I ran my own business for ten years. The thing that ate the most time was not the work itself but everything around it: copying details from a form into a sheet, answering the same question again, sending a reminder before an appointment, remembering to get back to someone who wrote on Saturday. Each of those takes two minutes, and that is exactly what makes them invisible.",
      },
      {
        type: "p",
        text: "אוטומציה היא לא מונח טכני. היא פשוט חיבור בין הכלים שכבר יש לכם, כך שהם מדברים ביניהם בלעדיכם. השאלה היחידה שחשובה היא מה מחברים קודם, וזה מה שהמאמר הזה עונה עליו.",
        textEn:
          "Automation is not a technical term. It is simply connecting the tools you already have so they talk to each other without you. The only question that really matters is what to connect first, and that is what this article answers.",
      },

      {
        type: "h2",
        text: "השבוע שלכם על דף אחד",
        textEn: "Your week on one page",
      },
      {
        type: "p",
        text: "לפני שקונים משהו, עשו את זה. במשך שבוע, בכל פעם שאתם עושים משימה שכבר עשיתם השבוע, רשמו שורה: מה עשיתם, כמה דקות זה לקח. זהו. בסוף השבוע יהיה לכם דף שבו כל שורה חוזרת כמה פעמים.",
        textEn:
          "Before you buy anything, do this. For one week, every time you do a task you have already done that week, write a line: what you did and how many minutes it took. That is it. By the end of the week you will have a page where each line repeats a few times.",
      },
      {
        type: "p",
        text: "עכשיו הכפילו: מספר הפעמים בשבוע כפול הדקות. משימה של שלוש דקות שקורית שמונה פעמים בשבוע היא כמעט 21 שעות בשנה. משימה של עשרים דקות שקורית פעם בחודש היא ארבע שעות בשנה. התרגיל הזה כמעט תמיד מפתיע, כי הזמן לא בורח דרך הדברים הגדולים.",
        textEn:
          "Now multiply: times per week by minutes. A three-minute task that happens eight times a week is nearly 21 hours a year. A twenty-minute task that happens once a month is four hours a year. This exercise almost always surprises people, because time does not leak through the big things.",
      },

      {
        type: "p",
        text: "כדי שזה יהיה מוחשי, הנה איך זה נראה על עסק שירות טיפוסי. שמונה פניות בשבוע שאתם מקלידים ידנית לגיליון, שתי דקות כל אחת. חמש תזכורות לפני תור, דקה כל אחת. שתים עשרה פעמים בשבוע שאתם עונים על אותה שאלה על מחיר ושעות, שלוש דקות כל אחת. יחד זה כשעה ועשרים בשבוע, קרוב לשבעים שעות בשנה, ואף אחת מהן לא מרגישה כמו עבודה בזמן אמת.",
        textEn:
          "To make it concrete, here is how it looks for a typical service business. Eight enquiries a week you type into a sheet by hand, two minutes each. Five reminders before appointments, a minute each. Twelve times a week you answer the same question about price and hours, three minutes each. Together that is about an hour and twenty minutes a week, close to seventy hours a year, and not one of them feels like work in the moment.",
      },

      {
        type: "h2",
        text: "הכלל שבוחר את האוטומציה הראשונה",
        textEn: "The rule that picks your first automation",
      },
      {
        type: "p",
        text: "לא מתחילים מהמשימה הכי מעצבנת, אלא מזו שעונה על שלושה תנאים יחד: היא חוזרת לפחות כמה פעמים בשבוע, היא זהה בכל פעם, וכשהיא נשכחת יש לזה מחיר אמיתי, לקוח שלא חזר, תור שהתפספס, פנייה שנעלמה. משימה שחוזרת אבל לא מזיקה כשהיא נשכחת יכולה לחכות.",
        textEn:
          "You do not start with the most annoying task, but with the one that meets three conditions at once: it repeats at least a few times a week, it is identical every time, and when it gets forgotten there is a real cost, a client who did not come back, a missed appointment, an enquiry that vanished. A task that repeats but does no damage when forgotten can wait.",
      },
      {
        type: "note",
        text: "התנאי השני הוא החשוב. אם המשימה שונה בכל פעם, היא לא בשלה לאוטומציה, היא בשלה להחלטה שלכם איך היא אמורה להיראות.",
        textEn:
          "The second condition is the important one. If the task is different every time, it is not ready for automation, it is ready for you to decide what it should look like.",
      },

      {
        type: "h2",
        text: "חמש אוטומציות ששוות כמעט לכל עסק",
        textEn: "Five automations worth it for almost any business",
      },
      {
        type: "ul",
        items: [
          "פנייה שנכנסת ישר למקום אחד. כל טופס, הודעה או שיחה נרשמים אוטומטית בגיליון או ב-CRM עם השם, הטלפון ומה ביקשו. זו בדרך כלל האוטומציה הראשונה, כי היא מבטלת הקלדה ידנית וגם מונעת פניות שנעלמות.",
          "תשובה ראשונה אוטומטית. תוך שניות מהפנייה יוצאת הודעה שמאשרת שקיבלתם, אומרת מתי תחזרו, ומצרפת את המידע הבסיסי. זה לא מחליף אתכם, זה קונה לכם שעתיים בלי שהמתעניין הולך למישהו אחר.",
          "תזכורת לפני תור. הודעה יום לפני, אוטומטית. ההשפעה על ביטולים ברגע האחרון היא הסיבה שזו אחת האוטומציות הראשונות שאני בונה לעסקים עם יומן.",
          "מעקב אחרי השירות. מייל או הודעה כמה ימים אחרי, עם תודה ובקשה לחוות דעת. זה הדבר שכולם מתכוונים לעשות ואף אחד לא עושה בעקביות, ובדיוק בגלל זה שווה שהוא יקרה לבד.",
          "התראה פנימית ודוח חודשי. הודעה אליכם על כל פנייה חמה, וסיכום חודשי אוטומטי של כמה פניות נכנסו ומאיפה. בלי זה אתם מנחשים מה עובד.",
        ],
        itemsEn: [
          "Every enquiry lands in one place. Every form, message or call is logged automatically in a sheet or a CRM with the name, phone and what they asked for. This is usually the first automation, because it removes manual typing and stops enquiries from disappearing.",
          "An automatic first reply. Within seconds a message goes out confirming you received it, saying when you will get back, and attaching the basics. It does not replace you, it buys you two hours without the prospect going elsewhere.",
          "A reminder before an appointment. A message the day before, automatically. Its effect on last-minute cancellations is why it is one of the first automations I build for any business with a calendar.",
          "Post-service follow-up. An email or message a few days later, with a thank you and a request for a review. This is the thing everyone intends to do and nobody does consistently, which is exactly why it is worth having it happen on its own.",
          "An internal alert and a monthly report. A message to you on every warm enquiry, and an automatic monthly summary of how many enquiries came in and from where. Without it you are guessing what works.",
        ],
      },

      {
        type: "h2",
        text: "כמה זה עולה",
        textEn: "What it costs",
      },
      {
        type: "p",
        text: "אוטומציה בודדת, כלומר תהליך אחד מקצה לקצה שמתחבר לכלים שכבר יש לכם וכולל ניטור שמתריע אם משהו נופל, עולה 1,400 ₪. זו נקודת ההתחלה הנכונה לרוב העסקים. מעליה יש בוט וואטסאפ ב-2,400 ₪, סוכן AI ב-4,900 ₪ ומערכת מלאה ב-7,900 ₪, וזה מסלול אחד ולא ארבע אפשרויות: ככל שהפניות אצלכם מגוונות יותר, כך עולים דרגה.",
        textEn:
          "A single automation, meaning one end-to-end process that connects to the tools you already use and includes monitoring that alerts when something breaks, costs ₪1,400. That is the right starting point for most businesses. Above it sits a WhatsApp bot at ₪2,400, an AI agent at ₪4,900 and a full system at ₪7,900, and it is one path rather than four options: the more varied your enquiries, the higher you go.",
      },
      {
        type: "p",
        text: "לכלים עצמם יש עלות שוטפת של 0 עד 150 ₪ בחודש לפי שימוש, והם נרשמים על שמכם ובכרטיס שלכם. ליווי חודשי שכולל ניטור ותיקון תקלות מתחיל ב-350 ₪ לחודש לאתר ואוטומציות, והוא לא חובה. הכל מפורט [בעמוד המחירים](/pricing) ו[בעמוד האוטומציות](/automations).",
        textEn:
          "The tools themselves carry a running cost of ₪0 to ₪150 a month based on usage, and they are registered in your name and on your card. Monthly support including monitoring and fixes starts at ₪350 a month for a site plus automations, and it is optional. Everything is detailed [on the pricing page](/pricing) and [on the automations page](/automations).",
      },

      {
        type: "h2",
        text: "מה לעשות לפני שמשלמים למישהו",
        textEn: "What to do before you pay anyone",
      },
      {
        type: "p",
        text: "קחו את המשימה שבחרתם וכתבו אותה כרשימת שלבים, כאילו אתם מסבירים לעובד חדש. מתי זה מתחיל, מה קורה בכל שלב, מה קורה במקרה חריג, מתי זה נגמר. שני דברים קורים כאן. הראשון: לפעמים מגלים שהתהליך עצמו שבור, ואז אוטומציה רק תריץ אותו מהר יותר. השני: אם בסוף תזמינו אוטומציה, המסמך הזה חוסך את החלק הכי ארוך בעבודה.",
        textEn:
          "Take the task you picked and write it as a list of steps, as if you were explaining it to a new employee. When it starts, what happens at each step, what happens in an edge case, when it ends. Two things happen here. First: sometimes you discover the process itself is broken, in which case automation will only run it faster. Second: if you do end up ordering an automation, that document saves the longest part of the work.",
      },

      {
        type: "p",
        text: "ושווה לדעת: כמעט תמיד אין צורך להחליף שום כלי. אוטומציה מתחברת לטופס, לוואטסאפ, למייל, ליומן ולגיליון שכבר יש לכם. מי שמציע לכם לעבור לפלטפורמה חדשה כדי לאטמט משהו אחד, מוכר לכם מנוי ולא פתרון.",
        textEn:
          "And worth knowing: you almost never need to replace a single tool. An automation connects to the form, the WhatsApp, the email, the calendar and the sheet you already have. Anyone who suggests moving to a new platform in order to automate one thing is selling you a subscription, not a solution.",
      },

      {
        type: "h2",
        text: "ארבע שאלות לשאול לפני שמזמינים",
        textEn: "Four questions to ask before you order",
      },
      {
        type: "ul",
        items: [
          "מה קורה כשהתהליך נופל, ואיך אני יודע על זה?",
          "על שם מי נרשמים הכלים, ומה העלות החודשית שלהם בשקלים?",
          "אם אני רוצה לשנות משהו בעוד חצי שנה, אני תלוי בך או שאני יכול?",
          "כמה זמן זה חוסך לי בשבוע, לפי מה החישוב?",
        ],
        itemsEn: [
          "What happens when the process fails, and how do I find out?",
          "In whose name are the tools registered, and what do they cost me monthly in actual numbers?",
          "If I want to change something in six months, am I dependent on you or can I do it?",
          "How many hours a week does this save me, and what is that number based on?",
        ],
      },

      {
        type: "h2",
        text: "שלוש טעויות שחוזרות",
        textEn: "Three mistakes that keep repeating",
      },
      {
        type: "ul",
        items: [
          "לאטמט תהליך שבור. אם המעקב אחרי לקוחות לא עובד כי אין החלטה מתי פונים ומה אומרים, אוטומציה תשלח את ההודעה הלא נכונה בזמן, במקום מאוחר.",
          "להתחיל מהדבר המרשים. סוכן שמנהל שיחה שלמה נשמע טוב יותר מהודעה שנרשמת בגיליון, אבל השנייה חוסכת יותר שעות ועולה פחות.",
          "לבנות בלי ניטור. אוטומציה שנופלת בשקט גרועה מאוטומציה שלא קיימת, כי הפסקתם לבדוק ידנית. כל תהליך צריך התראה שאומרת לכם שמשהו לא רץ.",
        ],
        itemsEn: [
          "Automating a broken process. If your client follow-up does not work because there is no decision on when you reach out and what you say, automation will send the wrong message on time instead of late.",
          "Starting with the impressive thing. An agent that runs a full conversation sounds better than a message logged into a sheet, but the second one saves more hours and costs less.",
          "Building without monitoring. An automation that fails silently is worse than none, because you stopped checking manually. Every process needs an alert that tells you it is not running.",
        ],
      },

      {
        type: "h2",
        text: "הצעד הראשון",
        textEn: "The first step",
      },
      {
        type: "p",
        text: "עשו את תרגיל השבוע. הוא לא עולה כלום ותשמעו ממנו יותר מכל מאמר. אם בסוף השבוע יש לכם משימה אחת שעונה על שלושת התנאים ואתם רוצים לדעת אם שווה לאטמט אותה, [האבחון החינמי](/audit) הוא טופס קצר על העסק, הכלים והמשימות שחוזרות. תוך יום עסקים אני חוזרת עם שניים-שלושה כיוונים והערכה של הזמן שנחסך. לפעמים הכיוון הוא לא לקנות כלום עדיין, וגם את זה אני אומרת.",
        textEn:
          "Do the one-week exercise. It costs nothing and you will get more out of it than out of any article. If by the end of the week you have one task that meets all three conditions and you want to know whether automating it is worth it, [the free audit](/audit) is a short form about your business, your tools and the tasks that repeat. Within one business day I come back with two or three directions and an estimate of the time saved. Sometimes the direction is to buy nothing yet, and I say that too.",
      },
    ],
  },
];

// חדש למעלה. אותה קונבנציה כמו sortedGuides.
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
