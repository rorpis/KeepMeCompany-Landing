import React, { useState, useRef, useEffect } from 'react';

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

const AudioSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [renderedLines, setRenderedLines] = useState(new Set());
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const audioUrl = '/videos-and-audios/Demo.wav';

  const timestamps = {
    patient: {
      info: 23
    },
    condition: {
      main: 35
    },
    symptoms: {
      weightLoss: 37,
      anxiety: 37,
      jitteriness: 40,
      nervousness: 55,
      irritability: 57,
      insomnia: 65
    },
    pattern: {
      duration: 47,
      seasonal: 20,
      severity: 22
    },
    others: {
      appetite: 97,
      headaches: 90,
      changes: 80
    }
  };

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

  const sectionStyles = "backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 shadow-lg";
  const sectionHeaderStyles = "text-white/60 mb-2";

  return (
    <div className="min-h-[92vh] flex flex-col justify-center items-center bg-background">
      {/* Title section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold mb-2">
          Listen to your future assistant
        </h2>
        <p className="text-xl italic text-gray-300">
          Give ample time to your patients to explain their symptoms
        </p>
      </div>
      
      {/* Main content wrapper */}
      <div className={`
        flex
        transition-all
        duration-700
        ease-in-out
        ${hasStartedPlaying 
          ? 'flex-row gap-8 w-full max-w-[80vw]' 
          : 'flex-col gap-8 w-[32rem]'}
      `}>
        {/* Audio Player */}
        <div className={`
          ${sectionStyles}
          transition-all
          duration-700
          ease-in-out
          h-[90px]
          ${hasStartedPlaying 
            ? 'w-96 self-start' 
            : 'w-full'}
        `}>
          <audio 
            ref={audioRef}
            src={audioUrl}
            className="hidden"
            onEnded={() => setIsPlaying(false)}
          />
          
          <div className="px-6 py-5 flex items-center gap-4">
            {/* Play button */}
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={handlePlayPause}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center 
                         transition-transform duration-200 hover:scale-105 focus:outline-none 
                         focus:ring-2 focus:ring-white/50 shadow-md"
              >
                <div className={`transform transition-transform duration-200 ${isPlaying ? 'scale-90' : 'scale-100'}`}>
                  {isPlaying ? (
                    <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </button>
            </div>

            {/* Progress bar */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <div 
                ref={progressRef}
                className="w-full h-1.5 bg-white/20 rounded-full mb-2 cursor-pointer relative overflow-hidden"
                onClick={handleProgressClick}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-sm text-white/60">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation Summary */}
        <div className={`
          ${sectionStyles}
          p-6
          text-white
          transition-all
          duration-700
          ease-in-out
          ${hasStartedPlaying ? 'flex-1' : 'w-full'}
        `}>
          <h3 className="text-xl font-semibold mb-4">Conversation Summary</h3>
          
          <div className="space-y-6">
            {/* Patient Section */}
            <div>
              <p className={sectionHeaderStyles}>Patient</p>
              <AnimatedLine 
                show={shouldShow(timestamps.patient.info)}
                content={<p>Alex Morgan, 33</p>}
                onRender={handleNewLine}
                timestamp={timestamps.patient.info}
              />
            </div>

            {/* Primary Condition Section */}
            <div>
              <p className={sectionHeaderStyles}>Primary Condition or Complaint</p>
              <AnimatedLine 
                show={shouldShow(timestamps.condition.main)}
                content={<p>Weight loss and anxiety</p>}
                onRender={handleNewLine}
                timestamp={timestamps.condition.main}
              />
            </div>

            {/* Symptoms Section */}
            <div>
              <p className={sectionHeaderStyles}>Primary Symptoms</p>
              <ul className="list-disc list-inside">
                <AnimatedLine 
                  show={shouldShow(timestamps.symptoms.weightLoss)}
                  content={<li>Weight loss</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.symptoms.weightLoss}
                />
                <AnimatedLine 
                  show={shouldShow(timestamps.symptoms.anxiety)}
                  content={<li>Constant anxiety</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.symptoms.anxiety}
                />
                <AnimatedLine 
                  show={shouldShow(timestamps.symptoms.jitteriness)}
                  content={<li>Jitteriness</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.symptoms.jitteriness}
                />
                <AnimatedLine 
                  show={shouldShow(timestamps.symptoms.nervousness)}
                  content={<li>Nervousness</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.symptoms.nervousness}
                />
                <AnimatedLine 
                  show={shouldShow(timestamps.symptoms.irritability)}
                  content={<li>Irritability</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.symptoms.irritability}
                />
                <AnimatedLine 
                  show={shouldShow(timestamps.symptoms.insomnia)}
                  content={<li>Insomnia</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.symptoms.insomnia}
                />
              </ul>
            </div>

            {/* Pattern Section */}
            <div>
              <p className={sectionHeaderStyles}>Pattern</p>
              <ul className="list-disc list-inside">
                <AnimatedLine 
                  show={shouldShow(timestamps.pattern.duration)}
                  content={<li>Duration: 3 months</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.pattern.duration}
                />
              </ul>
            </div>

            {/* Others Section */}
            <div>
              <p className={sectionHeaderStyles}>Others</p>
              <ul className="list-disc list-inside">
                <AnimatedLine 
                  show={shouldShow(timestamps.others.appetite)}
                  content={<li>Increased appetite</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.others.appetite}
                />
                <AnimatedLine 
                  show={shouldShow(timestamps.others.headaches)}
                  content={<li>No headaches reported</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.others.headaches}
                />
                <AnimatedLine 
                  show={shouldShow(timestamps.others.changes)}
                  content={<li>No recent changes in work or personal life reported</li>}
                  onRender={handleNewLine}
                  timestamp={timestamps.others.changes}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioSection;