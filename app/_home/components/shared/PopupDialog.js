'use client';

import React, { useState, useEffect, useCallback } from 'react';

// Navigation Component
const StageNavigation = ({ currentStage, totalStages, onNext, onClose }) => (
  <div className="mt-8 flex justify-center">
    {currentStage < totalStages - 1 ? (
      <button
        onClick={onNext}
        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
      >
        Next
      </button>
    ) : (
      <button
        onClick={onClose}
        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
      >
        Finish
      </button>
    )}
  </div>
);

const PopupDialog = ({ 
  isVisible, 
  onClose, 
  stages,
  enableKeyboardNav = false,
  hideNavigation = false,
  className = ''
}) => {
  const [currentStage, setCurrentStage] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
  }, [stages.length]);

  useEffect(() => {
    if (!enableKeyboardNav) return;

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [enableKeyboardNav, handleNext, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
      
      <div className={`relative bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4 min-h-[400px] max-h-[80vh] overflow-y-auto text-white ${className}`}>
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title Section */}
        <h2 className="text-3xl font-bold text-center mb-8">
          <div key={`title-${currentStage}`} className="content-fade">
            {stages[currentStage].title}
          </div>
        </h2>

        {/* Content Section with fixed height wrapper */}
        <div className="h-[300px] mb-8">
          <div className="h-full flex items-center justify-center px-12">
            <div key={`content-${currentStage}`} className="text-lg text-gray-300 w-full content-fade">
              {stages[currentStage].component}
            </div>
          </div>
        </div>

        {/* Navigation - only show if hideNavigation is false */}
        {!hideNavigation && (
          <StageNavigation 
            currentStage={currentStage}
            totalStages={stages.length}
            onNext={handleNext}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default PopupDialog; 