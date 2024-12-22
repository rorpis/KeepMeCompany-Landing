'use client';

import React, { useState } from 'react';
import AIIntakes from './services/AIIntakes';
import ConsultationsScribe from './services/ConsultationsScribe';
import MedicalFollowUps from './services/MedicalFollowUps';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';

const Services = () => {
  const [showAIIntakes, setShowAIIntakes] = useState(false);
  const [showConsultationsScribe, setShowConsultationsScribe] = useState(false);
  const [showMedicalFollowUps, setShowMedicalFollowUps] = useState(false);

  const services = [
    { 
      title: "AI Intakes", 
      Icon: PhoneIcon, 
      onClick: () => setShowAIIntakes(true),
      className: "icon-fade-1"
    },
    { 
      title: "Consultations Scribe", 
      Icon: ClipboardDocumentIcon, 
      onClick: () => setShowConsultationsScribe(true),
      className: "icon-fade-2"
    },
    { 
      title: "Medical follow ups", 
      Icon: UserIcon,
      onClick: () => setShowMedicalFollowUps(true),
      className: "icon-fade-3"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <h2 className="text-4xl font-bold mb-24 text-center">
        Refit your practice with <span className="text-[var(--color-company-blue)]">KeepMeCompany</span>
      </h2>
      
      <div className="grid gap-6 md:grid-cols-3 max-w-4xl w-full">
        {services.map((service, index) => (
          <button
            key={index}
            onClick={service.onClick}
            className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-1
                       border-2 border-white hover:border-company-blue text-black
                       dark:bg-[#1a1a1a] dark:text-white dark:border-[#333] dark:hover:border-company-blue btn-stroke"
          >
            <div className={`icon-container mb-3 mx-auto ${service.className}`}>
              <service.Icon className="w-8 h-8 text-company-blue" />
            </div>
            <div className="text-xl font-semibold">{service.title}</div>
          </button>
        ))}
      </div>

      <AIIntakes 
        isVisible={showAIIntakes} 
        onClose={() => setShowAIIntakes(false)} 
      />
      <ConsultationsScribe 
        isVisible={showConsultationsScribe} 
        onClose={() => setShowConsultationsScribe(false)} 
      />
      <MedicalFollowUps 
        isVisible={showMedicalFollowUps} 
        onClose={() => setShowMedicalFollowUps(false)} 
      />
    </div>
  );
};

export default Services;