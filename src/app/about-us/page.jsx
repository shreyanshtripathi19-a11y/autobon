import AboutHero from "@/pages/AboutUs/AboutHero";
import OurStory from "@/pages/AboutUs/OurStory";
import StatsSection from "@/pages/AboutUs/StatSection";
import WhyAutobon from "@/pages/AboutUs/WhyAutobon";
import React from "react";

const AboutPage = () => {
  return (
    <main className="flex flex-col w-full">
      <AboutHero />
      <StatsSection />
      <WhyAutobon />
      <OurStory />
    </main>
  );
};

export default AboutPage;
