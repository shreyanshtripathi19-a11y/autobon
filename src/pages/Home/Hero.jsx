"use client";
import React from "react";
import home1 from "../../assets/home-1.png";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-[#fafafa] overflow-hidden relative flex flex-col lg:flex-row lg:items-center min-h-fit lg:min-h-[600px]">
      {/* 1. TEXT LAYER */}
      <div className="mx-auto max-w-[1200px] w-full px-5 z-20 pointer-events-none">
        <div className="w-full lg:w-[50%] flex flex-col gap-[20px] py-8 lg:py-[30px] text-left pointer-events-auto">
          <p className="w-max bg-white px-3 rounded-full py-1 font-[400] text-[10px] sm:text-[15px] text-black flex items-center gap-2 shadow-sm">
            <Star fill="currentColor" size={20} className="text-primary" />
            5.0 Star Rating from Thousands of Customers
          </p>

          <h1 className="text-[40px] sm:text-[55px] lg:text-[75px] font-[600] text-black leading-[50px] sm:leading-[70px] lg:leading-[96px] tracking-[-4%]">
            Any Car,
            <br /> Any Where
          </h1>

          <div className="flex flex-col gap-[30px]">
            <p className="font-[400] text-[#7B7B7B] text-[14px] sm:text-[20px] max-w-[400px]">
              No Used Car lots, No pressure. Shop the nations inventory.
            </p>

            <div className="flex flex-row gap-[15px] lg:gap-[20px]">
              <button
                onClick={() => {
                  router.push("/pre-qualify");
                }}
                className="w-[140px] lg:w-[220px] h-[45px] sm:h-[60px] font-[500] text-[13px] lg:text-[20px] rounded-full bg-primary text-white cursor-pointer hover:bg-primary-hover hover:scale-105 transition-all duration-300 shadow-md"
              >
                Get Instant Offer
              </button>
              <button
                onClick={() => {
                  router.push("/shop");
                }}
                className="w-[140px] lg:w-[220px] h-[45px] sm:h-[60px] font-[500] text-[13px] lg:text-[20px] rounded-full bg-black text-white cursor-pointer hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-md"
              >
                Browse Cars
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. IMAGE LAYER - Desktop */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[55%] pr-[150px] items-center justify-end z-10">
        <div
          className="relative w-full h-[120%] translate-x-[10%] select-none"
          style={{
            maskImage:
              "radial-gradient(ellipse 100% 100% at 60% 50%, black 0%, black 60%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 100% 100% at 60% 50%, black 0%, black 60%, transparent 85%)",
          }}
        >
          <Image
            src={home1}
            alt="Premium Car Showcase"
            fill
            priority
            className="object-contain object-right mix-blend-multiply"
          />
        </div>
      </div>

      {/* Mobile Version */}
      <div className="relative lg:hidden  aspect-video  w-full">
        <Image
          src={home1}
          alt="Premium Car Showcase"
          fill
          priority
          className="w-full  object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
