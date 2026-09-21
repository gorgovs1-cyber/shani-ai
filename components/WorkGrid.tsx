"use client";
import ProjectCards from "@/components/ProjectCards";
import { useLang } from "@/components/LanguageProvider";
export default function WorkGrid(){
 const {lang,dir}=useLang();
 return <section id="work" className="home-projects" dir={dir}><h2>{lang==="he"?"קצת מהעבודות שלי":"A selection of my work"}</h2><ProjectCards /><a className="project-site-button" href="/work">{lang==="he"?"לכל העבודות":"View all work"}</a></section>;
}
