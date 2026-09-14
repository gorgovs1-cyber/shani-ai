/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: false,
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      { source: '/audit', destination: '/audit.html' },
    ];
  },
}

module.exports = nextConfig
