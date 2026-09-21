"use client";

import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";

export default function About() {
  const { t, lang } = useLang();
  return <section id="about" className="about-story">
    <div className="about-story-photo"><Image src="/shani-about.jpg.png" alt={lang === "he" ? "שני גורגוב" : "Shani Gorgov"} width={800} height={1000} sizes="(max-width: 767px) 90vw, 35vw" /></div>
    <div className="about-story-copy">
      <h2>{t.aboutTitle}</h2>
      {t.aboutParas.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <p className="about-experience"><strong>10+</strong> {t.stat1}</p>
    </div>
  </section>;
}
