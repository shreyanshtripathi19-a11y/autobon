"use client";
import React from "react";
import Link from "next/link";

const OurStory = () => {
  return (
    <>
      {/* "Customer Experience Like No Other" heading */}
      <section className="bg-white pt-16 lg:pt-24 pb-8 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[32px] lg:text-[44px] font-black text-[#0F0202] leading-tight">
            Customer Experience Like No Other
          </h2>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="bg-white pb-16 lg:pb-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            {/* Left - Dark Text Side */}
            <div className="bg-[#1a1a1a] p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-white text-[24px] lg:text-[28px] font-bold leading-tight mb-4">
                Shop for a car with confidence. All our vehicles are fully inspected.
              </h3>
              <p className="text-white/70 text-[14px] lg:text-[15px] leading-relaxed mb-3">
                Shopping a deal? You came to the right place. Whether you&apos;re looking
                for a sedan, suv, truck or mini van. Our team is here for you every step of
                the way to get you the best deal in the market
              </p>
              <p className="text-white/70 text-[14px] lg:text-[15px] leading-relaxed mb-8">
                Our number 1 priority has always been customer service. We&apos;re proud to
                say we&apos;ve reached over 1,000+ combined 5 star reviews.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center w-max px-8 py-3.5 bg-[#E31837] text-white text-[14px] font-bold rounded-full hover:bg-[#c41230] transition-colors"
              >
                Browse Car Deals
              </Link>
            </div>

            {/* Right - Image Side */}
            <div className="relative h-[300px] lg:h-auto">
              <img
                src="/deals-pic.jpg"
                alt="Autobon car deals"
                className="w-full h-full object-cover"
              />
              {/* Optional Autobon branding overlay */}
              <div className="absolute top-6 right-6 text-right">
                <p className="text-white text-[28px] lg:text-[36px] font-black leading-none drop-shadow-lg" style={{ fontFamily: "inherit" }}>
                  Autobon
                </p>
                <p className="text-white/90 text-[10px] lg:text-[12px] font-medium tracking-wider drop-shadow-lg">
                  The BEST Place To Purchase A Car
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurStory;
