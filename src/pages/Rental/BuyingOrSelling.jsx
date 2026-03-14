"use client";

import React from "react";
import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  CreditCard,
  FileText,
  BadgeCheck,
} from "lucide-react";
import b1 from "../../assets/b1.png";
import b2 from "../../assets/b2.png";
import b3 from "../../assets/b3.png";
import b4 from "../../assets/b4.png";
import b5 from "../../assets/b5.png";

const BuyingOrSelling = () => {
  const services = [
    {
      title: "Comprehensive Inspection",
      desc: "Detailed 200-point inspection to ensure quality and peace of mind.",
      icon: b1,
    },
    {
      title: "Finance Assist",
      desc: "Get the best interest rates with our nationwide banking partners.",
      icon: b2,
    },
    {
      title: "Service Contract",
      desc: "Flexible service packages to keep your car running like new.",
      icon: b3,
    },
    {
      title: "Extended Warranty",
      desc: "Protect your investment with our comprehensive warranty plans.",
      icon: b4,
    },
    {
      title: "Secure Payment",
      desc: "Safe and transparent transaction process for buyers and sellers.",
      icon: b5,
    },
  ];

  return (
    <section className="w-full bg-[#F9FAFB] py-[80px] px-[20px] lg:px-[0px]">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-[60px]">
          <h2 className="text-[28px] lg:text-[45px] font-bold text-black tracking-tight leading-tight mb-4">
            Buying, Selling or Renting? <br /> We Can Help
          </h2>
          <p className="text-[#505050] text-[16px] lg:text-[16px] max-w-[700px]">
            Explore our services to make your car buying or selling & <br />{" "}
            renting seamless.
          </p>
        </div>

        {/* STAGGERED GRID */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Row 1: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>

          {/* Row 2: 2 Cards (Centered) */}
          <div className="flex flex-col md:flex-row justify-center gap-6 lg:gap-8">
            {services.slice(3, 5).map((service, index) => (
              <div key={index} className="w-full lg:w-[calc(33.333%-22px)]">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white p-8 rounded-[20px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-start h-full w-[330px] lg:w-full mx-auto lg:mx-0">
      <div className="mb-3 p-4  rounded-2xl group-hover:scale-110 transition-transform duration-300">
        <img
          src={service.icon.src}
          alt=""
          className="w-max   h-[60px] lg:h-[80px]"
        />
      </div>
      <h3 className="text-[18px] lg:text-[22px] font-semibold text-black mb-3">
        {service.title}
      </h3>

      <button className="flex items-center gap-2 bg-primary text-white px-[30px] lg:px-[50px] py-2 lg:py-3 rounded-full font-semibold text-[16px] hover:bg-black hover:gap-4 transition-all duration-300 shadow-lg">
        Learn More
      </button>
    </div>
  );
};

export default BuyingOrSelling;
