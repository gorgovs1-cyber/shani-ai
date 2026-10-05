// SMALL LIGHTS screening pages (public/small-lights/*.html) are static HTML outside the app layout, so they cannot use
// components/AnalyticsScripts. This script gives them the same rules: nothing loads unless the visitor accepted the
// cookie banner on shani-ai.com (localStorage "shani-cookie-consent", components/CookieConsent.tsx), Consent Mode v2
// starts denied, and the GA4 ID comes from the same public env var. Video events fire once per milestone per page load.
export const dynamic = "force-static";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

const body = `(() => {
  'use strict';
  var ID = ${JSON.stringify(GA4_ID)};
  var consent = null;
  try { consent = JSON.parse(localStorage.getItem('shani-cookie-consent') || 'null'); } catch (e) {}
  if (!ID || !consent || consent.choice !== 'granted') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
  gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
  var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID; document.head.appendChild(s);
  gtag('js', new Date()); gtag('config', ID);
  var edition = document.body.getAttribute('data-sl-edition') || 'film';
  var v = document.getElementById('film');
  if (v) {
    var sent = {};
    var once = function (key, name, extra) { if (sent[key]) return; sent[key] = 1; var p = { video_title: 'SMALL LIGHTS', video_edition: edition }; for (var k in extra) p[k] = extra[k]; gtag('event', name, p); };
    v.addEventListener('play', function () { once('start', 'video_start', {}); });
    v.addEventListener('timeupdate', function () {
      if (!v.duration) return; var pct = v.currentTime / v.duration * 100;
      [25, 50, 75].forEach(function (m) { if (pct >= m) once('p' + m, 'video_progress', { video_percent: m }); });
    });
    v.addEventListener('ended', function () { once('complete', 'video_complete', { video_percent: 100 }); });
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-sl]') : null;
    if (a) gtag('event', 'select_content', { content_type: 'small_lights_link', item_id: a.getAttribute('data-sl') });
  });
})();`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
