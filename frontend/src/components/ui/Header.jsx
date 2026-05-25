import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-landing-page');
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/hero-landing-page', 
      anchor: '#hero',
      icon: 'Home',
      tooltip: 'Return to hero section'
    },
    { 
      label: 'About', 
      path: '/about-skills-showcase', 
      anchor: '#about',
      icon: 'User',
      tooltip: 'Personal story and skills showcase'
    },
    { 
      label: 'Portfolio', 
      path: '/portfolio-gallery', 
      anchor: '#portfolio',
      icon: 'Briefcase',
      tooltip: 'View my professional work'
    },
    { 
      label: 'Contact', 
      path: '/contact-footer', 
      anchor: '#contact',
      icon: 'Mail',
      tooltip: 'Get in touch'
    },
    { 
      label: 'Resume', 
      path: '/resume', 
      anchor: '#resume',
      icon: 'File',
      tooltip: 'Check the Resume'
    },
    { 
      label: 'Achievements', 
      path: '/achievements', 
      anchor: '#achievements',
      icon: 'BadgeCheck',
      tooltip: 'Check the Achievements'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navigationItems.find(item => item.path === currentPath);
    if (currentItem) {
      setActiveSection(currentItem.path.replace('/', ''));
    }
  }, [location.pathname]);

  const handleNavClick = (item) => {
    setActiveSection(item.path.replace('/', ''));
    setIsMobileMenuOpen(false);
    
    if (item.anchor && window.location.pathname === item.path) {
      const element = document.querySelector(item.anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 royal-transition ${
          isScrolled 
            ? 'bg-primary/95 backdrop-blur-md royal-shadow-md' 
            : 'bg-primary/80'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to="/hero-landing-page" 
              className="flex items-center space-x-3 group"
              onClick={() => handleNavClick(navigationItems[0])}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-royal-md flex items-center justify-center royal-shadow-sm group-hover:royal-shadow transition-all duration-200">
                  <Icon 
                    name="Crown" 
                    size={20} 
                    color="white" 
                    strokeWidth={2.5}
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading text-xl font-bold text-white group-hover:text-accent-200 royal-transition">
                  Aditya's Portfolio
                </h1>
                <p className="font-caption text-xs text-primary-200 group-hover:text-accent-300 royal-transition">
                  Creative Excellence
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => handleNavClick(item)}
                  className={`group relative px-4 py-2 rounded-royal text-sm font-medium royal-transition ${
                    activeSection === item.path.replace('/', '')
                      ? 'text-accent-300 bg-white/10' :'text-white hover:text-accent-200 hover:bg-white/5'
                  }`}
                  title={item.tooltip}
                >
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={item.icon} 
                      size={16} 
                      className="group-hover:scale-110 royal-transition" 
                    />
                    <span>{item.label}</span>
                  </div>
                  {activeSection === item.path.replace('/', '') && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent-400 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-royal text-white hover:bg-white/10 royal-transition"
              aria-label="Toggle mobile menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                className="royal-transition" 
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Panel */}
      <div 
        className={`fixed inset-0 z-200 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-primary/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMobileMenu}
        ></div>

        {/* Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-primary royal-shadow-lg transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-royal flex items-center justify-center">
                  <Icon name="Crown" size={16} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-white">My Portfolio</h2>
                  <p className="font-caption text-xs text-primary-200">Creative Excellence</p>
                </div>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-royal text-white hover:bg-white/10 royal-transition"
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-6">
              <nav className="space-y-2 px-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => handleNavClick(item)}
                    className={`group flex items-center space-x-4 px-4 py-3 rounded-royal-md royal-transition ${
                      activeSection === item.path.replace('/', '')
                        ? 'text-accent-300 bg-white/10' :'text-white hover:text-accent-200 hover:bg-white/5'
                    }`}
                  >
                    <div className={`p-2 rounded-royal ${
                      activeSection === item.path.replace('/', '')
                        ? 'bg-accent-500/20' :'bg-white/5 group-hover:bg-white/10'
                    } royal-transition`}>
                      <Icon 
                        name={item.icon} 
                        size={18} 
                        className="group-hover:scale-110 royal-transition" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-primary-200 group-hover:text-accent-300 royal-transition">
                        {item.tooltip}
                      </div>
                    </div>
                    {activeSection === item.path.replace('/', '') && (
                      <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-white/10">
              <div className="text-center">
                <p className="font-caption text-sm text-primary-200">
                  Crafted with royal elegance
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Icon name="Sparkles" size={14} color="#B8860B" />
                  <span className="text-xs text-accent-400 font-medium">Premium Experience</span>
                  <Icon name="Sparkles" size={14} color="#B8860B" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;