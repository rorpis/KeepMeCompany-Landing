/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: true,
  generateStaticParams: async () => {
    return [
      { locale: 'en-UK' },
      { locale: 'es-ES' },
    ];
  },
};

export default nextConfig;
