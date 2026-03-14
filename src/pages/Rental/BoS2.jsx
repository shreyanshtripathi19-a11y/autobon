"use client";

import React from "react";
import { ArrowRight, Star, ShieldCheck, UserCheck } from "lucide-react";

const BoS2 = () => {
  const cardData = [
    {
      type: "Buying",
      mainTitle: "a used car?",
      mainDesc:
        "Leave the headache to us and focus on what matters, your new ride.",
      buttonText: "Buy Car Now!",
      features: [
        {
          title: "Your smoothest experience",
          sub: "Rated 4.8 on Google. We've made it easy, we promise!",
          icon: <Star size={18} className="text-yellow-400 fill-yellow-400" />,
        },
        {
          title: "Your expert advisors",
          sub: "From test drive to transfer, we're with you at every step",
          icon: <UserCheck size={18} className="text-primary" />,
        },
        {
          title: "Your trusted partner",
          sub: "Certified inspections, online payments - safe and secure",
          icon: <ShieldCheck size={18} className="text-primary" />,
        },
      ],
    },
    {
      type: "Selling",
      mainTitle: "a used car?",
      mainDesc:
        "We take care of everything, so you can focus on what matters, getting a fair deal.",
      buttonText: "Sell Car Now!",
      features: [
        {
          title: "Your smoothest experience",
          sub: "Rated 4.8 on Google. We've made it easy, we promise!",
          icon: <Star size={18} className="text-yellow-400 fill-yellow-400" />,
        },
        {
          title: "Your expert advisors",
          sub: "We manage all inquiries and paperwork for you",
          icon: <UserCheck size={18} className="text-primary" />,
        },
        {
          title: "Your trusted partner",
          sub: "Verified buyers and secure payment processing",
          icon: <ShieldCheck size={18} className="text-primary" />,
        },
      ],
    },
    {
      type: "Rent",
      mainTitle: "a used car?",
      mainDesc:
        "Flexible rental options tailored to your needs, daily or monthly.",
      buttonText: "Rent Car Now!",
      features: [
        {
          title: "Your smoothest experience",
          sub: "Rated 4.8 on Google. We've made it easy, we promise!",
          icon: <Star size={18} className="text-yellow-400 fill-yellow-400" />,
        },
        {
          title: "Your expert advisors",
          sub: "24/7 roadside assistance and support included",
          icon: <UserCheck size={18} className="text-primary" />,
        },
        {
          title: "Your trusted partner",
          sub: "Fully insured vehicles with no hidden costs",
          icon: <ShieldCheck size={18} className="text-primary" />,
        },
      ],
    },
  ];

  return (
    <section className="w-full  py-20 px-5 lg:px-0">
      <div className="max-w-custom mx-auto flex flex-col gap-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`flex flex-col shadow-lg rounded-[16px] overflow-hidden ${
              index === 1 ? "lg:flex-row-reverse" : "lg:flex-row "
            } w-full gap-0 lg:h-[400px]`}
          >
            {/* LEFT SQUARE BOX - PRIMARY BACKGROUND */}
            <div
              className={`w-full lg:w-[450px] aspect-square lg:h-full bg-primary p-10 lg:py-10 lg:p-14 flex flex-col justify-center items-start text-white ${
                index === 1
                  ? "rounded-t-[30px] lg:rounded-r-[30px] lg:rounded-tl-none"
                  : "rounded-t-[30px] lg:rounded-l-[30px] lg:rounded-tr-none"
              }   `}
            >
              <h2 className="text-[34px] lg:text-[38px] font-extrabold  mb-0">
                {card.type}
              </h2>
              <h2 className="text-[34px] lg:text-[35px] font-normal  mb-6">
                {card.mainTitle}
              </h2>
              <p className="text-white/90 text-base lg:text-lg mb-10 max-w-[300px]">
                {card.mainDesc}
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-xl">
                {card.buttonText}
              </button>
            </div>

            {/* RIGHT RECTANGLE BOX - FEATURES */}
            <div className="flex-1 bg-white border border-gray-100 p-8 lg:p-14 flex flex-col justify-center gap-10 rounded-b-[30px] lg:rounded-r-[30px] lg:rounded-bl-none">
              {card.features.map((item, fIdx) => (
                <div key={fIdx} className="flex items-start gap-5">
                  <div className="flex flex-col">
                    <h4 className="text-black font-semibold  text-xl mb-1">
                      {item.title}
                    </h4>
                    <p className="text-black text-base  font-normal">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoS2;
