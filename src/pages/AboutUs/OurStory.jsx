import React from "react";
import about4 from "../../assets/about-4.png";

const OurStory = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-white flex justify-center items-center">
      <div className="max-w-[1200px] w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Content Column */}
        <div className="order-2 lg:order-1">
          <span className="text-[#4079ED] font-bold text-[25px] mb-2 block">
            Our Story
          </span>
          <h2 className="text-xl  font-medium text-[#0F0202] mb-8 leading-tight">
            Driving towards the future
          </h2>
          <div className=" text-[#2C2C2C]  text-md">
            <p>
              When Stephen, our founder, had a frustrating experience trying to
              buy a car from a dealership he realized the car industry was
              broken for Canadians. Since its founding in 2016, Autobon has been
              a key player in modernizing the used car market.
            </p>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="order-1 lg:order-2">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Aspect ratio box to match the design in the image */}
            <div className="aspect-w-16 aspect-h-10 lg:aspect-square xl:aspect-video">
              <img
                src={about4.src}
                alt="Autobon team working on future automotive solutions"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
