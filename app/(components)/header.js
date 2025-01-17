'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../(styles)/Header.module.css';
import { COUNTRIES } from '../config/countries';
import { useTranslations } from '../hooks/useTranslations';

const Header = ({ locale }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslations();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCountryChange = (countryCode) => {
    const country = COUNTRIES[countryCode];
    if (country) {
      router.push(`/${country.locale}`);
    }
    setIsSelectOpen(false);
  };

  // Determine current country from locale
  const currentCountry = Object.values(COUNTRIES).find(
    country => country.locale === locale
  ) || COUNTRIES.UK;

  return (
    <header 
      className={`${styles.header} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href="/" 
        className={styles.logo}
      >
        KeepMeCompany
      </Link>
      
      <nav className={styles.nav}>
        <div className={styles.countrySelector}>
          <button
            className={styles.selectorButton}
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            aria-label={t('common.header.languageSelector')}
          >
            <span>{currentCountry.flag}</span>
          </button>
          
          {isSelectOpen && (
            <div className={styles.dropdown}>
              {Object.entries(COUNTRIES).map(([code, country]) => (
                <button
                  key={code}
                  className={styles.countryOption}
                  onClick={() => handleCountryChange(code)}
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Link 
          href={`/${locale}/contact-sales`} 
          className={styles.navLink}
        >
          {t('common.header.contactSales')}
        </Link>

        <a 
          href="https://app.keepmecompanyai.com" 
          className={styles.platformButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('common.header.openPlatform')}
        </a>
      </nav>
    </header>
  );
};

export default Header;