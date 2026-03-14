"use client";

import React from "react";

const HowYouGetPaid = () => {
  const steps = [
    {
      title: "Upload your docs",
      description: "Void cheque or direct deposit form",
    },
    {
      title: "Show us your car",
      description: "Our inspection is only 15 mins!",
    },
    {
      title: "Funds hit your account",
      description: "You get paid when you hand us the keys",
    },
  ];

  return (
    <section className="w-full bg-background py-[20px] lg:py-[80px] overflow-hidden">
      <div className=" mx-auto px-[20px] lg:px-[0px] flex flex-col items-center">
        {/* HEADER */}
        <div className="flex flex-col w-full items-center gap-1 mb-[60px]">
          <h2 className="text-[30px] w-full text-start lg:text-[54px] font-semibold text-black tracking-tight lg:text-center leading-tight">
            How You Get Paid
          </h2>
        </div>

        {/* JOINT BOXES CONTAINER */}
        <div className="w-full grid grid-cols-1 py-4 md:grid-cols-3 gap-5 lg:gap-0 lg:border border-[#e3e3e3] lg:rounded-[5px] overflow-hidden lg:bg-white lg:shadow-sm">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 flex flex-col items-start text-start transition-colors hover:bg-gray-50/50 
                bg-white border border-[#e3e3e3] rounded-[5px] lg:rounded-none lg:border-none
                ${
                  index !== steps.length - 1
                    ? "md:border-r border-[#e3e3e3]"
                    : ""
                } 
                ${
                  index !== steps.length - 1
                    ? "border-b md:border-b-0 border-[#e3e3e3]"
                    : ""
                }`}
            >
              <div className="w-full relative">
                {/* PRIMARY ACCENT BORDER 
                    Mobile: absolute left-[-32px] (edge of the individual card)
                    Desktop: absolute lg:left-[-32px] (aligned to the start of the joint box cell)
                */}
                <span className="absolute left-[-32px] top-0 w-[2px] h-[38px] bg-primary rounded-r-sm" />

                <div className="flex flex-col items-start">
                  <h3 className="text-[18px] lg:text-[25px] font-semibold text-black leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[12px  ] lg:text-[15px] text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowYouGetPaid;
