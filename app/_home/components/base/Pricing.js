import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const PricingCard = ({ title, price, description, features, buttonText, highlighted }) => (
  <div className="relative">
    {/* Outer border - larger with transparent background */}
    <div className={`p-3 sm:p-5 rounded-xl border ${highlighted ? 'border-[--color-company-blue]' : 'border-gray-800'} bg-transparent relative`}>
      {/* Inner border - 95% size with solid background */}
      <div className="absolute inset-[2.5%] bg-[rgba(23,23,23,0.85)] rounded-lg" />
      
      {/* Content container */}
      <div className="relative">
        {highlighted && (
          <div className="absolute -top-6 sm:-top-8 left-0 right-0 flex justify-center">
            <span className="bg-[--color-company-blue] text-white px-3 py-1 rounded-full text-xs">Most Popular</span>
          </div>
        )}
        <div className="p-4 sm:p-5 flex flex-col h-full">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-1.5">{title}</h2>
          <div className="mb-3">
            <div className="text-2xl sm:text-3xl font-bold text-white flex items-baseline flex-wrap">
              {price === 0 ? 'Free' : `£${price}`}
              {price !== 0 && <span className="text-xs font-normal text-gray-400 ml-1.5">{description}</span>}
            </div>
          </div>
          <ul className="space-y-1.5 mb-6 flex-grow h-auto sm:h-32">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="font-mono text-black-500 mr-1.5 flex-shrink-0">✓</span>
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <a 
              href="https://app.keepmecompanyai.com/"
              className={`w-full sm:w-1/2 py-2 sm:py-1.5 px-3 rounded-lg ${highlighted ? 'bg-[--color-company-blue] hover:bg-opacity-90' : 'bg-white hover:bg-gray-100'} text-${highlighted ? 'white' : 'gray-900'} font-semibold transition-colors text-sm text-center`}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PricingSection = () => {
  const plans = [
    {
      title: "Starter Pack",
      price: 0,
      description: "",
      features: [
        "15 free calls",
        "Multilingual",
        "Calls expire after 30 days"
      ],
      buttonText: "Start Free",
      highlighted: false
    },
    {
      title: "Practice Plus",
      price: 83,
      description: "per 100 calls",
      features: [
        "Up to 5 calls simultaneously",
        "Multilingual",
        "Credits don't expire"
      ],
      buttonText: "Get Started",
      highlighted: true
    },
    {
      title: "Enterprise Care",
      price: 710,
      description: "per 1.000 calls",
      features: [
        "Up to 25 calls simultaneously",
        "Multilingual",
        "Credits don't expire",
        "Dedicated support"
      ],
      buttonText: "Get Started",
      highlighted: false
    }
  ];

  return (
    <div className="mx-auto w-[95%] sm:w-[85%] px-4 sm:px-0 py-8 sm:py-12 bg-black">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2 sm:mb-3">Pricing</h1>
        <p className="text-gray-400 text-sm sm:text-base">Choose your ideal package</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
        {plans.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>

      <div className="mt-8 sm:mt-10 flex justify-center px-4 sm:px-0">
        <div className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm text-center sm:text-left">
          Questions about enterprise security, procurement, or custom contracts?{' '}
          <a 
            href="https://www.keepmecompanyai.com/en-UK/contact-sales/" 
            className="underline inline-flex items-center"
          >
            Contact Sales
            <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;