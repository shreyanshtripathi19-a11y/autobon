"use client";

import React, { useState } from "react";
import { Gauge, Fuel, Heart, ArrowRight } from "lucide-react";

import car1 from "../../assets/car1.png";
import car3 from "../../assets/car3.png";
import car2 from "../../assets/car2.png";
import car4 from "../../assets/car4.png";

const dummyCars = [
  {
    id: 1,
    year: 2022,
    make: "BMW",
    model: "X3",
    price: 45500,
    km: "28,500 km",
    fuel: "Petrol",
    description:
      "Luxury compact SUV with premium interior, panoramic sunroof, and all-wheel drive.",
    biweekly: 412,
    img: car1.src,
  },
  {
    id: 2,
    year: 2022,
    make: "BMW",
    model: "X3",
    price: 45500,
    km: "28,500 km",
    fuel: "Petrol",
    description:
      "Luxury compact SUV with premium interior, panoramic sunroof, and all-wheel drive.",
    biweekly: 412,
    img: car2.src,
  },
  {
    id: 3,
    year: 2022,
    make: "BMW",
    model: "X3",
    price: 45500,
    km: "28,500 km",
    fuel: "Petrol",
    description:
      "Luxury compact SUV with premium interior, panoramic sunroof, and all-wheel drive.",
    biweekly: 412,
    img: car3.src,
  },
  {
    id: 4,
    year: 2022,
    make: "BMW",
    model: "X3",
    price: 45500,
    km: "28,500 km",
    fuel: "Petrol",
    description:
      "Luxury compact SUV with premium interior, panoramic sunroof, and all-wheel drive.",
    biweekly: 412,
    img: car4.src,
  },
];

const CarCard = ({ car }) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="group bg-white rounded-[15px] w-full border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* IMAGE SECTION */}
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
        <img
          src={car.img}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => setIsFav(!isFav)}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-white/80 backdrop-blur rounded-full cursor-pointer z-10 hover:bg-white transition-colors"
        >
          <Heart
            size={16}
            className={isFav ? "fill-red-500 text-red-500" : "text-black"}
          />
        </button>
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <h3 className="text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-black leading-tight mb-2 sm:mb-3">
          {car.year} {car.make} {car.model}
        </h3>

        <div className="flex items-center gap-3 sm:gap-4 text-black font-medium text-[11px] sm:text-[13px] mb-3 sm:mb-4">
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Fuel size={14} /> {car.fuel}
          </span>
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Gauge size={14} /> {car.km}
          </span>
        </div>

        <div className="w-full border-t border-[#E3E3E3] mb-3 sm:mb-4" />

        <p className="text-[#535353] text-[11px] sm:text-[13px] leading-relaxed line-clamp-2 mb-3 sm:mb-4">
          {car.description}
        </p>

        <div className="mt-auto flex justify-between items-end">
          <div>
            <span className="text-[14px] sm:text-[18px] blur-[7px] lg:text-[20px] font-bold text-black">
              ${car.price.toLocaleString()}
            </span>
            <p className="text-[10px] sm:text-[11px] font-medium text-black mt-0.5 sm:mt-1">
              ${car.biweekly}{" "}
              <span className="font-normal text-gray-500">/biweekly</span>
            </p>
          </div>
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-[11px] sm:text-[13px] rounded-full bg-primary text-white hover:bg-black transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const SimilarDeals = () => {
  return (
    <section className="w-full bg-background py-[40px] sm:py-[60px] lg:py-[100px] px-4 sm:px-[20px] lg:px-0">
      <div className="max-w-[1600px] mx-auto">
        {/* CENTERED HEADER */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-[30px] sm:mb-[50px] lg:mb-[70px]">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[36px] font-semibold text-black tracking-tight">
            Checkout Similar Deals{" "}
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {dummyCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarDeals;
