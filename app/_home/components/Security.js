'use client';

import React from 'react';
import { ShieldCheckIcon, GlobeEuropeAfricaIcon, LockClosedIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const Security = () => {
  const features = [
    {
      Icon: ShieldCheckIcon,
      title: "DTAC",
      description: "Digital Technology Assessment Criteria compliance for healthcare solutions",
      className: "icon-fade-1"
    },
    {
      Icon: GlobeEuropeAfricaIcon,
      title: "GDPR Compliant",
      description: "Full compliance with EU/UK data protection regulations",
      className: "icon-fade-2"
    },
    {
      Icon: LockClosedIcon,
      title: "Data Security and Protection Toolkit",
      description: "Comprehensive security measures for protecting sensitive information",
      className: "icon-fade-3"
    },
    {
      Icon: CheckBadgeIcon,
      title: "CE Marking",
      description: "Certified compliance with European health, safety, and environmental standards",
      className: "icon-fade-4"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">Compliance</span>
        <h2 className="text-4xl font-bold mt-2">Impenetrable.</h2>
        <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-400">
          Processing sensitive data is a serious responsibility. We've implemented top-tier privacy standards compliant with EU/UK regulations.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl w-full">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="p-6 rounded-lg bg-white shadow-lg dark:bg-[#1a1a1a] text-black dark:text-white"
          >
            <div className={`icon-container mb-4 mx-auto ${feature.className}`}>
              <feature.Icon className="w-8 h-8 text-company-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Security; 