import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

import Header from "../../components/ui/Header";
import ScrollProgressIndicator from "../../components/ui/ScrollProgressIndicator";
import Icon from "../../components/AppIcon";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import SocialLinks from "./components/SocialLinks";
import FooterSection from "./components/FooterSection";
import ScrollToTopButton from "./components/ScrollToTopButton";
import FloatingParticles from "./components/FloatingParticles";

const ContactFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeParticles, setActiveParticles] = useState(false);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const isContactInView = useInView(contactRef, { threshold: 0.3 });
  const isFooterInView = useInView(footerRef, { threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isContactInView) {
      controls.start("visible");
      setActiveParticles(true);
    }
  }, [isContactInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary-50 relative overflow-hidden">
      <Header />
      <ScrollProgressIndicator />
      <FloatingParticles isActive={activeParticles} />

      {/* Contact Section */}
      <motion.section
        ref={contactRef}
        id="contact"
        className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={sectionVariants}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full royal-shadow-lg mb-6">
              <Icon name="Mail" size={28} color="white" strokeWidth={2} />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
              Let's Create Something.
              <span className="block text-accent-600">
                More Than Code — I Build Impact.
                <br />
                Turning Ideas Into Revenue-Driven Products.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Ready to bring your vision to life? I'm here to help you create
              extraordinary digital experiences that captivate and inspire.
            </p>
          </motion.div>

          {/* Contact Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Contact Form */}
            <motion.div variants={sectionVariants}>
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div className="space-y-8" variants={sectionVariants}>
              <ContactInfo />
              <SocialLinks />
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Icon
            name="Sparkles"
            size={32}
            color="#B8860B"
            className="animate-pulse"
          />
        </div>
        <div className="absolute top-40 right-10 opacity-20">
          <Icon
            name="Crown"
            size={28}
            color="#4B0082"
            className="animate-pulse animation-delay-200"
          />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Icon
            name="Star"
            size={24}
            color="#B8860B"
            className="animate-pulse animation-delay-400"
          />
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        ref={footerRef}
        className="relative bg-gradient-to-br from-primary via-primary-700 to-secondary"
        variants={containerVariants}
        initial="hidden"
        animate={isFooterInView ? "visible" : "hidden"}
      >
        <FooterSection />
      </motion.footer>

      {/* Scroll to Top Button */}
      <ScrollToTopButton isVisible={isVisible} />

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-accent-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-primary-300 rounded-full animate-pulse animation-delay-300"></div>
      </div>
    </div>
  );
};

export default ContactFooter;
