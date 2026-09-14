// ─── SHANI AI · המילון הדו-לשוני היחיד של האתר ───
// זהו מקור האמת היחיד לכל טקסט באתר. עד 17/08/2026 היו כאן שלוש מערכות
// שפה מקבילות (lib/i18n.ts, lib/lang-context.tsx וכאן), והן אוחדו לקובץ הזה.
// אל תיצרו מילון נוסף — הוסיפו מפתח כאן, בשתי השפות.

export type Lang = "he" | "en";

export const dirOf = (l: Lang): "rtl" | "ltr" => (l === "he" ? "rtl" : "ltr");

export const dict = {
  he: {
    dir: 'rtl' as const,
    navWork:'פרויקטים', navGuides:'מדריכים', navCta:'בדיקת התאמה חינם',
    navPricing:'מחירים', navWebsites:'אתרים', navAutomations:'אוטומציות', navConsulting:'ייעוץ ותכנון',
    // תוויות נגישות לניווט — נקראות ע"י קוראי מסך, ולכן חייבות להיות בשפת הממשק
    navAriaMain:'ניווט ראשי', navAriaHome:'שני גורגוב, לדף הבית', navAriaMobileMenu:'תפריט ניווט',
    navAriaMenuOpen:'פתיחת תפריט', navAriaMenuClose:'סגירת תפריט',
    navAriaSwitchEn:'מעבר לאנגלית', navAriaSwitchHe:'מעבר לעברית',
    footerSeo:'אתרים, וואטסאפ ואוטומציות שמתחברים לעבודה של העסק. שני גורגוב, שירות לעסקים בכל הארץ.',
    // ה-H1 הקודם, "יוצרת פתרונות טכנולוגיים לעסקים", תיאר קטגוריה ולא תוצאה,
    // ולא הכיל אף מילת מפתח שמישהו מחפש. החדש אומר מה הלקוח מקבל.
    heroTitle:'העסק שלכם שווה יותר',
    heroSub:'אני שני, בונה אתרים ומחברת בין הכלים של העסק שלכם, כדי שתתעסקו פחות בעבודה ידנית ויישאר לכם יותר זמן ללקוחות ולצמיחה.',
    // טריאז': שלוש דלתות כניסה, כדי שמבקר חדש לא יצטרך לנחש מאיפה מתחילים.
    // "פיתוח מבוסס AI" היה מפרט פנימי, לא משהו שהלקוח מחפש. "קוד ולא תבנית" אומר לו משהו.
    meta1:'ישראל', meta2:'עונה תוך 24 שעות', meta3:'מותאם לעסק שלכם',
    workKicker:'עבודות', workTitle:'פרויקטים נבחרים', workSub:'עבודות ללקוחות, מוצרים שבניתי, והדגמות שמראות מה אפשר לבנות.',
    galleryKicker:'מבט מקרוב', scrollArrow:'',
    buildKicker:'מה אני בונה', buildTitle:'מה העסק שלכם צריך כרגע?', buildSub:'יכול להיות שאתם צריכים אתר שיסביר טוב יותר מה אתם עושים, ויכול להיות שהפניות כבר מגיעות אבל קשה לעקוב אחריהן, אז נתחיל ממה שחסר ונחבר את הדברים לפי הצורך.', servicesCta:'לפרטים המלאים',
    aboutKicker:'מי אני', aboutTitle:'נעים להכיר אני שני', stat1:'שנות ניסיון עסקי', stat2:'זמן תגובה',
    contactTitle:'מה הייתם רוצים שיעבוד טוב יותר?',
    contactSub:'ספרו לי קצת על העסק ומה הייתם רוצים לשפר, גם אם אתם עוד לא יודעים בדיוק מה צריך לבנות, ונעשה בזה סדר יחד באבחון החינמי.',
    contactCta1:'בדיקת התאמה חינם', contactCta2:'דברו איתי בוואטסאפ',
    // "נבנה באהבה בישראל" הוא תרגום ישיר של made with love, לא ניסוח עברי.
    footer:'נבנה בישראל',
    // "עברית טבעית" ו"מבוססת בישראל" היו מפרט פנימי ותרגום של based in Israel.
    marqueeItems:['אתרים','אוטומציות','ייעוץ ותכנון','מותאם לעסק שלכם','ישראל','מענה תוך 24 שעות'],
    processTitle: 'איך מתחילים ומתקדמים',
    processIntro: 'אתם לא צריכים לדעת מראש איזו מערכת לבקש, בשביל זה אני כאן.',
    processSteps: [
      { title: 'מתחילים מהעסק שלכם', text: 'אתם ממלאים את האבחון החינמי ואני חוזרת אליכם כדי להבין איך אתם עובדים, מה מעכב אתכם ומה כדאי לקדם קודם.' },
      { title: 'מסכמים מה צריך לבנות', text: 'אם יש התאמה, אני שולחת הצעה עם מה שנבנה, המחיר ולוח הזמנים, ורק אחרי שהכול ברור ומוסכם מתחילים לעבוד.' },
      { title: 'בונים ומחברים הכול', text: 'אני בונה את מה שסיכמנו, בודקת שהפניות מגיעות למקום הנכון ועוברת איתכם על השימוש במערכת ועל התחזוקה בהמשך.' },
    ],
    aboutParas:[
      '10 שנים ניהלתי עסק משלי, ואני יודעת איפה נשרף הזמן ומה רק מרגיש דחוף.',
      'היום אני בונה אתרים ומחברת בין הכלים של העסק, אבל לפני שאני מתחילה חשוב לי להבין איך אתם עובדים ומה אתם צריכים בפועל, כדי לבנות משהו שיעזור לכם ביומיום.'
    ],
    // סדר הכרטיסים הוא לפי מה שכבר נמכר ויש לו הוכחות, ולא לפי סדר התהליך.
    services:[
      {no:'01', title:'אתר לעסק שלכם', desc:'אני בונה אתר שמסביר מה אתם עושים ונותן לאנשים דרך פשוטה לפנות אליכם, עם התאמה למובייל ובסיס לקידום בגוגל.', fit:'אין לכם אתר, או שלא ברור בו מה אתם מציעים ואיך פונים אליכם', anchor:'מ-1,500 ₪'},
      {no:'02', title:'מערכות שחוסכות זמן', desc:'פעולות שחוזרות על עצמן מתבצעות אוטומטית: שמירת פרטי פנייה, שליחת אישור או תזכורת, ועדכון הכלים שכבר עובדים איתם.', fit:'אתם עונים על אותן שאלות שוב ושוב, או מפספסים פניות בערב', anchor:'מ-1,400 ₪'},
      {no:'03', title:'ייעוץ ותכנון', desc:'אני מפרקת את השבוע שלכם ומראה מה גוזל הכי הרבה זמן.', fit:'רוצים להכניס טכנולוגיה, ולא בטוחים מה שווה את הכסף', anchor:'מתחילים בבדיקת התאמה חינם'}
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
      resultPre: 'שווי הזמן המושקע היום',
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
    navWork:'Work', navGuides:'Guides', navCta:'Free fit check',
    navPricing:'Pricing', navWebsites:'Websites', navAutomations:'Automations', navConsulting:'Consulting & planning',
    // Accessible names for the nav — announced by screen readers, so they follow the UI language
    navAriaMain:'Main navigation', navAriaHome:'Shani Gorgov — home', navAriaMobileMenu:'Navigation menu',
    navAriaMenuOpen:'Open menu', navAriaMenuClose:'Close menu',
    navAriaSwitchEn:'Switch to English', navAriaSwitchHe:'Switch to Hebrew',
    footerSeo:'Websites, WhatsApp and automations connected to the way your business works. Shani Gorgov, serving businesses across Israel.',
    heroTitle:'Your business is worth more',
    heroSub:'I’m Shani, I build websites and connect your business tools so you spend less time on manual work and have more time for customers and growth.',
    meta1:'Israel', meta2:'Replies within 24h', meta3:'Built for your business',
    workKicker:'Work', workTitle:'Featured Projects', workSub:'Client work, products I have built, and demos that show what is possible.',
    galleryKicker:'Up close', scrollArrow:'',
    buildKicker:'What I build', buildTitle:'From the first enquiry to a smoother working day', buildSub:'The website explains your business. WhatsApp makes it easy to get in touch. Automations save details and handle recurring tasks, based on what you need.', servicesCta:'Full details',
    aboutKicker:'Who I am', aboutTitle:'I am Shani. Business first, tools second.', stat1:'years in business', stat2:'response time',
    contactTitle:'What would you like to work better?',
    contactSub:'Tell me what is happening in your business and what is getting in the way. The free assessment helps us decide what to improve. No technical knowledge or ready-made solution needed.',
    // These were reversed against the Hebrew, which meant the free-audit CTA —
    // the site's main lead funnel — vanished entirely in English.
    contactCta1:'Free fit check', contactCta2:'Message me on WhatsApp',
    footer:'Built in Israel',
    marqueeItems:['Websites','Automations','AI consulting','Built for your business','Israel','Replies within 24h'],
    processTitle: 'How we get started and move forward',
    processIntro: 'A clear process. You do not need to know which website, system or tool to ask for.',
    processSteps: [
      { title: 'Understand the need', text: 'Complete the free assessment. I review your answers and follow up to understand what matters now and what can wait.' },
      { title: 'Agree on the work', text: 'If there is a fit, you receive a proposal covering what will be built, how it connects, the cost and the timeline. Work starts after we agree.' },
      { title: 'Connect and test', text: 'I build what we agreed and test the journey from an enquiry to its follow-up. We then go through how to use the system and what ongoing maintenance involves.' },
    ],
    aboutParas:[
      'I ran my own business for 10 years, so I know where time burns and what only feels urgent.',
      'Today I build websites and connect the tools behind a business. I start by understanding how you work, then choose what to build and connect.'
    ],
    services:[
      {no:'01', title:'Websites that bring enquiries', desc:'A website that explains your offer, shows your work and makes getting in touch easy. Mobile-friendly, with the foundations for Google search.', fit:'You have no website, or visitors cannot easily understand your offer and contact you', anchor:'From ₪1,500'},
      {no:'02', title:'Systems that save time', desc:'Recurring tasks happen automatically: saving enquiry details, sending a confirmation or reminder, and updating the tools you already use.', fit:'You answer the same questions again and again, or miss enquiries in the evening', anchor:'From ₪1,400'},
      {no:'03', title:'Consulting & planning', desc:'I break your week down and show you what eats the most time.', fit:'You want technology in the business but cannot tell what is worth the money', anchor:'Start with a free fit check'}
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
      resultPre: 'What that time costs today',
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

export type Dict = (typeof dict)[Lang];
