'use client';

import React from 'react';
import { ShieldCheckIcon, GlobeEuropeAfricaIcon, LockClosedIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const Security = () => {
  const features = [
    {
      Icon: ShieldCheckIcon,
      title: "NHS Compliant",
      description: "Cumplimos con los estrictos marcos y estándares de cumplimiento del Reino Unido.",
      className: "icon-fade-1"
    },
    {
      Icon: GlobeEuropeAfricaIcon,
      title: "GDPR Compliant",
      description: "Cumplimiento total con las regulaciones de protección de datos de la UE/Reino Unido",
      className: "icon-fade-2"
    },
    {
      Icon: LockClosedIcon,
      title: "Data Security and Protection Toolkit",
      description: "Medidas de seguridad integrales para proteger información sensible",
      className: "icon-fade-3"
    },
    {
      Icon: CheckBadgeIcon,
      title: "Marcado CE",
      description: "Cumplimiento certificado con los estándares europeos de salud, seguridad y medio ambiente",
      className: "icon-fade-4"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <div className="text-center mb-12">
        <span className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">Seguridad</span>
        <h2 className="text-4xl font-bold mt-2">Confidencial e Impenetrable.</h2>
        <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-400">
          Procesar datos sensibles es una responsabilidad seria. Hemos implementado estándares de privacidad de primer nivel que cumplen con las regulaciones de la UE y Reino Unido.
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