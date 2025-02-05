import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import crypto from 'crypto';

const generateVisitorId = () => {
  // Generate a random visitor ID
  const randomId = crypto.randomBytes(16).toString('hex');
  
  // Set it as a cookie that lasts for 1 year
  document.cookie = `visitor=${randomId}; Path=/; SameSite=Strict; Secure; Max-Age=${60 * 60 * 24 * 365}`;
  
  return randomId;
};

export const trackPageView = async (pathname) => {
  try {
    const userCountry = localStorage.getItem('userCountry') || 'unknown';
    const userLocale = localStorage.getItem('locale') || 'unknown';
    
    // Try to get visitor ID from cookie, or generate a new one if not found
    const visitorId = document.cookie
      .split('; ')
      .find(row => row.startsWith('visitor='))
      ?.split('=')[1] || generateVisitorId();
    
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