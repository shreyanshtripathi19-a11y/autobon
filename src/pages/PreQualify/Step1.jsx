"use client";
import React from "react";
import pre1 from "../../assets/pre-1.png";
import pre2 from "../../assets/pre-2.png";
import pre3 from "../../assets/pre-3.png";
import pre4 from "../../assets/pre-4.png";

const Step1 = ({ formData, setFormData, onNext }) => {
  if (!formData) return null;

  const handleSelect = (id) => {
    setFormData({ ...formData, vehicleType: id });

    if (onNext) {
      onNext();
    }
  };

  const vehicleTypes = [
    { id: "Car", label: "Car", sub: "(Sedan & Coupes)", img: pre1.src },
    { id: "SUV", label: "SUV", sub: "(Sports Utility Vehicle)", img: pre2.src },
    { id: "Truck", label: "Truck", sub: "(Light - Heavy Duty)", img: pre3.src },
    {
      id: "Mini Van",
      label: "Mini Van",
      sub: "(Up to 8 passenger)",
      img: pre4.src,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg md:w-max w-[300px] md:text-2xl font-bold text-center text-[#4A4A4A] mb-4 max-w-lg leading-tight">
        Get Pre-Approved for the Car You Want at a Price You Can Afford
      </h1>
      <p className="text-md font-semibold text-[#8E8E93]   mb-10    mt-4 md:mt-0 md:mb-10">
        What type of vehicle are you looking for?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 w-max gap-5 md:gap-2 justify-center items-center overflow-hidden">
        {vehicleTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`cursor-pointer mx-auto md:h-[160px] h-[65px] w-[300px] md:w-[150px] px-3 py-0 md:px-3 md:py-3 flex md:flex-col flex-row-reverse justify-between items-center border transition-all ${
              formData?.vehicleType === type.id
                ? "bg-blue-50 border-blue-400 border-2"
                : "hover:bg-gray-50 border-[#9B9B9B]"
            }`}
          >
            <div className="h-25 w-full flex items-center justify-center">
              <img
                src={type.img}
                alt={type.label}
                className="max-w-[100px] md:max-w-[120px] h-auto object-contain block mx-auto"
              />
            </div>
            <div className="w-full justify-start">
              <h3 className="text-2xl font-bold md:font-bold text-black text-left w-full">
                {type.label}
              </h3>
              <p className="text-[12px] text-[#000000] w-full text-left">
                {type.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step1;
