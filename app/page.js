// app/page.js
'use client';

import { useRef, useCallback } from 'react';
import styles from './(styles)/ScrollSnap.module.css';
import useFullPageScroll from './(hooks)/useFullPageScroll';
import Hero from './(components)/Hero';
import WhatWeDo from './(components)/WhatWeDo';
import Features from './(components)/Features';
import Future from './(components)/Future';
import Demo from './(components)/Demo';
import FAQs from './(components)/FAQs';

export default function Home() {
  // Create refs for each section
  const heroRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const featuresRef = useRef(null);
  const futureRef = useRef(null);
  const demoRef = useRef(null);
  const faqsRef = useRef(null);

  const sectionRefs = [heroRef, whatWeDoRef, featuresRef, futureRef, demoRef, faqsRef];

  // Use the custom hook
  const { currentSection, scrollToSection } = useFullPageScroll(sectionRefs);

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
            backgroundColor: currentSection === index ? 'white' : 'gray',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
        />
      ))}
    </nav>
  ), [currentSection, scrollToSection]);

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