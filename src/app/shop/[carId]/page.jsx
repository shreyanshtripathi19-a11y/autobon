import { SectionWrapper } from "@/app/sell-or-trade/page";
import BetterThenTestDrive from "@/pages/Car/BetterThenTestDrive";
import FeaturesAndSpecs from "@/pages/Car/FeaturesAndSpecs";
import Highlights from "@/pages/Car/Highlights";
import HistoryAndInspection from "@/pages/Car/HistoryAndInspection";
import Main from "@/pages/Car/Main";
import PriceSection from "@/pages/Car/PriceSection";
import ReadyToFinance from "@/pages/Car/ReadyToFinance";
import SimilarDeals from "@/pages/Car/SimilarDeal";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen py-4 sm:py-[40px] w-full flex flex-col bg-background overflow-x-hidden">
      <SectionWrapper>
        <Main />
        <Highlights />
      </SectionWrapper>
      <SectionWrapper>
        <BetterThenTestDrive />
      </SectionWrapper>{" "}
      <SectionWrapper>
        <FeaturesAndSpecs />
      </SectionWrapper>{" "}
      <SectionWrapper>
        <HistoryAndInspection />
      </SectionWrapper>{" "}
      <SectionWrapper>
        <PriceSection />
      </SectionWrapper>
      <SectionWrapper>
        <SimilarDeals />
      </SectionWrapper>
    </div>
  );
};

export default page;
