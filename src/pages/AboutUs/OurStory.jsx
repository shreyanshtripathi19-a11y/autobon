"use client";
import React from "react";
import Link from "next/link";

const OurStory = () => {
  return (
    <>
      {/* "Customer Experience Like No Other" heading */}
      <section className="bg-background pt-8 lg:pt-16 pb-6 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[28px] lg:text-[40px] font-bold text-[#0F0202] leading-tight tracking-tight">
            Customer Experience Like No Other
          </h2>
          <p className="text-[#505050] text-[15px] mt-3 max-w-[500px] mx-auto">
            Shopping for a car has never been easier
          </p>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="bg-background pb-16 lg:pb-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-xl">
            {/* Left - Dark Text Side */}
            <div className="bg-[#0F0F0F] p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-white text-[22px] lg:text-[28px] font-bold leading-tight mb-4">
                Shop for a car with confidence. All our vehicles are fully inspected.
              </h3>
              <p className="text-white/65 text-[14px] lg:text-[15px] leading-relaxed mb-3">
                Shopping a deal? You came to the right place. Whether you&apos;re looking
                for a sedan, SUV, truck or mini van. Our team is here for you every step of
                the way to get you the best deal in the market.
              </p>
              <p className="text-white/65 text-[14px] lg:text-[15px] leading-relaxed mb-8">
                Our number 1 priority has always been customer service. We&apos;re proud to
                say we&apos;ve reached over 1,000+ combined 5 star reviews.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center w-max px-8 py-3.5 bg-primary text-white text-[14px] font-bold rounded-full hover:bg-primary-hover transition-colors"
              >
                Browse Car Deals
              </Link>
            </div>

            {/* Right - Image Side */}
            <div className="relative h-[280px] lg:h-auto">
              <img
                src="/deals-pic.jpg"
                alt="Autobon car deals"
                className="w-full h-full object-cover"
              />
              {/* Autobon branding overlay */}
              <div className="absolute top-6 right-6 text-right">
                <p className="text-white text-[24px] lg:text-[32px] font-black leading-none drop-shadow-lg">
                  Autobon
                </p>
                <p className="text-white/90 text-[10px] lg:text-[11px] font-medium tracking-wider drop-shadow-lg">
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
