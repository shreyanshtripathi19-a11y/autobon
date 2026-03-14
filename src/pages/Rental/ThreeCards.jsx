import React from "react";
import home2 from "../../assets/home-2.png";
import home3 from "../../assets/home-3.png";
import home4 from "../../assets/home-10.png";
import { ArrowRight } from "lucide-react";

const ThreeCards = () => {
  const cards = [
    {
      title: "Find Your Car",
      description:
        "Shop the nations inventory with the best prices & rates. Zero Pressure!",
      image: home2.src,
      alt: "Find Your Car",
    },
    {
      title: "Sell or Trade",
      description:
        "Describe your car and get a guaranteed offer in minutes —fast!",
      image: home3.src,
      alt: "Sell or Trade",
    },
    {
      title: "Rent a Car",
      description:
        "Describe your car and get a guaranteed offer in minutes —fast!",
      image: home4.src,
      alt: "Rent a Car",
    },
  ];

  return (
    <section className="w-full  bg-background  py-[0px] mb-[80px] lg:py-[100px] px-4">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] lg:gap-[20px]">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white w-full h-[500px] lg:h-[540px] rounded-[10px] border border-[#DDDDDD] cursor-pointer shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* CARD HEADER */}
            <div className="w-full p-[25px] pb-0 lg:p-[30px] flex justify-between items-start">
              <div className="flex flex-col gap-[8px] lg:gap-[10px]">
                <h2 className="font-semibold text-[24px] lg:text-[26px] leading-tight text-black">
                  {card.title}
                </h2>
                <p className="font-[400] text-[12px] lg:text-[14px] text-[#505050] max-w-[220px] lg:max-w-none">
                  {card.description}
                </p>
              </div>
              <button className="w-[30px] h-[30px] lg:w-[35px] lg:h-[35px] shrink-0 flex justify-center items-center bg-primary rounded-full text-white hover:bg-primary-hover transition-all duration-300 cursor-pointer">
                <ArrowRight size={20} />
              </button>
            </div>

            {/* CARD IMAGE */}
            <div className="mt-10 w-full flex justify-center items-end overflow-hidden">
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-[320px] lg:h-[380px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeCards;
