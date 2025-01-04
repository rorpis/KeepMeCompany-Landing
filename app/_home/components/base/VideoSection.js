'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const VideoSection = () => {
  const { locale } = useParams();

  // Define video URLs based on locale
  const videoUrl = locale === 'en-UK' 
    ? 'https://youtu.be/6x-PUCgZO08'
    : 'https://youtu.be/MtUe9tEG1qM';

  // Convert YouTube URL to embed format if needed
  const getEmbedUrl = (url) => {
    if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3&disablekb=1&showinfo=0&cc_load_policy=0&loop=1&playlist=${videoId}&share=1`;
    }

    if (url.includes('youtube.com/embed')) {
      const videoId = url.split('/').pop();
      return `${url}?autoplay=1&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3&disablekb=1&showinfo=0&cc_load_policy=0&loop=1&playlist=${videoId}&share=1`;
    }

    return url;
  };

  return (
    <div className="min-h-[92vh] flex justify-center items-center bg-background">
      <div className="w-[60%] aspect-video rounded-2xl border-2 border-white overflow-hidden">
        <iframe
          className="w-full h-full"
          src={getEmbedUrl(videoUrl)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection; 