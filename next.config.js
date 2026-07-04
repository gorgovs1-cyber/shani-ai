/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
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
