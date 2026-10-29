// ─── SHANI AI · המילון הדו-לשוני היחיד של האתר ───
// זהו מקור האמת היחיד לכל טקסט באתר. עד 17/08/2026 היו כאן שלוש מערכות
// שפה מקבילות (lib/i18n.ts, lib/lang-context.tsx וכאן), והן אוחדו לקובץ הזה.
// אל תיצרו מילון נוסף — הוסיפו מפתח כאן, בשתי השפות.

export type Lang = "he" | "en";

export const dirOf = (l: Lang): "rtl" | "ltr" => (l === "he" ? "rtl" : "ltr");

export const dict = {
  he: {
    dir: 'rtl' as const,
    navWork:'פרויקטים', navVisual:'תוכן ויזואלי ב-AI', navGuides:'מדריכים', navCta:'בדיקת התאמה חינם',
    navConsulting:'ייעוץ ותכנון', navWebsites:'אתרים', navAutomations:'אוטומציות', navAi:'פתרונות AI וסוכנים', navAiShort:'פתרונות AI', navChat:'צ׳אטבוטים וסוכנים', navAbout:'אודות', navContact:'צור קשר',
    // תוויות נגישות לניווט — נקראות ע"י קוראי מסך, ולכן חייבות להיות בשפת הממשק
    navAriaMain:'ניווט ראשי', navAriaHome:'Shani AI, לדף הבית של שני גורגוב', navAriaMobileMenu:'תפריט ניווט',
    navAriaMenuOpen:'פתיחת תפריט', navAriaMenuClose:'סגירת תפריט',
    navAriaSwitchEn:'מעבר לאנגלית', navAriaSwitchHe:'מעבר לעברית',
    footerSeo:'צ׳אטבוטים וסוכני AI, מערכת CRM מודולרית, אתרים ואוטומציות. שני גורגוב, לעסקים בישראל ובארה״ב.',
    heroTitle:'פתרונות AI מתקדמים לעסק שלכם',
    heroSub:'אני שני, מומחית ב-AI Chatbot, VibeCoding, אוטומציות N8N ואתרים מתקדמים. אני הופכת רעיונות למציאות עם הטכנולוגיות החדשניות ביותר.',
    meta1:'שירות 24/7', meta2:'אתרים, שיווק ומערכות', meta3:'מותאם לעסק שלכם',
    heroStats:[{n:'11+',l:'שנים בתחום העסקים'},{n:'24/7',l:'שירות וזמינות'}],
    workKicker:'עבודות', workTitle:'פרויקטים נבחרים', workSub:'עבודות ללקוחות, מוצרים שבניתי, והדגמות שמראות מה אפשר לבנות.',
    galleryKicker:'מבט מקרוב', scrollArrow:'',
    buildKicker:'מה אני בונה', buildSub:'מתחילים ממה שהכי בוער, בדרך כלל המענה ללקוחות, ומחברים את השאר.', servicesCta:'לפרטים המלאים', servicesCtaAudit:'לבדיקת התאמה חינם',
    aboutKicker:'מי אני', aboutTitle:'נעים להכיר, אני שני', stat1:'שנות ניסיון עסקי', stat2:'זמן תגובה',
    contactTitle:'מה הייתם רוצים שיעבוד טוב יותר?',
    contactSub:'ספרו לי קצת על העסק ומה הייתם רוצים לשפר, גם אם אתם עוד לא יודעים בדיוק מה צריך לבנות, ונעשה בזה סדר יחד בבדיקת ההתאמה החינם.',
    contactCta1:'בדיקת התאמה חינם', contactCta2:'דברו איתי בוואטסאפ',
    // "נבנה באהבה בישראל" הוא תרגום ישיר של made with love, לא ניסוח עברי.
    footer:'נבנה בישראל',
    // "עברית טבעית" ו"מבוססת בישראל" היו מפרט פנימי ותרגום של based in Israel.
    marqueeItems:['צ׳אטבוטים','סוכני AI','CRM מודולרי','אתרים','אוטומציות','ישראל · ארה״ב'],
    // דף הבית: מי אנחנו → שירותים → איך מתחילים. נוסח מאושר (29.10), לא לשכתב.
    homeAboutTitle:'מי אנחנו',
    homeAboutText:'אנחנו צוות שנותן מעטפת שירותים טכנולוגית מלאה לניהול העסק — בשיתוף פעולה עם {partner}: אתרים, בוטים, סוכנים, ויז׳ואל, אוטומציות ומערכות משולבות AI.',
    // כותרת נסתרת לקוראי מסך בלבד: אין כותרת "השירותים שלנו" גלויה בבית.
    homeServicesTitle:'שירותים',
    homeServices:[
      {key:'websites', title:'אתרים', text:'אתרים שנבנים בקוד, מהירים ומותאמים למובייל, עם מבנה שמותאם לקידום בגוגל ובמנועי AI וחיבור לוואטסאפ ולמערכות.', href:'/websites'},
      {key:'bots', title:'בוטים וסוכנים', text:'עונים ללקוחות באתר ובוואטסאפ, מסננים פניות וקובעים פגישות, גם כשאתם עסוקים', href:'/chatbots'},
      {key:'visual', title:'ויזואל', text:'ויזואל וסרטונים ב-AI: מוצרים, קטלוגים ותוכן שמתעדכן, בלי לצלם כל פעם מחדש.', href:'/ai-visual-content'},
      {key:'automations', title:'אוטומציות', text:'אוטומציות שחוסכות זמן: הפנייה נשמרת, נשלחים אישורים ותזכורות, בלי העתקות ידניות.', href:'/automations'},
      {key:'crm', title:'מערכות משולבות AI', text:'מערכת CRM מודולרית: כל הפניות והשיחות במקום אחד, עם אפשרות להתחבר גם ל-CRM או לממשק אחר שלכם.', href:'/crm'},
    ],
    homeStartTitle:'איך מתחילים',
    homeStartSteps:[
      {title:'אפיון', text:'שיחה קצרה על העסק ומה צריך לעבוד טוב יותר'},
      {title:'בנייה', text:'אתר, בוט, ויזואל, אוטומציה או מערכת, לפי מה שצריך'},
      {title:'עלייה לאוויר', text:'חיבור לוואטסאפ ולמערכות שלכם'},
    ],
    processTitle: 'איך מתחילים ומתקדמים',
    processIntro: 'אתם לא צריכים לדעת מראש איזו מערכת לבקש, בשביל זה אני כאן.',
    processSteps: [
      { title: 'אפיון העסק והצרכים', text: 'כל תהליך מתחיל באפיון. אתם ממלאים את בדיקת ההתאמה החינם, ויחד אנחנו מאפיינים איך העסק עובד, מה מעכב אתכם ומה כדאי לבנות קודם.' },
      { title: 'מסכמים מה בונים', text: 'על בסיס האפיון אני שולחת הצעה מסודרת עם מה שנבנה ולוח הזמנים, ורק אחרי שהכול ברור ומוסכם מתחילים לעבוד.' },
      { title: 'בונים ומחברים הכול', text: 'אני בונה את מה שסיכמנו, בודקת שהפניות מגיעות למקום הנכון ועוברת איתכם על השימוש במערכת ועל התחזוקה בהמשך.' },
    ],
    aboutParas:[
      'כבר 11 שנים אני בעולם העסקים, ואני יודעת איפה נשרף הזמן ואיפה פניות נופלות.',
      'היום אני בונה צ׳אטבוטים, סוכני AI ומערכות לעסקים בישראל ובארה״ב, ואנחנו ממשיכים לצמוח.'
    ],
    // הבוטים והסוכנים ראשונים: זה השירות החזק ביותר. Services.tsx ממפה לפי אינדקס.
    services:[
      {no:'01', title:'צ׳אטבוטים וסוכני AI', short:'עונים ללקוחות באתר ובוואטסאפ, מסננים פניות וקובעים פגישות, גם כשאתם עסוקים.', desc:'צ׳אטבוט, סוכן AI או בוט קולי שמבין את השיחה, עונה בטון של העסק ומעביר אליכם רק את מה שדורש אדם.'},
      {no:'02', title:'מערכת CRM מודולרית', short:'כל הלקוחות והפניות במקום אחד, במודולים שמתאימים מעסק קטן ועד ארגון גדול', desc:'CRM שנבנה סביב הדרך שבה העסק עובד, ומתרחב כשהעסק גדל.'},
      {no:'03', title:'אתרים', short:'אתר מהיר שמסביר מה אתם עושים ומוביל לפנייה', desc:'אתר שמסביר מה אתם עושים ונותן לאנשים דרך פשוטה לפנות אליכם, עם התאמה למובייל ובסיס לקידום בגוגל.'},
      {no:'04', title:'אוטומציות', short:'העבודה החוזרת קורית לבד: פרטי פנייה נשמרים, אישורים ותזכורות נשלחים', desc:'פעולות שחוזרות על עצמן מתבצעות אוטומטית ומחברות בין הכלים שכבר עובדים איתם.'},
      {no:'05', title:'תוכן ויזואלי ב-AI', short:'הדמיות מוצר, סרטונים וקטלוג שמתעדכן, בלי צילום חוזר', desc:'מציגים ללקוח את המוצר עוד לפני שהורכב: הדמיות בסגנון המותג שלכם, סרטונים קצרים וקטלוג לכל עונה.'}
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
    navWork:'Work', navVisual:'AI Visual Content', navGuides:'Guides', navCta:'Free fit check',
    navConsulting:'Consulting & planning', navWebsites:'Websites', navAutomations:'Automations', navAi:'AI solutions & agents', navAiShort:'AI solutions', navChat:'Chatbots & agents', navAbout:'About', navContact:'Contact',
    // Accessible names for the nav — announced by screen readers, so they follow the UI language
    navAriaMain:'Main navigation', navAriaHome:'Shani AI, Shani Gorgov home page', navAriaMobileMenu:'Navigation menu',
    navAriaMenuOpen:'Open menu', navAriaMenuClose:'Close menu',
    navAriaSwitchEn:'Switch to English', navAriaSwitchHe:'Switch to Hebrew',
    footerSeo:'AI chatbots and agents, a modular CRM, websites and automations. Shani Gorgov, for businesses in Israel and the US.',
    heroTitle:'Advanced AI solutions for your business',
    heroSub:'I’m Shani, an expert in AI chatbots, VibeCoding, n8n automations and advanced websites. I turn ideas into reality with the latest technology.',
    meta1:'24/7 service', meta2:'Websites, marketing and systems', meta3:'Built for your business',
    heroStats:[{n:'11+',l:'years in business'},{n:'24/7',l:'service and availability'}],
    workKicker:'Work', workTitle:'Featured Projects', workSub:'Client work, products I have built, and demos that show what is possible.',
    galleryKicker:'Up close', scrollArrow:'',
    buildKicker:'What I build', buildSub:'We start with what is most urgent, usually replying to customers, and connect the rest.', servicesCta:'Full details', servicesCtaAudit:'Free fit check',
    aboutKicker:'Who I am', aboutTitle:'Nice to meet you, I am Shani', stat1:'years in business', stat2:'response time',
    contactTitle:'What would you like to work better?',
    contactSub:'Tell me what is happening in your business and what is getting in the way. The free fit check helps us decide what to improve. No technical knowledge or ready-made solution needed.',
    // These were reversed against the Hebrew, which meant the free-audit CTA —
    // the site's main lead funnel — vanished entirely in English.
    contactCta1:'Free fit check', contactCta2:'Message me on WhatsApp',
    footer:'Built in Israel',
    marqueeItems:['Chatbots','AI agents','Modular CRM','Websites','Automations','Israel · US'],
    homeAboutTitle:'Who we are',
    homeAboutText:'We are a team that provides a complete technology service package for running your business: websites, bots, agents, visuals, automations and AI-integrated systems.',
    homeServicesTitle:'Services',
    homeServices:[
      {key:'websites', title:'Websites', text:'Websites built in code, fast and mobile-ready, structured for Google and AI search, and connected to WhatsApp and your systems.', href:'/websites'},
      {key:'bots', title:'Bots and agents', text:'Answer customers on your site and WhatsApp, qualify enquiries and book meetings, even when you are busy', href:'/chatbots'},
      {key:'visual', title:'Visuals', text:'AI visuals and videos: products, catalogs and content that updates, without a new shoot every time.', href:'/ai-visual-content'},
      {key:'automations', title:'Automations', text:'Automations that save time: the enquiry is saved, confirmations and reminders go out, with no manual copying.', href:'/automations'},
      {key:'crm', title:'AI-integrated systems', text:'A modular CRM: every enquiry and conversation in one place, with the option to connect to your own CRM or another interface.', href:'/crm'},
    ],
    homeStartTitle:'How to start',
    homeStartSteps:[
      {title:'Specification', text:'A short conversation about the business and what should work better'},
      {title:'Build', text:'A website, bot, visual, automation or system, based on what you need'},
      {title:'Launch', text:'Connecting to WhatsApp and your systems'},
    ],
    processTitle: 'How we get started and move forward',
    processIntro: 'A clear process. You do not need to know which website, system or tool to ask for.',
    processSteps: [
      { title: 'Business specification', text: 'Every project starts with a specification. You complete the free fit check, and together we map how your business works, what slows you down and what to build first.' },
      { title: 'Agree on the work', text: 'Based on the specification, you receive a clear proposal covering what will be built, how it connects and the timeline. Work starts after we agree.' },
      { title: 'Connect and test', text: 'I build what we agreed and test the journey from an enquiry to its follow-up. We then go through how to use the system and what ongoing maintenance involves.' },
    ],
    aboutParas:[
      'I have been in business for 11 years, so I know where time burns and where enquiries slip away.',
      'Today I build chatbots, AI agents and systems for businesses in Israel and the US, and we keep growing.'
    ],
    services:[
      {no:'01', title:'AI chatbots and agents', short:'Answer customers on your site and WhatsApp, qualify enquiries and book meetings, even when you are busy', desc:'A chatbot, an AI agent or a voice bot that understands the conversation, replies in your tone and hands you only what needs a person.'},
      {no:'02', title:'A modular CRM', short:'Every customer and enquiry in one place, in modules that fit a small business or a large organisation', desc:'A CRM built around how your business works, that grows with you.'},
      {no:'03', title:'Websites', short:'A fast website that explains what you do and leads to an enquiry', desc:'A website that explains your offer and makes getting in touch easy. Mobile-friendly, with the foundations for Google search.'},
      {no:'04', title:'Automations', short:'Repetitive work happens by itself: enquiry details are saved, confirmations and reminders are sent', desc:'Recurring tasks happen automatically and connect the tools you already use.'},
      {no:'05', title:'AI visual content', short:'Product visualizations, videos and a catalog that updates, with no reshoots', desc:'Show the client the product before it is assembled: visualizations in your brand style, short videos and a catalog for every season.'}
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
