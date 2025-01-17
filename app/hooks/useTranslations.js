import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useTranslations() {
  const { locale } = useParams();
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const homeModule = await import(`@/app/locales/${locale}/home.json`);
        const commonModule = await import(`@/app/locales/${locale}/common.json`);
        const contactModule = await import(`@/app/locales/${locale}/contact.json`);
        
        setTranslations({
          home: homeModule.default || {},
          common: commonModule.default || {},
          contact: contactModule.default || {}
        });
      } catch (error) {
        console.error(`Failed to load translations for locale ${locale}:`, error);
      }
    };

    if (locale) {
      loadTranslations();
    }
  }, [locale]);

  const t = (key) => {
    if (!translations || Object.keys(translations).length === 0) {
      return key;
    }

    try {
      const parts = key.split('.');
      const namespace = parts[0];
      const path = parts.slice(1);
      
      let current = translations[namespace];
      
      for (const part of path) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          console.log(`Missing translation for path: ${parts.join('.')}`);
          return key;
        }
      }
      
      return current;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key;
    }
  };

  return { t };
}