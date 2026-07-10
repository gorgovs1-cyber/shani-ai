import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard.html'],
    },
    sitemap: 'https://shani-ai.com/sitemap.xml',
    host: 'https://shani-ai.com',
  }
}
