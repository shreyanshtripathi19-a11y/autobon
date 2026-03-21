"use client";
import React, { useState } from "react";
import { validators, formatPhone, validateAll } from "@/lib/validators";
import { FieldError, inputBorderClass } from "@/components/FieldError";

const Step4_Contact = ({ onNext, onBack, formData, updateContactInfo }) => {
  const [localData, setLocalData] = useState({
    firstName: formData?.contact?.firstName || "",
    lastName: formData?.contact?.lastName || "",
    email: formData?.contact?.email || "",
    phone: formData?.contact?.phone || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    // Name — only letters
    if ((field === "firstName" || field === "lastName") && value && !/^[a-zA-ZÀ-ÿ\s'\-\.]*$/.test(value)) return;
    // Phone — digits only, formatted
    if (field === "phone") value = formatPhone(value);

    setLocalData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field) => {
    const err = (() => {
      switch (field) {
        case "firstName": return validators.name(localData.firstName, "First name");
        case "lastName": return validators.name(localData.lastName, "Last name");
        case "email": return validators.email(localData.email);
        case "phone": return validators.phone(localData.phone);
        default: return "";
      }
    })();
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    const { errors: newErrors, isValid } = validateAll({
      firstName: () => validators.name(localData.firstName, "First name"),
      lastName: () => validators.name(localData.lastName, "Last name"),
      email: () => validators.email(localData.email),
      phone: () => validators.phone(localData.phone),
    });
    setErrors(newErrors);
    if (!isValid) return;

    // Push to parent
    if (updateContactInfo) updateContactInfo(localData);

    setSubmitting(true);
    try {
      await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "sell-car",
          firstName: localData.firstName,
          lastName: localData.lastName,
          email: localData.email,
          phone: localData.phone,
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
      <h2 className="text-2xl font-bold mb-2">Almost Done!</h2>
      <p className="text-gray-500 mb-8">
        Enter your contact information to receive your offer
      </p>

      <div className="space-y-4 text-left mb-10 lg:px-20">
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="John"
            value={localData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
            className={`w-full p-4 border bg-[#F9FAFB] outline-none transition-all ${inputBorderClass(errors.firstName)}`}
          />
          <FieldError error={errors.firstName} />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">
            Last Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Doe"
            value={localData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
            className={`w-full p-4 border bg-[#F9FAFB] outline-none transition-all ${inputBorderClass(errors.lastName)}`}
          />
          <FieldError error={errors.lastName} />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={localData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`w-full p-4 border bg-[#F9FAFB] outline-none transition-all ${inputBorderClass(errors.email)}`}
          />
          <FieldError error={errors.email} />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 mb-1 block">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="905-800-3100"
            value={localData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={`w-full p-4 border bg-[#F9FAFB] outline-none transition-all ${inputBorderClass(errors.phone)}`}
          />
          <FieldError error={errors.phone} />
        </div>
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
          disabled={submitting}
          className="flex-1 bg-primary text-white py-4 rounded-none font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
      <p className="text-[10px] text-gray-400 mt-4">
        By submitting, you agree to receive communications from Autobon. An
        account will be created for you.
      </p>
    </div>
  );
};

export default Step4_Contact;
