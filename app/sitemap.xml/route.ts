import { guides } from '@/lib/guides'

// sitemap.xml with hreflang alternates, real lastmod dates and image entries.
// (Next 14.2.3's sitemap.ts cannot emit <image:image>, so the XML is written here.)
//
// lastmod = the date the page's visible content last changed. Update the date next to a page
// when its content changes; do not bump everything on every deploy.

const BASE = 'https://shani-ai.com'

type Img = { loc: string; title: string }
type Entry = {
  path: string
  lastmod: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
  bilingual?: boolean
  images?: Img[]
}

const portrait: Img = { loc: `${BASE}/portrait.webp`, title: 'שני גורגוב, Shani AI Creator' }
const about: Img = { loc: `${BASE}/shani-about.webp`, title: 'שני גורגוב' }
const slCard: Img = { loc: `${BASE}/small-lights/card.jpg`, title: 'SMALL LIGHTS: מגדלור על אי קטן בשקיעה סגולה-זהובה מעל הים' }
const orPreview: Img = { loc: `${BASE}/project-previews/or-site.webp`, title: 'תצוגה מקדימה של דף הבית באתר אור איזנשטדט: דיוקן של אור וכותרת הדף' }
const myMoney: Img = { loc: `${BASE}/project-previews/mymoney-site.webp`, title: 'תצוגה מקדימה של אפליקציית My Money: ניהול כספי לעצמאים בעסקי שירות' }

const pages: Entry[] = [
  { path: '', lastmod: '2026-10-26', changefreq: 'weekly', priority: 1, bilingual: true, images: [portrait, about, slCard] },
  { path: '/websites', lastmod: '2026-10-21', changefreq: 'monthly', priority: 0.9, bilingual: true },
  { path: '/chatbots', lastmod: '2026-10-21', changefreq: 'monthly', priority: 0.9, bilingual: true },
  { path: '/ai-visual-content', lastmod: '2026-10-26', changefreq: 'monthly', priority: 0.9, bilingual: true },
  { path: '/audit', lastmod: '2026-10-21', changefreq: 'monthly', priority: 0.9, bilingual: true },
  { path: '/work', lastmod: '2026-10-22', changefreq: 'monthly', priority: 0.8, bilingual: true, images: [slCard, orPreview, myMoney] },
  { path: '/work/small-lights', lastmod: '2026-10-20', changefreq: 'monthly', priority: 0.8, images: [slCard] },
  { path: '/small-lights', lastmod: '2026-10-11', changefreq: 'yearly', priority: 0.7 },
  { path: '/small-lights/original', lastmod: '2026-10-11', changefreq: 'yearly', priority: 0.5 },
  { path: '/guides', lastmod: '2026-10-20', changefreq: 'weekly', priority: 0.7, bilingual: true },
  { path: '/accessibility', lastmod: '2026-10-26', changefreq: 'yearly', priority: 0.3, bilingual: true },
  { path: '/privacy', lastmod: '2026-10-26', changefreq: 'yearly', priority: 0.3, bilingual: true },
  { path: '/terms', lastmod: '2026-10-26', changefreq: 'yearly', priority: 0.3, bilingual: true },
  { path: '/cancellation', lastmod: '2026-10-26', changefreq: 'yearly', priority: 0.3, bilingual: true },
]

// Open guide pages (static HTML in public/guides). The 2025 content calendar is noindexed, so it stays out.
// A guide's lastmod is its publication date in lib/guides.ts unless it was edited later (listed here).
const guideEdited: Record<string, string> = {
  'claude-opus-film.html': '2026-10-20',
  'chatgpt-in-excel.html': '2026-10-26',
  'claude-canva-designs.html': '2026-10-26',
  'claude-to-income.html': '2026-10-26',
  'lead-magnet-5-prompts.html': '2026-10-26',
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function url(e: Entry, lang: 'he' | 'en'): string {
  const loc = lang === 'he' ? `${BASE}${e.path}` : `${BASE}/en${e.path}`
  const alt = e.bilingual
    ? `\n    <xhtml:link rel="alternate" hreflang="he-IL" href="${BASE}${e.path}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${BASE}/en${e.path}"/>`
    : ''
  const imgs = lang === 'he' && e.images
    ? e.images.map((i) => `\n    <image:image><image:loc>${esc(i.loc)}</image:loc><image:title>${esc(i.title)}</image:title></image:image>`).join('')
    : ''
  const priority = lang === 'en' ? (e.path === '' ? 0.8 : 0.6) : e.priority
  const freq = lang === 'en' ? 'monthly' : e.changefreq
  return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>${alt}${imgs}\n  </url>`
}

export function GET(): Response {
  const entries: string[] = []
  for (const p of pages) entries.push(url(p, 'he'))
  for (const p of pages) if (p.bilingual) entries.push(url(p, 'en'))
  const extra: Entry[] = [
    ...guides
      .filter((g) => g.file !== 'content-calendar-month1.html')
      .map((g) => ({ path: `/guides/${g.file}`, lastmod: guideEdited[g.file] || g.date, changefreq: 'yearly' as const, priority: 0.6 })),
    { path: '/guides/claude-opus-film.html', lastmod: guideEdited['claude-opus-film.html'], changefreq: 'yearly', priority: 0.6 },
  ]
  for (const g of extra) entries.push(url(g, 'he'))
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.join('\n')}\n</urlset>\n`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=0, s-maxage=3600' } })
}
