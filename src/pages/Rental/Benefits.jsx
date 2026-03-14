"use client";

import React from "react";
import f1 from "../../assets/f1.png";
import f2 from "../../assets/f2.png";
import f3 from "../../assets/f3.png";
import f4 from "../../assets/f4.png";

const Benefits = () => {
  const benefitData = [
    {
      title: "Know your budget",
      description:
        "Learn how much a lender is ready to lend you, empowering you to make informed purchasing decisions.",
      icon: f1,
    },
    {
      title: "Save time and effort",
      description:
        "Find a car that meets your budget faster by understanding how much you may be able to finance.",
      icon: f2,
    },
    {
      title: "Safe and secure",
      description: "Your personal information is safe and secured at Autobon.",
      icon: f3,
    },
    {
      title: "Won't impact credit score",
      description:
        "Our process will only complete a soft credit check that will not impact your actual credit score.",
      icon: f4,
    },
  ];

  return (
    <section className="w-full py-[80px] lg:py-[60px]">
      <div className="max-w-[1300px] mx-auto px-[20px] lg:px-[0px]">
        {/* HEADER */}
        <div className="mb-[60px] text-center">
          <h2 className="text-[30px] lg:text-[45px] font-semibold text-black tracking-tight leading-tight">
            Benefits Of Getting
            <br /> Prequalified For A Car loan:
          </h2>
        </div>

        {/* GRID CONTAINER */}
        <div className="relative w-full">
          {/* INTERNAL DIVIDERS (The Cross) - Hidden on mobile, visible on MD up */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#D8D8D8] -translate-x-1/2" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#D8D8D8] -translate-y-1/2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {benefitData.map((benefit, index) => (
              <div
                key={index}
                className={`flex flex-row items-start p-8 px-0 py-4 lg:p-12 gap-6 transition-colors hover:bg-gray-50/50
                  ${
                    index !== benefitData.length - 1
                      ? "border-b md:border-b-0 border-[#D8D8D8]"
                      : ""
                  }
                `}
              >
                {/* Box 1: Image Box */}
                <div className="shrink-0 w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                  <img
                    src={benefit.icon.src}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Box 2: Content Box */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[14px] md:text-[24px] font-semibold text-[#3E3E3E] leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-[#3E3E3E] text-[10px]  md:text-[15px] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
