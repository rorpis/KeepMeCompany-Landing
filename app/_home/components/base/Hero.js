"use client";

import React from 'react';
import { useTranslations } from '@/app/hooks/useTranslations';

const Hero = () => {
  const { t } = useTranslations();

  return (
    <div className="min-h-[92vh] flex justify-center items-center bg-background">
      <div className="text-center text-5xl font-bold leading-relaxed">
        <div className="text-white">
          <span>{t('home.hero.line1.part1')} </span>
          <span style={{ color: "var(--color-company-blue)" }}>{t('home.hero.line1.part2')}</span>
        </div>
        <div className="text-white">
          <span>{t('home.hero.line2.part1')} </span>
          <span style={{ color: "var(--color-company-blue)" }}>{t('home.hero.line2.part2')}</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
