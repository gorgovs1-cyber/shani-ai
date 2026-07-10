export const dict = {
  he: {
    dir: 'rtl' as const,
    navWork:'פרויקטים', navBuild:'מה אני בונה', navAbout:'עליי', navProcess:'תהליך', navTestimonials:'המלצות', navGuides:'מדריכים', navCta:'בואו נדבר',
    navPricing:'מחירים', navWebsites:'אתרים', navAutomations:'אוטומציות', navConsulting:'ייעוץ AI', navServices:'שירותים',
    footerSeo:'בונה אתרים, אוטומציות וכלי AI לעסקים בתל אביב, רמת גן, הרצליה, ירושלים, חיפה, באר שבע והשרון — ואונליין בכל הארץ.',
    role:'SHANI AI CREATOR',
    heroTitle:'מכניסה AI לעסק שלכם, בלי כאב ראש.',
    heroSub:'אני ממפה איפה AI יחסוך לכם הכי הרבה זמן, בונה לכם אוטומציות שעובדות 24/7, כלים וסקילים בעברית שמתאימים בדיוק לעסק, וגם אתרים שמביאים לקוחות. פחות עומס, יותר תוצאות.',
    heroCta1:'לצפייה בפרויקטים', heroCta2:'בואו נדבר',
    auditCtaPrefix:'לא בטוחים מאיפה להתחיל?', auditCtaLink:'התחילו עם אבחון AI ←',
    meta1:'ישראל', meta2:'תגובה תוך 24 שעות', meta3:'פיתוח מבוסס AI',
    workKicker:'01 · עבודות', workTitle:'פרויקטים נבחרים', workSub:'מערכות AI, אוטומציות, מוצרים דיגיטליים ואתרים שבניתי לעסקים.',
    galleryKicker:'מבט מקרוב', galleryTitle:'', scrollHint:'המשיכו לגלול', scrollArrow:'←',
    buildKicker:'02 · מה אני בונה', buildTitle:'AI שעובד בשבילכם.', buildSub:'אסטרטגיה, אוטומציות, כלים, וגם אתר. כל מה שצריך כדי שהעסק ירוץ חכם יותר.', servicesCta:'שלחו לי הודעה',
    aboutKicker:'03 · עליי', aboutTitle:'עליי', stat1:'שנות ניסיון עסקי', stat2:'זמן תגובה',
    processKicker:'04 · איך אני עובדת', processTitle:'מרעיון למוצר.', processSub:'תהליך ברור בחמישה שלבים, את מעורבת לאורך כל הדרך.',
    contactTitle:'בואו נבנה משהו מעולה',
    contactSub:'רוצים להכניס AI לעסק, לבנות אוטומציה שתחסוך לכם שעות, או להקים אתר שמביא לקוחות? בואו נדבר.',
    contactCta1:'דברו איתי בוואטסאפ', contactCta2:'שלחו לי מייל',
    footer:'נבנה באהבה בישראל',
    marqueeItems:['ייעוץ AI','אוטומציות','סקילים בעברית','מערכות תוכן','אתרים','מבוססת בישראל'],
    aboutParas:[
      '10 שנים ניהלתי עסק משלי, אז אני יודעת בדיוק איפה נשרף הזמן בעסק, מה באמת מזיז את המחט, ואיפה הטכנולוגיה יכולה לקחת מכם את העבודה השחורה.',
      'היום אני מלמדת עסקים לעבוד עם AI בעברית אמיתית, בונה אוטומציות וכלים מותאמים, ומנהלת את כל התהליך מהמיפוי ועד שזה רץ לבד, כולל אתרים כשצריך.',
      'הכל מבוסס AI ופיתוח מודרני: מהר, מדויק ובמחיר שמתאים לעסקים קטנים ובינוניים שרוצים תוצאות, לא הבטחות.'
    ],
    services:[
      {no:'01', title:'AI Audit', subtitle:'מיפוי ואסטרטגיית AI לעסק', desc:'נשב לשיחה ממוקדת, נמפה את כל התהליכים שלכם ונזהה איפה בדיוק בורח הזמן. בסוף תצאו עם תוכנית עבודה ברורה: מה להטמיע, באיזה סדר, ואילו כלים יחזירו לכם הכי הרבה שעות.'},
      {no:'02', title:'AI Tools & Automations', subtitle:'כלים, סקילים ואוטומציות שעובדים בשבילכם', desc:'אני בונה לכם כלי AI, מערכות פרומפטים וסקילים בעברית אמיתית, ומחברת אותם לאוטומציות שמטפלות בלידים, בתוכן ובמיילים לבד, כך שהטכנולוגיה עושה את העבודה השחורה 24/7, בדיוק בשפה ובסגנון של העסק שלכם.'},
      {no:'03', title:'Cinematic Website', subtitle:'אתר שמביא לקוחות, לא רק נראה טוב', desc:'כשצריך נוכחות דיגיטלית, אני בונה אתר חכם ומהיר עם אנימציות קולנועיות, שממצב את המותג שלכם ברמה של החברות הגדולות והופך מבקרים ללקוחות.'}
    ],
    projects:[
      {title:'AI Lead Machine', kind:'אוטומציה', mono:'A', url:'https://shani-ai.com/audit', desc:'מכונת לידים מקצה לקצה: טופס אבחון חכם, אוטומציית n8n, CRM ומנוע Claude שכותב תכנית והצעת מחיר לכל פנייה. מענה תוך שניות, 24/7.', tags:['Automation','n8n','Claude']},
      {title:'My Money', kind:'מוצר אישי', mono:'M', url:'https://my-money-app-shani7.vercel.app/', desc:'פלטפורמה לניהול פיננסי שבניתי לעצמאיות ובעלות עסקים קטנים.', tags:['Web App','Finance','AI']},
      {title:'Lilach Hazan', kind:'פרויקט לקוח', mono:'L', url:'https://www.lilachhazan.com/', desc:'אתר עסקי מקצועי שבניתי עבור לילך חזן.', tags:['Website','Client Work']},
      {title:'Rox', kind:'פרויקט הדגמה', mono:'R', url:'https://meridian-watch-eight.vercel.app/', desc:'חוויית איקומרס למותג שעוני יוקרה.', tags:['Ecommerce','Design']},
      {title:'Solis', kind:'פרויקט הדגמה', mono:'S', url:'https://solis-orange.vercel.app/', desc:'חוויית מותג למשקה פרימיום.', tags:['Brand Experience','Design']}
    ],
    faqKicker:'07 · שאלות נפוצות', faqTitle:'כל מה שרציתם לדעת.',
    faqItems:[
      {q:'כמה עולה לבנות אתר או אוטומציה לעסק?', a:'דף נחיתה קולנועי מתחיל ב-₪2,400, אתר תדמית מלא מ-₪6,500, ומערכת AI שלמה מ-₪12,000. אוטומציה בודדת מ-₪1,500 ובוט וואטסאפ מ-₪1,200. יש גם מנוי חודשי מ-₪390. כל המחירים לפני מע"מ, ובדף המחירים יש פירוט מלא. לא בטוחים מה מתאים? האבחון החינמי ימליץ.'},
      {q:'כמה זמן לוקח לבנות?', a:'דף נחיתה מוכן תוך 7 עד 10 ימים, אתר תדמית תוך שבועיים עד שלושה, ופרויקטים מורכבים עד 4 שבועות. אני עובדת בפיתוח מבוסס-AI, כך שהמסירה מהירה משמעותית מהתעשייה בלי להתפשר על האיכות. לכל חבילה זמן מסירה מוגדר מראש.'},
      {q:'מה אם לא אהיה מרוצה מהתוצאה?', a:'העבודה מלווה אתכם לאורך כל הדרך: מגדירים ביחד את הכיוון, ואני מציגה גרסאות לאישור בכל שלב, כך שאין הפתעות בסוף. כל חבילה כוללת סבבי שינויים, ואם צריך עוד, אפשר להוסיף. המטרה שלי היא שתצאו עם נכס שאתם גאים בו, לא רק "לסמן וי".'},
      {q:'למה אתר אצלך יותר יקר מוויקס או אלמנטור?', a:'כי זה לא אותו מוצר. תבנית וויקס נראית כמו עוד תבנית, נטענת לאט ומוגבלת ב-SEO. אני בונה קוד קאסטום Next.js, מהיר, עם Lighthouse גבוה, SEO אמיתי, אנימציות קולנועיות, ובעלות מלאה שלכם על הקוד, בלי דמי מנוי כפויים. ומעל הכל, אני מחברת אוטומציות ו-AI שאף תבנית לא נותנת. משלמים יותר, מקבלים נכס שמחזיר את עצמו.'},
      {q:'האם יש התחייבות לטווח ארוך?', a:'בפרויקט חד-פעמי אין שום התחייבות מתמשכת, מסיימים ואתם חופשיים עם הקוד שלכם. מנוי Shani Care הוא חודשי בלבד, עם ביטול בהתראה של 30 יום. אתם בשליטה מלאה.'},
      {q:'לא בטוחים מאיפה להתחיל?', a:'מתחילים עם אבחון AI חינם, שיחה ממוקדת שבסיומה תקבלו תוכנית עבודה ברורה: מה להטמיע, באיזה סדר, ואילו כלים ואוטומציות יחסכו לכם הכי הרבה זמן, בלי התחייבות.'}
    ],
    steps:[
      {n:'01', title:'גילוי', desc:'מבינים את העסק, הקהל והמטרה.'},
      {n:'02', title:'אסטרטגיה', desc:'מגדירים מה בונים ובאיזה סדר.'},
      {n:'03', title:'עיצוב', desc:'בונים שפה ויזואלית וחוויית משתמש.'},
      {n:'04', title:'בנייה מואצת', desc:'מפתחים בשיטות עבודה מתקדמות ובסיוע AI, מה שמאפשר לנו לספק מוצר מושלם, קוד נקי ותנועה חלקה תוך ימים ספורים.'},
      {n:'05', title:'שיגור', desc:'עולים לאוויר, מודדים ומשפרים.'}
    ],
    trusted:{ label:'עבדתי עם' },
    leadMagnet:{
      kicker:'מתנה',
      title:'5 פרומפטים שחוסכים לעסק 5 שעות בשבוע',
      sub:'הפרומפטים שאני משתמשת בהם כל שבוע: כתיבת תוכן, מענה ללקוחות, תמחור ועוד. השאירו אימייל ואשלח לכם אותם חינם.',
      placeholder:'האימייל שלכם',
      button:'שלחו לי את הפרומפטים',
      success:'מעולה! הפרומפטים בדרך אליכם למייל 🎁',
      privacy:'בלי ספאם. אפשר להסיר את עצמכם בכל רגע.'
    },
    ctaStrip:'לא בטוחים מאיפה להתחיל? שיחת מיפוי ראשונה, ללא עלות.',
    ctaStripBtn:'דברו איתי בוואטסאפ ←',
    testimonials:{
      label:'06 · המלצות',
      title:'מה לקוחות אומרות.',
      items:[
        {
          quote:'שני לימדה אותי לדבר עם AI בעברית אמיתית. חודש של תוכן הפך להיות עניין של שעתיים. לא האמנתי שזה אפשרי.',
          name:'מיכל ר.',
          role:'מאמנת עסקית | תל אביב'
        },
        {
          quote:'הייתי חושבת ש-AI זה לא בשבילי. אחרי שיחה אחת עם שני, שיניתי את כל הדרך שאני עובדת. פרומפטים שמתאימים בדיוק לעסק שלי.',
          name:'דנה כ.',
          role:'מעצבת גרפית | ירושלים'
        },
        {
          quote:'ה-Skill לעברית שבנתה שני שינה את חיי. Claude עכשיו כותב לי עברית כמו ישראלי אמיתי, לא עוד תרגומים מוזרים.',
          name:'נועה ש.',
          role:'בעלת חנות בוטיק | הרצליה'
        },
        {
          quote:'ה-ROI פשוט ברור: בשיחה אחת חסכתי לפחות 10 שעות עבודה בחודש. שני יודעת לזהות בדיוק איפה AI יכול לעזור לעסק שלך.',
          name:'לירון מ.',
          role:'יועצת שיווק עצמאית | רמת גן'
        }
      ]
    }
  },
  en: {
    dir: 'ltr' as const,
    navWork:'Work', navBuild:'What I build', navAbout:'About', navProcess:'Process', navTestimonials:'Reviews', navGuides:'Guides', navCta:"Let's talk",
    navPricing:'Pricing', navWebsites:'Websites', navAutomations:'Automations', navConsulting:'AI Consulting', navServices:'Services',
    footerSeo:'Building websites, automations and AI tools for businesses in Tel Aviv, Ramat Gan, Herzliya, Jerusalem, Haifa, Beer Sheva and the Sharon — and online across Israel.',
    role:'SHANI AI CREATOR',
    heroTitle:'Bring AI into your business, without the headache.',
    heroSub:'I map where AI will save you the most time, build automations that run 24/7, create custom AI tools and Hebrew Skills that fit your business exactly, and yes, websites that bring clients in. Less workload, more results.',
    heroCta1:'View Projects', heroCta2:"Let's Talk",
    auditCtaPrefix:'Not sure where to start?', auditCtaLink:'Begin with an AI Audit →',
    meta1:'Israel', meta2:'Replies within 24h', meta3:'AI-assisted development',
    workKicker:'01 · Work', workTitle:'Featured Projects', workSub:'AI systems, automations, digital products and websites I have built for businesses.',
    galleryKicker:'Up close', galleryTitle:'', scrollHint:'Keep scrolling', scrollArrow:'→',
    buildKicker:'02 · What I build', buildTitle:'AI that works for you.', buildSub:'Strategy, automations, custom tools, and a website too. Everything to make your business run smarter.', servicesCta:'Send me a message',
    aboutKicker:'03 · About', aboutTitle:'About', stat1:'years in business', stat2:'response time',
    processKicker:'04 · How I work', processTitle:'From idea to a product.', processSub:'A clear five-step process, you stay involved the whole way.',
    contactTitle:"Let's Build Something Great",
    contactSub:"Want to bring AI into your business, build an automation that saves you hours, or launch a website that brings clients in? Let's talk.",
    contactCta1:'Message me on WhatsApp', contactCta2:'Send me an email',
    footer:'Made with care in Israel',
    marqueeItems:['AI consulting','Automations','Hebrew Skills','Content systems','Websites','Based in Israel'],
    aboutParas:[
      'I ran my own business for 10 years, so I know exactly where time gets wasted, what actually moves the needle, and where technology can take the grunt work off your plate.',
      'Today I teach businesses to work with AI in real Hebrew, build custom automations and tools, and manage the whole process from mapping to running on its own, websites included when you need one.',
      'It is all powered by AI and modern development: fast, precise, and at a price that works for small and mid-size businesses that want results, not promises.'
    ],
    services:[
      {no:'01', title:'AI Audit', subtitle:'AI mapping & strategy for your business', desc:'We sit down for a focused session, map every one of your processes, and find exactly where your time leaks. You walk away with a clear action plan: what to implement, in what order, and which tools will give you back the most hours.'},
      {no:'02', title:'AI Tools & Automations', subtitle:'Custom tools, Skills & automations that work for you', desc:"I build you AI tools, prompt systems and real Hebrew Skills, then wire them into automations that handle leads, content and emails on their own, so technology does the grunt work 24/7, in your business's exact voice and style."},
      {no:'03', title:'Cinematic Website', subtitle:'A website that brings clients in, not just looks good', desc:'When you need a digital presence, I build a smart, fast website with cinematic animations that positions your brand alongside the big players and turns visitors into clients.'}
    ],
    projects:[
      {title:'AI Lead Machine', kind:'Automation', mono:'A', url:'https://shani-ai.com/audit', desc:'An end-to-end lead machine: a smart intake form, an n8n automation, a CRM, and a Claude engine that writes a plan and a proposal for every inquiry. A response within seconds, 24/7.', tags:['Automation','n8n','Claude']},
      {title:'My Money', kind:'Personal Product', mono:'M', url:'https://my-money-app-shani7.vercel.app/', desc:'A financial management platform designed for self-employed women and small business owners.', tags:['Web App','Finance','AI']},
      {title:'Lilach Hazan', kind:'Client Project', mono:'L', url:'https://www.lilachhazan.com/', desc:'A professional business website I built for Lilach Hazan.', tags:['Website','Client Work']},
      {title:'Rox', kind:'Demo Project', mono:'R', url:'https://meridian-watch-eight.vercel.app/', desc:'A luxury watch ecommerce experience.', tags:['Ecommerce','Design']},
      {title:'Solis', kind:'Demo Project', mono:'S', url:'https://solis-orange.vercel.app/', desc:'A premium beverage brand experience.', tags:['Brand Experience','Design']}
    ],
    faqKicker:'07 · FAQ', faqTitle:'Everything you need to know.',
    faqItems:[
      {q:'How much does a website or automation cost?', a:'A cinematic landing page starts at ₪2,400, a full brand website from ₪6,500, and a complete AI system from ₪12,000. A single automation from ₪1,500 and a WhatsApp bot from ₪1,200. There\'s also a monthly membership from ₪390. All prices exclude VAT, and the pricing page breaks it down in full. Not sure what fits? The free audit will recommend.'},
      {q:'How long does it take to build?', a:'A landing page is ready in 7 to 10 days, a brand website in two to three weeks, and complex projects up to four. I work with AI-assisted development, so delivery is significantly faster than the industry without compromising quality. Every package has a delivery time set upfront.'},
      {q:"What if I'm not happy with the result?", a:'The work involves you the whole way: we define the direction together and I present versions for approval at every stage, so there are no surprises at the end. Every package includes revision rounds, and more can be added if needed. My goal is for you to walk away with an asset you\'re proud of, not just a box ticked.'},
      {q:'Why is a site with you pricier than Wix or Elementor?', a:"Because it isn't the same product. A Wix template looks like another template, loads slowly and is limited on SEO. I build custom Next.js code, fast, with a high Lighthouse score, real SEO, cinematic animation, and full ownership of the code, with no forced subscription. Above all, I wire in automations and AI no template can give you. You pay more, you get an asset that pays for itself."},
      {q:'Is there a long-term commitment?', a:'A one-off project has no ongoing commitment, we finish and you\'re free with your code. The Shani Care membership is monthly only, cancellable with 30 days\' notice. You stay in full control.'},
      {q:'Not sure where to start?', a:'Start with a free AI Audit, a focused session that ends with a clear action plan: what to implement, in what order, and which tools and automations will save you the most time, no commitment.'}
    ],
    steps:[
      {n:'01', title:'Discovery', desc:'Understand the business, audience and goal.'},
      {n:'02', title:'Strategy', desc:'Define what to build and in what order.'},
      {n:'03', title:'Design', desc:'Craft the visual language and UX.'},
      {n:'04', title:'Accelerated Build', desc:'We develop using advanced methods and AI assistance, delivering a polished product with clean code and smooth motion in days, not weeks.'},
      {n:'05', title:'Launch', desc:'Go live, measure and improve.'}
    ],
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
    ctaStrip:'Not sure where to start? First mapping session, free.',
    ctaStripBtn:'Chat on WhatsApp →',
    testimonials:{
      label:'06 · Reviews',
      title:'What clients say.',
      items:[
        {
          quote:'Shani taught me to talk to AI in real Hebrew. A month of content became a two-hour job. I did not believe it was possible.',
          name:'Michal R.',
          role:'Business coach | Tel Aviv'
        },
        {
          quote:'I used to think AI was not for me. After one session with Shani, I changed the entire way I work. Prompts that fit my business exactly.',
          name:'Dana K.',
          role:'Graphic designer | Jerusalem'
        },
        {
          quote:'The Hebrew Skill Shani built changed my life. Claude now writes Hebrew like a real Israeli, no more weird translations.',
          name:'Noa S.',
          role:'Boutique owner | Herzliya'
        },
        {
          quote:'The ROI is just clear: in one session I saved at least 10 hours of work a month. Shani knows exactly where AI can help your business.',
          name:'Liron M.',
          role:'Independent marketing consultant | Ramat Gan'
        }
      ]
    }
  }
};
