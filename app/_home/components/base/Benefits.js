import React from 'react';
import { Clock, Accessibility, ClipboardCheck, Timer } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "No more 8am rush",
      description: "If your patient chooses to speak with the AI"
    },
    {
      icon: <Accessibility className="w-8 h-8 text-blue-500" />,
      title: "Accessible",
      description: "Specially for seniors and immigrants"
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-blue-500" />,
      title: "Productive Appointments",
      description: "Patients come prepared to answer medical questions"
    },
    {
      icon: <Timer className="w-8 h-8 text-blue-500" />,
      title: "Faster Care",
      description: "Reduced documentation and diagnosis time"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-8 justify-center">
          <div className="w-full md:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/95 rounded-lg shadow-lg p-5">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center gap-0.5 text-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{benefit.title}</h3>
                <div className="w-4/6 border-b border-gray-300 my-0.5"></div>
                <p className="text-sm md:text-xs text-gray-600 bg-gray-20 rounded-md p-2">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/3 flex items-center text-center md:text-left">
            <div>
              <h3 className="text-blue-500 mb-4 text-lg md:text-base">Smart Patient Communications</h3>
              <h2 className="text-3xl md:text-4xl mb-4">
                Better Healthcare Delivery for Patients and Clinicians
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;