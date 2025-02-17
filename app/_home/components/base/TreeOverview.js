import React, { useState } from 'react';

const TreeOverview = () => {
  const videos = [
    {
      src: "/videos-and-audios/DemoVaccinesQOF.mp4",
      title: "Boost your QOF points (VI001) with scalable outreach"
    },
    {
      src: "/videos-and-audios/DemoVaccinesQOF.mp4",
      title: "Boost your QOF points with scalable outreach2"
    }
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-primary">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
        Pre-made experiences to <br />bring patients to your door
      </h2>
      
      <div className="max-w-2xl mx-auto relative">
        <button 
          onClick={prevVideo}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 z-20"
          aria-label="Previous video"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative w-full">
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: 'linear-gradient(to bottom, black 10%, transparent 15%)',
              zIndex: 2
            }}
          />
          
          <div className="transition-opacity duration-300 ease-in-out">
            <video 
              key={currentVideoIndex}
              className="w-full rounded-lg shadow-lg"
              style={{
                transformOrigin: 'center center'
              }}
              controlsList="nodownload noplaybackrate"
              controls
              preload="metadata"
              disablePictureInPicture
            >
              <source 
                src={videos[currentVideoIndex].src}
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <button 
          onClick={nextVideo}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 z-20"
          aria-label="Next video"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <h3 className="text-lg font italic text-white text-center">
          {videos[currentVideoIndex].title}
        </h3>
      </div>
    </section>
  );
};

export default TreeOverview;
