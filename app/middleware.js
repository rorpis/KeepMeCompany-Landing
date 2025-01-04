import { NextResponse } from 'next/server';
import { i18nConfig } from './config/i18n';
import { getLocaleFromCountry } from './config/countryMapping';

// Force logs to appear in Heroku
const log = (message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[Middleware ${timestamp}] ${message} ${JSON.stringify(data)}\n`;
  process.stdout.write(logMessage);
};

async function getCountryFromIP(ip) {
  if (!ip) {
    console.error('No IP provided to getCountryFromIP');
    return 'UK';
  }

  try {
    const apiKey = process.env.IPTOEARTH_API_KEY;
    if (!apiKey) {
      console.error('Missing IPTOEARTH_API_KEY environment variable');
      return 'UK';
    }

    console.log(`Fetching country for IP: ${ip}`);
    
    const response = await fetch(
      `https://api.iptoearth.com/v1/location?ip=${ip}&key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'KeepMeCompany/1.0'
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(5000)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('IP to Earth Response:', data);

    if (!data.country_code) {
      throw new Error('No country code in response');
    }

    return data.country_code;
  } catch (error) {
    console.error('Failed to get country from IP:', error);
    return 'UK';
  }
}

export async function middleware(request) {
  log('🚀 Middleware executing');

  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  log('📍 Request info', {
    url: request.url,
    pathname,
    headers: Object.fromEntries(request.headers)
  });

  // Skip middleware for these paths
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    log('⏭️ Skipping middleware');
    return NextResponse.next();
  }

  // Get client IP from x-forwarded-for header
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIP = forwardedFor ? forwardedFor.split(',')[0].trim() : null;
  
  log('🌐 Client IP detected', { clientIP });

  // Check if pathname has a locale
  const pathnameHasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    try {
      const country = await getCountryFromIP(clientIP);
      const locale = getLocaleFromCountry(country);
      
      log('🌍 Locale detection', {
        clientIP,
        detectedCountry: country,
        selectedLocale: locale
      });

      const newUrl = new URL(request.url);
      newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
      
      log('➡️ Redirecting', {
        from: pathname,
        to: newUrl.pathname
      });

      return NextResponse.redirect(newUrl);
    } catch (error) {
      log('❌ Error in middleware', { 
        error: error.message,
        stack: error.stack 
      });
      const newUrl = new URL(request.url);
      newUrl.pathname = `/${i18nConfig.defaultLocale}${pathname === '/' ? '' : pathname}`;
      return NextResponse.redirect(newUrl);
    }
  }

  log('✅ No redirect needed');
  return NextResponse.next();
}

// Simplified matcher pattern
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};