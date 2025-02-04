"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from '@/app/hooks/useTranslations';
import PhoneInput from './hero_components/PhoneInput';
import Certifications from './hero_components/Certifications';

const Hero = () => {
  const { t } = useTranslations();
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(6);
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPhoneInput(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isCountingDown, countdown]);

  return (
    <div className="min-h-[92vh] flex flex-col justify-center items-center bg-background relative px-4 py-8 md:py-12">
      <div className="text-center w-full max-w-4xl">
        <div className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
          <div className="text-white">
            Help your{' '}
            <span className="text-[var(--color-company-blue)]">
              senior patients
            </span>{' '}
            articulate their symptoms over the phone
          </div>
        </div>

        <p className="text-lg md:text-xl text-white mb-8 md:mb-12 italic max-w-2xl mx-auto">
          Collect symptoms with one click, saving clinician time
        </p>

        {/* <div
          className={`relative inline-block transition-opacity duration-1000 ${
            showPhoneInput ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <PhoneInput
            isCountingDown={isCountingDown}
            setIsCountingDown={setIsCountingDown}
            countdown={countdown}
            setCountdown={setCountdown}
          />
        </div> */}
      </div>
      
      {/* Certifications positioned differently on mobile */}
      <div className="mt-8 md:mt-0 md:absolute md:bottom-10 md:right-12 w-full md:w-auto flex justify-center md:justify-end">
        <Certifications />
      </div>
    </div>
  );
};

export default Hero;