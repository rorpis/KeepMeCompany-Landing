import React, { useState, useRef, useEffect } from 'react';
import AudioControls from './demo_components/AudioControls';
import ConversationDisplay from './demo_components/ConversationDisplay';
import DemoTranscription from './demo_components/DemoTranscription';
import { transcriptionData, timestamps } from './demo_components/demoData';
import { Bot } from 'lucide-react';

const ANIMATION_DURATION = 700;


const styles = {
  section: "backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 shadow-lg",
  sectionHeader: "text-white/60 mb-2",
};

const AnimatedLine = ({ show, content, onRender, timestamp }) => {
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (show && !hasRendered) {
      onRender(timestamp, content);
      setHasRendered(true);
    }
  }, [show, hasRendered, onRender, timestamp, content]);

  return (
    <div 
      className={`
        transform 
        transition-all 
        duration-700 
        cubic-bezier(0.4, 0.0, 0.2, 1) 
        overflow-hidden
        ${show 
          ? 'max-h-20 opacity-100 translate-y-0' 
          : 'max-h-0 opacity-0 -translate-y-4'}
      `}
    >
      {content}
    </div>
  );
};

const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [renderedLines, setRenderedLines] = useState(new Set());
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [messages, setMessages] = useState([]);
  const [activeMessageIds, setActiveMessageIds] = useState([]);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isAliciaVisible, setIsAliciaVisible] = useState(false);
  const aliciaSectionRef = useRef(null);

  const audioUrl = '/videos-and-audios/Demo.wav';

  const handleNewLine = (timestamp, content) => {
    if (!renderedLines.has(timestamp)) {
      setRenderedLines(prev => new Set([...prev, timestamp]));
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
  }, []);

  useEffect(() => {
    const newMessages = transcriptionData
      .filter(msg => msg.timestamp <= currentTime);

    if (JSON.stringify(newMessages) !== JSON.stringify(messages)) {
      // Get the last two message IDs
      const newActiveMessageIds = newMessages.slice(-2).map(msg => msg.id);
      setMessages(newMessages);
      setActiveMessageIds(newActiveMessageIds);
    }
  }, [currentTime, messages]);

  const shouldShow = (timestamp) => currentTime >= timestamp;

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        if (!hasStartedPlaying) {
          setHasStartedPlaying(true);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAudioEnd = () => setIsPlaying(false);

  const handleSpeedChange = (speed) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAliciaVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      {
        threshold: 0.3
      }
    );

    if (aliciaSectionRef.current) {
      observer.observe(aliciaSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={aliciaSectionRef} className="min-h-[92vh] flex flex-col justify-center items-center bg-background px-4 py-8">
      {/* Title section */}
      <div className={`
        text-center mb-8
        transition-opacity duration-700
        ${isPlaying ? 'opacity-30' : 'opacity-100'}
      `}>
        <div className={`
          transition-all duration-1000 transform
          ${isAliciaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}>
          <div className="w-full flex justify-center">
            <div className="inline-block">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-gray-100/10 flex items-center justify-center">
                  <Bot
                    className="w-7 h-7"
                    color="var(--color-company-blue)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </div>
                <h2 className="text-xl md:text-3xl font-bold">Meet Alicia</h2>
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg md:text-xl text-gray-400">
                  Your AI Assistant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content wrapper */}
      <div className={`
        flex
        transition-all
        duration-${ANIMATION_DURATION}
        ease-in-out
        ${hasStartedPlaying 
          ? 'md:flex-row flex-col gap-8 w-full max-w-[80vw]' 
          : 'flex-col gap-8 w-full md:w-[32rem]'}
      `}>
        {/* Audio and Transcription Container */}
        <div className="flex flex-col items-center flex-1">
          {/* Container for consistent width */}
          <div className={`w-full md:w-96 flex flex-col ${styles.section}`}>
            <AudioControls 
              audioRef={audioRef}
              progressRef={progressRef}
              isPlaying={isPlaying}
              hasStartedPlaying={hasStartedPlaying}
              currentTime={currentTime}
              duration={duration}
              audioUrl={audioUrl}
              handlePlayPause={handlePlayPause}
              handleProgressClick={handleProgressClick}
              formatTime={formatTime}
              styles={styles}
              animationDuration={ANIMATION_DURATION}
              onAudioEnd={handleAudioEnd}
              playbackSpeed={playbackSpeed}
              onSpeedChange={handleSpeedChange}
            />
          </div>

          {/* Separate container for Transcription with padding */}
          {hasStartedPlaying && (
            <div className={`w-full md:w-96 mt-4 p-4 ${styles.section}`}>
              <DemoTranscription
                messages={messages}
                isPlaying={isPlaying}
                animationDuration={ANIMATION_DURATION}
                activeMessageIds={activeMessageIds}
              />
            </div>
          )}
        </div>

        {hasStartedPlaying && (
          <div className="animate-fadeIn flex-1">
            <ConversationDisplay 
              hasStartedPlaying={hasStartedPlaying}
              timestamps={timestamps}
              shouldShow={shouldShow}
              handleNewLine={handleNewLine}
              styles={styles}
              AnimatedLine={AnimatedLine}
              currentTime={currentTime}
              isPlaying={isPlaying}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoSection;