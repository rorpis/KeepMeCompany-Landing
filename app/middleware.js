import { NextResponse } from 'next/server';
import { i18nConfig } from './config/i18n';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  console.log('Middleware called for:', pathname);

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Check if pathname has a locale
  const hasLocale = i18nConfig.locales.some(
    locale => pathname.startsWith(`/${locale}`)
  );

  if (!hasLocale) {
    // Create new URL with default locale
    const newUrl = new URL(request.url);
    newUrl.pathname = `/${i18nConfig.defaultLocale}${pathname === '/' ? '' : pathname}`;
    console.log('Redirecting to:', newUrl.pathname);
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/'
  ],
};