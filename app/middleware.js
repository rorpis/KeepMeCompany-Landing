import { NextResponse } from 'next/server';
import { i18nConfig } from './config/i18n';
import { getLocaleFromCountry } from './config/countryMapping';

// Add this at the very top of the file
console.log('🚀 Middleware file loaded');

async function getCountryFromIP(ip) {
  try {
    const apiKey = process.env.IPTOEARTH_API_KEY;
    const response = await fetch(`https://api.iptoearth.com/v1/location?ip=${ip}&key=${apiKey}`);
    const data = await response.json();
    
    console.log('🌍 IP to Earth Response:', data);
    
    return data.country_code;
  } catch (error) {
    console.error('❌ Failed to get country from IP:', error);
    return 'UK';
  }
}

export async function middleware(request) {
  // Force console log to appear
  console.log('🔥 Middleware executing', {
    url: request.url,
    pathname: request.nextUrl.pathname,
    headers: Object.fromEntries(request.headers)
  });
  
  // Basic request logging
  console.log('=== MIDDLEWARE START ===');
  console.log('🚀 Request URL:', request.url);
  console.log('📍 Pathname:', request.nextUrl.pathname);
  
  // Log all headers
  const headers = Object.fromEntries(request.headers);
  console.log('🔍 All Headers:', headers);
  
  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  // Early return for static files and API routes
  if (pathname.startsWith('/_next') || 
      pathname.includes('/api/') ||
      pathname.includes('.')) {
    console.log('⏭️ Skipping middleware for static/api route');
    console.log('=== MIDDLEWARE END ===');
    return;
  }

  // Check if pathname has a locale
  const pathnameHasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  console.log('🌍 Has locale?', pathnameHasLocale);

  if (!pathnameHasLocale) {
    // Get client IP from Heroku headers
    const clientIP = headers['x-forwarded-for']?.split(',')[0] || 
                    headers['x-real-ip'] || 
                    'unknown';
    
    console.log('🌐 Client IP:', clientIP);
    
    // Get country from IP
    const country = await getCountryFromIP(clientIP);
    console.log('🌐 Detected Country:', country);
                   
    // Get locale for the country
    const locale = getLocaleFromCountry(country);
    console.log('🗣️ Selected locale:', locale);
    
    // Create new URL
    const newUrl = new URL(request.url);
    newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    console.log('➡️ Redirecting to:', newUrl.pathname);
    
    console.log('=== MIDDLEWARE END ===');
    return NextResponse.redirect(newUrl);
  }

  console.log('✅ No redirect needed');
  console.log('=== MIDDLEWARE END ===');
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};