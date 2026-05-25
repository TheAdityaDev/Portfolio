import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2, duration: 0.4 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-primary-900/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-royal-lg royal-shadow-lg overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-royal-full flex items-center justify-center royal-shadow hover:royal-shadow-md royal-transition"
            >
              <Icon name="X" size={20} color="var(--color-primary)" />
            </button>

            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Image Section */}
              <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-sm font-medium px-3 py-2 rounded-royal-full royal-shadow">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} />
                      <span>Featured Project</span>
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent lg:hidden"></div>
              </div>

              {/* Content Section */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto"
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-royal-full text-sm font-medium bg-primary-100 text-primary-700">
                      {project.category}
                    </span>
                    <span className="text-sm text-text-secondary font-medium">
                      {project.year}
                    </span>
                  </div>
                  
                  <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary-900 mb-4">
                    {project.title}
                  </h2>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="font-heading text-lg font-semibold text-primary-900 mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-gradient-to-r from-accent-100 to-accent-50 text-accent-700 px-3 py-2 rounded-royal-full text-sm font-medium border border-accent-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-6 py-3 rounded-royal-full font-medium royal-shadow hover:royal-shadow-md royal-transition"
                    >
                      <Icon name="ExternalLink" size={18} />
                      <span>View Live Site</span>
                    </motion.a>
                  )}
                  
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center space-x-2 bg-white border-2 border-primary-200 hover:border-primary-300 text-primary-700 hover:text-primary-800 px-6 py-3 rounded-royal-full font-medium royal-transition"
                    >
                      <Icon name="Github" size={18} />
                      <span>View Code</span>
                    </motion.a>
                  )}
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-primary-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-primary-900">Category:</span>
                      <span className="text-text-secondary ml-2">{project.category}</span>
                    </div>
                    <div>
                      <span className="font-medium text-primary-900">Year:</span>
                      <span className="text-text-secondary ml-2">{project.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;