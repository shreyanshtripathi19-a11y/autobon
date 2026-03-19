"use client";
import React from "react";

const Step2_Confirm = ({ onNext, onBack, formData }) => {
  if (!formData) return null;

  // Get generic silhouette based on body type from car data
  const getVehicleImage = () => {
    return "/car.png";
  };

  const displayYear = formData.year || "—";
  const displayMake = formData.make || "—";
  const displayModel = formData.model || "—";
  const title = `${displayMake} ${displayModel}`.trim() || "Your Vehicle";

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-2">Confirm Your Vehicle</h2>
      <p className="text-[#8E8E93] mb-10">Is this information correct?</p>

      <div className="border-2 border-primary rounded-none p-6 flex items-center gap-6 relative mb-12 bg-[#F0F7FF]">
        <img src={getVehicleImage()} alt="Car" className="w-52 h-auto object-contain" />
        <div className="text-left">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-[#8E8E93]">{displayYear}</p>
          {formData.city && (
            <p className="text-[#8E8E93] text-sm">{formData.city}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onBack}
          className="absolute top-4 right-6 text-primary font-bold text-sm hover:underline"
        >
          Edit
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-max px-20 border border-[#BFBFBF] py-4 rounded-none font-bold text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-primary text-white py-4 rounded-none font-bold hover:bg-primary/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step2_Confirm;
