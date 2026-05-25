import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialLinks = () => {
  const socialPlatforms = [
    {
      id: 1,
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: 'www.linkedin.com/in/adityapatil-fullstackdeveloper',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      description: 'Professional network'
    },
    {
      id: 2,
      name: 'GitHub',
      icon: 'Github',
      url: 'https://github.com/TheAdityaDev',
      color: 'from-gray-700 to-gray-800',
      hoverColor: 'hover:from-gray-800 hover:to-gray-900',
      description: 'Code repositories'
    },
    {
      id: 3,
      name: 'X',
      icon: 'Twitter',
      url: 'https://x.com/Aditya2125Patil',
      color: 'from-sky-400 to-sky-500',
      hoverColor: 'hover:from-sky-500 hover:to-sky-600',
      description: 'Latest updates'
    },
    // {
    //   id: 4,
    //   name: 'Dribbble',
    //   icon: 'Dribbble',
    //   url: 'https://dribbble.com/royalportfolio',
    //   color: 'from-pink-500 to-pink-600',
    //   hoverColor: 'hover:from-pink-600 hover:to-pink-700',
    //   description: 'Design showcase'
    // },
    // {
    //   id: 5,
    //   name: 'Behance',
    //   icon: 'Palette',
    //   url: 'https://behance.net/royalportfolio',
    //   color: 'from-purple-500 to-purple-600',
    //   hoverColor: 'hover:from-purple-600 hover:to-purple-700',
    //   description: 'Creative portfolio'
    // },
    // {
    //   id: 6,
    //   name: 'Instagram',
    //   icon: 'Instagram',
    //   url: 'https://instagram.com/royalportfolio',
    //   color: 'from-gradient-to-r from-purple-500 via-pink-500 to-red-500',
    //   hoverColor: 'hover:from-purple-600 hover:via-pink-600 hover:to-red-600',
    //   description: 'Behind the scenes'
    // }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="mb-8">
        <h3 className="font-heading text-2xl font-bold text-primary mb-2">
          Connect & Follow
        </h3>
        <p className="text-text-secondary">
          Stay updated with my latest work and insights
        </p>
      </div>

      {/* Social Links Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialPlatforms.map((platform, index) => (
          <motion.a
            key={platform.id}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.div
              className="bg-white rounded-royal-lg royal-shadow hover:royal-shadow-lg royal-transition p-4 text-center relative overflow-hidden"
              variants={floatingVariants}
              animate="float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 royal-transition`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} ${platform.hoverColor} rounded-royal flex items-center justify-center mx-auto mb-3 royal-shadow-sm group-hover:royal-shadow royal-transition`}>
                  <Icon 
                    name={platform.icon} 
                    size={20} 
                    color="white" 
                    strokeWidth={2}
                  />
                </div>

                {/* Platform Name */}
                <h4 className="font-semibold text-primary group-hover:text-accent-600 royal-transition text-sm">
                  {platform.name}
                </h4>

                {/* Description */}
                <p className="text-xs text-text-secondary mt-1">
                  {platform.description}
                </p>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400/0 to-accent-600/0 group-hover:from-accent-400/5 group-hover:to-accent-600/5 royal-transition"></div>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-royal-lg p-6 text-center text-white mt-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Icon name="Heart" size={20} className="animate-pulse" />
          <h4 className="font-heading text-lg font-semibold">
            Let's Build Something Amazing
          </h4>
          <Icon name="Heart" size={20} className="animate-pulse animation-delay-200" />
        </div>
        <p className="text-accent-100 text-sm">
          Follow my journey and get inspired by the latest in creative technology
        </p>
      </motion.div>

      {/* Floating Social Icons */}
      <div className="hidden lg:block">
        <motion.div
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {socialPlatforms.slice(0, 3).map((platform, index) => (
            <motion.a
              key={`floating-${platform.id}`}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-10 h-10 bg-white royal-shadow hover:royal-shadow-md rounded-full flex items-center justify-center group royal-transition"
              whileHover={{ scale: 1.1, x: -5 }}
              animate={{
                y: [0, -5, 0],
                transition: {
                  duration: 2 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Icon 
                name={platform.icon} 
                size={16} 
                color="#6B7280" 
                className="group-hover:text-accent-600 royal-transition"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SocialLinks;