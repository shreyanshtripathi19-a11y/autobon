"use client";
import React, { useState } from "react";

const Step3_Mileage = ({ onNext, onBack, formData, updateFormData }) => {
  const [mileage, setMileage] = useState(formData?.mileage || "");
  const [condition, setCondition] = useState(formData?.condition || "Excellent");
  const [errors, setErrors] = useState({});

  const displayYear = formData?.year || "—";
  const displayMake = formData?.make || "—";
  const displayModel = formData?.model || "—";
  const title = `${displayMake} ${displayModel}`.trim() || "Your Vehicle";

  const conditionOptions = [
    { label: "Excellent", desc: "Like new, no issues" },
    { label: "Good", desc: "Minor wear, runs great" },
    { label: "Fair", desc: "Some repairs needed" },
    { label: "Poor", desc: "Major issues or damage" },
  ];

  const handleContinue = () => {
    const newErrors = {};
    if (!mileage.trim()) newErrors.mileage = "Please enter the current mileage";
    if (!condition) newErrors.condition = "Please select a condition";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (updateFormData) {
      updateFormData("mileage", mileage);
      updateFormData("condition", condition);
    }
    onNext();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-2">Vehicle Details</h2>
      <p className="text-gray-500 mb-8">Tell us about your {displayYear} {title}</p>

      <div className="border-2 border-primary rounded-none p-6 flex items-center gap-6 relative mb-12 bg-[#F0F7FF]">
        <img src="/images/c0e515790ae6cd243a0ae47e32ad732e993b78a2.png" alt="Car" className="w-32 object-contain" />
        <div className="text-left">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-[#8E8E93]">{displayYear}</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="absolute top-4 right-6 text-primary font-bold text-sm hover:underline"
        >
          Edit
        </button>
      </div>

      <div className="text-left mb-8">
        <label className="block font-bold mb-2">Current Mileage (km)</label>
        <input
          type="text"
          placeholder="Eg. 90000kms"
          value={mileage}
          onChange={(e) => {
            setMileage(e.target.value);
            if (errors.mileage) setErrors((p) => ({ ...p, mileage: "" }));
          }}
          className={`w-full p-4 border rounded-none outline-none ${errors.mileage ? "border-red-500" : "border-border"}`}
        />
        {errors.mileage && <p className="text-red-500 text-xs mt-1">{errors.mileage}</p>}
      </div>

      <div className="text-left mb-10">
        <label className="block font-bold mb-4">Overall Condition</label>
        <div className="grid grid-cols-2 gap-4">
          {conditionOptions.map((item) => (
            <div
              key={item.label}
              onClick={() => {
                setCondition(item.label);
                if (errors.condition) setErrors((p) => ({ ...p, condition: "" }));
              }}
              className={`p-4 border rounded-none cursor-pointer transition-all ${
                condition === item.label
                  ? "border-primary bg-[#F0F7FF] border-2"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    condition === item.label ? "border-primary" : "border-gray-300"
                  }`}
                >
                  {condition === item.label && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                <p className="font-bold text-sm">{item.label}</p>
              </div>
              <p className="text-[11px] text-gray-400 ml-6">{item.desc}</p>
            </div>
          ))}
        </div>
        {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition}</p>}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-max px-20 border border-[#BFBFBF] py-4 rounded-none font-bold text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 bg-primary text-white py-4 rounded-none font-bold hover:bg-primary/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step3_Mileage;
