'use client';

import React from 'react';

const Solution = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-background">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-4xl font-normal mb-2">
          What if you could manage more patients
        </h1>
        <h2 className="text-5xl font-normal italic mb-8">
          without increasing headcount?
        </h2>
        <p className="text-2xl mb-10 max width = ">
        Make your team more productive and your patients happier.
        </p>
        <a 
          href="https://app.keepmecompanyai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-8 py-3 rounded-full text-lg hover:bg-opacity-90 transition-all font-bold inline-block animate-pulse-slight"
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