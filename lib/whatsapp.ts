/** הודעה מוכנה, כדי שפנייה מהאתר תגיע עם הקשר. */
export function waLink(lang: "he" | "en" = "he"): string {
  const text =
    lang === "en"
      ? "Hi Shani, I came from the website and would like a fit check."
      : "היי שני, הגעתי מהאתר ואשמח לבדיקת התאמה.";
  return `https://wa.me/972504744815?text=${encodeURIComponent(text)}`;
}
