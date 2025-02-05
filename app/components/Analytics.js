'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '../utils/analytics';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null; // This component doesn't render anything
} 