import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://shani-ai.com',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://shani-ai.com/work',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://shani-ai.com/work/solis',
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: 'https://shani-ai.com/work/rox-watch',
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: 'https://shani-ai.com/work/air-jordan',
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: 'https://shani-ai.com/work/lilach-hazan',
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: 'https://shani-ai.com/work/my-money',
      lastModified: new Date(),
      priority: 0.6,
    },
  ]
}
