"use client";

import React, { useState, useEffect, useRef } from 'react';
import { chapters, Sidebar, ChapterContent } from './patient_journey_components';

/* Chapter Section Component */
const ChapterSection = React.forwardRef(({ chapter, index }, ref) => (
  <section
    ref={ref}
    data-index={index}
    className="chapter-section h-screen w-full flex items-center justify-center"
    style={{ scrollSnapAlign: 'start' }}
  >
    <ChapterContent chapter={chapter} />
  </section>
));
ChapterSection.displayName = "ChapterSection";

const PatientJourney = () => {
  // 'initial' = not centered, 'transitioning' = animating, 'centered' = fully centered (sidebar visible)
  const [scrollMode, setScrollMode] = useState('initial');
  const [activeChapter, setActiveChapter] = useState(0);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(Date.now());

  // Keep a ref with the current scrollMode so event listeners always see the latest value.
  const scrollModeRef = useRef(scrollMode);
  useEffect(() => {
    scrollModeRef.current = scrollMode;
  }, [scrollMode]);

  // Create an array of refs—one for each chapter section.
  const chapterRefs = useRef([]);
  if (chapterRefs.current.length !== chapters.length) {
    chapterRefs.current = chapters.map(() => React.createRef());
  }

  // Scroll the container into view and set mode to "centered" (after a simulated timeout).
  const centerComponent = () => {
    if (!containerRef.current || scrollModeRef.current === 'transitioning') return;

    setScrollMode('transitioning');
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const targetScroll = window.scrollY + rect.top;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setScrollMode('centered');
    }, 500);
  };

  // Handle wheel events on the container.
  const handleScroll = (event) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 200) {
      event.preventDefault();
      return;
    }
    lastScrollTime.current = now;

    // If not yet centered, prevent scrolling and center the component.
    if (scrollModeRef.current !== 'centered') {
      event.preventDefault();
      if (scrollModeRef.current === 'initial') {
        centerComponent();
      }
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // If the user scrolls upward at the very top, exit the centered mode.
    if (container.scrollTop === 0 && event.deltaY < 0) {
      event.preventDefault();
      setScrollMode('transitioning');
      window.scrollTo({
        top: window.scrollY - window.innerHeight,
        behavior: 'smooth'
      });
      setTimeout(() => {
        setScrollMode('initial');
      }, 500);
    }
  };

  // Observe each chapter section to update the active chapter based on visibility.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveChapter(index);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6
      }
    );

    chapterRefs.current.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    return () => observer.disconnect();
  }, []);

  // Attach the wheel event listener to the container.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, []);

  // Observe the container's visibility in the viewport.
  // If less than 50% of the container is visible (scrolling away), reset to 'initial' mode.
  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.5 && scrollModeRef.current === 'centered') {
            setScrollMode('initial');
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(containerEl);
    return () => observer.disconnect();
  }, []);

  // Scroll to a specific chapter by using its ref.
  const scrollToChapter = (index) => {
    if (scrollModeRef.current !== 'centered') {
      centerComponent();
    }
    const targetEl = chapterRefs.current[index]?.current;
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      {scrollMode === 'centered' && (
        <Sidebar
          chapters={chapters}
          activeChapter={activeChapter}
          onChapterClick={scrollToChapter}
        />
      )}

      <div
        ref={containerRef}
        className={`h-screen overflow-y-auto scroll-smooth ${
          scrollMode === 'transitioning' ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        style={{
          scrollSnapType: scrollMode === 'centered' ? 'y mandatory' : 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {chapters.map((chapter, index) => (
          <ChapterSection
            key={index}
            ref={chapterRefs.current[index]}
            chapter={chapter}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientJourney;
