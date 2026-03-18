"use client";
import React from "react";
import Reviews from "@/pages/Home/Reviews";

const OurStory = () => {
  return (
    <>
      {/* "Customer Experience Like No Other" heading */}
      <section className="bg-background pt-8 lg:pt-16 pb-0 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[28px] lg:text-[40px] font-bold text-[#0F0202] leading-tight tracking-tight">
            Customer Experience Like No Other
          </h2>
          <p className="text-[#505050] text-[15px] mt-3 max-w-[500px] mx-auto">
            Shopping for a car has never been easier
          </p>
        </div>
      </section>

      {/* Reviews Section — same as home page */}
      <Reviews />
    </>
  );
};

export default OurStory;
