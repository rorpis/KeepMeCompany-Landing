"use client";

import React from 'react';
import styles from '../(styles)/Demo.module.css';

const Demo = () => {
  const videoId = "H14bBuluwB8"; // Example video ID

  return (
    // Added wrapper div for consistent section spacing
    <div className={styles.demoSection}>
      <div className={styles.demoContainer}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Try it Now</h2>
          <p className={styles.subtitle}>With a free 5 minute call.</p>
          <button className={styles.ctaButton} onClick={() => console.log('CTA clicked')}>
            Get Started Now
          </button>
        </div>
        <div className={styles.videoContainer}>
          <iframe
            width="560"
            height="450" // Changed height from 315 to 450
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Demo;