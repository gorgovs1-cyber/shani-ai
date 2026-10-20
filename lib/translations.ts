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
    navConsulting:'ייעוץ ותכנון', navWebsites:'אתרים', navAutomations:'אוטומציות', navAi:'פתרונות AI וסוכנים', navAiShort:'פתרונות AI', navChat:'צ׳אטבוטים וסוכנים', navCrm:'CRM', navAbout:'אודות', navContact:'צור קשר',
    // תוויות נגישות לניווט — נקראות ע"י קוראי מסך, ולכן חייבות להיות בשפת הממשק
    navAriaMain:'ניווט ראשי', navAriaHome:'שני גורגוב, לדף הבית', navAriaMobileMenu:'תפריט ניווט',
    navAriaMenuOpen:'פתיחת תפריט', navAriaMenuClose:'סגירת תפריט',
    navAriaSwitchEn:'מעבר לאנגלית', navAriaSwitchHe:'מעבר לעברית',
    footerSeo:'צ׳אטבוטים וסוכני AI, מערכת CRM מודולרית, אתרים שמביאים פניות ואוטומציות. שני גורגוב, לעסקים בישראל ובארה״ב.',
    heroTitle:'צ׳אטבוטים וסוכני AI שעונים, מסננים וסוגרים פניות בשבילכם',
    heroSub:'אני שני. אני בונה לעסקים בישראל ובארה״ב צ׳אטבוטים וסוכני AI, מערכת CRM מודולרית, אתרים שמביאים פניות ואוטומציות. אנחנו צומחים, בשיתוף עם ai2u.pro של ליאור.',
    meta1:'צ׳אטבוטים וסוכני AI', meta2:'CRM, אתרים ואוטומציות', meta3:'ישראל וארה״ב',
    heroStats:[{n:'11+',l:'שנות ניסיון עסקי'},{n:'IL · US',l:'עסקים בישראל ובארה״ב'},{n:'ai2u',l:'בשיתוף עם ליאור'}],
    workKicker:'עבודות', workTitle:'פרויקטים נבחרים', workSub:'עבודות ללקוחות, מוצרים שבניתי, והדגמות שמראות מה אפשר לבנות.',
    galleryKicker:'מבט מקרוב', scrollArrow:'',
    buildKicker:'מה אני בונה', buildTitle:'ארבעה שירותים, מערכת אחת', buildSub:'מתחילים ממה שהכי בוער, בדרך כלל המענה ללקוחות, ומחברים את השאר.', servicesCta:'לפרטים המלאים', servicesCtaAudit:'לבדיקת התאמה חינם',
    aboutKicker:'מי אני', aboutTitle:'נעים להכיר, אני שני', stat1:'שנות ניסיון עסקי', stat2:'זמן תגובה',
    contactTitle:'מה הייתם רוצים שיעבוד טוב יותר?',
    contactSub:'ספרו לי קצת על העסק ומה הייתם רוצים לשפר, גם אם אתם עוד לא יודעים בדיוק מה צריך לבנות, ונעשה בזה סדר יחד בבדיקת ההתאמה החינם.',
    contactCta1:'בדיקת התאמה חינם', contactCta2:'דברו איתי בוואטסאפ',
    // "נבנה באהבה בישראל" הוא תרגום ישיר של made with love, לא ניסוח עברי.
    footer:'נבנה בישראל',
    // "עברית טבעית" ו"מבוססת בישראל" היו מפרט פנימי ותרגום של based in Israel.
    marqueeItems:['צ׳אטבוטים','סוכני AI','CRM מודולרי','אתרים שמביאים פניות','אוטומציות','ישראל · ארה״ב'],
    processTitle: 'איך מתחילים ומתקדמים',
    processIntro: 'אתם לא צריכים לדעת מראש איזו מערכת לבקש, בשביל זה אני כאן.',
    processSteps: [
      { title: 'אפיון העסק והצרכים', text: 'כל תהליך מתחיל באפיון. אתם ממלאים את בדיקת ההתאמה החינם, ויחד אנחנו מאפיינים איך העסק עובד, מה מעכב אתכם ומה כדאי לבנות קודם.' },
      { title: 'מסכמים מה בונים', text: 'על בסיס האפיון אני שולחת הצעה מסודרת עם מה שנבנה ולוח הזמנים, ורק אחרי שהכול ברור ומוסכם מתחילים לעבוד.' },
      { title: 'בונים ומחברים הכול', text: 'אני בונה את מה שסיכמנו, בודקת שהפניות מגיעות למקום הנכון ועוברת איתכם על השימוש במערכת ועל התחזוקה בהמשך.' },
    ],
    aboutParas:[
      'כבר 11 שנים אני בעולם העסקים, ואני יודעת איפה נשרף הזמן ואיפה פניות נופלות.',
      'היום אני בונה צ׳אטבוטים, סוכני AI ומערכות לעסקים בישראל ובארה״ב. אנחנו צומחים, ואת הפרויקטים הגדולים אני מובילה בשיתוף עם ai2u.pro של ליאור.'
    ],
    // הבוטים והסוכנים ראשונים: זה השירות החזק ביותר. Services.tsx ממפה לפי אינדקס.
    services:[
      {no:'01', title:'צ׳אטבוטים וסוכני AI', short:'עונים ללקוחות באתר ובוואטסאפ, מסננים פניות וקובעים פגישות, גם כשאתם עסוקים', desc:'צ׳אטבוט או סוכן AI שמבין את השיחה, עונה בטון של העסק ומעביר אליכם רק את מה שדורש אדם.', fit:'שואלים אתכם אותן שאלות שוב ושוב, או שפניות נופלות בערב'},
      {no:'02', title:'מערכת CRM מודולרית', short:'כל הלקוחות והפניות במקום אחד, במודולים שמתאימים מעסק קטן ועד ארגון גדול', desc:'CRM שנבנה סביב הדרך שבה העסק עובד, ומתרחב כשהעסק גדל.', fit:'הפניות מפוזרות בין וואטסאפ, מייל ואקסל'},
      {no:'03', title:'אתר שמביא פניות', short:'אתר מהיר שמסביר מה אתם עושים ומוביל לפנייה', desc:'אתר שמסביר מה אתם עושים ונותן לאנשים דרך פשוטה לפנות אליכם, עם התאמה למובייל ובסיס לקידום בגוגל.', fit:'אין לכם אתר, או שלא ברור בו מה אתם מציעים'},
      {no:'04', title:'אוטומציות', short:'העבודה החוזרת קורית לבד: פרטי פנייה נשמרים, אישורים ותזכורות נשלחים', desc:'פעולות שחוזרות על עצמן מתבצעות אוטומטית ומחברות בין הכלים שכבר עובדים איתם.', fit:'אתם מעתיקים פרטים ושולחים אותן הודעות ידנית'}
    ],
    // הפרויקטים עברו ל-lib/projects.ts, שהוא מקור האמת היחיד לתיק העבודות.
    // טופס הפרומפטים הוסר — לא הייתה רשימת תפוצה לשלוח אליה.
    // ההמלצות הפיקטיביות שהיו כאן נמחקו — הן לא רונדרו בשום מקום.
    //   מה שמוצג בפועל הוא components/TestimonialsSection.tsx עם לקוחות אמיתיים.
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
    navConsulting:'Consulting & planning', navWebsites:'Websites', navAutomations:'Automations', navAi:'AI solutions & agents', navAiShort:'AI solutions', navChat:'Chatbots & agents', navCrm:'CRM', navAbout:'About', navContact:'Contact',
    // Accessible names for the nav — announced by screen readers, so they follow the UI language
    navAriaMain:'Main navigation', navAriaHome:'Shani Gorgov, home', navAriaMobileMenu:'Navigation menu',
    navAriaMenuOpen:'Open menu', navAriaMenuClose:'Close menu',
    navAriaSwitchEn:'Switch to English', navAriaSwitchHe:'Switch to Hebrew',
    footerSeo:'AI chatbots and agents, a modular CRM, websites that bring enquiries, and automations. Shani Gorgov, for businesses in Israel and the US.',
    heroTitle:'AI chatbots and agents that answer, qualify and close enquiries for you',
    heroSub:'I’m Shani. I build AI chatbots and agents, a modular CRM, websites that bring enquiries and automations for businesses in Israel and the US. We are growing, in partnership with Lior of ai2u.pro.',
    meta1:'AI chatbots and agents', meta2:'CRM, websites and automations', meta3:'Israel and the US',
    heroStats:[{n:'11+',l:'years in business'},{n:'IL · US',l:'businesses in Israel and the US'},{n:'ai2u',l:'in partnership with Lior'}],
    workKicker:'Work', workTitle:'Featured Projects', workSub:'Client work, products I have built, and demos that show what is possible.',
    galleryKicker:'Up close', scrollArrow:'',
    buildKicker:'What I build', buildTitle:'Four services, one system', buildSub:'We start with what is most urgent, usually replying to customers, and connect the rest.', servicesCta:'Full details', servicesCtaAudit:'Free fit check',
    aboutKicker:'Who I am', aboutTitle:'Nice to meet you, I am Shani', stat1:'years in business', stat2:'response time',
    contactTitle:'What would you like to work better?',
    contactSub:'Tell me what is happening in your business and what is getting in the way. The free fit check helps us decide what to improve. No technical knowledge or ready-made solution needed.',
    // These were reversed against the Hebrew, which meant the free-audit CTA —
    // the site's main lead funnel — vanished entirely in English.
    contactCta1:'Free fit check', contactCta2:'Message me on WhatsApp',
    footer:'Built in Israel',
    marqueeItems:['Chatbots','AI agents','Modular CRM','Websites that bring enquiries','Automations','Israel · US'],
    processTitle: 'How we get started and move forward',
    processIntro: 'A clear process. You do not need to know which website, system or tool to ask for.',
    processSteps: [
      { title: 'Business specification', text: 'Every project starts with a specification. You complete the free fit check, and together we map how your business works, what slows you down and what to build first.' },
      { title: 'Agree on the work', text: 'Based on the specification, you receive a clear proposal covering what will be built, how it connects and the timeline. Work starts after we agree.' },
      { title: 'Connect and test', text: 'I build what we agreed and test the journey from an enquiry to its follow-up. We then go through how to use the system and what ongoing maintenance involves.' },
    ],
    aboutParas:[
      'I have been in business for 11 years, so I know where time burns and where enquiries slip away.',
      'Today I build chatbots, AI agents and systems for businesses in Israel and the US. We are growing, and I lead the larger projects together with Lior of ai2u.pro.'
    ],
    services:[
      {no:'01', title:'AI chatbots and agents', short:'Answer customers on your site and WhatsApp, qualify enquiries and book meetings, even when you are busy', desc:'A chatbot or AI agent that understands the conversation, replies in your tone and hands you only what needs a person.', fit:'You get asked the same questions again and again, or enquiries slip through in the evening'},
      {no:'02', title:'A modular CRM', short:'Every customer and enquiry in one place, in modules that fit a small business or a large organisation', desc:'A CRM built around how your business works, that grows with you.', fit:'Enquiries are scattered across WhatsApp, email and spreadsheets'},
      {no:'03', title:'Websites that bring enquiries', short:'A fast website that explains what you do and leads to an enquiry', desc:'A website that explains your offer and makes getting in touch easy. Mobile-friendly, with the foundations for Google search.', fit:'You have no website, or visitors cannot easily understand your offer'},
      {no:'04', title:'Automations', short:'Repetitive work happens by itself: enquiry details are saved, confirmations and reminders are sent', desc:'Recurring tasks happen automatically and connect the tools you already use.', fit:'You copy details and send the same messages by hand'}
    ],
    // Projects live in lib/projects.ts, the single source of truth for the portfolio.
    // טופס הפרומפטים הוסר — לא הייתה רשימת תפוצה לשלוח אליה.
    // ההמלצות הפיקטיביות שהיו כאן נמחקו — הן לא רונדרו בשום מקום.
    //   מה שמוצג בפועל הוא components/TestimonialsSection.tsx עם לקוחות אמיתיים.
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
