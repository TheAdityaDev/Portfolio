import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = ({ isVisible }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      position: "CEO, TechVision Inc.",
      company: "Fortune 500 Technology Company",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      quote: `Working with this royal portfolio developer was an absolute game-changer for our company. The attention to detail and premium quality of work exceeded all our expectations. Every aspect of our project was handled with the utmost professionalism and creative excellence.`,
      project: "Enterprise Web Platform",
      result: "300% increase in user engagement"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      position: "Creative Director",
      company: "Luxury Brand Agency",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      quote: `The royal aesthetic and premium craftsmanship delivered on our luxury brand project was phenomenal. This developer truly understands how to create experiences that resonate with high-end clientele. The final product was nothing short of magnificent.`,
      project: "Luxury E-commerce Platform",
      result: "250% boost in conversion rates"
    },
    {
      id: 3,
      name: "Emily Chen",
      position: "Product Manager",
      company: "Innovation Labs",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      quote: `Exceptional work that combines technical expertise with artistic vision. The royal-themed design elements and smooth animations created an unforgettable user experience. This developer's commitment to excellence is truly remarkable.`,
      project: "Mobile Banking App",
      result: "95% user satisfaction score"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible, testimonials.length]);

  const handleTestimonialChange = (index) => {
    setActiveTestimonial(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-success/10 px-4 py-2 rounded-full mb-6">
            <Icon name="MessageCircle" size={16} color="var(--color-success)" />
            <span className="text-success text-sm font-medium">Client Testimonials</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Royal Recommendations
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Discover what industry leaders say about our premium development services and royal craftsmanship.
          </p>
        </div>
      </div>

      {/* Main Testimonial Display */}
      <div 
        className={`relative bg-white rounded-royal-lg royal-shadow-lg p-8 md:p-12 mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
        }`}
      >
        {/* Quote Icon */}
        <div className="absolute top-6 left-6 text-accent-400 opacity-20">
          <Icon name="Quote" size={48} />
        </div>

        {/* Testimonial Content */}
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar and Info */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-20 h-20 rounded-full object-cover royal-shadow"
                />
                <div className="absolute -bottom-2 -right-2 bg-accent-500 rounded-full p-2">
                  <Icon name="Crown" size={16} color="white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, index) => (
                  <Icon key={index} name="Star" size={20} color="#B8860B" fill="#B8860B" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-text-primary text-lg md:text-xl font-medium mb-6 leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="font-heading text-xl font-semibold text-text-primary">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-text-secondary">
                    {testimonials[activeTestimonial].position}
                  </p>
                  <p className="text-accent-600 text-sm font-medium">
                    {testimonials[activeTestimonial].company}
                  </p>
                </div>

                {/* Project Info */}
                <div className="mt-4 sm:mt-0 sm:text-right">
                  <p className="text-sm text-text-secondary">
                    Project: {testimonials[activeTestimonial].project}
                  </p>
                  <p className="text-sm font-medium text-success">
                    Result: {testimonials[activeTestimonial].result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Royal Decorative Elements */}
        <div className="absolute top-6 right-6 opacity-10">
          <Icon name="Sparkles" size={32} color="#B8860B" />
        </div>
        <div className="absolute bottom-6 right-6 opacity-10">
          <Icon name="Award" size={28} color="#B8860B" />
        </div>
      </div>

      {/* Testimonial Navigation */}
      <div 
        className={`flex justify-center items-center space-x-4 mb-12 transition-all duration-1200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
      >
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleTestimonialChange(index)}
            className={`w-3 h-3 rounded-full royal-transition ${
              index === activeTestimonial
                ? 'bg-accent-500 scale-125' :'bg-text-secondary/30 hover:bg-accent-400'
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Stats Section */}
      <div 
        className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1400 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
      >
        {[
          { number: "50+", label: "Happy Clients", icon: "Users" },
          { number: "100+", label: "Projects Completed", icon: "Briefcase" },
          { number: "99%", label: "Client Satisfaction", icon: "Heart" },
          { number: "5★", label: "Average Rating", icon: "Star" }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center transition-all duration-800 ${
              isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-royal text-white mb-3">
              <Icon name={stat.icon} size={20} />
            </div>
            <div className="font-heading text-3xl font-bold text-text-primary mb-1">
              {stat.number}
            </div>
            <div className="text-text-secondary text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;