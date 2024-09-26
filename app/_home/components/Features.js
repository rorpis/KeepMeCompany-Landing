"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Features.module.css';
import { SeniorsIcon, ReceptionistIcon, TimeSavingIcon } from './FeaturesIcons';

const Feature = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={styles.feature}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.icon} ${isHovered ? styles.hovered : ""}`}>
        {icon}
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.titleRegular}>{title.regular}</p>
        <p className={styles.titleHighlight}>{title.highlight}</p>
      </div>
      <p className={`${styles.description} ${isHovered ? styles.visible : ''}`}>{description}</p>
    </div>
  );
};

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

const Features = () => {
  const [ref, isVisible] = useVisibilityDetection(0.1);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setShowPricing(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div className={`section ${styles.features}`} ref={ref}>
      <h2><b>Reimagine your Centre</b></h2>

      <div className={styles.featuresContainer}>
        <Feature
          icon={<SeniorsIcon />}
          title={{
            regular: "Accessible to",
            highlight: "Seniors",
          }}
          description="No apps, just pick up the phone and talk."
        />
        <Feature
          icon={<ReceptionistIcon />}
          title={{
            regular: "No more",
            highlight: "Missed calls",
          }}
          description="Even on weekends."
        />
        <Feature
          icon={<TimeSavingIcon />}
          title={{
            regular: "Reduce",
            highlight: "Consult times",
          }}
          description="Faster diagnosis, less typing."
        />
      </div>
      <div className={`${styles.pricingBox} ${showPricing ? styles.visible : ''}`}>
        Save up to <strong style={{ color: '#3284C2' }}>10x</strong> the cost
      </div>

    </div>
  );
};

export default Features;
