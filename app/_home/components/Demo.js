import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Demo.module.css';
import useVisibilityDetection from '../hooks/useVisibilityDetection';

const Demo = () => {
  const [demoRef, isVisible] = useVisibilityDetection(0.1);
  const [showCTA, setShowCTA] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setShowCTA(true);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  const videoId = "x6B93iwSWEo";
  
  const handleCtaClick = () => {
    router.push('/signup');
  };

  return (
    <div className={styles.demoSection} ref={demoRef}>
      <div className={styles.demoContainer}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Hay Fever Intake</h2>
          <div className={styles.videoContainer}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?controls=0&color=white&modestbranding=0&rel=0&showinfo=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <button
          className={`${styles.ctaButton} ${showCTA ? styles.visible : ''}`}
          onClick={handleCtaClick}
        >
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default Demo;