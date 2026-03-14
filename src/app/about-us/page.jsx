import AboutHero from "@/pages/AboutUs/AboutHero";
import OurInvestors from "@/pages/AboutUs/OurInvestors";
import OurStory from "@/pages/AboutUs/OurStory";
import OurTeam from "@/pages/AboutUs/OurTeam";
import StatsSection from "@/pages/AboutUs/StatSection";
import WhyAutobon from "@/pages/AboutUs/WhyAutobon";
import React from "react";

const AboutPage = () => {
  return (
    <main className="flex flex-col w-full">
      <AboutHero />
      <OurStory />
      <StatsSection />
      <WhyAutobon />
      {/* <OurTeam /> */}
      <OurInvestors />
    </main>
  );
};

export default AboutPage;
