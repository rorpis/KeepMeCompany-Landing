'use client';

import React from 'react';
import { useTranslations } from '@/app/hooks/useTranslations';

const Problem = () => {
  const { t } = useTranslations();
  
  return (
    <div className="h-screen flex justify-center items-center bg-background">
      <div className="text-center text-4xl font-bold leading-relaxed">
        <div>
          {t('home.problem.phone')} 
          <span style={{ color: 'var(--color-text-gray)' }}> {t('home.problem.year')}</span>
        </div>
        <div>
          {t('home.problem.records')} 
          <span style={{ color: 'var(--color-text-gray)' }}> {t('home.problem.year')}</span>
        </div>
        <div>
          {t('home.problem.followUp')} 
          <span style={{ color: 'var(--color-text-gray)' }}> {t('home.problem.year')}</span>
        </div>
        <div className="" style={{ color: 'var(--color-company-blue)' }}>
          {t('home.problem.currentYear')}
        </div>
      </div>
    </div>
  );
};

export default Problem;