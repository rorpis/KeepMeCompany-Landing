// WhatWeDo.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/WhatWeDo.module.css';
import ConversationThread from './WhatWeDo/conversationBubbles';
import Phone from './WhatWeDo/Phone';
import useVisibilityDetection from '../hooks/useVisibilityDetection';

const LeftComponent = () => (
  <div className={styles.leftComponent}>
    <div className={styles.phoneContainer}>
      <Phone />
    </div>
  </div>
);

const RightComponent = ({ visibleMessageCount }) => (
  <div className={styles.rightComponent}>
    <div className={styles.conversationContainer}>
      <ConversationThread visibleMessageCount={visibleMessageCount} />
    </div>
  </div>
);

const WhatWeDo = () => {
  const [ref, isVisible] = useVisibilityDetection(0.1);
  const [visibleMessageCount, setVisibleMessageCount] = useState(4);
  const totalMessages = 7; // Based on your conversationData length

  useEffect(() => {
    let timeoutId;

    if (isVisible && visibleMessageCount < totalMessages) {
      timeoutId = setTimeout(() => {
        setVisibleMessageCount(prev => Math.min(prev + 1, totalMessages));
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, visibleMessageCount]);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.contentSection}>
        <LeftComponent />
        <RightComponent visibleMessageCount={visibleMessageCount} />
      </div>
    </div>
  );
};

export default WhatWeDo;