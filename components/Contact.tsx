"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".contact-inner", {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-inner", start: "top 80%" },
        });
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="section-padding" style={{
      borderTop: "1px solid var(--border)",
      background: "var(--surface)",
    }}>
      <div className="contact-inner" style={{
        maxWidth: 640, margin: "0 auto", textAlign: "center",
      }}>
        {/* Gradient orb */}
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
          margin: "0 auto 2rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2rem",
        }}>💬</div>

        <div className="label" style={{ color: "var(--purple)", marginBottom: "1rem" }}>בואי נדבר</div>

        <h2 className="display-lg" style={{ color: "var(--white)", marginBottom: "1.25rem" }}>
          יש לך פרויקט?<br />
          <span className="grad-text">בואי נבנה אותו.</span>
        </h2>

        <p className="body-lg" style={{ marginBottom: "2.5rem" }}>
          ספרי לי על העסק שלך ומה את רוצה לשפר. אענה תוך 24 שעות עם רעיון ראשוני.
        </p>

        <div className="contact-cta-row" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/972504744815" className="btn-grad" style={{ fontSize: "0.85rem" }}>
            📱 כתבי לי בוואטסאפ
          </a>
          <a href="mailto:gorgovs1@gmail.com" className="btn-ghost" style={{ fontSize: "0.85rem" }}>
            ✉️ שלחי מייל
          </a>
        </div>

        <p style={{ marginTop: "1.5rem", fontSize: "0.78rem", color: "var(--muted)" }}>
          gorgovs1@gmail.com · ישראל
        </p>
      </div>
    </section>
  );
}
