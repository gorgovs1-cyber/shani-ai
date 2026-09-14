"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/LanguageProvider";

export default function StickyAssessment() {
 const path = usePathname();
 const { lang } = useLang();
 const [visible, setVisible] = useState(false);
 useEffect(() => {
  let frame = 0;
  const update = () => {
   cancelAnimationFrame(frame);
   frame = requestAnimationFrame(() => {
    const focused = document.activeElement;
    const typing = focused instanceof HTMLElement && (focused.matches('input,textarea,select') || focused.isContentEditable);
    const blocked = !!document.querySelector('.cc-wrap, [role="dialog"], .nav-hamburger[aria-expanded="true"]');
    const hero = document.querySelector('.hero-grid');
    const pastIntro = hero ? hero.getBoundingClientRect().bottom < 80 : window.scrollY > 240;
    const show = innerWidth <= 900 && !path.startsWith('/audit') && pastIntro && !typing && !blocked;
    setVisible(show);
    document.body.classList.toggle('assessment-bar-visible', show);
   });
  };
  const observer = new MutationObserver(update);
  observer.observe(document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['aria-expanded'] });
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
  document.addEventListener('focusin', update);
  document.addEventListener('focusout', update);
  window.visualViewport?.addEventListener('resize', update);
  update();
  return () => {
   cancelAnimationFrame(frame); observer.disconnect();
   window.removeEventListener('scroll', update); window.removeEventListener('resize', update);
   document.removeEventListener('focusin', update); document.removeEventListener('focusout', update);
   window.visualViewport?.removeEventListener('resize', update);
   document.body.classList.remove('assessment-bar-visible');
  };
 }, [path]);
 return <div className="assessment-bar" hidden={!visible}><a href="/audit" className="portfolio-button">{lang === 'he' ? 'בדיקת התאמה חינם' : 'Free fit check'}</a></div>;
}
