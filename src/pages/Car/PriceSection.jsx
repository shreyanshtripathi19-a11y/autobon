"use client";

import React from "react";
import ReadyToFinance from "./ReadyToFinance";
import Link from "next/link";

const PriceSection = () => {
  return (
    <section id="price" className="w-full py-4 sm:py-6 md:py-10">
      <div className="mx-auto rounded-[14px] p-3 sm:p-4 md:p-6 lg:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 text-center mb-4 sm:mb-6 md:mb-10">
          Price
        </h2>

        {/* Outer Border Container */}
        <div className="mb-4 sm:mb-6 px-3 sm:px-4 py-4 sm:py-6 md:px-8 md:py-8 rounded-[14px] bg-white border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {/* PAY ONCE CARD */}
            <div className="border border-gray-100 rounded-[14px] sm:rounded-[16px] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center bg-white hover:shadow-md transition-shadow">
              <span className="bg-[#E8F1FF] text-primary text-[9px] sm:text-[10px] md:text-[12px] font-bold px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 rounded-full uppercase mb-3 sm:mb-4 md:mb-6">
                Pay once
              </span>

              <div className="flex flex-wrap items-baseline justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <span className="text-[24px] sm:text-[32px] md:text-[42px] font-black text-gray-900 blur-md select-none">
                  $57,990
                </span>
                <span className="text-primary font-bold text-[14px] sm:text-[16px] md:text-[18px]">
                  Excl. tax
                </span>
              </div>

              <p className="text-gray-400 text-[10px] sm:text-[11px] md:text-[13px] font-medium mb-3 sm:mb-4 md:mb-6 text-center">
                Excl. HST & Licensing; Incl. OMVIC Fee
              </p>

              <Link
                href={"/pricing-policy"}
                className="text-primary flex justify-center items-center font-bold text-[12px] sm:text-[14px] md:text-[15px] underline underline-offset-4 hover:text-blue-700 transition-colors"
              >
                Pricing & disclosures
              </Link>
            </div>

            {/* PAY OVER TIME CARD */}
            <div className="border border-gray-100 rounded-[14px] sm:rounded-[16px] md:rounded-[24px] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center bg-white hover:shadow-md transition-shadow">
              <span className="bg-[#E8F1FF] text-primary text-[9px] sm:text-[10px] md:text-[12px] font-bold px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 rounded-full uppercase mb-3 sm:mb-4 md:mb-6">
                Pay over time
              </span>

              <div className="flex flex-wrap items-baseline justify-center gap-1 sm:gap-2 mb-1">
                <span className="text-[24px] sm:text-[32px] md:text-[42px] font-black text-gray-900 blur-md select-none">
                  $312
                </span>
                <span className="text-primary font-bold text-[14px] sm:text-[16px] md:text-[18px]">
                  / biweekly
                </span>
              </div>

              <span className="text-primary font-bold text-[12px] sm:text-[13px] md:text-[14px] mb-3 sm:mb-4 md:mb-6">
                $0 cash down
              </span>

              <p className="text-gray-400 text-[10px] sm:text-[11px] md:text-[13px] font-medium text-center leading-relaxed max-w-[240px]">
                Estimate based on a 72-month term with an APR of 7.99%
              </p>
            </div>
          </div>

          {/* Integration of sub-component */}
          <div className="w-full">
            <ReadyToFinance />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
