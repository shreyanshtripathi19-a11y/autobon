"use client";

import React from "react";
import { ArrowUpCircle, Info } from "lucide-react";
import h1 from "../../assets/h-1.png";
import h2 from "../../assets/h-2.png";
import h3 from "../../assets/h-3.png";
import h4 from "../../assets/h4.png";
import h5 from "../../assets/h-5.png";
import h6 from "../../assets/h-6.png";
import h7 from "../../assets/h-7.png";
import h8 from "../../assets/h-8.png";

const Highlights = () => {
  const vehicleDetails = [
    {
      label: "Transmission",
      value: "Automatic AWD",
      icon: h1,
    },
    {
      label: "Litres / 100km",
      value: "11 city 8.1 highway",
      icon: h2,
    },
    {
      label: "Engine",
      value: "Gasoline / I4 Cylinders",
      icon: h8,
    },
    {
      label: "Seats",
      value: "4 Seats",
      icon: h3,
    },
    {
      label: "Keys",
      value: "2 Keys",
      icon: h4,
    },
  ];

  return (
    <div
      id="overview"
      className="w-full rounded-[14px] p-4 md:p-8 mt-0 font-sans"
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
          Highlights
        </h2>
        <div className="md:visible hidden text-sm font-medium tracking-wider">
          <span className="font-bold text-black">VIN</span>{" "}
          <span className="text-[#595959] font-mono break-all md:break-normal">
            WDDZF4KB8KA530313
          </span>
        </div>
      </div>
      {/* VEHICLE DETAILS SECTION */}
      <div className="mb-6 sm:mb-10">
        <div className="inline-block bg-[#E8F1FF] text-primary text-[10px] sm:text-[11px] font-semibold px-3 py-1 rounded-full mb-3 sm:mb-4 uppercase tracking-wider">
          Vehicle Details
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border border-border rounded-[10px] overflow-hidden">
          {vehicleDetails.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 sm:p-5 py-5 sm:py-8 flex flex-row items-center md:items-start gap-2 sm:gap-3 relative border-b md:border-b-0 md:border-r border-border last:border-0 md:last:border-r-0`}
            >
              <div className="absolute top-1/2 -translate-y-1/2 md:top-10 left-0 h-[25px] w-[2px] md:w-[1px] bg-primary" />

              <div className="shrink-0">
                <img
                  src={item.icon.src}
                  alt={item.label}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-[11px] sm:text-[12px] text-[#606060] font-medium leading-tight">
                  {item.label}
                </p>
                <p className="text-[12px] sm:text-[14px] font-semibold mt-0.5 sm:mt-1 text-black leading-tight">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* SPECIFIC HIGHLIGHTS BOX */}
        <div className="flex flex-col h-full">
          <div className="inline-block w-max text-primary text-[10px] sm:text-[11px] font-semibold px-3 py-0 rounded-full mb-3 sm:mb-4 uppercase tracking-wider">
            Highlights
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border rounded-[10px] flex-1">
            {/* Premium Audio */}
            <div className="p-4 sm:p-6 py-5 sm:py-8 flex items-start gap-3 sm:gap-4 border-b md:border-b-0 md:border-r border-border relative h-full">
              <div className="absolute top-1/2 -translate-y-1/2 md:top-12 left-0 h-[30px] w-[2px] bg-primary" />
              <div className="mt-1 shrink-0">
                <img
                  src={h5.src}
                  alt="Premium Audio"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-[12px] sm:text-[13px] text-[#606060] font-medium">
                  Premium audio
                </p>
                <p className="text-[13px] sm:text-[15px] mt-1 font-semibold text-black">
                  Factory upgraded speakers
                </p>
              </div>
            </div>
            {/* Low Mileage */}
            <div className="p-4 sm:p-6 py-5 sm:py-8 flex items-start gap-3 sm:gap-4 relative h-full">
              <div className="absolute top-1/2 -translate-y-1/2 md:top-12 left-0 h-[30px] w-[2px] bg-primary" />
              <div className="mt-1 shrink-0">
                <img
                  src={h6.src}
                  alt="Low Mileage"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-[12px] sm:text-[13px] text-[#606060] font-medium">
                  Low mileage
                </p>
                <p className="text-[13px] sm:text-[15px] mt-1 font-semibold text-black">
                  Under 15,000 km per year
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PRICE ANALYSIS BOX */}
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <Info size={16} className="text-primary" />
            <span className="text-primary text-[11px] font-bold uppercase tracking-wider">
              About the price
            </span>
          </div>
          <div className="border border-border rounded-[10px] p-6 py-0 flex-1 flex flex-col justify-center ">
            <div className="flex flex-col items-center gap-0  ">
              <div className="flex w-full justify-start gap-1  flex-row">
                <div className="text-white p-3 rounded-full shrink-0">
                  <img src={h7.src} alt="" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-primary relative top-5 italic uppercase leading-none">
                  Great Prices <br className="block" />{" "}
                  <span className="text-black">& Rates</span>
                </h3>
              </div>
              <p className="text-[12px] sm:text-[13px] w-full text-gray-500 mt-2 font-medium max-w-[200px] md:max-w-full">
                Based on prices compared to the current market
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Highlights;
