"use client";
import React from "react";
import Faq from "@/components/Faq";
import Benefits from "@/pages/Rental/Benefits";
import BoS2 from "@/pages/Rental/BoS2";
import BuyingOrSelling from "@/pages/Rental/BuyingOrSelling";
import DiscoverOptions from "@/pages/Rental/DiscoverOptions";
import FeaturedCars from "@/pages/Rental/FeaturedCars";
import Hero from "@/pages/Rental/Hero";
import ThreeCards from "@/pages/Rental/ThreeCards";

const SectionSeparator = () => (
  <div className="w-full flex justify-center">
    <div className="w-full lg:mx-0 mx-6 max-w-[1200px] h-[1px] bg-[#E4E4E4]" />
  </div>
);

const SectionWrapper = ({ children }) => (
  <div className="w-full flex justify-center">
    <div className="w-full max-w-[1200px]">{children}</div>
  </div>
);

const Page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      <Hero />
      <SectionWrapper>
        <ThreeCards />
      </SectionWrapper>
      <SectionSeparator />
      <DiscoverOptions />
      <SectionSeparator />
      <SectionWrapper>
        <BuyingOrSelling />
      </SectionWrapper>
      <SectionSeparator />
      <SectionWrapper>
        <BoS2 />
      </SectionWrapper>
      <SectionSeparator />
      <SectionWrapper>
        <FeaturedCars />
      </SectionWrapper>
      <SectionSeparator />
      <SectionWrapper>
        <Faq />
      </SectionWrapper>
    </div>
  );
};

export default Page;
