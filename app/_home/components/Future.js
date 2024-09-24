/* Future.js */

"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from '../styles/Future.module.css';
import useVisibilityDetection from '../hooks/useVisibilityDetection';

// 1. Define Animation Variants First
const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const textSegmentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // Default stagger delay for letters
    },
  },
};

// 2. Define Inner Components Next

// Inner Component: Letter
const Letter = React.memo(({ children, variants }) => {
  // If the character is a space, render a non-breaking space without animation
  if (children === ' ') {
    return <span>&nbsp;</span>;
  }

  return (
    <motion.span
      variants={variants}
      className={styles.letter}
    >
      {children}
    </motion.span>
  );
});

// Inner Component: TextSegment
const TextSegment = ({ text, controls, staggerDelay, className }) => {
  // Split the text into individual characters
  const characters = text.split('');

  // Define container variants to enable staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay, // Dynamic stagger delay per TextSegment
      },
    },
  };

  return (
    <motion.span
      className={`${styles.textSegment} ${className || ''}`} // Merge className
      variants={textSegmentVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.span variants={containerVariants} className={styles.letterContainer}>
        {characters.map((char, index) => (
          <Letter key={index} variants={letterVariants}>
            {char}
          </Letter>
        ))}
      </motion.span>
    </motion.span>
  );
};

// 3. Define the Main Future Component Last
const Future = () => {
  const [futureRef, isVisible] = useVisibilityDetection(0.1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Animation controls for each TextSegment
  const controls1 = useAnimation(); // "Take"
  const controls2 = useAnimation(); // "real time"
  const controls3 = useAnimation(); // "to hear your patients"
  const controls4 = useAnimation(); // "without sacrificing efficiency"

  // 4. Implement a Sleep Function
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 5. Sequential Animation Trigger with Initial Delay
  useEffect(() => {
    const animateSequence = async () => {
      if (isVisible) {
        if (prefersReducedMotion) {
          // If user prefers reduced motion, display all segments instantly
          await Promise.all([
            controls1.start('visible'),
            controls2.start('visible'),
            controls3.start('visible'),
            controls4.start('visible'),
          ]);
        } else {
          // Introduce a 1.5-second delay before starting the first animation
          await sleep(1000);

          // Sequential animations without additional delays
          await controls1.start('visible'); // "Take"
          await controls2.start('visible'); // "real time"
          await controls3.start('visible'); // "to hear your patients"
          await controls4.start('visible'); // "without sacrificing efficiency"
        }
      }
    };

    animateSequence();
  }, [isVisible, prefersReducedMotion, controls1, controls2, controls3, controls4]);

  return (
    <div className={styles.future} ref={futureRef}>
      {/* First Row: "Take", "real time", "to hear your patients" */}
      <motion.p className={styles.messageRow}>
        {/* "Take" as a separate TextSegment */}
        <TextSegment
          text="Take"
          controls={controls1}
          staggerDelay={0.10} // 0.10-second stagger delay for faster letters
        />
        {' '}
        {/* "real time" as its own TextSegment with highlight class */}
        <TextSegment
          text="real time"
          controls={controls2}
          staggerDelay={0.50} // 0.30-second stagger delay for slightly slower letters
          className={styles.highlight} // Apply highlight class for color
        />
        {' '}
        {/* "to hear your patients" as its own TextSegment */}
        <TextSegment
          text="to hear your patients"
          controls={controls3}
          staggerDelay={0.05} // 0.05-second stagger delay for faster letters
        />
      </motion.p>

      {/* Second Row: "without sacrificing efficiency" */}
      <motion.p className={styles.messageRow}>
        <TextSegment
          text="without sacrificing efficiency"
          controls={controls4}
          staggerDelay={0.005} // 0.005-second stagger delay for slower letters
        />
      </motion.p>
    </div>
  );
};

export default Future;
