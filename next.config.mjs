/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: true,
  i18n: {
    localeDetection: false, // We'll handle this in middleware
  }
};

export default nextConfig;
