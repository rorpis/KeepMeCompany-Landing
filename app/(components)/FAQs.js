"use client";

import React, { useState } from 'react';
import styles from '../(styles)/FAQs.module.css';
import '../globals.css'; // Added import for global styles

const faqData = [
  {
    question: "What should I tell my parents?",
    answer: "Tell them this is something interesting you saw on the internet, that you want them to try for a few weeks. They can learn and talk about anything.",
  },
  {
    question: "Won't my parents feel like I'm abandoning them?",
    answer: "We are a family supporter, a watchful ally, not a replacement for family interactions. After giving us the privilege of helping your family, we believe you will actually spend more time with your parent.",
  },
  {
    question: "How do I get started?",
    answer: "Sign up and we'll call you, we will answer any questions you may have!",
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button
        className={`${styles.faqQuestion} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className={styles.faqAnswer}>{answer}</div>}
    </div>
  );
};

const FAQSection = () => {
  return (
    <div className={styles.faqSection}>
      <div className={styles.faqInnerContainer}>
        <h2>Frequently Asked Questions (FAQs)</h2>
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;