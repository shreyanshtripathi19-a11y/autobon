"use client";
import React, { useState } from "react";
import { Check, X } from "lucide-react";

const Step4PackagePlan = ({ formData, setFormData, onNext, onBack }) => {
  const [paymentType, setPaymentType] = useState("Finance"); // Toggle state

  const packages = {
    Finance: [
      {
        name: "Essential",
        price: "228",
        unit: "biweekly",
        warranty: "Until 04/2026 or 52,900 km",
        features: [
          { text: "10-day money back guarantee", included: true },
          {
            text: "Due today: $100 refundable deposit",
            included: true,
            bold: true,
          },
          { text: "Tire & rim protection", included: false },
          { text: "Rust protection", included: false },
          {
            text: "Free pick-up or $139 delivery",
            included: true,
            subtext: "Separate from shipping",
          },
          { text: "Roadside assistance", included: false },
          { text: "Detailing", included: true },
          { text: "Full tank of gas", included: true },
          { text: "210-point inspection™", included: true },
          { text: "Safety standards certificate", included: true },
        ],
      },
      {
        name: "Clutch Certified™",
        price: "251",
        unit: "biweekly",
        isPopular: true,
        warranty: "Until 04/2029 or 100,000 km",
        features: [
          { text: "10-day money back guarantee", included: true },
          {
            text: "Due today: $100 refundable deposit",
            included: true,
            bold: true,
          },
          { text: "Tire & rim protection", included: false },
          { text: "Rust protection", included: false },
          {
            text: "Free Delivery",
            included: true,
            subtext: "Separate from shipping",
          },
          { text: "Roadside assistance", included: true },
          { text: "Detailing", included: true },
          { text: "Full tank of gas", included: true },
          { text: "210-point inspection™", included: true },
          { text: "Safety standards certificate", included: true },
        ],
      },
      {
        name: "Clutch Certified Plus ™",
        price: "264",
        unit: "biweekly",
        warranty: "Until 04/2026 or 52,900 km",
        features: [
          { text: "10-day money back guarantee", included: true },
          {
            text: "Due today: $100 refundable deposit",
            included: true,
            bold: true,
          },
          { text: "Tire & rim protection", included: true },
          { text: "Rust protection", included: true },
          {
            text: "Free Delivery",
            included: true,
            subtext: "Separate from shipping",
          },
          { text: "Roadside assistance", included: true },
          { text: "Detailing", included: true },
          { text: "Full tank of gas", included: true },
          { text: "210-point inspection™", included: true },
          { text: "Safety standards certificate", included: true },
        ],
      },
    ],
    Cash: [
      {
        name: "Basic",
        price: "20,390",
        unit: "total",
        warranty: "Until 04/2026 or 52,900 km",
        features: [
          /* Same structure as Essential */
          { text: "10-day money back guarantee", included: true },
          {
            text: "Due today: $100 refundable deposit",
            included: true,
            bold: true,
          },
          { text: "Tire & rim protection", included: false },
          { text: "Rust protection", included: false },
          { text: "Free pick-up or $139 delivery", included: true },
          { text: "Roadside assistance", included: false },
          { text: "Detailing", included: true },
          { text: "Full tank of gas", included: true },
          { text: "210-point inspection™", included: true },
          { text: "Safety standards certificate", included: true },
        ],
      },
      {
        name: "Clutch Certified™",
        price: "25,580",
        unit: "total",
        isPopular: true,
        warranty: "Until 04/2029 or 62,000 km",
        features: [
          /* Same structure as Finance Certified */
          { text: "10-day money back guarantee", included: true },
          {
            text: "Due today: $100 refundable deposit",
            included: true,
            bold: true,
          },
          { text: "Tire & rim protection", included: true },
          { text: "Rust protection", included: true },
          { text: "Free Delivery", included: true },
          { text: "Roadside assistance", included: true },
          { text: "Detailing", included: true },
          { text: "Full tank of gas", included: true },
          { text: "210-point inspection™", included: true },
          { text: "Safety standards certificate", included: true },
        ],
      },
      {
        name: "Essential",
        price: "22,390",
        unit: "total",
        warranty: "Until 04/2026 or 60,00 km",
        features: [
          /* Same structure as Finance Essential */
          { text: "10-day money back guarantee", included: true },
          {
            text: "Due today: $100 refundable deposit",
            included: true,
            bold: true,
          },
          { text: "Tire & rim protection", included: false },
          { text: "Rust protection", included: false },
          { text: "Free Delivery", included: true },
          { text: "Roadside assistance", included: true },
          { text: "Detailing", included: true },
          { text: "Full tank of gas", included: true },
          { text: "210-point inspection™", included: true },
          { text: "Safety standards certificate", included: true },
        ],
      },
    ],
  };

  return (
    <div className="w-full py-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Pick a payment package
        </h2>

        {/* Payment Toggle */}
        <div className="inline-flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
          <button
            onClick={() => setPaymentType("Cash")}
            className={`px-8 py-2 rounded-full text-sm font-semibold transition-all ${
              paymentType === "Cash"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-400"
            }`}
          >
            Cash
          </button>
          <button
            onClick={() => setPaymentType("Finance")}
            className={`px-8 py-2 rounded-full text-sm font-semibold transition-all ${
              paymentType === "Finance"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-400"
            }`}
          >
            Finance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {packages[paymentType].map((pkg, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col bg-white rounded-3xl border-2 p-8 transition-all ${
              pkg.isPopular
                ? "border-blue-500 shadow-2xl scale-105 z-10"
                : "border-gray-100 shadow-lg"
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold py-1.5 px-6 rounded-full uppercase tracking-widest shadow-md">
                Most popular
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-700 mb-6">
                {pkg.name}
              </h3>
              <div className="flex items-center justify-center gap-1">
                <span className="text-5xl font-extrabold text-gray-800">
                  ${pkg.price}
                </span>
                <span className="text-sm text-gray-400 font-medium self-end mb-2">
                  {pkg.unit}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNext()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full mb-8 transition-colors shadow-lg shadow-blue-100"
            >
              Select
            </button>

            <div className="space-y-6">
              <div className="text-center border-b border-gray-100 pb-6">
                <p className="text-sm font-bold text-gray-700 mb-1">Warranty</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {pkg.warranty}
                </p>
              </div>

              <div className="space-y-4">
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    {feat.included ? (
                      <Check
                        className="w-4 h-4 text-blue-500 shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                    ) : (
                      <X
                        className="w-4 h-4 text-gray-300 shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                    )}
                    <div>
                      <p
                        className={`text-xs leading-tight ${feat.included ? "text-gray-700" : "text-gray-400"} ${feat.bold ? "font-bold" : ""}`}
                      >
                        {feat.text}
                      </p>
                      {feat.subtext && (
                        <p className="text-[10px] text-gray-400 italic mt-0.5">
                          {feat.subtext}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onBack}
          className="text-gray-400 font-bold hover:text-gray-600 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Step4PackagePlan;
