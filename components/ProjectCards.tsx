"use client";
import { useLang } from "@/components/LanguageProvider";
import { projects } from "@/lib/projects";
import ProjectPreview from "@/components/ProjectPreview";
// Public sites with original local imagery, excluding internal tools.
const previews = [
 {slug:"beamer",capture:"beamer",he:"אתר למותג נרות עם קטלוג ניחוחות, שנמצא עדיין בעבודה.",en:"A candle-brand website with a fragrance catalog, still in progress."},
 {slug:"lilach-hazan",capture:"lilach",he:"אתר ללילך חזן, עם הסבר על הטיפול ועל הדרך ליצור איתה קשר.",en:"A website introducing Lilach Hazan and her practice."},
 {slug:"solis",capture:"solis",he:"אתר הדגמה למותג מיצים, עם תנועה בגלילה ותמונות של המוצרים.",en:"A demo juice-brand website with scroll animation and product imagery."},
 {slug:"or-eisenstadt",capture:"or",he:"אתר למאמן בשיטת סאטיה, שמציג את אור ואת הדרך שבה הוא עובד.",en:"A website introducing Or and his Satya coaching practice."},
 {slug:"rox-watch",capture:"rox",he:"אתר הדגמה למותג שעונים, עם גלריית מוצרים ותנועה בגלילה.",en:"A demo watch-brand website with a product gallery and scroll animation."},
 {slug:"my-money",capture:"mymoney",he:"אפליקציה לניהול הכנסות והוצאות, שנמצאת עדיין בפיתוח.",en:"An income and expense management app, still in development."},
 {slug:"ai-lead-machine",capture:"audit",he:"השאלון מרכז את פרטי העסק והצרכים שלכם, והאוטומציה מארגנת את המידע כדי שאוכל לעבור עליו ולחזור אליכם.",en:"The questionnaire gathers business needs and the automation organizes the information for my personal follow-up."}
];
export default function ProjectCards({interactive=true,showFilm=false,playVideo=true}:{interactive?:boolean;showFilm?:boolean;playVideo?:boolean}){
 const {lang}=useLang(); const L = useLang().href; const he=lang==="he";
 // On /work the cards follow the page H1 directly, so they are H2; in the home carousel (under an H2) they are H3.
 const Heading = showFilm ? "h2" : "h3";
 return <div className="project-square-grid" aria-hidden={interactive?undefined:true}>{showFilm&&<article className="project-square-card" key="small-lights" dir={he?"rtl":"ltr"}>
<a className="project-square-image" href="/work/small-lights" tabIndex={-1} aria-hidden="true"><img src="/small-lights/card.jpg" alt={he?"SMALL LIGHTS: מגדלור על אי קטן בשקיעה סגולה-זהובה מעל הים":"SMALL LIGHTS: a lighthouse on a small island at a purple and golden sunset over the sea"} loading="eager" fetchPriority="high" decoding="async" width={800} height={800} /></a>
<div className="project-square-copy"><Heading>SMALL LIGHTS</Heading><p>{he?"סרט אנימציה קצר ש-Claude המציא, ביים והפיק מפרומפט אחד, עם צוות של שישה סוכנים.":"A short animated film Claude invented, directed and produced from one prompt, with a team of six agents."}</p><a href="/work/small-lights" className="project-site-button" tabIndex={interactive?undefined:-1}>{he?"לסיפור ולסרט":"The story and the film"}</a></div>
</article>}{previews.map(item=>{
 const project=projects.find(p=>p.slug===item.slug)!;
 const title=he&&item.slug==="lilach-hazan"?"לילך חזן":(!he&&project.titleEn)||project.title;
 return <article className="project-square-card" key={item.slug} dir={he?"rtl":"ltr"}>
 {item.capture==="mymoney"?<div className="project-square-image"><img src="/project-previews/mymoney-site.webp" alt={interactive?(he?"תצוגה מקדימה של אפליקציית My Money: ניהול כספי לעצמאים בעסקי שירות":"Preview of the My Money app: money management for self-employed service businesses"):""} width={1280} height={800} loading="lazy" decoding="async" /></div>:<ProjectPreview image={`/project-previews/${item.capture}-site.webp`} video={`/project-previews/${item.capture}-scroll.mp4`} title={title} he={he} playVideo={playVideo} alt={item.capture==="or"?(he?"תצוגה מקדימה של דף הבית באתר אור איזנשטדט: דיוקן של אור וכותרת הדף":"Preview of the home page of Or Eisenstadt's website: a portrait of Or and the page heading"):undefined} />}
<div className="project-square-copy"><Heading>{item.capture==="audit"?(he?"השאלון והאוטומציה":"Questionnaire and automation"):title}</Heading>{(item.capture==="mymoney"||item.capture==="beamer")&&<span className="project-progress">{he?"בעבודה":"In progress"}</span>}<p>{he?item.he:item.en}</p><a href={item.capture==="audit"?L("/audit"):project.liveUrl} target={item.capture==="audit"?undefined:"_blank"} rel={item.capture==="audit"?undefined:"noopener noreferrer"} tabIndex={interactive?undefined:-1} className="project-site-button" aria-label={item.capture==="audit"?(he?"לשאלון, למילוי שאלון האבחון":"View questionnaire, open the assessment"):(he?`כניסה לאתר ${title}, בחלון חדש`:`Visit website, ${title}, opens a new tab`)}>{item.capture==="audit"?(he?"לשאלון":"View questionnaire"):(he?"כניסה לאתר":"Visit website")}</a></div>
 </article>;
 })}</div>;
}
