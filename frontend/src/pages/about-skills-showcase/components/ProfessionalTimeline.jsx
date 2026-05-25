import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProfessionalTimeline = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const timelineData = [
    {
      year: "2024",
      title: "Senior Creative Director",
      company: "Royal Digital Studios",
      type: "current",
      description: `Leading a team of 15+ designers and developers in creating premium digital experiences for Fortune 500 clients. Spearheading the company's design system initiative and establishing new creative standards.`,
      achievements: [
        "Increased client satisfaction by 40%",
        "Led 25+ successful product launches",
        "Established company-wide design system"
      ],
      technologies: ["React", "Figma", "AWS", "TypeScript"],
      icon: "Crown"
    },
    {
      year: "2022",
      title: "Lead Frontend Developer",
      company: "TechVision Inc.",
      type: "promotion",
      description: `Promoted to lead frontend development across multiple product lines. Architected scalable React applications serving 100K+ daily active users while mentoring junior developers.`,
      achievements: [
        "Reduced load times by 60%",
        "Mentored 8 junior developers",
        "Implemented CI/CD pipelines"
      ],
      technologies: ["React", "Next.js", "Node.js", "Docker"],
      icon: "TrendingUp"
    },
    {
      year: "2020",
      title: "Full-Stack Developer",
      company: "StartupLab",
      type: "growth",
      description: `Joined as the 5th employee and helped scale the platform from MVP to serving thousands of users. Built both frontend and backend systems while establishing development best practices.`,
      achievements: [
        "Built MVP from scratch",
        "Scaled to 10K+ users",
        "Established dev workflows"
      ],
      technologies: ["Vue.js", "Python", "PostgreSQL", "Redis"],
      icon: "Rocket"
    },
    {
      year: "2018",
      title: "Frontend Developer",
      company: "Creative Agency Co.",
      type: "start",
      description: `Started my professional journey building responsive websites and interactive experiences for creative agencies. Learned the fundamentals of user-centered design and modern web development.`,
      achievements: [
        "Delivered 30+ client projects",
        "Mastered responsive design",
        "Built first React applications"
      ],
      technologies: ["HTML/CSS", "JavaScript", "React", "Sass"],
      icon: "Play"
    },
    {
      year: "2016",
      title: "Computer Science Degree",
      company: "Stanford University",
      type: "education",
      description: `Graduated with honors, specializing in Human-Computer Interaction and Software Engineering. Participated in multiple hackathons and built several open-source projects.`,
      achievements: [
        "Graduated Magna Cum Laude",
        "Won 3 hackathon competitions",
        "Published 2 research papers"
      ],
      technologies: ["Java", "Python", "C++", "Machine Learning"],
      icon: "GraduationCap"
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'current': return 'from-accent-500 to-accent-600';
      case 'promotion': return 'from-green-500 to-green-600';
      case 'growth': return 'from-blue-500 to-blue-600';
      case 'start': return 'from-purple-500 to-purple-600';
      case 'education': return 'from-indigo-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const TimelineItem = ({ item, index, isLast }) => (
    <motion.div 
      className="relative flex items-start space-x-6 pb-12"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
    >
      {/* Timeline Line */}
      {!isLast && (
        <motion.div 
          className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-accent-400 to-accent-200"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
          style={{ transformOrigin: 'top' }}
        />
      )}

      {/* Timeline Icon */}
      <motion.div 
        className={`relative z-10 w-12 h-12 bg-gradient-to-br ${getTypeColor(item.type)} rounded-full flex items-center justify-center royal-shadow-md`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 + index * 0.2, type: "spring", stiffness: 200 }}
      >
        <Icon name={item.icon} size={20} color="white" strokeWidth={2} />
        
        {/* Pulse Effect for Current Position */}
        {item.type === 'current' && (
          <motion.div 
            className="absolute inset-0 bg-accent-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Content Card */}
      <motion.div 
        className="flex-1 bg-white rounded-royal-lg royal-shadow-sm hover:royal-shadow-md royal-transition p-6 group cursor-pointer"
        whileHover={{ scale: 1.02, y: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className={`inline-block px-2 py-1 bg-gradient-to-r ${getTypeColor(item.type)} text-white text-xs font-medium rounded-full`}>
                {item.year}
              </span>
              {item.type === 'current' && (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Current
                </span>
              )}
            </div>
            <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-primary royal-transition">
              {item.title}
            </h3>
            <p className="text-primary font-medium">{item.company}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Achievements */}
        <div className="mb-4">
          <h4 className="font-medium text-text-primary mb-2">Key Achievements:</h4>
          <ul className="space-y-1">
            {item.achievements.map((achievement, achIndex) => (
              <li key={achIndex} className="flex items-center space-x-2 text-sm text-text-secondary">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="inline-block px-3 py-1 bg-surface text-text-secondary text-xs font-medium rounded-full group-hover:bg-primary-50 group-hover:text-primary royal-transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-surface relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-accent-400 rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-full royal-shadow mb-6">
            <Icon name="Clock" size={20} color="white" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Professional Journey
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            A timeline of growth, achievements, and continuous learning in the world of technology
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {timelineData.map((item, index) => (
            <TimelineItem 
              key={item.year} 
              item={item} 
              index={index} 
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <p className="text-text-secondary mb-6">
            Ready to be part of the next chapter in this journey?
          </p>
          <motion.button
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium px-6 py-3 rounded-royal royal-shadow hover:royal-shadow-md royal-transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon name="MessageCircle" size={18} />
            <span>Let's Connect</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalTimeline;