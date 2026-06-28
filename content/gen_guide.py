#!/usr/bin/env python3
"""Claude Desktop Installation Guide — SHANI AI CREATOR
Run: python gen_guide.py
Output: content/claude_desktop_guide.pdf
"""
from PIL import Image, ImageDraw, ImageFont
import os, math

# Brand colors
BG=(20,16,9); ORANGE=(242,98,46); TEXT=(244,237,225); DIM=(160,152,144); CARD=(32,24,14)
W,H = 1080,1350

# Fonts
_deja = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
if os.path.exists(_deja):
    RB, BB = _deja, _deja.replace(".ttf","-Bold.ttf")
else:
    RB, BB = "C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/arialbd.ttf"

# Hebrew bidi
try:
    from PIL.features import check_feature as _cf
    _HAS_RAQM = _cf('raqm')
except:
    _HAS_RAQM = False

if not _HAS_RAQM:
    try:
        from bidi.algorithm import get_display as _gd
        def _bidi(t): return _gd(t, base_dir='R')
    except ImportError:
        def _bidi(t): return t
else:
    def _bidi(t): return t

def fnt(bold=False, size=40):
    return ImageFont.truetype(BB if bold else RB, size)

def tw(draw, text, font, rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    kw = dict(direction='rtl',language='he') if (rtl and _HAS_RAQM) else {}
    b = draw.textbbox((0,0),t,font=font,**kw); return b[2]-b[0]

def th(draw, text, font, rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    kw = dict(direction='rtl',language='he') if (rtl and _HAS_RAQM) else {}
    b = draw.textbbox((0,0),t,font=font,**kw); return b[3]-b[1]

def txt(draw, x, y, text, font, color, rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    kw = dict(direction='rtl',language='he') if (rtl and _HAS_RAQM) else {}
    draw.text((x,y),t,font=font,fill=color,**kw)

def rtxt(draw, y, text, font, color, margin=80):
    w = tw(draw,text,font)
    txt(draw, W-w-margin, y, text, font, color)
    return th(draw,text,font)

def ctxt(draw, y, text, font, color, rtl=True):
    w = tw(draw,text,font,rtl)
    txt(draw,(W-w)//2, y, text, font, color, rtl)
    return th(draw,text,font,rtl)

def draw_hex(draw, cx, cy, r, lw):
    pts=[(cx+r*math.cos(math.radians(90+60*i)),cy+r*math.sin(math.radians(90+60*i))) for i in range(6)]
    for i in range(6): draw.line([pts[i],pts[(i+1)%6]],fill=ORANGE,width=lw)

def base():
    img = Image.new('RGB',(W,H),BG)
    draw = ImageDraw.Draw(img)
    # Subtle glow top-right
    g = Image.new('RGB',(W,H),BG); gd=ImageDraw.Draw(g)
    gd.ellipse([W-500,-200,W+150,450],fill=(38,22,10))
    img = Image.blend(img,g,0.55)
    draw = ImageDraw.Draw(img)
    # Corner accents
    draw.line([(W-60,44),(W-40,44)],fill=ORANGE,width=2)
    draw.line([(W-40,44),(W-40,66)],fill=ORANGE,width=2)
    draw.line([(40,H-44),(60,H-44)],fill=ORANGE,width=2)
    draw.line([(40,H-66),(40,H-44)],fill=ORANGE,width=2)
    return img, draw

def header(img, draw, page_n, total):
    cx,cy=64,66
    draw_hex(draw,cx,cy,28,5); draw_hex(draw,cx,cy,14,3)
    d=5; draw.ellipse([cx-d,cy-d,cx+d,cy+d],fill=ORANGE)
    txt(draw,108,50,"SHANI AI CREATOR",fnt(True,24),ORANGE)
    f=fnt(False,22); c=f"{page_n:02d} / {total:02d}"
    cw=tw(draw,c,f); txt(draw,W-cw-44,52,c,f,DIM)
    draw.line([(0,106),(W,106)],fill=(48,36,22),width=1)

def footer(img):
    overlay=Image.new('RGBA',(W,H),(0,0,0,0)); od=ImageDraw.Draw(overlay)
    f=fnt(False,30); t="@shani.creates.ai"
    b=od.textbbox((0,0),t,font=f); tw_=b[2]-b[0]; th_=b[3]-b[1]
    x=(W-tw_)//2; y=H-78
    od.rounded_rectangle([x-22,y-8,x+tw_+22,y+th_+8],radius=20,fill=(0,0,0,115))
    od.text((x,y),t,font=f,fill=(210,190,170,175))
    rgba=img.convert('RGBA'); rgba.paste(overlay,(0,0),overlay)
    return rgba.convert('RGB')

# ── Pages ──────────────────────────────────────────────

def page1():
    """Cover"""
    img,draw = base()
    # Large glow center
    g=Image.new('RGB',(W,H),BG); gd=ImageDraw.Draw(g)
    gd.ellipse([W//2-350,H//2-400,W//2+350,H//2+200],fill=(45,18,6))
    img=Image.blend(img,g,0.7); draw=ImageDraw.Draw(img)

    f1=fnt(False,44); f2=fnt(True,96); f3=fnt(True,88); f4=fnt(False,36)
    y=300
    ctxt(draw,y,"מדריך",f1,DIM); y+=th(draw,"מדריך",f1)+30
    ctxt(draw,y,"התקנת",f2,TEXT); y+=th(draw,"התקנת",f2)+36
    ctxt(draw,y,"Claude Desktop",fnt(True,84),ORANGE); y+=th(draw,"Claude Desktop",fnt(True,84))+60

    sub="מהמחשב שלך, בדקה אחת."; subw=tw(draw,sub,f4)
    txt(draw,(W-subw)//2,y,sub,f4,DIM); y+=th(draw,sub,f4)+80

    # Decorative line
    draw.line([(W//2-120,y),(W//2+120,y)],fill=ORANGE,width=2); y+=40

    ctxt(draw,y,"המדריך המלא — שלב אחר שלב",fnt(False,32),DIM)

    header(img,draw,1,6); img=footer(img)
    return img

def page2():
    """מה זה Claude Desktop"""
    img,draw = base()
    f_t=fnt(True,88); f_b=fnt(False,44); f_l=fnt(False,42)
    y=130
    rtxt(draw,y,"מה זה",f_t,DIM); y+=th(draw,"מה זה",f_t)+40
    rtxt(draw,y,"Claude Desktop?",fnt(True,80),ORANGE); y+=th(draw,"Claude Desktop?",fnt(True,80))+50

    intro="לא אתר. לא דפדפן."
    rtxt(draw,y,intro,f_b,TEXT); y+=th(draw,intro,f_b)+18
    intro2="תוכנה שרצה ישירות על המחשב שלך."
    rtxt(draw,y,intro2,f_b,TEXT); y+=th(draw,intro2,f_b)+50

    items=[
        "גישה לקבצים ותיקיות מהמחשב",
        "חיבור לפרויקטים ארוכי טווח",
        "Skills & Plugins — כלים מתקדמים",
        "Claude שיודע מי את ומה הצרכים שלך",
    ]
    fi=fnt(False,40)
    for item in items:
        rw=tw(draw,item,fi)
        # orange dot
        draw.ellipse([W-100,y+14,W-84,y+30],fill=ORANGE)
        txt(draw,W-rw-118,y,item,fi,TEXT)
        y+=th(draw,item,fi)+28

    header(img,draw,2,6); img=footer(img)
    return img

def page3():
    """הורדה"""
    img,draw = base()
    f_t=fnt(True,96); f_url=fnt(True,72); f_b=fnt(False,44); f_os=fnt(True,50)
    y=130
    rtxt(draw,y,"שלב 1",fnt(False,36),ORANGE); y+=46
    rtxt(draw,y,"הורדה",f_t,TEXT); y+=th(draw,"הורדה",f_t)+40

    rtxt(draw,y,"היכנסו לאתר:",f_b,DIM); y+=th(draw,"היכנסו לאתר:",f_b)+18
    urlw=tw(draw,"claude.ai/download",f_url,rtl=False)
    txt(draw,(W-urlw)//2,y,"claude.ai/download",f_url,ORANGE,rtl=False)
    y+=th(draw,"claude.ai/download",f_url)+50

    rtxt(draw,y,"בחרו לפי מערכת ההפעלה:",f_b,DIM); y+=th(draw,"בחרו לפי מערכת ההפעלה:",f_b)+24

    for label in ["Mac  →  .dmg", "Windows  →  .exe"]:
        card_h=108
        draw.rounded_rectangle([80,y,W-80,y+card_h],radius=13,fill=CARD,outline=(55,40,22),width=1)
        lh=th(draw,label,f_os)
        rtxt(draw,y+(card_h-lh)//2,label,f_os,TEXT)
        y+=card_h+20

    y+=20
    free="חינמי לחלוטין ✓"
    freew=tw(draw,free,fnt(True,48))
    txt(draw,(W-freew)//2,y,free,fnt(True,48),ORANGE)

    header(img,draw,3,6); img=footer(img)
    return img

def page4():
    """התקנה"""
    img,draw = base()
    f_t=fnt(True,110); f_b=fnt(False,44); f_c=fnt(False,42)
    y=130
    rtxt(draw,y,"שלב 2",fnt(False,36),ORANGE); y+=46
    rtxt(draw,y,"התקנה",f_t,TEXT); y+=th(draw,"התקנה",f_t)+18
    rtxt(draw,y,"דקה אחת.",fnt(True,90),ORANGE); y+=th(draw,"דקה אחת.",fnt(True,90))+50

    steps=["פתחו את הקובץ שהורדתם","לחצו Install / המשיכו","זהו. סיימתם."]
    fc=fnt(False,42); pad=22; cgap=16
    clh=th(draw,steps[0],fc)
    card_total=len(steps)*(clh+cgap)-cgap+pad*2+10
    draw.rounded_rectangle([80,y,W-80,y+card_total],radius=14,fill=CARD)
    draw.line([(W-80,y),(W-80,y+card_total)],fill=ORANGE,width=5)
    ty=y+pad
    for s in steps:
        rtxt(draw,ty,s,fc,TEXT,margin=100); ty+=clh+cgap
    y+=card_total+40

    note="אין קוד. אין הגדרות מסובכות."
    rtxt(draw,y,note,fnt(False,40),DIM)

    header(img,draw,4,6); img=footer(img)
    return img

def page5():
    """התחברות"""
    img,draw = base()
    f_t=fnt(True,100); f_b=fnt(False,44); f_c=fnt(False,42); f_url=fnt(True,52)
    y=130
    rtxt(draw,y,"שלב 3",fnt(False,36),ORANGE); y+=46
    rtxt(draw,y,"התחברות",f_t,TEXT); y+=th(draw,"התחברות",f_t)+50

    rtxt(draw,y,"פתחו את Claude Desktop",f_b,TEXT); y+=th(draw,"פתחו את Claude Desktop",f_b)+22
    rtxt(draw,y,"והתחברו לחשבון Claude שלכן.",f_b,TEXT); y+=th(draw,"והתחברו לחשבון Claude שלכן.",f_b)+50

    # No account box
    draw.rounded_rectangle([80,y,W-80,y+200],radius=14,fill=CARD)
    draw.line([(W-80,y),(W-80,y+200)],fill=ORANGE,width=5)
    rtxt(draw,y+22,"אין חשבון? אין בעיה —",fnt(False,40),DIM,margin=100)
    rtxt(draw,y+70,"הרשמה חינמית תוך דקה:",fnt(False,40),TEXT,margin=100)
    urlw=tw(draw,"claude.ai",f_url,rtl=False)
    txt(draw,W-urlw-100,y+120,"claude.ai",f_url,ORANGE,rtl=False)
    y+=200+50

    rtxt(draw,y,"בחרו: Sign In / Create Account",f_b,DIM)

    header(img,draw,5,6); img=footer(img)
    return img

def page6():
    """CTA / Back cover"""
    img,draw = base()
    g=Image.new('RGB',(W,H),BG); gd=ImageDraw.Draw(g)
    gd.ellipse([W//2-400,H//2-350,W//2+400,H//2+350],fill=(38,20,9))
    img=Image.blend(img,g,0.65); draw=ImageDraw.Draw(img)

    f_h=fnt(True,96); f_m=fnt(False,42); f_kw=fnt(True,84)
    y=220
    ctxt(draw,y,"מוכנה.",f_h,TEXT); y+=th(draw,"מוכנה.",f_h)+16
    ctxt(draw,y,"מה עכשיו?",f_h,ORANGE); y+=th(draw,"מה עכשיו?",f_h)+60

    tips=["נסי לבקש ממנו לקרוא קובץ מהמחשב",
          "התקיני Skills & Plugins",
          "עקבי לטיפים נוספים"]
    for tip in tips:
        ctxt(draw,y,tip,f_m,DIM); y+=th(draw,tip,f_m)+22
    y+=40

    # Follow box
    bx=140
    draw.rounded_rectangle([bx,y,W-bx,y+180],radius=18,fill=(36,18,8))
    draw.rounded_rectangle([bx,y,W-bx,y+180],radius=18,outline=ORANGE,width=2)
    lw_=tw(draw,"עקבי כאן",fnt(False,30)); txt(draw,(W-lw_)//2,y+22,"עקבי כאן",fnt(False,30),DIM)
    kw="@shani.creates.ai"; kww=tw(draw,kw,fnt(True,52),rtl=False)
    txt(draw,(W-kww)//2,y+70,kw,fnt(True,52),ORANGE,rtl=False)
    y+=180+40

    ctxt(draw,y,"ואשלח לך עוד מדריכים",f_m,DIM)

    header(img,draw,6,6); img=footer(img)
    return img

# ── Generate PDF ────────────────────────────────────────

import io, shutil
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE,"claude_desktop_guide.pdf")
TMP = os.path.join(HERE,"_tmp_pages")
os.makedirs(TMP, exist_ok=True)

pages = [page1(), page2(), page3(), page4(), page5(), page6()]

png_files = []
for i, p in enumerate(pages):
    path = os.path.join(TMP, f"p{i+1}.png")
    p.save(path, "PNG")
    png_files.append(path)
    print(f"  page {i+1} done")

import img2pdf
with open(OUT,"wb") as f:
    f.write(img2pdf.convert(png_files))

shutil.rmtree(TMP, ignore_errors=True)
print(f"\n✓ Guide saved: {OUT}")
