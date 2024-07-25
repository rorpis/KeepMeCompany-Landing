'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './(styles)/ScrollSnap.module.css';
import useFullPageScroll from './(hooks)/useFullPageScroll';
import useVisibilityDetection from './(hooks)/useVisibilityDetection';
import Hero from './(components)/Hero';
import WhatWeDo from './(components)/WhatWeDo';
import Features from './(components)/Features';
import Future from './(components)/Future';
import Demo from './(components)/Demo';
import FAQs from './(components)/FAQs';

export default function Home() {
  // Use visibility detection for each section
  const [heroRef, heroVisible] = useVisibilityDetection();
  const [whatWeDoRef, whatWeDoVisible] = useVisibilityDetection();
  const [featuresRef, featuresVisible] = useVisibilityDetection();
  const [futureRef, futureVisible] = useVisibilityDetection();
  const [demoRef, demoVisible] = useVisibilityDetection();
  const [faqsRef, faqsVisible] = useVisibilityDetection();

  const sectionRefs = [heroRef, whatWeDoRef, featuresRef, futureRef, demoRef, faqsRef];
  const visibilityStates = [heroVisible, whatWeDoVisible, featuresVisible, futureVisible, demoVisible, faqsVisible];

  // State to track the current visible section
  const [currentVisibleSection, setCurrentVisibleSection] = useState(0);

  // Effect to update currentVisibleSection based on visibility
  useEffect(() => {
    const visibleIndex = visibilityStates.findIndex(isVisible => isVisible);
    if (visibleIndex !== -1) {
      setCurrentVisibleSection(visibleIndex);
    }
  }, visibilityStates);

  // Use the custom hook with updated parameters
  const { scrollToSection } = useFullPageScroll(sectionRefs, currentVisibleSection);

  // Navigation component
  const Navigation = useCallback(() => (
    <nav style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
      {sectionRefs.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          style={{ 
            display: 'block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            margin: '10px 0',
            backgroundColor: currentVisibleSection === index ? 'white' : 'gray',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
        />
      ))}
    </nav>
  ), [currentVisibleSection, scrollToSection]);

  return (
    <div className={styles.container}>
      <Navigation />
      <section ref={heroRef} className={styles.section}>
        <Hero />
      </section>
      <section ref={whatWeDoRef} className={styles.section}>
        <WhatWeDo />
      </section>
      <section ref={featuresRef} className={styles.section}>
        <Features />
      </section>
      <section ref={futureRef} className={styles.section}>
        <Future />
      </section>
      <section ref={demoRef} className={styles.section}>
        <Demo />
      </section>
      <section ref={faqsRef} className={styles.section}>
        <FAQs />
      </section>
    </div>
  );
}