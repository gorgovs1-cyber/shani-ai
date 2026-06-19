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
