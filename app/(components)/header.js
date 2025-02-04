'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../(styles)/Header.module.css';
import { COUNTRIES } from '../config/countries';
import { useTranslations } from '../hooks/useTranslations';
import { Menu, X } from 'lucide-react';

const Header = ({ locale }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled more than 0 pixels
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add new useEffect for body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Add escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSelectOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

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
    setIsMobileMenuOpen(false);
  };

  // Determine current country from locale
  const currentCountry = Object.values(COUNTRIES).find(
    country => country.locale === locale
  ) || COUNTRIES.UK;

  return (
    <header 
      className={`${styles.header} ${isHovered || isScrolled ? styles.hovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href="/" 
        className={styles.logo}
      >
        KeepMeCompany
      </Link>
      
      {/* Desktop Navigation */}
      <nav className={`${styles.nav} ${styles.desktopNav}`}>
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

      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? (
          <X className={styles.menuIcon} />
        ) : (
          <Menu className={styles.menuIcon} />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.active : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileSelectorWrapper}>
            <button
              className={styles.mobileSelectorButton}
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span>{currentCountry.flag}</span>
              <span>Select Country</span>
            </button>
            
            {isSelectOpen && (
              <div className={styles.mobileDropdown}>
                {Object.entries(COUNTRIES).map(([code, country]) => (
                  <button
                    key={code}
                    className={styles.mobileCountryOption}
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
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('common.header.contactSales')}
          </Link>

          <div className={styles.mobilePlatformWrapper}>
            <a 
              href="https://app.keepmecompanyai.com"
              className={styles.mobilePlatformButton}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('common.header.openPlatform')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;