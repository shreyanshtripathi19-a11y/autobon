"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const LoanOrLease = () => {
  const options = [
    {
      title: "Have a loan?",
      description: "We’ll pay it off when we buy your car",
    },
    {
      title: "Leasing?",
      description: "We buy out your lease and you save on tax*",
    },
    {
      title: "Owe more than your car’s worth?",
      description: "You can pay the difference over time!",
    },
  ];

  return (
    <section className="w-full bg-background py-[80px] overflow-hidden">
      <div className=" mx-auto px-[20px] lg:px-[0px] flex flex-col items-center">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-1 mb-[60px]">
          <h2 className="text-[30px] lg:text-[54px] font-semibold text-black tracking-tight text-center leading-tight">
            Loan, lease? We'll still buy it!
          </h2>
        </div>

        {/* JOINT BOXES CONTAINER (3 COLUMNS) */}
        <div className="w-full max-w-[1300px] grid grid-cols-1 md:grid-cols-3 border border-[#e3e3e3] rounded-[10px] overflow-hidden bg-white shadow-sm">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-8 py-6 lg:py-6 lg:p-10 flex flex-col justify-between items-center lg:items-start text-center lg:text-left transition-colors hover:bg-gray-50/50 
                    ${
                      index !== options.length - 1
                        ? "md:border-r border-[#e3e3e3]"
                        : ""
                    } 
                ${
                  index !== options.length - 1
                    ? "border-b md:border-b-0 border-[#e3e3e3]"
                    : ""
                }`}
            >
              {/* TOP CONTENT */}
              <div className="mb-3 flex justify-start items-start flex-col w-full">
                <h3 className=" text-[18px]  lg:text-[25px] w-full text-start font-semibold text-[#272727] mb-3">
                  {option.title}
                </h3>
                <p className="text-[12px] lg:text-[16px] text-start text-[#6D6D6D] leading-relaxed max-w-[300px]">
                  {option.description}
                </p>
              </div>

              {/* BOTTOM BUTTON SECTION */}
              <div className="pt-0 mt-auto w-full lg:border-none">
                <Link
                  href={"/finance"}
                  className="group text-center flex items-center gap-2   underline hover:border-primary hover:text-primary transition-all text-[13px] lg:text-[15px] font-medium text-[#272727]"
                >
                  View example
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanOrLease;
