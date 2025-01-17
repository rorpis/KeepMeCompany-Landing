'use client';

import React, { useState, useEffect } from 'react';
import styles from './WhatsAppContactPanel.module.css';
import { useTranslations } from '@/app/hooks/useTranslations';

const WhatsAppContactPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslations();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '33780106258';
    const message = encodeURIComponent('Hi, I need help with my centre.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className={`${styles.panel} ${isVisible ? styles.visible : ''}`}>
      <p className={styles.message}>{t('contact.whatsapp.message')}</p>
      <button onClick={handleWhatsAppClick} className={styles.whatsappButton}>
        {t('contact.whatsapp.button')}
      </button>
    </div>
  );
};

export default WhatsAppContactPanel;
