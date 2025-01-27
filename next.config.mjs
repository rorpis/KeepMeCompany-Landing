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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: blob:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data: https: http:",
              "img-src 'self' data: blob: https: http:",
              "media-src 'self' https: http: blob:",
              "connect-src 'self' https: http: wss: ws:",
              "frame-src 'self' https: http:",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
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
