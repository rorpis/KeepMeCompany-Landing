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
      <Link href="/" className={styles.logo}>KeepMeCompany</Link>
      <nav className={styles.nav}>
        <a href="#contact">Contact</a>
        <Link href="/signup" className={styles.navLink}>Get Started</Link>
      </nav>
      <button className={styles.loginButton}>Log In</button>
    </header>
  );
};

export default Header;