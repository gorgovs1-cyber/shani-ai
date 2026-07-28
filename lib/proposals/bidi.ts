/**
 * סידור טקסט עברי לציור ב-PDF.
 *
 * הרקע: מנוע העיצוב של fontkit הופך בעצמו כל מחרוזת שיש בה עברית, אבל הוא
 * לא יודע לטפל במספרים, באנגלית או בסוגריים שיושבים באותה שורה. לכן אנחנו
 * לא מוסרים לו שורה שלמה, אלא מפצלים אותה לרצפים לפי כיווניות, מסדרים את
 * הרצפים מימין לשמאל, ומציירים כל רצף במקום שלו. רצף עברי מגיע אליו כמו
 * שהוא והוא יהפוך אותו נכון; מספרים ואנגלית נשארים בדיוק כפי שהם.
 *
 * הפיצול מיישם את החלקים המעשיים של אלגוריתם ה-BiDi של יוניקוד:
 *  W4 — מפריד בודד בין שתי ספרות נבלע במספר, כך ש-28.07.2026 נשאר שלם.
 *  W7 — מספר שהחזק שלפניו הוא אנגלית הופך לאנגלית, כך ש-IP 79.177.143.252
 *       נשאר בלוק אחד ולא מתפרק.
 *  N1 — מספר משפיע על תווים ניטרליים כאילו היה עברית, ולכן המפריד שבין
 *       תאריך לכתובת אימייל מקבל את כיוון הבסיס ולא נדבק לאנגלית.
 *
 * הפלט אומת מול רינדור של כרום על אותן מחרוזות, והוא זהה לו.
 */
import type { PDFFont, PDFPage, RGB } from 'pdf-lib';

const RE_R = /[֐-׿؀-ۿ߀-ࣿיִ-﷿ﹰ-﻿]/;
const RE_L = /[A-Za-zÀ-ɏ]/;
const RE_EN = /[0-9]/;
const RE_SEP = /[.,:/-]/;

const MIRROR: Record<string, string> = {
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<',
};

type Dir = 'rtl' | 'ltr';
type T = 'R' | 'L' | 'N';
export type Run = { dir: T; text: string };

function baseType(ch: string): T | null {
  if (RE_R.test(ch)) return 'R';
  if (RE_L.test(ch)) return 'L';
  if (RE_EN.test(ch)) return 'N';
  return null;
}

function resolve(s: string, base: Dir): T[] {
  const n = s.length;
  const t: (T | null)[] = new Array(n);
  for (let i = 0; i < n; i++) t[i] = baseType(s.charAt(i));

  // W4 — מפריד בודד בין שתי ספרות הוא חלק מהמספר
  for (let i = 1; i < n - 1; i++) {
    if (t[i] === null && RE_SEP.test(s.charAt(i)) && t[i - 1] === 'N' && t[i + 1] === 'N') t[i] = 'N';
  }
  // W7 — מספר שהחזק שלפניו הוא אנגלית מצטרף לאנגלית
  for (let i = 0; i < n; i++) {
    if (t[i] !== 'N') continue;
    let prev: T | null = null;
    for (let j = i - 1; j >= 0; j--) {
      if (t[j] === 'R' || t[j] === 'L') { prev = t[j] as T; break; }
    }
    if (prev === 'L') t[i] = 'L';
  }
  // N1/N2 — ניטרלי בין שני צדדים שווי-כיוון מקבל אותם, אחרת כיוון הבסיס.
  // לצורך הכלל הזה מספר נחשב כמו עברית.
  const strong = (x: T): T => (x === 'N' ? 'R' : x);
  for (let i = 0; i < n; i++) {
    if (t[i]) continue;
    let p: T | null = null;
    let q: T | null = null;
    for (let j = i - 1; j >= 0; j--) if (t[j]) { p = strong(t[j] as T); break; }
    for (let j = i + 1; j < n; j++) if (t[j]) { q = strong(t[j] as T); break; }
    t[i] = p && p === q ? p : base === 'rtl' ? 'R' : 'L';
  }
  return t as T[];
}

/** רצפים בסדר ויזואלי, משמאל לימין */
export function visualRuns(input: string, base: Dir = 'rtl'): Run[] {
  const s = (input ?? '').toString();
  if (!s) return [];
  const t = resolve(s, base);
  const out: Run[] = [];
  let cur = t[0];
  let buf = s.charAt(0);
  for (let i = 1; i < s.length; i++) {
    if (t[i] === cur) buf += s.charAt(i);
    else { out.push({ dir: cur, text: buf }); cur = t[i]; buf = s.charAt(i); }
  }
  out.push({ dir: cur, text: buf });
  return base === 'rtl' ? out.reverse() : out;
}

/** רצף עברי עובר שיקוף סוגריים, כי המנוע הופך סדר ולא מחליף פותח בסוגר */
function paint(run: Run): string {
  if (run.dir !== 'R' || !RE_R.test(run.text)) return run.text;
  let o = '';
  for (let i = 0; i < run.text.length; i++) {
    const c = run.text.charAt(i);
    o += MIRROR[c] ?? c;
  }
  return o;
}

function runsWidth(vr: Run[], font: PDFFont, size: number): number {
  let w = 0;
  for (const r of vr) w += font.widthOfTextAtSize(paint(r), size);
  return w;
}

export function measure(text: string, font: PDFFont, size: number): number {
  return runsWidth(visualRuns(text, 'rtl'), font, size);
}

/**
 * מצייר שורה מיושרת לימין שקצה הימני שלה ב-rightX.
 * מקטין את הגופן אם היא רחבה מ-maxWidth, ומחזיר את הגודל שהתאים.
 */
export function drawRTL(
  page: PDFPage,
  rightX: number,
  y: number,
  text: string,
  font: PDFFont,
  size: number,
  color: RGB,
  maxWidth?: number
): number {
  const vr = visualRuns(text, 'rtl');
  if (!vr.length) return size;
  let s = size;
  let w = runsWidth(vr, font, s);
  if (maxWidth) {
    while (w > maxWidth && s > 6) { s -= 0.5; w = runsWidth(vr, font, s); }
  }
  let x = rightX - w;
  for (const r of vr) {
    const t = paint(r);
    page.drawText(t, { x, y, size: s, font, color });
    x += font.widthOfTextAtSize(t, s);
  }
  return s;
}
