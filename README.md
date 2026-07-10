# Shifted Tech — Portfolio Site

Dark luxury cinematic portfolio for Shifted Tech.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger (loaded async, client-side)
- Lenis smooth scroll
- Vercel deployment

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy to Vercel

1. Push to GitHub
2. Import repo in vercel.com
3. Deploy — zero config needed (vercel.json included)

## Structure

```
app/
  page.tsx           → Home (Hero + Work + Services + Contact)
  work/
    page.tsx         → All projects list
    [slug]/page.tsx  → Individual project page
  layout.tsx         → Root layout (Nav + Lenis)
  globals.css        → Design tokens + utility styles

components/
  Hero.tsx           → Animated hero section
  WorkGrid.tsx       → Featured projects grid
  Services.tsx       → Services + pricing cards
  Contact.tsx        → CTA section
  Footer.tsx         → Footer
  Nav.tsx            → Fixed navigation
  LenisProvider.tsx  → Client-side smooth scroll init

lib/
  projects.ts        → All project data (edit here to add projects)
```

## Adding a Project

Edit `lib/projects.ts` — add a new object to the `projects` array.
Then add a thumbnail image to `public/projects/`.

## Brand Colors

| Token       | Value     |
|-------------|-----------|
| Black       | #080808   |
| Surface     | #111111   |
| Border      | #1c1c1c   |
| Cyber Cyan  | #00E5FF   |
| White       | #F2F2F2   |
| Muted       | #666666   |

## WhatsApp Link

Update the WhatsApp number in `components/Contact.tsx`:
```
href="https://wa.me/972XXXXXXXXX"
```

## Marketing measurement (GA4 + Meta Pixel)

Client-side tags load via `components/AnalyticsScripts.tsx` (mounted in `app/layout.tsx`)
and read two public env vars. **Until these are filled in, no tags load and nothing
breaks** — the site builds and runs cleanly.

| Env var | Where to get it | Format |
|---|---|---|
| `NEXT_PUBLIC_GA4_ID` | Google Analytics → Admin → Data Streams | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Events Manager → Data Sources | numeric, e.g. `123456789012345` |

Add both to `.env.local` for local dev **and** to Vercel → Project → Settings →
Environment Variables for production.

### Lead / generate_lead conversion event

The primary conversion is a lead completing the `/audit` form. Because `/audit` is a
standalone static page (`public/audit/index.html`, outside the Next app), it carries
its **own** copy of the GA4 + Pixel snippet. Paste the same two IDs into the two
constants near the top of that file's `<script>`:

```js
var GA4_ID = "G-XXXXXXXXXX";
var META_PIXEL_ID = "123456789012345";
```

On form completion the audit page's `done()` calls `fireLead()`, which sends
`generate_lead` to GA4 and `Lead` to Meta Pixel (fires once per submission, on both
the n8n-webhook success path and the WhatsApp fallback). The existing n8n logic is
untouched.

Elsewhere in the Next app you can fire the same conversion with:
```ts
import { trackLead } from "@/components/AnalyticsScripts";
trackLead({ source: "some-form" });
```

> **TODO for Shani:** fill in the two IDs in (1) `.env.local` + Vercel and
> (2) the two constants in `public/audit/index.html`.
