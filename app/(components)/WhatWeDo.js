"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../(styles)/WhatWeDo.module.css';
import useVisibilityDetection from '../(hooks)/useVisibilityDetection';

const WhatWeDo = () => {
  const [ref, isVisible] = useVisibilityDetection(0.5);

  const text = "We help families take better care of their parents.";
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className={styles.whatWeDo} ref={ref}>
      <motion.p
        className={styles.message}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={container}
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
  );
};

export default WhatWeDo;