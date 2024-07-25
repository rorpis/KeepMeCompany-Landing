import { useState, useEffect, useCallback } from 'react';

const useFullPageScroll = (sectionRefs) => {
  const [currentSection, setCurrentSection] = useState(0);

  const scrollToSection = useCallback((index) => {
    sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(index);
  }, [sectionRefs]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;

    const currentIndex = sectionRefs.findIndex((ref, index) => {
      const element = ref.current;
      if (!element) return false;
      const nextElement = sectionRefs[index + 1]?.current;
      const elementTop = element.offsetTop;
      const elementBottom = nextElement ? nextElement.offsetTop : document.documentElement.scrollHeight;
      return scrollPosition >= elementTop - viewportHeight / 2 && scrollPosition < elementBottom - viewportHeight / 2;
    });

    if (currentIndex !== -1 && currentIndex !== currentSection) {
      setCurrentSection(currentIndex);
    }
  }, [sectionRefs, currentSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { currentSection, scrollToSection };
};

export default useFullPageScroll;