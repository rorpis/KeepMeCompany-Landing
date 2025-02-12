import { generateSitemapXml } from '@/app/utils/generateSitemap';

export async function GET() {
  try {
    const baseUrl = 'https://keepmecompanyai.com';
    const sitemap = generateSitemapXml(baseUrl);
    
    // Ensure we're sending raw XML
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        // Prevent any middleware or framework from wrapping the response
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
} 