"use client";

import React from "react";
import home4 from "../../assets/home-4.png";
import Link from "next/link";

const TradeIn = () => {
  return (
    <section className="w-full py-[60px] lg:py-[100px] px-[20px] lg:px-[0px]">
      <div className=" mx-auto flex flex-col items-center">
        {/* MAIN CONTAINER */}
        <div className="relative w-full flex flex-col items-center">
          {/* BANNER IMAGE SECTION */}
          <div className="relative w-full rounded-[20px] md:rounded-[32px] overflow-hidden    h-[250px] md:h-[500px] lg:h-[600px]">
            <img
              src={home4.src}
              alt="Trade in and save"
              className="absolute inset-0 w-full h-[180px] md:h-full object-cover object-center"
            />
            {/* Darker overlay to make the image premium */}
            <div className="absolute hidden lg-visible inset-0 bg-black/35" />
          </div>

          {/* FLOATING CARD - Centralized flex-col view */}
          <div className="relative z-20 -mt-[100px] md:-mt-[180px] w-[95%] md:w-full max-w-[800px] bg-white rounded-[16px] md:rounded-[23px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 p-6 md:p-12 flex flex-col items-center text-center gap-3 md:gap-6">
            {/* TEXT CONTENT - Centralized Column */}
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-[20px] md:text-[36px] font-bold text-[#272727] leading-tight">
                Trade in and save
              </h3>

              <p className="text-[10px] md:text-[16px] text-[#6D6D6D] font-medium leading-relaxed max-w-[450px]">
                Get up to 20% more for your car through tax savings when you
                trade it in
              </p>
            </div>

            {/* BUTTON ACTION */}
            <Link
              href={"/sell-car"}
              className="md:mt-2  mt-0 max-w-[500px] w-full  bg-primary hover:bg-primary/90 text-white font-semibold px-12 py-3 md:py-4 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap text-[16px] md:text-[18px]"
            >
              Get instant offer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeIn;
