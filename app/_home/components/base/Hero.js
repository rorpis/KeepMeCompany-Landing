"use client";

import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';

const Hero = () => {
  const { locale } = useParams();
  const [isVisible, setIsVisible] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  // Define video URLs based on locale
  const videoUrl = locale === 'en-UK' 
    ? 'https://youtu.be/6x-PUCgZO08'
    : 'https://youtu.be/MtUe9tEG1qM';

  console.log('Current locale:', locale);
  console.log('Selected video URL:', videoUrl);

  // Convert YouTube URL to embed format if needed
  const getEmbedUrl = (url) => {
    if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop();
      // Use controls=1 to keep the progress bar and modestbranding=1 to reduce branding
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3&disablekb=1&showinfo=0&cc_load_policy=0&loop=1&playlist=${videoId}&share=1`;
    }

    if (url.includes('youtube.com/embed')) {
      const videoId = url.split('/').pop();
      return `${url}?autoplay=1&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3&disablekb=1&showinfo=0&cc_load_policy=0&loop=1&playlist=${videoId}&share=1`;
    }

    // If for some reason it's already in the correct format, just return it
    return url;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Delay showing the video until the fade completes
      setTimeout(() => setShowVideo(true), 1000);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[92vh] flex justify-center items-center bg-background">
      {/* Text that fades out */}
      {!showVideo && (
        <div
          className="text-center text-5xl font-bold leading-relaxed"
          style={{
            transition: "opacity 1s",
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div className="text-white">
            <span>Classic cars need new </span>
            <span style={{ color: "var(--color-company-blue)" }}>Engines</span>
          </div>
          <div className="text-white">
            <span>Modern Practices need </span>
            <span style={{ color: "var(--color-company-blue)" }}>AI</span>
          </div>
        </div>
      )}

      {/* Video that shows after fade */}
      {showVideo && (
        <div className="w-[60%] aspect-video rounded-2xl border-2 border-white overflow-hidden">
          <iframe
            className="w-full h-full"
            src={getEmbedUrl(videoUrl)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Hero;
