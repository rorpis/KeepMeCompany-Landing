"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../styles/Hero.module.css';

const words = ["Companionship", "Care", "Entertainment"];

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isVisible, setIsVisible] = useState(true);
  const subtitleRef = useRef(null);
  const isInView = useInView(subtitleRef, { once: true });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWord((prevWord) => {
          const currentIndex = words.indexOf(prevWord);
          const nextIndex = (currentIndex + 1) % words.length;
          return words[nextIndex];
        });
        setIsVisible(true);
      }, 500);
    }, 3000);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.hero}>
      <h1
        className={`${styles.title} ${isVisible ? styles.visible : styles.hidden}`}
      >
        {currentWord}
      </h1>
      <motion.p
        ref={subtitleRef}
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        for your parent
      </motion.p>
    </div>
  );
};

export default Hero;
