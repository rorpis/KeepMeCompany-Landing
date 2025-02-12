'use client';

import React from 'react';
import Link from 'next/link';
import ServicesDropdown from './ServicesDropdown';

// Reusable NavLink component
const NavLink = ({ href, children, isHovered, isScrolled }) => (
  <Link 
    href={href} 
    className={`relative text-[0.9rem] py-2 transition-colors duration-300 group
      ${isHovered || isScrolled ? 'text-white' : 'text-gray-400'}`}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
  </Link>
);

// Services dropdown wrapper component
const ServicesDropdownWrapper = ({ isHovered, isScrolled, isServicesOpen, setIsServicesOpen, t, getServices }) => (
  <div className="relative">
    <div
      onMouseEnter={() => setIsServicesOpen(true)}
      onMouseLeave={() => setIsServicesOpen(false)}
    >
      <button
        className={`relative text-[0.9rem] py-2 transition-colors duration-300 group flex items-center ${
          isHovered || isScrolled ? 'text-white' : 'text-gray-400'
        }`}
      >
        {t('common.header.services.title')}
        <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
      </button>

      {isServicesOpen && <div className="absolute top-full left-0 w-full h-4" />}
    </div>

    {isServicesOpen && (
      <div 
        className="absolute top-[calc(100%+1rem)] left-0 z-50"
        onMouseEnter={() => setIsServicesOpen(true)}
        onMouseLeave={() => setIsServicesOpen(false)}
      >
        <ServicesDropdown t={t} getServices={getServices} />
      </div>
    )}
  </div>
);

// Elegant Country Selector
const ElegantCountrySelector = ({ 
  currentCountry, 
  COUNTRIES, 
  handleCountryChange, 
  t,
  isSelectOpen,
  setIsSelectOpen,
  isHovered,
  isScrolled
}) => {
  const selectCountry = (countryCode) => {
    handleCountryChange(countryCode);
    setIsSelectOpen(false);
  };

  return (
    <div className="relative">
      {/* Minimalist Trigger */}
      <button
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        className="bg-transparent border-none cursor-pointer p-2 flex items-center transition-transform duration-200 hover:scale-110"
        aria-label={t('common.header.languageSelector')}
      >
        <img 
          src="/images/globe.png" 
          alt="Language Selector" 
          className={`w-7 h-7 transition-all duration-300 ${
            isHovered || isScrolled ? 'invert' : 'invert opacity-60'
          }`} 
        />
      </button>
      
      {/* Elegant Dropdown */}
      {isSelectOpen && (
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
  );
};

export const MainNav = ({
  isHovered,
  isScrolled,
  locale,
  currentCountry,
  isSelectOpen,
  setIsSelectOpen,
  isServicesOpen,
  setIsServicesOpen,
  handleCountryChange,
  t,
  COUNTRIES,
  getServices
}) => {
  return (
    <nav className="hidden md:flex w-full items-center">
      {/* Center - Navigation Items with auto margins */}
      <div className="flex gap-8 items-center mx-auto">
        <ServicesDropdownWrapper 
          isHovered={isHovered}
          isScrolled={isScrolled}
          isServicesOpen={isServicesOpen}
          setIsServicesOpen={setIsServicesOpen}
          t={t}
          getServices={getServices}
        />

        <NavLink href={`/${locale}/pricing`} isHovered={isHovered} isScrolled={isScrolled}>
          {t('common.header.pricing')}
        </NavLink>

        <NavLink href={`/${locale}/contact-sales`} isHovered={isHovered} isScrolled={isScrolled}>
          {t('common.header.contactSales')}
        </NavLink>
      </div>

      {/* Right - Country Selector and CTA */}
      <div className="flex items-center gap-4">
        <ElegantCountrySelector 
          isSelectOpen={isSelectOpen}
          setIsSelectOpen={setIsSelectOpen}
          currentCountry={currentCountry}
          COUNTRIES={COUNTRIES}
          handleCountryChange={handleCountryChange}
          t={t}
          isHovered={isHovered}
          isScrolled={isScrolled}
        />

        <a 
          href="https://app.keepmecompanyai.com" 
          className="bg-white text-black px-6 py-2 rounded-full font-bold text-[0.9rem] transition-transform duration-100 hover:scale-104 inline-flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('common.header.openPlatform')}
        </a>
      </div>
    </nav>
  );
};

export default MainNav;