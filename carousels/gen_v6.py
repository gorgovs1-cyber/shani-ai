#!/usr/bin/env python3
"""Carousel v6 — vertical centering, Hebrew RTL, SHANI AI CREATOR brand"""
from PIL import Image, ImageDraw, ImageFont
import os, math

BG=(20,16,9); ORANGE=(242,98,46); TEXT=(244,237,225); DIM=(160,152,144); CARD=(32,24,14)
W,H=1080,1350
ZONE_TOP=115; ZONE_BOT=1265; ZONE_H=ZONE_BOT-ZONE_TOP

# Fonts — DejaVu on Linux, Arial on Windows
import os as _os
_deja_r = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
_deja_b = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
if _os.path.exists(_deja_r):
    RB, BB = _deja_r, _deja_b
else:
    RB, BB = "C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/arialbd.ttf"

# Hebrew bidi — use libraqm if available, else python-bidi
try:
    from PIL.features import check_feature as _cf
    _HAS_RAQM = _cf('raqm')
except Exception:
    _HAS_RAQM = False

if not _HAS_RAQM:
    try:
        from bidi.algorithm import get_display as _gd
        def _bidi(t): return _gd(t, base_dir='R')
    except ImportError:
        def _bidi(t): return t
else:
    def _bidi(t): return t

def fnt(bold=False,size=40): return ImageFont.truetype(BB if bold else RB,size)

def tw(draw,text,font,rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    kw = dict(direction='rtl',language='he') if (rtl and _HAS_RAQM) else {}
    b=draw.textbbox((0,0),t,font=font,**kw); return b[2]-b[0]

def th(draw,text,font,rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    kw = dict(direction='rtl',language='he') if (rtl and _HAS_RAQM) else {}
    b=draw.textbbox((0,0),t,font=font,**kw); return b[3]-b[1]

def txt(draw,x,y,text,font,color,rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    kw = dict(direction='rtl',language='he') if (rtl and _HAS_RAQM) else {}
    draw.text((x,y),t,font=font,fill=color,**kw)
def rtxt(draw,y,text,font,color,margin=80):
    w=tw(draw,text,font); txt(draw,W-w-margin,y,text,font,color); return th(draw,text,font)
def ctxt(draw,y,text,font,color,rtl=True):
    w=tw(draw,text,font,rtl); txt(draw,(W-w)//2,y,text,font,color,rtl); return th(draw,text,font,rtl)
def draw_hex(draw,cx,cy,r,lw):
    pts=[(cx+r*math.cos(math.radians(90+60*i)),cy+r*math.sin(math.radians(90+60*i))) for i in range(6)]
    for i in range(6): draw.line([pts[i],pts[(i+1)%6]],fill=ORANGE,width=lw)
def yc(total_h): return ZONE_TOP + max(30,(ZONE_H-total_h)//2)

def base():
    img=Image.new('RGB',(W,H),BG); draw=ImageDraw.Draw(img)
    g=Image.new('RGB',(W,H),BG); gd=ImageDraw.Draw(g)
    gd.ellipse([W-500,-200,W+150,450],fill=(38,22,10))
    img=Image.blend(img,g,0.55); draw=ImageDraw.Draw(img)
    draw.line([(W-60,44),(W-40,44)],fill=ORANGE,width=2)
    draw.line([(W-40,44),(W-40,66)],fill=ORANGE,width=2)
    draw.line([(40,H-44),(60,H-44)],fill=ORANGE,width=2)
    draw.line([(40,H-66),(40,H-44)],fill=ORANGE,width=2)
    return img,draw

def header(img,draw,n,total):
    cx,cy=64,66
    draw_hex(draw,cx,cy,28,5); draw_hex(draw,cx,cy,14,3)
    d=5; draw.ellipse([cx-d,cy-d,cx+d,cy+d],fill=ORANGE)
    txt(draw,108,50,"SHANI AI CREATOR",fnt(True,24),ORANGE,rtl=False)
    f=fnt(False,22); c=f"{n:02d} / {total:02d}"
    cw=tw(draw,c,f,rtl=False); txt(draw,W-cw-44,52,c,f,DIM,rtl=False)
    draw.line([(0,106),(W,106)],fill=(48,36,22),width=1)

def footer(img):
    overlay=Image.new('RGBA',(W,H),(0,0,0,0)); od=ImageDraw.Draw(overlay)
    f=fnt(False,30); t="@shani.creates.ai"
    b=od.textbbox((0,0),t,font=f); tw_=b[2]-b[0]; th_=b[3]-b[1]
    x=(W-tw_)//2; y=H-78
    od.rounded_rectangle([x-22,y-8,x+tw_+22,y+th_+8],radius=20,fill=(0,0,0,115))
    od.text((x,y),t,font=f,fill=(210,190,170,175))
    rgba=img.convert('RGBA'); rgba.paste(overlay,(0,0),overlay); return rgba.convert('RGB')

def sec_block(draw,y,label):
    f=fnt(False,32); lh=th(draw,label,f)
    rtxt(draw,y,label,f,ORANGE); y+=lh+14
    draw.line([(80,y),(W-80,y)],fill=(50,38,22),width=1); y+=10
    draw.rectangle([W-160,y,W-80,y+5],fill=ORANGE); y+=5+28
    return y

def sec_h(draw,label):
    f=fnt(False,32); lh=th(draw,label,f); return lh+57

HERE = os.path.dirname(os.path.abspath(__file__))
OUT1=os.path.join(HERE,"carousel1")
OUT2=os.path.join(HERE,"carousel2")
os.makedirs(OUT1,exist_ok=True); os.makedirs(OUT2,exist_ok=True)

def c1s1():
    img,draw=base()
    f_big=fnt(True,104); f_sub=fnt(False,46)
    lines=["להתקין קלוד","על המחשב","בדקה."]
    lh=[th(draw,l,f_big) for l in lines]; gap=22
    hook_h=sum(lh)+(len(lh)-1)*gap
    sub="אף אחד לא מסביר אותו בעברית."; sub_h=th(draw,sub,f_sub)
    y=yc(hook_h+52+sub_h)
    for i,line in enumerate(lines):
        rtxt(draw,y,line,f_big,ORANGE if i==2 else TEXT); y+=lh[i]+gap
    y+=40; rtxt(draw,y,sub,f_sub,DIM)
    header(img,draw,1,7); img=footer(img)
    img.save(f"{OUT1}/slide_01.png"); print("C1S1 done")

def c1s2():
    img,draw=base()
    f_t=fnt(True,96); f_b=fnt(False,44)
    label="01 | מה זה"
    sh=sec_h(draw,label)
    t1="לא אתר."; t2="תוכנה."
    t1h=th(draw,t1,f_t); t2h=th(draw,t2,f_t)
    items=["Claude Desktop רץ על המחשב שלך.","גישה לקבצים, לפרויקטים, לכלים.","AI שיודע מי את."]
    ih=[th(draw,it,f_b) for it in items]; igap=22
    items_h=sum(ih)+(len(ih)-1)*igap
    total_h=sh+t1h+20+t2h+52+items_h
    y=yc(total_h)
    y=sec_block(draw,y,label)
    rtxt(draw,y,t1,f_t,TEXT); y+=t1h+20
    rtxt(draw,y,t2,f_t,ORANGE); y+=t2h+52
    for i,item in enumerate(items):
        rtxt(draw,y,item,f_b,ORANGE if i==2 else TEXT)
        y+=ih[i]+(igap if i<len(items)-1 else 0)
    header(img,draw,2,7); img=footer(img)
    img.save(f"{OUT1}/slide_02.png"); print("C1S2 done")

def c1s3():
    img,draw=base()
    f_url=fnt(True,72); f_b=fnt(False,44); f_os=fnt(True,48); f_free=fnt(True,50)
    label="02 | הורדה"
    sh=sec_h(draw,label)
    url="claude.ai/download"; url_h=th(draw,url,f_url,rtl=False)+36
    sub="הורידו לפי מערכת ההפעלה:"; sub_h=th(draw,sub,f_b)+34
    card_h=108; n_os=2; cards_h=n_os*card_h+(n_os-1)*20+14
    free="חינמי לחלוטין."; free_h=th(draw,free,f_free)
    total_h=sh+url_h+sub_h+cards_h+free_h
    y=yc(total_h)
    y=sec_block(draw,y,label)
    w=tw(draw,url,f_url,rtl=False); txt(draw,(W-w)//2,y,url,f_url,ORANGE,rtl=False); y+=url_h
    rtxt(draw,y,sub,f_b,DIM); y+=sub_h
    for lbl in ["Mac  ->  .dmg","Windows  ->  .exe"]:
        draw.rounded_rectangle([80,y,W-80,y+card_h],radius=13,fill=CARD,outline=(55,40,22),width=1)
        lh_=th(draw,lbl,f_os); rtxt(draw,y+(card_h-lh_)//2,lbl,f_os,TEXT)
        y+=card_h+20
    y+=14; rtxt(draw,y,free,f_free,ORANGE)
    header(img,draw,3,7); img=footer(img)
    img.save(f"{OUT1}/slide_03.png"); print("C1S3 done")

def c1s4():
    img,draw=base()
    f_t=fnt(True,112); f_b=fnt(False,44); f_c=fnt(False,40)
    label="03 | התקנה"
    sh=sec_h(draw,label)
    t1="דקה"; t2="אחת."
    t1h=th(draw,t1,f_t); t2h=th(draw,t2,f_t)
    s1="פתחו את הקובץ שהורדתם"; s2="והתקינו כרגיל."
    s1h=th(draw,s1,f_b); s2h=th(draw,s2,f_b)
    card_lines=["אין קוד.","אין הגדרות מסובכות.","ממש כמו כל תוכנה אחרת."]
    clh=th(draw,card_lines[0],f_c); pad=24; cgap=16
    card_total=len(card_lines)*(clh+cgap)-cgap+pad*2
    total_h=sh+t1h+18+t2h+50+s1h+18+s2h+40+card_total
    y=yc(total_h)
    y=sec_block(draw,y,label)
    rtxt(draw,y,t1,f_t,TEXT); y+=t1h+18
    rtxt(draw,y,t2,f_t,ORANGE); y+=t2h+50
    rtxt(draw,y,s1,f_b,TEXT); y+=s1h+18
    rtxt(draw,y,s2,f_b,TEXT); y+=s2h+40
    ct=y
    draw.rounded_rectangle([80,ct,W-80,ct+card_total],radius=14,fill=CARD)
    draw.line([(W-80,ct),(W-80,ct+card_total)],fill=ORANGE,width=5)
    ty=ct+pad
    for line in card_lines:
        rtxt(draw,ty,line,f_c,TEXT,margin=100); ty+=clh+cgap
    header(img,draw,4,7); img=footer(img)
    img.save(f"{OUT1}/slide_04.png"); print("C1S4 done")

def c1s5():
    img,draw=base()
    f_t=fnt(True,94); f_b=fnt(False,44); f_c=fnt(False,42)
    label="04 | התחברות"
    sh=sec_h(draw,label)
    t1="התחברו"; t2="לחשבון Claude"
    t1h=th(draw,t1,f_t); t2h=th(draw,t2,f_t)
    s="אין חשבון? אין בעיה —"; sth=th(draw,s,f_b)
    card_lines=["claude.ai  <-  הרשמה חינמית","תוך דקה — בפנים."]
    clh=th(draw,card_lines[0],f_c); pad=22; cgap=20
    card_total=len(card_lines)*(clh+cgap)-cgap+pad*2
    total_h=sh+t1h+18+t2h+54+sth+44+card_total
    y=yc(total_h)
    y=sec_block(draw,y,label)
    rtxt(draw,y,t1,f_t,TEXT); y+=t1h+18
    rtxt(draw,y,t2,f_t,TEXT); y+=t2h+54
    rtxt(draw,y,s,f_b,DIM); y+=sth+44
    ct=y
    draw.rounded_rectangle([80,ct,W-80,ct+card_total],radius=14,fill=CARD)
    draw.line([(W-80,ct),(W-80,ct+card_total)],fill=ORANGE,width=5)
    ty=ct+pad
    for i,line in enumerate(card_lines):
        rtxt(draw,ty,line,f_c,ORANGE if i==0 else TEXT,margin=100); ty+=clh+cgap
    header(img,draw,5,7); img=footer(img)
    img.save(f"{OUT1}/slide_05.png"); print("C1S5 done")

def c1s6():
    img,draw=base()
    f_t=fnt(True,90); f_i=fnt(False,50); f_dot=fnt(True,38)
    label="05 | למה שווה"
    sh=sec_h(draw,label)
    title="מה מקבלים?"; tith=th(draw,title,f_t)
    items=["זוכר את ההקשר שלך","גישה לקבצים מקומיים","Skills & Plugins","עובד בלי דפדפן"]
    ih=th(draw,items[0],f_i); igap=26
    items_h=len(items)*(ih+igap)
    total_h=sh+tith+50+items_h
    y=yc(total_h)
    y=sec_block(draw,y,label)
    rtxt(draw,y,title,f_t,TEXT); y+=tith+50
    for item in items:
        iw=tw(draw,item,f_i)
        txt(draw,W-iw-126,y,item,f_i,TEXT)
        txt(draw,W-100,y+8,">",f_dot,ORANGE,rtl=False)
        y+=ih+igap
    header(img,draw,6,7); img=footer(img)
    img.save(f"{OUT1}/slide_06.png"); print("C1S6 done")

def c1s7():
    img,draw=base()
    g=Image.new('RGB',(W,H),BG); gd=ImageDraw.Draw(g)
    gd.ellipse([W//2-400,H//2-350,W//2+400,H//2+350],fill=(38,20,9))
    img=Image.blend(img,g,0.65); draw=ImageDraw.Draw(img)
    f_h=fnt(True,108); f_l=fnt(False,30); f_kw=fnt(True,90); f_s=fnt(False,42)
    t1="רוצה"; t2="מדריך מלא?"
    t1h=th(draw,t1,f_h); t2h=th(draw,t2,f_h)
    bh=200; sl_h=th(draw,"x",f_s)
    total_h=t1h+20+t2h+70+bh+36+sl_h
    y=yc(total_h)
    ctxt(draw,y,t1,f_h,TEXT); y+=t1h+20
    ctxt(draw,y,t2,f_h,TEXT); y+=t2h+70
    bx=140
    draw.rounded_rectangle([bx,y,W-bx,y+bh],radius=18,fill=(36,18,8))
    draw.rounded_rectangle([bx,y,W-bx,y+bh],radius=18,outline=ORANGE,width=2)
    l="הגיבו בתגובות"; lw_=tw(draw,l,f_l)
    txt(draw,(W-lw_)//2,y+24,l,f_l,DIM)
    kw="CLAUDE"; kww=tw(draw,kw,f_kw,rtl=False)
    txt(draw,(W-kww)//2,y+70,kw,f_kw,ORANGE,rtl=False)
    y+=bh+36
    s="ואשלח לך אוטומטית"; sw=tw(draw,s,f_s)
    txt(draw,(W-sw)//2,y,s,f_s,DIM)
    header(img,draw,7,7); img=footer(img)
    img.save(f"{OUT1}/slide_07.png"); print("C1S7 done")

def c2s1():
    img,draw=base()
    f_q=fnt(True,80); f_a=fnt(True,78); f_b=fnt(False,36)
    q1="Claude לא כותב לך"; q2="עברית כמו שצריך?"
    q1h=th(draw,q1,f_q); q2h=th(draw,q2,f_q)
    a="בניתי סקיל שפותר את זה."; ah=th(draw,a,f_a)
    badge="חינם · 30 שניות להתקנה"; bh=62
    total_h=q1h+22+q2h+56+ah+56+bh
    y=yc(total_h)
    ctxt(draw,y,q1,f_q,TEXT); y+=q1h+22
    ctxt(draw,y,q2,f_q,TEXT); y+=q2h+56
    ctxt(draw,y,a,f_a,ORANGE); y+=ah+56
    bw_=tw(draw,badge,f_b); bx=(W-bw_-48)//2
    draw.rounded_rectangle([bx,y,bx+bw_+48,y+bh],radius=31,outline=ORANGE,width=2)
    txt(draw,bx+24,y+12,badge,f_b,ORANGE)
    header(img,draw,1,6); img=footer(img)
    img.save(f"{OUT2}/slide_01.png"); print("C2S1 done")

def c2s2():
    img,draw=base()
    f_t=fnt(True,92); f_p=fnt(False,46); f_x=fnt(True,40)
    label="01 | הבעיה"
    sh=sec_h(draw,label)
    t1="ברירת המחדל"; t2="שבורה."
    t1h=th(draw,t1,f_t); t2h=th(draw,t2,f_t)
    probs=["מגיב באנגלית גם כשכותבים עברית","RTL לא עובד חלק","הפורמט מתבלבל"]
    ph=th(draw,probs[0],f_p); pgap=26
    probs_h=len(probs)*(ph+pgap)
    total_h=sh+t1h+18+t2h+54+probs_h
    y=yc(total_h)
    y=sec_block(draw,y,label)
    rtxt(draw,y,t1,f_t,TEXT); y+=t1h+18
    rtxt(draw,y,t2,f_t,ORANGE); y+=t2h+54
    for prob in probs:
        pw=tw(draw,prob,f_p); txt(draw,W-pw-126,y,prob,f_p,TEXT)
        txt(draw,W-100,y+6,"X",f_x,(220,80,60),rtl=False)
        y+=ph+pgap
    header(img,draw,2,6); img=footer(img)
    img.save(f"{OUT2}/slide_02.png"); print("C2S2 done")

def c2s3():
    img,draw=base()
    f_t=fnt(True,104); f_b=fnt(False,44); f_c=fnt(False,42)
    label="02 | הפתרון"
    sh=sec_h(draw,label)
    t1="סקיל"; t2="שבניתי."
    t1h=th(draw,t1,f_t); t2h=th(draw,t2,f_t)
    s1="Claude לומד עברית מושלמת"
    s2="דרך סקיל שבניתי."
    s1h=th(draw,s1,f_b); s2h=th(draw,s2,f_b)
    card_lines=["RTL, ניסוח טבעי,","תשובות שנשמעות כמו בן אדם."]
    clh=th(draw,card_lines[0],f_c); pad=26; cgap=20
    card_total=len(card_lines)*(clh+cgap)-cgap+pad*2
    total_h=sh+t1h+18+t2h+52+s1h+20+s2h+46+card_total
    y=yc(total_h)
    y=sec_block(draw,y,label)
    rtxt(draw,y,t1,f_t,TEXT); y+=t1h+18
    rtxt(draw,y,t2,f_t,ORANGE); y+=t2h+52
    rtxt(draw,y,s1,f_b,DIM); y+=s1h+20
    rtxt(draw,y,s2,f_b,DIM); y+=s2h+46
    ct=y
    draw.rounded_rectangle([80,ct,W-80,ct+card_total],radius=14,fill=CARD)
    draw.line([(W-80,ct),(W-80,ct+card_total)],fill=ORANGE,width=5)
    ty=ct+pad
    for line in card_lines:
        rtxt(draw,ty,line,f_c,TEXT,margin=100); ty+=clh+cgap
    header(img,draw,3,6); img=footer(img)
    img.save(f"{OUT2}/slide_03.png"); print("C2S3 done")

def c2s4():
    img,draw=base()
    f_n=fnt(True,108); f_t_big=fnt(True,108)
    f_s=fnt(False,46); f_sm=fnt(False,32); f_num=fnt(True,42)
    label="03 | התקנה"
    sh=sec_h(draw,label)
    heading_h=th(draw,"3",f_n)
    steps=[("1","הורידו את הסקיל","(קישור בתגובה)"),
           ("2","גרירה ל-Claude Desktop",None),
           ("3","סיימת.",None)]
    card_h_vals=[136 if s[2] else 106 for s in steps]
    cgap=18; steps_h=sum(card_h_vals)+(len(steps)-1)*cgap
    total_h=sh+heading_h+14+steps_h
    y=yc(total_h)
    y=sec_block(draw,y,label)
    n_str="3"; s_str="שלבים."
    nw=tw(draw,n_str,f_n,rtl=False); sw2=tw(draw,s_str,f_t_big)
    txt(draw,W-80-nw,y,n_str,f_n,ORANGE,rtl=False)
    txt(draw,W-80-nw-20-sw2,y,s_str,f_t_big,TEXT)
    y+=heading_h+14
    for step_i,(num,step,sub) in enumerate(steps):
        rh=card_h_vals[step_i]
        draw.rounded_rectangle([80,y,W-80,y+rh-10],radius=13,fill=CARD)
        ccx=W-116; ccy=y+rh//2-8
        draw.ellipse([ccx-28,ccy-28,ccx+28,ccy+28],fill=ORANGE)
        nw2=tw(draw,num,f_num,rtl=False)
        txt(draw,ccx-nw2//2,ccy-22,num,f_num,BG,rtl=False)
        c=ORANGE if num=="3" else TEXT
        sw3=tw(draw,step,f_s)
        txt(draw,W-80-70-sw3-12,y+18,step,f_s,c)
        if sub:
            sw4=tw(draw,sub,f_sm)
            txt(draw,W-80-70-sw4-12,y+68,sub,f_sm,DIM)
        y+=rh+cgap
    header(img,draw,4,6); img=footer(img)
    img.save(f"{OUT2}/slide_04.png"); print("C2S4 done")

def c2s5():
    img,draw=base()
    f_t=fnt(True,90); f_i=fnt(False,50); f_dot=fnt(True,36)
    label="04 | מה מקבלים"
    sh=sec_h(draw,label)
    title="מה זה עושה?"; tith=th(draw,title,f_t)
    items=["עברית טבעית בכל תשובה","RTL נכון",
           "Claude שמבין הקשר ישראלי","חוסך 10 דקות הגדרות"]
    ih=th(draw,items[0],f_i); igap=26
    items_h=len(items)*(ih+igap)
    total_h=sh+tith+50+items_h
    y=yc(total_h)
    y=sec_block(draw,y,label)
    rtxt(draw,y,title,f_t,TEXT); y+=tith+50
    for item in items:
        iw=tw(draw,item,f_i)
        txt(draw,W-iw-126,y,item,f_i,TEXT)
        txt(draw,W-100,y+8,"+",f_dot,ORANGE,rtl=False)
        y+=ih+igap
    header(img,draw,5,6); img=footer(img)
    img.save(f"{OUT2}/slide_05.png"); print("C2S5 done")

def c2s6():
    img,draw=base()
    g=Image.new('RGB',(W,H),BG); gd=ImageDraw.Draw(g)
    gd.ellipse([W//2-400,H//2-350,W//2+400,H//2+350],fill=(38,20,9))
    img=Image.blend(img,g,0.65); draw=ImageDraw.Draw(img)
    f_h=fnt(True,108); f_l=fnt(False,30); f_kw=fnt(True,90); f_s=fnt(False,42)
    t1="רוצה"; t2="את הסקיל?"
    t1h=th(draw,t1,f_h); t2h=th(draw,t2,f_h)
    bh=200; sl_h=th(draw,"x",f_s)
    total_h=t1h+20+t2h+70+bh+36+sl_h
    y=yc(total_h)
    ctxt(draw,y,t1,f_h,TEXT); y+=t1h+20
    ctxt(draw,y,t2,f_h,TEXT); y+=t2h+70
    bx=140
    draw.rounded_rectangle([bx,y,W-bx,y+bh],radius=18,fill=(36,18,8))
    draw.rounded_rectangle([bx,y,W-bx,y+bh],radius=18,outline=ORANGE,width=2)
    l="הגיבו בתגובות"; lw_=tw(draw,l,f_l)
    txt(draw,(W-lw_)//2,y+24,l,f_l,DIM)
    kw="RTL"; kww=tw(draw,kw,f_kw,rtl=False)
    txt(draw,(W-kww)//2,y+70,kw,f_kw,ORANGE,rtl=False)
    y+=bh+36
    s="ואשלח לך אוטומטית"; sw=tw(draw,s,f_s)
    txt(draw,(W-sw)//2,y,s,f_s,DIM)
    header(img,draw,6,6); img=footer(img)
    img.save(f"{OUT2}/slide_06.png"); print("C2S6 done")

print("Generating carousels...")
c1s1();c1s2();c1s3();c1s4();c1s5();c1s6();c1s7()
c2s1();c2s2();c2s3();c2s4();c2s5();c2s6()
print(f"\nDone! Files saved to:\n  {OUT1}\n  {OUT2}")
