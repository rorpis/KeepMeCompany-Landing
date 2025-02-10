import { generateSitemapXml } from '@/app/utils/generateSitemap';

export async function GET() {
  const baseUrl = 'https://keepmecompanyai.com';
  const sitemap = generateSitemapXml(baseUrl);
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
} 