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
  // Add a state to control content visibility
  const [contentVisible, setContentVisible] = useState(true);
  const router = useRouter();
  const { t } = useTranslations();

  // Helper function to safely get services arrays
  const getServices = (path) => {
    const result = t(`common.${path}`);
    return Array.isArray(result) ? result : [];
  };

  // Handle transition timing
  useEffect(() => {
    const shouldBeCollapsed = isScrolled && !isHovered;
    let timer;
    
    if (shouldBeCollapsed) {
      // First hide content, then collapse
      setContentVisible(false);
    } else {
      // First expand, then show content
      if (isScrolled) {
        // Only manage content visibility when scrolled
        timer = setTimeout(() => {
          setContentVisible(true);
        }, 250); // Delayed to match expansion timing
      } else {
        setContentVisible(true);
      }
    }
    
    return () => clearTimeout(timer);
  }, [isScrolled, isHovered]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  // Combined state for the header - collapsed when scrolled and not hovered
  const isCollapsed = isScrolled && !isHovered;

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
    getServices,
    isCollapsed  // Simply pass the isCollapsed state to child components
  };

  return (
    <header 
      className={`fixed transition-all duration-700 ease-in-out z-50 flex items-center
        ${isHovered || isScrolled ? 'bg-[#1e1e1e]' : 'bg-transparent'}
        ${isCollapsed 
          ? 'w-[40%] left-1/2 -translate-x-1/2 top-2 rounded-full h-[6vh] border border-white/30' 
          : 'w-full left-0 top-0 h-[8vh]'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapsed state - absolutely positioned elements with consistent styling */}
      <div className={`absolute inset-0 flex justify-between items-center transition-opacity duration-300 ease-in-out
                      ${isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex justify-between items-center w-full px-8">
          <Link 
            href="/" 
            className={`text-white ${handwriting.className}`}
            style={{ fontSize: '2rem' }}
          >
            KC
          </Link>
          
          <button
            className="relative text-[0.9rem] py-2 transition-colors duration-300 group flex items-center text-white"
          >
            {t('common.header.services.title')}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
          </button>
          
          {/* Using text styling to match Services for visual balance */}
          <a 
            href="https://app.keepmecompanyai.com" 
            className="relative text-[0.9rem] py-2 transition-colors duration-300 group flex items-center text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Platform
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
      
      {/* Original uncollapsed state */}
      <div className={`w-full flex justify-between items-center px-8 transition-opacity duration-500 ease-in-out
                       ${contentVisible && !isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Link 
          href="/" 
          className={`transition-colors duration-300 cursor-pointer
            ${isHovered || isScrolled ? 'text-white' : 'text-gray-400'}
            ${handwriting.className}`}
          style={{ fontSize: '2rem' }}
        >
          KeepmeCompany
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
      </div>
    </header>
  );
};

export default Header;