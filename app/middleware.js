import { NextResponse } from 'next/server';
import { i18nConfig } from './config/i18n';
import { getLocaleFromCountry } from './config/countryMapping';

// Use error logging for Heroku (more likely to show up)
const log = (message, data = {}) => {
  console.error(`[Middleware ${Date.now()}] ${message}`, JSON.stringify(data));
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
      `https://iptoearth.expeditedaddons.com/?ip=${ip}&api_key=${apiKey}`,
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
  // Force an error log at the start
  console.error(`[Middleware] START - URL: ${request.url}`);

  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const hasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale}`)
  );

  // Log the current state
  log('Request state', {
    pathname,
    hasLocale,
    headers: Object.fromEntries(request.headers)
  });

  // If path already has a valid locale, skip middleware
  if (hasLocale) {
    log('Skipping - has locale');
    return NextResponse.next();
  }

  // Early return for static files and API routes
  if (pathname.startsWith('/_next') || 
      pathname.includes('/api/') ||
      pathname.includes('.')) {
    log('Skipping - static/api');
    return NextResponse.next();
  }

  // Get client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIP = forwardedFor ? forwardedFor.split(',')[0].trim() : null;

  try {
    const country = await getCountryFromIP(clientIP);
    const locale = getLocaleFromCountry(country);
    
    log('Locale detected', {
      ip: clientIP,
      country,
      locale
    });

    // Create new URL with locale
    const newUrl = new URL(request.url);
    newUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    
    log('Redirecting', {
      from: pathname,
      to: newUrl.pathname
    });

    return NextResponse.redirect(newUrl);
  } catch (error) {
    log('Error occurred', { 
      error: error.message,
      stack: error.stack
    });
    
    // On error, redirect to default locale
    const newUrl = new URL(request.url);
    newUrl.pathname = `/${i18nConfig.defaultLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(newUrl);
  }
}

// Simplify matcher to ensure it runs
export const config = {
  matcher: [
    '/',
    '/((?!api|_next|favicon.ico).*)'
  ]
};