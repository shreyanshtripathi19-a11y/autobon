"use client";
import React from "react";

const Step2PreferredVehicle = ({ formData, setFormData }) => {
  // 1. THE BUILD FIX: If formData is undefined (during build), return null
  if (!formData) return null;

  return (
    <div className="w-full">
      <div className="text-center w-full flex justify-center items-center flex-col mx-auto">
        <h1 className="text-lg md:text-2xl font-bold text-center text-[#4A4A4A] mb-4 max-w-lg leading-tight">
          What is your preferred vehicle?
        </h1>
        <p className="text-sm md:text-lg font-semibold text-[#8E8E93] mb-6">
          It's okay if you're unsure, you can skip this step
        </p>

        <input
          type="text"
          placeholder="Make, Model, Years (ex. Toyota RAV4 2018-2020)"
          className="w-[300px] lg:w-[500px] border text-[16px] md:text-[18px] border-gray-300 rounded-sm p-4 py-2 text-left text-lg placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 mb-8 transition-all"
          // 2. USE OPTIONAL CHAINING: formData?.preferredVehicle
          value={formData?.preferredVehicle || ""}
          onChange={(e) =>
            setFormData &&
            setFormData({ ...formData, preferredVehicle: e.target.value })
          }
        />

        <p className="text-[#000000] font-semibold text-sm md:text-lg leading-snug px-4">
          If you have more than one choice please type them
        </p>
      </div>
    </div>
  );
};

export default Step2PreferredVehicle;
