/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control",  value: "on" },
  {
    key:   "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options",        value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
  {
    key:   "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Store-route override applied below via path-specific headers

  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline/unsafe-eval for hydration scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com",
      "connect-src 'self' https://wa.me",
      "media-src 'none'",
      "object-src 'none'",
      "frame-src https://www.google.com https://maps.google.com",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  // Gzip / Brotli compression
  compress: true,

  // Remove the X-Powered-By header to reduce fingerprinting
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:  "images.unsplash.com",
      },
    ],
    // Serve AVIF first, then WebP — dramatically smaller files
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      // Default security headers for all routes
      {
        source:  "/(.*)",
        headers: securityHeaders,
      },
      // Admin routes: allow Clerk + Supabase
      {
        source: "/admin(.*)",
        headers: [
          {
            key:   "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.mdigitaldev.com https://*.clerk.accounts.dev",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://img.clerk.com",
              "connect-src 'self' https://*.supabase.co https://*.clerk.com https://*.clerk.accounts.dev wss://*.supabase.co",
              "frame-src https://accounts.google.com https://*.clerk.accounts.dev",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      // Store routes: allow geolocation + n8n webhook connect
      {
        source: "/store(.*)",
        headers: [
          {
            key:   "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key:   "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com",
              // /api/order is same-origin; n8n is called server-side
              "connect-src 'self' https://wa.me",
              "media-src 'none'",
              "object-src 'none'",
              "frame-src https://www.google.com https://maps.google.com",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
