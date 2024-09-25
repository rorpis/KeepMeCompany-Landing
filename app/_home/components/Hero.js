"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import styles from '../styles/Hero.module.css';
import useVisibilityDetection from '../hooks/useVisibilityDetection';
import Image from 'next/image';

const phoneVariants = {
  animate: {
    y: '0vh',
    opacity: 1,
    transition: { delay: 0.1, duration: 1.5, ease: [0.2, 0.8, 0.65, 1.04] },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 2,
      ease: 'easeInOut',
    },
  },
  none: {
    scale: 1,
    transition: {
      duration: 0,
    },
  },
};

const CallButton = ({ type, onClick, shouldPulse }) => {
  const isAccept = type === 'accept';
  const iconSrc = isAccept ? "/images/accept.svg" : "/images/decline.svg";
  const altText = isAccept ? "Accept Call" : "Decline Call";

  return (
    <motion.button
      className={styles.callButton}
      onClick={onClick}
      aria-label={altText}
      variants={isAccept ? pulseVariants : {}}
      initial="none"
      animate={isAccept && shouldPulse ? "pulse" : "none"}
    >
      <div className={styles.buttonIcon}>
        <Image src={iconSrc} alt={altText} width={50} height={50} />
      </div>
    </motion.button>
  );
};

const ButtonsContainer = ({ onDecline, onAccept, callStatus }) => (
  <div className={styles.buttonsContainer}>
    <CallButton type="decline" onClick={onDecline} />
    <CallButton type="accept" onClick={onAccept} shouldPulse={callStatus === 'incoming'} />
  </div>
);

const BottomControls = ({ onDecline, onAccept, callStatus }) => (
  <div className={styles.bottomControls}>
    <ButtonsContainer onDecline={onDecline} onAccept={onAccept} callStatus={callStatus} />
    <div className={styles.dash} />
  </div>
);

const CallerName = () => (
  <div className={styles.callerNameContainer}>
    <p className={styles.callerNameMain}>KeepMeCompany</p>
    <p className={styles.callerNameSub}>mobile</p>
  </div>
);

const AnimatedText = () => {
  const [ref, isVisible] = useVisibilityDetection(0.1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isVisible && !prefersReducedMotion) {
      controls1.start('visible')
        .then(() => {
          controls2.start('visible');
          // Start controls3 animation 200ms after controls2
          setTimeout(() => controls3.start('visible'), 200);
        });
    } else if (isVisible && prefersReducedMotion) {
      controls1.start('visible');
      controls2.start('visible');
      controls3.start('visible');
    }
  }, [isVisible, prefersReducedMotion, controls1, controls2, controls3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 },
    },
  };

  const secondLineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04, duration: 0.5 },
    },
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const emphasisVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        staggerChildren: 0.8,
        delayChildren: 0.5,
      },
    },
    hidden: childVariants.hidden,
  };

  const emphasisWordVariants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: [1, 1.1, 1],
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 100,
        duration: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div ref={ref} className={styles.animatedText}>
      <motion.p
        initial="hidden"
        animate={controls1}
        variants={containerVariants}
      >
        {["We", "call", "your", "patients"].map((word, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
      <div className={styles.secondLine}>
        <motion.span
          initial="hidden"
          animate={controls2}
          variants={secondLineVariants}
          className={styles.inlineBlock}
        >
          {["so", "you", "can", "deliver"].map((word, index) => (
            <motion.span
              key={index}
              variants={childVariants}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
        <motion.span
          initial="hidden"
          animate={controls3}
          variants={emphasisVariants}
          className={styles.inlineBlock}
        >
          {["great", "care"].map((word, index) => (
            <motion.span
              key={index}
              variants={emphasisWordVariants}
              className={styles.highlightedText}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </div>
    </div>
  );
};

const DeclinedMessage = () => (
  <div className={styles.declinedMessage}>
    <p>Missed calls, angry patients. Refresh the page to try again.</p>
  </div>
);

const Hero = () => {
  const [callStatus, setCallStatus] = useState('incoming');

  const handleAcceptCall = () => {
    setCallStatus('accepted');
  };

  const handleDeclineCall = () => {
    setCallStatus('declined');
    console.log('Call Declined');
  };

  const renderContent = () => {
    switch (callStatus) {
      case 'incoming':
        return (
          <motion.div
            key="incoming"
            className={styles.phoneContainer}
            initial={{ y: '100vh', opacity: 0 }}
            animate="animate"
            exit="exit"
            variants={phoneVariants}
          >
            <Image
              src="/images/iphone15-frame.svg"
              alt="iPhone 15 Frame"
              width={265}
              height={529}
              className={styles.phoneImage}
            />
            <CallerName />
            <BottomControls
              onDecline={handleDeclineCall}
              onAccept={handleAcceptCall}
              callStatus={callStatus}
            />
          </motion.div>
        );
      case 'accepted':
        return <AnimatedText />;
      case 'declined':
        return <DeclinedMessage />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.heroContainer}>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
};

export default Hero;