"use client";

import React from "react";
import home1 from "../../assets/rental-1.png";
import Image from "next/image";
import { Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full bg-background overflow-hidden relative flex flex-col lg:flex-row lg:items-center min-h-fit py-[60px] lg:py-[60px] ">
      <div className="mx-auto max-w-[1200px] w-full lg:pl-0 lg:pr-0 pl-[30px] pr-5 z-20 pointer-events-none">
        <div className="w-full lg:w-[50%] flex flex-col gap-[20px] text-left pointer-events-auto">
          {/* Social Proof Badge */}
          <div className="w-fit font-medium text-[11px] sm:text-[15px] text-black flex items-center gap-2 bg-white px-3 lg:px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <Star fill="#1a6adb" size={16} className="text-primary" />
            5.0 Star Rating from Thousands of Customers
          </div>

          {/* Heading */}
          <h1 className="text-[42px] sm:text-[60px] lg:text-[75px] font-bold text-black leading-[1.1] tracking-tight">
            Any Car,
            <br className="hidden lg:block" /> Any Where
          </h1>

          <div className="w-full flex flex-col gap-[30px] lg:gap-[40px]">
            {/* Subtext */}
            <p className="font-normal text-[#7B7B7B] text-[14px] sm:text-[18px] max-w-[420px] leading-relaxed">
              No Used Car lots, No pressure. Shop the nation&apos;s inventory.
            </p>

            {/* Buttons */}
            <div className="w-full flex flex-row justify-start items-center gap-[12px] lg:gap-[20px]">
              <button className="w-[140px] lg:w-[220px] h-[45px] lg:h-[65px] flex items-center justify-center font-semibold text-[13px] lg:text-[18px] rounded-full bg-primary text-white hover:bg-primary-hover hover:scale-105 transition-all shadow-lg active:scale-95">
                Get Instant Offer
              </button>

              <button className="w-[140px] lg:w-[220px] h-[45px] lg:h-[65px] flex items-center justify-center font-semibold text-[13px] lg:text-[18px] rounded-full bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all shadow-lg active:scale-95">
                Browse Cars
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. IMAGE LAYER: Desktop (TOUCHING RIGHT SCREEN EDGE) */}
      {/* Moved OUTSIDE the 1200px div and set to absolute right-0 */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[50%] pr-[80px] items-center justify-end z-10">
        <div
          className="relative w-full h-[110%] translate-x-[10%] select-none"
          style={{
            maskImage: "radial-gradient(circle, black 85%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle, black 85%, transparent 100%)",
          }}
        >
          <Image
            src={home1}
            alt="Rental Car Showcase"
            fill
            priority
            className="object-contain object-right"
          />
        </div>
      </div>

      {/* 3. IMAGE LAYER: Mobile (Stacks underneath content) */}
      <div className="lg:hidden w-full px-5 mt-10 flex justify-center">
        <div className="relative w-full aspect-[16/9] max-w-[600px]">
          <Image
            src={home1}
            alt="Rental Car Showcase"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
