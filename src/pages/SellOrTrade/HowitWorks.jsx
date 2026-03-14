"use client";

import React from "react";
import { ClipboardList, CalendarDays, Wallet, MapPin } from "lucide-react";
import snt1 from "../../assets/snt1.png";
import snt2 from "../../assets/snt2.png";
import snt3 from "../../assets/snt3.png";

const stepData = [
  {
    title: "Get an Instant Offer",
    description: "Share your car’s details, view your offer ",
    icon: <ClipboardList className="text-primary" size={32} />,
    image: snt1,
  },
  {
    title: "Set a Date",
    description: "Drop off your car or schedule  pick-up at your convenience.",
    icon: <CalendarDays className="text-primary" size={32} />,
    image: snt2,
  },
  {
    title: "Get Paid",
    description: "Quick walkthrough, instant payment",
    icon: <Wallet className="text-primary" size={32} />,
    image: snt3,
  },
];

const HowitWorks = () => {
  return (
    <section
      id="howItWorks"
      className="w-full max-w-custom bg-background py-[80px] overflow-hidden"
    >
      <div className=" mx-auto px-[20px] lg:px-[0px] flex flex-col items-center">
        {/* HEADER - MATCHED EXACTLY TO PREVIOUS COMPONENT */}
        <div className="flex flex-col items-center gap-4 mb-[40px] w-full  md:mb-[80px] text-center">
          <h2 className="text-[30px] lg:text-[54px]  text-start w-full lg:text-center font-semibold text-black tracking-tight leading-tight max-w-[80vw]">
            How it Works
          </h2>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-[30px] w-full">
          {stepData.map((step, index) => (
            <div
              key={index}
              className="flex bg-white border-border  rounded-[5px] border p-4 px-6  flex-col group"
            >
              {/* Image Container */}
              <div className="mb-4 mt-3">
                <img
                  src={step.image.src}
                  alt={step.title}
                  className=" w-[35px] lg:w-[45px] h-auto"
                />
              </div>

              {/* Text Content */}
              <h3 className=" text-[18px] lg:text-[22px]  font-semibold text-[#272727] mb-3">
                {step.title}
              </h3>
              <p className="text-[#6D6D6D] text-[13px ] lg:text-[16px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* VOUCHER SECTION */}
        <div className="hidden lg:visible w-full text-[12px] lg:text-[16px] bg-white border text-[#6D6D6D] border-[#DDDDDD] rounded-[5px] px-4 py-3     gap-4     flex-row items-center shadow-sm">
          <span className=" text-[12px]  px-3 py-1 lg:-py-2 py-1  text-[15px]  bg-black text-white rounded-full mx-2">
            Uber
          </span>
          We 'll give you a <span className="font-bold">$50 voucher</span> for
          your ride home when you sell your car to Clutch and drop it off at
          select locations
        </div>
        <div className="block lg:hidden    w-full text-[10px] lg:text-[16px] bg-white border text-[#6D6D6D] border-[#DDDDDD] rounded-[5px] px-4 py-3     gap-4  flex flex-row   items-center shadow-sm">
          <div className=" w-max text-[13px] px-3 py-1 lg:-py-2 py-1   bg-black text-white rounded-full mx-2">
            Uber
          </div>
          <div className="text-[10px]">
            We 'll give you a <span className="font-bold">$50 voucher</span> for
            your ride home when you sell your car to Clutch and drop it off at
            select locations
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowitWorks;
