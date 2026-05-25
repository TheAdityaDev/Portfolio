import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillCategories = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('technical');

  const skillCategories = {
    technical: {
      title: "Technical Expertise",
      icon: "Code",
      color: "from-blue-500 to-indigo-600",
      skills: [
        {
          name: "Frontend Development",
          description: "Modern React, Vue.js, and Next.js applications with TypeScript",
          proficiency: 95,
          icon: "Monitor",
          projects: "50+ Projects"
        },
        {
          name: "Backend Development",
          description: "Node.js, cloud-native API development",
          proficiency: 88,
          icon: "Server",
          projects: "30+ APIs"
        },
        {
          name: "AI Integration",
          description: "Machine learning, neural networks, and AI-powered solutions",
          proficiency: 87,
          icon: "Zap",
          projects: "10+ Models"
        },
        {
          name: "Database Design",
          description: "SQL, NoSQL, and data architecture optimization",
          proficiency: 87,
          icon: "Database",
          projects: "25+ Databases"
        },
        {
          name: "DevOps & Cloud",
          description: "AWS, Docker, CI/CD, and infrastructure automation",
          proficiency: 82,
          icon: "Cloud",
          projects: "20+ Deployments"
        },
        {
          name: "Mobile Development",
          description: "React Native and progressive web applications",
          proficiency: 78,
          icon: "Smartphone",
          projects: "15+ Apps"
        },
        {
          name: "Testing & QA",
          description: "Unit testing, integration testing, and test automation",
          proficiency: 85,
          icon: "CheckCircle",
          projects: "40+ Test Suites"
        }
      ]
    },
    creative: {
      title: "Creative Design",
      icon: "Palette",
      color: "from-pink-500 to-purple-600",
      skills: [
        {
          name: "UI/UX Design",
          description: "User-centered design with modern design principles",
          proficiency: 92,
          icon: "Paintbrush",
          projects: "60+ Designs"
        },
        {
          name: "Brand Identity",
          description: "Logo design, brand guidelines, and visual identity systems",
          proficiency: 86,
          icon: "Sparkles",
          projects: "25+ Brands"
        },
        {
          name: "Prototyping",
          description: "Interactive prototypes with Figma, Framer, and code",
          proficiency: 89,
          icon: "Play",
          projects: "45+ Prototypes"
        },
        {
          name: "Motion Graphics",
          description: "Animations, micro-interactions, and visual storytelling",
          proficiency: 83,
          icon: "Zap",
          projects: "30+ Animations"
        },
        {
          name: "Design Systems",
          description: "Scalable component libraries and design tokens",
          proficiency: 90,
          icon: "Grid",
          projects: "12+ Systems"
        },
        {
          name: "User Research",
          description: "User interviews, usability testing, and data analysis",
          proficiency: 81,
          icon: "Search",
          projects: "20+ Studies"
        }
      ]
    },
    soft: {
      title: "Leadership & Soft Skills",
      icon: "Users",
      color: "from-green-500 to-emerald-600",
      skills: [
        {
          name: "Team Leadership",
          description: "Leading cross-functional teams and driving project success",
          proficiency: 93,
          icon: "Crown",
          projects: "15+ Teams Led"
        },
        {
          name: "Mentoring",
          description: "Coaching junior developers and fostering growth",
          proficiency: 91,
          icon: "GraduationCap",
          projects: "25+ Mentees"
        },
        {
          name: "Public Speaking",
          description: "Conference talks, workshops, and technical presentations",
          proficiency: 87,
          icon: "Mic",
          projects: "15+ Talks"
        },
        {
          name: "Project Management",
          description: "Agile methodologies, sprint planning, and delivery",
          proficiency: 89,
          icon: "Calendar",
          projects: "40+ Projects"
        },
        {
          name: "Client Relations",
          description: "Stakeholder management and requirement gathering",
          proficiency: 88,
          icon: "Handshake",
          projects: "50+ Clients"
        },
        {
          name: "Problem Solving",
          description: "Analytical thinking and creative solution development",
          proficiency: 94,
          icon: "Lightbulb",
          projects: "100+ Solutions"
        }
      ]
    }
  };

  const categories = Object.keys(skillCategories);

  const SkillCard = ({ skill, index, categoryColor }) => (
    <motion.div 
      className="group bg-white rounded-royal-lg royal-shadow-sm hover:royal-shadow-md royal-transition p-6 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div 
            className={`w-10 h-10 bg-gradient-to-br ${categoryColor} rounded-royal flex items-center justify-center group-hover:scale-110 royal-transition`}
            whileHover={{ rotate: 5 }}
          >
            <Icon name={skill.icon} size={18} color="white" />
          </motion.div>
          <div>
            <h4 className="font-heading text-lg font-bold text-text-primary group-hover:text-primary royal-transition">
              {skill.name}
            </h4>
            <p className="text-sm text-accent-600 font-medium">{skill.projects}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{skill.proficiency}%</div>
          <div className="text-xs text-text-secondary">Proficiency</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary mb-4 leading-relaxed">
        {skill.description}
      </p>

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${categoryColor} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.proficiency}%` } : {}}
          transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </motion.div>
      </div>

      {/* Floating Icon Animation */}
      <motion.div 
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 royal-transition"
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon name={skill.icon} size={32} color="#4B0082" />
      </motion.div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-accent-400 rounded-full animate-pulse animation-delay-200"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-full royal-shadow mb-6">
            <Icon name="Target" size={20} color="white" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Skill Categories
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Comprehensive expertise across technical, creative, and leadership domains
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => {
            const categoryData = skillCategories[category];
            const isActive = activeCategory === category;
            
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-royal-md font-medium royal-transition ${
                  isActive 
                    ? `bg-gradient-to-r ${categoryData.color} text-white royal-shadow-md` 
                    : 'bg-white text-text-primary hover:bg-surface royal-shadow-sm hover:royal-shadow'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-6 h-6 rounded-royal flex items-center justify-center ${
                  isActive ? 'bg-white/20' : `bg-gradient-to-br ${categoryData.color}`
                }`}>
                  <Icon 
                    name={categoryData.icon} 
                    size={14} 
                    color={isActive ? "white" : "white"} 
                  />
                </div>
                <span>{categoryData.title}</span>
                {isActive && (
                  <motion.div 
                    className="w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          key={activeCategory}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index} 
              categoryColor={skillCategories[activeCategory].color}
            />
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { label: "Fresher", value: "Fresher", icon: "Calendar" },
            { label: "Projects Completed", value: "30+", icon: "CheckCircle" },
            { label: "Technologies Mastered", value: "25+", icon: "Code" },
            { label: "Team Members Mentored", value: "10+", icon: "Users" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center p-6 bg-white rounded-royal royal-shadow-sm hover:royal-shadow-md royal-transition"
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon} size={20} color="white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillCategories;

// oxMcInODmO9iO5xu
