import React from "react";
import { motion } from "framer-motion";

const FilterTabs = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category) => {
        const isActive = activeFilter === category.name;

        return (
          <motion.button
            key={category.name}
            onClick={() => onFilterChange(category.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-6 py-3 rounded-royal-full font-medium royal-transition border border-primary-200 hover:border-accent-300 overflow-hidden ${isActive ? 'text-white' : 'text-text-secondary'}`}
          >
            {/* Text + Count */}
            <div className="flex items-center space-x-2 relative z-10">
              <span>{category.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-royal-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-primary-100 text-primary-700"
                }`}
              >
                {category.count}
              </span>
            </div>

            {/* Active Gradient Background */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600 rounded-royal-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default FilterTabs;
