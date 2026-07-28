/**
 * מיני-BiDi לצורך הטבעת טקסט ב-PDF.
 *
 * pdf-lib מצייר גליפים משמאל לימין בסדר שבו הם מופיעים במחרוזת, ולא יודע לסדר
 * עברית. בלי הסידור הזה "גיא" היה נכתב "איג". הפונקציה מסדרת את המחרוזת
 * לסדר ויזואלי: היא מפצלת לרצפים לפי כיווניות, הופכת את סדר הרצפים, והופכת
 * את התווים בתוך כל רצף עברי.
 *
 * זה לא מימוש מלא של אלגוריתם ה-BiDi של יוניקוד. הוא מכסה את מה שבפועל נכנס
 * לשדות של הצעת מחיר: שם, שם עסק, מספר עוסק, אימייל ותאריך — בעברית, באנגלית,
 * או שילוב פשוט של השניים.
 */

const RTL = /[֐-׿؀-ۿ܀-ݏיִ-﷿ﹰ-﻿]/;
const LTR = /[A-Za-zÀ-ɏ]/;
// תווים שאין להם כיווניות משלהם ולוקחים אותה מהשכנים
const NEUTRAL = /[\s\d.,:;!?'"()\[\]{}\/\\@#%&*+=_~^`|<>–—־-]/;

// סוגריים ותווים שצריך לשקף כשהם בתוך רצף עברי
const MIRROR: Record<string, string> = {
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
  '<': '>', '>': '<',
};

type Dir = 'rtl' | 'ltr';
type Run = { dir: Dir; text: string };

function charDir(ch: string): Dir | null {
  if (RTL.test(ch)) return 'rtl';
  if (LTR.test(ch)) return 'ltr';
  return null; // ניטרלי
}

/** האם המחרוזת מכילה בכלל תווים מכיוון ימין לשמאל */
export function hasRTL(s: string): boolean {
  return RTL.test(s);
}

/**
 * ממיר מחרוזת מסדר לוגי לסדר ויזואלי, מוכן לציור ב-PDF.
 * base הוא הכיוון הבסיסי של השדה: 'rtl' לשדות עבריים.
 */
export function toVisual(input: string, base: Dir = 'rtl'): string {
  const s = (input ?? '').toString();
  if (!s) return '';
  // אין עברית בכלל — אין מה לסדר
  if (!hasRTL(s)) return s;

  // 1. פיצול לרצפים. תווים ניטרליים נספחים לרצף שלפניהם, ואם אין — לזה שאחריהם.
  const runs: Run[] = [];
  let buf = '';
  let cur: Dir | null = null;

  const flush = () => {
    if (buf) runs.push({ dir: (cur ?? base) as Dir, text: buf });
    buf = '';
  };

  for (let i = 0; i < s.length; i++) {
    const ch = s.charAt(i);
    const d = charDir(ch);
    if (d === null) {
      // ניטרלי: ממשיך את הרצף הנוכחי
      buf += ch;
      continue;
    }
    if (cur === null) {
      cur = d;
      buf += ch;
      continue;
    }
    if (d === cur) {
      buf += ch;
    } else {
      flush();
      cur = d;
      buf = ch;
    }
  }
  flush();

  // 2. רווחים שנתקעו בסוף רצף שייכים לגבול ולא לרצף — מונע רווחים כפולים בהיפוך
  const trimmed: Run[] = runs.map((r) => r);

  // 3. הפיכת סדר הרצפים כשהבסיס ימין-לשמאל
  const ordered = base === 'rtl' ? [...trimmed].reverse() : trimmed;

  // 4. הפיכת התווים בתוך כל רצף עברי, כולל שיקוף סוגריים
  return ordered
    .map((r) => {
      if (r.dir !== 'rtl') return r.text;
      return r.text
        .split('')
        .reverse()
        .map((c) => MIRROR[c] ?? c)
        .join('');
    })
    .join('');
}
