#!/usr/bin/env python3
"""Carousels 3-8 — identical design language to carousel 1 (gen_v6).
Same base()/header()/footer()/sec_block() primitives → only the text differs."""
from PIL import Image, ImageDraw, ImageFont
import os, math

BG=(20,16,9); ORANGE=(242,98,46); TEXT=(244,237,225); DIM=(160,152,144); CARD=(32,24,14)
RED=(220,80,60); BLUE=(90,150,210)
W,H=1080,1350
ZONE_TOP=115; ZONE_BOT=1265; ZONE_H=ZONE_BOT-ZONE_TOP

_deja_r="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
_deja_b="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
if os.path.exists(_deja_r): RB,BB=_deja_r,_deja_b
else: RB,BB="C:/Windows/Fonts/arial.ttf","C:/Windows/Fonts/arialbd.ttf"

try:
    from PIL.features import check_feature as _cf
    _HAS_RAQM=_cf('raqm')
except Exception:
    _HAS_RAQM=False
if not _HAS_RAQM:
    try:
        from bidi.algorithm import get_display as _gd
        def _bidi(t): return _gd(t,base_dir='R')
    except ImportError:
        def _bidi(t): return t
else:
    def _bidi(t): return t

def fnt(bold=False,size=40): return ImageFont.truetype(BB if bold else RB,size)
def _kw(rtl): return dict(direction='rtl',language='he') if (rtl and _HAS_RAQM) else {}
def tw(draw,text,font,rtl=True):
    t=_bidi(text) if (rtl and not _HAS_RAQM) else text
    b=draw.textbbox((0,0),t,font=font,**_kw(rtl)); return b[2]-b[0]
def th(draw,text,font,rtl=True):
    t=_bidi(text) if (rtl and not _HAS_RAQM) else text
    b=draw.textbbox((0,0),t,font=font,**_kw(rtl)); return b[3]-b[1]
def txt(draw,x,y,text,font,color,rtl=True):
    t=_bidi(text) if (rtl and not _HAS_RAQM) else text
    draw.text((x,y),t,font=font,fill=color,**_kw(rtl))
def rtxt(draw,y,text,font,color,margin=80):
    w=tw(draw,text,font); txt(draw,W-w-margin,y,text,font,color); return th(draw,text,font)
def ltxt(draw,y,text,font,color,margin=80):
    txt(draw,margin,y,text,font,color,rtl=False); return th(draw,text,font,rtl=False)
def ctxt(draw,y,text,font,color,rtl=True):
    w=tw(draw,text,font,rtl); txt(draw,(W-w)//2,y,text,font,color,rtl); return th(draw,text,font,rtl)
def draw_hex(draw,cx,cy,r,lw):
    pts=[(cx+r*math.cos(math.radians(90+60*i)),cy+r*math.sin(math.radians(90+60*i))) for i in range(6)]
    for i in range(6): draw.line([pts[i],pts[(i+1)%6]],fill=ORANGE,width=lw)
def yc(total_h): return ZONE_TOP+max(30,(ZONE_H-total_h)//2)

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

def base_glow():
    img,draw=base()
    g=Image.new('RGB',(W,H),BG); gd=ImageDraw.Draw(g)
    gd.ellipse([W//2-400,H//2-350,W//2+400,H//2+350],fill=(38,20,9))
    img=Image.blend(img,g,0.55); draw=ImageDraw.Draw(img)
    # redraw corners over glow
    draw.line([(W-60,44),(W-40,44)],fill=ORANGE,width=2); draw.line([(W-40,44),(W-40,66)],fill=ORANGE,width=2)
    draw.line([(40,H-44),(60,H-44)],fill=ORANGE,width=2); draw.line([(40,H-66),(40,H-44)],fill=ORANGE,width=2)
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
    return th(draw,label,fnt(False,32))+57

def wrap(draw,text,font,max_w,rtl=True):
    words=text.split(); lines=[]; cur=""
    for w in words:
        t=(cur+" "+w).strip()
        if tw(draw,t,font,rtl)<=max_w or not cur: cur=t
        else: lines.append(cur); cur=w
    if cur: lines.append(cur)
    return lines

def is_ltr(s): return all(ord(c)<0x590 for c in s if c.strip())

# ───────────────────────── generic builders ─────────────────────────
def hook(path,n,total,head,sub,badge=None,big=96,subsize=40,ghost=None,glow=False):
    """head: list of (text,color). sub: list of strings. badge: outlined pill text."""
    img,draw=base_glow() if glow else base()
    if ghost:
        gf=fnt(True,360); gw=tw(draw,ghost,gf,rtl=False)
        txt(draw,(W-gw)//2,150,ghost,gf,(34,25,14),rtl=False)
    fh=fnt(True,big); fs=fnt(False,subsize); fb=fnt(False,34)
    hlh=[th(draw,t,fh) for t,_ in head]; hgap=20
    slh=[th(draw,s,fs) for s in sub]; sgap=12
    head_h=sum(hlh)+(len(hlh)-1)*hgap
    sub_h=sum(slh)+(len(slh)-1)*sgap if sub else 0
    bh=64 if badge else 0
    total_h=head_h+(48+sub_h if sub else 0)+(56+bh if badge else 0)
    y=yc(total_h)
    for i,(t,c) in enumerate(head):
        rtxt(draw,y,t,fh,c); y+=hlh[i]+hgap
    if sub:
        y+=48-hgap
        for i,s in enumerate(sub):
            rtxt(draw,y,s,fs,DIM); y+=slh[i]+sgap
        y-=sgap
    if badge:
        y+=56
        bw=tw(draw,badge,fb); bx=(W-bw-48)//2
        draw.rounded_rectangle([bx,y,bx+bw+48,y+bh],radius=31,outline=ORANGE,width=2)
        txt(draw,bx+24,y+13,badge,fb,ORANGE)
    header(img,draw,n,total); img=footer(img); img.save(path)

def section(path,n,total,label,title,body=None,items=None,marker="•",note=None,
            card=None,title_size=92):
    """title: list of (text,color). body: list of str (dim). items: list of str (with marker).
       card: list of str inside a highlight card."""
    img,draw=base()
    ft=fnt(True,title_size); fb=fnt(False,44); fi=fnt(False,46); fc=fnt(False,42); fm=fnt(True,36)
    sh=sec_h(draw,label)
    tlh=[th(draw,t,ft) for t,_ in title]; tgap=18
    title_h=sum(tlh)+(len(tlh)-1)*tgap
    body_h=0; blh=[]
    if body:
        blh=[th(draw,b,fb) for b in body]; body_h=sum(blh)+(len(blh)-1)*16
    items_h=0; ilh=0
    if items:
        ilh=th(draw,items[0],fi); items_h=len(items)*(ilh+26)
    card_h=0; clh=0; cpad=24; cgap=16
    if card:
        clh=th(draw,card[0],fc); card_h=len(card)*(clh+cgap)-cgap+cpad*2
    note_h=th(draw,note,fb) if note else 0
    total_h=sh+title_h+(40+body_h if body else 0)+(46+items_h if items else 0)+(40+card_h if card else 0)+(34+note_h if note else 0)
    y=yc(total_h)
    y=sec_block(draw,y,label)
    for i,(t,c) in enumerate(title):
        rtxt(draw,y,t,ft,c); y+=tlh[i]+(tgap if i<len(title)-1 else 0)
    if body:
        y+=40
        for i,b in enumerate(body):
            rtxt(draw,y,b,fb,DIM); y+=blh[i]+16
        y-=16
    if items:
        y+=46
        for it in items:
            iw=tw(draw,it,fi); txt(draw,W-iw-126,y,it,fi,TEXT)
            txt(draw,W-104,y+10,marker,fm,ORANGE,rtl=False)
            y+=ilh+26
    if card:
        y+=40; ct=y
        draw.rounded_rectangle([80,ct,W-80,ct+card_h],radius=14,fill=CARD)
        draw.line([(W-80,ct),(W-80,ct+card_h)],fill=ORANGE,width=5)
        ty=ct+cpad
        for line in card:
            rtxt(draw,ty,line,fc,TEXT,margin=104); ty+=clh+cgap
        y=ct+card_h
    if note:
        y+=34; rtxt(draw,y,note,fb,DIM)
    header(img,draw,n,total); img=footer(img); img.save(path)

def boxed(path,n,total,label,title,blocks,title_size=84):
    """blocks: list of (label_text,label_color,body_text,border_color). wrapped text in card."""
    img,draw=base()
    ft=fnt(True,title_size); fl=fnt(True,32); fbody=fnt(False,38)
    sh=sec_h(draw,label)
    tlh=[th(draw,t,ft) for t,_ in title]; tgap=16
    title_h=sum(tlh)+(len(tlh)-1)*tgap
    maxw=W-80-104-30
    blk=[]
    for lt,lc,bt,bc in blocks:
        lines=wrap(draw,bt,fbody,maxw)
        lh=th(draw,lt,fl); bodyh=len(lines)*(th(draw,"א",fbody)+10)
        h=24+lh+14+bodyh+24
        blk.append((lt,lc,lines,bc,h))
    blocks_h=sum(b[4] for b in blk)+(len(blk)-1)*20
    total_h=sh+title_h+44+blocks_h
    y=yc(total_h)
    y=sec_block(draw,y,label)
    for i,(t,c) in enumerate(title):
        rtxt(draw,y,t,ft,c); y+=tlh[i]+(tgap if i<len(title)-1 else 0)
    y+=44
    for lt,lc,lines,bc,h in blk:
        draw.rounded_rectangle([80,y,W-80,y+h],radius=14,fill=CARD)
        draw.line([(W-80,y),(W-80,y+h)],fill=bc,width=5)
        ty=y+24
        rtxt(draw,ty,lt,fl,lc,margin=104); ty+=th(draw,lt,fl)+14
        for ln in lines:
            rtxt(draw,ty,ln,fbody,TEXT,margin=104); ty+=th(draw,"א",fbody)+10
        y+=h+20
    header(img,draw,n,total); img=footer(img); img.save(path)

def prompt_slide(path,n,total,label,title,copy_label,quote,save_line,save_desc):
    img,draw=base()
    ft=fnt(True,86); fcl=fnt(False,30); fq=fnt(False,38); fsv=fnt(True,46); fsd=fnt(False,34)
    sh=sec_h(draw,label)
    tlh=[th(draw,t,ft) for t,_ in title]; tgap=16
    title_h=sum(tlh)+(len(tlh)-1)*tgap
    maxw=W-80-104-30
    qlines=wrap(draw,quote,fq,maxw)
    qlh=th(draw,"א",fq)+12
    cpad=26; card_h=cpad+th(draw,copy_label,fcl)+18+len(qlines)*qlh+cpad
    sv_h=th(draw,save_line,fsv)
    total_h=sh+title_h+40+card_h+36+sv_h
    y=yc(total_h)
    y=sec_block(draw,y,label)
    for i,(t,c) in enumerate(title):
        rtxt(draw,y,t,ft,c); y+=tlh[i]+(tgap if i<len(title)-1 else 0)
    y+=40; ct=y
    draw.rounded_rectangle([80,ct,W-80,ct+card_h],radius=14,fill=CARD)
    draw.line([(W-80,ct),(W-80,ct+card_h)],fill=ORANGE,width=5)
    ty=ct+cpad
    rtxt(draw,ty,copy_label,fcl,ORANGE,margin=104); ty+=th(draw,copy_label,fcl)+18
    for ln in qlines:
        rtxt(draw,ty,ln,fq,TEXT,margin=104); ty+=qlh
    y=ct+card_h+36
    sw=tw(draw,save_line,fsv); dw=tw(draw,save_desc,fsd)
    txt(draw,W-80-sw,y,save_line,fsv,ORANGE)
    txt(draw,W-80-sw-16-dw,y+10,save_desc,fsd,DIM)
    header(img,draw,n,total); img=footer(img); img.save(path)

def task_slide(path,n,total,label,title,timebadge,chat_label,quote,result_label,result_text):
    img,draw=base()
    ft=fnt(True,80); ftb=fnt(True,30); fcl=fnt(True,30); fq=fnt(False,36); frl=fnt(True,30); fr=fnt(False,36)
    sh=sec_h(draw,label)
    tlh=[th(draw,t,ft) for t,_ in title]; tgap=14
    title_h=sum(tlh)+(len(tlh)-1)*tgap
    badge_h=58
    maxw=W-80-104-30
    qlines=wrap(draw,quote,fq,maxw); qlh=th(draw,"א",fq)+10
    cpad=24; chat_h=cpad+th(draw,chat_label,fcl)+14+len(qlines)*qlh+cpad
    rlines=wrap(draw,result_text,fr,maxw); rlh=th(draw,"א",fr)+10
    res_h=cpad+th(draw,result_label,frl)+14+len(rlines)*rlh+cpad
    total_h=sh+title_h+30+badge_h+30+chat_h+18+res_h
    y=yc(total_h)
    y=sec_block(draw,y,label)
    for i,(t,c) in enumerate(title):
        rtxt(draw,y,t,ft,c); y+=tlh[i]+(tgap if i<len(title)-1 else 0)
    y+=30
    bw=tw(draw,timebadge,ftb);
    draw.rounded_rectangle([W-80-bw-40,y,W-80,y+badge_h],radius=29,outline=ORANGE,width=2)
    txt(draw,W-80-bw-20,y+12,timebadge,ftb,ORANGE)
    y+=badge_h+30
    ct=y
    draw.rounded_rectangle([80,ct,W-80,ct+chat_h],radius=14,fill=CARD)
    draw.line([(W-80,ct),(W-80,ct+chat_h)],fill=ORANGE,width=5)
    ty=ct+cpad
    rtxt(draw,ty,chat_label,fcl,ORANGE,margin=104); ty+=th(draw,chat_label,fcl)+14
    for ln in qlines: rtxt(draw,ty,ln,fq,DIM,margin=104); ty+=qlh
    y=ct+chat_h+18
    ct=y
    draw.rounded_rectangle([80,ct,W-80,ct+res_h],radius=14,fill=(28,30,18))
    draw.line([(W-80,ct),(W-80,ct+res_h)],fill=(120,180,90),width=5)
    ty=ct+cpad
    rtxt(draw,ty,result_label,frl,(150,200,110),margin=104); ty+=th(draw,result_label,frl)+14
    for ln in rlines: rtxt(draw,ty,ln,fr,TEXT,margin=104); ty+=rlh
    header(img,draw,n,total); img=footer(img); img.save(path)

def cta(path,n,total,head,action_label,keyword,sub):
    img,draw=base_glow()
    fh=fnt(True,100); fl=fnt(False,30); fkw=fnt(True,84); fs=fnt(False,40)
    hlh=[th(draw,t,fh) for t in head]; hgap=18
    head_h=sum(hlh)+(len(hlh)-1)*hgap
    bh=200; sl_h=th(draw,sub,fs)
    total_h=head_h+70+bh+40+sl_h
    y=yc(total_h)
    for i,t in enumerate(head):
        ctxt(draw,y,t,fh,TEXT); y+=hlh[i]+hgap
    y+=70-hgap
    bx=140
    draw.rounded_rectangle([bx,y,W-bx,y+bh],radius=18,fill=(36,18,8))
    draw.rounded_rectangle([bx,y,W-bx,y+bh],radius=18,outline=ORANGE,width=2)
    lw=tw(draw,action_label,fl); txt(draw,(W-lw)//2,y+26,action_label,fl,DIM)
    rtl=not is_ltr(keyword); kw=tw(draw,keyword,fkw,rtl=rtl)
    txt(draw,(W-kw)//2,y+74,keyword,fkw,ORANGE,rtl=rtl)
    y+=bh+40
    sw=tw(draw,sub,fs); txt(draw,(W-sw)//2,y,sub,fs,DIM)
    header(img,draw,n,total); img=footer(img); img.save(path)

# ───────────────────────── content ─────────────────────────
HERE=os.path.dirname(os.path.abspath(__file__))
def od(name):
    p=os.path.join(HERE,name); os.makedirs(p,exist_ok=True); return p

def carousel3():
    o=od("carousel3"); T=7
    hook(f"{o}/slide_01.png",1,T,
         [("5 פרומפטים שחוסכים",TEXT),("5 שעות בשבוע",ORANGE)],
         ["אין קסם. רק ניסוחים","מדויקים שעובדים."],
         badge="שמרו את הפוסט הזה",big=78)
    prompts=[
        ("פרומפט 01",[("סיכום פגישה",TEXT),("תוך 30 שניות",ORANGE)],
         '"סכמי את הפגישה הזו ב-5 נקודות. לכל נקודה: מה הוחלט, מי אחראי, מה הדדליין. פורמט: עברית RTL, ללא ניפוח."',
         "חוסך 45 דקות","בכל פגישה"),
        ("פרומפט 02",[("מייל שמקבל",TEXT),("תשובות",ORANGE)],
         '"כתבי מייל מקצועי בעברית. מטרה: [מה אני רוצה]. טון: ישיר, לא מתחנחן. מקסימום 5 שורות. סיום: שאלה אחת ספציפית."',
         "חוסך 20 דקות","לכל מייל קשה"),
        ("פרומפט 03",[("תוכן חודש",TEXT),("ב-10 דקות",ORANGE)],
         '"אני [מה אני עושה]. קהל יעד: [מי הם]. צרו לי 12 רעיונות לפוסטים לחודש הקרוב. לכל אחד: כותרת + הוק פותח + CTA. עברית, ישיר."',
         "חוסך שעתיים","מחשיבה לתוצאה"),
        ("פרומפט 04",[("הצעת מחיר",TEXT),("שמשכנעת",ORANGE)],
         '"כתבי הצעת מחיר ל[שירות]. לקוח: [תיאור]. מחיר: [סכום]. הדגישי: תוצאה, לא תהליך. סיום: הנעה לפעולה ברורה."',
         "חוסך שעה","לכל הצעה"),
        ("פרומפט 05",[("תגובה ללקוח",TEXT),("קשה",ORANGE)],
         '"הלקוח כתב: [הודעה]. כתבי תגובה שמכירה בתסכול, שומרת על הגבולות שלי, ומציעה פתרון. טון: חם אבל מקצועי."',
         "חוסך עצבים","וזמן חשיבה"),
    ]
    for i,(lab,ti,q,sv,sd) in enumerate(prompts):
        prompt_slide(f"{o}/slide_{i+2:02d}.png",i+2,T,lab,ti,"העתיקו → שלחו",q,sv,sd)
    cta(f"{o}/slide_07.png",7,T,["שמרו את הפוסט —","תשתמשו בו"],"רוצים את כל 5 הפרומפטים?","פרומפטים","כתבו בתגובות ואשלח PDF חינם")
    print("C3 done")

def carousel4():
    o=od("carousel4"); T=7
    # s1 VS hook
    img,draw=base_glow()
    fvs=fnt(True,72); fmid=fnt(True,44); fh=fnt(True,64); fs=fnt(False,38); fb=fnt(False,34)
    head=[("מה באמת ההבדל",TEXT),("ולמה זה משנה לך?",ORANGE)]
    sub=["שאלה שמקבלת תשובות מבלבלות.","הנה ההסבר הפשוט שחיפשת."]
    box_h=130
    hlh=[th(draw,t,fh) for t,_ in head]; head_h=sum(hlh)+18
    slh=[th(draw,s,fs) for s in sub]; sub_h=sum(slh)+12
    bh=64
    total_h=box_h+50+head_h+44+sub_h+56+bh
    y=yc(total_h)
    # two boxes + VS
    bw=380; gap=80; x1=(W-bw*2-gap)//2
    for i,(name,col) in enumerate([("ChatGPT",BLUE),("Claude",ORANGE)]):
        bx=x1+i*(bw+gap)
        draw.rounded_rectangle([bx,y,bx+bw,y+box_h],radius=16,fill=CARD,outline=col,width=2)
        nw=tw(draw,name,fvs,rtl=False); txt(draw,bx+(bw-nw)//2,y+(box_h-th(draw,name,fvs,rtl=False))//2-6,name,fvs,col,rtl=False)
    vw=tw(draw,"VS",fmid,rtl=False); txt(draw,(W-vw)//2,y+(box_h-th(draw,"VS",fmid,rtl=False))//2-6,"VS",fmid,TEXT,rtl=False)
    y+=box_h+50
    for i,(t,c) in enumerate(head): rtxt(draw,y,t,fh,c); y+=hlh[i]+18
    y+=44-18
    for i,s in enumerate(sub): rtxt(draw,y,s,fs,DIM); y+=slh[i]+12
    y+=56-12
    badge="שמרו — שתפו"; bw2=tw(draw,badge,fb); bx=(W-bw2-48)//2
    draw.rounded_rectangle([bx,y,bx+bw2+48,y+bh],radius=31,outline=ORANGE,width=2); txt(draw,bx+24,y+13,badge,fb,ORANGE)
    header(img,draw,1,T); img=footer(img); img.save(f"{o}/slide_01.png")
    # s2-4 bullet lists
    section(f"{o}/slide_02.png",2,T,"01 | קודם כל",[("שניהם מדהימים.",TEXT)],
            items=["מסוגלים לכתוב, לנתח, לתכנת, לתרגם","עונים על שאלות ברמת מומחים",
                   "מדברים עברית (ברמות שונות)","נגישים בדפדפן ובאפליקציה"],marker="•",
            note="ההבדל הוא לא \"מי טוב\" — אלא מה מתאים לך.",title_size=86)
    section(f"{o}/slide_03.png",3,T,"02 | ChatGPT",[("ChatGPT",BLUE),("מצטיין ב—",TEXT)],
            items=["חיפוש ברשת (browsing)","יצירת תמונות עם DALL·E","אינטגרציות ופלאגינים רבים",
                   "ממשק מוכר ופשוט למתחילים","GPTs — בוטים מוכנים לכל תחום"],marker="•",title_size=80)
    section(f"{o}/slide_04.png",4,T,"03 | Claude",[("Claude",ORANGE),("מצטיין ב—",TEXT)],
            items=["כתיבה עמוקה וטקסטים ארוכים","קוד — הסבר וכתיבה ברמה גבוהה","עברית טבעית ונכונה יותר",
                   "הקשר ארוך — זוכר שיחה שלמה","Skills ו-Desktop — אוטומציות"],marker="•",title_size=80)
    # s5 table
    img,draw=base()
    ft=fnt(True,80); fr=fnt(False,40); fw=fnt(True,34)
    label="04 | לפי משימה"; sh=sec_h(draw,label)
    title=[("מה לבחור",TEXT),("לפי מה שצריך",ORANGE)]
    tlh=[th(draw,t,ft) for t,_ in title]; title_h=sum(tlh)+16
    rows=[("כתיבת תוכן ארוך","Claude",ORANGE),("חיפוש מידע עכשווי","ChatGPT",BLUE),
          ("כתיבת קוד + הסבר","Claude",ORANGE),("יצירת תמונות","ChatGPT",BLUE),
          ("עברית טבעית","Claude",ORANGE),("אוטומציות Desktop","Claude",ORANGE)]
    rh=88; rgap=12; rows_h=len(rows)*(rh+rgap)-rgap
    total_h=sh+title_h+40+rows_h
    y=yc(total_h); y=sec_block(draw,y,label)
    for i,(t,c) in enumerate(title): rtxt(draw,y,t,ft,c); y+=tlh[i]+(16 if i==0 else 0)
    y+=40
    for use,win,col in rows:
        draw.rounded_rectangle([80,y,W-80,y+rh],radius=12,fill=CARD)
        uw=tw(draw,use,fr); txt(draw,W-104-uw,y+(rh-th(draw,use,fr))//2,use,fr,TEXT)
        wlabel=win+(" ✦" if col==ORANGE else "")
        txt(draw,104,y+(rh-th(draw,wlabel,fw,rtl=False))//2-4,wlabel,fw,col,rtl=False)
        y+=rh+rgap
    header(img,draw,5,T); img=footer(img); img.save(f"{o}/slide_05.png")
    # s6 verdict
    boxed(f"{o}/slide_06.png",6,T,"05 | המסקנה",[("אל תבחרו.",TEXT),("השתמשו בשניהם.",ORANGE)],
          [("",TEXT,"ChatGPT — לחיפוש, תמונות ו-GPTs מוכנים. Claude — לכתיבה, קוד, עברית ואוטומציות. המקצוענים משתמשים בשניהם, כל אחד למה שהוא הכי טוב בו.",ORANGE)],title_size=80)
    cta(f"{o}/slide_07.png",7,T,["רוצים להשתמש","ב-Claude","כמו מקצוענים?"],"כתבו בתגובות","Claude","ואשלח את המדריך המלא חינם")
    print("C4 done")

def carousel5():
    o=od("carousel5"); T=7
    hook(f"{o}/slide_01.png",1,T,
         [("3 שגיאות",ORANGE),("שמבזבזות לך",TEXT),("שעות כל שבוע",TEXT)],
         ["ו-99% מהמשתמשים","עושים לפחות אחת מהן."],badge="שמרו — ואל תעשו את זה",big=92,ghost="3")
    mistakes=[
        ("שגיאה 01",[("פרומפט",TEXT),("קצר מדי",ORANGE)],
         '"תכתבי לי פוסט לאינסטגרם"',
         '"תכתבי פוסט לאינסטגרם על [נושא], לקהל של [מי], בטון [תיאור], עם CTA ל[מטרה]"'),
        ("שגיאה 02",[("לקבל את",TEXT),("התשובה הראשונה",ORANGE)],
         "תשובה ראשונה → מקבלים ומשתמשים → תוצאה בינונית",
         '"זה טוב, אבל תני לי 3 גרסאות בטונים שונים" → בוחרים את הטובה'),
        ("שגיאה 03",[("מתחילים שיחה",TEXT),("חדשה כל פעם",ORANGE)],
         "כל יום שיחה חדשה → AI לא מכיר אתכם → מסבירים הכל מחדש",
         'בתחילת שיחה: "אני [מה אני עושה], הקהל שלי [מי], הטון שלי [תיאור]"'),
    ]
    for i,(lab,ti,wrong,right) in enumerate(mistakes):
        boxed(f"{o}/slide_{i+2:02d}.png",i+2,T,lab,ti,
              [("✗ לא עובד",RED,wrong,RED),("✓ עובד",(150,200,110),right,(120,180,90))],title_size=78)
    boxed(f"{o}/slide_05.png",5,T,"בונוס | שגיאה נסתרת",[("לפרסם בלי לערוך",TEXT),("את הפלט של ה-AI",ORANGE)],
          [("",DIM,"AI כותב בסגנון \"AI\" שכולם מזהים. הפרומפט טוב, אבל תמיד צריך לעבור ולהוסיף את הקול שלך.",DIM),
           ("✓ הנוסחה הנכונה",(150,200,110),"AI כותב בסיס → אתם עורכים ומוסיפים אישיות → מפרסמים",(120,180,90))],title_size=72)
    section(f"{o}/slide_06.png",6,T,"05 | הכלל הכי חשוב",[("AI הוא עוזר",TEXT),("— לא מחליף",ORANGE)],
            items=["תנו הנחיות ברורות","אל תקבלו תשובה ראשונה — שפרו","הכניסו את הקול שלכם תמיד","למדו אותו את הסגנון שלכם"],
            marker="•",note="מי שעושה את זה — חוסך שעות בשבוע.",title_size=78)
    cta(f"{o}/slide_07.png",7,T,["רוצה ללמוד","לעשות את זה נכון?"],"כתבו בתגובות","מדריך AI","ואשלח את חבילת הכלים שלי חינם")
    print("C5 done")

def carousel6():
    o=od("carousel6"); T=8
    hook(f"{o}/slide_01.png",1,T,
         [("עסק קטן + Claude =",TEXT),("פחות שעות,",ORANGE),("יותר כסף",ORANGE)],
         ["5 משימות שכל עסק עושה ידנית —","ואיך Claude עושה אותן תוך דקות."],
         badge="החליקו לדוגמאות אמיתיות",big=68,ghost="AI")
    tasks=[
        ("משימה 01 | מיילים",[("תגובה",TEXT),("ללקוח קשה",ORANGE)],"45 דקות → 3 דקות",
         '"כתבי מייל ללקוח שמתלונן על עיכוב בהזמנה. טון מקצועי וחם, לא מתנצל."',
         "מייל מושלם, 3 גרסאות בטונים שונים, תוך 10 שניות."),
        ("משימה 02 | תוכן",[("חודש תוכן",TEXT),("ב-10 דקות",ORANGE)],"4 שעות → 10 דקות",
         '"אני עצמאי/ת, קהל יעד עסקים קטנים, תני לי 12 רעיונות לפוסטים לאינסטגרם."',
         "12 רעיונות, כיתוב מוכן לכל פוסט, האשטגים. חודש שלם."),
        ("משימה 03 | מכירות",[("הצעת מחיר",TEXT),("שסוגרת עסקה",ORANGE)],"60 דקות → 5 דקות",
         '"כתבי הצעת מחיר לפרויקט עיצוב לוגו — 3,500 ₪. כלול תהליך, לוח זמנים ותנאים."',
         "הצעה מלאה, מבנה ברור, נשמעת מקצועית יותר ממה שכתבתי לבד."),
        ("משימה 04 | ניהול",[("סיכום פגישה",TEXT),("ב-30 שניות",ORANGE)],"30 דקות → 30 שניות",
         '"אני מצרפת את הטרנסקריפט של הפגישה — תסכמי ב-5 נקודות ומה צריך לעשות."',
         "5 נקודות סיכום + 3 משימות + תאריכי יעד. מוכן לשליחה לצוות."),
        ("משימה 05 | שירות לקוחות",[("FAQ",TEXT),("ב-5 דקות",ORANGE)],"3 שעות → 5 דקות",
         '"הנה 10 שאלות נפוצות של לקוחות. תכתבי תשובות מקצועיות וחמות לכל אחת."',
         "10 תשובות מוכנות, בטון המותג שלי. העתקתי ישר לאתר."),
    ]
    for i,(lab,ti,tb,q,res) in enumerate(tasks):
        task_slide(f"{o}/slide_{i+2:02d}.png",i+2,T,lab,ti,tb,"שאלתי את Claude",q,"קיבלתי",res)
    # s7 savings
    img,draw=base()
    ft=fnt(True,72); fnum=fnt(True,72); flab=fnt(False,30); ftot=fnt(True,96); fts=fnt(False,40)
    label="סיכום | שעות שנחסכות בשבוע"; sh=sec_h(draw,label)
    title=[("כמה שעות נחסכות?",TEXT)]
    tlh=th(draw,title[0][0],ft); title_h=tlh
    cards=[("~2","מיילים ותקשורת"),("~4","תוכן ורשתות"),("~3","הצעות ומסמכים")]
    card_h=150; cw=(W-160-2*20)//3
    tot_h=th(draw,"9+ שעות בשבוע",ftot)
    total_h=sh+title_h+40+card_h+56+tot_h+34+th(draw,"36 שעות חופשיות בחודש",fts)
    y=yc(total_h); y=sec_block(draw,y,label)
    rtxt(draw,y,title[0][0],ft,TEXT); y+=tlh+40
    cx=80
    for num,lab2 in cards:
        draw.rounded_rectangle([cx,y,cx+cw,y+card_h],radius=14,fill=CARD)
        nw=tw(draw,num,fnum,rtl=False); txt(draw,cx+(cw-nw)//2,y+24,num,fnum,ORANGE,rtl=False)
        lw=tw(draw,lab2,flab); txt(draw,cx+(cw-lw)//2,y+card_h-46,lab2,flab,DIM)
        cx+=cw+20
    y+=card_h+56
    ctxt(draw,y,"9+ שעות בשבוע",ftot,ORANGE); y+=tot_h+34
    ctxt(draw,y,"36 שעות חופשיות בחודש",fts,DIM)
    header(img,draw,7,T); img=footer(img); img.save(f"{o}/slide_07.png")
    cta(f"{o}/slide_08.png",8,T,["רוצה להתחיל","לחסוך שעות","בעסק שלך?"],"כתבו בתגובות","עסק קטן","ואשלח מדריך מותאם לעסק שלכם")
    print("C6 done")

def carousel7():
    o=od("carousel7"); T=7
    hook(f"{o}/slide_01.png",1,T,
         [("איך אני",TEXT),("באמת עובדת.",ORANGE)],
         ["5 שלבים מרעיון","למוצר מוגמר — עם AI."],badge="הצצה אמיתית לתהליך שלי",big=96)
    section(f"{o}/slide_02.png",2,T,"לפני שמתחילים",[("AI הוא לא קסם.",TEXT),("הוא תהליך.",ORANGE)],
            body=["הרבה חושבים ש-AI עושה הכל לבד.","האמת? יש שיטה."],
            card=["5 השלבים שאני עוברת","בכל פרויקט:"],title_size=88)
    section(f"{o}/slide_03.png",3,T,"שלב 01 | הבנה",[("מקשיבה.",TEXT),("לפני שבונה.",ORANGE)],
            body=["כל פרויקט מתחיל בשיחה — מה הכאב,","מי הקהל, מה המטרה."],
            card=["שאלות נכונות → תוצאה מדויקת"],title_size=92)
    section(f"{o}/slide_04.png",4,T,"שלב 02 | פרומפט",[("מכוונת את",TEXT),("המכונה.",ORANGE)],
            body=["פרומפט מדויק עם הקשר, טון וכיוון —","זה ההבדל בין \"בסדר\" ל\"וואו\"."],
            card=["הקשר + טון + דוגמה → תוצאה מקצועית"],title_size=92)
    section(f"{o}/slide_05.png",5,T,"שלב 03 + 04 | עידון",[("מחדדת",TEXT),("ומאנישה.",ORANGE)],
            items=["מתקנת שכבה אחרי שכבה עד שזה נכון","מוסיפה את הנגיעה האנושית"],
            marker="•",title_size=92)
    section(f"{o}/slide_06.png",6,T,"שלב 05 | מסירה",[("מוסרת מוצר.",TEXT),("לא רק קובץ.",ORANGE)],
            items=["תוצר מלוטש ומוכן לשימוש","הסבר פשוט איך להפעיל","ליווי אחרי המסירה"],
            marker="•",title_size=90)
    cta(f"{o}/slide_07.png",7,T,["יש לכם פרויקט","בראש?"],"שלחו לי בהודעה","פרויקט","ונראה איך AI יקצר לכם את הדרך")
    print("C7 done")

def carousel8():
    o=od("carousel8"); T=7
    hook(f"{o}/slide_01.png",1,T,
         [("60 שניות.",ORANGE),("זה הזמן שClaude צריך",TEXT),("לכתוב לכם פוסט.",TEXT)],
         ["ורוב האנשים","עדיין לא יודעים."],badge="שמרו — ותתחילו לחסוך",big=80)
    section(f"{o}/slide_02.png",2,T,"01 | מה AI עושה",[("5 דברים.",TEXT),("רגעים בלבד.",ORANGE)],
            body=["לא דקות. לא שעות.","רגעים בלבד."],card=["הנה הרשימה המלאה:"],title_size=92)
    section(f"{o}/slide_03.png",3,T,"02 | כתיבת תוכן",[("כותב פוסט.",TEXT),("ב-60 שניות.",ORANGE)],
            body=["תנו לו נושא ואמירה, וקבלו פוסט","מוכן — בלי לשבת מול דף ריק."],
            card=["נושא + טון + קהל → פוסט מוכן"],title_size=88)
    section(f"{o}/slide_04.png",4,T,"03 | שירות לקוחות",[("עונה ללקוח.",TEXT),("בשמכם.",ORANGE)],
            body=["לקוח שאל? Claude מנסח תשובה","מקצועית ואישית. אתם רק שולחים."],
            card=["שאלת לקוח → ניסוח → שליחה בקליק"],title_size=88)
    section(f"{o}/slide_05.png",5,T,"04 | תרגום ותוכן",[("מתרגם ומתכנן.",TEXT)],
            items=["מתרגם תוכן לכל שפה תוך שנייה","מכין קלנדר חודשי עם 20 רעיונות"],
            marker="•",title_size=88)
    section(f"{o}/slide_06.png",6,T,"05 | מחירון ומסמכים",[("בונה מחירון.",TEXT),("תוך 60 שניות.",ORANGE)],
            items=["הסברי שירות ברורים","מחירים מפורמטים יפה","CTA מוכן לשליחה"],
            marker="•",title_size=88)
    cta(f"{o}/slide_07.png",7,T,["רוצים לנסות?"],"כתבו בתגובות","QUICK","ואשלח 5 פרומפטים מוכנים מייד")
    print("C8 done")

if __name__=="__main__":
    carousel3(); carousel4(); carousel5(); carousel6(); carousel7(); carousel8()
    print("ALL DONE")
