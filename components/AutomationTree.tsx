"use client";

import { useEffect, useRef } from "react";

// ─── Layout ───────────────────────────────────────────────
const CX = 260, CY = 232, R = 138;

function pt(deg: number) {
  const a = (deg - 90) * (Math.PI / 180);
  return { x: Math.round(CX + R * Math.cos(a)), y: Math.round(CY + R * Math.sin(a)) };
}

// ─── Icon paths (18×18 coord space) ───────────────────────
const ICONS: Record<string, string> = {
  circuit:  "M5 9h8M9 5v8M6.5 6.5l5 5M11.5 6.5l-5 5",
  chat:     "M2 4h14v9H8L2 16V4z",
  mail:     "M2 5h14v9H2zM2 5l7 5 7-5",
  user:     "M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 16c0-3 2.5-5 6-5s6 2 6 5",
  calendar: "M2 6h14v10H2zM2 10h14M6 2v6M12 2v6",
  doc:      "M5 2h8l3 3v13H5zM13 2v3h3M7 9h5M7 12h4",
  group:    "M6 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM1 15c0-2.5 2-4.5 5-4.5s5 2 5 4.5M12 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16 15c0-2-1.5-3.5-3.5-4",
};

// ─── Data ─────────────────────────────────────────────────
const _pts = { wa: pt(0), em: pt(60), crm: pt(120), cal: pt(180), inv: pt(240), lead: pt(300) };

const NODES = [
  { id: "root", x: CX,             y: CY,             label: "העסק שלך", color: "#8B5CF6", r: 28, icon: "circuit" },
  { id: "wa",   x: _pts.wa.x,      y: _pts.wa.y,      label: "WhatsApp",  color: "#06B6D4", r: 21, icon: "chat"     },
  { id: "em",   x: _pts.em.x,      y: _pts.em.y,      label: "Email",     color: "#EC4899", r: 21, icon: "mail"     },
  { id: "crm",  x: _pts.crm.x,     y: _pts.crm.y,     label: "CRM",       color: "#8B5CF6", r: 21, icon: "user"     },
  { id: "cal",  x: _pts.cal.x,     y: _pts.cal.y,     label: "יומן",      color: "#06B6D4", r: 21, icon: "calendar" },
  { id: "inv",  x: _pts.inv.x,     y: _pts.inv.y,     label: "חשבונית",   color: "#10B981", r: 21, icon: "doc"      },
  { id: "lead", x: _pts.lead.x,    y: _pts.lead.y,    label: "לקוחות",    color: "#EC4899", r: 21, icon: "group"    },
];

const OUTER = NODES.slice(1); // all except root

// ─── Component ────────────────────────────────────────────
export default function AutomationTree() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Collect elements
    const edgePaths  = OUTER.map((_, i) => svg.querySelector<SVGPathElement>(`#at-e${i}`));
    const dotEls     = OUTER.map((_, i) => svg.querySelector<SVGCircleElement>(`#at-d${i}`));
    const pulseEls   = NODES.map((_, i) => svg.querySelector<SVGCircleElement>(`#at-p${i}`));

    const pathLens   = edgePaths.map(p => p?.getTotalLength() ?? 200);
    const dotT       = OUTER.map(() => Math.random());
    const dotSpd     = OUTER.map(() => 0.0007 + Math.random() * 0.0004);
    const pulsePhase = NODES.map(() => Math.random() * Math.PI * 2);

    let rafId: number;

    const tick = (now: number) => {
      const ms = now;

      // Dash animation
      edgePaths.forEach((path, i) => {
        if (!path) return;
        path.setAttribute("stroke-dashoffset", String(-(ms * 0.018) % 18));
      });

      // Traveling dots
      OUTER.forEach((node, i) => {
        const dot  = dotEls[i];
        const path = edgePaths[i];
        if (!dot || !path) return;
        dotT[i] = (dotT[i] + dotSpd[i]) % 1;
        const p = path.getPointAtLength(dotT[i] * pathLens[i]);
        dot.setAttribute("cx", String(p.x));
        dot.setAttribute("cy", String(p.y));
      });

      // Pulse rings
      NODES.forEach((node, i) => {
        const ring = pulseEls[i];
        if (!ring) return;
        const phase = (ms / 2800 + pulsePhase[i]) % 1;
        const sin   = Math.sin(phase * Math.PI); // 0→1→0
        ring.setAttribute("r",       String(node.r + 3 + sin * 11));
        ring.setAttribute("opacity", String((0.35 * (1 - sin)).toFixed(3)));
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="at-root">
      <svg ref={svgRef} viewBox="0 0 520 470" width="100%" style={{ overflow: "visible" }}>
        <defs>
          <filter id="at-glow-sm">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="at-glow-lg">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Edges + dots */}
        {OUTER.map((node, i) => (
          <g key={`at-edge-${i}`}>
            <path
              id={`at-e${i}`}
              d={`M${CX},${CY}L${node.x},${node.y}`}
              fill="none"
              stroke={node.color}
              strokeWidth="1.2"
              strokeOpacity="0.3"
              strokeDasharray="4 5"
              strokeDashoffset="0"
            />
            <circle id={`at-d${i}`} cx={CX} cy={CY} r="2.8"
              fill={node.color} filter="url(#at-glow-sm)" opacity="0.9" />
          </g>
        ))}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isRoot  = node.id === "root";
          const iconSz  = isRoot ? 22 : 17;
          const sc      = iconSz / 18;
          const sw      = (isRoot ? 1.5 : 1.4) / sc;

          return (
            <g key={node.id}>
              {/* Pulse ring (JS-animated) */}
              <circle id={`at-p${i}`}
                cx={node.x} cy={node.y} r={node.r + 3}
                fill="none" stroke={node.color} strokeWidth="1" opacity="0.3" />

              {/* Circle */}
              <circle
                cx={node.x} cy={node.y} r={node.r}
                fill="#09090f"
                stroke={node.color}
                strokeWidth={isRoot ? 2 : 1.5}
                filter={isRoot ? "url(#at-glow-lg)" : undefined}
              />

              {/* Icon via g transform (no nested SVG) */}
              <g
                transform={`translate(${node.x - iconSz / 2},${node.y - iconSz / 2}) scale(${sc})`}
                fill="none"
                stroke={node.color}
                strokeWidth={sw}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={ICONS[node.icon]} />
              </g>

              {/* Label */}
              <text
                x={node.x} y={node.y + node.r + 16}
                textAnchor="middle"
                fill="#8A8AA8"
                fontSize="10"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.03em"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Styles moved to globals.css */}
    </div>
  );
}
