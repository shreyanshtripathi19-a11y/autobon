"use client";

import React, { useState } from "react";
import home1 from "../../assets/out.png";
import arrowImage from "../../assets/arrow-f.png";
import textImage from "../../assets/text-f.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AutocompleteInput from "../../components/AutocompleteInput";
import AddressAutocomplete from "../../components/AddressAutocomplete";
import { VEHICLE_MAKES, VEHICLE_MODELS } from "../../lib/vehicleData";

const Hero = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");

  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    vin: "",
    city: "",
    province: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMakeChange = (val) => {
    setFormData((prev) => ({ ...prev, make: val, model: "" }));
  };

  const handleModelChange = (val) => {
    setFormData((prev) => ({ ...prev, model: val }));
  };

  const modelSuggestions = VEHICLE_MODELS[formData.make] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", activeTab);
    params.set("city", formData.city);
    params.set("province", formData.province);

    if (activeTab === "details") {
      params.set("year", formData.year);
      params.set("make", formData.make);
      params.set("model", formData.model);
    } else {
      params.set("vin", formData.vin);
    }

    router.push(`/sell-car?${params.toString()}`);
  };

  const inputClass =
    "w-full text-[14px] h-[50px] px-6 rounded-full bg-gray-50 border border-gray-200 focus:border-primary outline-none transition-all";

  return (
    <section
      id="sell-app"
      className="w-full bg-background py-8 lg:py-16 overflow-x-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between px-5 gap-4 lg:gap-12">
        {/* LEFT SIDE: Text + Image */}
        <div className="flex pt-5 md:pt-5 flex-col w-full lg:w-[55%] gap-6 items-center lg:items-start text-center lg:text-left">
          <div className="flex flex-col gap-3 relative w-full">
            <div className="hidden lg:flex absolute xs:-top-24 smg:-top-32 -top-28 xs:right-[20vw] right-[24vw] md:-top-34 smg:right-[110px] md:right-[160px] flex-col items-center sm:items-start lg:items-start pointer-events-none z-10 scale-[0.75] sm:scale-90 lg:scale-100 origin-right">
              <img
                src={textImage.src}
                alt="Decorative Text"
                className="xs:w-36 smg:w-48 sm:w-30 md:w-45 h-auto mb-1 relative rotate-[0deg] md:-rotate-[0deg] left-[120px] xs:left-[120px] sm:left-[70px] md:left-[130px] top-[60px] xs:top-[60px] smg:top-[60px]  smg:left-[140px] sm:top-[50px] md:top-[70px]"
              />
              <img
                src={arrowImage.src}
                alt="Arrow"
                className="w-25 xs:w-[100px] smg:w-[120px] sm:w-[60px] md:w-[140px] h-auto rotate-[0deg] lg:rotate-[0deg]"
              />
            </div>
            <h1 className="text-[40px] sm:text-[55px] md:text-[50px] lg:text-[65px] text-start font-semibold text-black leading-tight">
              Any Car,
              <br /> Any Where
            </h1>
            <p className="text-[#7B7B7B] text-start w-full text-[16px] sm:text-[18px] max-w-[500px]">
              Get an instant price for your car!
            </p>
          </div>

          <div className="w-full relative lg:-left-6 flex justify-center lg:justify-start">
            <div className="relative w-[95%] sm:w-full">
              <Image
                src={home1}
                alt="Hero Car"
                priority
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form Card */}
        <div className="w-full lg:w-[460px] bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden p-6 sm:p-8 z-20 mt-[-10px] lg:mt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <p className="text-[#4A4A4A] text-[13px] font-medium sm:max-w-[140px]">
              Enter vehicle details or VIN to get a real offer.
            </p>
            <div className="flex bg-gray-100 border border-gray-200 rounded-full w-full sm:w-max p-1">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`flex-1 text-[12px] lg:text-[14px] px-4 py-2 rounded-full font-bold transition-all ${activeTab === "details"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("vin")}
                className={`flex-1 text-[12px] lg:text-[14px] px-4 py-2 rounded-full font-bold transition-all ${activeTab === "vin"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                VIN
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {activeTab === "details" ? (
              <>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year"
                  className={inputClass}
                />
                <AutocompleteInput
                  name="make"
                  value={formData.make}
                  onChange={handleMakeChange}
                  suggestions={VEHICLE_MAKES}
                  placeholder="Make"
                  className={inputClass}
                />
                <AutocompleteInput
                  name="model"
                  value={formData.model}
                  onChange={handleModelChange}
                  suggestions={modelSuggestions}
                  placeholder="Model"
                  className={inputClass}
                  disabled={!formData.make}
                />
              </>
            ) : (
              <input
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleChange}
                placeholder="Enter 17-digit VIN"
                className={inputClass}
              />
            )}

            <AddressAutocomplete
              value={formData.city ? `${formData.city}${formData.province ? `, ${formData.province}` : ""}` : ""}
              onChange={(val, components) => {
                if (components) {
                  setFormData((prev) => ({
                    ...prev,
                    city: components.city || "",
                    province: components.provinceShort || components.province || "",
                  }));
                } else {
                  setFormData((prev) => ({ ...prev, city: val, province: "" }));
                }
              }}
              placeholder="City, Province"
              inputClassName="!rounded-full !h-[50px] !px-6 !bg-gray-50 !border-gray-200 !text-[14px]"
            />

            <button
              type="submit"
              className="w-full h-[55px] text-[16px] font-bold bg-primary text-white rounded-full hover:bg-black transition-all duration-300 shadow-lg mt-2"
            >
              Get My Offer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;