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
1. [x] DONE — Testimonials (`components/Testimonials.tsx`): bilingual carousel, 2 placeholders, in `app/page.tsx` after WorkGrid.
2. [x] DONE — Blog Phase 3: `lib/posts.ts`, `components/BlogSection.tsx`, `/blog` + `/blog/[slug]`, 3 draft posts.
3. **TODO — Bilingual polish of sections still Hebrew-only:** Services, Process, FAQ, Contact, Footer,
   CTAStrip, About. For each: move user-facing Hebrew strings into `lib/i18n.ts` (add matching `en`), wire
   `useLang()`, verify the EN toggle renders English + flips LTR. Also add a "blog" link to `nav.links` (he+en).
   Do ONE component per run (commit+push each) to keep changes small.
4. **TODO — Final QA after bilingual polish:** re-grep `139,92,246`/`0,229,255`/`06B6D4`/`8B5CF6`/"Shifted Tech";
   verify mobile (<640px) for testimonials + blog; clean `npm run build`; push. Then mark project COMPLETE here.

Color QA already done once: AutomationTree, Contact orb, CTAStrip unified to signal. `var(--font-syne)` still
appears in a few files but aliases to `--font-display` in globals.css, so it renders correctly — low priority.

When all done, the site is fully bilingual, single-accent, with portfolio + testimonials + blog. Leave a short summary commit.
