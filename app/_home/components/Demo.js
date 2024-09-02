"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Demo.module.css';
import useVisibilityDetection from '../hooks/useVisibilityDetection';

const Demo = () => {
  const [demoRef, isVisible] = useVisibilityDetection(0.1);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setShowCTA(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  const videoId = "x6B93iwSWEo";
  
  return (
    <div className={styles.demoSection} ref={demoRef}>
      <div className={styles.demoContainer}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>See it for Yourself</h2>
          <div className={styles.videoContainer}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <button
          className={`${styles.ctaButton} ${showCTA ? styles.visible : ''}`}
          onClick={() => console.log('CTA clicked')}
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default Demo;
