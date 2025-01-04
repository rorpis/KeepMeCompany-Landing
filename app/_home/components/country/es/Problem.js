'use client';

import React from 'react';
import { useTranslations } from '@/app/hooks/useTranslations';

const Problem = () => {
  const { t } = useTranslations();
  
  return (
    <div className="h-screen flex justify-center items-center bg-background">
      <div className="text-center text-4xl font-bold leading-relaxed">
        <div>
          Cada consulta perdida es un riesgo para sus pacientes 
        </div>
        <div>
          <span style={{ color: 'var(--color-company-blue)' }}> y un costo para usted</span>
        </div>
      </div>
    </div>
  );
};

export default Problem;