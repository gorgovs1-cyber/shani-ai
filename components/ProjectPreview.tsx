"use client";
import { useEffect, useRef, useState } from "react";
export default function ProjectPreview({image,video,title,he}:{image:string;video:string;title:string;he:boolean}) {
 const [failed,setFailed]=useState(false);
 const player=useRef<HTMLVideoElement>(null);
 const frame=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=player.current,box=frame.current;if(!node||!box)return;
  node.src=video;
  const media=matchMedia("(prefers-reduced-motion: reduce)");
  let visible=false;
  const update=()=>{
   if(visible&&!document.hidden&&!media.matches&&!document.documentElement.classList.contains("a11y-no-anim")) {
    if(!node.getAttribute("src"))node.src=video;
    node.play().catch(()=>{});
   } else node.pause();
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting&&entry.intersectionRatio>=.35;update();},{threshold:[0,.35]});
  observer.observe(box);
  const prefs=new MutationObserver(update);prefs.observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
  media.addEventListener("change",update);document.addEventListener("visibilitychange",update);
  return()=>{observer.disconnect();prefs.disconnect();media.removeEventListener("change",update);document.removeEventListener("visibilitychange",update);node.pause();};
 },[video]);
 return <div className="project-square-image" ref={frame}>
 {failed?<img src={image} alt={he?`צילום אתר ${title}`:`Screenshot of ${title}`} loading="lazy" />:<video ref={player} poster={image} muted playsInline loop controls preload="none" aria-label={he?`גלילה באתר ${title}, אפשר להשהות בפקדי הנגן`:`Scroll through ${title}, pause using player controls`} onPlay={e=>{if(!e.currentTarget.getAttribute("src"))e.currentTarget.src=video;}} onError={()=>setFailed(true)} />}
 </div>;
}
