"use client";

import React, { useState } from "react";
import home4 from "../../assets/home-4.png";
import Link from "next/link";

const SellingOrTrading = () => {
  const [method, setMethod] = useState("vin");

  return (
    <section className="w-full bg-background py-[60px] lg:py-[80px] px-[20px] lg:px-[0px]">
      <div className="max-w-custom mx-auto flex flex-col items-center">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-4 mb-[40px] text-center">
          <h2 className="text-[32px] lg:text-[54px] font-semibold text-black tracking-tight leading-tight">
            Selling or trading?
          </h2>
          <p className="text-gray-500 text-[16px] lg:text-[18px] max-w-[700px]">
            Tell us about your ride and get a firm offer in minutes.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="w-full max-w-custom flex flex-col">
          {/* BANNER IMAGE SECTION */}
          <div className="relative w-full rounded-t-[32px] md:rounded-[32px] sm:overflow-hidden  h-[170px]  md:min-h-[450px] lg:min-h-[550px] flex items-end justify-center p-4 md:p-12">
            <img
              src={home4.src}
              alt="Selling or Trading"
              className="absolute inset-0  h-[200px] w-full  object-contain sm:h-full sm:object-cover  object-center"
            />

            {/* DESKTOP FORM (Inside Image) */}
            <div className="hidden md:block relative z-10 w-full h-[90px] max-w-custom">
              <div className="w-full h-full bg-white p-2 rounded-full shadow-2xl flex flex-row items-center gap-0">
                {/* 1. TABS SECTION */}
                <div className="p-1 gap-2 flex items-center shrink-0">
                  <button
                    onClick={() => setMethod("vin")}
                    className={`px-6 w-[200px] py-4 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                      method === "vin"
                        ? "bg-black text-white"
                        : "bg-[#EBEBEB] text-gray-500 hover:text-black"
                    }`}
                  >
                    VIN
                  </button>
                </div>

                {/* 2. INPUTS SECTION */}
                <div className="flex-1 gap-2 flex flex-row items-center border-l border-gray-100 px-4">
                  {method === "plate" ? (
                    <>
                      <input
                        type="text"
                        placeholder="License Plate"
                        className="w-full rounded-full border border-[#D8D8D8] bg-transparent px-8 py-4 outline-none text-black font-medium text-[16px]"
                        style={{ fontSize: "16px" }} // Prevents iOS zoom
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter 17-digit VIN"
                      className="w-full bg-transparent rounded-full border border-[#D8D8D8] px-8 py-4 outline-none text-black font-medium text-[16px]"
                      style={{ fontSize: "16px" }} // Prevents iOS zoom
                    />
                  )}
                  <div className="h-8 w-[1px] bg-gray-100 mx-2" />
                </div>

                {/* 3. BUTTON SECTION */}
                <Link
                  href={"/sell-car"}
                  className="mx-2 flex justify-center items-center bg-primary hover:bg-primary/90 text-white font-semibold px-10 py-5 rounded-full shadow-lg transition-all active:scale-[0.98] whitespace-nowrap"
                >
                  Get Instant Offer
                </Link>
              </div>
            </div>
          </div>

          {/* MOBILE FORM SECTION (Directly Under Image, No Gap) */}
          <div className="md:hidden w-full bg-white p-6 rounded-b-[32px] shadow-xl border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {/* TABS (Mobile - Row) */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-full">
                <button
                  onClick={() => setMethod("vin")}
                  className={`flex-1 py-3 rounded-full text-[10px] font-bold transition-all ${
                    method === "vin"
                      ? "bg-black text-white"
                      : "bg-[#EBEBEB] text-gray-500"
                  }`}
                >
                  VIN
                </button>
              </div>

              {/* INPUTS (Mobile - Row/Stack) */}
              <div className="flex flex-col gap-3">
                {method === "plate" ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="License Plate"
                      className="w-full rounded-full text-[12px] border border-[#D8D8D8] px-2 py-4 outline-none font-medium"
                      style={{ fontSize: "16px" }} // Prevents iOS zoom
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="w-full rounded-full text-[12px] border border-[#D8D8D8] px-2 py-4 outline-none font-medium"
                      style={{ fontSize: "16px" }} // Prevents iOS zoom
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter 17-digit VIN"
                    className="w-full rounded-full border border-[#D8D8D8] px-4 py-4 outline-none font-medium"
                    style={{ fontSize: "16px" }} // Prevents iOS zoom
                  />
                )}
              </div>

              {/* BUTTON (Mobile) */}
              <Link
                href={"/sell-car"}
                className="w-full text-center text-[12px] bg-primary text-white font-medium py-3 rounded-full shadow-lg active:scale-[0.98]"
              >
                Get Instant Offer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS to prevent zoom globally for all inputs */}
      <style jsx global>{`
        /* Prevent iOS zoom on input focus */
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="number"],
        input[type="password"],
        textarea,
        select {
          font-size: 16px !important;
        }

        /* Alternative: Add to your global CSS file */
        @media screen and (max-width: 767px) {
          input,
          textarea,
          select {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SellingOrTrading;
