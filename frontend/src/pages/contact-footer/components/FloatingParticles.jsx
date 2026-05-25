import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = ({ isActive }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 12 }, (_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.7 + 0.3
      }));
      setParticles(newParticles);
    }
  }, [isActive]);

  const particleVariants = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    visible: (particle) => ({
      opacity: particle.opacity,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: particle.delay
      }
    }),
    float: (particle) => ({
      y: [0, -20, 0],
      x: [0, Math.sin(particle.id) * 10, 0],
      rotate: [0, 360],
      transition: {
        duration: particle.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: particle.delay
      }
    })
  };

  const sparkleVariants = {
    twinkle: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Golden Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          variants={particleVariants}
          initial="hidden"
          animate={["visible", "float"]}
          custom={particle}
        >
          <div className="w-full h-full bg-gradient-to-br from-accent-400 to-accent-600 rounded-full opacity-80 blur-sm"></div>
        </motion.div>
      ))}

      {/* Sparkle Effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4"
        variants={sparkleVariants}
        animate="twinkle"
      >
        <div className="w-full h-full bg-accent-400 rounded-full opacity-60"></div>
      </motion.div>

      <motion.div
        className="absolute top-3/4 right-1/3 w-3 h-3"
        variants={sparkleVariants}
        animate="twinkle"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="w-full h-full bg-accent-500 rounded-full opacity-70"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/2 w-2 h-2"
        variants={sparkleVariants}
        animate="twinkle"
        style={{ animationDelay: '1s' }}
      >
        <div className="w-full h-full bg-accent-300 rounded-full opacity-50"></div>
      </motion.div>

      {/* Floating Royal Elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 opacity-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <div className="w-8 h-8 border-2 border-accent-400 rounded-full"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/3 opacity-15"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
          rotate: [0, -10, 10, 0],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }
        }}
      >
        <div className="w-6 h-6 border border-primary-400 rounded-full"></div>
      </motion.div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-br from-accent-400/10 to-accent-600/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/6 w-12 h-12 bg-gradient-to-br from-primary-400/10 to-primary-600/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }
        }}
      />
    </div>
  );
};

export default FloatingParticles;