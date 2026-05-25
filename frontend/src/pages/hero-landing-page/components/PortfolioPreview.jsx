import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PortfolioPreview = ({ isVisible }) => {
  const portfolioItems = [
    {
      id: 1,
      title: "Royal E-Commerce Platform",
      category: "Web Development",
      description: "Luxury shopping experience with premium UI/UX design and seamless checkout flow.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB"],
      status: "Featured",
      link: "/portfolio-gallery"
    },
    {
      id: 2,
      title: "Corporate Brand Identity",
      category: "Design",
      description: "Complete brand redesign for Fortune 500 company with royal aesthetic principles.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=600&h=400&fit=crop",
      technologies: ["Figma", "Adobe CC", "Branding"],
      status: "Award Winner",
      link: "/portfolio-gallery"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure and intuitive banking application with premium user experience design.",
      image: "https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg?w=600&h=400&fit=crop",
      technologies: ["React Native", "TypeScript", "Security"],
      status: "Client Favorite",
      link: "/portfolio-gallery"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Icon name="Briefcase" size={16} color="var(--color-primary)" />
            <span className="text-primary text-sm font-medium">Featured Work</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Portfolio Highlights
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Discover a selection of premium projects that showcase royal craftsmanship and innovative solutions.
          </p>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <div
            key={item.id}
            className={`group relative bg-white rounded-royal-lg royal-shadow hover:royal-shadow-lg royal-transition overflow-hidden transition-all duration-1000 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-12'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            {/* Status Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center space-x-1 bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                <Icon name="Award" size={12} />
                <span>{item.status}</span>
              </span>
            </div>

            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 royal-transition-slow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 royal-transition" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 royal-transition">
                <Link
                  to={item.link}
                  className="inline-flex items-center space-x-2 bg-white text-primary font-medium px-4 py-2 rounded-royal royal-shadow hover:royal-shadow-md royal-transition"
                >
                  <Icon name="ExternalLink" size={16} />
                  <span>View Project</span>
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-accent-600 text-sm font-medium">{item.category}</span>
                <Icon name="ArrowUpRight" size={16} color="var(--color-text-secondary)" className="group-hover:text-accent-500 group-hover:scale-110 royal-transition" />
              </div>
              
              <h3 className="font-heading text-xl font-semibold text-text-primary mb-3 group-hover:text-primary royal-transition">
                {item.title}
              </h3>
              
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {item.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs bg-surface text-text-secondary px-2 py-1 rounded-royal"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <Link
                to={item.link}
                className="inline-flex items-center space-x-2 text-primary hover:text-accent-600 font-medium text-sm royal-transition"
              >
                <span>Learn More</span>
                <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 royal-transition" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div 
        className={`text-center mt-12 transition-all duration-1200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
      >
        <Link
          to="/portfolio-gallery"
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-8 py-4 rounded-royal-md royal-shadow hover:royal-shadow-md royal-transition"
        >
          <Icon name="Grid" size={20} />
          <span>View Complete Portfolio</span>
          <Icon name="ArrowRight" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioPreview;