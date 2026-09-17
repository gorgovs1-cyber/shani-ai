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
      { source: '/blog', destination: '/guides', permanent: true },
      { source: '/blog/:slug*', destination: '/guides', permanent: true },
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
    ];
  },
}

module.exports = nextConfig
