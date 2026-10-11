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
    navConsulting:'ייעוץ ותכנון', navWebsites:'אתרים', navAutomations:'אוטומציות', navAi:'פתרונות AI וסוכנים', navAiShort:'פתרונות AI', navChat:'צ׳אטבוט', navAbout:'אודות', navContact:'צור קשר',
    // תוויות נגישות לניווט — נקראות ע"י קוראי מסך, ולכן חייבות להיות בשפת הממשק
    navAriaMain:'ניווט ראשי', navAriaHome:'שני גורגוב, לדף הבית', navAriaMobileMenu:'תפריט ניווט',
    navAriaMenuOpen:'פתיחת תפריט', navAriaMenuClose:'סגירת תפריט',
    navAriaSwitchEn:'מעבר לאנגלית', navAriaSwitchHe:'מעבר לעברית',
    footerSeo:'אתרים, אוטומציות, צ׳אטבוט ושיווק לעסקים, במקום אחד. שני גורגוב, שירות לעסקים בכל הארץ.',
    // ה-H1 הקודם, "יוצרת פתרונות טכנולוגיים לעסקים", תיאר קטגוריה ולא תוצאה,
    // ולא הכיל אף מילת מפתח שמישהו מחפש. החדש אומר מה הלקוח מקבל.
    heroTitle:'פתרונות AI מתקדמים לעסק שלכם',
    heroSub:'אני שני, מומחית ב-AI Chatbot, VibeCoding, אוטומציות N8N ואתרים מתקדמים. אני הופכת רעיונות למציאות עם הטכנולוגיות החדשניות ביותר.',
    // טריאז': שלוש דלתות כניסה, כדי שמבקר חדש לא יצטרך לנחש מאיפה מתחילים.
    // "פיתוח מבוסס AI" היה מפרט פנימי, לא משהו שהלקוח מחפש. "קוד ולא תבנית" אומר לו משהו.
    meta1:'שירות 24/7', meta2:'אתרים, שיווק ומערכות', meta3:'מותאם לעסק שלכם',
    heroStats:[{n:'11+',l:'שנים בתחום העסקים'},{n:'7',l:'שירותים במקום אחד'},{n:'24/7',l:'שירות וזמינות'}],
    workKicker:'עבודות', workTitle:'פרויקטים נבחרים', workSub:'עבודות ללקוחות, מוצרים שבניתי, והדגמות שמראות מה אפשר לבנות.',
    galleryKicker:'מבט מקרוב', scrollArrow:'',
    buildKicker:'מה אני בונה', buildTitle:'מה העסק שלכם צריך כרגע?', buildSub:'אולי חסר לכם אתר שמסביר מה אתם עושים. אולי הפניות כבר מגיעות וקשה לעקוב אחריהן. נתחיל ממה שחסר ונחבר את השאר.', servicesCta:'לפרטים המלאים', servicesCtaAudit:'לבדיקת התאמה חינם',
    aboutKicker:'מי אני', aboutTitle:'נעים להכיר, אני שני', stat1:'שנות ניסיון עסקי', stat2:'זמן תגובה',
    contactTitle:'מה הייתם רוצים שיעבוד טוב יותר?',
    contactSub:'ספרו לי קצת על העסק ומה הייתם רוצים לשפר, גם אם אתם עוד לא יודעים בדיוק מה צריך לבנות, ונעשה בזה סדר יחד בבדיקת ההתאמה החינם.',
    contactCta1:'בדיקת התאמה חינם', contactCta2:'דברו איתי בוואטסאפ',
    // "נבנה באהבה בישראל" הוא תרגום ישיר של made with love, לא ניסוח עברי.
    footer:'נבנה בישראל',
    // "עברית טבעית" ו"מבוססת בישראל" היו מפרט פנימי ותרגום של based in Israel.
    marqueeItems:['אתרים','אוטומציות','צ׳אטבוט בעברית','שיווק ממומן','IT ותשתיות ענן','ליווי צמוד','פתרונות AI'],
    processTitle: 'איך מתחילים ומתקדמים',
    processIntro: 'אתם לא צריכים לדעת מראש איזו מערכת לבקש, בשביל זה אני כאן.',
    processSteps: [
      { title: 'אפיון העסק והצרכים', text: 'כל תהליך מתחיל באפיון. אתם ממלאים את בדיקת ההתאמה החינם, ויחד אנחנו מאפיינים איך העסק עובד, מה מעכב אתכם ומה כדאי לבנות קודם.' },
      { title: 'מסכמים מה בונים', text: 'על בסיס האפיון אני שולחת הצעה מסודרת עם מה שנבנה ולוח הזמנים, ורק אחרי שהכול ברור ומוסכם מתחילים לעבוד.' },
      { title: 'בונים ומחברים הכול', text: 'אני בונה את מה שסיכמנו, בודקת שהפניות מגיעות למקום הנכון ועוברת איתכם על השימוש במערכת ועל התחזוקה בהמשך.' },
    ],
    aboutParas:[
      'כבר 11 שנים אני בעולם העסקים, ואני יודעת איפה נשרף הזמן ומה רק מרגיש דחוף.',
      'היום אני בונה אתרים ומערכות לעסקים, ומטפלת גם בשיווק ובתשתית. לפני שמתחילים חשוב לי להבין איך אתם עובדים, כדי לבנות משהו שיעזור לכם ביומיום.'
    ],
    // סדר הכרטיסים הוא לפי מה שכבר נמכר ויש לו הוכחות, ולא לפי סדר התהליך.
    services:[
      {no:'01', title:'אתר לעסק שלכם', short:'אתרים ודפי נחיתה מהירים שמובילים לפנייה', desc:'אני בונה אתר שמסביר מה אתם עושים ונותן לאנשים דרך פשוטה לפנות אליכם, עם התאמה למובייל ובסיס לקידום בגוגל.', fit:'אין לכם אתר, או שלא ברור בו מה אתם מציעים ואיך פונים אליכם'},
      {no:'02', title:'מערכות שחוסכות זמן', short:'אוטומציות N8N שעושות את העבודה החוזרת', desc:'פעולות שחוזרות על עצמן מתבצעות אוטומטית: שמירת פרטי פנייה, שליחת אישור או תזכורת, ועדכון הכלים שכבר עובדים איתם.', fit:'אתם מעתיקים פרטים ושולחים אותן הודעות ידנית, או מפספסים פניות בערב'},
      {no:'03', title:'פתרונות AI וסוכנים', short:'סוכני AI שעובדים בתוך התהליכים שלכם', desc:'סוכן AI שמבין את השיחה, עונה בעברית ויכול לבצע פעולות כמו סינון פניות וקביעת פגישות לפי הכללים שלכם.', fit:'כל פנייה אצלכם קצת שונה, והמענה צריך להבין הקשר ולבצע את הצעד הבא'},
      {no:'04', title:'צ׳אטבוט בעברית לעסק', short:'עונה ללקוחות בעברית באתר ובוואטסאפ', desc:'צ׳אטבוט שעונה ללקוחות בעברית באתר ובוואטסאפ, ומעביר אליכם כל פנייה שדורשת אדם.', fit:'שואלים אתכם אותן שאלות שוב ושוב, או שפניות נופלות בערב'},
      {no:'05', title:'שיווק ממומן', short:'קמפיינים בגוגל ובמטא שמביאים פניות', desc:'קמפיינים בגוגל, פייסבוק ואינסטגרם שמכוונים לפנייה, עם מעקב ברור על מה הביא אותן.', fit:'יש לכם מה להציע ואתם רוצים שיותר אנשים יגיעו'},
      {no:'06', title:'IT ותשתיות ענן', short:'תשתית, ענן ואבטחת מידע מסודרים', desc:'תשתיות, מעבר לענן, אבטחת מידע ותמיכה טכנית, כדי שהעבודה לא תיעצר.', fit:'המערכות מפוזרות או איטיות, ואין מי שאחראי עליהן'},
      {no:'07', title:'ליווי עסקי צמוד', short:'ליווי מהאפיון ועד אחרי ההשקה', desc:'ליווי צמוד לאורך כל הפרויקט, מהאפיון ועד אחרי ההשקה, במקום ספק לכל נושא.', fit:'אתם צריכים כמה דברים ואין לכם זמן לתאם ביניהם'}
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
    navConsulting:'Consulting & planning', navWebsites:'Websites', navAutomations:'Automations', navAi:'AI solutions & agents', navAiShort:'AI solutions', navChat:'Chatbot', navAbout:'About', navContact:'Contact',
    // Accessible names for the nav — announced by screen readers, so they follow the UI language
    navAriaMain:'Main navigation', navAriaHome:'Shani Gorgov — home', navAriaMobileMenu:'Navigation menu',
    navAriaMenuOpen:'Open menu', navAriaMenuClose:'Close menu',
    navAriaSwitchEn:'Switch to English', navAriaSwitchHe:'Switch to Hebrew',
    footerSeo:'Websites, automations, a chatbot and marketing for your business, in one place. Shani Gorgov, serving businesses across Israel.',
    heroTitle:'Advanced AI solutions for your business',
    heroSub:'I’m Shani, an expert in AI chatbots, VibeCoding, n8n automations and advanced websites. I turn ideas into reality with the latest technology.',
    meta1:'24/7 service', meta2:'Websites, marketing and systems', meta3:'Built for your business',
    heroStats:[{n:'11+',l:'years in business'},{n:'7',l:'services in one place'},{n:'24/7',l:'service and availability'}],
    workKicker:'Work', workTitle:'Featured Projects', workSub:'Client work, products I have built, and demos that show what is possible.',
    galleryKicker:'Up close', scrollArrow:'',
    buildKicker:'What I build', buildTitle:'From the first enquiry to a smoother working day', buildSub:'Maybe you need a website that explains what you do. Maybe enquiries already come in and are hard to follow. We start with what is missing and connect the rest.', servicesCta:'Full details', servicesCtaAudit:'Free fit check',
    aboutKicker:'Who I am', aboutTitle:'Nice to meet you, I am Shani', stat1:'years in business', stat2:'response time',
    contactTitle:'What would you like to work better?',
    contactSub:'Tell me what is happening in your business and what is getting in the way. The free fit check helps us decide what to improve. No technical knowledge or ready-made solution needed.',
    // These were reversed against the Hebrew, which meant the free-audit CTA —
    // the site's main lead funnel — vanished entirely in English.
    contactCta1:'Free fit check', contactCta2:'Message me on WhatsApp',
    footer:'Built in Israel',
    marqueeItems:['Websites','Automations','Hebrew chatbot','Paid marketing','IT and cloud','Close support','AI solutions'],
    processTitle: 'How we get started and move forward',
    processIntro: 'A clear process. You do not need to know which website, system or tool to ask for.',
    processSteps: [
      { title: 'Business specification', text: 'Every project starts with a specification. You complete the free fit check, and together we map how your business works, what slows you down and what to build first.' },
      { title: 'Agree on the work', text: 'Based on the specification, you receive a clear proposal covering what will be built, how it connects and the timeline. Work starts after we agree.' },
      { title: 'Connect and test', text: 'I build what we agreed and test the journey from an enquiry to its follow-up. We then go through how to use the system and what ongoing maintenance involves.' },
    ],
    aboutParas:[
      'I have been in business for 11 years, so I know where time burns and what only feels urgent.',
      'Today I build websites and systems for businesses, and I also handle marketing and infrastructure. I start by understanding how you work, then choose what to build.'
    ],
    services:[
      {no:'01', title:'Websites that bring enquiries', short:'Fast websites and landing pages that lead to enquiries', desc:'A website that explains your offer, shows your work and makes getting in touch easy. Mobile-friendly, with the foundations for Google search.', fit:'You have no website, or visitors cannot easily understand your offer and contact you'},
      {no:'02', title:'Systems that save time', short:'n8n automations that take over the repetitive work', desc:'Recurring tasks happen automatically: saving enquiry details, sending a confirmation or reminder, and updating the tools you already use.', fit:'You copy details and send the same messages by hand, or miss enquiries in the evening'},
      {no:'03', title:'AI solutions and agents', short:'AI agents that work inside your processes', desc:'An AI agent that understands the conversation, replies naturally, and can qualify enquiries and book meetings by your rules.', fit:'Every enquiry is a little different, and the reply needs to understand context and take the next step'},
      {no:'04', title:'A Hebrew chatbot for your business', short:'Answers customers in Hebrew on your site and WhatsApp', desc:'A chatbot that answers customers in Hebrew on your website and on WhatsApp, and hands over to you anything that needs a person.', fit:'You get asked the same questions again and again, or enquiries slip through in the evening'},
      {no:'05', title:'Paid marketing', short:'Google and Meta campaigns that bring enquiries', desc:'Google, Facebook and Instagram campaigns built to bring enquiries, with clear tracking of what brought them.', fit:'You have something to offer and want more people to find it'},
      {no:'06', title:'IT, cloud and security', short:'Infrastructure, cloud and data security in order', desc:'Infrastructure, cloud migration, security and technical support, so work does not stop.', fit:'Your systems are scattered or slow, and nobody owns them'},
      {no:'07', title:'Close business support', short:'Support from specification to after launch', desc:'Close support for the whole project, from specification to after launch, instead of a separate vendor for every topic.', fit:'You need several things and have no time to coordinate between them'}
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
