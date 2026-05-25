import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LoadingAnimation = () => {
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          delay: Math.random() * 2000
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    // Loading phases
    const phaseTimer1 = setTimeout(() => setLoadingPhase(1), 500);
    const phaseTimer2 = setTimeout(() => setLoadingPhase(2), 1200);
    const phaseTimer3 = setTimeout(() => setLoadingPhase(3), 2000);

    return () => {
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      clearTimeout(phaseTimer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-500 bg-gradient-to-br from-primary via-primary-700 to-secondary flex items-center justify-center">
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-accent-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}ms`
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative text-center">
        {/* Crown Animation */}
        <div className="mb-8">
          <div 
            className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full royal-shadow-lg transition-all duration-1000 ${
              loadingPhase >= 1 ? 'scale-110 rotate-12' : 'scale-100'
            }`}
          >
            <Icon 
              name="Crown" 
              size={40} 
              color="white" 
              strokeWidth={2}
              className={`transition-all duration-800 ${
                loadingPhase >= 2 ? 'scale-125' : 'scale-100'
              }`}
            />
          </div>
          
          {/* Golden Ring Animation */}
          <div 
            className={`absolute inset-0 border-4 border-accent-400 rounded-full transition-all duration-1500 ${
              loadingPhase >= 1 ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
        </div>

        {/* Title Animation */}
        <div 
          className={`transition-all duration-800 ${
            loadingPhase >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
            Royal Portfolio
          </h1>
          <p className="font-caption text-primary-200 text-lg">
            Crafting Premium Experiences
          </p>
        </div>

        {/* Loading Progress */}
        <div 
          className={`mt-8 transition-all duration-500 ${
            loadingPhase >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse animation-delay-100"></div>
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse animation-delay-200"></div>
          </div>
          <p className="text-primary-300 text-sm">
            Preparing your royal experience...
          </p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8">
        <Icon name="Sparkles" size={24} color="#B8860B" className="animate-pulse opacity-60" />
      </div>
      <div className="absolute top-8 right-8">
        <Icon name="Sparkles" size={24} color="#B8860B" className="animate-pulse animation-delay-300 opacity-60" />
      </div>
      <div className="absolute bottom-8 left-8">
        <Icon name="Sparkles" size={24} color="#B8860B" className="animate-pulse animation-delay-200 opacity-60" />
      </div>
      <div className="absolute bottom-8 right-8">
        <Icon name="Sparkles" size={24} color="#B8860B" className="animate-pulse animation-delay-400 opacity-60" />
      </div>
    </div>
  );
};

export default LoadingAnimation;