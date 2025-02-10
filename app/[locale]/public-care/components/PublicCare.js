"use client";

import React, { useState, useEffect, useRef } from "react";
import Problems from "./Problems";
import PatientJourney from "./PatientJourney";
import { Bot } from 'lucide-react';

function OverlayWrapper({ children, showTop = true, showBottom = true, topColor = "gray-900", bottomColor = "gray-900" }) {
  return (
    <div className="relative">
      {children}
      {showTop && (
        <div className={`absolute top-0 left-0 w-full h-8 pointer-events-none bg-gradient-to-b from-${topColor} to-transparent`} />
      )}
      {showBottom && (
        <div className={`absolute bottom-0 left-0 w-full h-8 pointer-events-none bg-gradient-to-t from-${bottomColor} to-transparent`} />
      )}
    </div>
  );
}

export default function PublicCare() {
  const [isAliciaVisible, setIsAliciaVisible] = useState(false);
  const [isTimeVisible, setIsTimeVisible] = useState(false);
  const aliciaSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAliciaVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      {
        threshold: 0.3 // Trigger when 30% of the section is visible
      }
    );

    if (aliciaSectionRef.current) {
      observer.observe(aliciaSectionRef.current);
    }

    const timer = setTimeout(() => {
      setIsTimeVisible(true);
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="w-full relative">
      {/* SECTION 1: Title */}
      <section className="bg-black text-white py-8 px-4 text-center relative">
        <div className="mt-8 p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Public Healthcare is Broken
          </h1>
          <p className="text-xl md:text-2xl text-gray-400">
            Primary care is in survival mode
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-gray-900" />
      </section>

      {/* SECTION 2: Problems */}
      <OverlayWrapper>
        <Problems />
      </OverlayWrapper>

      {/* SECTION 3: What you need is time */}
      <section className="bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 text-center mb-20">
        <div className={`max-w-3xl mx-auto transition-all duration-1000 ${
          isTimeVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold mb-4">What you need is time.</h2>
          Time to hear your patients, to call your patients, to treat your patients.
        </div>
      </section>

      {/* SECTION 4: Meet Alicia */}
      <section ref={aliciaSectionRef} className="relative">
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-white" />
        <div className="bg-white text-black py-24 px-4">
          <div
            className={`transition-all duration-1000 transform ${
              isAliciaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Outer container that centers our content */}
            <div className="w-full flex justify-center">
              {/* Inline container that shrinks to fit its content */}
              <div className="inline-block">
                {/* Header block: left aligned so the icon is flush with the left edge */}
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bot
                      className="w-5 h-5"
                      color="var(--color-company-blue)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">Meet Alicia</h2>
                </div>

                {/* Title/Subtitles block: text centered within the inline container */}
                <div className="mt-4 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    The Solution to your time problem
                  </h2>
                  <p className="text-lg md:text-xl text-gray-700">
                    The communications platform for all patient interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-white to-gray-900" />
      </section>

      {/* SECTION 5: Patient Journey */}
      <section className="w-full bg-gray-900">
        <PatientJourney />
      </section>
    </main>
  );
}