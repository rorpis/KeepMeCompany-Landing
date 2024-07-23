"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "../(styles)/Features.module.css";

const Feature = ({ icon, title, description, isInitiallyVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInitiallyVisible) {
      setHasAnimated(true);
    }
  }, [isInitiallyVisible]);

  return (
    <div
      className={styles.feature}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.icon} ${isHovered ? styles.hovered : ""}`}>
        {React.cloneElement(icon, { isInitiallyVisible, isHovered, hasAnimated })}
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.titleRegular}>{title.regular}</p>
        <p className={styles.titleHighlight}>{title.highlight}</p>
      </div>
      <p className={`${styles.description} ${isHovered ? styles.visible : ''}`}>{description}</p>
    </div>
  );
};

const DailyCallsIcon = ({ isInitiallyVisible, isHovered, hasAnimated }) => {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64">
      <rect
        x="8"
        y="12"
        width="48"
        height="44"
        rx="2"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <path d="M8 20h48M16 8v8M48 8v8" stroke="white" strokeWidth="2" />
      <text
        x="32"
        y="18"
        fontFamily="Arial, sans-serif"
        fontSize="8"
        fill="white"
        textAnchor="middle"
      >
        JUL
      </text>
      <path
        className={`${isInitiallyVisible && !hasAnimated ? styles.animateCheckmarkInitial : ''} 
                    ${isHovered && hasAnimated ? styles.animateCheckmarkHover : ''}`}
        d="M20 34l8 8 16-16"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeDasharray="40"
        strokeDashoffset="40"
      />
    </svg>
  );
};

const TimelyAlertsIcon = ({ isInitiallyVisible, isHovered, hasAnimated }) => {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64">
      <path
        d="M32 4L8 14v18c0 16.6 10.8 28 24 32 13.2-4 24-15.4 24-32V14L32 4z"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <path
        className={`${isInitiallyVisible && !hasAnimated ? styles.animateExclamationLineInitial : ''} 
                    ${isHovered && hasAnimated ? styles.animateExclamationLineHover : ''}`}
        d="M32 20v16"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="16"
        strokeDashoffset="16"
      />
      <circle
        className={`${isInitiallyVisible && !hasAnimated ? styles.animateExclamationDotInitial : ''} 
                    ${isHovered && hasAnimated ? styles.animateExclamationDotHover : ''}`}
        cx="32"
        cy="44"
        r="2"
        fill="white"
        opacity="0"
      />
    </svg>
  );
};

const AssistanceIcon = ({ isInitiallyVisible, isHovered, hasAnimated }) => {
    return (
      <svg viewBox="0 0 64 64" width="64" height="64">
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        {/* UPDATED: Use specific animation class for each clock marker */}
        {[12, 3, 6, 9].map((hour) => (
          <path
            key={`marker-${hour}`}
            className={`${isInitiallyVisible && !hasAnimated ? styles[`animateClockMarker${hour}Initial`] : ''} 
                        ${isHovered && hasAnimated ? styles[`animateClockMarker${hour}Hover`] : ''}`}
            d={
              hour === 12
                ? "M32 8v4"
                : hour === 3
                ? "M56 32h-4"
                : hour === 6
                ? "M32 56v-4"
                : "M8 32h4"
            }
            stroke="white"
            strokeWidth="2"
            opacity="0"
          />
        ))}
        <path
          d="M32 14v18l9 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };
const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <div className={`section ${styles.features}`} ref={featuresRef}>
      <h2>How we support families</h2>
      <div className={styles.featuresContainer}>
        <Feature
          icon={<DailyCallsIcon />}
          title={{
            regular: "We call seniors",
            highlight: "everyday",
          }}
          description="Regular, entertaining phone calls. Every day."
          isInitiallyVisible={isVisible}
        />
        <Feature
          icon={<TimelyAlertsIcon />}
          title={{
            regular: "We keep you",
            highlight: "in the loop",
          }}
          description="Instant notifications when things go wrong"
          isInitiallyVisible={isVisible}
        />
        <Feature
          icon={<AssistanceIcon />}
          title={{
            regular: "We make",
            highlight: "your life easier",
          }}
          description="With timely reminders for your parent."
          isInitiallyVisible={isVisible}
        />
      </div>
      <div className={styles.pricingBox}>For only £20/mo</div>
    </div>
  );
};

export default Features;