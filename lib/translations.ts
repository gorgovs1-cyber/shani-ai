// ─── SHANI AI · המילון הדו-לשוני היחיד של האתר ───
// זהו מקור האמת היחיד לכל טקסט באתר. עד 17/08/2026 היו כאן שלוש מערכות
// שפה מקבילות (lib/i18n.ts, lib/lang-context.tsx וכאן), והן אוחדו לקובץ הזה.
// אל תיצרו מילון נוסף — הוסיפו מפתח כאן, בשתי השפות.

export type Lang = "he" | "en";

export const dirOf = (l: Lang): "rtl" | "ltr" => (l === "he" ? "rtl" : "ltr");

export const dict = {
  he: {
    dir: 'rtl' as const,
    navWork:'פרויקטים', navGuides:'מדריכים', navCta:'בואו נדבר',
    navPricing:'מחירים', navWebsites:'אתרים', navAutomations:'אוטומציות', navConsulting:'ייעוץ AI', navServices:'שירותים',
    // תוויות נגישות לניווט — נקראות ע"י קוראי מסך, ולכן חייבות להיות בשפת הממשק
    navAriaMain:'ניווט ראשי', navAriaHome:'שני גורגוב, לדף הבית', navAriaMobileMenu:'תפריט ניווט',
    navAriaMenuOpen:'פתיחת תפריט', navAriaMenuClose:'סגירת תפריט',
    navAriaSwitchEn:'מעבר לאנגלית', navAriaSwitchHe:'מעבר לעברית',
    footerSeo:'בונה אתרים, אוטומציות וכלי AI לעסקים בתל אביב, רמת גן, הרצליה, ירושלים, חיפה, באר שבע והשרון, ואונליין בכל הארץ.',
    role:'SHANI AI CREATOR',
    // ה-H1 הקודם, "יוצרת פתרונות טכנולוגיים לעסקים", תיאר קטגוריה ולא תוצאה,
    // ולא הכיל אף מילת מפתח שמישהו מחפש. החדש אומר מה הלקוח מקבל.
    heroTitle:'אתר שמביא פניות, ומערכת שלא נותנת לאף אחת ליפול',
    heroSub:'אני בונה אתרים ומערכות לעסקים קטנים בישראל, קודם בודקים מה הכי דחוף ורק אחר כך בונים. האבחון הראשון בחינם, והמחירים פה באתר.',
    // טריאז': שלוש דלתות כניסה, כדי שמבקר חדש לא יצטרך לנחש מאיפה מתחילים.
    triageTitle:'מה מביא אתכם לכאן?',
    triage:[
      {label:'רוצים אתר שמביא פניות', href:'/websites'},
      {label:'רוצים לחסוך זמן על משימות חוזרות', href:'/automations'},
      {label:'עדיין לא יודעים מאיפה מתחילים', href:'/audit'}
    ],
    // "פיתוח מבוסס AI" היה מפרט פנימי, לא משהו שהלקוח מחפש. "קוד ולא תבנית" אומר לו משהו.
    meta1:'ישראל', meta2:'עונה תוך 24 שעות', meta3:'קוד, לא תבנית',
    workKicker:'04 · עבודות', workTitle:'פרויקטים נבחרים', workSub:'עבודות ללקוחות, מוצרים שבניתי, והדגמות שמראות מה אפשר לבנות.',
    galleryKicker:'מבט מקרוב', galleryTitle:'', scrollHint:'המשיכו לגלול', scrollArrow:'',
    buildKicker:'01 · מה אני בונה', buildTitle:'שלושה דברים, כל אחד פותר בעיה אחרת', buildSub:'מתחת לכל כרטיס כתוב למי הוא מתאים, ואם עדיין מתלבטים זו בדיוק השאלה שהאבחון עונה עליה.', servicesCta:'שלחו לי הודעה',
    aboutKicker:'05 · מי אני', aboutTitle:'עליי', stat1:'שנות ניסיון עסקי', stat2:'זמן תגובה',
    processKicker:'02 · איך זה עובד', processTitle:'מהפנייה ועד שזה רץ', processSub:'הצעד הראשון לא עולה כלום, ובכל שלב אתם יודעים בדיוק איפה הדברים עומדים.',
    contactTitle:'אז מה בונים?',
    contactSub:'אתר, אוטומציה, או שעדיין לא ברור מה בדיוק, כתבו לי ונראה יחד מאיפה מתחילים.',
    contactCta1:'אבחון חינם לעסק שלכם', contactCta2:'דברו איתי בוואטסאפ',
    // "נבנה באהבה בישראל" הוא תרגום ישיר של made with love, לא ניסוח עברי.
    footer:'נבנה בישראל',
    // "עברית טבעית" ו"מבוססת בישראל" היו מפרט פנימי ותרגום של based in Israel.
    marqueeItems:['אתרים','אוטומציות','ייעוץ ותכנון','קוד ולא תבנית','ישראל','מענה תוך 24 שעות'],
    aboutParas:[
      '10 שנים ניהלתי עסק משלי, ואני יודעת בדיוק איפה נשרף הזמן, מה באמת מזיז קדימה ומה רק מרגיש דחוף.',
      'היום אני בונה את הצד השני: אתרים, אוטומציות וכלים שלוקחים על עצמם את העבודה השחורה, מהמיפוי ועד שזה רץ לבד.',
      'הכל נבנה מהר, במחיר שעסק קטן יכול לעמוד בו, ובלי הבטחות שאי אפשר למדוד.'
    ],
    // סדר הכרטיסים הוא לפי מה שכבר נמכר ויש לו הוכחות, ולא לפי סדר התהליך.
    // סדר התהליך מופיע בנפרד ב-journeySteps.
    services:[
      {no:'01', title:'אתרים שמקדמים את העסק', subtitle:'אתר שמביא פניות, לא רק נראה טוב', desc:'אתר מהיר שמותאם למובייל, מחובר לוואטסאפ ובנוי נכון לגוגל, ובסוף הקוד עובר אליכם בלי דמי מנוי ובלי להישאר תקועים איתי.', fit:'אין לכם אתר, או שיש אחד שלא מביא כלום', anchor:'אתר עסקי מ-2,400 ₪'},
      {no:'02', title:'מערכות שחוסכות לכם זמן', subtitle:'הפניות מסתדרות לבד', desc:'כל פנייה נכנסת למקום אחד, מקבלת מענה ראשוני ומסודרת לפי מה שהיא, ואתם רואים בכל רגע מי עדיין מחכה לתשובה.', fit:'אתם עונים על אותן שאלות שוב ושוב, או מפספסים פניות בערב', anchor:'מתחבר לכלים שכבר יש בעסק'},
      {no:'03', title:'ייעוץ ותכנון לעסק', subtitle:'תוכנית עבודה ברורה, לא רשימת רעיונות', desc:'אני נכנסת לעסק ומפרקת את השבוע שלכם למשימות, כדי לראות מה גוזל הכי הרבה זמן, ובסוף יש בידיים סדר עדיפויות עם הערכת חיסכון לכל סעיף.', fit:'אתם רוצים להכניס טכנולוגיה לעסק, אבל לא יודעים מה שווה את הכסף ומה סתם צעצוע', anchor:'אבחון ראשוני ללא עלות'}
    ],
    // הפרויקטים עברו ל-lib/projects.ts, שהוא מקור האמת היחיד לתיק העבודות.
    faqKicker:'06 · שאלות נפוצות', faqTitle:'כל מה שרציתם לדעת',
    faqItems:[
      {q:'מה אם לא אהיה מרוצה מהתוצאה?', a:'העבודה מלווה אתכם לאורך כל הדרך: מגדירים ביחד את הכיוון, ואני מציגה גרסאות לאישור בכל שלב, כך שאין הפתעות בסוף. כל פרויקט כולל שני סבבי שינויים, ואם צריך עוד, סבב נוסף עולה 350 ₪ ומתומחר מראש. המטרה שלי היא שתצאו עם נכס שאתם גאים בו, לא רק "לסמן וי".'},
      {q:'למה אתר אצלך יותר יקר מוויקס או אלמנטור?', a:'כי זה לא אותו מוצר. תבנית וויקס נראית כמו עוד תבנית, נטענת לאט ומוגבלת בקידום. אני כותבת קוד מאפס, אז האתר נטען מהר, בנוי נכון לגוגל, והבעלות עליו שלכם בלי דמי מנוי כפויים. ומעבר לזה, אני מחברת אוטומציות ו-AI שאף תבנית לא נותנת, כך שהאתר לא רק מציג את העסק אלא גם עובד בשבילו.'},
      {q:'לא בטוחים מאיפה להתחיל?', a:'מתחילים עם אבחון AI חינם, שיחה ממוקדת שבסיומה תקבלו תוכנית עבודה ברורה: מה להטמיע, באיזה סדר, ואילו כלים ואוטומציות יחסכו לכם הכי הרבה זמן, בלי התחייבות.'},
      {q:'יש התחייבות לטווח ארוך?', a:'פרויקט חד פעמי נגמר בלי שום התחייבות המשך: אני מסיימת והקוד עובר אליכם. גם ב-Shani Care אין התחייבות, אפשר לעצור בכל חודש והאתר ממשיך לרוץ. ואם נוח לכם יותר, פשוט פונים כשיש צורך במשהו ספציפי ומקבלים הצעת מחיר לעבודה הזו.'},
    ],
    steps:[
      {n:'01', title:'אבחון חינם', desc:'טופס קצר על העסק והמשימות שחוזרות, בלי עלות ובלי התחייבות.'},
      {n:'02', title:'תשובה תוך יום עסקים', desc:'אני חוזרת אליכם עם שתיים שלוש הצעות קונקרטיות למה שווה לבנות אצלכם, ושיחת היכרות קצרה.'},
      {n:'03', title:'הצעה עם מחיר סופי', desc:'מה בדיוק נבנה, כמה זה עולה ולוח זמנים, לפי המחירון הפומבי, בלי הפתעות.'},
      {n:'04', title:'בנייה עם אישור שלכם', desc:'אני בונה, אתם רואים גרסאות ומאשרים, שני סבבי שינויים כלולים.'},
      {n:'05', title:'עולים לאוויר עם חודשיים ליווי', desc:'תיקונים, עדכונים ומעקב אחרי הפניות שנכנסות כלולים בחודשיים הראשונים, ואחריהם אתם מחליטים אם להמשיך.'}
    ],
    processPriceLine:'כל המחירים מפורסמים מראש: דף נחיתה מ-1,500 ₪, אתר עסקי מ-2,400 ₪, מערכות ואוטומציות מ-1,400 ₪.',
    processPriceCta:'למחירון המלא',
    // טופס הפרומפטים הוסר — לא הייתה רשימת תפוצה לשלוח אליה.
    // ההמלצות הפיקטיביות שהיו כאן נמחקו — הן לא רונדרו בשום מקום.
    //   מה שמוצג בפועל הוא components/TestimonialsSection.tsx עם לקוחות אמיתיים.
    roi: {
      label: 'כמה זמן אתם מבזבזים?',
      // היה כאן ערבוב רבים ויחיד באותה שורה ("חשבו... שלך"), עכשיו הכל ברבים.
      title: 'חשבו כמה שווה הזמן שלכם',
      hoursLabel: 'שעות עבודה ידנית בשבוע',
      hoursUnit: 'שעות',
      rateLabel: 'שווי שעת העבודה שלכם (₪)',
      resultPre: 'אוטומציה יכולה לחסוך לכם',
      perMonth: 'בחודש',
      perYearTpl: '({v} ₪ בשנה)',
      cta: 'בואו נחסוך את הזמן הזה',
      disclaimer: 'החישוב מראה כמה שווה הזמן שאתם משקיעים היום בעבודה הידנית. אוטומציה לא מבטלת את כולו, אבל את רוב החלק החוזר על עצמו כן.'
    },
    a11yWidget: {
      open: 'פתח תפריט נגישות',
      panel: 'תפריט נגישות',
      heading: 'הגדרות נגישות',
      reset: 'איפוס',
      resetAria: 'אפס את כל הגדרות הנגישות',
      fontSize: 'גודל טקסט',
      sizes: ['רגיל', 'גדול', 'גדול מאוד'],
      statement: 'הצהרת נגישות',
      toggles: {
        highContrast: 'ניגודיות גבוהה',
        grayscale: 'גווני אפור',
        underlineLinks: 'הדגשת קישורים',
        stopAnimations: 'עצור אנימציות',
        largeCursor: 'סמן גדול',
        letterSpacing: 'מרווח אותיות',
        readingGuide: 'מדריך קריאה'
      }
    }
  },
  en: {
    dir: 'ltr' as const,
    navWork:'Work', navGuides:'Guides', navCta:"Let's talk",
    navPricing:'Pricing', navWebsites:'Websites', navAutomations:'Automations', navConsulting:'AI Consulting', navServices:'Services',
    // Accessible names for the nav — announced by screen readers, so they follow the UI language
    navAriaMain:'Main navigation', navAriaHome:'Shani Gorgov — home', navAriaMobileMenu:'Navigation menu',
    navAriaMenuOpen:'Open menu', navAriaMenuClose:'Close menu',
    navAriaSwitchEn:'Switch to English', navAriaSwitchHe:'Switch to Hebrew',
    footerSeo:'Building websites, automations and AI tools for businesses in Tel Aviv, Ramat Gan, Herzliya, Jerusalem, Haifa, Beer Sheva and the Sharon, and online across Israel.',
    role:'SHANI AI CREATOR',
    heroTitle:'A website that brings enquiries, and a system that lets none of them fall',
    heroSub:'I build websites and systems for small businesses in Israel. First we work out what is most urgent, and only then do we build. The first audit is free, and the prices are right here on the site.',
    triageTitle:'What brings you here?',
    triage:[
      {label:'I want a site that brings enquiries', href:'/websites'},
      {label:'I want to save time on repetitive work', href:'/automations'},
      {label:"I don't know where to start yet", href:'/audit'}
    ],
    meta1:'Israel', meta2:'Replies within 24h', meta3:'Code, not a template',
    workKicker:'04 · Work', workTitle:'Featured Projects', workSub:'Client work, products I have built, and demos that show what is possible.',
    galleryKicker:'Up close', galleryTitle:'', scrollHint:'Keep scrolling', scrollArrow:'',
    buildKicker:'01 · What I build', buildTitle:'Three things, each solving a different problem', buildSub:'Under every card it says who it is for, and if you are still unsure, that is exactly the question the free audit answers.', servicesCta:'Send me a message',
    aboutKicker:'05 · Who I am', aboutTitle:'About', stat1:'years in business', stat2:'response time',
    processKicker:'02 · How it works', processTitle:'From idea to product', processSub:'A clear five-step process, and you stay involved the whole way.',
    contactTitle:'So what are we building?',
    contactSub:'A website, an automation, or still not sure exactly what? Write to me and we will work out where to start.',
    // These were reversed against the Hebrew, which meant the free-audit CTA —
    // the site's main lead funnel — vanished entirely in English.
    contactCta1:'A free audit for your business', contactCta2:'Message me on WhatsApp',
    footer:'Built in Israel',
    marqueeItems:['Websites','Automations','AI consulting','Code, not a template','Israel','Replies within 24h'],
    aboutParas:[
      'I ran my own business for 10 years, so I know exactly where the time burns, what actually moves things forward and what only feels urgent.',
      'Today I build the other side of that: websites, automations and tools that take the grunt work on themselves, from the first mapping session to the point where it runs on its own.',
      'All of it is built fast, at a price a small business can carry, and without promises that cannot be measured.'
    ],
    services:[
      {no:'01', title:'Websites that grow the business', subtitle:'A site that brings enquiries, not just good looks', desc:'A fast, mobile-ready site wired to WhatsApp and built properly for Google, and at the end the code moves over to you, with no subscription and no being stuck with me.', fit:'You have no website, or one that brings nothing in', anchor:'Business site from ₪2,400'},
      {no:'02', title:'Systems that save you time', subtitle:'Enquiries sort themselves out', desc:'Every enquiry lands in one place, gets a first response and is sorted by what it actually is, and you can see at any moment who is still waiting for an answer.', fit:'You answer the same questions again and again, or miss enquiries in the evening', anchor:'Connects to the tools you already use'},
      {no:'03', title:'Consulting & planning', subtitle:'A clear action plan, not a list of ideas', desc:'I get inside the business and break your week down into tasks, to see what eats the most time, and at the end you are holding a priority list with an estimated saving for each item.', fit:'You want technology in the business but cannot tell what is worth the money and what is a toy', anchor:'First audit is free'}
    ],
    // Projects live in lib/projects.ts — the single source of truth for the portfolio.
    faqKicker:'06 · FAQ', faqTitle:'Everything you need to know',
    faqItems:[
      {q:"What if I'm not happy with the result?", a:'The work involves you the whole way: we define the direction together and I present versions for approval at every stage, so there are no surprises at the end. Every project includes two revision rounds, and an extra round is ₪350, priced upfront. My goal is for you to walk away with an asset you\'re proud of, not just a box ticked.'},
      {q:'Why is a site with you pricier than Wix or Elementor?', a:"Because it isn't the same product. A Wix template looks like another template, loads slowly and is limited on search. I write the code from scratch, so the site loads fast, is built properly for Google, and belongs to you with no forced subscription. Beyond that, I wire in automations and AI no template can give you, so the site doesn't just present the business, it works for it."},
      {q:'Is there a long-term commitment?', a:'A one-off project has no ongoing commitment: we finish and the code is yours. Shani Care has no commitment either: you can stop any month and the site keeps working. If you prefer, you just reach out when you need something and get a quote for that job.'},
      {q:'Not sure where to start?', a:'Start with a free AI Audit, a focused session that ends with a clear action plan: what to implement, in what order, and which tools and automations will save you the most time. No commitment.'}
    ],
    steps:[
      {n:'01', title:'Free audit', desc:'A short form about the business and the recurring tasks, at no cost and no commitment.'},
      {n:'02', title:'An answer within one working day', desc:'I come back with two or three concrete suggestions for what is worth building, and a short intro call.'},
      {n:'03', title:'A proposal with a final price', desc:'Exactly what gets built, what it costs and the timeline, based on the public price list, with no surprises.'},
      {n:'04', title:'Building with your approval', desc:'I build, you review versions and approve, with two revision rounds included.'},
      {n:'05', title:'Live, with two months of Shani Care', desc:'Fixes, updates and tracking of incoming enquiries are included for the first two months; then you decide whether to continue.'}
    ],
    processPriceLine:'All prices are published up front: landing page from ₪1,500, business website from ₪2,400, systems and automations from ₪1,400.',
    processPriceCta:'See the full price list',
    // טופס הפרומפטים הוסר — לא הייתה רשימת תפוצה לשלוח אליה.
    // ההמלצות הפיקטיביות שהיו כאן נמחקו — הן לא רונדרו בשום מקום.
    //   מה שמוצג בפועל הוא components/TestimonialsSection.tsx עם לקוחות אמיתיים.
    roi: {
      label: 'How much time are you losing?',
      title: 'See what your time is worth',
      hoursLabel: 'Manual work hours per week',
      hoursUnit: 'hrs',
      rateLabel: 'What an hour of your time is worth (₪)',
      resultPre: 'Automation could save you',
      perMonth: 'per month',
      perYearTpl: '(₪{v} per year)',
      cta: "Let's save that time",
      disclaimer: "This shows what the time you currently spend on manual work is worth. Automation won't remove all of it, but it will remove most of the repetitive part."
    },
    a11yWidget: {
      open: 'Open accessibility menu',
      panel: 'Accessibility menu',
      heading: 'Accessibility settings',
      reset: 'Reset',
      resetAria: 'Reset all accessibility settings',
      fontSize: 'Text size',
      sizes: ['Normal', 'Large', 'Extra large'],
      statement: 'Accessibility statement',
      toggles: {
        highContrast: 'High contrast',
        grayscale: 'Grayscale',
        underlineLinks: 'Underline links',
        stopAnimations: 'Stop animations',
        largeCursor: 'Large cursor',
        letterSpacing: 'Letter spacing',
        readingGuide: 'Reading guide'
      }
    }
  }
};

export type Dict = (typeof dict)["he"];
