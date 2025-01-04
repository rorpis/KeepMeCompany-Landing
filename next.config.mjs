/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    instrumentationHook: true
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = ['@next/env', ...config.externals];
    }
    return config;
  }
};

export default nextConfig;
