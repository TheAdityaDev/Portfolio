import React, { useState, useEffect } from 'react';

const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-150 h-1">
      <div 
        className="h-full bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600 transition-all duration-200 ease-out royal-shadow-sm"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: scrollProgress > 0 ? '0 0 10px rgba(184, 134, 11, 0.5)' : 'none'
        }}
      >
        <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-r from-transparent to-accent-300 opacity-75"></div>
      </div>
    </div>
  );
};

export default ScrollProgressIndicator;