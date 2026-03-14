"use client";
import React, { useEffect } from "react";
import Faq from "@/components/Faq";
import Budget from "@/pages/Finance/Budget";
import Financing from "@/pages/Finance/Financing";
import Hero from "@/pages/Finance/Hero";
import Reviews from "@/pages/Home/Reviews";
import Benefits from "@/pages/Rental/Benefits";
import PreQualification from "@/pages/Rental/PreQualification";

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
  useEffect(() => {
    if (window.location.hash === "#faq") {
      setTimeout(() => {
        const element = document.getElementById("faq");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      <Hero />
      <SectionSeparator />

      <main className="w-full flex flex-col">
        <SectionWrapper>
          <Benefits />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <Budget />
        </SectionWrapper>
        <SectionSeparator />
        <Reviews />
        <SectionSeparator />
        <SectionWrapper>
          <PreQualification />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <Financing />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <Faq />
        </SectionWrapper>
      </main>
    </div>
  );
};

export default Page;
