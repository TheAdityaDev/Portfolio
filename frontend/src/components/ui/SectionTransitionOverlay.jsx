import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SectionTransitionOverlay = ({ isActive, targetSection, onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('idle'); // idle, entering, active, exiting

  useEffect(() => {
    if (isActive) {
      setAnimationPhase('entering');
      
      const enterTimer = setTimeout(() => {
        setAnimationPhase('active');
      }, 150);

      const exitTimer = setTimeout(() => {
        setAnimationPhase('exiting');
      }, 400);

      const completeTimer = setTimeout(() => {
        setAnimationPhase('idle');
        onComplete && onComplete();
      }, 700);

      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isActive, onComplete]);

  if (animationPhase === 'idle') return null;

  const getSectionIcon = (section) => {
    switch (section) {
      case 'hero-landing-page': return 'Home';
      case 'about-skills-showcase': return 'User';
      case 'portfolio-gallery': return 'Briefcase';
      case 'contact-footer': return 'Mail';
      default: return 'Crown';
    }
  };

  const getSectionTitle = (section) => {
    switch (section) {
      case 'hero-landing-page': return 'Welcome Home';
      case 'about-skills-showcase': return 'About & Skills';
      case 'portfolio-gallery': return 'Portfolio Gallery';
      case 'contact-footer': return 'Get In Touch';
      default: return 'Royal Portfolio';
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-300 flex items-center justify-center transition-all duration-300 ${
        animationPhase === 'entering' || animationPhase === 'active' ?'opacity-100 visible' :'opacity-0 invisible'
      }`}
    >
      {/* Background with royal gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-primary via-primary-700 to-secondary transition-all duration-500 ${
          animationPhase === 'entering' ?'scale-110 opacity-0' 
            : animationPhase === 'active' ?'scale-100 opacity-95' :'scale-90 opacity-0'
        }`}
      />

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-accent-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-accent-300 rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-accent-500 rounded-full animate-pulse animation-delay-400"></div>
      </div>

      {/* Content */}
      <div 
        className={`relative text-center text-white transition-all duration-400 ${
          animationPhase === 'entering' ?'transform translate-y-8 opacity-0'
            : animationPhase === 'active' ?'transform translate-y-0 opacity-100' :'transform -translate-y-8 opacity-0'
        }`}
      >
        {/* Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full royal-shadow-lg">
            <Icon 
              name={getSectionIcon(targetSection)} 
              size={32} 
              color="white" 
              strokeWidth={2}
              className={`transition-transform duration-500 ${
                animationPhase === 'active' ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          {getSectionTitle(targetSection)}
        </h2>

        {/* Subtitle */}
        <p className="font-caption text-primary-200 text-lg">
          Transitioning to your destination
        </p>

        {/* Loading indicator */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse animation-delay-100"></div>
          <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse animation-delay-200"></div>
        </div>
      </div>

      {/* Royal flourish elements */}
      <div className="absolute top-8 left-8">
        <Icon name="Sparkles" size={24} color="#B8860B" className="animate-pulse" />
      </div>
      <div className="absolute top-8 right-8">
        <Icon name="Sparkles" size={24} color="#B8860B" className="animate-pulse animation-delay-300" />
      </div>
      <div className="absolute bottom-8 left-8">
        <Icon name="Sparkles" size={24} color="#B8860B" className="animate-pulse animation-delay-200" />
      </div>
      <div className="absolute bottom-8 right-8">
        <Icon name="Sparkles" size={24} color="#B8860B" className="animate-pulse animation-delay-400" />
      </div>
    </div>
  );
};

export default SectionTransitionOverlay;