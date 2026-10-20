/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: false,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // Retired URLs that Google still has indexed: send them on permanently (308).
      { source: '/ai-consulting', destination: '/audit', permanent: true },
      // the price list page was retired; its traffic goes to the services section
      { source: '/pricing', destination: '/#build', permanent: true },
      { source: '/en/pricing', destination: '/en#build', permanent: true },
      { source: '/automations', destination: '/chatbots', permanent: true },
      { source: '/en/automations', destination: '/en/chatbots', permanent: true },
      { source: '/en/ai-consulting', destination: '/en/audit', permanent: true },
      { source: '/blog', destination: '/guides', permanent: true },
      { source: '/blog/:slug*', destination: '/guides', permanent: true },
      // one address per screening page
      { source: '/small-lights/index.html', destination: '/small-lights', permanent: true },
      { source: '/small-lights/original/index.html', destination: '/small-lights/original', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/audit', destination: '/audit.html' },
      // SMALL LIGHTS screening pages: approved static player pages (public/small-lights). The film files stay on the
      // existing SMALL LIGHTS media host; only page code, subtitles and small images are served from this site.
      { source: '/small-lights', destination: '/small-lights/index.html' },
      { source: '/small-lights/original', destination: '/small-lights/original/index.html' },
    ];
  },
}

module.exports = nextConfig
