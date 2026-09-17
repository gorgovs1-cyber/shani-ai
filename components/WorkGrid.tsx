"use client";
import { useEffect, useRef, useState } from "react";
import ProjectCards from "@/components/ProjectCards";
import { useLang } from "@/components/LanguageProvider";
import Link from "next/link";
export default function WorkGrid(){
 const {lang,dir}=useLang();
 const track=useRef<HTMLDivElement>(null);
 const [interacting,setInteracting]=useState(false);
 const resumeTimer=useRef<number>();
 useEffect(()=>{const el=track.current;if(el)el.scrollLeft=el.scrollWidth/2;},[]);
 useEffect(()=>{
  const el=track.current;if(!el)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,last=0,holdUntil=0,visible=true,remainder=0;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(el);
  const tick=(now:number)=>{
   const dt=last?Math.min(now-last,40):0;last=now;
   const mobile=matchMedia('(max-width: 600px)').matches;
   if(mobile&&!interacting&&!media.matches&&!document.documentElement.classList.contains('a11y-no-anim')&&!document.hidden&&visible&&now>holdUntil){
    if(el.scrollLeft<=1){el.scrollLeft=el.scrollWidth/2;holdUntil=now+600;}
    else {remainder+=dt*.036;const step=Math.floor(remainder);if(step){el.scrollLeft-=step;remainder-=step;}}
   }
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();if(resumeTimer.current)clearTimeout(resumeTimer.current);};
 },[interacting]);
 const pauseForTouch=()=>{setInteracting(true);if(resumeTimer.current)clearTimeout(resumeTimer.current);};
 const resumeAfterTouch=()=>{if(resumeTimer.current)clearTimeout(resumeTimer.current);resumeTimer.current=window.setTimeout(()=>setInteracting(false),1200);};
 return <section id="work" className="home-projects" dir={dir}><h2>{lang==="he"?"קצת מהעבודות שלי":"A selection of my work"}</h2>
 <div className="home-carousel" ref={track} dir="ltr" role="region" aria-label={lang==="he"?"קרוסלת פרויקטים":"Project carousel"} tabIndex={0} onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)} onTouchStart={pauseForTouch} onTouchEnd={resumeAfterTouch} onTouchCancel={resumeAfterTouch} onFocusCapture={()=>setInteracting(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setInteracting(false);}}><div className="home-carousel-strip"><ProjectCards /><ProjectCards interactive={false}/></div></div>
 <div className="home-projects-cta"><Link className="project-site-button project-site-button--primary" href="/work">{lang==="he"?"לכל הפרויקטים":"View all projects"}</Link></div></section>;
}
