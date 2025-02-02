"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from '@/app/hooks/useTranslations';

const Hero = () => {
  const { t } = useTranslations();

  const COUNTRY_CONFIG = {
    ES: ['+34', '000-000-000'],
    UK: ['+44', '000-0000-0000'],
    FR: ['+33', '000-000-000']
  };

  const WIDTHS = {
    collapsed: '180px',
    expanded: '400px'
  };

  // Phone utilities
  const phoneUtils = {
    format: (value, country) => {
      const numbers = value.replace(/\D/g, '');
      const format = COUNTRY_CONFIG[country][1];
      const maxLength = format.replace(/[^0]/g, '').length;
      const truncated = numbers.substring(0, maxLength);
      
      let formatted = truncated;
      if (truncated.length > 3) {
        formatted = truncated.length > 6 
          ? `${truncated.slice(0, 3)}-${truncated.slice(3, 6)}-${truncated.slice(6)}`
          : `${truncated.slice(0, 3)}-${truncated.slice(3)}`;
      }
      return formatted;
    },
    isValid: (value, country) => {
      const numbers = value.replace(/\D/g, '');
      const format = COUNTRY_CONFIG[country][1];
      return numbers.length === format.replace(/[^0]/g, '').length;
    },
    getPlaceholder: (country) => COUNTRY_CONFIG[country][1]
  };

  // State management
  const [state, setState] = useState({
    isExpanded: false,
    isHovered: false,
    isEditing: false,
    isCalling: false,
    phoneNumber: '',
    selectedCountry: 'ES',
    // Animation states
    isExpanding: false,
    isCollapsing: false,
    isContentVisible: false,
    isFullyExpanded: false
  });

  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const timeoutRefs = useRef({
    expand: null,
    collapse: null
  });

  // Event handlers
  const updateState = (newState) => setState(prev => ({ ...prev, ...newState }));

  const handleExpand = () => {
    if (state.isEditing || state.isCalling) return;
    
    // Clear any pending collapse timeouts
    if (timeoutRefs.current.collapse) {
      clearTimeout(timeoutRefs.current.collapse);
      timeoutRefs.current.collapse = null;
    }
    
    // If we're in the middle of collapsing, jump to expanded immediately
    if (state.isCollapsing) {
      updateState({
        isCollapsing: false,
        isExpanded: true,
        isContentVisible: true,
        isFullyExpanded: true,
        isHovered: true
      });
      return;
    }

    updateState({ 
      isHovered: true,
      isExpanding: true,
      isExpanded: true 
    });

    timeoutRefs.current.expand = setTimeout(() => {
      updateState({ isContentVisible: true });
      
      timeoutRefs.current.expand = setTimeout(() => {
        updateState({ 
          isFullyExpanded: true,
          isExpanding: false 
        });
      }, 200); // Fade duration
    }, 300); // Width duration
  };

  const handleCollapse = () => {
    if (state.isEditing || state.phoneNumber || state.isCalling) return;

    // Clear any pending expand timeouts
    if (timeoutRefs.current.expand) {
      clearTimeout(timeoutRefs.current.expand);
      timeoutRefs.current.expand = null;
    }

    // If we're in the middle of expanding, collapse immediately
    if (state.isExpanding) {
      updateState({
        isExpanding: false,
        isExpanded: false,
        isContentVisible: false,
        isFullyExpanded: false,
        isHovered: false
      });
      return;
    }

    updateState({
      isHovered: false,
      isFullyExpanded: false,
      isContentVisible: false,
      isCollapsing: true
    });

    timeoutRefs.current.collapse = setTimeout(() => {
      updateState({ isExpanded: false });
      
      timeoutRefs.current.collapse = setTimeout(() => {
        updateState({ isCollapsing: false });
      }, 300); // Width duration
    }, 200); // Fade duration
  };
  
  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        updateState({ isEditing: false });
        if (!state.phoneNumber && !state.isCalling) {
          handleCollapse();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.phoneNumber, state.isCalling]);

  // Focus management
  useEffect(() => {
    if (state.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.isEditing]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <div className="min-h-[92vh] flex justify-center items-center bg-background">
      <div className="text-center px-4 max-w-3xl">
        <div className="text-4xl font-bold leading-relaxed mb-6">
          <div className="text-white">
            Help your <span className="text-[var(--color-company-blue)]">senior patients</span> articulate their symptoms over the phone
          </div>
        </div>

        <p className="text-xl text-white mb-12 italic max-w-2xl mx-auto">
          Collect symptoms with one click, saving clinician time
        </p>

        <div className="relative inline-block">
          <button
            ref={buttonRef}
            style={{
              width: state.isExpanded ? WIDTHS.expanded : WIDTHS.collapsed,
              height: '50px',
              transition: 'width 300ms ease-in-out',
            }}
            className={`
              relative bg-white text-black rounded-full
              overflow-hidden
              ${!state.isHovered && !state.isEditing ? 'animate-pulse-slight' : ''}
            `}
            onMouseEnter={handleExpand}
            onMouseLeave={handleCollapse}
            aria-expanded={state.isFullyExpanded}
            aria-busy={state.isExpanding || state.isCollapsing}
            disabled={state.isExpanding || state.isCollapsing}
            aria-label={state.isCalling ? 'Currently calling' : 'Enter phone number'}
          >
            <div className="flex items-center px-6 w-full">
              <svg 
                viewBox="0 0 24 24"
                className="w-7 h-7 mr-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              
              <div className="flex items-center w-full text-lg">
                <div 
                  className={`
                    flex items-center w-full
                    transition-opacity duration-200
                    ${state.isContentVisible ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{ 
                    display: (state.isExpanding || state.isExpanded) ? 'flex' : 'none'
                  }}
                >
                  {state.isContentVisible && (
                    <>
                      <select
                        value={state.selectedCountry}
                        onChange={(e) => updateState({ selectedCountry: e.target.value, phoneNumber: '' })}
                        className="bg-transparent border-none outline-none cursor-pointer pr-2 mr-2 border-r border-black/30"
                      >
                        {Object.entries(COUNTRY_CONFIG).map(([code, [dialCode]]) => (
                          <option key={code} value={code} className="text-gray-800">
                            {dialCode}
                          </option>
                        ))}
                      </select>
                      
                      <div 
                        className="flex-1 transition-opacity duration-300 opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!state.isCalling) {
                            updateState({ isEditing: true, isExpanded: true });
                          }
                        }}
                      >
                        {state.isEditing ? (
                          <input
                            ref={inputRef}
                            type="tel"
                            value={state.phoneNumber}
                            onChange={(e) => updateState({ phoneNumber: phoneUtils.format(e.target.value, state.selectedCountry) })}
                            className="bg-transparent border-none outline-none w-full placeholder-black/40 m-0 p-0 [appearance:textfield]"
                            placeholder={phoneUtils.getPlaceholder(state.selectedCountry)}
                            onClick={e => e.stopPropagation()}
                          />
                        ) : (
                          <span className="cursor-text whitespace-nowrap">
                            {state.phoneNumber || (state.isExpanded && !state.isCalling ? phoneUtils.getPlaceholder(state.selectedCountry) : '')}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <span 
                  className={`
                    transition-all duration-300 whitespace-nowrap
                    ${(state.isExpanded || state.isCalling) ? 'ml-6' : ''} 
                    ${state.isEditing && !phoneUtils.isValid(state.phoneNumber, state.selectedCountry) ? 'opacity-50' : ''} 
                    ${phoneUtils.isValid(state.phoneNumber, state.selectedCountry) && !state.isCalling ? 'cursor-pointer' : ''}
                  `}
                  onClick={() => {
                    if (phoneUtils.isValid(state.phoneNumber, state.selectedCountry) && !state.isCalling) {
                      updateState({ isCalling: true, isEditing: false });
                      setTimeout(() => {
                        updateState({ isCalling: false, isHovered: false });
                      }, 3000);
                    }
                  }}
                >
                  {state.isCalling ? 'Calling...' : phoneUtils.isValid(state.phoneNumber, state.selectedCountry) ? 'Call now' : 'Try it now'}
                </span>
              </div>
            </div>
          </button>
        </div>

        <style jsx>{`
          @keyframes pulseSlightly {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .animate-pulse-slight {
            animation: pulseSlightly 1.5s infinite ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Hero;