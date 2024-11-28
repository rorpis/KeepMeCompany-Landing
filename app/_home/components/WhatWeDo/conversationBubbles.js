// conversationBubbles.js
import React from 'react';
import styles from './conversationBubbles.module.css';

const conversationData = [
  {
    role: 'assistant',
    content: 'Have you noticed any changes in your weight recently?'
  },
  {
    role: 'patient',
    content: [
      { type: 'normal', text: 'Yes, I\'ve ' },
      { type: 'highlight', symptom: 'weight-loss', text: 'lost 7 kilos' },
      { type: 'normal', text: '.' }
    ]
  },
  {
    role: 'assistant',
    content: 'When did you notice this weight loss?'
  },
  {
    role: 'patient',
    content: [
      { type: 'normal', text: 'Over the last ' },
      { type: 'highlight', symptom: 'duration', text: 'two months' } 
    ]
  },
  {
    role: 'assistant',
    content: 'How have your energy and mood been lately?'
  },
  {
    role: 'patient',
    content: [
      { type: 'normal', text: 'I\'ve been feeling really ' },
      { type: 'highlight', symptom: 'anxiety', text: 'on edge' },
      { type: 'normal', text: '.' }
    ]
  },
  {
    role: 'assistant',
    content: 'I see, have you noticed any effects on your hands?'
  }
];

const MessageContent = ({ segments }) => {
  if (typeof segments === 'string') {
    return <span>{segments}</span>;
  }

  return segments.map((segment, index) => (
    <span 
      key={index} 
      className={segment.type === 'highlight' ? styles.highlightedSymptom : undefined}
      data-symptom={segment.type === 'highlight' ? segment.symptom : undefined}
    >
      {segment.text}
    </span>
  ));
};

const MessageBubble = ({ role, content, isAnimated, isVisible }) => {
  const bubbleClasses = `
    ${styles.messageBubble} 
    ${role === 'assistant' ? styles.assistantBubble : styles.patientBubble}
    ${isAnimated ? styles.animated : ''}
    ${isAnimated && isVisible ? styles.visible : ''}
  `.trim();

  const containerClasses = `
    ${styles.messageContainer} 
    ${role === 'assistant' ? styles.leftAlign : styles.rightAlign}
  `.trim();

  return (
    <div className={containerClasses}>
      <div className={bubbleClasses}>
        <MessageContent segments={content} />
      </div>
    </div>
  );
};

const ConversationThread = ({ visibleMessageCount }) => (
  <div className={styles.conversationThread}>
    {conversationData.map((message, index) => (
      <MessageBubble 
        key={index}
        role={message.role}
        content={message.content}
        isAnimated={index >= 4}
        isVisible={index < visibleMessageCount}
      />
    ))}
  </div>
);

export default ConversationThread;