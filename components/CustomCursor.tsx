"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    // Start off-screen so they're invisible before first move
    dot.style.left  = "-200px";
    dot.style.top   = "-200px";
    ring.style.left = "-200px";
    ring.style.top  = "-200px";

    let activated = false;

    const onMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      dot.style.left  = mouseX + "px";
      dot.style.top   = mouseY + "px";
      ring.style.left = mouseX + "px";
      ring.style.top  = mouseY + "px";

      // Hide native cursor only after we know where the custom one should appear
      if (!activated) {
        activated = true;
        document.documentElement.classList.add("custom-cursor");
      }
    };

    const onEnterLink = () => {
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "var(--signal)";
    };

    const onLeaveLink = () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "var(--signal-line)";
    };

    // When mouse leaves the browser window: hide elements + restore native cursor
    const onLeaveDoc = () => {
      dot.style.left  = "-200px";
      dot.style.top   = "-200px";
      ring.style.left = "-200px";
      ring.style.top  = "-200px";
      document.documentElement.classList.remove("custom-cursor");
      activated = false; // re-arm so next entry repositions before hiding native
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveDoc);

    const links = document.querySelectorAll("a, button, [role='button'], .svc-row");
    links.forEach(el => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveDoc);
      links.forEach(el => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return null;
}
