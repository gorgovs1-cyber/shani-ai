# SHANI AI — Build Handoff (for the 2AM continuation agent)

You are continuing a premium bilingual redesign of **shani-ai.vercel.app** (Shani Gorgov's
portfolio/identity site). Repo: `gorgovs1-cyber/shani-ai`. Deploy = push to `main` → Vercel auto-deploys.
**Always `npm run build` and confirm it passes BEFORE every `git push`.** Commit in small logical chunks.

## Non-negotiables
- **Single accent only:** signal orange `#ff6a3d` (`var(--signal)`). No purple/cyan/rainbow.
- Tokens in `app/globals.css` `:root`: `--ink` #0b0d10, `--cream` #f3efe6, `--signal` #ff6a3d,
  `--graphite` #1c1f24, `--mist` #9aa1ab. Plus aliases mapping old names (surface/white/muted/cyan) → new.
- Fonts (layout.tsx): Heebo (HE), Inter (EN headings/body), Playfair Display italic (EN emphasis word),
  JetBrains Mono (`var(--font-mono)` / `.mono` — system, tags, dates).
- Bilingual: `components/LanguageProvider.tsx` (client context, `useLang()` → `{ lang, t, toggle }`)
  + `lib/i18n.ts` dictionary (he/en). Toggle switches content AND dir (RTL↔LTR). Add new strings to BOTH he and en.
- **Do NOT copy any content/copy/visual identity from bestguy.ai** — method and structure only.
- Respect `prefers-reduced-motion` (guard already in globals.css). Keep GSAP + Lenis.

## Already DONE (live)
- Boot screen (terminal "AI scans a messy business"), floating glass nav with real HE/EN toggle (globe icon),
  Hero with per-language emphasis word + ROI calculator count-up, TrustedBy marquee.
- Phase 2 portfolio: `WorkGrid.tsx` (bilingual uniform cards), `app/work/page.tsx` + `app/work/[slug]/page.tsx`
  (meta block CLIENT/TYPE/TECHNOLOGIES/YEAR + "view project" button), `lib/projects.ts` (5 projects, bilingual
  fields `tagline/taglineEn`, `description/descriptionEn`, `categoryHe`, `client`, optional `liveUrl`).
- Copy fixes: hero+About value stat (20+ hrs/wk) instead of project count; response time unified to **24h**
  everywhere; tools reduced to 4 (Claude Code, Make.com, n8n, Next.js). Accessibility floating widget REMOVED.

## REMAINING — do these, in order, build+push after each
1. **Testimonials section (BIGGEST gap).** New `components/Testimonials.tsx`: carousel, large quote marks,
   name + role/business. Bilingual via i18n. **No real quotes exist** — create 2 clearly-marked placeholders:
   text exactly `[להחליף בציטוט אמיתי מלקוחה]` so Shani can't miss them. Insert in `app/page.tsx` right after
   `<TrustedBy/>` or before `<FAQ/>`. Signal-accent quote marks.
2. **Phase 3 — Blog "מחשבות אחרונות".** Data file `lib/posts.ts` (date, readTime, tags, title, excerpt, slug,
   bilingual). Section component on home (date · read-time · tags layout) + `/blog` list + `/blog/[slug]`.
   Draft 3 posts (titles, intros only — mark as drafts): (a) "למה רוב בעלי עסקים לא צריכים אתר — הם צריכים מערכת",
   (b) "3 אוטומציות וואטסאפ שכל עסק קטן בישראל צריך", (c) "מה 10 שנים כעצמאית לימדו אותי לפני שעברתי ל-AI".
   Thread her angle (came from business, not hi-tech) through them.
3. **Bilingual polish of remaining sections** still Hebrew-only: Services, Process, FAQ, Contact, Footer,
   CTAStrip, About. Add i18n strings (he+en) and wire `useLang()` so EN toggle fully works site-wide.
4. **Final QA pass:** grep for leftover off-palette colors (`139,92,246` purple, `0,229,255`/`06B6D4` cyan,
   `Syne`, "Shifted Tech" branding) and fix. Verify mobile (<640) layout. Confirm `npm run build` clean. Push.

When all done, the site should be fully bilingual, single-accent, with portfolio + testimonials + blog.
Leave a short summary commit. Shani reviews in the morning.
