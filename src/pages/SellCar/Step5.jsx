"use client";
import React, { useState } from "react";

const Step5_Offer = ({ onBack, onNext, formData }) => {
  const [submitting, setSubmitting] = useState(false);
  const displayYear = formData?.year || "—";
  const displayMake = formData?.make || "—";
  const displayModel = formData?.model || "—";
  const title = `${displayYear} ${displayMake} ${displayModel}`.trim();
  const mileage = formData?.mileage || "—";
  const condition = formData?.condition || "—";

  const handleAcceptOffer = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "sell-car",
          firstName: formData?.contact?.firstName || "",
          lastName: formData?.contact?.lastName || "",
          email: formData?.contact?.email || "",
          phone: formData?.contact?.phone || "",
          extraData: {
            year: formData?.year,
            make: formData?.make,
            model: formData?.model,
            city: formData?.city,
            vin: formData?.vin,
            mileage: formData?.mileage,
            condition: formData?.condition,
          },
        }),
      });
    } catch (err) {
      console.error("Sell-car submission error:", err);
    }
    setSubmitting(false);
    onNext();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">Your Estimated Offer</h2>
      <p className="text-[#8E8E93] font-semibold mb-8">
        Based on current market conditions
      </p>

      <div className="mb-10">
        <p className="text-gray-500 font-bold text-sm mb-2">Estimated Value</p>
        <h1 className="text-5xl font-black font-semibold text-[#4A4A4A]">
          $7,508
        </h1>
        <p className="text-gray-400 text-sm mt-4">
          Final offer may vary after inspection
        </p>
      </div>

      <div className="border border-primary p-4 py-6 flex items-center gap-6 mb-12 bg-[#F0F7FF] max-w-[500px] mx-auto">
        <img src="/car-icon.jpeg" alt="Car" className="w-52 h-auto object-contain" />
        <div className="text-left">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-gray-500">{mileage} • {condition} condition</p>
        </div>
      </div>

      <div className="flex gap-4 max-w-[400px] mx-auto">
        <button
          onClick={onBack}
          disabled={submitting}
          className="w-max px-20 border border-[#BFBFBF] py-4 rounded-none font-bold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleAcceptOffer}
          disabled={submitting}
          className="flex-1 bg-primary text-white py-4 rounded-none font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Step5_Offer;
