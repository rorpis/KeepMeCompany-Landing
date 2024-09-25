import React, { useState, useEffect } from 'react';
import useVisibilityDetection from '../hooks/useVisibilityDetection'; // Ensure this path is correct based on your project structure

// AnimatedLock Component
const AnimatedLock = ({ isLocked }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 120" // Original viewBox
        width="80%" // Scales based on container
        height="80%" // Scales based on container
        preserveAspectRatio="xMidYMid meet"
        transform="scale(3)" // Scaling the SVG by 3 times
        style={{ transform: 'scale(3)', transformOrigin: 'center center' }} // Apply scale via CSS for better control
      >
  
        {/* Shackle (animated) */}
        <path
          d="M30 48 V35 A20 20 0 0 1 70 35 V61"
          stroke="#5f5f5f"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          transform={`translate(0,${isLocked ? 15 : 0})`}
          style={{ transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.3, 1.3)' }}
        />
  
        {/* Outer Lock Body */}
        <rect x="1" y="60" width="98" height="50" rx="18" ry="18" fill="#5f5f5f" />
  
        {/* Inner Lock Body */}
        <rect x="3.45" y="62.5" width="93.1" height="45" rx="16.2" ry="16.2" fill="#4f4f4f" />
      </svg>
    );
  };
  

// DataPrivacyComponent
const DataPrivacyComponent = () => {
  return (
    <div className="text-white p-10 rounded-lg mx-auto w-full max-w-[85%]">
      {/* Header Badge */}
      <div className="text-center mb-6">
        <span className="bg-white bg-opacity-10 text-sm font-semibold px-3 py-1 rounded-full">
          Data Privacy & Security
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-center">Unbreakable.</h1>

      {/* Description */}
      <p className="text-center mb-6 max-w-2xl mx-auto">
        Processing sensitive data is a serious responsibility. 
        We've implemented top-tier privacy standards compliant with EU/UK regulations.
      </p>

      {/* Call-to-Action Button */}
      <div className="text-center mb-8">
        <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md font-semibold">
          Visit Safety to learn more
        </button>
      </div>

      {/* Certifications Grid */}
<div className="max-w-[80%] mx-auto">
  <div className="grid grid-cols-3 gap-4 text-center">
    {[
      { icon: '🏅', text: 'ISO Certified' },
      { icon: '🇪🇺', text: 'GDPR Compliant' },
      { icon: '🏥', text: 'HIPAA Compliant' },
      { icon: '🇨🇦', text: 'PIPEDA Compliant' },
      { icon: '📱', text: 'APP Compliant' },
      { icon: '🔐', text: 'Cyber Essentials Certified' }
    ].map((item, index) => (
      <div key={index} className="bg-transparent border border-white p-2 rounded">
        <div className="text-2xl mb-2">{item.icon}</div>
        <span className="text-xs">{item.text}</span>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

// DataPrivacyWrapper Component
const DataPrivacyWrapper = () => {
  const [ref, isVisible] = useVisibilityDetection(0.1);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsLocked(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="relative">
      {/* Animated Lock in the Background */}
      <div className="absolute inset-0 z-0 flex justify-center items-start" style={{ transform: 'translateY(40%)' }}>
        {/* Adjusted the container to center the lock and move it downward by 30% */}
        <AnimatedLock isLocked={isLocked} />
      </div>

      {/* Data Privacy Content */}
      <div className="relative z-10">
        <DataPrivacyComponent />
      </div>
    </div>
  );
};

// Main DataPrivacy Component
const DataPrivacy = () => {
  return (
    <div>
      {/* You can include other components here if needed */}
      <DataPrivacyWrapper />
      {/* You can include other components here if needed */}
    </div>
  );
};

export default DataPrivacy;
