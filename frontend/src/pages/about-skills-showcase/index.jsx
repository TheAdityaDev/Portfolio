import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../../components/ui/Header';
import ScrollProgressIndicator from '../../components/ui/ScrollProgressIndicator';
import Icon from '../../components/AppIcon';

import PersonalStorySection from './components/PersonalStorySection';
import SkillsVisualization from './components/SkillsVisualization';
import ProfessionalTimeline from './components/ProfessionalTimeline';
import SkillCategories from './components/SkillCategories';
import { Link } from 'react-router-dom';

const AboutSkillsShowcase = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#5910A5] relative overflow-hidden">
      <Header />
      <ScrollProgressIndicator />

      {/* Animated Background Pattern */}
      <motion.div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-700 to-secondary"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-accent-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 border border-accent-300 rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-accent-500 rounded-full animate-pulse animation-delay-400"></div>
      </motion.div>

      {/* Royal Flourish Elements */}
      <div className="fixed top-20 left-8 opacity-10 pointer-events-none">
        <Icon name="Sparkles" size={32} color="#B8860B" className="animate-pulse" />
      </div>
      <div className="fixed top-20 right-8 opacity-10 pointer-events-none">
        <Icon name="Sparkles" size={32} color="#B8860B" className="animate-pulse animation-delay-300" />
      </div>

      {/* Main Content */}
      <main className="relative pt-20 lg:pt-24">
        {/* Hero Section */}
        <motion.section 
          className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary-700 to-secondary relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full royal-shadow-lg mb-6">
                <Icon name="User" size={28} color="white" strokeWidth={2} />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                About & Skills
              </h1>
              <p className="text-xl md:text-2xl text-primary-200 max-w-3xl mx-auto leading-relaxed">
                Discover the journey, passion, and expertise that drives creative excellence
              </p>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 opacity-20">
            <Icon name="Crown" size={40} color="#B8860B" className="animate-pulse" />
          </div>
          <div className="absolute bottom-8 right-8 opacity-20">
            <Icon name="Award" size={40} color="#B8860B" className="animate-pulse animation-delay-200" />
          </div>
        </motion.section>

        {/* Personal Story Section */}
        <PersonalStorySection parallaxY={parallaxY} />

        {/* Skills Visualization */}
        <SkillsVisualization />

        {/* Professional Timeline */}
        <ProfessionalTimeline />

        {/* Skill Categories */}
        <SkillCategories />

        {/* Call to Action Section */}
        <motion.section 
          className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary-700 to-secondary relative"
          style={{ y: parallaxY }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
                Let's collaborate and bring your vision to life with royal excellence
              </p>
              {/* <Link to="/contact-footer" className='cursor-pointer'>
                <motion.button
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-medium px-8 py-4 rounded-royal-md royal-shadow hover:royal-shadow-md royal-transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name="Mail" size={20} />
                  <span>Get In Touch</span>
                  <Icon name="ArrowRight" size={16} />
                </motion.button>
              </Link> */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact-footer"
                  className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-royal-md royal-border hover:border-accent-400 transition-all duration-300 cursor-pointer"
                >
                  <Icon name="Mail" size={20} />
                  <span>Get In Touch</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Background Decorations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-accent-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-accent-300 rounded-full animate-pulse animation-delay-300"></div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default AboutSkillsShowcase;