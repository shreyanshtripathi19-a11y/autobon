import React, { useState } from "react";
import civic from "../../assets/s1.png";
import { validators, formatPhone, formatPostalCode, validateAll } from "@/lib/validators";
import { FieldError, inputBorderClass } from "@/components/FieldError";
import AddressAutocomplete from "@/components/AddressAutocomplete";

const Step2PersonalDetails = ({ formData, setFormData, onNext, onBack }) => {
  // 1. Guard Clause: Prevent the build from crashing if props are missing
  if (!formData) {
    return null;
  }

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showCoBuyer, setShowCoBuyer] = useState(false);

  // Helper to handle input changes safely
  const handleChange = (field, value) => {
    // Name fields — only allow letters
    if ((field === "firstName" || field === "lastName" || field === "coBuyerFirstName" || field === "coBuyerLastName") && value && !/^[a-zA-ZÀ-ÿ\s'\-\.]*$/.test(value)) return;
    // Phone — format as digits only
    if (field === "phone" || field === "coBuyerPhone") value = formatPhone(value);
    // Postal code — format
    if (field === "postalCode") value = formatPostalCode(value);

    if (setFormData) {
      setFormData({ ...formData, [field]: value });
    }
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const validateField = (field) => {
    switch (field) {
      case "firstName": return validators.name(formData.firstName, "First name");
      case "lastName": return validators.name(formData.lastName, "Last name");
      case "phone": return validators.phone(formData.phone);
      case "address": return validators.address(formData.address);
      case "city": return validators.required(formData.city, "City");
      case "province": return validators.required(formData.province, "Province");
      case "postalCode": return validators.postalCode(formData.postalCode);
      case "coBuyerFirstName": return validators.name(formData.coBuyerFirstName, "Co-buyer first name");
      case "coBuyerLastName": return validators.name(formData.coBuyerLastName, "Co-buyer last name");
      case "coBuyerPhone": return validators.phone(formData.coBuyerPhone);
      default: return "";
    }
  };

  const handleContinue = () => {
    const fields = ["firstName", "lastName", "phone", "address", "city", "postalCode"];
    if (showCoBuyer) fields.push("coBuyerFirstName", "coBuyerLastName", "coBuyerPhone");

    const allTouched = {};
    fields.forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    const validationMap = {
      firstName: () => validators.name(formData.firstName, "First name"),
      lastName: () => validators.name(formData.lastName, "Last name"),
      phone: () => validators.phone(formData.phone),
      address: () => validators.address(formData.address),
      city: () => validators.required(formData.city, "City"),
      postalCode: () => validators.postalCode(formData.postalCode),
    };
    if (showCoBuyer) {
      validationMap.coBuyerFirstName = () => validators.name(formData.coBuyerFirstName, "Co-buyer first name");
      validationMap.coBuyerLastName = () => validators.name(formData.coBuyerLastName, "Co-buyer last name");
      validationMap.coBuyerPhone = () => validators.phone(formData.coBuyerPhone);
    }

    const { errors: newErrors, isValid } = validateAll(validationMap);
    setErrors(newErrors);
    if (!isValid) return;
    onNext();
  };

  const getBackgroundSize = (value, min, max) => {
    return { backgroundSize: `${((value - min) * 100) / (max - min)}% 100%` };
  };

  const sliderStyle = {
    backgroundImage: `linear-gradient(#3D8BFF, #3D8BFF)`,
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="animate-in   fade-in slide-in-from-right-4 duration-500 max-w-2xl">
      <header className="mb-10">
        <h2 className="text-xl font-bold text-[#4A4A4A]">
          Tell us about yourself
        </h2>
        <p className="text-[#4A4A4A] mt-2">
          This will help us get the ball rolling on your new ride
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
      </header>

      {/* Buyer Section */}
      <section className="mb-12">
        <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">Buyer</h3>
        <p className="text-sm text-[#4A4A4A] max-w-[500px] mb-6 leading-relaxed">
          Please use the legal name printed on your driver's license as this
          will be the person the car is registered to.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-xs font-medium text-[#6C6C6C] mb-1 tracking-wide">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              onBlur={() => handleBlur("firstName")}
              className={`border rounded-none p-3 outline-none transition-all ${inputBorderClass(errors.firstName)}`}
            />
            <FieldError error={errors.firstName} />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium text-[#6C6C6C] mb-1 tracking-wide">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              onBlur={() => handleBlur("lastName")}
              className={`border rounded-none p-3 outline-none transition-all ${inputBorderClass(errors.lastName)}`}
            />
            <FieldError error={errors.lastName} />
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-xs font-medium text-[#6C6C6C] mb-1 tracking-wide">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="905-800-3100"
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={`border rounded-none p-3 outline-none transition-all ${inputBorderClass(errors.phone)}`}
          />
          <FieldError error={errors.phone} />
        </div>
        <button
          type="button"
          onClick={() => {
            setShowCoBuyer((prev) => {
              if (prev && setFormData) {
                // Clear co-buyer fields when hiding
                setFormData({ ...formData, coBuyerFirstName: "", coBuyerLastName: "", coBuyerPhone: "" });
              }
              return !prev;
            });
          }}
          className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline italic"
        >
          {showCoBuyer ? "− Remove co-buyer" : "+ Add co-buyer"}
        </button>

        {showCoBuyer && (
          <div className="mt-6 pt-6 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="text-lg font-bold text-[#4A4A4A] mb-2">Co-Buyer</h3>
            <p className="text-sm text-[#4A4A4A] mb-4 leading-relaxed">
              Please use the legal name printed on the co-buyer&apos;s driver&apos;s license.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-xs font-medium text-[#6C6C6C] mb-1 tracking-wide">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.coBuyerFirstName || ""}
                  onChange={(e) => handleChange("coBuyerFirstName", e.target.value)}
                  onBlur={() => handleBlur("coBuyerFirstName")}
                  className={`border rounded-none p-3 outline-none transition-all ${inputBorderClass(errors.coBuyerFirstName)}`}
                />
                <FieldError error={errors.coBuyerFirstName} />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-medium text-[#6C6C6C] mb-1 tracking-wide">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.coBuyerLastName || ""}
                  onChange={(e) => handleChange("coBuyerLastName", e.target.value)}
                  onBlur={() => handleBlur("coBuyerLastName")}
                  className={`border rounded-none p-3 outline-none transition-all ${inputBorderClass(errors.coBuyerLastName)}`}
                />
                <FieldError error={errors.coBuyerLastName} />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium text-[#6C6C6C] mb-1 tracking-wide">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                placeholder="905-800-3100"
                value={formData.coBuyerPhone || ""}
                onChange={(e) => handleChange("coBuyerPhone", e.target.value)}
                onBlur={() => handleBlur("coBuyerPhone")}
                className={`border rounded-none p-3 outline-none transition-all ${inputBorderClass(errors.coBuyerPhone)}`}
              />
              <FieldError error={errors.coBuyerPhone} />
            </div>
          </div>
        )}
      </section>

      {/* Home Address Section */}
      <section className="mb-12">
        <h3 className="text-sm font-bold text-gray-700 mb-1">Home address</h3>
        <p className="text-xs text-[#6C6C6C] mb-4">
          For billing purposes. You can edit your delivery address later.
        </p>

        <div className="space-y-4">
          <AddressAutocomplete
            label="Street Address"
            required
            value={formData.address || ""}
            onChange={(val, components) => {
              if (setFormData) {
                setFormData({
                  ...formData,
                  address: components?.street || val,
                  city: components?.city || formData.city,
                  province: components?.provinceShort || formData.province,
                  postalCode: components?.postalCode ? formatPostalCode(components.postalCode) : formData.postalCode,
                });
              }
              if (errors.address) setErrors((prev) => ({ ...prev, address: "" }));
            }}
            error={errors.address}
            inputClassName="rounded-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] text-[#6C6C6C] font-medium">
                Suite, unit (optional)
              </label>
              <input
                type="text"
                value={formData.unit || ""}
                onChange={(e) => handleChange("unit", e.target.value)}
                className="border border-gray-200 rounded-none p-3 mt-1 outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] text-[#6C6C6C] font-medium">
                City <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                onBlur={() => handleBlur("city")}
                className={`border rounded-none p-3 mt-1 outline-none transition-all ${inputBorderClass(errors.city)}`}
              />
              <FieldError error={errors.city} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] text-[#6C6C6C] font-medium">
                Province
              </label>
              <input
                type="text"
                value={formData.province || ""}
                onChange={(e) => handleChange("province", e.target.value)}
                className="border border-gray-200 rounded-none p-3 mt-1 outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] text-[#6C6C6C] font-medium">
                Postal Code <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.postalCode || ""}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                onBlur={() => handleBlur("postalCode")}
                placeholder="A1A 1A1"
                className={`border rounded-none p-3 mt-1 outline-none uppercase transition-all ${inputBorderClass(errors.postalCode)}`}
              />
              <FieldError error={errors.postalCode} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 border-t border-gray-100 pt-8">
        <h3 className="text-sm font-bold text-gray-700 mb-1">
          Driving details
        </h3>
        <p className="text-xs text-[#6C6C6C] mb-4">
          This is to find you warranty options in the next step.
        </p>

        <div className="space-y-10">
          {/* Slider 1: Annual Kilometers */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="w-max md:max-w-[200px] text-sm font-bold text-[#555555]">
                How much do you drive per year?
              </label>
              <div className="flex   items-center border border-gray-300 rounded-none overflow-hidden">
                <input
                  type="text"
                  readOnly
                  value={(
                    Number(formData.kmsPerYear) || 15000
                  ).toLocaleString()}
                  className="w-20 py-2 text-center text-gray-700 font-medium focus:outline-none"
                />
                <span className="bg-white px-3 py-2 text-[#6C6C6C] text-sm border-l border-gray-200">
                  Km
                </span>
              </div>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={formData.kmsPerYear || 15000}
              onChange={(e) => handleChange("kmsPerYear", e.target.value)}
              style={{
                ...sliderStyle,
                ...getBackgroundSize(formData.kmsPerYear || 15000, 5000, 50000),
              }}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Slider 2: Ownership Duration */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="md:w-max max-w-[200px] text-sm font-bold text-[#555555]">
                How many years will you likely own this car?
              </label>
              <div className="flex items-center border border-gray-300 rounded-none overflow-hidden">
                <input
                  type="text"
                  readOnly
                  value={formData.ownershipYears || 3}
                  className="w-20 py-2 text-center text-gray-700 font-medium focus:outline-none"
                />
                <span className="bg-white px-3 py-2 text-[#6C6C6C] text-sm border-l border-gray-200">
                  Years
                </span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={formData.ownershipYears || 3}
              onChange={(e) => handleChange("ownershipYears", e.target.value)}
              style={{
                ...sliderStyle,
                ...getBackgroundSize(formData.ownershipYears || 3, 1, 10),
              }}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Slider 3: Unexpected Repair Budget */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm md:w-max w-[200px] font-bold text-[#555555]">
                How much would you pay for an unexpected repair?
              </label>
              <div className="flex items-center border border-gray-300 rounded-none overflow-hidden">
                <span className="bg-white px-3 py-2 text-[#6C6C6C] text-sm border-r border-gray-200">
                  $
                </span>
                <input
                  type="text"
                  readOnly
                  value={formData.repairBudget || 1200}
                  className="w-20 py-2 text-center text-gray-700 font-medium focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={formData.repairBudget || 1200}
              onChange={(e) => handleChange("repairBudget", e.target.value)}
              style={{
                ...sliderStyle,
                ...getBackgroundSize(formData.repairBudget || 1200, 0, 5000),
              }}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </section>

      {/* Navigation */}
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
          onClick={handleContinue}
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

export default Step2PersonalDetails;
