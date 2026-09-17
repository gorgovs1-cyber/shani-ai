"use client";

import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";

export default function WorkingTogether() {
  const { t } = useLang();
  return <section className="working-together" aria-labelledby="working-title">
    <div className="working-visual"><Image src="/connected-system.png" alt="" width={1536} height={1024} sizes="(max-width: 767px) 90vw, 40vw" /></div>
    <div className="working-content">
      <h2 id="working-title" className="section-title">{t.processTitle}</h2>
      <ol>{t.processSteps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
    </div>
  </section>;
}
