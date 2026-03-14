"use client";
import React from "react";
const Step3Budget = ({ formData, setFormData, onNext }) => {
  if (!formData) return null;

  const handleSelect = (option) => {
    setFormData({ ...formData, budget: option });
    if (onNext) setTimeout(() => onNext(), 300);
  };

  const budgetOptions = [
    "Under $400 / Month",
    "$400-$499 / Month",
    "$500-$600 / Month",
    "Over $600 / Month",
  ];

  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl font-bold text-[#4A4A4A] mb-8 text-center">
        What is your budget?
      </h1>
      <div className="space-y-3 mb-8 w-full flex flex-col items-center">
        {budgetOptions.map((option) => (
          <label
            key={option}
            onClick={() => handleSelect(option)}
            className={`flex items-center p-4 md:py-4 py-6 w-[300px] lg:w-[500px] border rounded-none     cursor-pointer transition-all ${
              formData?.budget === option
                ? "bg-blue-50 border-blue-400 ring-1 ring-blue-400"
                : "border-[#9BA5AD]"
            }`}
          >
            <input
              type="radio"
              checked={formData?.budget === option}
              readOnly
              className="h-5 w-5 mr-4"
            />
            <span
              className={`text-[#333333] w-full text-center font-normal text-sm md:text-base`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default Step3Budget;
