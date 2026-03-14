"use client";

import React, { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";
import leaf from "../../assets/leaf.webp";

const TraditionalDealerships = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const comparisonData = [
    {
      dealerships: "Limited inventory",
      autobon: "Nationwide Inventory of Cars",
      private: "Is it still available?",
    },
    {
      dealerships: "Haggling forever",
      autobon: "Budget Friendly vehicles",
      private: "Liens or stolen vehicles",
    },
    {
      dealerships: "Higher Retail Prices",
      autobon: "Certified inspection report",
      private: "No Guarantees",
    },
    {
      dealerships: "High-pressure tactics",
      autobon: "No Hidden Fees",
      private: "Hidden Carfax and disclosures",
    },
  ];

  const slides = [
    { type: "dealerships", title: "Dealerships" },
    {
      type: "autobon",
      title: (
        <>
          The <span className="text-primary">Autobon</span> way
        </>
      ),
    },
    { type: "private", title: "Private Sellers" },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const timer = setTimeout(() => {
        const centerOffset = container.offsetWidth;
        container.scrollTo({ left: centerOffset, behavior: "instant" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

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
          className={`flex-1 p-6 flex items-center justify-start gap-3 text-black font-semibold text-[14px] border-b border-gray-100 last:border-0 ${
            i % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
          } ${i === comparisonData.length - 1 ? "rounded-b-[12px]" : ""}`}
        >
          {type === "autobon" && (
            <Check size={18} className="text-primary shrink-0" />
          )}
          <span
            className={`text-start ${
              type === "autobon" ? "font-semibold" : "font-medium text-gray-700"
            }`}
          >
            {item[type]}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full bg-background py-[80px] overflow-hidden">
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
        /* Refined glow: higher blur and spread to prevent sharp edges */
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

      <div className="max-w-custom mx-auto px-[0px] lg:px-0 flex flex-col items-center">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-[30px] lg:text-[50px] font-semibold text-black leading-tight">
            Why <span className="text-primary">Autobon</span> beats traditional
            dealerships
          </h2>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden w-full relative overflow-visible">
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar py-14 overflow-y-visible"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 snap-center px-6 box-border overflow-visible"
              >
                <div
                  className={`flex flex-col bg-white border rounded-[12px] h-full transition-all duration-500 border-[#DDDDDD] ${
                    activeIndex === index
                      ? `relative z-10 scale-[1.05] ${slide.type === "autobon" ? "sp-shadow" : ""}`
                      : "scale-[0.9] opacity-40 grayscale"
                  }`}
                >
                  <div className="p-6 border-b border-[#DDDDDD] flex justify-between items-center bg-white rounded-t-[12px]">
                    <h3 className="text-[20px] font-bold">{slide.title}</h3>
                    {slide.type === "autobon" && (
                      <img
                        src={leaf.src}
                        alt="Leaf"
                        className="animate-leaf w-10 h-10"
                      />
                    )}
                  </div>
                  {/* Removed overflow-hidden from here to prevent glow clipping */}
                  <div className="flex-1 flex flex-col">
                    {renderCardItems(slide.type)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* INDICATORS */}
          <div className="flex justify-center gap-3 mt-4">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "bg-primary w-12" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid w-full grid-cols-3 gap-[30px] items-stretch">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col bg-white border border-[#DDDDDD] rounded-[10px] transition-all ${
                slide.type === "autobon" ? "sp-shadow z-20 scale-105" : "z-10"
              }`}
            >
              <div className="p-8 pb-4 border-b border-[#DDDDDD] flex justify-between items-center">
                <h3 className="text-[22px] font-bold text-[#272727]">
                  {slide.title}
                </h3>
                {slide.type === "autobon" && (
                  <img
                    src={leaf.src}
                    alt="Leaf"
                    className="animate-leaf w-12 h-12"
                  />
                )}
              </div>
              {renderCardItems(slide.type)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TraditionalDealerships;
