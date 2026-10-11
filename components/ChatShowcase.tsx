"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

// A scripted demo conversation (clearly labelled as a demo), not a live bot.
const COPY = {
  he: {
    kicker: "צ׳אטבוט בעברית",
    title: "עונה ללקוחות שלכם, גם כשאתם עסוקים",
    sub: "צ׳אטבוט שמכיר את העסק שלכם, עונה בעברית באתר ובוואטסאפ, ומעביר אליכם כל פנייה שצריכה אדם.",
    features: [
      { t: "מדבר עברית טבעית", d: "מבין שאלות כמו שלקוחות באמת כותבים אותן, ועונה בקצרה ולעניין." },
      { t: "מכיר את העסק", d: "עונה מתוך המידע שלכם: שירותים, שעות פעילות ושאלות שחוזרות." },
      { t: "זמין גם בערב", d: "פניות שמגיעות אחרי שעות העבודה מקבלות מענה ולא נופלות." },
      { t: "באתר ובוואטסאפ", d: "אותו צ׳אטבוט בשני הערוצים, ופנייה שצריכה אתכם מגיעה אליכם." },
    ],
    cta: "רוצים צ׳אטבוט כזה?",
    name: "הצ׳אטבוט של העסק",
    status: "מחובר עכשיו",
    demo: "הדגמה",
    placeholder: "כתבו הודעה...",
    srDemo: "הדגמה של שיחה: לקוחה שואלת אם אפשר לקבוע תור ליום חמישי, הצ׳אטבוט מציע שתי שעות פנויות, והיא בוחרת אחת ומקבלת אישור.",
    msgs: [
      { me: true, text: "היי, אפשר לקבוע תור ליום חמישי?" },
      { me: false, text: "בטח! ביום חמישי יש מקום ב-10:00 או ב-14:30. מה מתאים לך?" },
      { me: true, text: "14:30 מעולה" },
      { me: false, text: "קבעתי לך ליום חמישי ב-14:30. אישור נשלח אלייך לוואטסאפ." },
    ],
  },
  en: {
    kicker: "Hebrew chatbot",
    title: "Answers your customers, even when you are busy",
    sub: "A chatbot that knows your business, answers in Hebrew on your website and on WhatsApp, and hands you anything that needs a person.",
    features: [
      { t: "Natural Hebrew", d: "Understands questions the way customers actually write them, and answers briefly." },
      { t: "Knows your business", d: "Answers from your own information: services, opening hours and recurring questions." },
      { t: "Available in the evening", d: "Enquiries that arrive after hours get an answer instead of slipping away." },
      { t: "Website and WhatsApp", d: "The same chatbot on both channels, and anything that needs you reaches you." },
    ],
    cta: "Want a chatbot like this?",
    name: "Your business chatbot",
    status: "Online now",
    demo: "Demo",
    placeholder: "Type a message...",
    srDemo: "Demo conversation: a customer asks to book an appointment on Thursday, the chatbot offers two free times, she picks one and gets a confirmation.",
    msgs: [
      { me: true, text: "Hi, can I book an appointment for Thursday?" },
      { me: false, text: "Sure! On Thursday there is room at 10:00 or 14:30. Which suits you?" },
      { me: true, text: "14:30 is great" },
      { me: false, text: "Booked for Thursday at 14:30. A confirmation was sent to your WhatsApp." },
    ],
  },
};

export default function ChatShowcase() {
  const { lang, dir } = useLang(); const L = useLang().href;
  const c = COPY[lang];
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current; if (!el) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("a11y-no-anim");
    if (still) { setShown(c.msgs.length); return; }
    let timers: number[] = []; let started = false;
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const run = () => {
      clear(); setShown(0); setTyping(false);
      let t = 500;
      c.msgs.forEach((m, i) => {
        if (!m.me) { timers.push(window.setTimeout(() => setTyping(true), t)); t += 1300; }
        timers.push(window.setTimeout(() => { setTyping(false); setShown(i + 1); }, t));
        t += m.me ? 1100 : 1500;
      });
      timers.push(window.setTimeout(run, t + 3500));
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; run(); } if (!e.isIntersecting && started) { started = false; clear(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); clear(); };
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="chat-showcase" aria-labelledby="chat-title" dir={dir}>
      <div className="chat-copy">
        <div className="chat-kicker">{c.kicker}</div>
        <h2 id="chat-title">{c.title}</h2>
        <p className="chat-sub">{c.sub}</p>
        <ul className="chat-features">
          {c.features.map((f, i) => (
            <li key={f.t}>
              <span className="chat-feat-no" aria-hidden="true">0{i + 1}</span>
              <div><h3>{f.t}</h3><p>{f.d}</p></div>
            </li>
          ))}
        </ul>
        <a href={L("/audit")} className="btn btn-primary chat-cta">{c.cta}</a>
      </div>

      <div className="chat-window" ref={box}>
        <p className="sr-only">{c.srDemo}</p>
        <div aria-hidden="true">
          <div className="chat-head">
            <span className="chat-avatar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></span>
            <span className="chat-who"><strong>{c.name}</strong><span><i className="chat-dot" />{c.status}</span></span>
            <span className="chat-demo">{c.demo}</span>
          </div>
          <div className="chat-body">
            {c.msgs.slice(0, shown).map((m, i) => (
              <div key={i} className={`chat-msg ${m.me ? "is-me" : "is-bot"}`}>{m.text}</div>
            ))}
            {typing && <div className="chat-msg is-bot chat-typing"><i /><i /><i /></div>}
          </div>
          <div className="chat-input"><span>{c.placeholder}</span><span className="chat-send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg></span></div>
        </div>
      </div>
    </section>
  );
}
