"use client";

import React, { useState, useEffect, Suspense } from "react";
import Head from "next/head";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { validators, formatPhone, formatCurrency, formatPostalCode, validateAll } from "@/lib/validators";
import { FieldError, inputBorderClass } from "@/components/FieldError";
import AddressAutocomplete from "@/components/AddressAutocomplete";

export default function PreQualifyPage() {
  return (
    <Suspense fallback={null}>
      <PreQualifyForm />
    </Suspense>
  );
}

function PreQualifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read selected car info from query params (if user came from shop "Get Approved")
  const selectedCar = searchParams.get("carId")
    ? {
        id: searchParams.get("carId"),
        title: searchParams.get("carTitle") || "",
        price: searchParams.get("carPrice") || "",
      }
    : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    email: "",
    phone: "",
    annualIncome: "",
    monthlyRent: "",
    streetAddress: "",
    suite: "",
    postalCode: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // --- Logic for Dropdowns ---
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 - 17 },
    (_, i) => currentYear - 18 - i,
  );

  // --- Form Handlers ---
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;

    let newValue = type === "checkbox" ? checked : value;

    // Dollar formatting logic
    if (name === "annualIncome" || name === "monthlyRent") {
      newValue = formatCurrency(value);
    }

    // Phone formatting logic — only allow digits
    if (name === "phone") {
      newValue = formatPhone(value);
    }

    // Postal code formatting
    if (name === "postalCode") {
      newValue = formatPostalCode(value);
    }

    // Name fields — only allow letters, spaces, hyphens, apostrophes
    if (name === "firstName" || name === "lastName") {
      if (value && !/^[a-zA-ZÀ-ÿ\s'\-\.]*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const validateField = (name) => {
    switch (name) {
      case "firstName": return validators.name(formData.firstName, "First name");
      case "lastName": return validators.name(formData.lastName, "Last name");
      case "email": return validators.email(formData.email);
      case "phone": return validators.phone(formData.phone);
      case "annualIncome": return validators.currency(formData.annualIncome, "Annual income");
      case "monthlyRent": return validators.currency(formData.monthlyRent, "Monthly rent/mortgage");
      case "streetAddress": return validators.address(formData.streetAddress);
      case "postalCode": return validators.postalCode(formData.postalCode);
      case "dobMonth": case "dobDay": case "dobYear":
        if (formData.dobDay && formData.dobMonth && formData.dobYear) {
          return validators.dob(formData.dobDay, formData.dobMonth, formData.dobYear);
        }
        return "";
      case "consent": return validators.consent(formData.consent);
      default: return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields touched
    const allTouched = {};
    Object.keys(formData).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    const { errors: newErrors, isValid } = validateAll({
      firstName: () => validators.name(formData.firstName, "First name"),
      lastName: () => validators.name(formData.lastName, "Last name"),
      dobMonth: () => validators.dob(formData.dobDay, formData.dobMonth, formData.dobYear),
      email: () => validators.email(formData.email),
      phone: () => validators.phone(formData.phone),
      annualIncome: () => validators.currency(formData.annualIncome, "Annual income"),
      monthlyRent: () => validators.currency(formData.monthlyRent, "Monthly rent/mortgage"),
      streetAddress: () => validators.address(formData.streetAddress),
      postalCode: () => validators.postalCode(formData.postalCode),
      consent: () => validators.consent(formData.consent),
    });

    setErrors(newErrors);
    if (!isValid) return;

    // Build submission payload including selected car info
    const submissionData = {
      ...formData,
      ...(selectedCar && {
        selectedCarId: selectedCar.id,
        selectedCarTitle: selectedCar.title,
        selectedCarPrice: selectedCar.price,
      }),
    };

    setIsProcessing(true);
    try {
      await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "finance",
          data: submissionData,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
        }),
      });
    } catch (err) {
      console.error("Finance form error:", err);
    }
    setIsProcessing(false);
    router.push("/pre-qualify?submitted=true");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen font-['Poppins',_sans-serif] text-gray-700 antialiased flex flex-col">
      <Head>
        <title>Autobon | Pre-qualify</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      {/* --- Success Modal --- */}
      <div
        className={`fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300 ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white w-full max-w-[420px] rounded-[20px] p-[40px_30px] text-center shadow-2xl transform transition-transform duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] translate-y-0">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 animate-[popIn_0.5s_0.2s_backwards]">
            <span className="text-[32px]">✓</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Thankyou</h3>
          <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
            We are working on your pre approval!
          </p>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-[12px] text-gray-500 mb-1 font-medium">
              Want an immediate response?
            </p>
            <a
              href="tel:9058003100"
              className="text-[20px] font-bold text-green-600 hover:text-green-700 transition-colors"
            >
              Call Us 905 800 3100
            </a>
          </div>
          <button
            onClick={closeModal}
            className="mt-8 text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Close
          </button>
        </div>
      </div>

      {/* --- Main Content --- */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-8 py-6 lg:py-10 flex flex-col lg:flex-row lg:justify-between lg:items-start lg:gap-[60px]">
        {/* Left Section */}
        <div className="w-full lg:w-[40%] max-w-[480px] mb-8 lg:mb-0 text-center lg:text-left">
          <h1 className="text-[32px] lg:text-[42px] font-bold leading-[1.15] text-gray-700">
            Pre-qualify for a car loan in <br className="hidden lg:block" />
            <span className="text-blue-600">minutes</span>
          </h1>
          <p className="text-[15px] lg:text-[16px] text-gray-500 mt-4 lg:mt-5 font-normal">
            No impact on your credit score
          </p>
          <div className="mt-8 lg:mt-12 rounded-lg overflow-hidden w-full max-w-[500px] mx-auto lg:mx-0">
            <img
              src="/trailer.jpg"
              alt="Car Trailer"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x350/F3F4F6/9CA3AF?text=trailer.jpg";
              }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="w-full lg:w-[60%] max-w-[740px]">
          {/* Selected Car Banner */}
          {selectedCar && (
            <div className="mb-4 border border-blue-200 rounded-2xl p-4 bg-blue-50/50 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm6 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
                  <path d="M5 17H3v-4.27a1 1 0 0 1 .684-.948L7 10.5l3-4.5h5l2.5 4h2a2 2 0 0 1 2 2V17h-2" />
                  <path d="M11 17H13" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">Selected Vehicle</p>
                <p className="text-[14px] font-bold text-gray-800 truncate">{selectedCar.title}</p>
              </div>
              {selectedCar.price && (
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-[14px] font-bold text-gray-900" style={{ filter: "blur(4px)", userSelect: "none", opacity: 0.85 }}>
                    ${Number(selectedCar.price).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-500" style={{ filter: "blur(3px)", userSelect: "none", opacity: 0.8 }}>
                    ${Math.round(Number(selectedCar.price) / 120)}/biweekly
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="border border-blue-200 rounded-2xl p-8 lg:p-8 bg-white shadow-[0_10px_30px_rgba(37,99,235,0.03)]">
          <p className="text-[12px] font-semibold text-gray-400 mb-6 leading-tight tracking-wide">
            <span className="text-gray-700 uppercase font-bold">
              IMPORTANT:
            </span>{" "}
            Name & Address must match your Government-Issued ID to get an
            accurate result.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              <div>
                <label className="text-[13px] text-gray-400 font-medium mb-1 block">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("firstName")}
                  className={`w-full border rounded-md p-3.5 text-sm outline-none transition-all bg-white text-gray-900 ${inputBorderClass(errors.firstName)}`}
                />
                <FieldError error={errors.firstName} />
              </div>
              <div>
                <label className="text-[13px] text-gray-400 font-medium mb-1 block">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("lastName")}
                  className={`w-full border rounded-md p-3.5 text-sm outline-none transition-all bg-white text-gray-900 ${inputBorderClass(errors.lastName)}`}
                />
                <FieldError error={errors.lastName} />
              </div>
            </div>

            <div>
              <label className="text-[13px] text-gray-400 font-medium mb-1 block">
                Date of Birth <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3 lg:gap-4">
                <select
                  name="dobMonth"
                  value={formData.dobMonth}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("dobMonth")}
                  className={`w-full border rounded-md p-2.5 sm:p-3.5 text-xs sm:text-sm outline-none appearance-none bg-no-repeat bg-[right_8px_center] sm:bg-[right_12px_center] bg-[length:12px] sm:bg-[length:14px] select-chevron bg-white ${inputBorderClass(errors.dobMonth)}`}
                >
                  <option value="" disabled>Month</option>
                  {months.map((m, i) => (
                    <option key={m} value={i + 1}>{m}</option>
                  ))}
                </select>
                <select
                  name="dobDay"
                  value={formData.dobDay}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("dobDay")}
                  className={`w-full border rounded-md p-2.5 sm:p-3.5 text-xs sm:text-sm outline-none appearance-none bg-no-repeat bg-[right_8px_center] sm:bg-[right_12px_center] bg-[length:12px] sm:bg-[length:14px] select-chevron bg-white ${inputBorderClass(errors.dobDay)}`}
                >
                  <option value="" disabled>Day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select
                  name="dobYear"
                  value={formData.dobYear}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("dobYear")}
                  className={`w-full border rounded-md p-2.5 sm:p-3.5 text-xs sm:text-sm outline-none appearance-none bg-no-repeat bg-[right_8px_center] sm:bg-[right_12px_center] bg-[length:12px] sm:bg-[length:14px] select-chevron bg-white ${inputBorderClass(errors.dobYear)}`}
                >
                  <option value="" disabled>Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <FieldError error={errors.dobMonth || errors.dobDay || errors.dobYear} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              <div>
                <label className="text-[13px] text-gray-400 font-medium mb-1 block">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  placeholder="name@example.com"
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("email")}
                  className={`w-full border rounded-md p-3.5 text-sm outline-none transition-all ${inputBorderClass(errors.email)}`}
                />
                <FieldError error={errors.email} />
              </div>
              <div>
                <label className="text-[13px] text-gray-400 font-medium mb-1 block">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  placeholder="905-800-3100"
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full border rounded-md p-3.5 text-sm outline-none transition-all ${inputBorderClass(errors.phone)}`}
                />
                <FieldError error={errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              <div>
                <label className="text-[13px] text-gray-400 font-medium mb-1.5 block leading-3">
                  Total Gross Annual Income <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    name="annualIncome"
                    value={formData.annualIncome}
                    placeholder="0"
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("annualIncome")}
                    className={`w-full border rounded-md p-3.5 pl-7 text-sm outline-none transition-all ${inputBorderClass(errors.annualIncome)}`}
                  />
                </div>
                <FieldError error={errors.annualIncome} />
              </div>
              <div>
                <label className="text-[13px] text-gray-400 font-medium mb-1.5 block leading-3">
                  Monthly Rent or Mortgage <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    name="monthlyRent"
                    value={formData.monthlyRent}
                    placeholder="0"
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("monthlyRent")}
                    className={`w-full border rounded-md p-3.5 pl-7 text-sm outline-none transition-all ${inputBorderClass(errors.monthlyRent)}`}
                  />
                </div>
                <FieldError error={errors.monthlyRent} />
              </div>
            </div>

            <AddressAutocomplete
              label="Street Address"
              required
              value={formData.streetAddress}
              onChange={(val, components) => {
                setFormData((prev) => ({
                  ...prev,
                  streetAddress: components?.street || val,
                  postalCode: components?.postalCode ? formatPostalCode(components.postalCode) : prev.postalCode,
                }));
                if (errors.streetAddress) setErrors((prev) => ({ ...prev, streetAddress: "" }));
              }}
              error={errors.streetAddress}
              placeholder="Start typing your address…"
            />

            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              <div>
                <label className="text-[13px] text-gray-400 font-medium mb-1.5 block min-h-[32px] flex items-end leading-3">
                  Suite, unit (optional)
                </label>
                <input
                  name="suite"
                  type="text"
                  value={formData.suite}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
              <div>
                <label className="text-[13px] text-gray-400 font-medium mb-1.5 block min-h-[32px] flex items-end leading-3">
                  Postal Code <span className="text-red-400">*</span>
                </label>
                <input
                  name="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("postalCode")}
                  placeholder="A1A 1A1"
                  className={`w-full border rounded-md p-3.5 text-sm outline-none uppercase transition-all ${inputBorderClass(errors.postalCode)}`}
                />
                <FieldError error={errors.postalCode} />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                name="consent"
                type="checkbox"
                checked={formData.consent}
                onChange={handleInputChange}
                className="mt-[2px] min-w-[16px] w-4 h-4 border-gray-300 rounded cursor-pointer"
              />
              <div>
                <p className="text-[13px] text-gray-500 leading-normal">
                  I confirm the data above is accurate and consent to Autobon&apos;s
                  Terms of Service.
                </p>
                <FieldError error={errors.consent} />
              </div>
            </div>

            <button
              disabled={isProcessing}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 mt-2 rounded-lg text-[15px] shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {isProcessing ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
        </div>
      </main>

      {/* --- Footer --- */}

      {/* Helper style for Select Chevrons and animations */}
      <style jsx>{`
        .select-chevron {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
        }
        @keyframes popIn {
          0% {
            transform: scale(0);
          }
          80% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
