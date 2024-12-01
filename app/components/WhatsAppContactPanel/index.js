'use client';

import React, { useState, useEffect } from 'react';
import styles from './WhatsAppContactPanel.module.css';

const WhatsAppContactPanel = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '33780106258';
    const message = encodeURIComponent('Hi, I\ need help with my centre.');
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

export default WhatsAppContactPanel;
