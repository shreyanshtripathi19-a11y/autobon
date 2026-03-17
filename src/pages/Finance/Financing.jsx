"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Financing = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-background py-[80px]">
      <div className="max-w-[1200px] mx-auto px-[20px]">
        {/* HEADER SECTION */}
        <div className="mb-[60px] flex flex-col justify-center items-center gap-6">
          <div className="max-w-[800px] flex justify-center items-center flex-col gap-3">
            <h2 className="text-[30px] lg:text-[54px] text-center font-semibold text-black tracking-tight leading-tight ">
              Financing made easy for you!
            </h2>
            <p className="text-[#505050] text-center text-[12px] max-w-[300px] lg:max-w-[700px] lg:text-[18px]">
              At Autobon, we make financing your next car a breeze. Simply pick
              out a car you like and select 'Financing' during checkout.
            </p>
          </div>
          <button
            onClick={() => router.push("/pre-qualify")}
            className="px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Get pre-qualified
          </button>
        </div>

        {/* MAIN BOXES CONTAINER */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* BOX 1: Left Card */}
          <div className="w-full md:w-max h-auto lg:h-[240px] bg-white rounded-[14px] p-8 flex flex-col justify-center items-start shadow-xl border border-gray-100">
            <span className="text-[16px] lg:text-[20px] font-semibold text-[#272727] mb-2">
              Great news 🎉
            </span>
            <h3 className="text-[16px] md:text-[22px] font-medium text-[#272727] mb-2">
              You're pre-qualified for up to
            </h3>
            <div className="flex flex-row justify-start items-baseline gap-2">
              <span className="text-[25px] lg:text-[40px] font-bold text-[#272727] leading-none">
                $42,500
              </span>
              <span className="text-[16px] text-[#272727] font-medium">
                ($215 biweekly)
              </span>
            </div>
          </div>

          {/* BOX 2: Right Card (Steps) */}
          <div className="flex-1 bg-white rounded-[14px] p-8 md:p-10 lg:px-12 h-auto lg:h-[240px] flex flex-col md:flex-row justify-between items-center shadow-xl border border-gray-100">
            {/* STEP 1 */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-md border border-gray-50 shrink-0">
                <span className="font-bold text-[18px]">1</span>
              </div>
              <div className="w-full pr-4">
                <h4 className="text-[20px] font-semibold text-[#272727] mb-2">
                  Shop cars in your budget
                </h4>
                <p className="text-[#3E3E3E] text-[15px] leading-relaxed">
                  Browse hundreds of high-quality cars to find the one you love.
                </p>
              </div>
            </div>

            {/* VERTICAL DIVIDER */}
            <div className="hidden lg:block w-[1px] h-[100px] bg-gray-100 mx-4" />

            {/* STEP 2 */}
            <div className="flex flex-col gap-4 flex-1 lg:pl-8">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-md border border-gray-50 shrink-0">
                <span className="font-bold text-[18px]">2</span>
              </div>
              <div className="w-full">
                <h4 className="text-[20px] font-semibold text-[#272727] mb-2">
                  Get it delivered to your door
                </h4>
                <p className="text-[#3E3E3E] text-[15px] leading-relaxed">
                  Complete your order online and we'll bring it to your door in
                  days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Financing;
