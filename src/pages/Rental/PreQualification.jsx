"use client";

import React from "react";
import Image from "next/image";
import step1 from "../../assets/step1.png";
import step2 from "../../assets/step2.png";
import step3 from "../../assets/step3.png";
import arrow1 from "../../assets/arrow1.png";
import arrow2 from "../../assets/arrow2.png";

const steps = [
  {
    id: "01",
    title: "Quality",
    description:
      "Shop hundreds of high-quality cars from the comfort of your home.",
    image: step1,
  },
  {
    id: "02",
    title: "Protection",
    description: "Keep your vehicle covered in the event of the unexpected.",
    image: step2,
  },
  {
    id: "03",
    title: "Quick approval",
    description: "Get pre-qualified for a car loan in minutes.",
    image: step3,
  },
];

const PreQualification = () => {
  return (
    <section className="w-full py-[80px] lg:py-[120px]  overflow-hidden">
      <div className=" mx-auto px-[20px] lg:px-[0px]">
        {/* HEADER */}
        <div className="mb-[75px] text-center ">
          <h2 className="text-[32px] lg:text-[45px] font-semibold text-black leading-tight">
            Learn more about <span className="text-primary">Autobon</span> The
            <br /> prequalification process{" "}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12  lg:gap-16">
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {/* Arrow 1 to 2 (Top Wavy) */}

            <img
              src={arrow1.src}
              className="hidden md:block absolute -top-[15%] left-[25%] h-[25px] w-max"
              alt=""
            />

            {/* Arrow 2 to 3 (Bottom Wavy) */}

            <img
              src={arrow2.src}
              className=" hidden md:block absolute   -bottom-[15%] left-[60%] h-[25px] w-max"
              alt=""
            />
          </div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex mx-auto  w-[330px] lg:w-[350px] flex-col shadow-lg bg-white rounded-[5px] lg:rounded-[16px] p-4 items-center md:items-start text-center md:text-left group"
            >
              {/* Image Box with Number Badge */}
              <div className="relative w-full h-max flex justify-center items-center overflow-hidden  mb-8">
                <img
                  src={step.image.src}
                  alt={step.title}
                  fill
                  className="object-contain w-[100px] h-[100px] lg:w-[150px]  lg:h-[150px] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center items-center gap-3">
                <h3 className="text-[24px] lg:text-[28px] font-bold text-black">
                  {step.title}
                </h3>
                <p className="text-[#484848] text-[12px] lg:text-[16px] text-center leading-relaxed max-w-[350px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreQualification;
