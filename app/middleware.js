import { NextResponse } from 'next/server';
import { i18nConfig } from './config/i18n';
import { getLocaleFromCountry } from './config/countryMapping';

// Add this function for consistent logging
function logToConsole(message, data) {
  console.log(`[Middleware] ${message}`, JSON.stringify(data, null, 2));
  // Force flush logs in production
  if (process.env.NODE_ENV === 'production') {
    console.log('\n');
  }
}

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
  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  logToConsole('Request started', {
    url: request.url,
    pathname,
    method: request.method
  });

  // Early return for static files and API routes
  if (pathname.startsWith('/_next') || 
      pathname.includes('/api/') ||
      pathname.includes('.')) {
    logToConsole('Skipping middleware for static/api route', { pathname });
    return;
  }

  // Get client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIP = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
  
  logToConsole('Client details', { 
    ip: clientIP,
    headers: Object.fromEntries(request.headers)
  });

  // Check if pathname has a locale
  const pathnameHasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const country = await getCountryFromIP(clientIP);
    const locale = getLocaleFromCountry(country);
    
    logToConsole('Locale detection', {
      detectedCountry: country,
      selectedLocale: locale
    });

    // Create new URL with locale
    const newUrl = new URL(request.url);
    newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    
    logToConsole('Redirecting', {
      from: pathname,
      to: newUrl.pathname
    });

    return NextResponse.redirect(newUrl);
  }

  logToConsole('No redirect needed', { pathname });
  return NextResponse.next();
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