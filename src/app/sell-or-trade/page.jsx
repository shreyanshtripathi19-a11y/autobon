import React from "react";
import Faq from "@/components/Faq";
import Reviews from "@/pages/Home/Reviews";
import DealerNetwork from "@/pages/SellOrTrade/DealerNetwork";
import ExploreAdvantages from "@/pages/SellOrTrade/ExploreAdvantages";
import Hero from "@/pages/SellOrTrade/Hero";
import HowitWorks from "@/pages/SellOrTrade/HowitWorks";
import HowYouGetPaid from "@/pages/SellOrTrade/HowYouGetPaid";
import LoanOrLease from "@/pages/SellOrTrade/LoanOrLease";
import TradeIn from "@/pages/SellOrTrade/TradeIn";
import WhySellToAutobon from "@/pages/SellOrTrade/WhySellToAutobon";

const SectionSeparator = () => (
  <div className="w-full flex justify-center">
    <div className="w-full lg:mx-0 mx-6 max-w-[1200px] h-[1px] bg-[#E4E4E4]" />
  </div>
);

export const SectionWrapper = ({ children }) => (
  <div className="w-full flex justify-center">
    <div className="w-full max-w-[1200px]">{children}</div>
  </div>
);

const Page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      <SectionWrapper>
        <Hero />
      </SectionWrapper>
      <SectionSeparator />

      <div className="w-full flex flex-col">
        <SectionWrapper>
          <HowitWorks />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <HowYouGetPaid />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <DealerNetwork />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <WhySellToAutobon />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <LoanOrLease />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <ExploreAdvantages />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <TradeIn />
        </SectionWrapper>
        <SectionSeparator />
        <SectionWrapper>
          <Faq />
        </SectionWrapper>
        <SectionSeparator />
        <Reviews />
      </div>
    </div>
  );
};

export default Page;
