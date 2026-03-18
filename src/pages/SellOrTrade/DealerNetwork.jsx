"use client";

import React from "react";
import map from "../../assets/map.webp";

const DealerNetwork = () => {
  return (
    <section className="w-full py-[60px] lg:py-[100px] overflow-hidden ">
      <div className="max-w-[1400px] mx-auto px-[20px] lg:px-[60px] flex flex-col items-center">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-4 mb-[40px] md:mb-[60px] text-center">
          <h2 className="text-[30px] md:text-[42px] lg:text-[54px] font-semibold text-black tracking-tight leading-tight">
            Canada's <span className="text-[#3B82F6]">Largest</span> Dealer
            Network
          </h2>
        </div>

        {/* MAP CONTAINER */}
        <div className="w-full relative">
          <div className="w-full flex justify-center items-center">
            {/* Fixed heights for consistent sizing, GPU-accelerated for mobile */}
            <div
              className="relative w-full md:w-auto h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] rounded-[18px] lg:rounded-[32px] overflow-hidden"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
              }}
            >
              <img
                src={map.src || map}
                alt="Canada Dealer Network Map"
                className="w-full h-full object-contain object-center"
                loading="eager"
                decoding="async"
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM BADGE */}
        <div className="bg-white mt-8 px-7 py-5 rounded-[8px] border border-gray-200 flex items-center gap-3">
          <p className="text-black text-[10px] lg:text-[14px] font-semibold">
            Autobon Buys Cars From Anywhere In Canada!
          </p>
        </div>
      </div>
    </section>
  );
};

export default DealerNetwork;
