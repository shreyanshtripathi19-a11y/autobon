"use client";

import React from "react";
import fs1 from "../../assets/fs-1.png";
import fs2 from "../../assets/fs-2.png";
import fs3 from "../../assets/fs-3.png";
import fs4 from "../../assets/fs-4.png";
import fs5 from "../../assets/fs-5.png";

const FeaturesAndSpecs = () => {
  const specGroups = [
    {
      title: "Engine & Power",
      // Large category icon (Blue circle)
      headerIcon: fs1,
      items: [
        {
          label: "Aspiration",
          value: "TURBOCHARGED",
          isBadge: true,
          icon: fs1,
        },
        {
          label: "Engine Type",
          value: "Gasoline/I4",
          isBadge: true,
          icon: fs2,
        },
        { label: "Displacement", value: "2.0L", isBadge: true, icon: fs1 },
      ],
    },
    {
      title: "Performance",
      headerIcon: fs2,
      items: [
        { label: "City/Hwy", value: "11.1 / 8.1", isBadge: true, icon: fs4 },
        { label: "Drivetrain", value: "4MATIC AWD", isBadge: true, icon: fs2 },
        { label: "Mileage", value: "Low Mileage", isBadge: true, icon: fs5 },
      ],
    },
    {
      title: "Tech & Interior",
      headerIcon: fs3,
      items: [
        {
          label: "Smartphone",
          value: "Android Auto",
          isBadge: true,
          icon: fs3,
        },
        { label: "Lighting", value: "Ambient", isBadge: true, icon: fs3 },
        { label: "Exterior", value: "SILVER", isBadge: true, icon: fs5 },
      ],
    },
  ];

  return (
    <section
      id="features-specs"
      className="w-full px-4 md:px-0 py-6 sm:py-10 font-sans"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-12">
          Features and specs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {specGroups.map((group, idx) => (
            <div
              key={idx}
              className="bg-white border border-border rounded-[14px] px-4 sm:px-6 py-4 sm:py-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Header with Blue Circle Icon */}
              <div className="flex border-b border-border items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                  <img
                    src={group.headerIcon.src}
                    alt={group.title}
                    className="w-5 h-5 sm:w-7 sm:h-7 object-contain brightness-0 invert"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {group.title}
                </h3>
              </div>

              {/* Specs List */}
              <div className="space-y-4 sm:space-y-6">
                {group.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="shrink-0">
                        <img
                          src={item.icon.src}
                          alt={item.label}
                          className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain opacity-80"
                        />
                      </span>
                      <span className="text-[12px] sm:text-[14px] font-medium text-gray-500">
                        {item.label}
                      </span>
                    </div>

                    {item.isBadge ? (
                      <span className="bg-[#E8F1FF] text-primary text-[10px] sm:text-[11px] font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase tracking-tight">
                        {item.value}
                      </span>
                    ) : (
                      <span className="text-[13px] sm:text-[15px] font-bold text-gray-900">
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndSpecs;
