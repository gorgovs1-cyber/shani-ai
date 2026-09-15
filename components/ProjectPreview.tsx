"use client";
import { useEffect, useRef, useState } from "react";
export default function ProjectPreview({image,video,title,he}:{image:string;video:string;title:string;he:boolean}) {
 const [failed,setFailed]=useState(false);
 const player=useRef<HTMLVideoElement>(null);
 const frame=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=player.current,box=frame.current;if(!node||!box)return;
  node.defaultMuted=true;node.muted=true;
  const media=matchMedia("(prefers-reduced-motion: reduce)");
  let visible=false;
  const update=()=>{
   if(visible&&!document.hidden&&!media.matches&&!document.documentElement.classList.contains("a11y-no-anim")) {
    node.play().catch(()=>{});
   } else node.pause();
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting&&entry.intersectionRatio>=.2;update();},{threshold:[0,.2]});
  observer.observe(box);
  const prefs=new MutationObserver(update);prefs.observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
  const resume=()=>update();
  media.addEventListener("change",update);document.addEventListener("visibilitychange",update);window.addEventListener("pageshow",resume);node.addEventListener("canplay",resume);
  return()=>{observer.disconnect();prefs.disconnect();media.removeEventListener("change",update);document.removeEventListener("visibilitychange",update);window.removeEventListener("pageshow",resume);node.removeEventListener("canplay",resume);node.pause();};
 },[video]);
 return <div className="project-square-image" ref={frame}>
 {failed?<img src={image} alt={he?`צילום אתר ${title}`:`Screenshot of ${title}`} loading="lazy" />:<video ref={player} src={video} poster={image} autoPlay muted playsInline loop preload="metadata" aria-label={he?`תצוגת גלילה באתר ${title}`:`Scrolling preview of ${title}`} onError={()=>setFailed(true)} />}
 </div>;
}
