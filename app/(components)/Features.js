"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from '../(styles)/Features.module.css';


// Simplified Feature component
const Feature = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={styles.feature}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon container with hover effect */}
      <div className={`${styles.icon} ${isHovered ? styles.hovered : ""}`}>
        {icon}
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.titleRegular}>{title.regular}</p>
        <p className={styles.titleHighlight}>{title.highlight}</p>
      </div>
      {/* Description visibility toggled by hover state */}
      <p className={`${styles.description} ${isHovered ? styles.visible : ''}`}>{description}</p>
    </div>
  );
};

// Simplified SVG icons with all elements always visible
const DailyCallsIcon = () => (
  <svg viewBox="0 0 64 64" width="64" height="64">
    <rect x="8" y="12" width="48" height="44" rx="2" fill="none" stroke="white" strokeWidth="2" />
    <path d="M8 20h48M16 8v8M48 8v8" stroke="white" strokeWidth="2" />
    <text x="32" y="18" fontFamily="Arial, sans-serif" fontSize="8" fill="white" textAnchor="middle">JUL</text>
    <path d="M20 34l8 8 16-16" fill="none" stroke="white" strokeWidth="4" />
  </svg>
);

const TimelyAlertsIcon = () => (
  <svg viewBox="0 0 64 64" width="64" height="64">
    <path d="M32 4L8 14v18c0 16.6 10.8 28 24 32 13.2-4 24-15.4 24-32V14L32 4z" fill="none" stroke="white" strokeWidth="2" />
    <path d="M32 20v16" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="44" r="2" fill="white" />
  </svg>
);

const AssistanceIcon = () => (
  <svg viewBox="0 0 64 64" width="64" height="64">
    <circle cx="32" cy="32" r="30" fill="none" stroke="white" strokeWidth="2" />
    {[12, 3, 6, 9].map((hour) => (
      <path
        key={`marker-${hour}`}
        d={
          hour === 12 ? "M32 8v4" :
          hour === 3 ? "M56 32h-4" :
          hour === 6 ? "M32 56v-4" :
          "M8 32h4"
        }
        stroke="white"
        strokeWidth="2"
      />
    ))}
    <path d="M32 14v18l9 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
// Custom hook for visibility detection
const useVisibilityDetection = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Updated Features component
const Features = () => {
  const [ref, isVisible] = useVisibilityDetection(0.1);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setShowPricing(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div className={`section ${styles.features}`} ref={ref}>
      <h2>How we support families</h2>
      <div className={styles.featuresContainer}>
        <Feature
          icon={<DailyCallsIcon />}
          title={{
            regular: "We call seniors",
            highlight: "everyday",
          }}
          description="Regular, entertaining phone calls. Every day."
        />
        <Feature
          icon={<TimelyAlertsIcon />}
          title={{
            regular: "We keep you",
            highlight: "in the loop",
          }}
          description="Instant notifications when things go wrong"
        />
        <Feature
          icon={<AssistanceIcon />}
          title={{
            regular: "We make",
            highlight: "your life easier",
          }}
          description="With timely reminders for your parent."
        />
      </div>
      <div className={`${styles.pricingBox} ${showPricing ? styles.visible : ''}`}>
        For only £20/mo
      </div>
    </div>
  );
};

export default Features;