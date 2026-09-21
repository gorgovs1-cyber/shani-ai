"use client";
import { useLang } from "@/components/LanguageProvider";
import ProjectCards from "@/components/ProjectCards";
export default function ProjectListing() {
 const {lang,dir}=useLang(); const he=lang==="he";
 return <section className="portfolio-page" dir={dir}>
 <header className="portfolio-heading"><h1>{he?"אתרים שבניתי":"Websites I have built"}</h1><p>{he?"כמה מהעבודות שלי, עם קישור לכל אתר כדי שתוכלו להתרשם בעצמכם.":"A selection of my work, with a link to explore each website."}</p></header>
 <ProjectCards />
 <aside className="portfolio-cta"><h2>{he?"מה תרצו לבנות?":"What would you like to build?"}</h2><p>{he?"ספרו לי קצת על העסק ועל מה שיש לכם בראש, ונבדוק יחד מה מתאים.":"Tell me about your business and what you have in mind."}</p><a href="/audit" className="portfolio-button">{he?"בדיקת התאמה חינם":"Free fit check"}</a></aside>
 </section>;
}
