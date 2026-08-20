"use client";

import { useEffect, useRef, useState } from "react";

/**
 * הדגמת יכולת בנייה בתלת-ממד, בתוך כרטיס "אתרים" בלבד ולא בהירו — כדי לא
 * לפגוע בזמן הטעינה של העמוד הכי חשוב באתר. ראו תוכנית-שיפור-האתר.md, חלק 6:
 * "בהירו זה קישוט שמעלה זמן טעינה... במקום זה, בתוך כרטיס אתרים, כהדגמה חיה".
 *
 * שלושה כללי ביצועים וקוד ננעלים כאן:
 * 1. טעינה עצלה: Three.js נטען מ-CDN רק כשהכרטיס נכנס לתצוגה, לא בטעינה הראשונית.
 * 2. תקציב מובייל נפרד: מסך צר מקבל תמיד את הפולבאק הסטטי, אף פעם לא WebGL.
 * 3. prefers-reduced-motion: מכבה את הסצנה לגמרי ומשאיר את אותו פולבאק סטטי.
 *
 * אין תלות npm חדשה בפרויקט — הספרייה נטענת דרך תג script בזמן ריצה, כך
 * שאין שינוי ב-package.json ואין סיכון לבילד אם הרשת חסומה: הפולבאק פשוט נשאר.
 */

const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
let threeLoadPromise: Promise<any> | null = null;

function loadThree(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if ((window as any).THREE) return Promise.resolve((window as any).THREE);
  if (threeLoadPromise) return threeLoadPromise;
  threeLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = THREE_SRC;
    script.async = true;
    script.onload = () => resolve((window as any).THREE);
    script.onerror = () => reject(new Error("three.js failed to load"));
    document.head.appendChild(script);
  });
  return threeLoadPromise;
}

export default function WebsiteCard3D() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  // שלב 1: להחליט אם בכלל מנסים WebGL, ומתי — לפי גודל מסך, prefers-reduced-motion, וכניסה לתצוגה
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 720;
    if (reduced || narrow) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // שלב 2: לבנות את הסצנה בפועל, רק אחרי שהוחלט לנסות
  useEffect(() => {
    if (!active || !hostRef.current) return;

    let renderer: any;
    let group: any;
    let frameId = 0;
    let disposed = false;
    let cleanupPointer: (() => void) | null = null;

    loadThree()
      .then((THREE) => {
        if (disposed || !hostRef.current) return;
        const host = hostRef.current;
        const width = host.clientWidth || 1;
        const height = host.clientHeight || 1;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
        camera.position.set(0, 0, 6);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(width, height);
        host.appendChild(renderer.domElement);

        // "כרטיס אתר" מופשט: מסגרת חצי-שקופה + שלושה בלוקי תוכן מרחפים, בצבעי המותג
        group = new THREE.Group();

        const frameGeo = new THREE.BoxGeometry(3.4, 2.1, 0.08);
        const frameMat = new THREE.MeshStandardMaterial({
          color: 0x141009,
          metalness: 0.2,
          roughness: 0.55,
          transparent: true,
          opacity: 0.9,
        });
        group.add(new THREE.Mesh(frameGeo, frameMat));

        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(frameGeo),
          new THREE.LineBasicMaterial({ color: 0xf2622e, transparent: true, opacity: 0.55 })
        );
        group.add(edges);

        const blockGeo = new THREE.BoxGeometry(0.9, 0.5, 0.06);
        [
          [-1.1, 0.5, 0.14],
          [0, -0.18, 0.22],
          [1.1, 0.32, 0.17],
        ].forEach(([x, y, z], idx) => {
          const mat = new THREE.MeshStandardMaterial({
            color: 0xf2622e,
            roughness: 0.4,
            transparent: true,
            opacity: 0.82 - idx * 0.12,
          });
          const block = new THREE.Mesh(blockGeo, mat);
          block.position.set(x, y, z);
          group.add(block);
        });

        scene.add(group);
        scene.add(new THREE.AmbientLight(0xffffff, 0.75));
        const dir = new THREE.DirectionalLight(0xffffff, 0.55);
        dir.position.set(2, 3, 4);
        scene.add(dir);

        let pointerX = 0;
        let pointerY = 0;
        const onMove = (e: PointerEvent) => {
          const rect = host.getBoundingClientRect();
          pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        host.addEventListener("pointermove", onMove);
        cleanupPointer = () => host.removeEventListener("pointermove", onMove);

        const clock = new THREE.Clock();
        const tick = () => {
          if (disposed) return;
          const t = clock.getElapsedTime();
          group.rotation.y = pointerX * 0.45 + Math.sin(t * 0.35) * 0.12;
          group.rotation.x = -pointerY * 0.25 + Math.sin(t * 0.5) * 0.05;
          renderer.render(scene, camera);
          frameId = requestAnimationFrame(tick);
        };
        tick();
        setReady(true);
      })
      .catch(() => {
        // הרשת חסומה, ה-CDN לא זמין, או WebGL לא נתמך — נשארים על הפולבאק הסטטי בשקט
        setActive(false);
      });

    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      cleanupPointer?.();
      if (group) {
        group.traverse((obj: any) => {
          obj.geometry?.dispose?.();
          const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
          mats.forEach((m: any) => m.dispose?.());
        });
      }
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  }, [active]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: 150,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 22,
        background:
          ready && active
            ? "transparent"
            : "linear-gradient(135deg, color-mix(in oklch, var(--acc) 14%, var(--card)), var(--card))",
      }}
    >
      {(!ready || !active) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "72%",
              height: "68%",
              borderRadius: 10,
              border: "1.5px solid color-mix(in oklch, var(--acc) 45%, var(--line))",
              background: "color-mix(in oklch, var(--acc) 6%, transparent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: 12,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: i === 1 ? "70%" : "45%",
                  borderRadius: 6,
                  background: "color-mix(in oklch, var(--acc) 55%, transparent)",
                  opacity: 0.9 - i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
