"use client";
import React from "react";
import { ShieldCheck, Zap, Car } from "lucide-react";
import about7 from "../../assets/about-7.png";
import about8 from "../../assets/about-8.png";
import about9 from "../../assets/about-9.png";
import { useRouter } from "next/navigation";

const OurInvestors = () => {
  // Array for the 8 logo placeholders
  const investorLogos = Array(8).fill(null);
  const router = useRouter();
  const features = [
    {
      title: "Quality",
      description:
        "Shop hundreds of high-quality cars from the comfort of your home.",
      icon: about7.src,
      buttonText: "Get Started",
      link: "/shop",
    },
    {
      title: "Protection",
      description: "Keep your vehicle covered in the event of the unexpected.",
      icon: about8.src,
      buttonText: "Get Started",
      link: "/protection-plan",
    },
    {
      title: "Quick approval",
      description: "Get pre-qualified for a car loan in minutes.",
      icon: about9.src,
      buttonText: "Get Started",
      link: "/finance-form",
    },
  ];

  return (
    <section className="bg-white py-20 px-6 font-sans">
      <div className="max-w-[1100px] mx-auto">
        {/* <div className="text-center mb-24">
          <h2 className="text-[32px] font-bold text-[#1A1A1A] mb-12">
            Our Investors
          </h2>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {investorLogos.map((_, index) => (
              <div
                key={index}
                className="bg-[#E5E5E5] h-24 rounded-xl flex items-center justify-center"
              >
              </div>
            ))}
          </div> 
        </div> */}

        {/* Bottom Section: Learn more about Autobon */}
        <div className="bg-[#3B82F6] rounded-[32px] py-16 px-8 lg:px-16 text-white text-center">
          <h2 className="text-[28px] lg:text-[36px] font-bold mb-16">
            Learn more about Autobon
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Icon Container */}
                <div className=" rounded-2xl w-25 h-25 flex items-center justify-center mb-4">
                  <img
                    src={feature.icon}
                    alt="Feature Icon"
                    className="w-25 h-25   object-contain"
                  />
                </div>

                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>

                <p className="text-sm lg:text-[12px] opacity-90 leading-relaxed mb-8 h-[20px] max-w-[240px]">
                  {feature.description}
                </p>

                <button
                  onClick={() => {
                    router.push(feature.link);
                  }}
                  className="bg-white text-[#3B82F6] font-bold py-3 px-8 rounded-full transition-transform hover:scale-105"
                >
                  {feature.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurInvestors;
