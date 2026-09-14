"use client";
import { useState } from "react";

/** תמונה ממוזערת לשורת פרויקט ב-/work, עם fallback כשה-mshots screenshot
    נכשל לטעון. חולץ לרכיב לקוח נפרד כי onError הוא event handler -- אי אפשר
    להעביר אותו כ-prop מתוך Server Component (בדיוק כמו GalleryVideo ב-
    WorkGrid.tsx, שנחלץ מאותה סיבה בדיוק לגבי וידאו). */
export default function WorkRowThumb({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="work-preview-fallback">תצוגה מקדימה אינה זמינה<br />אפשר להמשיך לפרויקט</span>;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
      onError={() => setFailed(true)}
    />
  );
}
