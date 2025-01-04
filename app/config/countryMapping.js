export const COUNTRY_TO_LOCALE = {
  // English locales
  GB: 'en-UK', // United Kingdom
  UK: 'en-UK', // United Kingdom (alternative code)
  DE: 'en-UK', // Germany
  
  // Spanish locales
  ES: 'es-ES', // Spain
  CL: 'es-ES', // Chile
  PT: 'es-ES', // Portugal
};

// Default locale for countries not in the mapping
export const DEFAULT_LOCALE = 'en-UK';

export function getLocaleFromCountry(countryCode) {
  return COUNTRY_TO_LOCALE[countryCode] || DEFAULT_LOCALE;
} 