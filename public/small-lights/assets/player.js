// SMALL LIGHTS — screening page player. Progressive enhancement over a single <video>: without this script the
// browser's native controls play the film; with it, the page's own transport, sequence links (#t=<seconds>),
// keyboard shortcuts, lock-screen controls (Media Session), the page's own full screen and the optional Hebrew subtitles
// (CC) take over.
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const v = $('film'), screen = $('screen'), poster = $('poster'), bigPlay = $('bigPlay'), status = $('status');
  const scrub = $('scrub'), fill = $('fill'), knob = $('knob'), buf = $('buf'), tc = $('tc');
  const playBtn = $('play'), playPath = $('playPath'), muteBtn = $('mute'), waves = $('waves'), fsBtn = $('fs');
  if (!v || !v.canPlayType) return;
  const stage = $('stage') || screen.parentElement, player = $('player') || stage.parentElement;

  const DUR_FALLBACK = 272;
  const dur = () => (Number.isFinite(v.duration) && v.duration > 0 ? v.duration : DUR_FALLBACK);
  const fmt = (t) => { t = Math.max(0, Math.floor(t)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };
  const links = [...document.querySelectorAll('#seqs a[data-t]')];
  const chapters = links.map((a) => ({ a, t: parseFloat(a.dataset.t) }));

  // take over from the native controls
  v.controls = false;
  poster.hidden = false; bigPlay.hidden = false; $('transport').hidden = false;
  let started = false, dragging = false, raf = 0, noteTimer = 0, toggleSubs = null, subsWanted = () => false;

  function note(msg, ms = 0) {
    status.textContent = msg; status.hidden = !msg;
    status.lang = /[\u0590-\u05FF]/.test(msg) ? 'he' : '';
    clearTimeout(noteTimer);
    if (msg && ms) noteTimer = setTimeout(() => { status.hidden = true; }, ms);
  }
  function begin() {
    bigPlay.hidden = true;                 // also after a replay from the transport, once the film has ended
    if (started) return;
    started = true; poster.classList.add('gone');
  }
  function play() {
    begin();
    const p = v.play();
    if (p && p.catch) p.catch(() => note('Tap play to start the film.', 3000));
  }
  function toggle() { if (v.paused || v.ended) play(); else v.pause(); }
  function seek(t) {
    t = Math.max(0, Math.min(dur() - 0.05, t));
    begin();
    if (dragging && typeof v.fastSeek === 'function') v.fastSeek(t); else v.currentTime = t;
    paint(t);
  }

  function paint(t = v.currentTime) {
    const d = dur(), p = Math.min(1, t / d) * 100;
    fill.style.width = p + '%'; knob.style.left = p + '%';
    tc.innerHTML = `<b>${fmt(t)}</b> / ${fmt(d)}`;
    scrub.setAttribute('aria-valuenow', String(Math.round(t)));
    scrub.setAttribute('aria-valuemax', String(Math.round(d)));
    scrub.setAttribute('aria-valuetext', `${fmt(t)} of ${fmt(d)}`);
    try { const b = v.buffered; if (b.length) buf.style.width = Math.min(100, b.end(b.length - 1) / d * 100) + '%'; } catch (e) { /* no ranges yet */ }
    let now = -1;
    chapters.forEach((c, i) => { if (t >= c.t - 0.01) now = i; });
    chapters.forEach((c, i) => c.a.parentElement.classList.toggle('now', started && i === now));
  }
  function loop() { paint(); if (!v.paused) raf = requestAnimationFrame(loop); }
  function icon() {
    const on = !v.paused && !v.ended;
    playPath.setAttribute('d', on ? 'M6 4h4v16H6zM14 4h4v16h-4z' : 'M6 4l15 8-15 8z');
    playBtn.setAttribute('aria-label', on ? 'Pause' : 'Play');
  }

  v.addEventListener('play', () => { begin(); icon(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); });
  v.addEventListener('pause', () => { icon(); paint(); });
  v.addEventListener('ended', () => { icon(); paint(); bigPlay.hidden = false; bigPlay.setAttribute('aria-label', 'Play the film again'); });
  v.addEventListener('timeupdate', () => { if (v.paused) paint(); });
  v.addEventListener('progress', () => paint());
  v.addEventListener('loadedmetadata', () => { paint(); applyHash(); });
  v.addEventListener('waiting', () => note('Loading…'));
  v.addEventListener('playing', () => note(''));
  v.addEventListener('seeked', () => { if (!v.paused) note(''); });
  v.addEventListener('error', () => note('The film could not be loaded. Check your connection and reload the page.'));

  bigPlay.addEventListener('click', () => { if (v.ended) v.currentTime = 0; play(); });
  playBtn.addEventListener('click', toggle);
  let wokeByTap = false;   // in full screen a tap on hidden controls only brings them back
  player.addEventListener('pointerdown', (e) => { wokeByTap = isFs && e.pointerType !== 'mouse' && player.classList.contains('idle'); wake(); }, true);
  v.addEventListener('click', () => { if (wokeByTap) { wokeByTap = false; return; } if (started) toggle(); });
  poster.addEventListener('click', play);
  muteBtn.addEventListener('click', () => {
    v.muted = !v.muted;
    muteBtn.setAttribute('aria-pressed', String(v.muted));
    muteBtn.setAttribute('aria-label', v.muted ? 'Unmute' : 'Mute');
    waves.style.display = v.muted ? 'none' : '';
  });

  // full screen: the page's own. The whole player (picture, subtitles, transport) goes full screen, or becomes a fixed
  // layer where a browser cannot make an element full screen (iPhone, or a frame without permission), so the subtitles
  // stay the page's own and can sit in the black band under the picture.
  const RATIO = 1920 / 804;                                   // the picture (the file's letterbox bars are cropped away)
  const fsPath = $('fsPath');
  const FS_ICON = { on: 'M7 4h2v5H4V7h3zM15 4h2v3h3v2h-5zM15 15h5v2h-3v3h-2zM4 15h5v5H7v-3H4z', off: fsPath ? fsPath.getAttribute('d') : '' };
  const elFs = () => document.fullscreenElement || document.webkitFullscreenElement || null;
  const canElFs = !!((document.fullscreenEnabled || document.webkitFullscreenEnabled) && (player.requestFullscreen || player.webkitRequestFullscreen));
  let isFs = false, pseudo = false, scrollY0 = 0, idleTimer = 0, fsReq = 0;

  function layoutFs() {
    if (!isFs) return;
    const W = stage.clientWidth, H = stage.clientHeight;
    if (!W || !H) return;
    const pw = Math.min(W, H * RATIO), ph = pw / RATIO;
    const fz = Math.max(12.5, Math.min(24, pw * 0.0118));   // subtitle size: 12.5 px on a phone, ~17 px on a laptop
    const need = fz * (2 * 1.34 + 1.5);                     // two lines, the gap above them and a margin below
    const slack = H - ph;
    const band = subsWanted() && slack >= need;             // room for two lines under the picture: use it
    const y = band && slack / 2 < need ? slack - need : slack / 2;
    const set = (k, px) => player.style.setProperty(k, px.toFixed(2) + 'px');
    set('--pic-x', (W - pw) / 2); set('--pic-y', y); set('--pic-w', pw); set('--pic-h', ph); set('--subs-fs', fz);
    player.classList.toggle('band', band);
    liftSubs();
  }
  // while the full-screen controls show, lift the subtitles above them (they drop back when the controls fade)
  function liftSubs() {
    if (!isFs) { player.style.removeProperty('--subs-lift'); return; }
    const subsEl = $('subs'), tr = $('transport');
    let lift = 0;
    if (subsEl && tr && !subsEl.hidden && !player.classList.contains('idle')) {
      const sb = subsEl.getBoundingClientRect(), tb = tr.getBoundingClientRect();
      const textBottom = sb.bottom - parseFloat(getComputedStyle(subsEl).paddingBottom || '0');
      const controlsTop = tb.top + parseFloat(getComputedStyle(tr).paddingTop || '0');
      lift = Math.max(0, textBottom - controlsTop + 6);
    }
    player.style.setProperty('--subs-lift', lift.toFixed(1) + 'px');
  }
  function wake() {
    player.classList.remove('idle');
    clearTimeout(idleTimer);
    const menu = $('ccMenu');
    if (isFs && !v.paused && !v.ended && (!menu || menu.hidden)) idleTimer = setTimeout(() => { player.classList.add('idle'); liftSubs(); }, 2600);
    liftSubs();
  }
  function setFs(on, isPseudo) {
    if (!on && pseudo) window.requestAnimationFrame(() => window.scrollTo(0, scrollY0));
    isFs = on; pseudo = on && !!isPseudo;
    player.classList.toggle('is-fs', on);
    player.classList.toggle('pseudo', pseudo);
    document.documentElement.classList.toggle('fs-lock', pseudo);
    fsBtn.setAttribute('aria-label', on ? 'Exit full screen' : 'Full screen');
    if (fsPath) fsPath.setAttribute('d', on ? FS_ICON.on : FS_ICON.off);
    if (on) layoutFs();
    else { ['--pic-x', '--pic-y', '--pic-w', '--pic-h', '--subs-fs', '--subs-lift'].forEach((k) => player.style.removeProperty(k)); player.classList.remove('band', 'idle'); }
    wake();
  }
  function enterPseudo() { scrollY0 = window.scrollY; setFs(true, true); }
  function fullscreen() {
    begin();
    if (isFs) {
      if (pseudo) setFs(false);
      else try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) { setFs(false); }
      return;
    }
    if (!canElFs) { enterPseudo(); return; }
    const req = ++fsReq;
    try {
      const r = (player.requestFullscreen || player.webkitRequestFullscreen).call(player, { navigationUI: 'hide' });
      if (r && r.catch) r.catch(() => { if (req === fsReq && !isFs) enterPseudo(); });
      setTimeout(() => { if (req === fsReq && !isFs && !elFs()) enterPseudo(); }, 700);   // a browser that ignores it silently
    } catch (e) { enterPseudo(); }
  }
  fsBtn.addEventListener('click', fullscreen);
  const fsChange = () => { fsReq++; if (!pseudo) setFs(elFs() === player, false); };
  document.addEventListener('fullscreenchange', fsChange);
  document.addEventListener('webkitfullscreenchange', fsChange);
  window.addEventListener('resize', layoutFs);
  window.addEventListener('orientationchange', () => setTimeout(layoutFs, 250));
  ['pointermove', 'keydown'].forEach((ev) => player.addEventListener(ev, wake));
  v.addEventListener('play', wake);
  v.addEventListener('pause', wake);

  // subtitles: one optional Hebrew track (a separate .vtt file, never burned into the picture), off by default. The page
  // draws the current line itself (track mode "hidden"), in full screen too, centred: in the black band under the
  // picture where there is one (phones; a screen taller than the picture), otherwise small in the lower safe area of the
  // picture. Only if a browser's own player takes over (iPhone's native player) does the track switch to "showing".
  const track = [...(v.textTracks || [])].find((t) => t.kind === 'subtitles' && t.language === 'he');
  const ccWrap = $('ccWrap'), ccBtn = $('cc'), ccMenu = $('ccMenu'), subs = $('subs');
  if (track && ccWrap && ccBtn && ccMenu && subs) {
    const subsText = subs.querySelector('p');
    const items = [...ccMenu.querySelectorAll('[role="menuitemradio"]')];
    const trackEl = v.querySelector('track');
    let subsOn = false, nativeFs = false;
    ccWrap.hidden = false;

    const drawSubs = () => {
      subs.hidden = !subsOn || nativeFs;
      const list = subsOn && !nativeFs && track.activeCues ? track.activeCues : [];
      const cue = list.length ? list[list.length - 1] : null;
      subsText.textContent = '';
      if (!cue) return;
      const span = document.createElement('span');
      span.textContent = cue.text.replace(/<[^>]*>/g, '');
      subsText.appendChild(span);
      subs.classList.toggle('left', cue.text.indexOf('<c.left>') !== -1);     // where the picture's lower centre is taken:
      subs.classList.toggle('right', cue.text.indexOf('<c.right>') !== -1);   // move aside (only when over the picture)
      liftSubs();
    };
    const applyMode = () => {
      const want = !subsOn ? 'disabled' : nativeFs ? 'showing' : 'hidden';
      if (track.mode !== want) track.mode = want;
      drawSubs();
    };
    const setSubs = (on, announce) => {
      subsOn = on;
      stage.classList.toggle('with-subs', on);
      layoutFs();
      items.forEach((b) => b.setAttribute('aria-checked', String((b.dataset.mode === 'he') === on)));
      ccBtn.classList.toggle('on', on);
      ccBtn.setAttribute('aria-label', on ? 'Subtitles: Hebrew' : 'Subtitles: off');
      applyMode();
      if (announce) note(on ? 'כתוביות: עברית' : 'ללא כתוביות', 1600);
    };
    toggleSubs = () => setSubs(!subsOn, true);
    subsWanted = () => subsOn;

    // the menu: CC opens it; arrows move, Enter/Space choose, Escape closes; a tap outside closes it
    const openMenu = () => { ccMenu.hidden = false; ccBtn.setAttribute('aria-expanded', 'true'); (items.find((b) => b.getAttribute('aria-checked') === 'true') || items[0]).focus(); };
    const closeMenu = (refocus) => {
      if (ccMenu.hidden) return;
      ccMenu.hidden = true; ccBtn.setAttribute('aria-expanded', 'false');
      if (refocus) ccBtn.focus();
      wake();
    };
    ccBtn.addEventListener('click', () => { if (ccMenu.hidden) openMenu(); else closeMenu(false); });
    ccBtn.addEventListener('keydown', (e) => { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); openMenu(); } });
    items.forEach((b) => b.addEventListener('click', () => { setSubs(b.dataset.mode === 'he'); closeMenu(true); }));
    ccMenu.addEventListener('keydown', (e) => {
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus(); }
      else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); items[e.key === 'Home' ? 0 : items.length - 1].focus(); }
      else if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); }
      else if (e.key === 'Tab') closeMenu(false);
      e.stopPropagation();   // keep the page's own shortcuts (Space, K, F, M, C, arrows) out of the open menu
    });
    document.addEventListener('pointerdown', (e) => { if (!ccWrap.contains(e.target)) closeMenu(false); });

    // keep drawing in step with the film
    track.addEventListener('cuechange', drawSubs);
    if (trackEl) trackEl.addEventListener('load', drawSubs);
    v.addEventListener('seeked', drawSubs);

    // a browser's own full-screen player (not the page's): it draws the same track; a choice made there comes back
    const fsSubs = () => { nativeFs = (document.fullscreenElement || document.webkitFullscreenElement) === v; applyMode(); };
    document.addEventListener('fullscreenchange', fsSubs);
    document.addEventListener('webkitfullscreenchange', fsSubs);
    v.addEventListener('webkitbeginfullscreen', () => { nativeFs = true; applyMode(); });
    v.addEventListener('webkitendfullscreen', () => { nativeFs = false; setSubs(track.mode === 'showing' || (subsOn && track.mode === 'hidden')); });
    if (v.textTracks && v.textTracks.addEventListener) {
      v.textTracks.addEventListener('change', () => {
        if (nativeFs) {                                  // the viewer used the full-screen player's own subtitle menu
          const on = track.mode === 'showing';
          if (on !== subsOn) { subsOn = on; setSubs(on); }
        } else if (track.mode !== (subsOn ? 'hidden' : 'disabled')) applyMode();   // the page decides outside full screen
      });
    }
    setSubs(false);
  }

  // scrubber: pointer (mouse, touch, pen) + keyboard
  const tAt = (x) => { const r = scrub.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)) * dur(); };
  let resume = false;
  scrub.addEventListener('pointerdown', (e) => {
    dragging = true; resume = !v.paused; scrub.setPointerCapture(e.pointerId); seek(tAt(e.clientX));
  });
  scrub.addEventListener('pointermove', (e) => { if (dragging) seek(tAt(e.clientX)); });
  const endDrag = () => { if (!dragging) return; dragging = false; v.currentTime = v.currentTime; if (resume) play(); };
  scrub.addEventListener('pointerup', endDrag);
  scrub.addEventListener('pointercancel', endDrag);
  scrub.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5, PageUp: 30, PageDown: -30 }[e.key];
    if (step !== undefined) { seek(v.currentTime + step); e.preventDefault(); }
    if (e.key === 'Home') { seek(0); e.preventDefault(); }
    if (e.key === 'End') { seek(dur()); e.preventDefault(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
    const k = e.key.toLowerCase();
    if ((k === ' ' && !/^(BUTTON|A)$/.test(tag)) || k === 'k') { e.preventDefault(); toggle(); }
    else if (k === 'f') { e.preventDefault(); fullscreen(); }
    else if (k === 'escape' && pseudo) { e.preventDefault(); setFs(false); }
    else if (k === 'm') { e.preventDefault(); muteBtn.click(); }
    else if (k === 'c' && toggleSubs) { e.preventDefault(); toggleSubs(); }
    else if ((k === 'arrowright' || k === 'arrowleft') && document.activeElement !== scrub) { e.preventDefault(); seek(v.currentTime + (k === 'arrowright' ? 5 : -5)); }
  });

  // chapter ticks on the scrubber + sequence links (#t=<seconds> deep links)
  chapters.forEach((c) => {
    if (c.t > 0) { const tk = document.createElement('div'); tk.className = 'tick'; tk.style.left = (c.t / DUR_FALLBACK * 100) + '%'; scrub.appendChild(tk); }
    c.a.addEventListener('click', (e) => {
      e.preventDefault();
      try { history.replaceState(null, '', c.a.getAttribute('href')); } catch (err) { /* file:// or sandboxed */ }
      seek(c.t); play();
      screen.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    });
  });
  function applyHash() {
    const m = /^#t=(\d+(?:\.\d+)?)$/.exec(location.hash);
    if (m) { poster.classList.add('gone'); v.currentTime = Math.min(parseFloat(m[1]), dur() - 0.05); paint(); }   // show that frame; the big play button still starts it
  }
  window.addEventListener('hashchange', applyHash);

  // lock screen / headphone controls
  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'SMALL LIGHTS', artist: 'A SHANI AI Studio Original', album: 'Created with Claude Opus 5.5',
        artwork: [{ src: new URL('assets/og.jpg', location.href).href, sizes: '1200x630', type: 'image/jpeg' }],
      });
      const on = (a, f) => { try { navigator.mediaSession.setActionHandler(a, f); } catch (e) { /* unsupported action */ } };
      on('play', play); on('pause', () => v.pause());
      on('seekbackward', (d) => seek(v.currentTime - ((d && d.seekOffset) || 10)));
      on('seekforward', (d) => seek(v.currentTime + ((d && d.seekOffset) || 10)));
      on('seekto', (d) => { if (d && Number.isFinite(d.seekTime)) seek(d.seekTime); });
    } catch (e) { /* Media Session not available */ }
  }

  paint(0);
  icon();
  if (v.readyState >= 1) applyHash();
})();
