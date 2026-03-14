"use client";

import React, { useState } from "react";
import {
  Car,
  Zap,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  Handshake,
  DollarSign,
  FileText,
  Search,
  CheckCircle2,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ExploreAdvantages = () => {
  const [activeTab, setActiveTab] = useState("Can we buy right now?");

  const tabContent = {
    "Can we buy right now?": [
      {
        title: "How much can I sell for?",
        desc: "Get your offer today in just minutes.",
        icon: <TrendingUp size={24} />,
      },
      {
        title: "No wait time, sell today!",
        desc: "Selling to a dealer saves you time and hassle.",
        icon: <Clock size={24} />,
      },
      {
        title: "Skip Your Loan Payment",
        desc: "Say bye-bye to your loan payments today!",
        icon: <Zap size={24} />,
      },
      {
        title: "Safest way to sell",
        desc: "Avoid the hassle of strangers with trusted dealers.",
        icon: <ShieldCheck size={24} />,
      },
    ],
    "How much can I sell for?": [
      {
        title: "Instant Valuation",
        desc: "Real-time market data for accurate price.",
        icon: <DollarSign size={24} />,
      },
      {
        title: "Competitive Offers",
        desc: "Receive multiple competing offers easily.",
        icon: <Handshake size={24} />,
      },
      {
        title: "Market Analysis",
        desc: "We compare your car to hundreds of listings.",
        icon: <Search size={24} />,
      },
      {
        title: "Transparency",
        desc: "No hidden fees or surprises at any stage.",
        icon: <CheckCircle2 size={24} />,
      },
    ],
    "How long does it take?": [
      {
        title: "Minutes to Offer",
        desc: "Get an offer in under 2 minutes.",
        icon: <Clock size={24} />,
      },
      {
        title: "Same Day Sale",
        desc: "Drop off your car the same day you accept.",
        icon: <Zap size={24} />,
      },
      {
        title: "Fast Payment",
        desc: "Payments arriving within 24-48 hours.",
        icon: <DollarSign size={24} />,
      },
      {
        title: "No Paperwork Delay",
        desc: "Dealers handle all legal documents instantly.",
        icon: <FileText size={24} />,
      },
    ],
    "What is the process?": [
      {
        title: "1. Enter Details",
        desc: "Tell us about your car's make and model.",
        icon: <Car size={24} />,
      },
      {
        title: "2. Get Your Offer",
        desc: "Algorithm calculates a firm offer instantly.",
        icon: <FileText size={24} />,
      },
      {
        title: "3. Inspection",
        desc: "Quick 15-minute verification locally.",
        icon: <Search size={24} />,
      },
      {
        title: "4. Get Paid",
        desc: "Hand over keys and walk away with payment.",
        icon: <CheckCircle2 size={24} />,
      },
    ],
  };

  const tabs = Object.keys(tabContent);

  return (
    <section className="w-full py-20 px-3 lg:px-[0px] bg-[#FAFAFA]">
      <div className=" mx-auto">
        {/* CENTRALIZED HEADER */}
        <div className="flex flex-col items-center text-center mb-4 lg:mb-16">
          <h2 className="text-[28px] lg:text-[45px] capitalize font-bold text-[#272727] leading-tight  mb-4">
            We buy hundreds of cars every week!
          </h2>
          <p className="text-[#6D6D6D] text-[10px] lg:text-[18px] max-w-[600px] mb-8 ">
            Your car could be next. Get an offer, no strings attached
          </p>
          <Link
            href={"/sell-car"}
            className="w-max  text-[16px] lg:text-[18px] sm:w-[200px] px-5 py-3 lg:py-3.5 bg-primary hover:bg-primary/90 text-white  font-medium  lg:font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Get Instant Offer
          </Link>
        </div>

        {/* RESPONSIVE LAYOUT CONTAINER */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
          {/* SIDEBAR */}
          <div className="w-full py-4  lg:w-[350px] flex flex-col justify-between shrink-0">
            {/* TABS CONTAINER - HIDDEN SCROLLBAR ON MOBILE */}
            <div
              className="flex flex-row lg:flex-col lg:gap-[25px] overflow-x-auto lg:overflow-x-visible gap-0 
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative whitespace-nowrap lg:whitespace-normal text-left py-4 px-6 text-[10px] lg:text-[15px] font-semibold transition-all duration-300
                      ${
                        isActive
                          ? "text-primary lg:text-white border-b-2 border-primary lg:border-none"
                          : "text-[#606060] hover:text-black border-b-2 border-transparent lg:border-none"
                      }
                    `}
                  >
                    <div className="hidden lg:block">
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 bg-[#1A6ADB] rounded-l-full rounded-r-md z-0 shadow-md 
                                     after:content-[''] after:absolute after:top-1/2 after:-right-2 after:-translate-y-1/2 
                                     after:border-t-[8px] after:border-t-transparent 
                                     after:border-b-[8px] after:border-b-transparent 
                                     after:border-l-[10px] after:border-l-[#1A6ADB]"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </div>
                    <span className="relative z-10 font-medium">{tab}</span>
                  </button>
                );
              })}
            </div>

            {/* SIDEBAR BOTTOM CTA - CENTRALIZED & ALIGNED TO BOTTOM */}
            <div className="hidden lg:flex flex-col items-center text-center mt-auto pt-10">
              <SidebarCTA />
            </div>
          </div>

          {/* MAIN CONTENT AREA - STRICT 2x2 GRID */}
          <div className="flex-1 w-full p-2 lg:p-12  lg:pt-4 pt-2  border border-[#D8D8D8] bg-white shadow-lg">
            <h2 className="text-[16px] lg:text-[26px] px-2 text-center capitalize font-bold text-[#3E3E3E] tracking-tight my-6">
              Explore the advantages Cars we are buying right now
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 mb-2 gap-x-4 lg:gap-x-10 gap-y-2"
              >
                {tabContent[activeTab].map((card, index) => (
                  <div
                    key={index}
                    className="flex  rounded-[10px] lg:p-8 lg:py-p-12 p-4 flex-col justify-center items-center group"
                  >
                    <div className=" text-primary mb-4 transition-transform group-hover:scale-110">
                      {card.icon}
                    </div>
                    <h3 className="text-[14px] lg:text-[19px] font-semibold text-[#272727] mb-2 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-black text-[12px] lg:text-[15px] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MOBILE ONLY CTA - CENTRALIZED AT BOTTOM */}
          <div className="flex lg:hidden flex-col items-center text-center mt-10">
            <SidebarCTA />
          </div>
        </div>
      </div>
    </section>
  );
};

const SidebarCTA = () => (
  <div className="flex flex-col items-center text-center w-full max-w-[300px]">
    <h4 className="text-[18px] text-[#3E3E3E] font-bold capitalize mb-2">
      Ready to get started?
    </h4>
    <p className="text-gray-500 text-[14px] mb-6">
      Get your offer today in just minutes.
    </p>
    <Link
      href={"/sell-or-trade#sell-app"}
      className="flex justify-center items-center w-full h-[52px] border-2 border-primary rounded-full font-bold hover:bg-primary hover:text-white text-primary transition-all flex items-center justify-center gap-2"
    >
      Get instant offer <ArrowRight size={18} />
    </Link>
  </div>
);

export default ExploreAdvantages;
