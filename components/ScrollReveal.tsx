"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** One lightweight entrance per top-level section. Content is never hidden waiting for scroll. */
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const disabled = () => mq.matches || document.documentElement.classList.contains("a11y-no-anim");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!disabled()) {
          const animation = entry.target.animate(
            [{ transform: "translateY(18px)" }, { transform: "translateY(0)" }],
            { duration: 480, easing: "cubic-bezier(.16,1,.3,1)" }
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll("#main-content > div > section").forEach((section) => {
      // The portfolio already owns its local card/hero motion.
      if (section.classList.contains("portfolio-page")) return;
      if (section.getBoundingClientRect().top >= innerHeight) observer.observe(section);
    });
    const cancel = () => { if (disabled()) animations.forEach((animation) => animation.cancel()); };
    mq.addEventListener("change", cancel);
    const preferences = new MutationObserver(cancel);
    preferences.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { observer.disconnect(); preferences.disconnect(); mq.removeEventListener("change", cancel); animations.forEach((animation) => animation.cancel()); };
  }, [pathname]);
  return null;
}
