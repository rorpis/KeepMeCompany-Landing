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

        <Link 
          href="/login" 
          className={styles.navLink}
        >
          Log In
        </Link>

        <Link 
          href="/signup" 
          className={styles.navLink}
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;