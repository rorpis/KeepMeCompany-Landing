// Updated Home component
'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from '../styles/ScrollSnap.module.css';
import useFullPageScroll from '../hooks/useFullPageScroll';
import useVisibilityDetection from '../hooks/useVisibilityDetection';
import Hero from './Hero';
import WhatWeDo from './WhatWeDo';
import SimplifyYourPractice from './SimplifyYourPractice';
import Future from './Future';
import Demo from './Demo';
import DataPrivacy from './DataPrivacy';

export default function HomeComponent() {
  const [heroRef, heroVisible] = useVisibilityDetection();
  const [whatWeDoRef, whatWeDoVisible] = useVisibilityDetection();
  const [SimplifyYourPracticeRef, SimplifyYourPracticeVisible] = useVisibilityDetection();
  const [futureRef, futureVisible] = useVisibilityDetection();
  const [demoRef, demoVisible] = useVisibilityDetection();
  const [dataPrivacyRef, dataPrivacyVisible] = useVisibilityDetection();

  const sectionRefs = [
    heroRef,
    whatWeDoRef,
    SimplifyYourPracticeRef,
    futureRef,
    demoRef,
    dataPrivacyRef
  ];
  
  const visibilityStates = [
    heroVisible,
    whatWeDoVisible,
    SimplifyYourPracticeVisible,
    futureVisible,
    demoVisible,
    dataPrivacyVisible
  ];

  const [currentVisibleSection, setCurrentVisibleSection] = useState(0);

  useEffect(() => {
    const visibleIndex = visibilityStates.findIndex(isVisible => isVisible);
    if (visibleIndex !== -1) {
      setCurrentVisibleSection(visibleIndex);
    }
  }, visibilityStates);

  const { scrollToSection } = useFullPageScroll(sectionRefs, currentVisibleSection);

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
      <section ref={SimplifyYourPracticeRef} className={styles.section}>
        <SimplifyYourPractice />
      </section>
      <section ref={futureRef} className={styles.section}>
        <Future />
      </section>
      <section ref={demoRef} className={styles.section}>
        <Demo />
      </section>
      <section ref={dataPrivacyRef} className={styles.section}>
        <DataPrivacy />
      </section>
    </div>
  );
}