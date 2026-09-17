"use client";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
import { openCookieSettings } from "@/components/CookieConsent";
import Logo from "@/components/Logo";
import Link from "next/link";
export default function Footer(){
 const {lang}=useLang();const t=dict[lang],he=lang==="he";
 const socials=[["Instagram","https://www.instagram.com/shani.creates.ai/"],["TikTok","https://www.tiktok.com/@shani.creates.ai"],["WhatsApp","https://wa.me/972504744815"],["LinkedIn","https://www.linkedin.com/in/shani-ai/"]];
 const legal=[[he?"הצהרת נגישות":"Accessibility","/accessibility"],[he?"מדיניות פרטיות":"Privacy","/privacy"],[he?"תקנון":"Terms","/terms"],[he?"מדיניות ביטולים":"Cancellation","/cancellation"]];
 return <footer className="site-footer" dir={t.dir}>
 <div className="footer-brand"><div className="footer-brand-lockup"><Logo height={30}/><strong dir="ltr">Shani AI Creator</strong></div></div>
 <div className="footer-columns">
 <nav aria-label={he?"קשר ורשתות חברתיות":"Contact and social"}><h2>{he?"אפשר למצוא אותי גם כאן":"Find me here"}</h2>{socials.map(([label,href])=><a key={href} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}</nav>
 <nav aria-label={he?"מידע והגדרות":"Information and settings"}><h2>{he?"מידע והגדרות":"Information"}</h2>{legal.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}<button type="button" onClick={openCookieSettings}>{he?"הגדרות עוגיות":"Cookie settings"}</button></nav>
 </div>
 <small className="footer-copyright">© {new Date().getFullYear()} · {t.footer}</small>
 </footer>;
}
