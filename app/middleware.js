import { NextResponse } from 'next/server';
import { i18nConfig } from './config/i18n';
import { getLocaleFromCountry } from './config/countryMapping';

export function middleware(request) {
  console.log('🚀 Middleware executing...');
  const pathname = request.nextUrl.pathname;
  console.log('📍 Pathname:', pathname);

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.includes('.')
  ) {
    console.log('⏭️ Skipping middleware for static/api route');
    return;
  }

  // Check if pathname already has a locale
  const hasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale}`)
  );

  console.log('🌍 Has locale?', hasLocale);
  console.log('🌐 Request headers:', Object.fromEntries(request.headers));
  console.log('📱 Geo information:', request.geo);

  if (!hasLocale) {
    // Get country from geo headers
    const countryCode = request.geo?.country || 'UK';
    console.log('🏳️ Detected country code:', countryCode);
    
    // Get appropriate locale for the country
    const locale = getLocaleFromCountry(countryCode);
    console.log('🌐 Selected locale:', locale);
    
    // Create new URL with detected locale
    const newUrl = new URL(request.url);
    newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    console.log('➡️ Redirecting to:', newUrl.pathname);
    
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
    '/'
  ],
};