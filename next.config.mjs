/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    instrumentationHook: true
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://keep-me-company-backend-b450f889ef90.herokuapp.com",
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = ['@next/env', ...config.externals];
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https: https://app.keepmecompanyai.com https://www.keepmecompanyai.com https://www.youtube.com https://youtu.be",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' https:",
              "frame-src 'self' https://www.youtube.com https://youtu.be",
              "connect-src 'self' https://keep-me-company-backend-b450f889ef90.herokuapp.com https://iptoearth.expeditedaddons.com https://*.googleapis.com https://firestore.googleapis.com https://*.firebaseio.com",
              "object-src 'none'",
              "form-action 'self'",
              "base-uri 'self'",
              "frame-ancestors 'none'"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
