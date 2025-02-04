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
  return (
    <div className={`
      transition-all
      duration-${animationDuration}
      ease-in-out
      h-[110px]
    `}>
      <audio 
        ref={audioRef}
        src={audioUrl}
        className="hidden"
        onEnded={onAudioEnd}
      />
      
      <div className="px-6 py-5 flex flex-col">
        <div className="flex items-center gap-4">
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
        
        {/* Speed controls */}
        <div className="flex justify-center gap-2 mt-2">
          {[1, 1.5, 2].map((speed) => (
            <button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              className={`
                px-2 py-0.5 text-xs rounded-full
                transition-all duration-200
                ${playbackSpeed === speed
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'}
              `}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioControls; 