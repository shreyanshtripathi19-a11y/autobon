"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import s1 from "../../assets/s1.png";
import s2 from "../../assets/s2.png";
import h2 from "../../assets/h2.png";
import h1 from "../../assets/h1.png";
import h3 from "../../assets/h3.png";

const Features = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sequence = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentNumber((prev) => {
        const next = prev === sequence.length - 1 ? 0 : prev + 1;
        return next;
      });

      // Reset animation state after animation completes
      setTimeout(() => setIsAnimating(false), 300);
    }, 1000);

    return () => clearInterval(interval);
  }, [sequence.length]);

  const featureCards = [
    {
      title: "Choose Your Car",
      desc: "Browse nationwide inventory and enjoy top-quality vehicles with industry-leading interest rates.",
      img: s1,
      help: h3,
      link: "/finance-form",
    },
    {
      title: "Instant Approvals",
      desc: "Get financing with some of the best interest rates in the nation for the car you want.",
      img: "/autobon approved.png",
      help: h2,
      isApproved: true,
      link: "/finance-form",
    },
    {
      title: "Drive or Delivered",
      desc: "Pick up your new car or have it delivered—drive away with total confidence.",
      img: s2,
      help: h1,
      link: "/finance-form",
    },
  ];

  return (
    <section className="w-full bg-background py-[60px] px-[20px] lg:px-[0px]">
      <div className="max-w-custom mx-auto flex flex-col items-center gap-[40px] lg:gap-[60px]">
        <div className="text-center">
          <h2 className="text-[32px] lg:text-[45px] font-semibold text-black tracking-tight">
            Simple, Fast And Easy.
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px] lg:gap-[28px]">
          {featureCards.map((card, idx) => (
            <Link
              href={card.link}
              key={idx}
              className="bg-white w-full rounded-[6px] border border-[#DDDDDD] shadow-lg flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              {/* CONTENT AREA: flex-grow ensures this takes up all available space */}
              <div className="w-full p-[25px] lg:p-[35px] flex flex-col flex-grow items-center text-center">
                <div className="flex flex-col gap-[15px] lg:gap-[20px] items-center flex-grow">
                  <h3 className="font-semibold text-[26px] lg:text-[32px] text-black">
                    {card.title}
                  </h3>
                  {/* Min-height ensures the paragraph space is consistent across all cards */}
                  <p className="font-[400] text-[#535353] text-[14px] lg:text-[15px] max-w-[320px] min-h-[60px] lg:min-h-[72px]">
                    {card.desc}
                  </p>
                </div>

                {/* BUTTON: Now stays at the same level because of the flex-grow parent above */}
                <div className="px-6 py-2 font-[500] text-[14px] lg:text-[16px] rounded-full bg-primary text-white group-hover:bg-black transition-all duration-300 mt-4 mb-[10px] w-fit">
                  View Details
                </div>
              </div>

              <div className="mt-auto relative w-full pt-10 px-0">
                {/* HELP ICON */}
                <div className="absolute -top-5 lg:-top-8   left-6 lg:left-10 z-90 transition-transform duration-300 group-hover:-translate-y-2">
                  <img
                    src={card.help.src}
                    alt="help"
                    className="lg:w-[100px] w-[80px] h-[80px] lg:h-[100px] object-contain"
                  />
                </div>

                {/* ANIMATION AREA */}
                <div className={`relative z-10 w-full flex justify-center overflow-hidden h-[230px] lg:h-[270px] ${card.isApproved ? "items-end" : "items-center"}`}>
                  {card.isApproved ? (
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-[320px] lg:w-[380px] h-auto object-contain mb-0 transition-transform duration-500 group-hover:scale-105 -translate-y-3"
                    />
                  ) : (
                    <img
                      src={card.img.src}
                      alt={card.title}
                      className={`w-max  max-w-[${idx === 2 ? "390px" : "300px"}] h-auto object-cover object-bottom transition-transform duration-500 group-hover:scale-105`}
                    />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
