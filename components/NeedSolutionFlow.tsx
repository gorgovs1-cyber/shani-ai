import { Fragment } from "react";

/**
 * Reusable "need → solution → how it works → how to start" section for service pages.
 * Rendered by ServicePage when a service's copy has a `flow` block, so /websites and /chatbots
 * can adopt the same structure later by adding copy only. Stages stack vertically and stay centered
 * on every screen size; the arrows between stages point down, so they read the same in RTL and LTR.
 */
export type FlowIcon = "image" | "video" | "catalog" | "palette" | "refresh" | "repeat";

export type FlowItem = { title: string; text: string; icon?: FlowIcon };

export type FlowCopy = {
  needLabel: string;
  needTitle: string;
  needText: string;
  needPoints: FlowItem[];
  needGoal?: string;
  solutionLabel: string;
  solutionTitle: string;
  solutionText?: string;
  solutionItems: FlowItem[];
  solutionHighlights?: FlowItem[];
  howLabel: string;
  howTitle: string;
  steps: FlowItem[];
  howNote?: string;
  startLabel: string;
  startTitle: string;
  startText?: string;
  startItems: FlowItem[];
};

const ICONS: Record<FlowIcon, string> = {
  image: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M9 9.5h.01",
  video: "M3 6h12v12H3zM15 10l6-3v10l-6-3",
  catalog: "M5 3h11l3 3v15H5zM9 9h7M9 13h7M9 17h4",
  palette: "M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.2-1-1.4-1-2.4 0-.9.7-1.3 1.6-1.3H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3zM7.5 11h.01M10 7.5h.01M14.5 7.5h.01",
  refresh: "M20 11a8 8 0 0 0-14.5-4M4 4v4h4M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4",
  repeat: "M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
};

function Icon({ name }: { name: FlowIcon }) {
  return (
    <span className="nsf-icon" aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>
    </span>
  );
}

function Connector() {
  return (
    <div className="nsf-link" aria-hidden="true">
      <svg width="28" height="44" viewBox="0 0 28 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2v36M6 30l8 9 8-9" /></svg>
    </div>
  );
}

function Cards({ items, variant, numbered }: { items: FlowItem[]; variant?: string; numbered?: boolean }) {
  return (
    <ul className={`nsf-grid n${items.length}${variant ? ` ${variant}` : ""}`}>
      {items.map((it, i) => (
        <li key={it.title} className="nsf-card">
          {numbered ? <span className="nsf-num" aria-hidden="true">{i + 1}</span> : it.icon ? <Icon name={it.icon} /> : null}
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default function NeedSolutionFlow({ copy, solutionId = "flow-solution" }: { copy: FlowCopy; solutionId?: string }) {
  const stages = [
    { id: "flow-need", label: copy.needLabel, title: copy.needTitle },
    { id: solutionId, label: copy.solutionLabel, title: copy.solutionTitle },
    { id: "flow-how", label: copy.howLabel, title: copy.howTitle },
    { id: "flow-start", label: copy.startLabel, title: copy.startTitle },
  ];
  return (
    <div className="nsf">
      {stages.map((s, i) => (
        <Fragment key={s.id}>
          {i > 0 ? <Connector /> : null}
          <section id={s.id} className="nsf-stage sp-section" aria-labelledby={`${s.id}-h`}>
            <p className="nsf-badge"><b aria-hidden="true">{i + 1}</b><span>{s.label}</span></p>
            <h2 id={`${s.id}-h`} className="sp-h2">{s.title}</h2>
            {i === 0 ? (
              <>
                <p className="nsf-lead">{copy.needText}</p>
                <Cards items={copy.needPoints} variant="is-need" />
                {copy.needGoal ? <p className="nsf-goal">{copy.needGoal}</p> : null}
              </>
            ) : null}
            {i === 1 ? (
              <>
                {copy.solutionText ? <p className="nsf-lead">{copy.solutionText}</p> : null}
                <Cards items={copy.solutionItems} />
                {copy.solutionHighlights?.length ? <Cards items={copy.solutionHighlights} variant="is-highlight" /> : null}
              </>
            ) : null}
            {i === 2 ? (
              <>
                <Cards items={copy.steps} numbered />
                {copy.howNote ? <p className="nsf-note">{copy.howNote}</p> : null}
              </>
            ) : null}
            {i === 3 ? (
              <>
                {copy.startText ? <p className="nsf-lead">{copy.startText}</p> : null}
                <Cards items={copy.startItems} />
              </>
            ) : null}
          </section>
        </Fragment>
      ))}
    </div>
  );
}
