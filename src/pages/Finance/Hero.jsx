"use client";

import React from "react";
import home1 from "../../assets/finance-1.png";
import Image from "next/image";
import arrow from "../../assets/arrow-f.png";
import text from "../../assets/text-f.png";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="w-full h-max flex flex-col justify-center items-center py-10 lg:py-[60px] px-[0px]">
      <div
        style={{
          background: `linear-gradient(90deg, #F1F1F1 0%, #FFFFFF 52.65%)`,
        }}
        className="w-full max-w-[1200px] p-4 md:p-6 md:px-[0px]  lg:px-[0px] lg:p-3 rounded-[24px] md:rounded-[32px] flex flex-col lg:flex-row justify-between items-center overflow-hidden"
      >
        {/* Text Content */}
        <div className="flex w-full lg:w-1/2 flex-col items-center  lg:items-start gap-6 lg:gap-4 p-0 md:px-[55 px] md:p-10 text-center lg:text-left">
          <h1 className="text-[32px] sm:text-[42px] lg:text-[50px] font-semibold text-black leading-[1.2] lg:leading-[1.1] tracking-tight">
            Prequalify for a loan
          </h1>

          <div className="flex flex-col items-center lg:items-start gap-8">
            <p className="font-medium max-w-[500px] text-[#3E3E3E] text-[12px] sm:text-[18px] leading-relaxed">
              Before car shopping, understand what you can afford with ease.
              There is no obligation to use our prequalification service or to
              apply for financing after using it.
            </p>

            <div className="w-full flex flex-col items-center lg:items-start gap-3">
              <button
                onClick={() => {
                  router.push("/finance-form");
                }}
                className="w-[180px] h-[50px] lg:w-[280px]  lg:h-[64px] font-bold text-[14px] lg:text-[18px] rounded-full bg-primary text-white cursor-pointer hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/20"
              >
                What can I afford?
              </button>
              <p className="lg:text-[13px] text-[10px] font-medium text-gray-500 lg:ml-4">
                This won't impact your credit score.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section - Adjusted for responsive sizing */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-end px-0 lg:px-4 md:px-0 mt-6 lg:mt-0">
          <div className="relative w-full max-w-[600px] lg:max-w-none">
            <Image
              src={home1}
              alt="Finance Prequalification"
              height={500}
              width={800}
              priority
              className="w-full h-auto max-h-[300px] md:max-h-[450px] object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
