import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillsBadges = ({ isVisible }) => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "Code",
      skills: [
        { name: "React", level: 95, color: "from-blue-500 to-blue-600" },
        { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-700" },
        { name: "Next.js", level: 88, color: "from-gray-700 to-gray-800" },
        { name: "Tailwind CSS", level: 92, color: "from-cyan-500 to-cyan-600" }
      ]
    },
    {
      title: "Backend Development",
      icon: "Server",
      skills: [
        { name: "Node.js", level: 87, color: "from-green-500 to-green-600" },
        { name: "Python", level: 85, color: "from-yellow-500 to-yellow-600" },
        { name: "PostgreSQL", level: 83, color: "from-blue-500 to-blue-600" },
        { name: "MongoDB", level: 80, color: "from-green-600 to-green-700" }
      ]
    },
    {
      title: "Design & UX",
      icon: "Palette",
      skills: [
        { name: "Figma", level: 93, color: "from-purple-500 to-purple-600" },
        { name: "Adobe Creative Suite", level: 88, color: "from-red-500 to-red-600" },
        { name: "UI/UX Design", level: 91, color: "from-pink-500 to-pink-600" },
        { name: "Prototyping", level: 86, color: "from-indigo-500 to-indigo-600" }
      ]
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
          <div className="inline-flex items-center space-x-2 bg-accent-500/10 px-4 py-2 rounded-full mb-6">
            <Icon name="Zap" size={16} color="var(--color-accent)" />
            <span className="text-accent-600 text-sm font-medium">Royal Skills</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Expertise & Mastery
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Years of dedicated craftsmanship have honed these skills to royal standards of excellence.
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={category.title}
            className={`bg-white rounded-royal-lg royal-shadow hover:royal-shadow-md royal-transition p-8 transition-all duration-1000 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-12'
            }`}
            style={{ transitionDelay: `${categoryIndex * 200}ms` }}
          >
            {/* Category Header */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-primary to-primary-600 rounded-royal text-white">
                <Icon name={category.icon} size={24} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-text-primary">
                {category.title}
              </h3>
            </div>

            {/* Skills List */}
            <div className="space-y-6">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className={`transition-all duration-1200 ${
                    isVisible 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-0 transform translate-x-8'
                  }`}
                  style={{ transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-primary">{skill.name}</span>
                    <span className="text-sm text-text-secondary font-medium">{skill.level}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative h-2 bg-surface rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1500 ease-out`}
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100) + 300}ms`
                      }}
                    >
                      <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-r from-transparent to-white/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Royal Flourish */}
            <div className="mt-8 pt-6 border-t border-surface flex items-center justify-center">
              <div className="flex items-center space-x-2 text-accent-500">
                <Icon name="Crown" size={16} />
                <span className="text-sm font-medium">Royal Standard</span>
                <Icon name="Crown" size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Skills Badges */}
      <div 
        className={`mt-16 transition-all duration-1400 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
      >
        <div className="text-center mb-8">
          <h3 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            Additional Expertise
          </h3>
          <p className="text-text-secondary">
            Complementary skills that enhance the royal development experience
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: "DevOps", icon: "Settings" },
            { name: "Cloud Architecture", icon: "Cloud" },
            { name: "Mobile Development", icon: "Smartphone" },
            { name: "API Design", icon: "Layers" },
            { name: "Performance Optimization", icon: "Zap" },
            { name: "Security", icon: "Shield" },
            { name: "Testing", icon: "CheckCircle" },
            { name: "Agile Methodology", icon: "Users" }
          ].map((skill, index) => (
            <div
              key={skill.name}
              className={`group flex items-center space-x-2 cursor-pointer bg-white hover:bg-primary hover:text-white px-4 py-2 rounded-royal royal-shadow hover:royal-shadow-md royal-transition transition-all duration-300 ${
                isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Icon 
                name={skill.icon} 
                size={16} 
                className="group-hover:scale-110 duration-300 royal-transition" 
              />
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsBadges;