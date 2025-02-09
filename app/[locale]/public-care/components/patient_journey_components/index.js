"use client";

import React from 'react';

export const chapters = [
  {
    title: "Booking the Appointment",
    subtitle: "8am rush solver",
    problem: "Too many calls from 8-9:30, patients wait, your operations are stressed, things get out of control.",
    solution: "Offload your same day requests to Alicia, who will verify your patients and ask for the reason for their visit, and the fixed questions your receptionists do today, letting you prioritize who needs care the most.",
    benefits: "No missed calls, better prioritization, reduced administrative pressure, happier patients, reduced health inequalities.",
    setupSteps: "(1) Call your telephony to forward calls from your phone to Alicia, (2) create an account, (3) "
  },
  {
    title: "Preparing for the Appointment",
    subtitle: "AI Intake calls",
    problem: "Patients, especially seniors, need time to articulate their symptoms. This leads to slower consultation times, incomplete medical diagnosis and GP burnout.",
    solution: "Call your patients with one click, Alicia will gather their symptoms and log them in your system.",
    benefits: "About 25% reduction in consultation time, due to reduced logs, better prepared patients and GPs.",
    setupSteps: "(1) Create an account, (2) select a patient to call, (3) done"
  },
  {
    title: "The Appointment",
    subtitle: "This is actually just you! Keep doing amazing work",
    problem: "",
    solution: "",
    benefits: "",
    setupSteps: ""
  },
  {
    title: "Follow ups",
    subtitle: "Automated post consultation calls",
    problem: "There's virtually no interaction between GPs and patients in between consults. Sometimes just a couple of touchpoints can help accelerate or eliminate an appointment. You, as a doctor, want your patients to be safe but also reserve your slots for patients who need you the most.",
    solution: "Alicia can call patients on your behalf and ask them structured questions designed by you. This gives another tool for GPs to decide if an appointment is actually needed.",
    benefits: "Reduced unnecessary appointments, increases patient adherence to treatments, better detection of adverse symptoms post consultation.",
    setupSteps: "(1) Create an account, (2) select patient and questioning template, (3) done"
  },
  {
    title: "Ongoing care (QOF)",
    subtitle: "Massive calls to help you reach your Quality of Outcomes Framework",
    problem: "Today, there's 259 points (£56.980/yr for a 10.000 patient practice) in tasks that require bringing patients to the consult (vaccination campaigns) or gathering information over the phone. These equal to ~8.000 calls you need to make over the year to achieve those points. It's hard and tedious.",
    solution: "You can call hundreds of patients in a single day to get the information you need or to invite them to the consult, boosting dramatically your compliance with the QOF with minimal effort.",
    benefits: "Increased revenue for your practice. For every £1 you spend you get £8 equivalent to the points in the QOF.",
    setupSteps: "(1) Create an account, (2) select patient and questioning template, (3) done"
  }
];

export const ChapterContent = ({ chapter }) => (
  <div className="max-w-2xl w-full mx-auto p-8">
    <div className="mb-6">
      <h2 className="text-3xl font-bold mb-2">{chapter.title}</h2>
      <p className="text-xl text-gray-400">{chapter.subtitle}</p>
    </div>
    {chapter.problem && (
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">Problem:</h3>
        <p className="text-lg text-gray-300">{chapter.problem}</p>
      </div>
    )}
    {chapter.solution && (
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">Solution:</h3>
        <p className="text-lg text-gray-300">{chapter.solution}</p>
      </div>
    )}
    {chapter.benefits && (
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">Benefits:</h3>
        <p className="text-lg text-gray-300">{chapter.benefits}</p>
      </div>
    )}
    {chapter.setupSteps && (
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">Setup Steps:</h3>
        <p className="text-lg text-gray-300">{chapter.setupSteps}</p>
      </div>
    )}
  </div>
);

export const Sidebar = ({ chapters, activeChapter, onChapterClick }) => (
  <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
    <ul className="space-y-4">
      {chapters.map((chapter, index) => (
        <li key={index}>
          <button
            onClick={() => onChapterClick(index)}
            className={`text-lg transition-colors duration-300 ${
              index === activeChapter ? 'font-bold text-white' : 'text-gray-400'
            }`}
          >
            {chapter.title}
          </button>
        </li>
      ))}
    </ul>
  </div>
); 