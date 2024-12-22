'use client';

import React, { useState, useEffect } from 'react';
import PopupDialog from '../shared/PopupDialog';
import { usePopupDialog } from '../shared/hooks/usePopupDialog';

// Custom hook for delayed state changes
const useDelayedState = (initialState, delay, callback) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(!initialState);
      if (callback) callback();
    }, delay);

    return () => clearTimeout(timer);
  }, [initialState, delay, callback]);

  return [state, setState];
};

const PlayButton = ({ onPlay }) => {
  const [showText] = useDelayedState(false, 1500);

  return (
    <div className="flex flex-col items-center">
      <div className={`text-2xl mb-6 italic transition-colors duration-500 ${showText ? 'text-white' : 'text-gray-800'}`}>
        Press play
      </div>
      <button 
        onClick={onPlay}
        className="w-28 h-28 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors content-fade"
      >
        <svg className="w-18 h-18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
};

const ConsultationNote = ({ onComplete }) => {
  const [step, setStep] = useState('title');
  const [contentStep, setContentStep] = useState(0);
  const [showContent, setShowContent] = useState([false, false, false, false]);
  
  const sections = [
    {
      title: "Subjective",
      content: [
        "45-year-old male presented with sudden onset chest pain and shortness of breath while exercising at the gym 2 hours ago",
        "PMHx: Hypertension - managed with lisinopril 10mg daily",
        "Reports pain is worse with deep breathing"
      ]
    },
    {
      title: "Objective",
      content: [
        "Vitals: BP 145/90, HR 98, RR 22, O2 sat 95% RA",
        "Appears mildly distressed",
        "Lungs clear to auscultation bilaterally",
        "Regular heart rhythm, no murmurs",
        "Mild tenderness to palpation over right chest wall",
        "No leg swelling or calf tenderness"
      ]
    },
    {
      title: "Assessment/Investigations",
      content: []
    },
    {
      title: "Plan",
      content: []
    }
  ];

  useEffect(() => {
    if (step === 'title') {
      const timer = setTimeout(() => {
        setStep('content');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'content') {
      const timer = setInterval(() => {
        if (contentStep < sections.length) {
          setContentStep(prev => prev + 1);
        } else if (!showContent.every(Boolean)) {
          setShowContent(prev => {
            const next = [...prev];
            const falseIndex = next.findIndex(x => !x);
            if (falseIndex !== -1) {
              next[falseIndex] = true;
            }
            return next;
          });
        } else {
          clearInterval(timer);
          // Calculate when to trigger completion
          const maxItems = Math.max(...sections.map(section => section.content.length));
          const completionDelay = maxItems * 200 + 1500; // Animation time + reading buffer
          setTimeout(onComplete, completionDelay);
        }
      }, 300);

      return () => clearInterval(timer);
    }
  }, [step, contentStep, showContent, onComplete]);

  return (
    <div className="content-fade w-full">
      {step === 'title' ? (
        <div className="text-2xl text-center italic h-[400px] flex items-center justify-center">
          Talk<span className="dots"></span>
        </div>
      ) : (
        <div className="text-sm text-gray-300 h-[400px] overflow-y-auto rounded-xl p-6">
          <div className="space-y-4 mt-4">
            {sections.map((section, index) => {
              const isVisible = index < contentStep;
              
              return (
                <div 
                  key={section.title} 
                  className="overflow-hidden bg-white/5 rounded-lg border border-gray-100/20"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateY(${isVisible ? '0' : '-10px'})`,
                    transition: 'all 0.5s ease-in-out',
                  }}
                >
                  <h3 className="font-bold p-3 bg-white/5 border-b border-gray-100/20">
                    {section.title}
                  </h3>
                  {section.content.length > 0 && (
                    <div 
                      style={{
                        maxHeight: showContent[index] ? '500px' : '0',
                        opacity: showContent[index] ? 1 : 0,
                        transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
                      }}
                    >
                      <ul className="p-3 space-y-2">
                        {section.content.map((item, i) => (
                          <li 
                            key={i}
                            className="flex"
                            style={{
                              animation: `fadeIn 0.5s ease-in ${i * 0.2}s`,
                              opacity: 0,
                              animationFillMode: 'forwards'
                            }}
                          >
                            <span className="mr-2">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

const CopyPasteButton = () => {
  const [isCopied] = useDelayedState(false, 2000);

  return (
    <div className="flex flex-col items-center content-fade">
      <div className="text-2xl mb-6 italic">
        {isCopied ? 'Copied!' : 'Copy and Paste'}
      </div>
      <div className={`w-24 h-24 ${isCopied ? 'bg-green-700' : 'bg-gray-700'} rounded-lg flex items-center justify-center transition-colors duration-300`}>
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isCopied ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          )}
        </svg>
      </div>
    </div>
  );
};

const ConsultationNoteStage = ({ onStepChange }) => {
  const [step, setStep] = useState('play');

  const handlePlay = () => {
    setStep('talk');
    onStepChange('talk');
  };

  const handleComplete = () => {
    setStep('copy');
    onStepChange('copy');
  };

  return (
    <div className="flex items-center justify-center w-full">
      {step === 'play' && <PlayButton onPlay={handlePlay} />}
      {step === 'talk' && <ConsultationNote onComplete={handleComplete} />}
      {step === 'copy' && <CopyPasteButton />}
    </div>
  );
};

const ConsultationsScribe = ({ isVisible, onClose }) => {
  const stepTitles = {
    play: "Three steps: start recording",
    talk: "Review and edit your notes",
    copy: "And paste on the EHRs"
  };

  const { stages } = usePopupDialog({
    initialStep: 'play',
    stepTitles,
    StageComponent: ConsultationNoteStage,
    isVisible
  });

  return (
    <PopupDialog 
      isVisible={isVisible} 
      onClose={onClose}
      stages={stages}
      enableKeyboardNav={true}
      hideNavigation={true}
    />
  );
};

export default ConsultationsScribe;