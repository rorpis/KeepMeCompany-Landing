'use client';

import React from 'react';

const Problem = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-background">
      <div className="text-center text-4xl font-bold leading-relaxed">
        <div>Centres answer the phone like it&apos;s <span style={{ color: 'var(--color-text-gray)' }}>2010</span></div>
        <div>type on medical records like it&apos;s <span style={{ color: 'var(--color-text-gray)' }}>2010</span></div>
        <div>follow up on patients like it&apos;s <span style={{ color: 'var(--color-text-gray)' }}>2010</span></div>
        <div className="" style={{ color: 'var(--color-company-blue)' }}>
          But it&apos;s 2024.
        </div>
      </div>
    </div>
  );
};

export default Problem;