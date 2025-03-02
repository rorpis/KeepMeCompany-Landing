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
  // New state to track if content should be visible after uncollapse animation
  const [contentVisible, setContentVisible] = useState(!isScrolled);
  const router = useRouter();
  const { t } = useTranslations();

  // Helper function to safely get services arrays
  const getServices = (path) => {
    const result = t(`common.${path}`);
    return Array.isArray(result) ? result : [];
  };

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

  // New effect to handle delayed content visibility
  useEffect(() => {
    let timeoutId;
    
    if (isHovered || !isScrolled) {
      // Delay showing content until header animation completes
      timeoutId = setTimeout(() => {
        setContentVisible(true);
      }, 300); // Slightly shorter than header transition for smoother appearance
    } else {
      // Hide content immediately when collapsing
      setContentVisible(false);
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isHovered, isScrolled]);

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

  // Block dropdowns from opening while header is in transition
  const canOpenDropdowns = contentVisible && !isCollapsed;

  const sharedProps = {
    isHovered,
    isScrolled,
    locale,
    currentCountry,
    isSelectOpen,
    setIsSelectOpen: (value) => canOpenDropdowns && setIsSelectOpen(value),
    handleCountryChange,
    t,
    COUNTRIES,
    getServices,
    isCollapsed,
    contentVisible, // Pass the new state to child components
    canOpenDropdowns
  };

  return (
    <>
      {/* Fixed positioning container */}
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Centering container */}
        <div className="flex justify-center w-full">
          {/* Header isle with transitions */}
          <div 
            className={`transition-all duration-500 ease-in-out z-50 flex items-center
              ${isHovered ? 'bg-[#1e1e1e]' : isScrolled ? 'bg-[#1e1e1e]' : 'bg-transparent'}
              ${isCollapsed 
                ? 'w-[45%] mt-2 h-[7vh] rounded-full border border-white/30' 
                : 'w-full mt-0 h-[8vh] border-none'}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Content layout */}
            <div className="h-full w-full px-8 flex items-center">
              {/* Left: Logo */}
              <div className={`transition-all duration-300 ${
                isCollapsed ? 'w-16' : 'w-auto'
              }`}>
                <Link 
                  href="/" 
                  className={`transition-colors duration-300 text-white ${handwriting.className}`}
                  style={{ fontSize: '2rem' }}
                >
                  {isCollapsed ? 'KC' : 'KeepmeCompany'}
                </Link>
              </div>
              
              {/* Center: Navigation or Services (based on state) */}
              <div className="flex-1 flex justify-center">
                {/* Main navigation (visible when expanded with fade-in) */}
                <div className={`transition-opacity duration-300 ${
                  contentVisible && !isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  {!isCollapsed && (
                    <MainNav 
                      {...sharedProps}
                      isServicesOpen={isServicesOpen}
                      setIsServicesOpen={(value) => canOpenDropdowns && setIsServicesOpen(value)}
                    />
                  )}
                </div>
                
                {/* Services button (visible when collapsed) */}
                {isCollapsed && (
                  <div className="mx-auto">
                    <button
                      className="relative text-[0.9rem] py-2 transition-colors duration-300 group flex items-center text-white"
                      onClick={() => canOpenDropdowns && setIsServicesOpen(!isServicesOpen)}
                      onMouseEnter={() => canOpenDropdowns && setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      {t('common.header.services.title')}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                    </button>
                    
                    {/* Services dropdown - only works when fully uncollapsed */}
                    {isServicesOpen && canOpenDropdowns && (
                      <div 
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
                        onMouseEnter={() => canOpenDropdowns && setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <ServicesDropdown 
                          t={t}
                          getServices={getServices}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Right: Country selector, Platform button, and Mobile menu */}
              <div>
                {isCollapsed ? (
                  <a 
                    href="https://app.keepmecompanyai.com" 
                    className="relative text-[0.9rem] py-2 transition-colors duration-300 group flex items-center text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Platform
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                ) : (
                  <div className={`flex items-center gap-4 transition-opacity duration-300 ${
                    contentVisible ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {/* Country Selector - Only visible in expanded state */}
                    <div className="hidden md:block">
                      <div className="relative">
                        <button
                          onClick={() => canOpenDropdowns && setIsSelectOpen(!isSelectOpen)}
                          className="bg-transparent border-none cursor-pointer p-2 flex items-center transition-transform duration-200 hover:scale-110"
                          aria-label={t('common.header.languageSelector')}
                        >
                          <img 
                            src="/images/globe.png" 
                            alt="Language Selector" 
                            className="w-7 h-7 invert" 
                          />
                        </button>
                        
                        {isSelectOpen && canOpenDropdowns && (
                          <div className="absolute top-full right-0 bg-[rgba(23,23,23,0.95)] rounded-lg p-2 mt-2 min-w-[200px] shadow-lg backdrop-blur-md z-50">
                            <div className="text-xs text-gray-400 px-2 py-1 border-b border-gray-700 mb-2">
                              Select Country
                            </div>
                            {Object.entries(COUNTRIES).map(([code, country]) => (
                              <button
                                key={code}
                                className={`
                                  flex items-center justify-between w-full p-2 text-left 
                                  text-[0.9rem] transition-colors duration-200 rounded
                                  ${currentCountry.code === code 
                                    ? 'bg-gray-700 text-white' 
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                                `}
                                onClick={() => selectCountry(code)}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{country.flag}</span>
                                  <span>{country.name}</span>
                                </div>
                                {currentCountry.code === code && <span className="text-green-500">✓</span>}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <a 
                      href="https://app.keepmecompanyai.com" 
                      className="bg-white text-black px-6 py-2 rounded-full font-bold text-[0.9rem] transition-transform duration-300 hover:scale-105 inline-flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('common.header.openPlatform')}
                    </a>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden ml-2">
                      <MobileNavigation 
                        {...sharedProps}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                        isMobileServicesOpen={isMobileServicesOpen}
                        setIsMobileServicesOpen={setIsMobileServicesOpen}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;