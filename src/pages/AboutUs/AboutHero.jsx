import React from "react";
import about1 from "../../assets/about-1.png";
import about2 from "../../assets/about-3.png";
import about3 from "../../assets/about-2.png";

const AboutHero = () => {
  return (
    <section className="bg-[#E2E2E2 ] py-20 px-6">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[#4079ED] font-bold     text-[30px] uppercase ">
            About Us
          </span>
          <h1 className="text-4xl md:text-[55px] font-black text-black mt-0 ">
            Reinventing the way people buy cars
          </h1>
          <p className="text-[#2C2C2C] mt-2 text-[18px]">
            Our mission is to deliver a delightful car-buying experience to
            Canadians.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-40 bg-gray-300 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={about1.src}
                alt="Handing over keys"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-40 bg-gray-300 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={about2.src}
                alt="Car on road"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="h-full bg-gray-300 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={about3.src}
              alt="Cars at night"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
