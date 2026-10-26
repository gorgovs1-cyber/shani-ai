const csp = [
  "default-src 'self'",
  // Next.js and the static pages use inline scripts; third-party hosts are the consent-gated Google tag and Meta Pixel only.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net https://www.google.com https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://www.facebook.com https://connect.facebook.net https://formspree.io",
  // The SMALL LIGHTS film file is served from its own Vercel project.
  "media-src 'self' blob: https://opus55-animated-short-site.vercel.app",
  "frame-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'self'",
].join('; ');

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
      // behind-the-scenes images renamed to descriptive file names
      { source: '/small-lights/bts/06D_the_first_answer.jpg', destination: '/small-lights/bts/small-lights-lighthouse-first-answer.jpg', permanent: true },
      { source: '/small-lights/bts/agents_timeline.jpg', destination: '/small-lights/bts/small-lights-agents-timeline.jpg', permanent: true },
      { source: '/small-lights/bts/whitedisc_06D_frame3812_before.jpg', destination: '/small-lights/bts/small-lights-white-disc-before.jpg', permanent: true },
      { source: '/small-lights/bts/whitedisc_06D_frame3812_after.jpg', destination: '/small-lights/bts/small-lights-white-disc-after.jpg', permanent: true },
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
      // Content-Security-Policy + Permissions-Policy for the site itself. Client documents hosted under
      // /proposals, /checklist, /bank, /quiz, /demo and the private /dashboard.html keep their own pages unchanged.
      // Google Analytics and the Meta Pixel are only allow-listed here: they still load only after the visitor accepts cookies.
      {
        source: '/((?!proposals|checklist|bank|quiz|demo|dashboard\\.html).*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
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
