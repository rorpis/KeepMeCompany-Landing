import { Inter } from "next/font/google";
import { Suspense } from 'react';

import "../globals.css";

import Header from '@/app/(components)/header';
import Footer from '@/app/(components)/footer';
import SplashScreen from '@/app/(components)/splashScreen';

import { i18nConfig } from '../config/i18n';
import Analytics from '@/app/components/Analytics';

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params: { locale } }) {
  return (
    <SplashScreen>
      <Suspense fallback={null}>
        <div className="relative z-0">
      <Analytics />
          <Header locale={locale} />
          <main style={{ paddingTop: '8vh' }}>{children}</main>
          <Footer locale={locale} />
        </div>
      </Suspense>
    </SplashScreen>
  );
} 