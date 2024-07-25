"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Future.module.css';
import useVisibilityDetection from '../hooks/useVisibilityDetection';

const Future = () => {
  const [futureRef, isVisible] = useVisibilityDetection(0.5);
  const [showSecondPart, setShowSecondPart] = useState(false);

  const secondText = "and your parent gets to be a part of it too.";
  const words = secondText.split(" ");

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setShowSecondPart(true);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className={styles.future} ref={futureRef}>
      <div className={styles.textWrapper}>
        <motion.p 
          className={styles.mainText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          The future is today
        </motion.p>
        <motion.p
          className={styles.subText}
          variants={container}
          initial="hidden"
          animate={showSecondPart ? "visible" : "hidden"}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={child}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  );
};

export default Future;
