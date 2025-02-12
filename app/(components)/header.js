'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dancing_Script } from 'next/font/google';
import { COUNTRIES } from '../config/countries';
import { useTranslations } from '../hooks/useTranslations';
import MainNav from './header_components/MainNav';
import MobileNavigation from './header_components/MobileNavigation';

const handwriting = Dancing_Script({ 
  subsets: ['latin'],
  weight: '400'
});

const Header = ({ locale }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslations();

  // Helper function to safely get services arrays
  const getServices = (path) => {
    const result = t(`common.${path}`);
    return Array.isArray(result) ? result : [];
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSelectOpen(false);
        setIsServicesOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleCountryChange = (countryCode) => {
    const country = COUNTRIES[countryCode];
    if (country) {
      router.push(`/${country.locale}`);
    }
    setIsSelectOpen(false);
    setIsMobileMenuOpen(false);
  };

  const currentCountry = Object.values(COUNTRIES).find(
    country => country.locale === locale
  ) || COUNTRIES.UK;

  const sharedProps = {
    isHovered,
    isScrolled,
    locale,
    currentCountry,
    isSelectOpen,
    setIsSelectOpen,
    handleCountryChange,
    t,
    COUNTRIES,
    getServices
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 flex justify-between items-center px-8 h-[8vh] transition-all duration-300 z-50
        ${isHovered || isScrolled ? 'bg-[rgba(23,23,23,0.85)]' : 'bg-transparent'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        href="/" 
        className={`text-[2.0rem] transition-colors duration-300 cursor-pointer logo-font ${handwriting.className}
          ${isHovered || isScrolled ? 'text-white' : 'text-gray-400'}`}
      >
        <span className="inline-block">KeepmeCompany</span>
      </Link>
      
      <MainNav 
        {...sharedProps}
        isServicesOpen={isServicesOpen}
        setIsServicesOpen={setIsServicesOpen}
      />
      
      <MobileNavigation 
        {...sharedProps}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isMobileServicesOpen={isMobileServicesOpen}
        setIsMobileServicesOpen={setIsMobileServicesOpen}
      />
    </header>
  );
};

export default Header;