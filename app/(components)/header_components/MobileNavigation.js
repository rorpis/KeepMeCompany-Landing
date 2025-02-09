'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import ServicesDropdown from './ServicesDropdown';

export const MobileServicesMenu = ({ 
    t,
    getServices 
  }) => {
    return (
      <div className="py-2 space-y-6">
        {/* Public Care Section */}
        <div className="space-y-3">
          <h3 className="text-white/70 text-base font-medium px-3">
            {t('common.header.services.publicCare.title')}
          </h3>
          <div className="space-y-1">
            {getServices('header.services.publicCare.services').map((service, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-3 text-white text-[15px] active:bg-white/10 transition-colors duration-150"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
        
        {/* Private Care Section */}
        <div className="space-y-3">
          <h3 className="text-white/70 text-base font-medium px-3">
            {t('common.header.services.privateCare.title')}
          </h3>
          <div className="space-y-1">
            {getServices('header.services.privateCare.services').map((service, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-3 text-white text-[15px] active:bg-white/10 transition-colors duration-150"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export const MobileNavigation = ({
    isHovered,
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    locale,
    currentCountry,
    isSelectOpen,
    setIsSelectOpen,
    isMobileServicesOpen,
    setIsMobileServicesOpen,
    handleCountryChange,
    t,
    COUNTRIES,
    getServices
  }) => {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isHovered || isScrolled ? 'text-white' : 'text-gray-400'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isHovered || isScrolled ? 'text-white' : 'text-gray-400'}`} />
          )}
        </button>
  
        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 md:hidden
            ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
  
        {/* Mobile Menu Panel */}
        <div 
          className={`fixed right-0 top-0 bottom-0 w-[85vw] max-w-[400px] bg-[rgb(23,23,23)] transform transition-transform duration-300 ease-in-out z-40 md:hidden overflow-y-auto
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col min-h-full px-2 pt-20 pb-8">
            {/* Mobile Country Selector */}
            <div className="mb-6 px-2">
              <button
                className="flex items-center gap-3 w-full p-3 rounded-md transition-colors duration-200 text-white text-[15px] hover:bg-white/10"
                onClick={() => setIsSelectOpen(!isSelectOpen)}
              >
                <span className="text-xl">{currentCountry.flag}</span>
                <span>Select Country</span>
              </button>
              
              {isSelectOpen && (
                <div className="mt-2 rounded-md divide-y divide-white/10">
                  {Object.entries(COUNTRIES).map(([code, country]) => (
                    <button
                      key={code}
                      className="flex items-center gap-3 w-full p-3 transition-colors duration-200 text-white text-[15px] hover:bg-white/10"
                      onClick={() => handleCountryChange(code)}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
  
            {/* Main Navigation Items */}
            <div className="space-y-1 px-2">
              {/* Services Section */}
              <button
                className="flex items-center justify-between w-full p-3 rounded-md transition-colors duration-200 text-white text-[15px] hover:bg-white/10"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              >
                <span>{t('common.header.services.title')}</span>
                <ChevronDown 
                  className={`w-5 h-5 transform transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {isMobileServicesOpen && (
                <div className="bg-white/5 rounded-md mt-1">
                  <MobileServicesMenu t={t} getServices={getServices} />
                </div>
              )}
  
              <Link 
                href={`/${locale}/pricing`}
                className="block w-full p-3 rounded-md transition-colors duration-200 text-white text-[15px] hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.header.pricing')}
              </Link>
  
              <Link 
                href={`/${locale}/contact-sales`}
                className="block w-full p-3 rounded-md transition-colors duration-200 text-white text-[15px] hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.header.contactSales')}
              </Link>
            </div>
  
            {/* Call to Action Button */}
            <div className="mt-auto px-2">
              <a 
                href="https://app.keepmecompanyai.com"
                className="block w-full p-4 bg-white text-black font-medium text-center rounded-md transition-transform active:scale-[0.98] text-[15px]"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.header.openPlatform')}
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

export default MobileNavigation;