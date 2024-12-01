"use client";

import React from 'react';

const Hero = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-background" style={{ marginTop: '-8vh' }}>
      <h1 className="text-center text-5xl font-bold leading-relaxed">
        <div>Classic cars need <span style={{ color: 'var(--color-company-blue)' }}>new Engines</span></div>
        <div>Modern Practices <span style={{ color: 'var(--color-company-blue)' }}>need AI</span></div>
      </h1>
    </div>
  );
};

export default Hero;