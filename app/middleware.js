import { NextResponse } from 'next/server';
import { i18nConfig } from './config/i18n';
import { getLocaleFromCountry } from './config/countryMapping';
import crypto from 'crypto';

// Use error logging for Heroku (more likely to show up)
const log = (message, data = {}) => {
  console.error(`[Middleware ${Date.now()}] ${message}`, JSON.stringify(data));
};

async function getCountryFromIP(ip) {
  if (!ip) {
    return 'ES';
  }

  try {
    const apiKey = process.env.IPTOEARTH_API_KEY;
    if (!apiKey) {
      return 'ES';
    }
    
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

    if (!data.country_code) {
      throw new Error('No country code in response');
    }

    return data.country_code;
  } catch (error) {
    return 'ES';
  }
}

export async function middleware(request) {
  // Force HTTPS redirect
  if (process.env.NODE_ENV === 'production' && 
      !request.headers.get('x-forwarded-proto')?.includes('https')) {
    const secureUrl = `https://${request.headers.get('host')}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(secureUrl, 301);
  }

  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Early return for static files and API routes
  if (pathname.startsWith('/_next') || 
      pathname.includes('/api/') ||
      pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const hasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale}`)
  );

  // If path already has a valid locale, skip middleware
  if (hasLocale) {
    return NextResponse.next();
  }

  // Get client IP and determine locale
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
    
    // Generate nonce
    const nonce = crypto.randomBytes(16).toString('base64');
    
    // Create response with redirect
    const response = NextResponse.redirect(newUrl);
    
    // Set first-party cookie with explicit attributes
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',  // Most restrictive setting
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    };

    // Set the cookie with explicit attributes
    response.headers.set(
      'Set-Cookie',
      `locale=${locale}; ${Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ')}`
    );

    // Add this to your middleware before the response
    const hashedIP = crypto.createHash('sha256')
      .update(clientIP || 'unknown')
      .digest('hex');

    // Add to your response cookies
    response.headers.set(
      'Set-Cookie',
      `visitor=${hashedIP}; Path=/; SameSite=Strict; Secure; HttpOnly; Max-Age=${60 * 60 * 24 * 365}`
    );

    // Handle CSP nonce if needed
    const csp = response.headers.get('Content-Security-Policy');
    if (csp) {
      response.headers.set(
        'Content-Security-Policy',
        csp.replace(/{{nonce}}/g, nonce)
      );
    }
    
    return response;
  } catch (error) {
    // On error, redirect to default locale
    const newUrl = new URL(request.url);
    newUrl.pathname = `/${i18nConfig.defaultLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(newUrl);
  }
}

// Add matcher configuration to ensure middleware runs on all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};