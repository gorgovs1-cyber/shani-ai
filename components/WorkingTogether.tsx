"use client";

import { useLang } from "@/components/LanguageProvider";

export default function WorkingTogether() {
  const { t } = useLang();
  return <section className="working-together" aria-labelledby="working-title">
    <div className="working-content">
      <h2 id="working-title" className="section-title">{t.processTitle}</h2>
      <ol>{t.processSteps.map((step, i) => <li key={step.title}><span className="working-no" aria-hidden="true">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
    </div>
  </section>;
}
