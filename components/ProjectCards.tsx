"use client";
import { useLang } from "@/components/LanguageProvider";
import { projects } from "@/lib/projects";
// Public sites with original local imagery, excluding internal tools.
const previews = [
 {slug:"or-eisenstadt",image:"/projects/or-poster.jpg",he:"אתר למאמן בשיטת סאטיה, שמציג את אור ואת הדרך שבה הוא עובד.",en:"A website introducing Or and his Satya coaching practice."},
 {slug:"lilach-hazan",image:"/project-previews/lilach-hazan.png",he:"אתר ללילך חזן, עם הסבר על הטיפול ועל הדרך ליצור איתה קשר.",en:"A website introducing Lilach Hazan and her practice."},
 {slug:"solis",image:"/project-previews/solis.png",he:"אתר הדגמה למותג מיצים, עם תנועה בגלילה ותמונות של המוצרים.",en:"A demo juice-brand website with scroll animation and product imagery."},
 {slug:"rox-watch",image:"/project-previews/rox.png",he:"אתר הדגמה למותג שעונים, עם גלריית מוצרים ותנועה בגלילה.",en:"A demo watch-brand website with a product gallery and scroll animation."}
];
export default function ProjectCards(){
 const {lang}=useLang(); const he=lang==="he";
 return <div className="project-square-grid">{previews.map(item=>{
 const project=projects.find(p=>p.slug===item.slug)!;
 const title=he&&item.slug==="lilach-hazan"?"לילך חזן":project.title;
 return <article className="project-square-card" key={item.slug}>
 <div className="project-square-image"><img src={item.image} alt={he?`תצוגה מתוך ${title}`:`Preview of ${title}`} loading="lazy" decoding="async" /></div>
 <div className="project-square-copy"><h3>{title}</h3><p>{he?item.he:item.en}</p><a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-site-button" aria-label={he?`כניסה לאתר ${title}, בחלון חדש`:`Visit ${title}, opens a new tab`}>{he?"כניסה לאתר":"Visit website"}</a></div>
 </article>;
 })}</div>;
}
