import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import HeroLandingPage from "pages/hero-landing-page";
import AboutSkillsShowcase from "pages/about-skills-showcase";
import PortfolioGallery from "pages/portfolio-gallery";
import ContactFooter from "pages/contact-footer";
import Resume from "pages/resume";
import AchievementsPage from "pages/achievements";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold text-red-500">404</h1>

      <p className="mt-4 text-2xl">
        भाई route नहीं मिला 😭
      </p>

      <p className="mt-2 text-gray-400">
        URL ऐसा डाल रहा है जैसे hacker NASA hack करने आया हो 💀
      </p>
    </div>
  );
};
const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<HeroLandingPage />} />
          <Route path="/hero-landing-page" element={<HeroLandingPage />} />
          <Route path="/about-skills-showcase" element={<AboutSkillsShowcase />} />
          <Route path="/portfolio-gallery" element={<PortfolioGallery />} />
          <Route path="/contact-footer" element={<ContactFooter />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/achievements" element={<AchievementsPage />} />

           {/* 😈 Roast 404 Route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;