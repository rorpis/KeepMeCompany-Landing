'use client';

import React, { useState, useEffect } from 'react';
import PopupDialog from '../shared/PopupDialog';
import { usePopupDialog } from '../shared/hooks/usePopupDialog';
import MovingCalendar from './medical_follow_ups/MovingCalendar';
import TranscriptsTable from './medical_follow_ups/TranscriptsTable';

const TIMING_CONFIG = {
  instruction: {
    fadeIn: 500,    // Time before content appears
    duration: 7000  // Total time instruction is shown
  },
  questions: {
    interval: 500, // Time between each question
    exitDelay: 2000 // Time after last question before moving to next stage
  },
  cadence: {
    interval: 700, // Time between each schedule item
    exitDelay: 3000 // Time after last item before moving to next stage
  },
  results: {
    fadeIn: 500,    // Time before content appears
    duration: 7000  // Total time results are shown
  },
  nextSteps: {
    fadeIn: 500,    // Time before content appears
    duration: 40000  // Total time next steps are shown
  }
};

const EDIT_SEQUENCE = {
  original: "Are you drinking enough fluids?",
  final: "How much liquid did you drink today?",
  timings: {
    deleteInterval: 20,
    typeInterval: 50,
    pauseBeforeTyping: 1000
  },
  // Generate steps dynamically
  getSteps() {
    const deleteSteps = Array.from(this.original)
      .map((_, i) => this.original.slice(0, this.original.length - i));
    
    const typeSteps = Array.from(this.final)
      .map((_, i) => this.final.slice(0, i + 1));
    
    return [...deleteSteps, "", ...typeSteps];
  }
};

const InstructionStage = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowContent(true), TIMING_CONFIG.instruction.fadeIn);
    const completeTimer = setTimeout(onComplete, TIMING_CONFIG.instruction.duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="content-fade flex flex-col items-center space-y-6">
      <div 
        className="transition-opacity duration-500"
        style={{ opacity: showContent ? 1 : 0 }}
      >
        <p className="text-center text-lg italic">
          John has <span className="text-[var(--color-company-blue)]">bacterial pneumonia</span>. 
          I'm prescribing <span className="text-[var(--color-company-blue)]">amoxicillin 500mg three times a day</span> for{' '}
          <span className="text-[var(--color-company-blue)]">7 days</span>, along with bed rest and increased fluid intake. 
          Follow up over the <span className="text-[var(--color-company-blue)]">next 7 days</span>.
        </p>
      </div>
    </div>
  );
};

const QuestionsStage = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editStep, setEditStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  
  const initialQuestions = [
    "How is your breathing? Any shortness of breath?",
    "Is your fever gone? What's your temperature?",
    "Did you take the antibiotics today?",
    EDIT_SEQUENCE.original
  ];
  
  const [displayedQuestions, setDisplayedQuestions] = useState(initialQuestions);

  // Handle question progression and trigger editing
  useEffect(() => {
    if (isEditing) return; // Pause progression while editing

    const interval = setInterval(() => {
      setCurrentQuestion(prev => {
        if (prev < displayedQuestions.length - 1) return prev + 1;
        // When reaching the last question, trigger editing
        if (!isEditing) {
          setEditingIndex(displayedQuestions.length - 1);
          setIsEditing(true);
        }
        clearInterval(interval);
        return prev;
      });
    }, TIMING_CONFIG.questions.interval);

    return () => clearInterval(interval);
  }, [displayedQuestions.length, isEditing]);

  // Handle the editing animation sequence
  useEffect(() => {
    if (!isEditing || editingIndex === null) return;
    
    const steps = EDIT_SEQUENCE.getSteps();
    if (editStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setEditStep(prev => prev + 1);
      }, editStep < EDIT_SEQUENCE.original.length ? 
         EDIT_SEQUENCE.timings.deleteInterval : 
         EDIT_SEQUENCE.timings.typeInterval);
      
      return () => clearTimeout(timer);
    } else {
      setDisplayedQuestions(prev => {
        const newQuestions = [...prev];
        newQuestions[editingIndex] = EDIT_SEQUENCE.final;
        return newQuestions;
      });
      
      setIsEditing(false);
      setEditingIndex(null);
      setTimeout(onComplete, TIMING_CONFIG.questions.exitDelay);
    }
  }, [isEditing, editStep, editingIndex, onComplete]);

  const getCurrentText = (index) => {
    if (index === editingIndex) {
      return EDIT_SEQUENCE.getSteps()[editStep] || "";
    }
    return displayedQuestions[index];
  };

  return (
    <div className="content-fade flex flex-col items-center space-y-6">
      <div className="text-sm text-gray-300 w-full max-w-2xl">
        <div className="space-y-4">
          {displayedQuestions.map((_, index) => (
            <div 
              key={index}
              className={`
                overflow-hidden 
                bg-white/5 
                rounded-lg 
                border 
                border-gray-100/20
                ${editingIndex === index ? 'ring-2 ring-blue-500' : ''}
              `}
              style={{
                opacity: index <= currentQuestion ? 1 : 0,
                transform: `translateY(${index <= currentQuestion ? '0' : '-10px'})`,
                transition: 'all 0.5s ease-in-out',
              }}
            >
              <h3 className="p-3 bg-white/5 border-b border-gray-100/20">
                {getCurrentText(index)}
                {editingIndex === index && (
                  <span className="animate-pulse">|</span>
                )}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CadenceStage = ({ onComplete }) => {
  useEffect(() => {
    // Wait for calendar animation to complete before moving to next stage
    const timer = setTimeout(onComplete, TIMING_CONFIG.cadence.interval + TIMING_CONFIG.cadence.exitDelay);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="content-fade flex flex-col items-center">
      <MovingCalendar />
    </div>
  );
};

const ResultsStage = ({ onComplete }) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowResults(true), TIMING_CONFIG.results.fadeIn);
    const completeTimer = setTimeout(onComplete, TIMING_CONFIG.results.duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="content-fade flex flex-col items-center space-y-6">
      <div 
        className="transition-opacity duration-500"
        style={{ opacity: showResults ? 1 : 0 }}
      >
        <TranscriptsTable />
      </div>
    </div>
  );
};

const NextStepsStage = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowContent(true), TIMING_CONFIG.nextSteps.fadeIn);
    const completeTimer = setTimeout(onComplete, TIMING_CONFIG.nextSteps.duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="content-fade flex flex-col items-center space-y-6">
      <div 
        className="transition-opacity duration-500 flex gap-4"
        style={{ opacity: showContent ? 1 : 0 }}
      >
        <button className="px-6 py-3 rounded-lg bg-white/5 border border-gray-100/20 hover:bg-white/10 transition-colors">
          Coordinate <br/>physical visit
        </button>
        <button className="px-6 py-3 rounded-lg bg-white/5 border border-gray-100/20 hover:bg-white/10 transition-colors">
          Patient doesn't require<br/>in-person follow-up
        </button>
      </div>
    </div>
  );
};

const FollowUpStages = ({ onStepChange }) => {
  const [currentStage, setCurrentStage] = useState('instruction');

  const handleStageComplete = (nextStage) => {
    setCurrentStage(nextStage);
    onStepChange(nextStage);
  };

  return (
    <div className="flex items-center justify-center w-full">
      {currentStage === 'instruction' && (
        <InstructionStage 
          onComplete={() => handleStageComplete('questions')} 
        />
      )}
      {currentStage === 'questions' && (
        <QuestionsStage 
          onComplete={() => handleStageComplete('cadence')} 
        />
      )}
      {currentStage === 'cadence' && (
        <CadenceStage 
          onComplete={() => handleStageComplete('results')} 
        />
      )}
      {currentStage === 'results' && (
        <ResultsStage 
          onComplete={() => handleStageComplete('nextSteps')} 
        />
      )}
      {currentStage === 'nextSteps' && (
        <NextStepsStage 
          onComplete={() => handleStageComplete('complete')} 
        />
      )}
    </div>
  );
};

const MedicalFollowUps = ({ isVisible, onClose }) => {
  const stepTitles = {
    instruction: "Step 1: Provide instructions",
    questions: "Step 2: Confirm questions",
    cadence: "Step 3: Confirm schedule",
    results: "Step 4: Review results",
    nextSteps: "Step 5: Decide next steps"
  };

  const { stages } = usePopupDialog({
    initialStep: 'instruction',
    stepTitles,
    StageComponent: FollowUpStages,
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

export default MedicalFollowUps;