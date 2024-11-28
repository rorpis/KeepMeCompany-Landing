import React from 'react';
import Image from 'next/image';
import styles from './Phone.module.css';

// CallButton Component
const CallButton = ({ type }) => {
  const isAccept = type === 'accept';
  const iconSrc = isAccept ? "/images/accept.svg" : "/images/decline.svg";
  const altText = isAccept ? "Accept Call" : "Decline Call";

  return (
    <button className={styles.callButton} aria-label={altText}>
      <div className={styles.buttonIcon}>
        <Image src={iconSrc} alt={altText} width={50} height={50} />
      </div>
    </button>
  );
};

// ButtonsContainer Component
const ButtonsContainer = () => (
  <div className={styles.buttonsContainer}>
    <CallButton type="decline" />
    <CallButton type="accept" />
  </div>
);

// BottomControls Component
const BottomControls = () => (
  <div className={styles.bottomControls}>
    <ButtonsContainer />
    <div className={styles.dash} />
  </div>
);

// CallerName Component
const CallerName = () => (
  <div className={styles.callerNameContainer}>
    <p className={styles.callerNameMain}>KeepMeCompany</p>
    <p className={styles.callerNameSub}>mobile</p>
  </div>
);

// Main Phone Component
const Phone = () => {
  return (
    <div className={styles.phoneContainer}>
      <Image
        src="/images/iphone15-frame.svg"
        alt="iPhone 15 Frame"
        width={265}
        height={529}
        className={styles.phoneImage}
      />
      <CallerName />
      <BottomControls />
    </div>
  );
};

export default Phone;