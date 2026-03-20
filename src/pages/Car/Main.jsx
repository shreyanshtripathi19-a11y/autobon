"use client";

import { Heart, Share, ChevronLeft, ChevronRight, Gauge, Eye, Maximize } from "lucide-react";
import React, { useState, useRef } from "react";
import car1 from "../../assets/car-s1.png";
import car2 from "../../assets/car2.png";
import car3 from "../../assets/car3.png";
import Link from "next/link";

const Main = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [view, setView] = useState("exterior");
  const [activeTab, setActiveTab] = useState("Photos");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Touch swipe support
  const touchStartRef = useRef(null);
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveImageIndex((prev) => (prev + 1) % thumbnails.length);
      } else {
        setActiveImageIndex((prev) => (prev - 1 + thumbnails.length) % thumbnails.length);
      }
    }
    touchStartRef.current = null;
  };

  const tabs = [
    "Photos",
    "Overview",
    "Features/specs",
    "History/inspection",
    "Price",
  ];

  // --- NEW: Scroll Logic ---
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    const targetId = tab.toLowerCase().replace("/", "-").replace(/\s+/g, "-");
    const element = document.getElementById(targetId);

    if (element) {
      const yOffset = -120; // Clears 70px header + padding
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  // -------------------------

  const thumbnails = [car1, car2, car3];

  return (
    <div id="photos" className="w-full pb-10 px-4 lg:px-0 scroll-mt-28">
      {" "}
      {/* Added ID for first tab */}
      <div className="mx-auto max-w-[1200px]">
        {/* BREADCRUMBS & ACTIONS */}
        <div className="flex justify-between items-center py-4 lg:py-6">
          <nav className="flex items-center gap-1 lg:gap-2 text-[10px] lg:text-sm font-medium text-gray-500 overflow-x-auto no-scrollbar">
            <span className="whitespace-nowrap">All Cars</span> <ChevronRight size={12} className="flex-shrink-0" />
            <span className="whitespace-nowrap">Mercedes-Benz</span> <ChevronRight size={12} className="flex-shrink-0" />
            <span className="text-gray-900 whitespace-nowrap">E-class</span>
          </nav>
          <div className="hidden md:flex  items-center gap-2">
            <button className="p-1.5 transition-colors text-blue-500">
              <Share size={20} />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-1.5 transition-colors"
            >
              <Heart
                size={20}
                className={
                  isFavorite ? "fill-red-500 text-red-500" : "text-blue-500"
                }
              />
            </button>
          </div>
        </div>

        {/* BLUE NAVIGATION BAR */}
        <div className="flex w-full bg-primary rounded-full p-1 sm:p-1.5 py-1.5 sm:py-2 mb-6 lg:mb-10 items-center justify-between shadow-lg shadow-primary/20 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 min-w-max px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[14px] lg:text-[16px] font-medium rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-white text-black shadow-sm"
                  : "text-white hover:text-white/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT SECTION */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
          {/* LEFT COLUMN */}
          <div className="relative bg-[#f6f6f6] border border-gray-100 rounded-[16px] lg:rounded-[14px] p-4 lg:p-12 flex flex-col items-center justify-center min-h-[240px] sm:min-h-[300px] lg:min-h-[500px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute top-4 lg:top-auto lg:bottom-12 bg-black rounded-full p-1 flex items-center z-10">
              <button
                onClick={() => setView("exterior")}
                className={`px-5 lg:px-8 py-1.5 rounded-full text-[10px] lg:text-sm font-medium transition-all ${
                  view === "exterior" ? "bg-white text-black" : "text-white"
                }`}
              >
                Exterior
              </button>
              <button
                onClick={() => setView("interior")}
                className={`px-5 lg:px-8 py-1.5 rounded-full text-[10px] lg:text-sm font-medium transition-all ${
                  view === "interior" ? "bg-white text-black" : "text-white"
                }`}
              >
                Interior
              </button>
            </div>

            <button className="absolute top-4 right-4 text-gray-400 lg:hidden">
              <Maximize size={18} />
            </button>

            {/* Navigation arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 lg:w-10 lg:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
              onClick={() => setActiveImageIndex((prev) => (prev - 1 + thumbnails.length) % thumbnails.length)}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 lg:w-10 lg:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
              onClick={() => setActiveImageIndex((prev) => (prev + 1) % thumbnails.length)}
              aria-label="Next image"
            >
              <ChevronRight size={18} className="text-gray-700" />
            </button>

            <div className="w-full py-8 lg:py-2 flex items-center justify-center">
              <img
                src={thumbnails[activeImageIndex].src}
                alt="Car Main View"
                className="w-full h-auto object-contain scale-110 lg:scale-100 transition-opacity duration-300"
              />
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {thumbnails.map((_, idx) => (
                <button
                  key={idx}
                  className={`rounded-full transition-all duration-200 ${
                    activeImageIndex === idx
                      ? "bg-primary w-2.5 h-2.5"
                      : "bg-gray-400/50 w-2 h-2 hover:bg-gray-400"
                  }`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-white border border-gray-100 lg:border-border rounded-[16px] lg:rounded-[14px] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h1 className="text-[20px] sm:text-[24px] lg:text-[32px] font-bold text-black leading-tight">
                  2019 Mercedes-Benz E-Class
                </h1>

                <div className="flex items-center gap-2 text-[11px] sm:text-[12px] md:text-sm mt-1 sm:mt-2 lg:text-base text-[#606060] font-medium">
                  <span>E 300 4MATIC</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <Gauge size={16} className="text-gray-400" />
                    <span>14,200 km</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="price" className="flex flex-col gap-1 scroll-mt-28">
              {" "}
              {/* Added ID for Price tab */}
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-[18px] sm:text-[22px] blur-[8px] lg:text-[28px] font-bold text-black">
                  $57,990
                </span>
                <span className="text-red-500 blur-[6px] font-semibold line-through text-sm sm:text-base lg:text-xl opacity-70">
                  $62,000
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-gray-500">
                <span className="font-medium blur-[5px]">629/monthly</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>$0 down</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                <Link
                  href={"/pre-qualify"}
                  className="w-full sm:w-auto text-center lg:w-max px-8 sm:px-12 py-2.5 sm:py-3 bg-primary text-white rounded-full font-medium text-sm sm:text-base hover:bg-primary/90 transition-all shadow-md"
                >
                  Get Pre-Approved
                </Link>

                <a
                  href="tel:9058003100"
                  className="w-full sm:w-auto text-center lg:w-max px-8 sm:px-12 py-2.5 sm:py-3 border border-black text-black rounded-full font-medium text-sm sm:text-base transition-all inline-block cursor-pointer"
                >
                  Contact Us
                </a>
              </div>

              {/* <a
                href="tel:9058003100"
                className="text-primary hover:underline lg:ml-2"
              >
                905-800-3100
              </a> */}
            </div>
            <div className="flex flex-col gap-4 mt-2 sm:mt-4 lg:mt-8">
              <div className="grid grid-cols-3 gap-3">
                {thumbnails.map((img, i) => (
                  <div
                    key={i}
                    className={`aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border-2 cursor-pointer transition-colors ${
                      activeImageIndex === i ? "border-primary" : "border-gray-100 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveImageIndex(i)}
                  >
                    <img
                      src={img.src}
                      alt="thumb"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
