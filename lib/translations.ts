// ─── SHANI AI · המילון הדו-לשוני היחיד של האתר ───
// זהו מקור האמת היחיד לכל טקסט באתר. עד 17/08/2026 היו כאן שלוש מערכות
// שפה מקבילות (lib/i18n.ts, lib/lang-context.tsx וכאן), והן אוחדו לקובץ הזה.
// אל תיצרו מילון נוסף — הוסיפו מפתח כאן, בשתי השפות.

export type Lang = "he" | "en";

export const dirOf = (l: Lang): "rtl" | "ltr" => (l === "he" ? "rtl" : "ltr");

export const dict = {
  he: {
    dir: 'rtl' as const,
    navWork:'פרויקטים', navBuild:'מה אני בונה', navAbout:'עליי', navProcess:'תהליך', navTestimonials:'המלצות', navGuides:'מדריכים', navCta:'בואו נדבר',
    navPricing:'מחירים', navWebsites:'אתרים', navAutomations:'אוטומציות', navConsulting:'ייעוץ AI', navServices:'שירותים',
    // תוויות נגישות לניווט — נקראות ע"י קוראי מסך, ולכן חייבות להיות בשפת הממשק
    navAriaMain:'ניווט ראשי', navAriaHome:'שני גורגוב — לדף הבית', navAriaMobileMenu:'תפריט ניווט',
    navAriaMenuOpen:'פתיחת תפריט', navAriaMenuClose:'סגירת תפריט',
    navAriaSwitchEn:'מעבר לאנגלית', navAriaSwitchHe:'מעבר לעברית',
    footerSeo:'בונה אתרים, אוטומציות וכלי AI לעסקים בתל אביב, רמת גן, הרצליה, ירושלים, חיפה, באר שבע והשרון, ואונליין בכל הארץ.',
    role:'SHANI AI CREATOR',
    // ה-H1 הקודם, "יוצרת פתרונות טכנולוגיים לעסקים", תיאר קטגוריה ולא תוצאה,
    // ולא הכיל אף מילת מפתח שמישהו מחפש. החדש אומר מה הלקוח מקבל.
    heroTitle:'אתר שמביא פניות, ומערכת שעונה להן במקומכם',
    heroSub:'אני בונה לעסקים קטנים בישראל אתרים, אוטומציות וכלי AI בעברית טבעית. מתחילים באבחון חינם שמסמן מה שווה לתקן קודם, וכל המחירים פתוחים כאן באתר.',
    // טריאז': שלוש דלתות כניסה, כדי שמבקר חדש לא יצטרך לנחש מאיפה מתחילים.
    triageTitle:'מה מביא אתכם לכאן?',
    triage:[
      {label:'רוצים אתר שמביא פניות', href:'/websites'},
      {label:'רוצים מערכת שחוסכת זמן', href:'/automations'},
      {label:'לא בטוחים מאיפה להתחיל', href:'/audit'}
    ],
    heroCta1:'לצפייה בפרויקטים', heroCta2:'בואו נדבר',
    auditCtaPrefix:'לא בטוחים מאיפה להתחיל?', auditCtaLink:'התחילו עם אבחון AI',
    meta1:'ישראל', meta2:'תגובה תוך 24 שעות', meta3:'פיתוח מבוסס AI',
    workKicker:'04 · עבודות', workTitle:'פרויקטים נבחרים', workSub:'עבודות לקוח, מוצרים שבניתי, והדגמות טכניות שמראות מה אפשרי.',
    galleryKicker:'מבט מקרוב', galleryTitle:'', scrollHint:'המשיכו לגלול', scrollArrow:'',
    buildKicker:'01 · מה אני בונה', buildTitle:'שלושה דברים, כל אחד פותר בעיה אחרת', buildSub:'מתחת לכל כרטיס כתוב למי הוא מתאים, ואם אתם עדיין מתלבטים, זו בדיוק השאלה שהאבחון החינם עונה עליה.', servicesCta:'שלחו לי הודעה',
    problemKicker:'01 · לפני שמדברים על פתרונות',
    problemTitle:'פניות נופלות בין הכיסאות',
    problemLines:[
      'וואטסאפ, אינסטגרם, טלפון, טופס באתר, כל אחד פונה במקום אחר, ואתם צריכים לזכור למי עניתם ולמי עוד לא',
      'אחרי כמה ימים מתברר שמישהו לא קיבל תשובה, ובדרך כלל דווקא מי שהיה הכי קרוב לסגור',
      'ולא בגלל שאתם לא מסודרים, פשוט אין מספיק שעות ביום.'
    ],
    journeyKicker:'03 · איך זה מתחבר',
    journeyTitle:'שלושה שלבים, לא שלושה מוצרים',
    journeySub:'אפשר להתחיל בכל שלב, אבל זה הסדר שמחזיר הכי הרבה זמן.',
    journeySteps:[
      {no:'01', title:'ייעוץ', desc:'מבינים מה שבור ומה שווה לתקן קודם.', href:'/ai-consulting'},
      {no:'02', title:'אוטומציות', desc:'מתקנים את מה שגוזל הכי הרבה זמן.', href:'/automations'},
      {no:'03', title:'אתר', desc:'נותנים לזה חזית שמביאה פניות חדשות.', href:'/websites'}
    ],
    priceKicker:'08 · כמה זה עולה',
    priceTitle:'המחירים מפורסמים, תמיד',
    priceSub:'המחיר שמופיע במחירון הוא המחיר, בלי תוספות שמתגלות בסוף.',
    priceItems:[
      {label:'דף נחיתה', price:'1,500 ₪'},
      {label:'אתר עסקי', price:'2,400 ₪'},
      {label:'מערכת AI מלאה', price:'7,900 ₪'}
    ],
    priceCta:'למחירון המלא',
    aboutKicker:'05 · מי אני', aboutTitle:'עליי', stat1:'שנות ניסיון עסקי', stat2:'זמן תגובה',
    processKicker:'02 · איך זה עובד', processTitle:'מהפנייה ועד שזה רץ', processSub:'הצעד הראשון לא עולה כלום, ובכל שלב אתם יודעים בדיוק איפה הדברים עומדים.',
    contactTitle:'בואו נבנה משהו מעולה',
    contactSub:'רוצים להכניס AI לעסק, לבנות אוטומציה שתחסוך לכם שעות, או להקים אתר שמביא לקוחות? בואו נדבר.',
    contactCta1:'אבחון חינם לעסק שלכם', contactCta2:'דברו איתי בוואטסאפ',
    footer:'נבנה באהבה בישראל',
    marqueeItems:['ייעוץ ותכנון','אוטומציות','אתרים','עברית טבעית','מבוססת בישראל','מענה תוך 24 שעות'],
    aboutParas:[
      '10 שנים ניהלתי עסק משלי, אז אני יודעת בדיוק איפה נשרף הזמן בעסק, מה מזיז את העסק קדימה ומה רק מרגיש דחוף, ואיפה הטכנולוגיה יכולה לקחת מכם את העבודה השחורה.',
      'היום אני מלמדת עסקים לעבוד עם AI בעברית טבעית, בונה אוטומציות וכלים מותאמים, ומנהלת את כל התהליך מהמיפוי ועד שזה רץ לבד, כולל אתרים כשצריך.',
      'הכל מבוסס AI ופיתוח מודרני: מהר, מדויק ובמחיר שמתאים לעסקים קטנים ובינוניים שרוצים תוצאות, לא הבטחות.'
    ],
    // סדר הכרטיסים הוא לפי מה שכבר נמכר ויש לו הוכחות, ולא לפי סדר התהליך.
    // סדר התהליך מופיע בנפרד ב-journeySteps.
    services:[
      {no:'01', title:'אתרים שמקדמים את העסק', subtitle:'אתר שמביא פניות, לא רק נראה טוב', desc:'אני בונה אתר מהיר שמותאם למובייל, מחובר לוואטסאפ ובנוי נכון לקידום בגוגל, והקוד נמסר לכם בסיום בלי התחייבות מתמשכת.', fit:'אין לכם אתר, או שיש אחד שלא מביא כלום', anchor:'אתר עסקי מ-2,400 ₪'},
      {no:'02', title:'מערכות שחוסכות לכם זמן', subtitle:'הפניות מסתדרות לבד', desc:'המערכת קולטת כל פנייה, מסווגת אותה, שולחת מענה ראשוני ומרכזת את הפרטים במקום אחד, כך שאתם רואים בכל רגע מי מחכה לתשובה.', fit:'אתם עונים על אותן שאלות שוב ושוב, או מפספסים פניות בערב', anchor:'מתחבר לכלים שכבר יש בעסק'},
      {no:'03', title:'ייעוץ ותכנון לעסק', subtitle:'תוכנית עבודה ברורה, לא רשימת רעיונות', desc:'אני נכנסת לעסק, מפרקת את השבוע שלכם למשימות ומסמנת מה גוזל הכי הרבה זמן, ובסוף התהליך יש בידיים שלכם סדר עדיפויות עם הערכת חיסכון לכל סעיף.', fit:'אתם רוצים להכניס טכנולוגיה לעסק, אבל לא יודעים מה שווה את הכסף ומה סתם צעצוע', anchor:'אבחון ראשוני ללא עלות'}
    ],
    // הפרויקטים עברו ל-lib/projects.ts, שהוא מקור האמת היחיד לתיק העבודות.
    faqKicker:'06 · שאלות נפוצות', faqTitle:'כל מה שרציתם לדעת',
    faqItems:[
      {q:'מה אם לא אהיה מרוצה מהתוצאה?', a:'העבודה מלווה אתכם לאורך כל הדרך: מגדירים ביחד את הכיוון, ואני מציגה גרסאות לאישור בכל שלב, כך שאין הפתעות בסוף. כל פרויקט כולל שני סבבי שינויים, ואם צריך עוד, סבב נוסף עולה 350 ₪ ומתומחר מראש. המטרה שלי היא שתצאו עם נכס שאתם גאים בו, לא רק "לסמן וי".'},
      {q:'למה אתר אצלך יותר יקר מוויקס או אלמנטור?', a:'כי זה לא אותו מוצר. תבנית וויקס נראית כמו עוד תבנית, נטענת לאט ומוגבלת ב-SEO. אני בונה קוד קאסטום Next.js, מהיר, עם Lighthouse גבוה, מבנה SEO מלא, אנימציות קולנועיות, ובעלות מלאה שלכם על הקוד, בלי דמי מנוי כפויים. ומעל הכל, אני מחברת אוטומציות ו-AI שאף תבנית לא נותנת. משלמים יותר, מקבלים נכס שמחזיר את עצמו.'},
      {q:'לא בטוחים מאיפה להתחיל?', a:'מתחילים עם אבחון AI חינם, שיחה ממוקדת שבסיומה תקבלו תוכנית עבודה ברורה: מה להטמיע, באיזה סדר, ואילו כלים ואוטומציות יחסכו לכם הכי הרבה זמן, בלי התחייבות.'}
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
    trusted:{ label:'עבדתי עם' },
    leadMagnet:{
      kicker:'מתנה',
      title:'5 פרומפטים שחוסכים לעסק 5 שעות בשבוע',
      sub:'הפרומפטים שאני משתמשת בהם כל שבוע לכתיבת תוכן, מענה ללקוחות ותמחור, השאירו אימייל ואשלח לכם אותם חינם.',
      placeholder:'האימייל שלכם',
      button:'שלחו לי את הפרומפטים',
      success:'מעולה! הפרומפטים בדרך אליכם למייל 🎁',
      privacy:'בלי ספאם. אפשר להסיר את עצמכם בכל רגע.'
    },
    ctaStrip:'לא בטוחים מאיפה להתחיל? שיחת מיפוי ראשונה, ללא עלות.',
    ctaStripBtn:'דברו איתי בוואטסאפ',
    // ההמלצות הפיקטיביות שהיו כאן נמחקו — הן לא רונדרו בשום מקום.
    //   מה שמוצג בפועל הוא components/TestimonialsSection.tsx עם לקוחות אמיתיים.
    roi: {
      label: 'כמה זמן אתם מבזבזים?',
      title: 'חשבו כמה שווה הזמן שלך',
      hoursLabel: 'שעות עבודה ידנית בשבוע',
      hoursUnit: 'שעות',
      rateLabel: 'שווי שעת העבודה שלך (₪)',
      resultPre: 'אוטומציה יכולה לחסוך לך',
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
    navWork:'Work', navBuild:'What I build', navAbout:'About', navProcess:'Process', navTestimonials:'Reviews', navGuides:'Guides', navCta:"Let's talk",
    navPricing:'Pricing', navWebsites:'Websites', navAutomations:'Automations', navConsulting:'AI Consulting', navServices:'Services',
    // Accessible names for the nav — announced by screen readers, so they follow the UI language
    navAriaMain:'Main navigation', navAriaHome:'Shani Gorgov — home', navAriaMobileMenu:'Navigation menu',
    navAriaMenuOpen:'Open menu', navAriaMenuClose:'Close menu',
    navAriaSwitchEn:'Switch to English', navAriaSwitchHe:'Switch to Hebrew',
    footerSeo:'Building websites, automations and AI tools for businesses in Tel Aviv, Ramat Gan, Herzliya, Jerusalem, Haifa, Beer Sheva and the Sharon — and online across Israel.',
    role:'SHANI AI CREATOR',
    heroTitle:'A website that brings enquiries, and a system that answers them for you',
    heroSub:'I build websites, automations and Hebrew-native AI tools for small businesses in Israel. We start with a free audit that flags what is worth fixing first, and every price is published right here on the site.',
    triageTitle:'What brings you here?',
    triage:[
      {label:'I want a site that brings enquiries', href:'/websites'},
      {label:'I want a system that saves me time', href:'/automations'},
      {label:"I'm not sure where to start", href:'/audit'}
    ],
    heroCta1:'View Projects', heroCta2:"Let's Talk",
    auditCtaPrefix:'Not sure where to start?', auditCtaLink:'Begin with an AI Audit',
    meta1:'Israel', meta2:'Replies within 24h', meta3:'AI-assisted development',
    workKicker:'04 · Work', workTitle:'Featured Projects', workSub:'AI systems, automations, digital products and websites I have built for businesses.',
    galleryKicker:'Up close', galleryTitle:'', scrollHint:'Keep scrolling', scrollArrow:'',
    buildKicker:'01 · What I build', buildTitle:'Three things, each solving a different problem', buildSub:'Under every card it says who it is for, and if you are still unsure, that is exactly the question the free audit answers.', servicesCta:'Send me a message',
    problemKicker:'01 · Before we talk solutions',
    problemTitle:'Enquiries slip through the cracks',
    problemLines:[
      'WhatsApp, Instagram, the phone, the form on your site — everyone reaches you somewhere different, and you have to remember who you answered and who you did not',
      'A few days later you find out someone never got a reply, and it is usually whoever was closest to buying',
      'And it is not that you are disorganised — there simply are not enough hours in the day.'
    ],
    journeyKicker:'03 · How it fits together',
    journeyTitle:'Three stages, not three products',
    journeySub:'You can start at any stage, but this is the order that gives back the most time.',
    journeySteps:[
      {no:'01', title:'Consulting', desc:'Work out what is broken and what is worth fixing first.', href:'/ai-consulting'},
      {no:'02', title:'Automations', desc:'Fix whatever is eating the most time.', href:'/automations'},
      {no:'03', title:'Website', desc:'Give it a front door that brings in new enquiries.', href:'/websites'}
    ],
    priceKicker:'08 · What it costs',
    priceTitle:'Prices are always published',
    priceSub:'The price on the list is the price, with no extras that show up at the end.',
    priceItems:[
      {label:'Landing page', price:'₪1,500'},
      {label:'Business website', price:'₪2,400'},
      {label:'Full AI system', price:'₪7,900'}
    ],
    priceCta:'See the full price list',
    aboutKicker:'05 · Who I am', aboutTitle:'About', stat1:'years in business', stat2:'response time',
    processKicker:'05 · How I work', processTitle:'From idea to product', processSub:'A clear five-step process — you stay involved the whole way.',
    contactTitle:"Let's Build Something Great",
    contactSub:"Want to bring AI into your business, build an automation that saves you hours, or launch a website that brings clients in? Let's talk.",
    // These were reversed against the Hebrew, which meant the free-audit CTA —
    // the site's main lead funnel — vanished entirely in English.
    contactCta1:'A free audit for your business', contactCta2:'Message me on WhatsApp',
    footer:'Made with care in Israel',
    marqueeItems:['AI consulting','Automations','Hebrew Skills','Content systems','Websites','Based in Israel'],
    aboutParas:[
      'I ran my own business for 10 years, so I know exactly where time gets wasted, what actually moves the needle, and where technology can take the grunt work off your plate.',
      'Today I teach businesses to work with AI in real Hebrew, build custom automations and tools, and manage the whole process from mapping to running on its own — websites included when you need one.',
      'It is all powered by AI and modern development: fast, precise, and at a price that works for small and mid-size businesses that want results, not promises.'
    ],
    services:[
      {no:'01', title:'Websites that grow the business', subtitle:'A site that brings enquiries, not just good looks', desc:'I build a fast, mobile-ready site that is wired to WhatsApp and structured properly for Google, and the code is handed over to you at the end with no ongoing commitment.', fit:'You have no website, or one that brings nothing in', anchor:'Business site from ₪2,400'},
      {no:'02', title:'Systems that save you time', subtitle:'Enquiries sort themselves out', desc:'The system captures every enquiry, classifies it, sends a first response and gathers the details in one place, so you can see at any moment who is still waiting.', fit:'You answer the same questions again and again, or miss enquiries in the evening', anchor:'Connects to the tools you already use'},
      {no:'03', title:'Consulting & planning', subtitle:'A clear action plan, not a list of ideas', desc:'I get inside the business, break your week down into tasks and mark what eats the most time, and you come out of it holding a priority list with an estimated time saving for each item.', fit:'You want technology in the business but cannot tell what is worth the money and what is a toy', anchor:'First audit is free'}
    ],
    // Projects live in lib/projects.ts — the single source of truth for the portfolio.
    faqKicker:'06 · FAQ', faqTitle:'Everything you need to know',
    faqItems:[
      {q:"What if I'm not happy with the result?", a:'The work involves you the whole way: we define the direction together and I present versions for approval at every stage, so there are no surprises at the end. Every project includes two revision rounds, and an extra round is ₪350, priced upfront. My goal is for you to walk away with an asset you\'re proud of, not just a box ticked.'},
      {q:'Why is a site with you pricier than Wix or Elementor?', a:"Because it isn't the same product. A Wix template looks like another template, loads slowly and is limited on SEO. I build custom Next.js code, fast, with a high Lighthouse score, real SEO, cinematic animation, and full ownership of the code, with no forced subscription. Above all, I wire in automations and AI no template can give you. You pay more, and you get an asset that pays for itself."},
      {q:'Is there a long-term commitment?', a:'A one-off project has no ongoing commitment: we finish and the code is yours. Shani Care has no commitment either: you can stop any month and the site keeps working. If you prefer, you just reach out when you need something and get a quote for that job.'},
      {q:'Not sure where to start?', a:'Start with a free AI Audit, a focused session that ends with a clear action plan: what to implement, in what order, and which tools and automations will save you the most time. No commitment.'}
    ],
    steps:[
      {n:'01', title:'Free audit', desc:'A short form about the business and the recurring tasks — no cost and no commitment.'},
      {n:'02', title:'An answer within one working day', desc:'I come back with two or three concrete suggestions for what is worth building, and a short intro call.'},
      {n:'03', title:'A proposal with a final price', desc:'Exactly what gets built, what it costs and the timeline, based on the public price list — no surprises.'},
      {n:'04', title:'Building with your approval', desc:'I build, you review versions and approve — two revision rounds included.'},
      {n:'05', title:'Live, with two months of Shani Care', desc:'Fixes, updates and tracking of incoming enquiries are included for the first two months; then you decide whether to continue.'}
    ],
    processPriceLine:'All prices are published up front: landing page from ₪1,500, business website from ₪2,400, systems and automations from ₪1,400.',
    processPriceCta:'See the full price list',
    trusted:{ label:'Worked with' },
    leadMagnet:{
      kicker:'Free gift',
      title:'5 prompts that save your business 5 hours a week',
      sub:'The prompts I use every week: content writing, client replies, pricing and more. Leave your email and I\'ll send them to you free.',
      placeholder:'Your email',
      button:'Send me the prompts',
      success:'Awesome! The prompts are on their way to your inbox 🎁',
      privacy:'No spam. Unsubscribe anytime.'
    },
    ctaStrip:'Not sure where to start? The first mapping session is free.',
    ctaStripBtn:'Chat on WhatsApp',
    // ההמלצות הפיקטיביות שהיו כאן נמחקו — הן לא רונדרו בשום מקום.
    //   מה שמוצג בפועל הוא components/TestimonialsSection.tsx עם לקוחות אמיתיים.
    roi: {
      label: 'How much time are you losing?',
      title: 'See what your time is worth',
      hoursLabel: 'Manual work hours per week',
      hoursUnit: 'hrs',
      rateLabel: 'Your hourly value (₪)',
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
