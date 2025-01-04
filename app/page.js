'use client';

import { redirect } from 'next/navigation';
import { i18nConfig } from './config/i18n';

export default function Page() {
  redirect(`/${i18nConfig.defaultLocale}`);
}