'use client';

import React from 'react';

export const ServicesDropdown = ({ 
    className = '',
    t,
    getServices 
  }) => {
    return (
      <div className={`bg-[rgb(23,23,23)] rounded-lg p-6 shadow-lg min-w-[480px] ${className}`}>
        <div className="space-y-8">
          {/* Public Care Section */}
          <div className="flex">
            <div className="w-32">
              <h3 className="text-white text-sm font-medium">
                {t('common.header.services.publicCare.title')}
              </h3>
            </div>
            <div className="w-px bg-gray-700 mx-6 self-stretch" />
            <div className="flex-1 space-y-2">
              {getServices('header.services.publicCare.services').map((service, index) => (
                <div
                  key={index}
                  className="text-gray-400 text-[0.8rem] hover:text-white cursor-pointer group"
                >
                  <span className="relative py-1 inline-block">
                    {service}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Private Care Section */}
          <div className="flex">
            <div className="w-32">
              <h3 className="text-white text-sm font-medium">
                {t('common.header.services.privateCare.title')}
              </h3>
            </div>
            <div className="w-px bg-gray-700 mx-6 self-stretch" />
            <div className="flex-1 space-y-2">
              {getServices('header.services.privateCare.services').map((service, index) => (
                <div
                  key={index}
                  className="text-gray-400 text-sm hover:text-white cursor-pointer group"
                >
                  <span className="relative py-1 inline-block">
                    {service}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default ServicesDropdown;

