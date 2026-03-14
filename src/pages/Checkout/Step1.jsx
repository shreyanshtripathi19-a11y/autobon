import React from "react";
import civic from "../../assets/s1.png";

const Step1TradeIn = ({ formData, setFormData, onNext }) => {
  // CRITICAL FIX: Prevent Next.js from crashing during build
  if (!formData) return null;

  const options = [
    {
      id: "different",
      label: "I want to trade in a vehicle”",
    },
    {
      id: "none",
      label: "I don't want to trade in a car",
    },
  ];

  const handleSelect = (id) => {
    if (setFormData) {
      setFormData({ ...formData, tradeIn: id });
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="mb-10">
        <h2 className=" text-[19px] lg:text-3xl lg:text-left text-center font-bold text-[#4A4A4A] mb-4 tracking-tight">
          Would you like to trade in a car?
        </h2>
        <p className="text-[#4A4A4A] text-[12px] lg:text-[15px] my-2 lg:my-8  lg:text-left text-center leading-relaxed max-w-lg">
          We'll apply the value of your trade-in vehicle towards your new ride
          and reduce the taxes on your purchase.
        </p>
        <div className="w-full h-[120px] md:hidden my-8 flex justify-between items-center px-5  py-3 rounded-xl border shadow shadow-xl  border-[#3D8BFF]">
          <div>
            <div className="text-[16px] text-[#3F3F3F] font-semibold">
              Honda Civic, 2021
            </div>
            <div className="text-[#8E8E93] text-[18px]">76899 kms</div>
          </div>
          <img
            src={civic.src}
            alt=""
            className="w-auto    h-[70px] object-contain"
          />
        </div>
      </div>

      <div className="space-y-4 mb-10 mt-3">
        {options.map((option) => (
          <label
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`flex items-center p-5 border rounded-none cursor-pointer transition-all duration-200 ${
              // Use Optional Chaining here
              formData?.tradeIn === option.id
                ? "border-[#1969DB] bg-blue-100/80 shadow-sm"
                : "border-[#9BA5AD] hover:border-[#9BA5AD]"
            }`}
          >
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name="tradeIn"
                className="sr-only"
                checked={formData?.tradeIn === option.id}
                onChange={() => {}}
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData?.tradeIn === option.id
                    ? "border-[#1969DB]"
                    : "border-[#9BA5AD]"
                }`}
              >
                {formData?.tradeIn === option.id && (
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                )}
              </div>
            </div>
            <span
              className={`ml-5 text-sm lg:text-lg ${
                formData?.tradeIn === option.id
                  ? "text-[#4A4A4A] font-medium"
                  : "text-[#4A4A4A]"
              }`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <button
        style={{
          background: `linear-gradient(180deg, #3D8BFF 0%, #1B63CE 100%)`,
        }}
        onClick={onNext}
        className="w-full 
    hover:brightness-110 hover:shadow-lg active:scale-[0.98]  
    transition-all duration-200 ease-in-out  hover:bg-blue-700 text-white font-medium py-4 rounded-none  transition-colors text-lg shadow-md"
      >
        Continue
      </button>
    </div>
  );
};

export default Step1TradeIn;
