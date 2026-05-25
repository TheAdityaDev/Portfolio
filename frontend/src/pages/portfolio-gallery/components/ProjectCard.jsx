import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectCard = forwardRef(({ project, index, isVisible, onClick }, ref) => {


  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hover: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      data-card-id={project._id || project.id}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit="exit"
      layout
      whileHover="hover"
      className="group relative bg-white rounded-royal-lg overflow-hidden royal-shadow hover:royal-shadow-lg royal-transition cursor-pointer"
      onClick={onClick}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-medium px-3 py-1 rounded-royal-full royal-shadow-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} />
            <span>Featured</span>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <motion.div variants={imageVariants} className="w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          variants={overlayVariants}
          initial={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-800/50 to-transparent opacity-0 flex items-end justify-center p-6"
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white text-primary-900 px-6 py-2 rounded-royal-full font-medium hover:bg-accent-100 royal-transition flex items-center space-x-2"
          >
            <Icon name="Eye" size={16} />
            <span>View Details</span>
          </motion.button>
        </motion.div>

        {/* Floating Animation Elements */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 royal-transition">
          <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 royal-transition animation-delay-200">
          <div className="w-1 h-1 bg-accent-300 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Year */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-royal-full text-xs font-medium bg-primary-100 text-primary-700">
            {project.category}
          </span>
          <span className="text-xs text-text-secondary font-medium">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-semibold text-primary-900 mb-3 group-hover:text-accent-600 royal-transition">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="text-xs bg-surface text-text-secondary px-2 py-1 rounded-royal border border-primary-100"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-accent-600 font-medium">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center space-x-4">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 text-accent-600 hover:text-accent-700 text-sm font-medium royal-transition"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="ExternalLink" size={14} />
              <span>Live Site</span>
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 text-text-secondary hover:text-primary-700 text-sm font-medium royal-transition"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="Github" size={14} />
              <span>Code</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-200 rounded-royal-lg royal-transition pointer-events-none"></div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;