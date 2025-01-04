'use client';

import React from 'react';
import { ArrowPathIcon, CurrencyDollarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const Deployment = () => {
  const features = [
    {
      Icon: ArrowPathIcon,
      title: "Integrates with your Telephony system",
      description: "Seamless connection with your existing infrastructure",
      className: "icon-fade-1"
    },
    {
      Icon: CurrencyDollarIcon,
      title: "Pay for what you use",
      description: "No commitments - you pay for the minutes you use",
      className: "icon-fade-2"
    },
    {
      Icon: AcademicCapIcon,
      title: "Real scenario Training modules",
      description: "Ensures your practice is ready for deployment",
      className: "icon-fade-3"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <h2 className="text-4xl font-bold mb-24 text-center">
        Ready to Deploy
      </h2>
      
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl w-full">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="btn-stroke p-6 rounded-lg bg-[#1a1a1a] shadow-lg"
          >
            <div className={`icon-container mb-6 mx-auto ${feature.className}`}>
              <feature.Icon className="w-8 h-8 " />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deployment; 