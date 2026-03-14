"use client";

import React from "react";
import carCutout from "../../assets/carout.png";
import Link from "next/link";

const ReadyToFinance = () => {
  return (
    <section className="w-full py-4 sm:py-6">
      <div className="mx-auto overflow-hidden">
        <div className="relative bg-primary rounded-[14px] sm:rounded-[16px] p-5 sm:p-8 lg:p-6 flex flex-col items-center text-center overflow-hidden shadow-xl shadow-primary/20">
          <div className="absolute -left-10 bottom-0 w-[200px] lg:w-[300px] opacity-90 pointer-events-none hidden md:block">
            <img
              src={carCutout.src}
              alt="Car Detail"
              className="w-full h-auto object-contain translate-y-4"
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center max-w-[500px]">
            <h2 className="text-lg sm:text-xl w-full lg:text-4xl text-start md:text-center font-semibold text-white mb-2 md:mb-4">
              Ready to finance?
            </h2>
            <p className="text-[#FFFFFF] text-[11px] sm:text-[12px] lg:text-[17px] text-start md:text-center font-medium leading-relaxed mb-3 sm:mb-4 md:mb-8">
              Customize your financing in minutes—no impact on credit score!
            </p>

            <Link
              href={"/checkout"}
              className="bg-white text-[13px] sm:text-[14px] flex justify-center items-center text-black font-semibold py-2 sm:py-2.5 px-10 sm:px-15 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg active:scale-95"
            >
              Get pre-qualified
            </Link>
          </div>

          {/* DECORATIVE ELEMENT (Optional: light glow) */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default ReadyToFinance;
