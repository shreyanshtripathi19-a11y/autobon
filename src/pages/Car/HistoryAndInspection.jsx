"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import fs4 from "../../assets/fs-4.png";
import fs5 from "../../assets/fs-5.png";

const HistoryAndInspection = () => {
  const sections = [
    {
      title: "Vehicle history",
      description:
        "Every car comes with a Carfax report for full history and records",
      icon: fs4,
      items: [
        "Zero open recalls",
        "Last registered in Ontario",
        "Never reported stolen",
      ],
      linkText: "View full Carfax report",
      linkUrl: "#",
    },
    {
      title: "Inspection report",
      description:
        "Our cars pass a 210-point inspection to ensure top quality standards",
      icon: fs5,
      items: [
        "No engine issues detected",
        "Passed road test certification",
        "Provincial Safety Certification approved",
      ],
      linkText: "View full Inspection report",
      linkUrl: "#",
    },
  ];

  return (
    <div id="history-inspection" className="w-full px-4 md:px-0 mt-4 sm:mt-6 font-sans">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#272727] text-center mb-6 sm:mb-12">
        History and inspection
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="border bg-white border-border rounded-[14px] p-4 sm:p-8 flex flex-col h-full hover:shadow-md transition-shadow duration-300"
          >
            {/* Header section with Image Icon */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-8">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-full flex-shrink-0 flex items-center justify-center shadow-lg shadow-primary/20">
                <img
                  src={section.icon.src}
                  alt={section.title}
                  className="w-5 h-5 sm:w-7 sm:h-7 object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-primary">
                  {section.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-[#606060] font-normal leading-snug mt-1">
                  {section.description}
                </p>
              </div>
            </div>

            {/* List items */}
            <div className="flex-1 space-y-3 sm:space-y-5">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 sm:gap-3 border-b border-border pb-3 sm:pb-4 last:border-0 last:pb-0"
                >
                  <img
                    src={section.icon.src}
                    alt="check"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain opacity-70"
                  />
                  <span className="text-[13px] sm:text-[15px] font-normal text-[#606060]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Link */}
            <div className="mt-6 sm:mt-10 pt-3 sm:pt-4 flex justify-end">
              <a
                href={section.linkUrl}
                className={`${
                  idx === 0 ? "text-primary " : "text-black"
                } underline font-bold text-[13px] sm:text-[15px] flex items-center gap-2 hover:opacity-80 decoration-2 underline-offset-4`}
              >
                {section.linkText}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryAndInspection;
