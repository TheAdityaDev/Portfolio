import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactDetails = [
    {
      id: 1,
      icon: 'Mail',
      title: 'Email Address',
      value: 'adityapatildev21@gmail.com',
      description: 'Drop me a line anytime',
      link: 'mailto:adityapatildev21@gmail.com',
      color: 'from-accent-400 to-accent-600'
    },
    {
      id: 2,
      icon: 'Phone',
      title: 'Phone Number',
      value: '+91 8855040187',
      description: 'Available Mon-Fri, 9AM-6PM IST',
      link: 'tel:+918855040187',
      color: 'from-primary-400 to-primary-600'
    },
    {
      id: 3,
      icon: 'MapPin',
      title: 'Location',
      value: 'Pune, Maharashtra, India',
      description: 'Available for remote work worldwide',
      link: '#',
      color: 'from-secondary to-primary-700'
    },
    {
      id: 4,
      icon: 'Clock',
      title: 'Ready to Start Your Project?',
      value: 'Let\'s Create Something Extraordinary',
      description: 'I prioritize quick communication',
      link: '#',
      color: 'from-accent-500 to-accent-700'
    }
  ];

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    hover: {
      y: -8,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="mb-8">
        <h3 className="font-heading text-2xl font-bold text-primary mb-2">
          Get In Touch
        </h3>
        <p className="text-text-secondary">
          Multiple ways to connect and start our collaboration
        </p>
      </div>

      {/* Contact Cards */}
      <div className="space-y-4">
        {contactDetails.map((detail, index) => (
          <motion.a
            key={detail.id}
            href={detail.link}
            className="block group"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
          >
            <div className="bg-white rounded-royal-lg royal-shadow hover:royal-shadow-lg royal-transition p-6 relative overflow-hidden">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${detail.color} opacity-0 group-hover:opacity-5 royal-transition`}></div>
              
              <div className="relative z-10 flex items-start space-x-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${detail.color} rounded-royal flex items-center justify-center royal-shadow-sm group-hover:royal-shadow royal-transition`}>
                  <Icon 
                    name={detail.icon} 
                    size={20} 
                    color="white" 
                    strokeWidth={2}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-primary group-hover:text-accent-600 royal-transition">
                    {detail.title}
                  </h4>
                  <p className="text-lg font-medium text-text-primary mt-1">
                    {detail.value}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    {detail.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 royal-transition">
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    color="#B8860B"
                  />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-royal-lg p-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-royal flex items-center justify-center">
            <Icon name="Info" size={18} color="white" strokeWidth={2} />
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-2">
              Ready to Start Your Project?
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              I'm currently accepting new projects and would love to hear about your vision. Whether it's a complete digital transformation or a specific technical challenge, 
              let's discuss how we can create something extraordinary together.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;