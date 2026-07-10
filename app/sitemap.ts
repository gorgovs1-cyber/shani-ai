import { MetadataRoute } from 'next'

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
    { url: `${BASE}/blog`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/accessibility`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const workSlugs = ['solis', 'rox-watch', 'air-jordan', 'lilach-hazan', 'my-money']
  const workPages: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
    url: `${BASE}/work/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...workPages]
}
