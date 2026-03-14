"use client";
import React, { useState } from "react";

const Step5Delivery = ({ formData, setFormData, onBack, onNext }) => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  return (
    <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">
        Would you like to trade in a car?
      </h2>
      <p className="text-[#4A4A4A] text-sm mb-10  mt-5 leading-relaxed max-w-lg">
        We'll apply the value of your trade-in vehicle towards your new ride and
        reduce the taxes on your purchase.
      </p>

      <div className="space-y-4 mb-12">
        {/* Pickup Option */}
        <label
          className={`relative flex items-center p-6 border-2 rounded-none cursor-pointer transition-all ${
            deliveryMethod === "pickup"
              ? "border-blue-500 bg-blue-50/30"
              : "border-gray-100 hover:border-gray-200"
          }`}
        >
          <input
            type="radio"
            className="hidden"
            name="delivery"
            checked={deliveryMethod === "pickup"}
            onChange={() => setDeliveryMethod("pickup")}
          />
          <div
            className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
              deliveryMethod === "pickup"
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            {deliveryMethod === "pickup" && (
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-600">
                Pick it up from Autobon
              </span>
              <span className="text-blue-500 font-bold text-sm">Free</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              As early as January 27. Choose a time in the next step
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              3350 Wolfedale Road, Mississauga, Ontario, L5C 1W4
            </p>
          </div>
        </label>

        {/* Delivery Option */}
        <label
          className={`relative flex items-center p-6 border-2 rounded-none cursor-pointer transition-all ${
            deliveryMethod === "delivery"
              ? "border-blue-500 bg-blue-50/30"
              : "border-gray-100 hover:border-gray-200"
          }`}
        >
          <input
            type="radio"
            className="hidden"
            name="delivery"
            checked={deliveryMethod === "delivery"}
            onChange={() => setDeliveryMethod("delivery")}
          />
          <div
            className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
              deliveryMethod === "delivery"
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            {deliveryMethod === "delivery" && (
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-300">
                Delivery to your door
              </span>
              <span className="text-blue-400 font-bold text-sm">Upgrade</span>
            </div>
            <p className="text-xs text-gray-400">
              Not available for Basic package. Upgrade now to have your car
              delivered.
            </p>
          </div>
        </label>

        <p className="text-xs text-gray-400 italic">
          Want free delivery? Upgrade your package
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-1/3 bg-[#F3F3F3] text-[#676767] border rounded-none border-[#A5A5A5] font-medium py-4  hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
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
    </div>
  );
};

export default Step5Delivery;
