import { MetadataRoute } from 'next'
import { guides } from '@/lib/guides'

const BASE = 'https://shani-ai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}`,               lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/pricing`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/websites`,      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/automations`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/audit`,         lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/work`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/guides`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/accessibility`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/cancellation`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Open guide pages (static HTML in public/guides). The 2025 content calendar is noindexed, so it stays out.
  const guidePages: MetadataRoute.Sitemap = guides
    .filter((g) => g.file !== 'content-calendar-month1.html')
    .map((g) => ({
      url: `${BASE}/guides/${g.file}`,
      lastModified: new Date(g.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))

  return [...staticPages, ...guidePages]
}
