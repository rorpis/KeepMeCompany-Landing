import React from 'react';
import useVisibilityDetection from '../hooks/useVisibilityDetection';

const AnimatedLock = ({ isLocked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 120"
      width="80%"
      height="80%"
      preserveAspectRatio="xMidYMid meet"
      transform="scale(3)"
      style={{ transform: 'scale(3)', transformOrigin: 'center center' }}
    >
      <path
        d="M30 48 V35 A20 20 0 0 1 70 35 V61"
        stroke="#5f5f5f"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        transform={`translate(0,${isLocked ? 15 : 0})`}
        style={{ transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.3, 1.3)' }}
      />
      <rect x="1" y="60" width="98" height="50" rx="18" ry="18" fill="#5f5f5f" />
      <rect x="3.45" y="62.5" width="93.1" height="45" rx="16.2" ry="16.2" fill="#4f4f4f" />
    </svg>
  );
};

const DataPrivacyComponent = ({ showAccessibility }) => {
  const certifications = ['DTAC', 'GDPR Compliant', 'Data Security and Protection Toolkit'];

  return (
    <div className="text-white p-10 rounded-lg mx-auto w-full max-w-[85%]">
      <div className="text-center mb-6">
        <span className="bg-white bg-opacity-10 text-sm font-semibold px-3 py-1 rounded-full">
          Compliance
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-center">Impenetrable.</h1>

      <p className="text-center mb-6 max-w-2xl mx-auto">
        Processing sensitive data is a serious responsibility. 
        We&apos;ve implemented top-tier privacy standards compliant with EU/UK regulations.
      </p>

      <div className="text-center mb-8">
        <a
          href="https://www.notion.so/Privacy-Policy-10d288e561168082b48cce94ef79e3ca?showMoveTo=true&saveParent=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md font-semibold">
            Read our Privacy Policy
          </button>
        </a>
      </div>

      <div className="max-w-[80%] mx-auto">
        <div className="grid grid-cols-3 gap-4 text-center">
          {certifications.map((item, index) => (
            <div key={index} className="bg-transparent border border-white p-2 rounded">
              <span className="text-xs font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility Statement Button */}
      <div
        className={`text-center mt-[15vh] transition-all duration-1000 ease-in-out ${
          showAccessibility ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <a
          href="https://shine-galaxy-e28.notion.site/Accessibility-Statement-10c288e56116801da9a9f47ec6a3fabe"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-transparent text-white px-2 py-1 rounded-md font-semibold text-xs italic">
            Read our Accessibility Statement
          </button>
        </a>
      </div>
    </div>
  );
};

const DataPrivacyWrapper = () => {
  const [ref, isVisible] = useVisibilityDetection(0.1);
  const [isLocked, setIsLocked] = React.useState(false);
  const [showAccessibility, setShowAccessibility] = React.useState(false); // New state for Accessibility Button

  React.useEffect(() => {
    if (isVisible) {
      const lockTimer = setTimeout(() => setIsLocked(true), 500);
      const accessibilityTimer = setTimeout(() => setShowAccessibility(true), 7000); // 10 seconds timer
      return () => {
        clearTimeout(lockTimer);
        clearTimeout(accessibilityTimer);
      };
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute inset-0 z-0 flex justify-center items-start"
        style={{ transform: 'translateY(40%)' }}
      >
        <AnimatedLock isLocked={isLocked} />
      </div>
      <div className="relative z-10">
        <DataPrivacyComponent showAccessibility={showAccessibility} /> {/* Pass the state as a prop */}
      </div>
    </div>
  );
};

const DataPrivacy = () => {
  return (
    <div>
      <DataPrivacyWrapper />
    </div>
  );
};

export default DataPrivacy;
