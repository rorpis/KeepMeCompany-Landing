"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from '../styles/WhatWeDo.module.css';
import useVisibilityDetection from '../hooks/useVisibilityDetection';

// Sub-component for each text segment
const TextSegment = ({ children, controls, variants, initial, custom }) => (
  <motion.span
    className={styles.textSegment}
    variants={variants}
    initial={initial || 'hidden'}
    animate={controls}
    custom={custom}
  >
    {children}
  </motion.span>
);

const WhatWeDo = () => {
  const [whatWeDoRef, isVisible] = useVisibilityDetection(0.5);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Animation controls for each segment
  const controls1 = useAnimation(); // "Give your GPs"
  const controls2 = useAnimation(); // "a head start"
  const controls3 = useAnimation(); // "by collecting symptoms"
  const controls4 = useAnimation(); // "in advance"

  // Variants for text segments
  const variants = {
    hidden: { opacity: 0, y: 20, color: '#ffffff' }, // Starting color is white
    visible: { 
      opacity: 1, 
      y: 0, 
      color: '#ffffff', // When visible, it's still white
      transition: { duration: 1, ease: 'easeOut' } 
    },
    moveRight: { 
      x: '35%', 
      color: '#3284C2', // Transitions to blue while moving
      transition: { 
        duration: 0.7, 
        ease: 'easeInOut',
        delay: 0 // No delay for moving right
      } 
    },
    moveLeft: { 
      x: '0%', 
      color: '#3284C2', // Transitions to blue while moving
      transition: { 
        duration: 0.9, 
        ease: 'easeInOut',
        delay: 0.3 // 0.3-second delay before moving left
      } 
    },
  };

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isVisible) {
      if (prefersReducedMotion) {
        // If user prefers reduced motion, display all segments instantly
        controls1.start('visible');
        controls2.start('visible');
        controls3.start('visible');
        controls4.start('visible');
      } else {
        // Introduce a 700ms delay before starting the first animation
        setTimeout(() => {
          controls1.start('visible').then(() => {
            controls2.start('visible').then(() => {
              // After second, start movement to the right
              controls2.start('moveRight').then(() => {
                controls3.start('visible').then(() => {
                  controls4.start('visible').then(() => {
                    controls4.start('moveLeft');
                  });
                });
              });
            });
          });
        }, 700); // 0.7-second delay for the "Give GPs" animation
      }
    }
  }, [isVisible, prefersReducedMotion, controls1, controls2, controls3, controls4]);

  return (
    <div className={styles.whatWeDo} ref={whatWeDoRef}>
      {/* First Line */}
      <motion.p className={`${styles.message} ${styles.firstLine}`}>
  <TextSegment controls={controls1} variants={variants}>
    Give GPs
  </TextSegment>
  {' '}
  <TextSegment controls={controls2} variants={variants}>
    a head start.
  </TextSegment>
</motion.p>

      {/* Second Line */}
      <motion.p className={styles.message}>
        <TextSegment controls={controls3} variants={variants}>
          Collect symptoms
        </TextSegment>
        {' '}
        <TextSegment 
          controls={controls4} 
          variants={variants}
          initial={{ opacity: 0, y: 20, x: '35%' }} // Initial position 35% to the right
        >
          in advance.
        </TextSegment>
      </motion.p>
    </div>
  );
};

export default WhatWeDo;

