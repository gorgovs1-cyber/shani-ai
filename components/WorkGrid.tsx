"use client";
import { useEffect, useRef, useState } from "react";
import ProjectCards from "@/components/ProjectCards";
import { useLang } from "@/components/LanguageProvider";
export default function WorkGrid(){
 const {lang,dir}=useLang();
 const track=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false);
 const [interacting,setInteracting]=useState(false);
 useEffect(()=>{const el=track.current;if(el)el.scrollLeft=el.scrollWidth-el.clientWidth;},[]);
 useEffect(()=>{
  const el=track.current;if(!el)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,last=0,holdUntil=0,visible=true,remainder=0;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(el);
  const tick=(now:number)=>{
   const dt=last?Math.min(now-last,40):0;last=now;
   if(!paused&&!interacting&&!media.matches&&!document.documentElement.classList.contains('a11y-no-anim')&&!document.hidden&&visible&&now>holdUntil){
    if(el.scrollLeft<=1){el.scrollLeft=el.scrollWidth-el.clientWidth;holdUntil=now+1800;}
    else {remainder+=dt*.036;const step=Math.floor(remainder);if(step){el.scrollLeft-=step;remainder-=step;}}
   }
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();};
 },[paused,interacting]);
 return <section id="work" className="home-projects" dir={dir}><h2>{lang==="he"?"קצת מהעבודות שלי":"A selection of my work"}</h2>
 <div className="home-carousel-controls"><button className="project-site-button" type="button" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?(lang==="he"?"הפעלת תנועה":"Start motion"):(lang==="he"?"השהיית תנועה":"Pause motion")}</button></div>
 <div className="home-carousel" ref={track} dir="ltr" role="region" aria-label={lang==="he"?"קרוסלת פרויקטים":"Project carousel"} tabIndex={0} onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)} onTouchStart={()=>setPaused(true)} onFocusCapture={()=>setInteracting(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setInteracting(false);}}><ProjectCards /></div>
 <a className="project-site-button" href="/work">{lang==="he"?"לכל הפרויקטים":"View all projects"}</a></section>;
}
