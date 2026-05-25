import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsVisualization = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [animatedSkills, setAnimatedSkills] = useState({});

  const technicalSkills = [
    { name: "React & Next.js", level: 95, icon: "Code", color: "from-blue-500 to-blue-600" },
    { name: "TypeScript", level: 90, icon: "FileCode", color: "from-blue-600 to-indigo-600" },
    { name: "Node.js & Express", level: 88, icon: "Server", color: "from-green-500 to-green-600" },
    // { name: "Python & Django", level: 85, icon: "Terminal", color: "from-yellow-500 to-orange-500" },
    { name: "AWS & Cloud", level: 82, icon: "Cloud", color: "from-orange-500 to-red-500" },
    { name: "Database Design", level: 87, icon: "Database", color: "from-purple-500 to-purple-600" }
  ];

  const creativeSkills = [
    { name: "UI/UX Design", level: 92, icon: "Palette", color: "from-pink-500 to-rose-500" },
    { name: "Figma & Design Tools", level: 89, icon: "Paintbrush", color: "from-purple-500 to-pink-500" },
    { name: "Brand Identity", level: 86, icon: "Sparkles", color: "from-indigo-500 to-purple-500" },
    { name: "Motion Graphics", level: 83, icon: "Play", color: "from-cyan-500 to-blue-500" }
  ];

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const skillsToAnimate = {};
        [...technicalSkills, ...creativeSkills].forEach((skill, index) => {
          setTimeout(() => {
            setAnimatedSkills(prev => ({
              ...prev,
              [skill.name]: skill.level
            }));
          }, index * 200);
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const SkillBar = ({ skill, index, category }) => (
    <motion.div 
      className="group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 bg-gradient-to-r ${skill.color} rounded-royal flex items-center justify-center group-hover:scale-110 royal-transition`}>
            <Icon name={skill.icon} size={16} color="white" />
          </div>
          <span className="font-medium text-text-primary">{skill.name}</span>
        </div>
        <span className="text-sm font-medium text-text-secondary">{skill.level}%</span>
      </div>
      
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: animatedSkills[skill.name] ? `${animatedSkills[skill.name]}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-full royal-shadow mb-6">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            A comprehensive showcase of technical proficiency and creative capabilities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Technical Skills */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-royal flex items-center justify-center">
                <Icon name="Code" size={20} color="white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-text-primary">Technical Skills</h3>
            </div>
            
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} category="technical" />
              ))}
            </div>
          </motion.div>

          {/* Creative Skills */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-royal flex items-center justify-center">
                <Icon name="Palette" size={20} color="white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-text-primary">Creative Skills</h3>
            </div>
            
            <div className="space-y-6">
              {creativeSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} category="creative" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Skill Badges */}
        <motion.div 
          className="mt-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { name: "Problem Solving", icon: "Lightbulb" },
            { name: "Team Leadership", icon: "Users" },
            { name: "Agile/Scrum", icon: "Zap" },
            { name: "Mentoring", icon: "GraduationCap" },
            { name: "Public Speaking", icon: "Mic" },
            { name: "Project Management", icon: "CheckCircle" }
          ].map((badge, index) => (
            <motion.div 
              key={badge.name}
              className="group flex items-center space-x-2 bg-white px-4 py-2 rounded-full royal-shadow-sm hover:royal-shadow-md royal-transition cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            >
              <div className="w-6 h-6 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center group-hover:from-primary group-hover:to-primary-600 royal-transition">
                <Icon name={badge.icon} size={12} color="white" />
              </div>
              <span className="text-sm font-medium text-text-primary">{badge.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-8 right-8 opacity-5">
        <Icon name="Code" size={64} color="#4B0082" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-5">
        <Icon name="Palette" size={64} color="#B8860B" />
      </div>
    </section>
  );
};

export default SkillsVisualization;