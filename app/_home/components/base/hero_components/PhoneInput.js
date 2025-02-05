"use client";

import React, { useState, useEffect, useRef } from 'react';
import { scheduleFollowUpCall } from '@/app/_utils/api';

const PhoneInput = ({ isCountingDown, setIsCountingDown, countdown, setCountdown }) => {
  const COUNTRY_CONFIG = {
    // ES: ['+34', '000-000-000'],
    UK: ['+44', '0000-000000'],  // this should match the number of format 
    // FR: ['+33', '000-000-000']
  };

  const WIDTHS = {
    collapsed: {
      mobile: '160px',
      desktop: '180px'
    },
    expanded: {
      mobile: '280px',
      desktop: '400px'
    }
  };

  // Phone utilities
  const phoneUtils = {
    format: (value, country) => {
      // Remove all non-digits and any leading zeros
      let numbers = value.replace(/\D/g, '').replace(/^0+/, '');
      const format = COUNTRY_CONFIG[country][1];
      const maxLength = format.replace(/[^0]/g, '').length;
      
      // Truncate to max length
      const truncated = numbers.substring(0, maxLength);
      
      let formatted = truncated;
      if (truncated.length > 4) {
        formatted = `${truncated.slice(0, 4)}-${truncated.slice(4)}`;
      }
      return formatted;
    },
    isValid: (value, country) => {
      // Remove all non-digits and any leading zeros
      const numbers = value.replace(/\D/g, '').replace(/^0+/, '');
      
      // For UK mobile numbers, expect 10 digits (without leading 0)
      // Example: 7379873007
      return numbers.length === 10;
    },
    getPlaceholder: (country) => {
      // Show placeholder without leading 0
      return COUNTRY_CONFIG[country][1].substring(1);
    }
  };

  // State management
  const [state, setState] = useState({
    isExpanded: false,
    isHovered: false,
    isEditing: false,
    isCalling: false,
    phoneNumber: '',
    selectedCountry: 'UK',
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

  // Add mobile detection after phoneUtils
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Event handlers
  const updateState = (newState) => setState(prev => ({ ...prev, ...newState }));

  const handleExpand = () => {
    if (state.isEditing || state.isCalling) return;
    
    if (timeoutRefs.current.collapse) {
      clearTimeout(timeoutRefs.current.collapse);
      timeoutRefs.current.collapse = null;
    }
    
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
      }, 200);
    }, 300);
  };

  const handleCollapse = () => {
    if (state.isEditing || state.phoneNumber || state.isCalling) return;

    if (timeoutRefs.current.expand) {
      clearTimeout(timeoutRefs.current.expand);
      timeoutRefs.current.expand = null;
    }

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
      }, 300);
    }, 200);
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

  // Add handleButtonClick before handleCallClick
  const handleButtonClick = () => {
    if (isMobile && !state.isExpanded) {
      handleExpand();
    }
  };

  // Modify the onClick handler in the Call now button
  const handleCallClick = async () => {
    if (phoneUtils.isValid(state.phoneNumber, state.selectedCountry) && !state.isCalling) {
      updateState({ isCalling: true, isEditing: false });
      setIsCountingDown(true);
      setCountdown(6);

      try {
        // Format phone number with country code
        const fullPhoneNumber = `${COUNTRY_CONFIG[state.selectedCountry][0]}${state.phoneNumber.replace(/\D/g, '')}`;
        
        const result = await scheduleFollowUpCall({
          phoneNumber: fullPhoneNumber,
          country: 'UK'
        });

        if (!result.success) {
          console.error('Call scheduling failed:', result.message);
        }
      } catch (error) {
        console.error('Error scheduling call:', error);
      } finally {
        // Keep the UI feedback for 6 seconds regardless of API result
        setTimeout(() => {
          updateState({ isCalling: false, isHovered: false });
          setIsCountingDown(false);
        }, 6000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        style={{
          width: state.isExpanded 
            ? (isMobile ? WIDTHS.expanded.mobile : WIDTHS.expanded.desktop)
            : (isMobile ? WIDTHS.collapsed.mobile : WIDTHS.collapsed.desktop),
          height: '50px',
          transition: 'width 300ms ease-in-out',
        }}
        className={`
          relative bg-white text-black rounded-full
          overflow-hidden
          ${!state.isHovered && !state.isEditing && !isMobile ? 'animate-pulse-slight' : ''}
        `}
        onMouseEnter={isMobile ? undefined : handleExpand}
        onMouseLeave={isMobile ? undefined : handleCollapse}
        aria-expanded={state.isFullyExpanded}
        aria-busy={state.isExpanding || state.isCollapsing}
        disabled={state.isExpanding || state.isCollapsing}
        aria-label={state.isCalling ? 'Currently calling' : 'Enter phone number'}
      >
        <div className="flex items-center px-4 md:px-6 w-full">
          <svg 
            viewBox="0 0 24 24"
            className="w-6 h-6 md:w-7 md:h-7 mr-2 md:mr-4 flex-shrink-0"
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
                  {/* <select
                    value={state.selectedCountry}
                    onChange={(e) => updateState({ selectedCountry: e.target.value, phoneNumber: '' })}
                    className="bg-transparent border-none outline-none cursor-pointer pr-2 mr-2 border-r border-black/30"
                  >
                    {Object.entries(COUNTRY_CONFIG).map(([code, [dialCode]]) => (
                      <option key={code} value={code} className="text-gray-800">
                        {dialCode}
                      </option>
                    ))}
                  </select> */}
                  <div className="bg-transparent border-none outline-none pr-2 mr-2 border-r border-black/30">
                    +44
                  </div>
                  
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
                        className="bg-transparent border-none outline-none w-full placeholder-black/40 m-0 p-0 text-sm md:text-base [appearance:textfield]"
                        placeholder={phoneUtils.getPlaceholder(state.selectedCountry)}
                        onClick={e => e.stopPropagation()}
                        inputMode="numeric"
                      />
                    ) : (
                      <span className="cursor-text whitespace-nowrap text-sm md:text-base">
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
              onClick={handleCallClick}
            >
              {state.isCalling ? 'Calling...' : phoneUtils.isValid(state.phoneNumber, state.selectedCountry) ? 'Call now' : 'Try it now'}
            </span>
          </div>
        </div>
      </button>

      {/* Countdown display */}
      {isCountingDown && (
        <div className="mt-4 text-white text-sm md:text-base animate-fade-in">
          Calling in {countdown}
        </div>
      )}

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
  );
};

export default PhoneInput;
