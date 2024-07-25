import { useState, useEffect } from 'react';

const useDelayedAppearance = (delay = 2000) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
};

export default useDelayedAppearance;