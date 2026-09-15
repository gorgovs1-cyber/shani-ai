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
export default function ProjectCards({interactive=true}:{interactive?:boolean}){
 const {lang}=useLang(); const he=lang==="he";
 return <div className="project-square-grid" aria-hidden={interactive?undefined:true}>{previews.map(item=>{
 const project=projects.find(p=>p.slug===item.slug)!;
 const title=he&&item.slug==="lilach-hazan"?"לילך חזן":project.title;
 return <article className="project-square-card" key={item.slug} dir={he?"rtl":"ltr"}>
 {item.capture==="mymoney"?<div className="project-square-image"><img src="/project-previews/mymoney-site.png" alt={he?"My Money, בעבודה":"My Money, in progress"} loading="lazy" /></div>:<ProjectPreview image={`/project-previews/${item.capture}-site.png`} video={`/project-previews/${item.capture}-scroll.mp4`} title={title} he={he} />}
<div className="project-square-copy"><h3>{item.capture==="audit"?(he?"השאלון והאוטומציה":"Questionnaire and automation"):title}</h3>{(item.capture==="mymoney"||item.capture==="beamer")&&<span className="project-progress">{he?"בעבודה":"In progress"}</span>}<p>{he?item.he:item.en}</p><a href={item.capture==="audit"?"/audit":project.liveUrl} target={item.capture==="audit"?undefined:"_blank"} rel={item.capture==="audit"?undefined:"noopener noreferrer"} tabIndex={interactive?undefined:-1} className="project-site-button" aria-label={item.capture==="audit"?(he?"למילוי שאלון האבחון":"Open the assessment"):(he?`כניסה לאתר ${title}, בחלון חדש`:`Visit ${title}, opens a new tab`)}>{item.capture==="audit"?(he?"לשאלון":"View questionnaire"):(he?"כניסה לאתר":"Visit website")}</a></div>
 </article>;
 })}</div>;
}
