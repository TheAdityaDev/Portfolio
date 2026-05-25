import React from "react";
import DeveloperUniverse from "./components/Resume";
import Header from "components/ui/Header";
import ScrollProgressIndicator from "components/ui/ScrollProgressIndicator";
import Snowfall from 'react-snowfall'

const Resume = () => {
  return (
    <>
      <Header />
      <ScrollProgressIndicator />
      <DeveloperUniverse className="absolute z-10 inset-0" />
      <Snowfall className="relative inset-0" snowflakeCount={100} color="#fff" />
    </>
  );
};

export default Resume;
