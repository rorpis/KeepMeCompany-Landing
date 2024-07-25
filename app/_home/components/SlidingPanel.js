'use client';

import React from 'react';
import useDelayedAppearance from '../hooks/useDelayedAppearance';
import styles from '../styles/SlidingPanel.module.css';

const SlidingPanel = () => {
  const isVisible = useDelayedAppearance(2000);

  const handleWhatsAppClick = () => {
    const phoneNumber = '33780106258';
    const message = encodeURIComponent('Hi, I\ would like to talk about KeepMeCompany.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className={`${styles.panel} ${isVisible ? styles.visible : ''}`}>
      <p className={styles.message}>Talk to us directly here</p>
      <button onClick={handleWhatsAppClick} className={styles.whatsappButton}>
        Chat on WhatsApp
      </button>
    </div>
  );
};

export default SlidingPanel;
