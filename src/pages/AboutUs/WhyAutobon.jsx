"use client";
import React from "react";

const features = [
  {
    category: "CLIENT EXPERIENCE",
    title: "Obsessed with providing best service",
    description:
      "At Autobon, we care deeply about the relationships with our clients. We understand that each individual has unique needs. The team strives to achieve excellence in providing you an unparalleled vehicle buying experience.",
    image: "/who-we.jpg",
  },
  {
    category: "TRANSPARENCY",
    title: "Easy, simple & straight forward",
    description:
      "Throughout your entire purchasing process, we are committed to answering all your questions with full transparency. From your first inquiry, to final delivery, we are committed to clear and concise communication of the buying process. You can feel confident knowing you have honest industry experts on your side.",
    image: "/what-we.jpg",
  },
  {
    category: "INTEGRITY",
    title: "Quality vehicles for everyone",
    description:
      "A current CARFAX report will always be available for every vehicle we sell. We adhere to all the requirements of the Ontario Consumer Protection Act and code of ethics. We are a proud member of UCDA.",
    image: "/quality.jpg",
  },
  {
    category: "SATISFACTION GUARANTEE",
    title: "Hundreds of satisfied Canadians",
    description:
      "At Autobon, we are certain you will drive out of our lot with 100% confidence you made the right decision to purchase from us. We will always be available for questions and concerns after your purchase.",
    image: "/why-pic.png",
  },
];

const WhyAutobon = () => {
  return (
    <section className="bg-white py-16 lg:py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-[260px] lg:h-[320px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Category */}
              <p className="text-[#9CA3AF] text-[12px] lg:text-[13px] font-semibold tracking-[0.15em] uppercase mb-3">
                {feature.category}
              </p>

              {/* Title */}
              <h3 className="text-[22px] lg:text-[26px] font-bold text-[#0F0202] mb-4 leading-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#505050] text-[14px] lg:text-[15px] leading-relaxed max-w-[480px] mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAutobon;
