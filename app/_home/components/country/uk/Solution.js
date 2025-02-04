'use client';

import React from 'react';

const Solution = () => {
  return (
    <div className="min-h-[70vh] flex justify-center items-center bg-background px-4 py-8 md:px-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-2xl md:text-4xl font-normal mb-1">
          What if you could manage more patients
        </h1>
        <h2 className="text-3xl md:text-5xl font-normal italic mb-4 md:mb-6">
          without increasing headcount?
        </h2>
        <p className="text-lg md:text-2xl mb-6 md:mb-8">
          Make your team more productive and your patients happier.
        </p>
        <a 
          href="https://app.keepmecompanyai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg hover:bg-opacity-90 transition-all font-bold inline-block animate-pulse-slight"
        >
          Try it out
        </a>

        <style jsx>{`
          @keyframes pulseSlightly {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .animate-pulse-slight {
            animation: pulseSlightly 1.5s infinite ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Solution;