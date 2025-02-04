import React, { useState, useRef, useEffect } from 'react';
import AudioControls from './demo_components/AudioControls';
import ConversationDisplay from './demo_components/ConversationDisplay';
import DemoTranscription from './demo_components/DemoTranscription';
import { transcriptionData, timestamps } from './demo_components/demoData';

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

  const audioUrl = '/videos-and-audios/Demo.wav';

  const handleNewLine = (timestamp, content) => {
    if (!renderedLines.has(timestamp)) {
      console.log(`Rendering at ${timestamp}s:`, content);
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

  return (
    <div className="min-h-[92vh] flex flex-col justify-center items-center bg-background px-4 py-8">
      {/* Title section */}
      <div className={`
        text-center mb-8
        transition-opacity duration-700
        ${isPlaying ? 'opacity-30' : 'opacity-100'}
      `}>
        <h2 className="text-3xl md:text-3xl text-2xl font-semibold mb-2">
          Listen to your future assistant
        </h2>
        <p className="md:text-xl text-lg italic text-gray-300">
          Give ample time to your patients to explain their symptoms
        </p>
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