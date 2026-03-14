import React from "react";
import financePic from "../../assets/finance-3.png";
import Link from "next/link";

const Budget = () => {
  return (
    <section className="w-full  py-8 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0">
        {/* Main Container */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
          {/* Left Box: Plain Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={financePic.src}
              alt="Finance Illustration"
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </div>

          {/* Right Box: Content */}
          <div className="ws-full md:w-1/2 flex flex-col justify-center  items-center lg:justify-start  lg:items-start text-left">
            <h2 className="text-[30px] text-center lg:text-start lg:text-[42px] font-semibold text-black leading-tight tracking-tight mb-4">
              Not sure of <br className="hidden lg:block" /> your budget?
            </h2>
            <p className="text-[#505050]  text-center lg:text-start text-[11px] lg:text-[16px] leading-relaxed mb-8 max-w-[480px]">
              Check out our loan calculator to estimate your monthly or biweekly
              payments.
            </p>

            {/* Solid Button */}
            <Link
              href={"/pre-qualify"}
              className="h-[55px]   flex justify-center items-center text-center px-10 font-medium text-[18px] rounded-full bg-[#1A6ADB] text-white hover:bg-black hover:scale-[1.02] transition-all shadow-lg"
            >
              Get Approved
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Budget;
