'use client';

import React, { useEffect, useRef, useState } from 'react';
import BotConnection from "./components/BotConnection";
import { Bot } from 'lucide-react';
import PatientCards from "./components/PatientCards";
import DocConnection from './components/DocConnection';


export default function PrivateCarePage() {
  // Refs for scroll animations
  const section2Ref = useRef(null);
  const aliciaSectionRef = useRef(null);
  const featureSectionRef = useRef(null);
  const howItWorksSectionRef = useRef(null);
  
  // Visibility states
  const [isSection2Visible, setIsSection2Visible] = useState(false);
  const [isAliciaVisible, setIsAliciaVisible] = useState(false);
  const [isFeatureVisible, setIsFeatureVisible] = useState(false);
  const [isHowItWorksVisible, setIsHowItWorksVisible] = useState(false);

  // Set up intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.target === section2Ref.current) {
          if (entry.isIntersecting) setIsSection2Visible(true);
        } else if (entry.target === aliciaSectionRef.current) {
          if (entry.isIntersecting) setIsAliciaVisible(true);
        } else if (entry.target === featureSectionRef.current) {
          if (entry.isIntersecting) setIsFeatureVisible(true);
        } else if (entry.target === howItWorksSectionRef.current) {
          if (entry.isIntersecting) setIsHowItWorksVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (section2Ref.current) observer.observe(section2Ref.current);
    if (aliciaSectionRef.current) observer.observe(aliciaSectionRef.current);
    if (featureSectionRef.current) observer.observe(featureSectionRef.current);
    if (howItWorksSectionRef.current) observer.observe(howItWorksSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* SECTION 1: Hero */}
      <section className="py-24 px-4 flex flex-col items-center justify-center min-h-[90vh]">
        <p className="text-blue-500 text-lg md:text-xl mb-3 text-center">Patient Relationship Manager</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
          Get your patients<br />to come back
        </h1>
      </section>

{/* SECTION 2: First Value Proposition */}
<section ref={section2Ref} className="py-16 px-4">
  <div 
    className={`max-w-6xl mx-auto transition-all duration-1000 transform ${
      isSection2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left side - Message */}
      <div className="md:w-1/2 space-y-4 text-right">
        <h3 className="text-2xl md:text-3xl font-semibold text-white">
        Patient relationships are<br /> like any other relationship 
        </h3>
        <p className="text-lg text-gray-300">
        They are built through thoughtful,<br /> consistent interactions
        </p>
      </div>
      
      {/* Right side - Visualization */}
      <div className="md:w-1/2 flex justify-center">
        <DocConnection />
      </div>
    </div>
  </div>
</section>
      {/* SECTION 3: Meet Alicia */}
      <section ref={aliciaSectionRef} className="relative">
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-white" />
        <div className="bg-white text-black py-24 px-4">
          <div
            className={`transition-all duration-1000 transform ${
              isAliciaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Outer container that centers our content */}
            <div className="w-full flex justify-center">
              {/* Inline container that shrinks to fit its content */}
              <div className="inline-block">
                {/* Header block: left aligned so the icon is flush with the left edge */}
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bot
                      className="w-5 h-5"
                      color="var(--color-company-blue)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">Meet Alicia</h2>
                </div>

                {/* Title/Subtitles block: text centered within the inline container */}
                <div className="mt-4 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Your Patient Relationship Manager
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-white to-black" />
      </section>

      {/* SECTION 4: Feature Highlight */}
      <section ref={featureSectionRef} className="py-24 px-4">
        <div 
          className={`transition-all duration-1000 transform ${
            isFeatureVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Call your patients automatically
          </h2>
          <p className="text-center text-gray-400 italic text-sm mb-8">
            (Even months after you saw them last)
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto items-center justify-center">
            {/* Left side - Bot Connection: reduced width */}
            <div className="w-full lg:w-1/2 relative" style={{ zIndex: 1 }}>
              <div className="w-full mx-auto">
                <BotConnection />
              </div>
            </div>
            
            {/* Right side - Patient cards: increased width and explicit z-index */}
            <div className="w-full lg:w-1/3 h-[400px] flex items-center justify-center relative" style={{ zIndex: 2 }}>
              <PatientCards />
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 5: How It Works */}
      <section ref={howItWorksSectionRef} className="py-24 px-4 bg-gradient-to-b from-black to-gray-900">
        <div 
          className={`transition-all duration-1000 transform ${
            isHowItWorksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-blue-500 text-lg md:text-xl mb-3 text-center">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Three steps to better patient retention
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard 
              number="1" 
              title="Connect your EHR system" 
              description="Seamlessly integrates with your existing electronic health records." 
            />
            <StepCard 
              number="2" 
              title="Configure your follow-up protocols" 
              description="Set custom follow-up schedules based on patient type and treatment." 
            />
            <StepCard 
              number="3" 
              title="Set your monthly engagement budget" 
              description="Control costs with flexible budget options that scale with your practice." 
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Step Card Component
function StepCard({ number, title, description }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-center">
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}