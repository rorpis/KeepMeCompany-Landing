'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

// Constants for animation
const SCROLL_SPEED = 0.5; // pixels per frame - adjust for desired speed

// Improved PatientCard component with more rounded corners
export function PatientCard({ name, status, message }) {
  // Define styles based on status
  const statusConfig = {
    success: {
      bg: "bg-green-50/80",
      text: "text-green-800",
      icon: <CheckCircle className="w-4 h-4 text-green-500/80" />,
      border: "border border-green-300"
    },
    danger: {
      bg: "bg-red-50",
      text: "text-red-800",
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      border: "border border-red-300"
    }
  };

  const config = statusConfig[status];

  return (
    <div 
      className={`
        ${config.bg} 
        rounded-3xl p-3 shadow-sm w-52 mx-auto mb-3
        ${config.border || ''} 
      `}
    >
      <div className="flex items-center gap-1.5 mb-1">
        {config.icon}
        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
      </div>
      {message && (
        <div className="ml-6">
          <span className={`${config.text} text-sm font-medium`}>{message}</span>
        </div>
      )}
    </div>
  );
}

// Custom hook for infinite scrolling
const useInfiniteScroll = (isPaused) => {
  const scrollPositionRef = useRef(0);
  const contentRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Animation loop: continually update scroll position
  const animate = useCallback(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight / 2;
      
      if (!isPaused) {
        // For upward scrolling, subtract to move the content upward
        scrollPositionRef.current -= SCROLL_SPEED;
        
        // When we've scrolled past the duplicated content, reset
        if (scrollPositionRef.current <= -contentHeight) {
          scrollPositionRef.current = 0;
        }
        
        contentRef.current.style.transform = `translate3d(0, ${scrollPositionRef.current}px, 0)`;
      }
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  // Set up and clean up animation frame
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return { contentRef };
};

export default function PatientCards() {
  // Patient data
  const allPatients = [
    { name: "Maria Garcia", status: "success" },
    { name: "David Chen", status: "success" },
    { name: "Sarah Johnson", status: "danger", message: "Needs an appointment" },
    { name: "James Wilson", status: "success" },
    { name: "Emily Rodriguez", status: "success" },
    { name: "Mohammed Al-Farsi", status: "success" },
    { name: "Olivia Thompson", status: "danger", message: "Needs an appointment" },
    { name: "Jose Mendez", status: "success" },
    { name: "Nina Patel", status: "success" },
    { name: "Robert Kim", status: "success" },
    { name: "Fatima Ahmed", status: "danger", message: "Needs an appointment" },
    { name: "Michael Brown", status: "success" },
    { name: "Aisha Okafor", status: "success" },
    { name: "Daniel Martinez", status: "success" },
    { name: "Lucy Zhang", status: "success" },
    { name: "Thomas Jackson", status: "danger", message: "Needs an appointment" },
    { name: "Sofia Russo", status: "success" },
    { name: "William Lee", status: "success" },
    { name: "Priya Singh", status: "success" },
    { name: "Gabriel Morales", status: "success" }
  ];

  // State to manage hover pause
  const [isPaused, setIsPaused] = useState(false);
  
  // Get contentRef from our custom hook
  const { contentRef } = useInfiniteScroll(isPaused);

  return (
    <div 
      className="w-full relative bg-black overflow-hidden" 
      style={{ height: '400px' }} 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-live="polite"
    >
      {/* Top fade-out gradient */}
      <div className="absolute top-0 left-0 w-full h-16 z-10 pointer-events-none bg-gradient-to-b from-black to-transparent"></div>
      
      {/* Container for scrolling content */}
      <div className="h-full pt-16 pb-16">
        <div
          ref={contentRef}
          className="absolute w-full px-4 flex flex-col items-center"
        >
          {/* Original set of cards */}
          {allPatients.map((patient, idx) => (
            <PatientCard
              key={`original-${idx}`}
              name={patient.name}
              status={patient.status}
              message={patient.message}
            />
          ))}
          
          {/* Duplicated set of cards for seamless looping */}
          {allPatients.map((patient, idx) => (
            <PatientCard
              key={`duplicate-${idx}`}
              name={patient.name}
              status={patient.status}
              message={patient.message}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom fade-in gradient */}
      <div className="absolute bottom-0 left-0 w-full h-16 z-10 pointer-events-none bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}