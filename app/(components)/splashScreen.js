'use client';

import React, { useState, useEffect } from 'react';

const SplashScreen = ({ children }) => {
  const [show, setShow] = useState(true);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useEffect(() => {
    // After letters animation (2s), start background fade
    const animationTimer = setTimeout(() => {
      setIsAnimationDone(true);
    }, 2000);

    // After fade completes, unmount splash screen
    const unmountTimer = setTimeout(() => {
      setShow(false);
    }, 2300); // 2000ms for letters + 300ms for fade

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <>
      {show && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
            isAnimationDone ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="relative h-96 w-96">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div 
                className="absolute text-white opacity-0"
                style={{
                  animation: 'slide-left 2s ease-out forwards',
                  fontFamily: 'Sugar, serif',
                  fontSize: '5rem',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                K
              </div>
              
              <div 
                className="absolute text-white opacity-0"
                style={{
                  animation: 'slide-right 2s ease-out forwards',
                  fontFamily: 'Sugar, serif',
                  fontSize: '5rem',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                C
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`transition-opacity duration-300 ${!isAnimationDone ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>

      <style jsx global>{`
        @keyframes slide-left {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          50% {
            opacity: 0;
            transform: translate(-200%, -50%);
          }
          100% {
            opacity: 0;
            transform: translate(-200%, -50%);
          }
        }

        @keyframes slide-right {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          50% {
            opacity: 0;
            transform: translate(100%, -50%);
          }
          100% {
            opacity: 0;
            transform: translate(100%, -50%);
          }
        }
      `}</style>
    </>
  );
};

export default SplashScreen;