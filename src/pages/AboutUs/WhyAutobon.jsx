import React from "react";
import whatWeDoImg from "../../assets/about-6.png";
import whoWeAreImg from "../../assets/about-5.png";

const WhyAutobon = () => {
  return (
    <section className="bg-white py-16 lg:py-24 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto space-y-24 lg:space-y-32">
        {/* Box 1: What we do (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-[#4079ED] uppercase font-bold text-xl mb-2">
              What we do
            </h3>
            <h2 className="text-[24px] font-bold text-[#0F0202] mb-6">
              A better way to buy a car
            </h2>
            <div className="space-y-5  text-[16px]  text-[#2C2C2C]">
              <p>
                We're tired of traditional dealerships that take advantage of
                customers. Clutch aims to offer our customers high quality
                vehicles and a stress-free online car buying experience.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-none overflow-hidden  ">
              <img
                src={whatWeDoImg.src}
                alt="Process of reconditioning cars"
                className="w-[400px]  rounded-none *:h-[dd00px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Box 2: Who we are (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-1">
            <div className="rounded-3xl overflow-hidden">
              <img
                src={whoWeAreImg.src}
                alt="Our team and mission"
                className="w-[400px] h-[400px]  rounded-none  object-contain"
              />
            </div>
          </div>
          <div className="order-2">
            <h3 className="text-[#4079ED] uppercase font-bold text-xl mb-2">
              Who we are
            </h3>
            <h2 className="text-[24px] font-bold text-[#0F0202] mb-6">
              Driven by transparency
            </h2>
            <div className="space-y-5  text-[16px]  text-[#2C2C2C]">
              <p>
                Founded on the belief that car buying should be fun and honest,
                our team is dedicated to removing the stress from the process.
                We are a group of automotive experts and technology enthusiasts
                working together to build Canada’s most trusted used car
                platform, ensuring every customer drives away with total peace
                of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAutobon;
