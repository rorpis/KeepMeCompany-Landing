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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-middleware-cache',
            value: 'no-cache'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
