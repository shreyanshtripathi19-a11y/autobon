"use client";
import React from "react";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Blue diagonal background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1a6adb 0%, #1a6adb 55%, #f5f7fa 55%, #f5f7fa 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Text */}
          <div className="text-white">
            <p className="text-white/90 font-semibold text-[14px] mb-3 tracking-wider uppercase">
              Why Autobon
            </p>
            <h1 className="text-[34px] lg:text-[46px] font-black leading-[1.1] mb-6">
              We make car shopping<br />
              easy, simple and stress-free.
            </h1>
            <p className="text-white/85 text-[15px] lg:text-[17px] leading-relaxed max-w-[480px] mb-8">
              We created Autobon to make car shopping straight forward. Quality vehicles,
              inspected inside and out. Receive 5 star customer service you deserve.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0F0F0F] text-white text-[14px] font-semibold rounded-full hover:bg-black transition-colors"
              >
                Buy a car
              </a>
              <a
                href="/sell-or-trade"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-white text-[14px] font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-colors"
              >
                Sell your car
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/who-we.jpg"
                alt="Premium car interior"
                className="w-full h-[300px] lg:h-[380px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
