"use client";

import React from "react";
import { Check, X } from "lucide-react";
import leaf from "../../assets/leaf.webp";

const WhySellToAutobon = () => {
  const comparisonData = [
    {
      autobon: "10 days to try it out",
      autobonSub: "Take your time to know the car",
      oldway: "No return option",
      oldwaySub: "Sale is final",
    },
    {
      autobon: "Only 15 mins on average",
      autobonSub: "Quick and efficient process",
      oldway: "Haggling forever",
      oldwaySub: "Hours spent at dealerships",
    },
    {
      autobon: "You pick your route",
      autobonSub: "City, highway, night, rain, etc.",
      oldway: "Seller picks route",
      oldwaySub: "Limited speeds/conditions",
    },
    {
      autobon: "Completely unaccompanied",
      autobonSub: "No pressure, no rush",
      oldway: "Accompanied by salesperson",
      oldwaySub: "Constant pressure to decide",
    },
    {
      autobon: "Full money-back guarantee",
      autobonSub: "For any reason",
      oldway: "Limited feel for quirks",
      oldwaySub: "Hidden issues stay yours",
    },
  ];

  const renderCardItems = (type) => (
    <div className="flex-1 flex flex-col">
      {comparisonData.map((item, i) => (
        <div
          key={i}
          // Reduced padding from p-5/p-6 to p-4
          className={`flex-1 p-4 lg:p-4 flex items-start justify-start gap-4 border-b border-gray-100 last:border-0 ${
            i % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
          }`}
        >
          <div className="flex flex-col text-left">
            <span
              className={`text-[13px] lg:text-[15px] leading-tight ${
                type === "autobon"
                  ? "font-semibold text-black"
                  : "font-semibold text-[#272727]"
              }`}
            >
              {type === "autobon" ? item.autobon : item.oldway}
            </span>
            <span className="text-[11px] lg:text-[13px] text-gray-500 font-medium mt-1">
              {type === "autobon" ? item.autobonSub : item.oldwaySub}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full bg-background py-[60px] lg:py-[100px] overflow-hidden">
      <style jsx>{`
        @keyframes leaf-rotate {
          0% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
          100% {
            transform: rotate(-10deg);
          }
        }
        .animate-leaf {
          animation: leaf-rotate 3s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto px-[20px] lg:px-[0px] flex flex-col items-center">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-4 mb-[40px] lg:mb-[60px] text-center">
          <h2 className="text-[32px] lg:text-[54px] font-semibold text-black tracking-tight leading-tight max-w-[900px]">
            Why sell your car online to{" "}
            <span className="text-primary">Autobon?</span>
          </h2>
        </div>

        {/* MAIN CONTAINER - Added max-w-[1100px] to shrink the overall width */}
        <div className="flex flex-col md:flex-row lg:px-20 w-full max-w-[1100px] items-center justify-center gap-0 md:gap-6 lg:gap-10">
          {/* THE AUTOBON WAY - PRIMARY */}
          <div className="relative w-full md:flex-1 overflow-hidden order-1 md:order-1 flex flex-col bg-white rounded-[10px] md:scale-100 border border-[#DDDDDD] sp-shadow z-20">
            {/* Reduced padding in header */}
            <div className="p-6 pb-4 flex justify-between items-center border-b border-[#DDDDDD] bg-white rounded-t-[20px]">
              <div>
                <h3 className="text-[20px] lg:text-[26px] font-bold text-[#272727]">
                  The <span className="text-primary">Autobon</span> way
                </h3>
              </div>
              <img
                src={leaf.src}
                alt="Leaf"
                className="animate-leaf w-8 h-8 lg:w-10 lg:h-10"
              />
            </div>
            {renderCardItems("autobon")}
          </div>

          {/* VS INDICATOR */}
          <div className="order-2 flex items-center justify-center mt-5">
            <div className="text-[#606060] font-semibold w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center italic text-lg lg:text-xl z-30">
              -VS-
            </div>
          </div>

          {/* THE OLD WAY - SECONDARY */}
          <div className="w-full scale-90 md:flex-1 order-3 md:order-3 flex flex-col bg-white border border-[#DDDDDD] rounded-[10px] overflow-hidden opacity-90 md:opacity-80 md:scale-90 transition-all hover:opacity-100">
            {/* Reduced padding in header */}
            <div className="p-6 pb-4 bg-white border-b border-[#DDDDDD] bg-[#F9F9F9]">
              <h3 className="text-[20px] font-bold text-[#272727]">
                The old way
              </h3>
            </div>
            {renderCardItems("oldway")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySellToAutobon;
