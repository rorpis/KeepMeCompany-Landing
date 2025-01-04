'use client';

import React from 'react';

const Solution = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-background">
      <div className="text-center text-5xl font-bold leading-relaxed">
        <div> 
          Usamos IA para llamar a sus pacientes de forma 
          <span style={{ color: 'var(--color-company-blue)' }}> segura y </span>
        </div>
        <div> 
          <span style={{ color: 'var(--color-company-blue)' }}> confidencial, </span>
          siguiendo sus instrucciones al pie de la letra 
        </div>
      </div>
    </div>
  );
};

export default Solution;