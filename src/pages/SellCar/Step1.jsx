"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const Step1_Details = ({ onNext, onBack }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [vin, setVin] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState({
    year: "",
    make: "",
    model: "",
    city: "",
  });

  // Sample data for dropdowns
  const years = Array.from({ length: 25 }, (_, i) => (2025 - i).toString());
  const makes = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "BMW",
    "Mercedes",
    "Audi",
    "Tesla",
    "Hyundai",
    "Kia",
  ];
  const models = {
    Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Sienna"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
    Ford: ["F-150", "Escape", "Explorer", "Mustang", "Focus"],
    Chevrolet: ["Silverado", "Equinox", "Malibu", "Tahoe", "Camaro"],
    BMW: ["3 Series", "5 Series", "X3", "X5", "X7"],
    Mercedes: ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
    Audi: ["A4", "A6", "Q5", "Q7", "Q3"],
    Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
    Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
    Kia: ["Sorento", "Sportage", "Telluride", "Forte", "Soul"],
  };
  const cities = [
    "Toronto",
    "Mississauga",
    "Brampton",
    "Markham",
    "Vancouver",
    "Calgary",
    "Edmonton",
    "Ottawa",
    "Montreal",
  ];

  const handleVinChange = (e) => {
    setVin(e.target.value.toUpperCase());
  };

  const handleDetailChange = (field, value) => {
    setVehicleDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = () => {
    // if (activeTab === "vin") {
    //   // Validate VIN
    //   if (vin.length < 17) {
    //     alert("Please enter a valid 17-character VIN");
    //     return;
    //   }
    //   console.log("VIN entered:", vin);
    // } else {
    //   // Validate vehicle details
    //   const { year, make, model, city } = vehicleDetails;
    //   if (!year || !make || !model || !city) {
    //     alert("Please fill in all vehicle details");
    //     return;
    //   }
    //   console.log("Vehicle details:", vehicleDetails);
    // }
    onNext();
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl text-[#4A4A4A] font-semibold mb-2">
          Get Your Instant Offer
        </h2>
        <p className="text-[16px] font-semibold text-[#8E8E93]">
          Enter your VIN or vehicle details to get started
        </p>
      </div>

      {/* Tab Switching */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex border-2 border-[#BFBFBF] rounded-full bg-white ">
          <button
            onClick={() => setActiveTab("vin")}
            className={`px-8 py-3 rounded-full transition-all ${
              activeTab === "vin"
                ? "bg-[#E8F1FF] text-primary border border-primary  font-bold"
                : "text-gray-500"
            }`}
          >
            VIN
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-8 py-3 rounded-full transition-all ${
              activeTab === "details"
                ? "bg-[#E8F1FF] text-primary font-bold border border-primary"
                : "text-gray-500"
            }`}
          >
            Vehicle Details
          </button>
        </div>
      </div>

      {/* Conditional Rendering based on activeTab */}
      {activeTab === "vin" ? (
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <div className="text-left mb-6">
            <label className="block text-[16px] font-bold text-[#4A4A4A] mb-1">
              Vehicle Identification Number (VIN)
            </label>
            <p className="text-xs text-gray-400 mb-4">
              17-character VIN found on your registration or driver's side
              dashboard
            </p>
            <div className="relative">
              <input
                type="text"
                value={vin}
                onChange={handleVinChange}
                placeholder="Eg. 1HCGW4567..."
                maxLength={17}
                className="w-full p-4 pr-12 border border-[#BFBFBF] rounded-none bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="font-bold text-[#4A4A4A] mb-2">
              Where to find your VIN:
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Driver's side dashboard (visible through windshield)</li>
              <li>• Driver's side door jamb sticker</li>
              <li>• Vehicle registration or insurance card</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              value={vehicleDetails.year}
              onChange={(e) => handleDetailChange("year", e.target.value)}
              className="p-4 border border-[#BFBFBF] rounded-none bg-[#F9FAFB] text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={vehicleDetails.make}
              onChange={(e) => handleDetailChange("make", e.target.value)}
              className="p-4 border border-[#BFBFBF] rounded-none bg-[#F9FAFB] text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Make</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>

            <select
              value={vehicleDetails.model}
              onChange={(e) => handleDetailChange("model", e.target.value)}
              className="p-4 border border-[#BFBFBF] rounded-none bg-[#F9FAFB] text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={!vehicleDetails.make}
            >
              <option value="">Model</option>
              {vehicleDetails.make &&
                models[vehicleDetails.make]?.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>

            <select
              value={vehicleDetails.city}
              onChange={(e) => handleDetailChange("city", e.target.value)}
              className="p-4 border border-[#BFBFBF] rounded-none bg-[#F9FAFB] text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-400 mb-8">
            We use your city to provide you an accurate offer based on your
            current market.
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className=" w-max px-20 border border-[#BFBFBF] py-4 rounded-none font-bold text-gray-500 hover:bg-gray-50 transition-colors"
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

export default Step1_Details;
