'use client';

import React, { useEffect } from 'react';
import PopupDialog from '../shared/PopupDialog';
import { usePopupDialog } from '../shared/hooks/usePopupDialog';

// Add at the top, after imports
const TIMING_CONFIG = {
  diversion: {
    fadeIn: 500,      // Time before content appears
    duration: 4000,   // Total time stage is shown
    animations: {
      numbers: 500,   // Fade in time for numbers
      arrow: 1000,     // Fade in time for arrow
      receptionist: 1500,  // Fade in time for receptionist numbers
      ai: 2000         // Fade in time for AI numbers
    }
  },
  steps: {
    fadeIn: 500,
    duration: 4000,
    animations: {
      icon1: 500,     // Choose AI icon
      icon2: 1000,     // Verify icon
      icon3: 1500,     // Questions icon
      icon4: 2000     // Summary icon
    }
  },
  benefits: {
    fadeIn: 500,
    duration: 4000,
    animations: {
      bars: 800,      // Bar chart animation duration
      legend: 800     // Legend fade in time
    }
  }
};

// Stage Components
const CallDiversionStage = ({ onComplete }) => (
  <div className="flex items-center justify-center space-x-16 text-white">
    <div className="text-center opacity-0" 
         style={{animation: `fadeIn ${TIMING_CONFIG.diversion.animations.numbers}ms forwards`}}>
      <div className="text-4xl font-bold">120</div>
      <div className="text-lg">calls</div>
    </div>
    
    <svg 
      width="100" 
      height="40" 
      className="text-white opacity-0"
      style={{animation: `fadeIn ${TIMING_CONFIG.diversion.animations.arrow}ms forwards ${TIMING_CONFIG.diversion.animations.numbers}ms`}}
    >
      <path 
        d="M0 20 L80 20 L70 10 L80 20 L70 30" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
      />
    </svg>
    
    <div className="text-center space-y-6">
      <div className="opacity-0" 
           style={{animation: `fadeIn ${TIMING_CONFIG.diversion.animations.receptionist}ms forwards ${TIMING_CONFIG.diversion.animations.arrow}ms`}}>
        <div className="text-4xl font-bold">30</div>
        <div className="text-lg">receptionists</div>
      </div>
      <div className="opacity-0"
           style={{animation: `fadeIn ${TIMING_CONFIG.diversion.animations.ai}ms forwards ${TIMING_CONFIG.diversion.animations.receptionist}ms`}}>
        <div className="text-4xl font-bold">90</div>
        <div className="text-lg">AI</div>
      </div>
    </div>
  </div>
);

const StepsStage = ({ onComplete }) => (
  <div className="flex flex-col items-center space-y-8 py-8">
    <div className="flex items-center space-x-16">
      {[
        { 
          icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", 
          label: "Choose AI", 
          delay: TIMING_CONFIG.steps.animations.icon1 
        },
        { 
          icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", 
          label: "Verify", 
          delay: TIMING_CONFIG.steps.animations.icon2 
        },
        { 
          icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", 
          label: "Questions", 
          delay: TIMING_CONFIG.steps.animations.icon3 
        },
        { 
          icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", 
          label: "Summary", 
          delay: TIMING_CONFIG.steps.animations.icon4 
        }
      ].map(({ icon, label, delay }, index) => (
        <div key={index} className="flex flex-col items-center space-y-4">
          <div className="icon-container opacity-0"
               style={{animation: `fadeIn 300ms forwards ${delay}ms`}}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
          </div>
          <span className="text-base">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

const BenefitsStage = ({ onComplete }) => (
  <div className="flex flex-col items-center w-full space-y-12">
    {/* Chart Container */}
    <div className="flex flex-col items-center w-full">
      {/* Legend */}
      <div className="flex items-center justify-center space-x-8 mb-8 text-sm opacity-0"
           style={{animation: `fadeIn ${TIMING_CONFIG.benefits.animations.legend}ms forwards`}}>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[rgb(207,120,120)] mr-2"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[rgb(100,130,200)] mr-2"></div>
          <span>With AI</span>
        </div>
      </div>

      <div className="relative w-full">
        {/* Bars Container */}
        <div className="flex items-end justify-center w-full h-52 mb-5">
          {/* Patient Wait Times Bars */}
          <div className="flex items-end space-x-4 mx-12">
            <div className="flex flex-col items-center">
              <span className="mb-2 text-lg font-bold">30</span>
              <div className="bar bar-today" style={{"--bar-height": "160px"}}></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-2 text-lg font-bold">1</span>
              <div className="bar bar-ai" style={{"--bar-height": "16px"}}></div>
            </div>
          </div>

          {/* Information Bars */}
          <div className="flex items-end space-x-4 mx-12">
            <div className="flex flex-col items-center">
              <span className="mb-2 text-lg font-bold">3</span>
              <div className="bar bar-today" style={{"--bar-height": "48px"}}></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-2 text-lg font-bold">10</span>
              <div className="bar bar-ai" style={{"--bar-height": "128px"}}></div>
            </div>
          </div>
        </div>

        {/* White baseline */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-white"></div>
      </div>

      {/* Labels */}
      <div className="flex justify-center w-full text-center">
        <div className="w-48 mx-12">
          <div className="font-bold text-base">Patient wait times</div>
          <div className="text-xs italic text-gray-400">(mins)</div>
        </div>
        <div className="w-48 mx-12">
          <div className="font-bold text-base">Information GPs see</div>
          <div className="text-xs italic text-gray-400">(questions patients were asked)</div>
        </div>
      </div>
    </div>
  </div>
);

// Move styles definition here
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Create a new component to handle style injection
const StyleInjector = () => {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return null;
};

// Main stage component that handles transitions
const AIIntakeStages = ({ onStepChange, currentStep }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      switch (currentStep) {
        case 'diversion':
          onStepChange('steps');
          break;
        case 'steps':
          onStepChange('benefits');
          break;
      }
    }, TIMING_CONFIG[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onStepChange]);

  return (
    <div className="flex items-center justify-center w-full">
      {currentStep === 'diversion' && <CallDiversionStage />}
      {currentStep === 'steps' && <StepsStage />}
      {currentStep === 'benefits' && <BenefitsStage />}
    </div>
  );
};

// Main Component
const AIIntakes = ({ isVisible, onClose }) => {
  const stepTitles = {
    diversion: "Divert calls during 8am rush",
    steps: "Follows the steps a receptionist does",
    benefits: "GPs have more information in advance"
  };

  const { stages } = usePopupDialog({
    initialStep: 'diversion',
    stepTitles,
    StageComponent: AIIntakeStages,
    isVisible
  });

  return (
    <>
      <StyleInjector />
      <PopupDialog 
        isVisible={isVisible} 
        onClose={onClose}
        stages={stages}
        enableKeyboardNav={true}
        hideNavigation={true}
      />
    </>
  );
};

export default AIIntakes; 