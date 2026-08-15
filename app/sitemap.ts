import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const BASE = 'https://shani-ai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}`,               lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/pricing`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/websites`,      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/automations`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/ai-consulting`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/audit`,         lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/work`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/guides`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/accessibility`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // נגזר מ-lib/projects.ts, אותו מקור שממנו נבנים העמודים עצמם,
  // כדי שהסייטמאפ לא יוכל להצביע על עמוד שלא קיים
  const workPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...workPages]
}
