'use client';

import { useState, useEffect } from 'react';

export const usePopupDialog = ({ 
  initialStep, 
  stepTitles, 
  StageComponent,
  isVisible,
  closeDelay = 300 // Default closing animation duration
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  
  // Reset state when popup closes
  useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => {
        setCurrentStep(initialStep);
      }, closeDelay);
      
      return () => clearTimeout(timeout);
    }
  }, [isVisible, initialStep, closeDelay]);

  // Create stages configuration for PopupDialog
  const stages = [{
    title: stepTitles[currentStep],
    component: <StageComponent onStepChange={setCurrentStep} currentStep={currentStep} />
  }];

  return {
    currentStep,
    setCurrentStep,
    stages
  };
}; 