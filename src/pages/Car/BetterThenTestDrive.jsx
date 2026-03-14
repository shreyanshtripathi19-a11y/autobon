"use client";

import React, { useRef, useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import leaf from "../../assets/leaf.webp";

const BetterThenTestDrive = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const comparisonData = [
    {
      autobon: "10 days to try it out",
      autobonSub: "take your time to know the car",
      oldway: "Only 15 mins on average",
      oldwaySub: "limited feel for comfort or quirks",
    },
    {
      autobon: "You pick your route",
      autobonSub: "city, highway, night, rain, etc.",
      oldway: "Seller picks route",
      oldwaySub: "limited speeds/conditions",
    },
    {
      autobon: "Completely unaccompanied",
      autobonSub: "no pressure, no rush",
      oldway: "Accompanied by salesperson",
      oldwaySub: "pressure to decide",
    },
    {
      autobon: "Full money-back guarantee",
      autobonSub: "for any reason",
      oldway: "No return option",
      oldwaySub: "sale is final",
    },
  ];

  const slides = [
    {
      type: "autobon",
      title: (
        <>
          The <span className="text-primary">Autobon</span> Way
        </>
      ),
    },
    { type: "oldway", title: "The old way" },
  ];

  // Handle mobile scroll index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const renderCardItems = (type) => (
    <div className="flex-1 flex flex-col">
      {comparisonData.map((item, i) => (
        <div
          key={i}
          className={`flex-1 p-4 lg:p-4 flex items-start justify-start gap-4 border-b border-gray-100 last:border-0 ${
            i % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
          }`}
        >
          <div className="flex flex-col text-left">
            <span
              className={`text-[13px] lg:text-[15px] leading-tight ${
                type === "autobon"
                  ? "font-medium text-[#272727]"
                  : "font-medium text-[#606060]"
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
    <section className="w-full py-[40px] sm:py-[60px] lg:py-[100px] overflow-hidden bg-background">
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
        .sp-shadow {
          box-shadow:
            0px 20px 50px -10px rgba(0, 0, 0, 0.12),
            0px 10px 20px -5px rgba(0, 0, 0, 0.08);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-[30px] sm:mb-[40px] lg:mb-[60px] text-center px-4 sm:px-6">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[36px] font-semibold text-black tracking-tight leading-tight max-w-[900px]">
            Better than a test drive – Try it for 10 days!
          </h2>
          <p className="text-[#606060] font-medium text-[11px] sm:text-[12px] lg:text-[16px]">
            All our cars come with a 10-day money back guarantee
          </p>
        </div>

        {/* MOBILE CAROUSEL VIEW */}
        <div className="md:hidden w-full relative overflow-visible">
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar py-10"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 snap-center px-6 box-border"
              >
                <div
                  className={`flex flex-col bg-white border rounded-b-[10px] rounded-[10px] transition-all duration-500 border-[#DDDDDD] ${
                    activeIndex === index
                      ? "scale-105 sp-shadow opacity-100"
                      : "scale-90 opacity-40 grayscale"
                  }`}
                >
                  <div className="p-6 pb-4 flex justify-between items-center border-b border-[#DDDDDD] bg-white rounded-t-[10px]">
                    <h3 className="text-[20px] font-bold text-[#272727]">
                      {slide.title}
                    </h3>
                    {slide.type === "autobon" && (
                      <img
                        src={leaf.src}
                        alt="Leaf"
                        className="animate-leaf w-10 h-10"
                      />
                    )}
                  </div>
                  {renderCardItems(slide.type)}
                </div>
              </div>
            ))}
          </div>

          {/* CAROUSEL INDICATORS */}
          <div className="flex justify-center gap-3 mt-2">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "bg-primary w-8" : "bg-gray-300 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP GRID VIEW */}
        <div className="hidden md:flex flex-row lg:px-10 w-full max-w-[1200px] items-stretch justify-center gap-6 lg:gap-10">
          {/* THE AUTOBON WAY */}
          <div className="relative flex-1 flex flex-col bg-white rounded-[10px] border border-[#DDDDDD] sp-shadow z-20">
            <div className="p-6 pb-4 flex justify-between items-center border-b border-[#DDDDDD] bg-white rounded-t-[10px]">
              <h3 className="text-[20px] lg:text-[26px] font-bold text-[#272727]">
                The <span className="text-primary">Autobon</span> Way
              </h3>
              <img
                src={leaf.src}
                alt="Leaf"
                className="animate-leaf w-10 h-10 lg:w-12 lg:h-12"
              />
            </div>
            {renderCardItems("autobon")}
          </div>

          {/* VS INDICATOR (Desktop Only) */}
          <div className="flex items-center justify-center">
            <div className="text-[#606060] font-semibold italic text-lg lg:text-xl">
              -VS-
            </div>
          </div>

          {/* THE OLD WAY */}
          <div className="flex-1 flex flex-col bg-white border border-[#DDDDDD] rounded-[10px] overflow-hidden opacity-80 scale-95 transition-all hover:opacity-100 hover:scale-100">
            <div className="p-6 pb-4 bg-[#F9F9F9] border-b border-[#DDDDDD]">
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

export default BetterThenTestDrive;
