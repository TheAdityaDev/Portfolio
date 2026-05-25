import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ScrollToTopButton = ({ isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const crownVariants = {
    idle: {
      rotate: 0,
      scale: 1
    },
    hover: {
      rotate: [0, -10, 10, -5, 5, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const sparkleVariants = {
    animate: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-200 w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white rounded-full royal-shadow-lg hover:royal-shadow-xl royal-transition flex items-center justify-center group"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          aria-label="Scroll to top"
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full opacity-0 group-hover:opacity-20 royal-transition blur-lg"></div>
          
          {/* Crown Icon */}
          <motion.div
            variants={crownVariants}
            initial="idle"
            whileHover="hover"
            className="relative z-10"
          >
            <Icon 
              name="Crown" 
              size={20} 
              color="white" 
              strokeWidth={2.5}
            />
          </motion.div>

          {/* Sparkle Effects */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3"
            variants={sparkleVariants}
            animate="animate"
          >
            <Icon name="Sparkles" size={12} color="#FFD700" />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 -left-1 w-2 h-2"
            variants={sparkleVariants}
            animate="animate"
            style={{ animationDelay: '0.5s' }}
          >
            <Icon name="Star" size={8} color="#FFD700" />
          </motion.div>

          <motion.div
            className="absolute top-0 left-0 w-2 h-2"
            variants={sparkleVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
          >
            <Icon name="Sparkles" size={8} color="#FFD700" />
          </motion.div>

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full border-2 border-accent-300 opacity-0 group-hover:opacity-100 group-hover:scale-150 royal-transition duration-500"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;