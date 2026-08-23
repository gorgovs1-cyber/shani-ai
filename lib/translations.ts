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
    navPricing:'מחירים', navWebsites:'אתרים', navAutomations:'אוטומציות', navConsulting:'ייעוץ AI',
    // תוויות נגישות לניווט — נקראות ע"י קוראי מסך, ולכן חייבות להיות בשפת הממשק
    navAriaMain:'ניווט ראשי', navAriaHome:'שני גורגוב, לדף הבית', navAriaMobileMenu:'תפריט ניווט',
    navAriaMenuOpen:'פתיחת תפריט', navAriaMenuClose:'סגירת תפריט',
    navAriaSwitchEn:'מעבר לאנגלית', navAriaSwitchHe:'מעבר לעברית',
    footerSeo:'בונה אתרים, אוטומציות וכלי AI לעסקים בתל אביב, רמת גן, הרצליה, ירושלים, חיפה, באר שבע והשרון, ואונליין בכל הארץ.',
    // ה-H1 הקודם, "יוצרת פתרונות טכנולוגיים לעסקים", תיאר קטגוריה ולא תוצאה,
    // ולא הכיל אף מילת מפתח שמישהו מחפש. החדש אומר מה הלקוח מקבל.
    heroTitle:'יוצרת פתרונות טכנולוגיים לעסקים שרוצים לגדול',
    heroSub:'אני בונה אתרים ומערכות לעסקים קטנים בישראל, קודם בודקים מה הכי דחוף ורק אחר כך בונים. האבחון הראשון בחינם, והמחירים פה באתר.',
    // טריאז': שלוש דלתות כניסה, כדי שמבקר חדש לא יצטרך לנחש מאיפה מתחילים.
    // "פיתוח מבוסס AI" היה מפרט פנימי, לא משהו שהלקוח מחפש. "קוד ולא תבנית" אומר לו משהו.
    meta1:'ישראל', meta2:'עונה תוך 24 שעות', meta3:'קוד, לא תבנית',
    workKicker:'03 · עבודות', workTitle:'פרויקטים נבחרים', workSub:'עבודות ללקוחות, מוצרים שבניתי, והדגמות שמראות מה אפשר לבנות.',
    galleryKicker:'מבט מקרוב', scrollArrow:'',
    buildKicker:'01 · מה אני בונה', buildTitle:'שלושה דברים, כל אחד פותר בעיה אחרת', buildSub:'אפשר להתחיל באחד ולהוסיף בהמשך.', servicesCta:'לפרטים המלאים',
    aboutKicker:'04 · מי אני', aboutTitle:'עליי', stat1:'שנות ניסיון עסקי', stat2:'זמן תגובה',
    contactTitle:'אז מה בונים?',
    contactSub:'אתר, אוטומציה, או שעדיין לא ברור מה בדיוק, כתבו לי ונראה יחד מאיפה מתחילים.',
    contactCta1:'אבחון חינם לעסק שלכם', contactCta2:'דברו איתי בוואטסאפ',
    // "נבנה באהבה בישראל" הוא תרגום ישיר של made with love, לא ניסוח עברי.
    footer:'נבנה בישראל',
    // "עברית טבעית" ו"מבוססת בישראל" היו מפרט פנימי ותרגום של based in Israel.
    marqueeItems:['אתרים','אוטומציות','ייעוץ ותכנון','קוד ולא תבנית','ישראל','מענה תוך 24 שעות'],
    aboutParas:[
      '10 שנים ניהלתי עסק משלי, ואני יודעת איפה נשרף הזמן ומה רק מרגיש דחוף.',
      'היום אני בונה את הצד השני: אתרים ומערכות שלוקחים על עצמם את העבודה השחורה.'
    ],
    // סדר הכרטיסים הוא לפי מה שכבר נמכר ויש לו הוכחות, ולא לפי סדר התהליך.
    services:[
      {no:'01', title:'אתרים שמביאים פניות', desc:'אתר מהיר, מחובר לוואטסאפ ובנוי נכון לגוגל. הקוד עובר אליכם, בלי דמי מנוי.', fit:'אין לכם אתר, או שיש אחד שלא מביא כלום', anchor:'מ-1,500 ₪'},
      {no:'02', title:'מערכות שחוסכות זמן', desc:'כל פנייה נכנסת למקום אחד ומקבלת מענה, גם בשתיים בלילה.', fit:'אתם עונים על אותן שאלות שוב ושוב, או מפספסים פניות בערב', anchor:'מ-1,400 ₪'},
      {no:'03', title:'ייעוץ ותכנון', desc:'אני מפרקת את השבוע שלכם ומראה מה גוזל הכי הרבה זמן.', fit:'רוצים להכניס טכנולוגיה, ולא בטוחים מה שווה את הכסף', anchor:'האבחון בחינם'}
    ],
    // הפרויקטים עברו ל-lib/projects.ts, שהוא מקור האמת היחיד לתיק העבודות.
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
    navPricing:'Pricing', navWebsites:'Websites', navAutomations:'Automations', navConsulting:'AI Consulting',
    // Accessible names for the nav — announced by screen readers, so they follow the UI language
    navAriaMain:'Main navigation', navAriaHome:'Shani Gorgov — home', navAriaMobileMenu:'Navigation menu',
    navAriaMenuOpen:'Open menu', navAriaMenuClose:'Close menu',
    navAriaSwitchEn:'Switch to English', navAriaSwitchHe:'Switch to Hebrew',
    footerSeo:'Building websites, automations and AI tools for businesses in Tel Aviv, Ramat Gan, Herzliya, Jerusalem, Haifa, Beer Sheva and the Sharon, and online across Israel.',
    heroTitle:'Technology solutions for businesses ready to grow',
    heroSub:'I build websites and systems for small businesses in Israel. First we work out what is most urgent, and only then do we build. The first audit is free, and the prices are right here on the site.',
    meta1:'Israel', meta2:'Replies within 24h', meta3:'Code, not a template',
    workKicker:'03 · Work', workTitle:'Featured Projects', workSub:'Client work, products I have built, and demos that show what is possible.',
    galleryKicker:'Up close', scrollArrow:'',
    buildKicker:'01 · What I build', buildTitle:'Three things, each solving a different problem', buildSub:'You can start with one and add the others later.', servicesCta:'Full details',
    aboutKicker:'04 · Who I am', aboutTitle:'About', stat1:'years in business', stat2:'response time',
    contactTitle:'So what are we building?',
    contactSub:'A website, an automation, or still not sure exactly what? Write to me and we will work out where to start.',
    // These were reversed against the Hebrew, which meant the free-audit CTA —
    // the site's main lead funnel — vanished entirely in English.
    contactCta1:'A free audit for your business', contactCta2:'Message me on WhatsApp',
    footer:'Built in Israel',
    marqueeItems:['Websites','Automations','AI consulting','Code, not a template','Israel','Replies within 24h'],
    aboutParas:[
      'I ran my own business for 10 years, so I know where time burns and what only feels urgent.',
      'Now I build the other side: websites and systems that take the grunt work off your hands.'
    ],
    services:[
      {no:'01', title:'Websites that bring enquiries', desc:'Fast, wired to WhatsApp, built properly for Google. The code becomes yours, with no subscription.', fit:'You have no website, or one that brings nothing in', anchor:'From ₪1,500'},
      {no:'02', title:'Systems that save time', desc:'Every enquiry lands in one place and gets an answer, even at 2am.', fit:'You answer the same questions again and again, or miss enquiries in the evening', anchor:'From ₪1,400'},
      {no:'03', title:'Consulting & planning', desc:'I break your week down and show you what eats the most time.', fit:'You want technology in the business but cannot tell what is worth the money', anchor:'First audit free'}
    ],
    // Projects live in lib/projects.ts, the single source of truth for the portfolio.
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
