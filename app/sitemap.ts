import { MetadataRoute } from 'next'
import { guides } from '@/lib/guides'

const BASE = 'https://shani-ai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}`,               lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/websites`,      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/automations`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/audit`,         lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/work`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/work/small-lights`, lastModified: new Date('2026-10-05'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/small-lights`,  lastModified: new Date('2026-10-05'), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE}/small-lights/original`, lastModified: new Date('2026-10-05'), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/guides`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/accessibility`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/cancellation`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // English versions live under /en (middleware.ts). Each pair lists both languages as alternates.
  const bilingual = ['', '/websites', '/automations', '/audit', '/work', '/guides', '/accessibility', '/privacy', '/terms', '/cancellation']
  const langs = (p: string) => ({ languages: { 'he-IL': `${BASE}${p}`, en: `${BASE}/en${p}` } })
  for (const page of staticPages) {
    const p = page.url.replace(BASE, '')
    if (bilingual.includes(p)) page.alternates = langs(p)
  }
  const englishPages: MetadataRoute.Sitemap = bilingual.map((p) => ({
    url: `${BASE}/en${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: p === '' ? 0.8 : 0.6, alternates: langs(p),
  }))

  // Open guide pages (static HTML in public/guides). The 2025 content calendar is noindexed, so it stays out.
  const guidePages: MetadataRoute.Sitemap = guides
    .filter((g) => g.file !== 'content-calendar-month1.html')
    .map((g) => ({
      url: `${BASE}/guides/${g.file}`,
      lastModified: new Date(g.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))

  // The SMALL LIGHTS film guide is a regular guide page, reached from /work/small-lights only: it is not in
  // lib/guides.ts (that list drives the /guides library), so it is added here on its own.
  const filmGuide: MetadataRoute.Sitemap = [
    { url: `${BASE}/guides/claude-opus-film.html`, lastModified: new Date('2026-10-05'), changeFrequency: 'yearly', priority: 0.6 },
  ]

  return [...staticPages, ...englishPages, ...guidePages, ...filmGuide]
}
