import React from 'react';

const useTransitionNumber = (target, speed = 0.05) => {
  const [current, setCurrent] = React.useState(target);

  React.useEffect(() => {
    // Don't animate if the difference is too small (0.01 for decimal precision)
    if (Math.abs(target - current) < 0.01) return;

    let frameId;
    
    const animate = () => {
      setCurrent(prev => {
        const next = prev + (target - prev) * speed;
        // Stop if we're close enough
        return Math.abs(target - next) < 0.01 ? target : next;
      });
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(frameId);
  }, [target, speed, current]);

  return current;
};

export default useTransitionNumber; 