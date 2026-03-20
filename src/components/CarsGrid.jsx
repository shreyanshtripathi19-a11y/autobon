"use client";
import React, { useMemo, useState } from "react";
import {
  Search,
  Gauge,
  Fuel,
  Heart,
  ChevronDown,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import car1 from "../assets/car1.png";
import car3 from "../assets/car3.png";
import car2 from "../assets/car2.png";
import car4 from "../assets/car4.png";
import { useRouter } from "next/navigation";

const dummyCars = [
  {
    id: 1,
    year: 2022,
    make: "BMW",
    model: "X3",
    trim: "xDrive30i",
    price: 45500,
    km: "28,500 km",
    fuel: "Petrol",
    description:
      "Luxury compact SUV with premium interior, panoramic sunroof, and all-wheel drive.",
    biweekly: 412,
    downPayment: 2500,
    img: car1.src,
  },
  {
    id: 2,
    year: 2022,
    make: "BMW",
    model: "X3",
    trim: "xDrive30i",
    price: 45500,
    km: "28,500 km",
    fuel: "Petrol",
    description:
      "Luxury compact SUV with premium interior, panoramic sunroof, and all-wheel drive.",
    biweekly: 412,
    downPayment: 2500,
    img: car2.src,
  },
  {
    id: 3,
    year: 2022,
    make: "BMW",
    model: "X3",
    trim: "xDrive30i",
    price: 45500,
    km: "28,500 km",
    fuel: "Petrol",
    description:
      "Luxury compact SUV with premium interior, panoramic sunroof, and all-wheel drive.",
    biweekly: 412,
    downPayment: 2500,
    img: car3.src,
  },
  {
    id: 4,
    year: 2022,
    make: "BMW",
    model: "X3",
    trim: "xDrive30i",
    price: 45500,
    km: "28,500 km",
    fuel: "Petrol",
    description:
      "Luxury compact SUV with premium interior, panoramic sunroof, and all-wheel drive.",
    biweekly: 412,
    downPayment: 2500,
    img: car4.src,
  },
  {
    id: 5,
    year: 2022,
    make: "BMW",
    model: "X3",
    trim: "xDrive30i",
    price: 45500,
    km: "28,500 km",
    fuel: "Petrol",
    description:
      "Luxury compact SUV with premium interior, panoramic sunroof, and all-wheel drive.",
    biweekly: 412,
    downPayment: 2500,
    img: car4.src,
  },
  {
    id: 6,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car3.src,
  },
  {
    id: 7,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
  {
    id: 8,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car1.src,
  },
  {
    id: 9,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car3.src,
  },
  {
    id: 10,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
  {
    id: 11,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car1.src,
  },
  {
    id: 12,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car1.src,
  },
  {
    id: 13,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
  {
    id: 14,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car1.src,
  },
  {
    id: 15,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car3.src,
  },
  {
    id: 16,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
  {
    id: 14,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car1.src,
  },
  {
    id: 15,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car3.src,
  },
  {
    id: 16,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
  {
    id: 16,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
  {
    id: 14,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car1.src,
  },
  {
    id: 15,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car3.src,
  },
  {
    id: 16,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
  {
    id: 16,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
  {
    id: 14,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car1.src,
  },
  {
    id: 15,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car3.src,
  },
  {
    id: 16,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
  {
    id: 16,
    year: 2021,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 38900,
    km: "32,000 km",
    fuel: "Electric",
    description:
      "Full self-driving capability, minimalist white interior, and incredible acceleration.",
    biweekly: 385,
    downPayment: 0,
    img: car2.src,
  },
];

const CarCard = ({ car }) => {
  const [isFav, setIsFav] = useState(false);
  const router = useRouter();
  return (
    <div className="group bg-white rounded-[15px] w-full border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* IMAGE SECTION - FIXED TO SUPPORT 433x577 PORTRAIT IMAGES */}
      <div className="relative aspect-[3/4] bg-gray-100 shrink-0 overflow-hidden">
        <img
          src={car.img}
          alt={`${car.make} ${car.model}`}
          // Use object-contain to ensure the whole car is seen without distortion
          // Or object-cover if you prefer the image fills the area exactly
          className="w-full h-full object-cover object-centers rounded-[15px] group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => setIsFav(!isFav)}
          className="absolute top-4 right-4 p-2 backdrop-blur rounded-full cursor-pointer z-10"
        >
          <Heart
            size={20}
            className={isFav ? "fill-red-500 text-red-500" : "text-black"}
          />
        </button>
      </div>
      <div className="flex flex-col flex-1">
        <div className="p-3 pb-0">
          <div className="flex justify-between items-start mb-1 gap-2">
            <h3 className="text-[13px] lg:text-[14px] font-medium  text-black leading-tight tracking-[-3%]">
              {car.year} {car.make} {car.model}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-black font-medium text-[12px] mb-2 mt-3">
            <span className="flex items-center gap-1">
              <Fuel size={16} className="text-black" /> {car.fuel}
            </span>
            <span className="flex items-center gap-1">
              <Gauge size={16} className="text-black " /> {car.km}
            </span>
          </div>
        </div>
        <div className="w-full border-t border-[#E3E3E3] mt-auto" />
        <div className="p-3 pt-4 flex flex-col gap-3">
          <p className="text-text font-400 text-[12px] leading-relaxed line-clamp-2 mb-1">
            {car.description}
          </p>
          <div className="flex justify-between items-center gap-2">
            <div>
              <span className="text-[15px] blur-xs lg:text-[16px] font-semibold text-black leading-full tracking-[-3%]">
                ${car.price.toLocaleString()}
              </span>
              <p className="text-[10px] mt-1 font-medium text-black">
                ${car.biweekly}
                <span className="text-[10px] font-normal ">/biweekly</span>
              </p>
            </div>
            <button
              onClick={() => {
                router.push(`/shop/${car.year} ${car.make} ${car.model}`);
              }}
              className="flex-1 max-w-[80px] h-[30px] font-[600] text-[10px] rounded-full bg-primary text-white cursor-pointer hover:bg-primary-hover hover:scale-105 transition-all duration-300 shadow-md"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarsGrid = ({ onMobileFilterClick }) => {
  const [sortType, setSortType] = useState("Recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const sortedCars = useMemo(() => {
    let result = [...dummyCars];
    if (sortType === "Price: Low to High")
      result.sort((a, b) => a.price - b.price);
    if (sortType === "Price: High to Low")
      result.sort((a, b) => b.price - a.price);
    if (sortType === "Newest First") result.sort((a, b) => b.year - a.year);
    return result;
  }, [sortType]);

  const totalPages = Math.ceil(sortedCars.length / itemsPerPage);
  const currentItems = sortedCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search Cars or Keywords"
            className="w-full text-[12px] lg:text-[18px] h-[50px] lg:h-[60px] pl-3 pr-3 lg:pl-6 lg:pr-6 rounded-[5px] bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm "
          />
        </div>
        <button
          onClick={onMobileFilterClick}
          className="lg:hidden h-[50px] w-[50px] flex items-center justify-center bg-white border border-gray-200 rounded-[7px] shadow-sm"
        >
          <SlidersHorizontal size={20} className="text-black" />
        </button>
      </div>

      <div className="flex flex-row justify-between items-start md:items-center mb-10 gap-4">
        <p className="text-[#A4A4A4] text-[10px] w-[250px] lg:w-max lg:text-[15 px]">
          Used Cars for Sale in
          <span className="font-medium text-black"> Hamilton, Ontario: </span>
          <span className="font-medium   text-black">
            {sortedCars.length} results
          </span>
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[12px] lg:text-[16px] text-black font-medium">
            Sort
          </span>
          <div className="relative">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-[7px] px-4 py-2 pr-10 text-[12px] lg:text-[14px] font-medium outline-none"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  2 xl:grid-cols-4 gap-5">
        {currentItems.map((car, index) => (
          <CarCard key={`${car.id}-${index}`} car={car} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-16 mb-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-30"
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-full font-semibold transition-all ${
              currentPage === i + 1
                ? "bg-primary text-white shadow-md"
                : "border border-gray-200 text-black hover:border-primary"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-30"
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CarsGrid;
