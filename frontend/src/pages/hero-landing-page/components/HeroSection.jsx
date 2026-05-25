import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const HeroSection = ({ isVisible, scrollY }) => {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const fullText = "Premium Digital Experiences";

  // Typewriter effect
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      if (isTyping && currentIndex < fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isTyping) {
        setIsTyping(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex, isTyping, isVisible, fullText]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-700 to-secondary overflow-hidden">
      {/* Parallax Background Layers */}
      <div className="absolute inset-0">
        {/* Layer 1 - Deep background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary-800 to-secondary opacity-80"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        {/* Layer 2 - Geometric patterns */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-accent-400 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-48 h-48 border border-accent-300 rounded-royal animate-pulse animation-delay-200" />
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-accent-500 rounded-full animate-pulse animation-delay-400" />
        </div>

        {/* Layer 3 - Floating elements */}
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          {/* Golden particles */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-accent-400 rounded-full opacity-60 animate-pulse" />
          <div className="absolute top-40 right-32 w-2 h-2 bg-accent-500 rounded-full opacity-80 animate-pulse animation-delay-300" />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-accent-300 rounded-full opacity-70 animate-pulse animation-delay-500" />
          <div className="absolute bottom-20 right-20 w-5 h-5 bg-accent-600 rounded-full opacity-50 animate-pulse animation-delay-200" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto mt-10">
          {/* Royal Badge */}
          <div 
            className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2  rounded-full royal-border mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
          >
            <Icon name="Crown" size={16} color="#B8860B" />
            <span className="text-accent-300 text-sm font-medium">Premium Portfolio Experience</span>
            <Icon name="Sparkles" size={16} color="#B8860B" />
          </div>

          {/* Main Headline with Typewriter Effect */}
          <h1 
            className={`font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 transition-all duration-1200 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
            }`}
          >
            Crafting{' '}
            <span className="text-accent-400 relative">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          {/* Professional Tagline */}
          <p 
            className={`text-primary-200 text-xl md:text-2xl mb-12 max-w-3xl mx-auto transition-all duration-1400 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
          >
            Transforming ideas into elegant digital solutions with royal attention to detail and premium craftsmanship.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1600 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
          >
            <Link
              to="/portfolio-gallery"
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold px-8 py-4 rounded-royal-md royal-shadow-lg hover:royal-shadow-xl royal-transition overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-500 opacity-0 group-hover:opacity-100 royal-transition" />
              <Icon name="Briefcase" size={20} className="relative z-10 group-hover:scale-110 royal-transition" />
              <span className="relative z-10">View My Work</span>
              <Icon name="ArrowRight" size={20} className="relative z-10 group-hover:translate-x-1 royal-transition" />
            </Link>

            <Link
              to="/contact-footer"
              className="group inline-flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-royal-md royal-border hover:border-accent-400 royal-transition backdrop-blur-sm"
            >
              <Icon name="Mail" size={20} className="group-hover:scale-110 royal-transition" />
              <span>Let's Connect</span>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div 
            className={`mt-16 transition-all duration-2000 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <p className="text-primary-300 text-sm">Discover More</p>
              <div className="w-6 h-10 border-2 border-accent-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-accent-400 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Royal Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-8 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)` }}
        >
          <Icon name="Crown" size={48} color="#B8860B" className="animate-pulse" />
        </div>
        <div 
          className="absolute top-1/3 right-8 opacity-15"
          style={{ transform: `translateY(${scrollY * 0.15}px) rotate(${-scrollY * 0.03}deg)` }}
        >
          <Icon name="Gem" size={40} color="#B8860B" className="animate-pulse animation-delay-300" />
        </div>
        <div 
          className="absolute bottom-1/4 left-1/4 opacity-25"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <Icon name="Sparkles" size={32} color="#B8860B" className="animate-pulse animation-delay-500" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;