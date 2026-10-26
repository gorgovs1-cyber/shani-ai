"use client";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
import { openCookieSettings } from "@/components/CookieConsent";
import Logo from "@/components/Logo";
import Link from "next/link";
export default function Footer(){
 const {lang}=useLang(); const L = useLang().href;const t=dict[lang],he=lang==="he";
 const site=[[he?"שירותים":"Services","/#build"],[t.navGuides,"/guides"],[t.navContact,"/#contact"]];
 const legal=[[he?"נגישות":"Accessibility",he?"הצהרת נגישות":"Accessibility","/accessibility"],[he?"פרטיות":"Privacy",he?"מדיניות פרטיות":"Privacy","/privacy"],[he?"תקנון":"Terms",he?"תקנון האתר":"Terms","/terms"],[he?"ביטולים":"Cancellation",he?"מדיניות ביטולים":"Cancellation","/cancellation"]];
 return <footer className="site-footer" dir={t.dir}>
 <div className="footer-brand"><div className="footer-brand-lockup"><Logo height={30}/><strong dir="ltr">Shani AI Creator</strong></div></div>
 <nav className="footer-links" aria-label={he?"עוד באתר":"More on the site"}>{site.map(([label,href])=><a key={href} href={L(href)}>{label}</a>)}</nav>
 <nav className="footer-links footer-legal" aria-label={he?"מידע משפטי והגדרות":"Legal information and settings"}>{legal.map(([label,full,href])=><Link key={href} href={L(href)} aria-label={full}>{label}</Link>)}<button type="button" onClick={openCookieSettings} aria-label={he?"הגדרות עוגיות":"Cookies"}>{he?"עוגיות":"Cookies"}</button></nav>
 <small className="footer-copyright">© {new Date().getFullYear()} · {t.footer}</small>
 </footer>;
}
