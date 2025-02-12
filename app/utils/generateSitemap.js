import { i18nConfig } from '../config/i18n';

export function generateSitemapXml(baseUrl) {
  const today = new Date().toISOString();
  
  // Start XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add URLs for each locale
  i18nConfig.locales.forEach(locale => {
    // Home page
    xml += `  <url>
    <loc>${baseUrl}/${locale}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>\n`;
    
    // Public care page
    xml += `  <url>
    <loc>${baseUrl}/${locale}/public-care/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    
    // Private care page
    xml += `  <url>
    <loc>${baseUrl}/${locale}/private-care/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    
    // Contact sales page
    xml += `  <url>
    <loc>${baseUrl}/${locale}/contact-sales/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
  });
  
  xml += '</urlset>';
  return xml;
} 