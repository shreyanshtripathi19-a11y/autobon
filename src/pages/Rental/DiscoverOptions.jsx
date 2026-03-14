"use client";

import React from "react";
import { motion } from "framer-motion";

import l1 from "../../assets/l1.png";
import l2 from "../../assets/l2.png";
import l3 from "../../assets/l3.png";
import l4 from "../../assets/l4.png";
import l5 from "../../assets/l5.png";
import l6 from "../../assets/l6.png";
import l7 from "../../assets/l7.png";

import h1 from "../../assets/p1.png";
import h2 from "../../assets/p2.png";
import h3 from "../../assets/p3.png";
import h4 from "../../assets/p4.png";
import h5 from "../../assets/p5.png";

const DiscoverOptions = () => {
  const row1 = [l1, l2, l3, l4, l5, l6, l7];
  const row2 = [h1, h2, h3, h4, h5];

  const tickerVariants = {
    animate: (direction) => ({
      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    }),
  };

  // Common image styling to keep code clean
  const logoStyle =
    "w-full h-full object-contain p-8 mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500";

  return (
    <section className="w-full  py-[0px] lg:py-[80px] overflow-hidden">
      {/* SECTION 1: TOP HEADER */}
      <div className="max-w-[1600px] mx-auto px-[20px] lg:px-[0px] text-center flex flex-col items-center mb-[40px] lg:mb-[60px]">
        <h2 className="text-[25px] lg:text-[45px] font-semibold text-black tracking-tight leading-tight mb-4">
          Discover Available Options
          <br /> In The UAE!
        </h2>
        <p className="text-[#535353] text-[12px] lg:text-[18px] max-w-[300px] lg:max-w-[700px] mb-6">
          Buy direct from private sellers. Cars certified by our inspectors.
        </p>
      </div>

      {/* FULL WIDTH ROW 1: LEFT */}
      <div className="relative flex overflow-hidden group mb-[150px]">
        <motion.div
          className="flex whitespace-nowrap gap-6"
          variants={tickerVariants}
          animate="animate"
          custom="left"
          style={{ display: "flex", width: "fit-content" }}
        >
          {/* We map twice to create the infinite seamless bridge */}
          {[...row1, ...row1].map((src, idx) => (
            <div
              key={idx}
              className="w-max h-[140px] lg:h-[160px] flex-shrink-0 overflow-hidden cursor-pointer"
            >
              <img src={src.src} alt="Partner" className={logoStyle} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* SECTION 2: MIDDLE HEADER */}
      <div className="max-w-[1600px] mx-auto px-[20px] lg:px-[60px] text-center flex flex-col items-center mb-[40px] lg:mb-[60px]">
        <h2 className="text-[32px] lg:text-[45px] font-semibold text-black tracking-tight leading-tight mb-4">
          Trusting financing partners
        </h2>
      </div>

      {/* FULL WIDTH ROW 2: RIGHT */}
      <div className="relative flex overflow-hidden group">
        <motion.div
          className="flex whitespace-nowrap gap-6"
          variants={tickerVariants}
          animate="animate"
          custom="right"
          style={{ display: "flex", width: "fit-content" }}
        >
          {/* We map twice to create the infinite seamless bridge */}
          {[...row2, ...row2].map((src, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-max h-[50px] lg:h-[180px] flex-shrink-0 overflow-hidden cursor-pointer"
            >
              <img src={src.src} alt="Provider" className="" />
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .group:hover .flex {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
};

export default DiscoverOptions;
