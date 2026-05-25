import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', path: '/hero-landing-page', icon: 'Home' },
        { name: 'About & Skills', path: '/about-skills-showcase', icon: 'User' },
        { name: 'Portfolio', path: '/portfolio-gallery', icon: 'Briefcase' },
        { name: 'Contact', path: '/contact-footer', icon: 'Mail' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Web Development', path: '#', icon: 'Code' },
        { name: 'UI/UX Design', path: '#', icon: 'Palette' },
        { name: 'Mobile Apps', path: '#', icon: 'Smartphone' },
        { name: 'Consulting', path: '#', icon: 'MessageCircle' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '#', icon: 'BookOpen' },
        { name: 'Case Studies', path: '#', icon: 'FileText' },
        { name: 'Downloads', path: '#', icon: 'Download' },
        { name: 'FAQ', path: '#', icon: 'HelpCircle' }
      ]
    }
  ];

  const quickStats = [
    { label: 'Projects Completed', value: '30+', icon: 'CheckCircle' },
    { label: 'Achievement\'s', value: '10+', icon: 'FileBadge' },
    { label: 'Years Experience', value: 'Fresher', icon: 'Award' },
    { label: 'Technologies', value: '25+', icon: 'Zap' }
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Footer Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Footer Header */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <Link to="/hero-landing-page" className="inline-flex items-center space-x-4 group mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-royal-lg flex items-center justify-center royal-shadow-lg group-hover:royal-shadow-xl royal-transition">
                <Icon name="Crown" size={28} color="white" strokeWidth={2} />
              </div>
              <div className="text-left">
                <h2 className="font-heading text-3xl font-bold text-white group-hover:text-accent-200 royal-transition">
                  Royal Portfolio
                </h2>
                <p className="font-caption text-primary-200 group-hover:text-accent-300 royal-transition">
                  Crafting Digital Excellence
                </p>
              </div>
            </Link>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto leading-relaxed">
              Creating extraordinary digital experiences that blend creativity with cutting-edge technology. 
              Let's build something royal together.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            variants={itemVariants}
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400/20 to-accent-600/20 rounded-royal flex items-center justify-center mx-auto mb-3 group-hover:from-accent-400/30 group-hover:to-accent-600/30 royal-transition">
                  <Icon name={stat.icon} size={20} color="#B8860B" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-accent-300 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-200">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer Links */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="space-y-4"
              >
                <h3 className="font-heading text-xl font-semibold text-accent-300 mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="flex items-center space-x-3 text-primary-200 hover:text-accent-200 royal-transition group"
                      >
                        <Icon 
                          name={link.icon} 
                          size={16} 
                          className="group-hover:scale-110 royal-transition" 
                        />
                        <span className="group-hover:translate-x-1 royal-transition">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div 
            className="bg-gradient-to-r from-primary-800/50 to-secondary/50 rounded-royal-lg p-8 mb-12 backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-primary-200">
                  Get the latest insights on design, development, and digital innovation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:ml-8">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-royal bg-white/10 border border-white/20 text-white placeholder-primary-200 focus:outline-none focus:border-accent-400 royal-transition"
                />
                <button className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold px-6 py-3 rounded-royal royal-shadow hover:royal-shadow-md royal-transition flex items-center justify-center space-x-2">
                  <Icon name="Send" size={16} />
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div 
            className="border-t border-white/10 pt-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-primary-200 text-sm">
                © {currentYear} Royal Portfolio. All rights reserved. Crafted with{' '}
                <Icon name="Heart" size={14} color="#B8860B" className="inline mx-1" />
                and royal precision.
              </div>
              <div className="flex items-center space-x-6">
                <Link to="#" className="text-primary-200 hover:text-accent-200 text-sm royal-transition">
                  Privacy Policy
                </Link>
                <Link to="#" className="text-primary-200 hover:text-accent-200 text-sm royal-transition">
                  Terms of Service
                </Link>
                <Link to="#" className="text-primary-200 hover:text-accent-200 text-sm royal-transition">
                  Sitemap
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-accent-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-primary-300/20 rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-accent-500/20 rounded-full animate-pulse animation-delay-400"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 border border-primary-400/20 rounded-full animate-pulse animation-delay-300"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-50"></div>
    </motion.div>
  );
};

export default FooterSection;