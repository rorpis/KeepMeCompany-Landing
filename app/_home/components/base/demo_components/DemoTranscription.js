import React, { useState, useEffect } from 'react';

const Message = ({ speaker, text, isActive }) => {
  const isAssistant = speaker === 'Assistant';
  
  return (
    <div className={`
      w-full 
      flex 
      ${isAssistant ? 'justify-start' : 'justify-end'}
      mb-2
      transition-opacity duration-700
      ${isActive ? 'opacity-100' : 'opacity-30'}
    `}>
      <div className={`
        max-w-[80%] 
        p-2 
        rounded-lg
        text-xs
        ${isAssistant 
          ? 'bg-white/10 text-white/90' 
          : 'bg-white/20 text-white/90'
        }
      `}>
        {text}
      </div>
    </div>
  );
};

const DemoTranscription = ({ 
  messages,
  isPlaying,
  animationDuration,
  activeMessageIds
}) => {
  const [translateY, setTranslateY] = useState(0);
  const messageRefs = React.useRef({});
  
  useEffect(() => {
    const calculateTranslateY = () => {
      let totalHeight = 0;
      // Calculate height of all messages except the last two
      for (let i = 0; i < Math.max(0, messages.length - 2); i++) {
        const messageElement = messageRefs.current[messages[i].id];
        if (messageElement) {
          totalHeight += messageElement.offsetHeight;
        }
      }
      setTranslateY(totalHeight);
    };

    const timer = setTimeout(calculateTranslateY, 50);
    
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className={`
      mt-4
      h-[120px]
      overflow-hidden
      p-3
      transition-all
      duration-700
      ${isPlaying ? 'opacity-100' : 'opacity-70'}
    `}>
      <div 
        className={`
          flex
          flex-col
          transform
          transition-transform
          duration-700
          ease-in-out
        `}
        style={{
          transform: `translateY(-${translateY}px)`
        }}
      >
        {messages.map((message) => (
          <div 
            key={message.id}
            ref={el => messageRefs.current[message.id] = el}
          >
            <Message
              speaker={message.speaker}
              text={message.text}
              isActive={activeMessageIds.includes(message.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoTranscription;