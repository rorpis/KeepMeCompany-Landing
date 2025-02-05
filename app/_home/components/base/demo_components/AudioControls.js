import { useMemo } from 'react';

const AudioControls = ({
  audioRef,
  progressRef,
  isPlaying,
  hasStartedPlaying,
  currentTime,
  duration,
  audioUrl,
  handlePlayPause,
  handleProgressClick,
  formatTime,
  styles,
  animationDuration,
  onAudioEnd,
  playbackSpeed,
  onSpeedChange
}) => {
  const speeds = [1, 1.5, 2];
  
  const handleSpeedClick = () => {
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    onSpeedChange(speeds[nextIndex]);
  };

  // Generate random heights for waveform bars only once
  const bars = useMemo(() => 
    Array.from({ length: 70 }, () => 
      Math.random() * 0.7 + 0.3
    ), []
  );

  return (
    <div className={`
      transition-all
      duration-${animationDuration}
      ease-in-out
      h-auto
    `}>
      <audio 
        ref={audioRef}
        src={audioUrl}
        className="hidden"
        onEnded={onAudioEnd}
      />
      
      <div className="px-6 py-4 flex flex-col gap-2">
        {/* Controls row: Play button, waveform, and speed */}
        <div className="flex items-center gap-4">
          {/* Play button */}
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center 
                     transition-transform duration-200 hover:scale-105 focus:outline-none 
                     focus:ring-2 focus:ring-white/50 shadow-md flex-shrink-0"
          >
            <div className={`transform transition-transform duration-200 ${isPlaying ? 'scale-90' : 'scale-100'}`}>
              {isPlaying ? (
                <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </button>

          {/* Waveform */}
          <div 
            ref={progressRef}
            className="flex-1 h-8 cursor-pointer relative overflow-hidden"
            onClick={handleProgressClick}
          >
            <div className="absolute inset-0 flex items-center gap-[2px]">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 h-full flex items-center"
                >
                  <div 
                    className={`w-full transition-all duration-200 ${
                      (index / bars.length) <= (currentTime / duration)
                        ? 'bg-white'
                        : 'bg-white/20'
                    }`}
                    style={{
                      height: `${height * 100}%`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Speed control button */}
          <button
            onClick={handleSpeedClick}
            className="w-12 px-2 py-1 text-xs rounded-full bg-white/10 text-white/60 
                     hover:bg-white/20 transition-all duration-200 flex-shrink-0 text-center"
          >
            {playbackSpeed}x
          </button>
        </div>

        {/* Timestamps row */}
        <div className="flex justify-between text-sm text-white/60 px-14">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioControls; 
