'use client';

import { redirect } from 'next/navigation';
import { i18nConfig } from './config/i18n';

export default function Page() {
  return null; // The middleware will handle the redirect
}

// Pre-render the default paths
export function generateStaticParams() {
  return [
    { locale: 'en-UK' },
    { locale: 'es-ES' },
  ];
}