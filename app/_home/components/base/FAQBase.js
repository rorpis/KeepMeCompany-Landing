import { useState, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQBase = ({ faqItems }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const FAQItem = ({ item, isOpen, index, onClick }) => {
    const contentRef = useRef(null);
    
    return (
      <div 
        className={`
          rounded-3xl bg-[#1a1a1a] hover:bg-[#242424] 
          transition-all duration-300 overflow-hidden
        `}
      >
        <button
          onClick={onClick}
          className="w-full text-left px-6 py-4 flex items-center justify-between"
        >
          <span className="font-semibold">{item.question}</span>
          <ChevronDownIcon 
            className={`w-5 h-5 transition-transform duration-500 ease-out
              ${isOpen ? 'rotate-180' : 'rotate-0'}
            `}
          />
        </button>
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-out
            ${isOpen ? 'max-h-96' : 'max-h-0'}
          `}
          style={{
            transitionDelay: isOpen ? '150ms' : '0ms'
          }}
        >
          <div 
            ref={contentRef}
            className={`
              px-6 pb-4 text-gray-400
              transform transition-all duration-500 ease-out
              ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
            `}
          >
            {item.answer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16">
      <div className="w-[50vw] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQBase; 