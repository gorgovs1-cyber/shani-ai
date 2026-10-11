"use client";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
import { openCookieSettings } from "@/components/CookieConsent";
import Logo from "@/components/Logo";
import Link from "next/link";
export default function Footer(){
 const {lang}=useLang(); const L = useLang().href;const t=dict[lang],he=lang==="he";
 const legal=[[he?"הצהרת נגישות":"Accessibility","/accessibility"],[he?"מדיניות פרטיות":"Privacy","/privacy"],[he?"תקנון":"Terms","/terms"],[he?"מדיניות ביטולים":"Cancellation","/cancellation"]];
 return <footer className="site-footer" dir={t.dir}>
 <div className="footer-brand"><div className="footer-brand-lockup"><Logo height={30}/><strong dir="ltr">Shani AI Creator</strong></div></div>
 <nav className="footer-links" aria-label={he?"מידע והגדרות":"Information and settings"}>{legal.map(([label,href])=><Link key={href} href={L(href)}>{label}</Link>)}<button type="button" onClick={openCookieSettings}>{he?"הגדרות עוגיות":"Cookie settings"}</button></nav>
 <small className="footer-copyright">© {new Date().getFullYear()} · {t.footer}</small>
 </footer>;
}
