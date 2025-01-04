import { useState, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqItems = [
    {
      question: "I already have online booking forms - why do I need this?",
      answer: "While online booking forms are valuable, our data shows that practices still receive more calls than they can handle. This solution specifically addresses the phone-based patient population - particularly seniors and those who prefer or need to book by phone - who aren't served by existing online solutions."
    },
    {
      question: "How does this justify the additional cost?",
      answer: "Think of this as capacity insurance: when your practice grows by 40%, you'd typically need to increase staff accordingly. Our system helps your existing team work more efficiently, preventing the need for rapid team expansion. It also provides crucial backup during staff absences, maintaining service levels even during peak periods or staff illness."
    },
    {
      question: "What clinical decisions will the AI make?",
      answer: "None. The AI is purely administrative - it gathers information to support your team's decision-making process. All clinical decisions remain entirely with your medical staff."
    },
    {
      question: "Can patients opt out of using the AI system?",
      answer: "Absolutely. Patient choice is built into the system. Callers can easily select to speak with a human receptionist through the telephone menu. We believe in enhancing access, not restricting it."
    },
    {
      question: "How can I be sure this won't disrupt my operation?",
      answer: "We've developed practice simulators that let you test the system risk-free. Your team can experience a typical Monday morning rush on a quiet Friday afternoon, allowing you to validate the system's effectiveness before any implementation or financial commitment."
    },
    {
      question: "Do I have to commit to using the service every day?",
      answer: "No. We believe in flexibility - there are no long-term contracts or complex integrations. You control when and how much you use the service through a simple dashboard, adjustable in just a few clicks."
    }
  ];

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

export default FAQ;