import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import ScrollProgressIndicator from "../../components/ui/ScrollProgressIndicator";
import Icon from "../../components/AppIcon";

import { lazy, Suspense } from "react";

const HeroSection = lazy(() => import("./components/HeroSection"));
const PortfolioPreview = lazy(() => import("./components/PortfolioPreview"));
const SkillsBadges = lazy(() => import("./components/SkillsBadges"));
const TestimonialsSection = lazy(
  () => import("./components/TestimonialsSection"),
);
const LoadingAnimation = lazy(() => import("./components/LoadingAnimation"));
const DetailSkills = lazy(() => import("./components/DetailSkills"));

const HeroLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: true,
    portfolio: false,
    skills: false,
    testimonials: false,
    detailSkills: false,
  });

  const heroRef = useRef(null);
  const portfolioRef = useRef(null);
  const skillsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const detailSkillsRef = useRef(null);
  // Handle loading screen
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced loading time
    return () => clearTimeout(loadingTimer);
  }, []);

  // Track scroll for parallax effect and section visibility
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          // Check each section's visibility
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.target === heroRef.current) {
                  setIsVisible((prev) => ({
                    ...prev,
                    hero: entry.isIntersecting,
                  }));
                } else if (entry.target === portfolioRef.current) {
                  setIsVisible((prev) => ({
                    ...prev,
                    portfolio: entry.isIntersecting,
                  }));
                } else if (entry.target === skillsRef.current) {
                  setIsVisible((prev) => ({
                    ...prev,
                    skills: entry.isIntersecting,
                  }));
                } else if (entry.target === testimonialsRef.current) {
                  setIsVisible((prev) => ({
                    ...prev,
                    testimonials: entry.isIntersecting,
                  }));
                } else if (entry.target === detailSkillsRef.current) {
                  setIsVisible((prev) => ({
                    ...prev,
                    detailSkills: entry.isIntersecting,
                  }));
                }
              });
            },
            { threshold: 0.2 },
          );

          // Observe all sections
          [
            heroRef,
            portfolioRef,
            skillsRef,
            testimonialsRef,
            detailSkillsRef,
          ].forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <ScrollProgressIndicator />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-2 h-2 bg-accent-400 rounded-full opacity-60 animate-pulse"
          style={{
            top: "20%",
            left: "10%",
            transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
          }}
        />
        <div
          className="absolute w-3 h-3 bg-accent-500 rounded-full opacity-40 animate-pulse"
          style={{
            top: "60%",
            right: "15%",
            transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
            animationDelay: "200ms",
          }}
        />
        <div
          className="absolute w-1 h-1 bg-accent-300 rounded-full opacity-80 animate-pulse"
          style={{
            top: "40%",
            left: "80%",
            transform: `translate3d(0, ${scrollY * 0.08}px, 0)`,
            animationDelay: "400ms",
          }}
        />
        <div
          className="absolute w-32 h-32 border border-primary-200 opacity-10 rounded-full"
          style={{
            top: "30%",
            left: "5%",
            transform: `translate3d(0, ${scrollY * 0.2}px, 0) rotate(${scrollY * 0.1}deg)`,
          }}
        />
        <div
          className="absolute w-24 h-24 border border-accent-300 opacity-15 rounded-royal"
          style={{
            top: "70%",
            right: "10%",
            transform: `translate3d(0, ${scrollY * 0.12}px, 0) rotate(${-scrollY * 0.08}deg)`,
          }}
        />
      </div>

      {/* Main Page Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Suspense fallback={<LoadingAnimation />}>
          <section ref={heroRef} className="relative">
            <HeroSection isVisible={isVisible.hero} scrollY={scrollY} />
          </section>
        </Suspense>

        {/* Portfolio Section */}
        <Suspense fallback={<LoadingAnimation />}>
          <section ref={portfolioRef} className="relative py-20 bg-surface">
            <PortfolioPreview isVisible={isVisible.portfolio} />
          </section>
        </Suspense>

        {/* Skills Section */}
        <Suspense fallback={<LoadingAnimation />}>
          <section ref={skillsRef} className="relative py-20 bg-background">
            <SkillsBadges isVisible={isVisible.skills} />
          </section>
        </Suspense>

        {/* Testimonials Section */}
        {/* <section ref={testimonialsRef} className="relative py-20 bg-surface">
          <TestimonialsSection isVisible={isVisible.testimonials} />
        </section> */}

        {/* Skills Section */}
        <Suspense fallback={<LoadingAnimation />}>
          <section
            ref={detailSkillsRef}
            className="relative py-20 bg-background"
          >
            <DetailSkills isVisible={isVisible.detailSkills} />
          </section>
        </Suspense>

        {/* Call to Action */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary-700 to-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Create Something Royal?
              </h2>
              <p className="text-primary-200 text-lg mb-8">
                Let's collaborate and bring your vision to life with premium
                design and development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/portfolio-gallery"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-medium px-8 py-3 rounded-royal-md royal-shadow hover:royal-shadow-md transition-all duration-300"
                >
                  <Icon name="Briefcase" size={20} />
                  <span>View Full Portfolio</span>
                </Link>
                <Link
                  to="/contact-footer"
                  className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-royal-md royal-border hover:border-accent-400 transition-all duration-300"
                >
                  <Icon name="Mail" size={20} />
                  <span>Get In Touch</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="absolute top-8 left-8 opacity-20">
            <Icon
              name="Crown"
              size={32}
              color="#B8860B"
              className="animate-pulse"
            />
          </div>
          <div className="absolute bottom-8 right-8 opacity-20">
            <Icon
              name="Sparkles"
              size={32}
              color="#B8860B"
              className="animate-pulse"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HeroLandingPage;
