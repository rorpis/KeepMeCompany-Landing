import React from 'react';

const SocialProof = () => {
  const logos = [
    { path: "/company-logos/logo1.png", heightClass: "h-12" }, 
    { path: "/company-logos/logo2.png", heightClass: "h-20" },
    { path: "/company-logos/logo3.png", heightClass: "h-16" },
    { path: "/company-logos/logo4.png", heightClass: "h-20" },
    { path: "/company-logos/logo5.png", heightClass: "h-20" },
    { path: "/company-logos/logo6.png", heightClass: "h-10" },
    { path: "/company-logos/logo7.png", heightClass: "h-20" },
    { path: "/company-logos/logo8.png", heightClass: "h-24" }
  ];

  return (
    <div className="w-full space-y-6 mt-16">
      <h2 className="text-white text-center font-mono text-1xl tracking-wider">
        Seamlessly integrated with your EHR
      </h2>
      
      <div className="w-full flex justify-center">
        <div className="py-12 px-8 bg-white flex flex-col justify-center items-center rounded-3xl w-full max-w-[85%]">
          <div className="overflow-hidden w-full relative">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
            
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <div className="flex items-center space-x-8 whitespace-nowrap animate-scroll">
              {logos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.path}
                  alt={`Company logo ${index + 1}`}
                  className={`${logo.heightClass} object-contain transition-all duration-300 filter grayscale hover:grayscale-0`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SocialProof;