"use client";

import React, { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";
import leaf from "../../assets/leaf.webp";

const SellYourCar = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const comparisonData = [
    {
      dealerships: "Slow Appraisals",
      autobon: "Immediate offers",
      private: "Low ball offers",
    },
    {
      dealerships: "Low ball offers",
      autobon: "Best prices",
      private: "Scams & fraud risks",
    },
    {
      dealerships: "Slow Appraisals",
      autobon: "Instant payments",
      private: "Safety concerns",
    },
    {
      dealerships: "Endless Negotiation",
      autobon: "Same day purchase",
      private: "Endless haggling",
    },
  ];

  const slides = [
    { id: "dealerships", title: "Dealerships" },
    {
      id: "autobon",
      title: (
        <>
          The <span className="text-primary">AUTOBON</span> way
        </>
      ),
    },
    { id: "private", title: "Private sellers" },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const timer = setTimeout(() => {
        container.scrollTo({
          left: container.offsetWidth,
          behavior: "instant",
        });
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
      if (newIndex !== activeIndex) setActiveIndex(newIndex);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const renderCardItems = (type) => (
    <div className="flex-1 flex flex-col">
      {comparisonData.map((item, i) => (
        <div
          key={i}
          className={`flex-1 p-6 flex items-center justify-start gap-3 text-black font-semibold text-[16px] border-b border-gray-100 last:border-0 ${
            i % 2 === 0 ? "bg-[#fafafa]" : "bg-white"
          } ${i === comparisonData.length - 1 ? "rounded-b-[12px]" : ""}`}
        >
          {type === "autobon" && (
            <Check size={20} className="text-primary shrink-0" />
          )}
          <span
            className={`text-start ${type === "autobon" ? "font-semibold" : "font-medium text-gray-700"}`}
          >
            {item[type]}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full bg-background pt-[80px] pb-[120px]">
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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-custom mx-auto px-0 lg:px-0 flex flex-col items-center overflow-x-hidden">
        <div className="flex flex-col items-center gap-4 mb-[40px] md:mb-[80px] text-center px-4">
          <h2 className="text-[30px] lg:text-[54px] font-semibold text-black tracking-tight leading-tight max-w-[80vw]">
            Why sell your car online to{" "}
            <span className="text-primary">Autobon</span>?
          </h2>
          <p className="text-gray-500 text-[16px] lg:text-[18px]">
            Experience a faster, safer, and more profitable way to sell your
            vehicle.
          </p>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden w-full relative">
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar pt-14 pb-10 px-2"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {slides.map((slide, index) => {
              const isAutobon = slide.id === "autobon";
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  className="w-full flex-shrink-0 snap-center px-8 box-border"
                >
                  <div
                    className={`flex flex-col bg-white border rounded-[12px] h-full transition-all duration-500 border-[#DDDDDD] ${
                      activeIndex === index
                        ? `relative z-10 ${slide.id === "autobon" ? "sp-shadow" : "shadow-lg"}`
                        : "scale-[0.95] opacity-40 grayscale"
                    }`}
                  >
                    <div className="p-6 border-b border-[#DDDDDD] flex justify-between items-center bg-white rounded-t-[12px]">
                      <h3 className="text-[20px] font-bold">{slide.title}</h3>
                      {isAutobon && (
                        <img
                          src={leaf.src}
                          alt="Leaf"
                          className="animate-leaf w-10 h-10"
                        />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      {renderCardItems(slide.id)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-3 mt-4">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-primary w-12" : "bg-gray-300 w-2"}`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid w-full grid-cols-3 gap-[30px] items-stretch mt-10 px-4 py-10 overflow-visible">
          {slides.map((slide, idx) => (
            <div key={idx} className="relative overflow-visible">
              {slide.id === "autobon" && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    zIndex: 0,

                    borderRadius: "10px",
                    transform: "scale(1.05)",
                  }}
                />
              )}
              <div
                className={`relative h-full flex flex-col bg-white ${idx === 1 ? "sp-shadow" : ""} border border-[#DDDDDD] rounded-[10px] transition-all z-10 ${slide.id === "autobon" ? "scale-105" : ""}`}
              >
                <div className="p-8 pb-4 flex justify-between items-center border-b border-[#DDDDDD] bg-white rounded-t-[10px]">
                  <h3 className="text-[22px] font-bold text-[#272727]">
                    {slide.title}
                  </h3>
                  {slide.id === "autobon" && (
                    <img
                      src={leaf.src}
                      alt="Leaf"
                      className="animate-leaf w-12 h-12"
                    />
                  )}
                </div>
                {renderCardItems(slide.id)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellYourCar;
