import { NextResponse } from 'next/server';
import { i18nConfig } from './config/i18n';
import { getLocaleFromCountry } from './config/countryMapping';

// Use console.log instead of process.stdout
const log = (message, data = {}) => {
  console.log(`[Middleware] ${message}`, data);
};

// Remove the top-level process.stdout.write
console.log('🚀 Middleware file loaded');

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
  console.log('⚡ Middleware executing');

  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Log every request
  log('📍 Request', {
    url: request.url,
    pathname,
    method: request.method
  });

  // Check if pathname already has a locale
  const hasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale}`)
  );

  // If path already has a valid locale, skip middleware
  if (hasLocale) {
    log('✅ Valid locale found, skipping redirect');
    return NextResponse.next();
  }

  // Early return for static files and API routes
  if (pathname.startsWith('/_next') || 
      pathname.includes('/api/') ||
      pathname.includes('.')) {
    log('⏭️ Skipping static/api route');
    return NextResponse.next();
  }

  // Get client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIP = forwardedFor ? forwardedFor.split(',')[0].trim() : null;

  log('🌐 Client IP detected', { clientIP });

  try {
    const country = await getCountryFromIP(clientIP);
    const locale = getLocaleFromCountry(country);
    
    log('🌍 Locale detection', {
      clientIP,
      detectedCountry: country,
      selectedLocale: locale
    });

    // Create new URL with locale
    const newUrl = new URL(request.url);
    // Ensure we don't add locale if it's already there
    newUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    
    log('➡️ Redirecting', {
      from: pathname,
      to: newUrl.pathname
    });

    return NextResponse.redirect(newUrl);
  } catch (error) {
    log('❌ Error in middleware', { 
      error: error.message
    });
    // On error, redirect to default locale
    const newUrl = new URL(request.url);
    newUrl.pathname = `/${i18nConfig.defaultLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(newUrl);
  }
}

// Update matcher to be more specific
export const config = {
  matcher: [
    // Match root path
    '/',
    // Match all paths that don't start with _next, api, or any of our locales
    '/((?!_next|api|en-UK|es-ES).*)'
  ]
};