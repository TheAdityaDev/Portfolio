import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { projectsAPI } from '../../services/api';
import Header from '../../components/ui/Header';
import ScrollProgressIndicator from '../../components/ui/ScrollProgressIndicator';
import SectionTransitionOverlay from '../../components/ui/SectionTransitionOverlay';
import Icon from '../../components/AppIcon';

import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import FilterTabs from './components/FilterTabs';

const PortfolioGallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [showTransition, setShowTransition] = useState(false);
  const galleryRef = useRef(null);
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);

  const [portfolioProjects, setPortfolioProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getAll();
        setPortfolioProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const filterCategories = useMemo(() => [
    { name: 'All', count: portfolioProjects.length },
    { name: 'Web Design', count: portfolioProjects.filter(p => p.category === 'Web Design').length },
    { name: 'Branding', count: portfolioProjects.filter(p => p.category === 'Branding').length },
    { name: 'Development', count: portfolioProjects.filter(p => p.category === 'Development').length }
  ], [portfolioProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return portfolioProjects;
    return portfolioProjects.filter(
      project => project.category?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, portfolioProjects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleCards = [];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            newVisibleCards.push(cardId);
          }
        });
        if (newVisibleCards.length > 0) {
          setVisibleCards(prev => [...new Set([...prev, ...newVisibleCards])]);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('[data-card-id]');
    const observer = observerRef.current;
    
    cards.forEach(card => observer?.observe(card));
    return () => cards.forEach(card => observer?.unobserve(card));
  }, [filteredProjects]);

  useEffect(() => {
    setVisibleCards([]);
  }, [activeFilter]);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    if (filter === activeFilter) return;
    
    window.requestAnimationFrame(() => {
      setActiveFilter(filter);
    });
  }, [activeFilter]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      <Header />
      <ScrollProgressIndicator />
      
      <SectionTransitionOverlay 
        isActive={showTransition}
        targetSection="portfolio-gallery"
        onComplete={() => setShowTransition(false)}
      />

      <section className="pt-20 lg:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            {/* Hero content remains the same */}
          </motion.div>

          <FilterTabs 
            categories={filterCategories}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          <LayoutGroup>
            <motion.div
              ref={galleryRef}
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project._id || project.id}
                    project={project}
                    index={index}
                    isVisible={visibleCards.includes(project._id || String(project.id))}
                    onClick={() => handleProjectClick(project)}
                    layoutId={`project-${project._id || project.id}`}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              {/* Empty state content remains the same */}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section and other sections remain the same */}

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-royal-full royal-shadow-lg flex items-center justify-center text-white hover:royal-shadow-xl royal-transition z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Icon name="ArrowUp" size={20} />
      </motion.button>
    </div>
  );
};

export default PortfolioGallery;