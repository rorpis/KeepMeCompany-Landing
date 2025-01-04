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
  }
};

export default nextConfig;
