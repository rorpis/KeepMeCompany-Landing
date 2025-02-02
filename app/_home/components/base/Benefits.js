import React from 'react';
import { Users, Accessibility, ClipboardCheck, Timer } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
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
        <div className="flex gap-8 justify-center">
          <div className="w-[42.5%] grid grid-cols-2 gap-6 bg-white rounded-lg shadow-lg p-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-base font-medium text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="w-1/3 flex items-center">
            <div>
              <h3 className="text-blue-500 mb-4">Smart Patient Communications</h3>
              <h2 className="text-4xl mb-4">
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