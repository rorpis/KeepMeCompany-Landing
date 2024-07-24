'use client';

// app/(components)/header.js

import React, { useState } from 'react';
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
      <div className={styles.logo}>KeepMeCompany</div>
      <nav className={styles.nav}>
        <a href="#contact">Contact</a>
        <a href="#get-started">Get Started</a>
      </nav>
      <button className={styles.loginButton}>Log In</button>
    </header>
  );
};

export default Header;