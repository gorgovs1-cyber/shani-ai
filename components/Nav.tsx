"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close menu on link click
  const closeMenu = () => setMenuOpen(false);

  const links = [["עבודות", "#work"], ["שירותים", "#services"], ["עליי", "#about"]];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 10001,
        padding: "0.875rem 1.25rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled || menuOpen ? "rgba(6,6,8,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(30,30,46,0.8)" : "1px solid transparent",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Logo height={32} />
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {links.map(([l, h]) => (
            <a key={l} href={h} style={{
              fontSize: "0.82rem", fontWeight: 500, color: "var(--muted)",
              textDecoration: "none", transition: "color 0.2s ease",
              fontFamily: "var(--font-body)",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--white)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >{l}</a>
          ))}
          <a href="https://wa.me/972504744815" className="btn-grad"
            style={{ padding: "0.55rem 1.25rem", fontSize: "0.75rem" }}>
            דברי איתי
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="תפריט"
          style={{
            display: "none",
            flexDirection: "column", gap: "5px",
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", margin: "-8px",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span style={{
            display: "block", width: 24, height: 2,
            background: "var(--white)", borderRadius: 2,
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: menuOpen ? "rotate(45deg) translate(5px, 7px)" : "none",
          }} />
          <span style={{
            display: "block", width: 24, height: 2,
            background: "var(--white)", borderRadius: 2,
            opacity: menuOpen ? 0 : 1,
            transition: "opacity 0.3s ease",
          }} />
          <span style={{
            display: "block", width: 24, height: 2,
            background: "var(--white)", borderRadius: 2,
            transition: "transform 0.3s ease",
            transform: menuOpen ? "rotate(-45deg) translate(5px, -7px)" : "none",
          }} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 10000,
          background: "rgba(6,6,8,0.98)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "2.5rem",
        }}>
          {links.map(([l, h]) => (
            <a key={l} href={h} onClick={closeMenu} style={{
              fontSize: "2rem", fontWeight: 700, color: "var(--white)",
              textDecoration: "none", fontFamily: "var(--font-syne)",
              letterSpacing: "-0.02em",
            }}>{l}</a>
          ))}
          <a href="https://wa.me/972504744815" className="btn-grad"
            onClick={closeMenu}
            style={{ padding: "1rem 2.5rem", fontSize: "1rem", marginTop: "1rem" }}>
            דברי איתי
          </a>
        </div>
      )}
    </>
  );
}
