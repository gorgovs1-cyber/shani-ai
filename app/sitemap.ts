import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://shani-ai.vercel.app',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://shani-ai.vercel.app/work',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://shani-ai.vercel.app/work/solis',
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: 'https://shani-ai.vercel.app/work/rox-watch',
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: 'https://shani-ai.vercel.app/work/air-jordan',
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: 'https://shani-ai.vercel.app/work/lilach-hazan',
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: 'https://shani-ai.vercel.app/work/my-money',
      lastModified: new Date(),
      priority: 0.6,
    },
  ]
}
