'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../(styles)/Header.module.css';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <header 
      className={`${styles.header} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href="/" 
        className={styles.logo}
      >
        KeepMeCompany
      </Link>
      
      <nav className={styles.nav}>
        <Link 
          href="/contact-sales" 
          className={styles.navLink}
        >
          Contact Sales
        </Link>

        <a 
          href="https://app.keepmecompanyai.com" 
          className={styles.platformButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Platform
        </a>
      </nav>
    </header>
  );
};

export default Header;