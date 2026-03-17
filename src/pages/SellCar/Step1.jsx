"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import AutocompleteInput from "../../components/AutocompleteInput";
import AddressAutocomplete from "../../components/AddressAutocomplete";
import { VEHICLE_MAKES, VEHICLE_MODELS } from "../../lib/vehicleData";

const Step1_Details = ({ onNext, onBack, formData, updateFormData }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [vin, setVin] = useState(formData?.vin || "");
  const [vehicleDetails, setVehicleDetails] = useState({
    year: formData?.year || "",
    make: formData?.make || "",
    model: formData?.model || "",
    city: formData?.city || "",
  });
  const [errors, setErrors] = useState({});

  const years = Array.from({ length: 25 }, (_, i) => (2025 - i).toString());
  const modelSuggestions = VEHICLE_MODELS[vehicleDetails.make] || [];

  const handleVinChange = (e) => {
    setVin(e.target.value.toUpperCase());
    if (errors.vin) setErrors((p) => ({ ...p, vin: "" }));
  };

  const handleDetailChange = (field, value) => {
    setVehicleDetails((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "make" ? { model: "" } : {}),
    }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleContinue = () => {
    const newErrors = {};

    if (activeTab === "vin") {
      if (!vin.trim()) newErrors.vin = "Please enter your VIN";
      else if (vin.trim().length < 17) newErrors.vin = "VIN must be 17 characters";
    } else {
      if (!vehicleDetails.year) newErrors.year = "Please select a year";
      if (!vehicleDetails.make.trim()) newErrors.make = "Please enter the make";
      if (!vehicleDetails.model.trim()) newErrors.model = "Please enter the model";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Push data to parent
    if (updateFormData) {
      if (activeTab === "vin") {
        updateFormData("vin", vin);
      } else {
        updateFormData("year", vehicleDetails.year);
        updateFormData("make", vehicleDetails.make);
        updateFormData("model", vehicleDetails.model);
        updateFormData("city", vehicleDetails.city);
      }
    }
    onNext();
  };

  const selectClass =
    "p-4 border border-[#BFBFBF] rounded-none bg-[#F9FAFB] text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20";
  const inputClass =
    "w-full p-4 border border-[#BFBFBF] rounded-none bg-[#F9FAFB] text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20";

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
        <div className="inline-flex border-2 border-[#BFBFBF] rounded-full bg-white">
          <button
            onClick={() => setActiveTab("vin")}
            className={`px-8 py-3 rounded-full transition-all ${
              activeTab === "vin"
                ? "bg-[#E8F1FF] text-primary border border-primary font-bold"
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

      {/* Conditional Rendering */}
      {activeTab === "vin" ? (
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <div className="text-left mb-6">
            <label className="block text-[16px] font-bold text-[#4A4A4A] mb-1">
              Vehicle Identification Number (VIN)
            </label>
            <p className="text-xs text-gray-400 mb-4">
              17-character VIN found on your registration or driver&apos;s side
              dashboard
            </p>
            <div className="relative">
              <input
                type="text"
                value={vin}
                onChange={handleVinChange}
                placeholder="Eg. 1HCGW4567..."
                maxLength={17}
                className={`w-full p-4 pr-12 border rounded-none bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.vin ? "border-red-500" : "border-[#BFBFBF]"}`}
              />
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            {errors.vin && <p className="text-red-500 text-xs mt-1">{errors.vin}</p>}
          </div>

          <div className="text-center mb-8">
            <p className="font-bold text-[#4A4A4A] mb-2">
              Where to find your VIN:
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Driver&apos;s side dashboard (visible through windshield)</li>
              <li>• Driver&apos;s side door jamb sticker</li>
              <li>• Vehicle registration or insurance card</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <select
                value={vehicleDetails.year}
                onChange={(e) => handleDetailChange("year", e.target.value)}
                className={`w-full ${selectClass} ${errors.year ? "!border-red-500" : ""}`}
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-xs mt-1 text-left">{errors.year}</p>}
            </div>

            <div>
              <AutocompleteInput
                value={vehicleDetails.make}
                onChange={(val) => handleDetailChange("make", val)}
                suggestions={VEHICLE_MAKES}
                placeholder="Make"
                className={`${inputClass} ${errors.make ? "!border-red-500" : ""}`}
              />
              {errors.make && <p className="text-red-500 text-xs mt-1 text-left">{errors.make}</p>}
            </div>

            <div>
              <AutocompleteInput
                value={vehicleDetails.model}
                onChange={(val) => handleDetailChange("model", val)}
                suggestions={modelSuggestions}
                placeholder="Model"
                className={`${inputClass} ${errors.model ? "!border-red-500" : ""}`}
                disabled={!vehicleDetails.make}
              />
              {errors.model && <p className="text-red-500 text-xs mt-1 text-left">{errors.model}</p>}
            </div>

            <AddressAutocomplete
              value={vehicleDetails.city}
              onChange={(val, components) => {
                if (components) {
                  handleDetailChange("city", components.city || val);
                } else {
                  handleDetailChange("city", val);
                }
              }}
              placeholder="City"
              inputClassName="!rounded-none !p-4 !bg-[#F9FAFB] !border-[#BFBFBF] !text-gray-500"
            />
          </div>
          <p className="text-xs text-gray-400 mb-8">
            We use your city to provide you an accurate offer based on your
            current market.
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="w-max px-20 border border-[#BFBFBF] py-4 rounded-none font-bold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        )}
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
