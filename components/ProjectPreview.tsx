"use client";
import { useEffect, useRef, useState } from "react";
export default function ProjectPreview({image,video,title,he,playVideo=true,alt}:{image:string;video:string;title:string;he:boolean;playVideo?:boolean;alt?:string}) {
 const [failed,setFailed]=useState(false);
 const [allowVideo,setAllowVideo]=useState(false);
 const player=useRef<HTMLVideoElement>(null);
 const frame=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!playVideo) return;
  const narrow=matchMedia("(max-width: 767px)");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)");
  const sync=()=>setAllowVideo(!narrow.matches&&!reduce.matches);
  sync();
  narrow.addEventListener("change",sync);
  reduce.addEventListener("change",sync);
  return()=>{narrow.removeEventListener("change",sync);reduce.removeEventListener("change",sync);};
 },[playVideo]);
 useEffect(()=>{
  const node=player.current,box=frame.current;if(!node||!box||!allowVideo)return;
  node.defaultMuted=true;node.muted=true;
  let visible=false;
  const update=()=>{
   if(visible&&!document.hidden&&!document.documentElement.classList.contains("a11y-no-anim")) {
    node.play().catch(()=>{});
   } else node.pause();
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting&&entry.intersectionRatio>=.2;update();},{threshold:[0,.2]});
  observer.observe(box);
  const prefs=new MutationObserver(update);prefs.observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
  const resume=()=>update();
  document.addEventListener("visibilitychange",update);window.addEventListener("pageshow",resume);node.addEventListener("canplay",resume);
  return()=>{observer.disconnect();prefs.disconnect();document.removeEventListener("visibilitychange",update);window.removeEventListener("pageshow",resume);node.removeEventListener("canplay",resume);node.pause();};
 },[video,allowVideo]);
 const poster=<img src={image} alt={alt||(he?`צילום אתר ${title}`:`Screenshot of ${title}`)} width={1280} height={800} loading="lazy" decoding="async" />;
 return <div className="project-square-image" ref={frame}>
 {!allowVideo||failed?poster:<video ref={player} src={video} poster={image} muted playsInline loop preload="none" aria-label={he?`תצוגת גלילה באתר ${title}`:`Scrolling preview of ${title}`} onError={()=>setFailed(true)} />}
 </div>;
}
