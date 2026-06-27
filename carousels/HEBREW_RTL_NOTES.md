# Hebrew RTL in Pillow — מה למדנו

## הבעיה
Pillow על Windows (pip install) **לא** כולל libraqm.
קריאה ל-`draw.text(..., direction='rtl', language='he')` זורקת:
```
KeyError: 'setting text direction, language or font features is not supported without libraqm'
```

## הפתרון — שלושה חוקים

### 1. השתמשי ב-python-bidi
```bash
pip install python-bidi
```

בתחילת הסקריפט:
```python
from PIL import features as _pf
_HAS_RAQM = _pf.check_feature('raqm')

if not _HAS_RAQM:
    from bidi.algorithm import get_display as _gd
    def _bidi(t): return _gd(t, base_dir='R')  # ← חובה base_dir='R'
else:
    def _bidi(t): return t  # Linux עם libraqm — לא צריך
```

### 2. תמיד `base_dir='R'` — לא auto-detect
בלי `base_dir='R'`, אם המחרוזת מתחילה באנגלית (כמו "Claude ..."),
הבידי מזהה LTR ומהפך את הסדר. **תמיד** תציין `base_dir='R'` לטקסט עברי.

### 3. סדר מילות אנגלית בתוך עברית
בטקסט RTL, **מילה אנגלית בתחילת המחרוזת** (לוגית) → מופיעה בצד **ימין**.  
מילה אנגלית בסוף המחרוזת → מופיעה בצד **שמאל**.

```python
# ✓ Claude בימין:
"Claude לא כותב לך עברית כמו שצריך?"

# ✗ Claude בשמאל (בסוף — בעייתי):
"לא כותב לך עברית כמו שצריך? Claude"
```

**שתי מילות אנגלית באותה שורה** → בלגן ויזואלי.
פתרון: תשתמשי בעברית פונטית לאחת מהן (`סקיל` במקום `Skill`, `קלוד` במקום `Claude`) — או שתי שורות נפרדות.

---

## פונקציות סטנדרטיות (copy-paste)

```python
def tw(draw, text, font, rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    kw = dict(direction='rtl', language='he') if (rtl and _HAS_RAQM) else {}
    b = draw.textbbox((0, 0), t, font=font, **kw)
    return b[2] - b[0]

def th(draw, text, font, rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    kw = dict(direction='rtl', language='he') if (rtl and _HAS_RAQM) else {}
    b = draw.textbbox((0, 0), t, font=font, **kw)
    return b[3] - b[1]

def txt(draw, x, y, text, font, color, rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    kw = dict(direction='rtl', language='he') if (rtl and _HAS_RAQM) else {}
    draw.text((x, y), t, font=font, fill=color, **kw)

def rtxt(draw, y, text, font, color, margin=80):
    """ימין-מיושר"""
    w = tw(draw, text, font)
    txt(draw, W - w - margin, y, text, font, color)
    return th(draw, text, font)

def ctxt(draw, y, text, font, color, rtl=True):
    """מרוכז"""
    w = tw(draw, text, font, rtl)
    txt(draw, (W - w) // 2, y, text, font, color, rtl)
    return th(draw, text, font, rtl)
```

---

## פונטים
| מערכת | Regular | Bold |
|---|---|---|
| Linux | `/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf` | `DejaVuSans-Bold.ttf` |
| Windows | `C:/Windows/Fonts/arial.ttf` | `C:/Windows/Fonts/arialbd.ttf` |

```python
import os
_deja = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
if os.path.exists(_deja):
    RB, BB = _deja, _deja.replace(".ttf", "-Bold.ttf")
else:
    RB, BB = "C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/arialbd.ttf"
```

---

## סיכום התקנה (Windows, פעם אחת)
```bash
winget install Python.Python.3.12
# פתחי טרמינל חדש
python -m pip install pillow python-bidi
```

הסקריפט המלא נמצא ב: `carousels/gen_v6.py`
