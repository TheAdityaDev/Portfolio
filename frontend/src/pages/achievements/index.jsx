import React from "react";
import ScrollProgressIndicator from "components/ui/ScrollProgressIndicator";
import Achievements from "./components/Achievements";
import Header from "components/ui/Header";

const AchievementsPage = () => {
  return (
    <>
    
    <Header />
    <ScrollProgressIndicator />
    <Achievements className="absolute z-10 inset-0" />
    </>
  );
};

export default AchievementsPage;
