import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-700 to-secondary flex items-center justify-center px-4">
      <div className="text-center">
        {/* Royal Crown Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full royal-shadow-lg">
            <Icon name="Crown" size={40} color="white" strokeWidth={2} />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-white mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-accent-300 mb-4">
          Page Not Found
        </h2>

        <p className="text-primary-200 text-lg mb-8 max-w-md mx-auto">
          The royal page you're looking for seems to have vanished into the digital realm.
        </p>

        {/* Return Home Button */}
        <Link
          to="/hero-landing-page"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-medium px-8 py-3 rounded-royal-md royal-shadow hover:royal-shadow-md royal-transition"
        >
          <Icon name="Home" size={20} />
          <span>Return to Royal Portfolio</span>
        </Link>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 opacity-20">
          <Icon name="Sparkles" size={32} color="#B8860B" className="animate-pulse" />
        </div>
        <div className="absolute top-8 right-8 opacity-20">
          <Icon name="Sparkles" size={32} color="#B8860B" className="animate-pulse animation-delay-200" />
        </div>
        <div className="absolute bottom-8 left-8 opacity-20">
          <Icon name="Sparkles" size={32} color="#B8860B" className="animate-pulse animation-delay-400" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-20">
          <Icon name="Sparkles" size={32} color="#B8860B" className="animate-pulse animation-delay-300" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;