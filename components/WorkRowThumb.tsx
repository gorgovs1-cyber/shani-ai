"use client";

/** תמונה ממוזערת לשורת פרויקט ב-/work, עם fallback כשה-mshots screenshot
    נכשל לטעון. חולץ לרכיב לקוח נפרד כי onError הוא event handler -- אי אפשר
    להעביר אותו כ-prop מתוך Server Component (בדיוק כמו GalleryVideo ב-
    WorkGrid.tsx, שנחלץ מאותה סיבה בדיוק לגבי וידאו). */
export default function WorkRowThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
