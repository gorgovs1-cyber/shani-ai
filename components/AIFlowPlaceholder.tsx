"use client";

const NODES = [
  { id: "brief",   label: "רעיון",   en: "Brief",      icon: "✦",  delay: 0    },
  { id: "ai",      label: "AI",      en: "Processing", icon: "AI", delay: 0.6  },
  { id: "design",  label: "עיצוב",   en: "Design",     icon: "◈",  delay: 1.2  },
  { id: "build",   label: "פיתוח",   en: "Build",      icon: "</>", delay: 1.8 },
  { id: "launch",  label: "שיגור",   en: "Launch",     icon: "↑",  delay: 2.4  },
];

export default function AIFlowPlaceholder() {
  return (
    <div
      aria-label="AI workflow diagram"
      style={{
        width: "100%",
        aspectRatio: "4/5",
        background: "linear-gradient(170deg, #1c1409 0%, #090705 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(18px,3vw,32px) clamp(16px,3vw,28px)",
        position: "relative",
        overflow: "hidden",
        gap: 0,
      }}
    >
      {/* subtle grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(244,237,225,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(244,237,225,0.03) 1px,transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* orange ambient glow */}
      <div aria-hidden style={{
        position: "absolute", top: "-20%", left: "50%",
        transform: "translateX(-50%)",
        width: "60%", height: "50%",
        background: "radial-gradient(circle, rgba(242,98,46,0.18) 0%, transparent 70%)",
        filter: "blur(24px)", pointerEvents: "none",
      }} />

      {/* kicker */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: ".22em",
        color: "rgba(242,98,46,0.55)",
        marginBottom: "clamp(14px,2.5vw,22px)",
        textTransform: "uppercase",
      }}>
        AI WORKFLOW
      </div>

      {/* flow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 260, gap: 0 }}>
        {NODES.map((node, i) => (
          <div key={node.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>

            {/* connector + animated dot */}
            {i > 0 && (
              <div style={{ position: "relative", width: 2, height: "clamp(18px,2.5vw,26px)", background: "rgba(242,98,46,0.15)", margin: "0 auto" }}>
                <div style={{
                  position: "absolute", left: "50%", top: 0,
                  transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: "50%",
                  background: "#f2622e",
                  animation: `flowDot 2s ease-in-out ${node.delay}s infinite`,
                }} />
              </div>
            )}

            {/* node card */}
            <div
              style={{
                display: "flex", alignItems: "center", gap: 10,
                width: "100%",
                background: node.id === "ai"
                  ? "rgba(242,98,46,0.12)"
                  : "rgba(244,237,225,0.03)",
                border: `1px solid ${node.id === "ai" ? "rgba(242,98,46,0.4)" : "rgba(244,237,225,0.07)"}`,
                borderRadius: 10,
                padding: "clamp(8px,1.2vw,12px) clamp(10px,1.5vw,16px)",
                animation: `nodePulse 3s ease-in-out ${node.delay}s infinite alternate`,
                position: "relative",
              }}
            >
              {/* icon */}
              <div style={{
                width: 30, height: 30, borderRadius: 7,
                background: node.id === "ai" ? "rgba(242,98,46,0.2)" : "rgba(242,98,46,0.08)",
                border: "1px solid rgba(242,98,46,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {node.id === "ai" ? (
                  <svg viewBox="0 0 100 100" fill="none" width={16} height={16}
                    style={{ animation: "aiSpin 4s linear infinite" }}>
                    <path d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z"
                      stroke="#f2622e" strokeWidth="8" strokeLinejoin="round" />
                    <circle cx="50" cy="50" r="8" fill="#f2622e" />
                  </svg>
                ) : (
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: node.icon === "</>" ? 9 : 13,
                    color: "#f2622e", lineHeight: 1,
                  }}>{node.icon}</span>
                )}
              </div>

              {/* labels */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  color: node.id === "ai" ? "#f4ede1" : "rgba(244,237,225,0.7)",
                  fontSize: "clamp(11px,1.1vw,13px)",
                  fontWeight: 700,
                  fontFamily: "'Heebo', sans-serif",
                  lineHeight: 1.2,
                }}>{node.label}</div>
                <div style={{
                  color: "rgba(177,164,143,0.55)",
                  fontSize: 9,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".06em",
                  marginTop: 2,
                }}>{node.en}</div>
              </div>

              {/* AI blinking dots */}
              {node.id === "ai" && (
                <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                  {[0, 0.33, 0.66].map((d) => (
                    <div key={d} style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: "#f2622e",
                      animation: `scl-blink 1.1s ${d}s infinite`,
                    }} />
                  ))}
                </div>
              )}

              {/* launch arrow */}
              {node.id === "launch" && (
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: "var(--acc)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  animation: "launchPulse 1.8s ease-in-out infinite",
                }}>
                  <span style={{ color: "#fff", fontSize: 9, lineHeight: 1 }}>↑</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* bottom label */}
      <div style={{
        marginTop: "clamp(14px,2vw,20px)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: ".16em",
        color: "rgba(177,164,143,0.4)",
        textAlign: "center",
      }}>
        POWERED BY AI
      </div>

      {/* keyframes injected via style tag */}
      <style>{`
        @keyframes flowDot {
          0%   { top: 0%; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes nodePulse {
          from { box-shadow: 0 0 0 rgba(242,98,46,0); }
          to   { box-shadow: 0 0 18px rgba(242,98,46,0.12); }
        }
        @keyframes aiSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes launchPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(242,98,46,0); }
          50%       { transform: scale(1.15); box-shadow: 0 0 10px rgba(242,98,46,0.5); }
        }
      `}</style>
    </div>
  );
}
