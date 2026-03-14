"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";

const PaymentPackage = ({ formData, setFormData, onNext, onBack }) => {
  const [paymentType, setPaymentType] = useState("Finance"); // Toggle state: "Cash" or "Finance"

  const packageData = {
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
        name: "Autobon Certified™",
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
        name: "Autobon Certified Plus ™",
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
        name: "Autobon Certified™",
        price: "25,580",
        unit: "total",
        isPopular: true,
        warranty: "Until 04/2029 or 62,000 km",
        features: [
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

  const handleSelect = (pkg) => {
    setFormData({
      ...formData,
      selectedPackage: pkg.name,
      paymentMethod: paymentType,
      packagePrice: pkg.price,
    });
    onNext();
  };

  return (
    <div className="w-full py-0 md:py-8 animate-in fade-in duration-500">
      <div className="text-center mb-12 flex flex-col justify-start items-center md:items-start ">
        <h2 className="text-2xl w-full lg:text-left font-bold text-[#4A4A4A] mb-6 ">
          Pick a payment package
        </h2>

        {/* Unified Toggle Switch */}
        <div className="inline-flex items-start    bg-gray-100 rounded-full border border-[#BFBFBF]">
          <button
            onClick={() => setPaymentType("Cash")}
            className={`px-6 py-2 rounded-full border text-xs font-bold transition-all ${
              paymentType === "Cash"
                ? "bg-blue-100 text-blue-600  border-primary shadow-sm"
                : "text-gray-400 border-none"
            }`}
          >
            Cash
          </button>
          <button
            onClick={() => setPaymentType("Finance")}
            className={`px-6 py-2 rounded-full border text-xs font-bold transition-all ${
              paymentType === "Finance"
                ? "bg-blue-100 text-blue-600  border-primary shadow-sm"
                : "text-gray-400 border-none"
            }`}
          >
            Finance
          </button>
        </div>
      </div>

      {/* Responsive Cards Container */}
      <div className="relative max-w-full mx-auto px-2 md:px-0">
        {/* Scrollable Cards on mobile/tablet, Grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-3 gap-8 lg:overflow-x-visible overflow-x-auto pb-8 scrollbar-hide lg:snap-none snap-x snap-mandatory pt-8">
          {packageData[paymentType].map((pkg, idx) => (
            <div
              style={{ boxShadow: `0px 0px 26.5px -4.32px #1A68DC8F` }}
              key={idx}
              className={`relative mx-2 lg:mx-0 flex-shrink-0 lg:flex-shrink w-[calc(100vw-6rem)] sm:w-[400px] lg:w-full flex border-primary flex-col bg-white rounded-xl border transition-all lg:snap-none snap-center ${
                pkg.isPopular
                  ? " shadow-2xl scale-105 z-10 pt-12 pb-10 px-10"
                  : "shadow-lg pt-8 pb-8 px-8"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold py-1.5 px-6 rounded-full uppercase tracking-widest">
                  Most popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-gray-700 mb-6">
                  {pkg.name}
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-extrabold text-[#4A4A4A]">
                    ${pkg.price}
                  </span>
                  <span className="text-xs text-gray-400 font-medium self-end mb-1">
                    {pkg.unit}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSelect(pkg)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full mb-10 transition-colors shadow-lg shadow-blue-100"
              >
                Select
              </button>

              <div className="space-y-6">
                <div className="text-center pb-2">
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter mb-1">
                    Warranty
                  </p>
                  <p className="text-xs text-gray-500">{pkg.warranty}</p>
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
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onBack}
          className="bg-gray-100 text-gray-500 font-bold px-12 py-3 rounded-md hover:bg-gray-200 transition-all"
        >
          Back
        </button>
      </div>

      {/* Add custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PaymentPackage;
