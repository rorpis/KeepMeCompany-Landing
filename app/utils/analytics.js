import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';

export const trackPageView = async (pathname) => {
  console.log('Tracking page view:', pathname);
  try {
    const userCountry = localStorage.getItem('userCountry') || 'unknown';
    const userLocale = localStorage.getItem('locale') || 'unknown';
    const visitorId = document.cookie
      .split('; ')
      .find(row => row.startsWith('visitor='))
      ?.split('=')[1] || 'unknown';
    
    await addDoc(collection(db, 'pageviews'), {
      pathname,
      timestamp: serverTimestamp(),
      visitorId,
      metadata: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        referrer: document.referrer,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
      },
      location: {
        country: userCountry,
        locale: userLocale
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
}; 