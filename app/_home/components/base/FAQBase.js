import { useState, useRef, useEffect } from 'react';
import { ChevronDownCircle } from 'lucide-react';

const FAQBase = ({ faqItems }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const FAQItem = ({ item, isOpen, index, onClick }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    
    useEffect(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, [isOpen]);

    return (
      <div className="rounded-3xl bg-neutral-900 hover:bg-neutral-800 transition-all duration-300">
        <button
          onClick={onClick}
          className="w-full text-left px-6 py-4 flex items-center justify-between"
        >
          <span className="font-semibold">{item.question}</span>
          <ChevronDownCircle
            className={`w-6 h-6 transition-transform duration-500 ease-out
              ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            strokeWidth={1.5}
          />
        </button>
        <div 
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: isOpen ? `${contentHeight}px` : '0',
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
      <div className="w-full max-w-3xl mx-auto px-4">
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