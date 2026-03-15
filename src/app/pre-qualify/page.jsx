"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Step1 from "@/pages/PreQualify/Step1";
import Step2PreferredVehicle from "@/pages/PreQualify/Step2";
import Step3Budget from "@/pages/PreQualify/Step3";
import PhoneInput from "react-phone-number-input";
import Link from "next/link";
import { validators, validateAll } from "@/lib/validators";
import { FieldError, inputBorderClass } from "@/components/FieldError";
import AddressAutocomplete from "@/components/AddressAutocomplete";

// --- HELPERS ---
const formatCurrency = (value) => {
  if (!value) return "";
  const number = value.toString().replace(/\D/g, "");
  if (!number) return "";
  const formatted = new Intl.NumberFormat("en-US").format(number);
  return `$ ${formatted}`;
};

// --- REUSABLE BASIC COMPONENTS ---
const FloatingLabelInput = ({
  label,
  value,
  onChange,
  type = "text",
  maxLength,
  className = "",
  icon,
  isMoney,
  placeholder = " ",
}) => {
  return (
    <div className={`relative w-full group ${className}`}>
      {icon && !isMoney && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl z-10">
          {icon}
        </span>
      )}
      <input
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`peer w-full border border-[#9BA5AD] p-4 pt-6 pb-2 rounded-none outline-none focus:border-blue-400 transition-all text-gray-700
          ${icon && !isMoney ? "pl-10" : ""} 
          ${isMoney ? "text-primary font-bold" : ""}`}
      />
      <label
        className={`absolute text-gray-400 transition-all duration-200 pointer-events-none uppercase font-bold text-[10px]
          peer-placeholder-shown:text-sm peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-400
          peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-blue-500
          ${value ? "top-1 text-[10px]" : ""}
          ${icon && !isMoney ? "left-10" : "left-4"}`}
      >
        {label}
      </label>
    </div>
  );
};

const SingleInputStep = ({
  title,
  subtitle,
  label,
  field,
  formData,
  setFormData,
  icon,
}) => {
  const isMoneyField = icon === "$";
  const handleChange = (e) => {
    let val = e.target.value;
    if (isMoneyField) val = formatCurrency(val);
    setFormData({ ...formData, [field]: val });
  };

  return (
    <div className="w-full text-center px-0 md:px-2">
      <h2 className="text-lg md:text-2xl font-bold mb-2 text-[#4A4A4A] leading-tight">
        {title}
      </h2>
      <p className="text-gray-400 mb-6 md:mb-8 text-sm">{subtitle}</p>
      <FloatingLabelInput
        label={label}
        value={formData?.[field] || ""}
        onChange={handleChange}
        icon={icon}
        isMoney={isMoneyField}
      />
    </div>
  );
};

const DoubleInputStep = ({
  title,
  subtitle,
  label1,
  label2,
  field1,
  field2,
  formData,
  setFormData,
  icon,
  footerNote,
}) => {
  const isMoneyField = icon === "$";
  const handleChange = (field, value) => {
    let val = value;
    if (isMoneyField && field === field1) val = formatCurrency(val);
    setFormData({ ...formData, [field]: val });
  };

  return (
    <div className="w-full text-center px-0 md:px-2">
      <h2 className="text-xl md:text-3xl font-bold mb-3 text-[#4A4A4A] leading-tight">
        {title}
      </h2>
      <p className="text-gray-400 font-medium mb-6 md:mb-8 text-sm">
        {subtitle}
      </p>
      <div className="max-w-full mx-auto space-y-4">
        <FloatingLabelInput
          label={label1}
          value={formData?.[field1] || ""}
          onChange={(e) => handleChange(field1, e.target.value)}
          icon={icon}
          isMoney={isMoneyField}
        />
        {field2 === "hoursPerWeek" && (
          <p className="text-left text-xs font-bold text-gray-600 mt-4 mb-1 ml-1">
            Round to Nearest Hour
          </p>
        )}
        <FloatingLabelInput
          label={label2}
          value={formData?.[field2] || ""}
          onChange={(e) => handleChange(field2, e.target.value)}
        />
      </div>
      {footerNote && (
        <p className="mt-8 md:mt-12 text-gray-600 text-[12px] md:text-sm leading-relaxed max-w-sm mx-auto font-medium">
          {footerNote}
        </p>
      )}
    </div>
  );
};

const RadioStep = ({
  title,
  options,
  field,
  formData,
  setFormData,
  onAutoNext,
}) => {
  const handleSelect = (opt) => {
    setFormData({ ...formData, [field]: opt });
    if (onAutoNext) {
      setTimeout(() => onAutoNext(), 300);
    }
  };

  return (
    <div className="w-full text-center px-0 md:px-2">
      <h2 className="text-lg md:text-2xl font-bold mb-6 md:mb-8 text-[#4A4A4A] leading-tight">
        {title}
      </h2>
      <div className="space-y-3 max-w-full mx-auto">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center p-4 py-6 md:py-4 border rounded-none cursor-pointer transition-all ${
              formData?.[field] === opt
                ? "bg-blue-100 border-[#1969DB] ring-1 ring-[#1969DB]"
                : "border-[#9BA5AD] hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name={field}
              className="w-4 h-4 text-blue-600 mr-4 flex-shrink-0"
              checked={formData?.[field] === opt}
              onChange={() => handleSelect(opt)}
            />
            <span className="text-[#333333] w-full text-center font-normal text-sm md:text-base">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// --- MAIN FORM COMPONENT ---
const MultiStepCarForm = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [displayStep, setDisplayStep] = useState(1);
  const [animClass, setAnimClass] = useState("step-enter");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [stepErrors, setStepErrors] = useState({});
  const isTransitioning = useRef(false);
  const totalSteps = 16;

  const [formData, setFormData] = useState({
    vehicleType: "Car",
    preferredVehicle: "",
    budget: "",
    hasTradeIn: "",
    creditRating: "",
    employmentStatus: "",
    incomeType: "",
    hourlyWage: "",
    hoursPerWeek: "",
    annualSalary: "",
    companyName: "",
    jobTitle: "",
    homeStatus: "Rent",
    monthlyPayment: "",
    isCitizen: true,
    hasLicense: true,
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    phoneError: "",
    verificationCode: "",
    optIn: false,
  });

  // If redirected from another form with ?submitted=true, show success screen
  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      setIsSubmitted(true);
    }
  }, [searchParams]);

  // Clear validation error when user types
  useEffect(() => {
    if (validationError) setValidationError("");
    // Clear per-field errors on typing
    setStepErrors({});
  }, [formData]);

  // Smooth two-phase step transition: fade out old → swap content → fade in new
  const goToStep = useCallback((newStep) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimClass("step-exit");
    // Phase 1: fade out (200ms matches the CSS stepFadeOut duration)
    setTimeout(() => {
      setDisplayStep(newStep);
      setAnimClass("step-enter");
      // Phase 2: fade in completes (400ms), then unlock
      setTimeout(() => {
        isTransitioning.current = false;
      }, 400);
    }, 200);
  }, []);

  // Validate required fields for each step
  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 8: {
        if (!formData.hourlyWage || formData.hourlyWage === "$ ") return "Please enter your hourly wage";
        if (!formData.hoursPerWeek) return "Please enter your average hours per week";
        return "";
      }
      case 9: {
        if (!formData.annualSalary || formData.annualSalary === "$ ") return "Please enter your annual salary";
        return "";
      }
      case 10: {
        if (!formData.companyName) return "Please enter your company name";
        if (!formData.jobTitle) return "Please enter your job title";
        return "";
      }
      case 11: {
        if (!formData.monthlyPayment || formData.monthlyPayment === "$ ") return "Please enter your monthly payment";
        return "";
      }
      case 13: {
        const { errors, isValid } = validateAll({
          dobDay: () => {
            if (!formData.dobDay) return "Day is required";
            const d = parseInt(formData.dobDay, 10);
            if (isNaN(d) || d < 1 || d > 31) return "Invalid day";
            return "";
          },
          dobMonth: () => {
            if (!formData.dobMonth) return "Month is required";
            const m = parseInt(formData.dobMonth, 10);
            if (isNaN(m) || m < 1 || m > 12) return "Invalid month";
            return "";
          },
          dobYear: () => {
            if (!formData.dobYear) return "Year is required";
            const y = parseInt(formData.dobYear, 10);
            if (isNaN(y) || y < 1900 || y > new Date().getFullYear()) return "Invalid year";
            return "";
          },
          firstName: () => validators.name(formData.firstName, "First name"),
          lastName: () => validators.name(formData.lastName, "Last name"),
          email: () => validators.email(formData.email),
        });
        if (!isValid) {
          setStepErrors(errors);
          return Object.values(errors).find(Boolean) || "Please fix the errors above";
        }
        return "";
      }
      case 14: {
        if (!formData.address) {
          setStepErrors({ address: "Please enter your address" });
          return "Please enter your address";
        }
        return "";
      }
      case 15: {
        const { errors, isValid } = validateAll({
          phoneNumber: () => {
            if (!formData.phoneNumber) return "Phone number is required";
            const digitsOnly = (formData.phoneNumber || "").replace(/\D/g, "");
            if (digitsOnly.length < 10 || digitsOnly.length > 15) return "Please enter a valid phone number";
            return "";
          },
        });
        if (!isValid) {
          setStepErrors(errors);
          return Object.values(errors).find(Boolean) || "Please fix the errors above";
        }
        return "";
      }
      case 16: {
        const { errors, isValid } = validateAll({
          verificationCode: () => validators.verificationCode(formData.verificationCode),
        });
        if (!isValid) {
          setStepErrors(errors);
          return Object.values(errors).find(Boolean) || "Please fix the errors above";
        }
        return "";
      }
      default:
        return "";
    }
  };

  const nextStep = () => {
    const error = validateStep(step);
    if (error) {
      setValidationError(error);
      return;
    }
    if (step === totalSteps) {
      console.log("Final Data Submission:", formData);
      setIsSubmitted(true);
    } else {
      const newStep = Math.min(step + 1, totalSteps);
      setStep(newStep);
      goToStep(newStep);
    }
  };

  const prevStep = () => {
    const newStep = Math.max(step - 1, 1);
    setStep(newStep);
    goToStep(newStep);
  };

  const ProgressBar = () => (
    <div className="w-full mx-auto md:max-w-[500px] left-0 px-0">
      <p className="text-[10px] md:text-xs text-gray-400 mb-2 italic text-center">
        3 minutes from finish
      </p>
      <div className="w-full bg-gray-200 h-2 rounded-none overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-500"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const SummaryCard = () => {
    const getVehicleImage = () => {
      switch (formData.vehicleType) {
        case "SUV":
          return "/pre-2.png";
        case "Truck":
          return "/pre-3.png";
        case "Mini Van":
          return "/pre-4.png";
        default:
          return "/pre-1.png";
      }
    };
    return (
      <div className="w-[300px] md:w-[calc(100%-2rem)] max-w-[490px] relative border border-[#DEDEDE] p-0 md:px-0 md:py-0 md:p-4 mb-8 flex items-center justify-between rounded-none bg-white flex-col mx-0">
        <div className="flex h-full w-full mb-1 items-center gap-3 pt-3 md:gap-4 overflow-hidden px-3 md:px-4">
          <img
            src={getVehicleImage()}
            alt="Selected Car"
            className="w-[90px] md:w-[250px] h-auto object-cover"
          />
          <div className="w-full flex justify-center mx-2 items-start flex-col">
            <h4 className="font-medium text-[#3F3F3F] text-md mb-1 md:text-base truncate">
              {formData.preferredVehicle
                ? `${formData.vehicleType}, ${formData.preferredVehicle}`
                : formData.vehicleType}
            </h4>
            <p className="text-[#8E8E93] text-xs mb-1 truncate">
              {formData.budget ? `$Under ${formData.budget}` : "Budget not set"}
            </p>
          </div>
          <button
            onClick={() => { setStep(1); goToStep(1); }}
            className="text-[#0088FF] absolute top-0 right-0 text-[12px] md:text-xs font-medium m-2 uppercase hover:underline"
          >
            Edit
          </button>
        </div>
        <ProgressBar />
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-70px)] items-center justify-center p-4 sm:p-6 md:px-2 animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl text-center font-bold text-primary mb-4">
            Application Submitted!
          </h2>

          <p className="text-gray-600 text-center text-sm sm:text-base mb-0">
            Thank you, our team will review your details shortly{" "}
            <span className="block font-medium text-gray-800 mt-1 break-words">
              {formData.email}
            </span>
          </p>
          <img
            src="/autobon approved.png"
            className="object-contain object-center w-full my-4"
            alt="Autobon Approved"
          />
          <div className="pt-4 border-t border-gray-100 mb-6">
            <p className="text-xs text-center  sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Need Immediate Help?
            </p>
            <a
              href="tel:9058003100"
              className="group flex flex-col items-center justify-center gap-1 hover:opacity-90 transition-opacity"
            >
              <span className="text-gray-500 text-xs font-medium">
                24/7 Call Us
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-[#1969DB] group-hover:underline">
                905 800 3100
              </span>
            </a>
          </div>

          <Link
            href={"/shop"}
            className="block w-full text-center px-6 sm:px-8 py-3 bg-primary text-white rounded-full font-medium text-base hover:bg-primary/90 transition-all shadow-md"
          >
            Browse Cars{" "}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-70px)] bg-white p-4 pt-6 pb-6 md:pt-10 md:pb-10 font-sans text-gray-700">
      {step >= 4 && <SummaryCard />}
      {step < 4 && (
        <div className="w-[300px] md:w-[490px] mb-8">
          <ProgressBar />
        </div>
      )}
      <main className="w-full max-w-2xl flex flex-col items-center flex-grow overflow-hidden">
        <div
          className={`w-full max-w-[300px] md:max-w-[500px] ${animClass}`}
        >
          {renderStepContent(displayStep, formData, setFormData, nextStep, stepErrors)}
        </div>
        {validationError && (
          <p className="text-red-500 text-sm font-medium mt-4 text-center animate-pulse">
            {validationError}
          </p>
        )}
        <div className="flex gap-3 max-w-[300px] md:max-w-[500px] md:gap-4 w-full mt-12 px-0 md:px-2">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 text-gray-500 font-bold py-3 md:py-4 border border-[#A5A5A5] text-sm md:text-base"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            style={{
              background: `linear-gradient(180deg, #3D8BFF 0%, #1B63CE 100%)`,
            }}
            className={`${step === 1 ? "w-[380px] mx-auto" : "flex-[2]"} text-white font-medium py-3 md:py-4 rounded-none text-lg md:text-base transition-all hover:brightness-110 active:scale-[0.98]`}
          >
            {step >= 15 ? "Submit" : "Continue"}
          </button>
        </div>
      </main>
    </div>
  );
};

function renderStepContent(step, formData, setFormData, nextStep, stepErrors = {}) {
  switch (step) {
    case 1:
      return (
        <Step1
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
        />
      );
    case 2:
      return (
        <Step2PreferredVehicle formData={formData} setFormData={setFormData} />
      );
    case 3:
      return (
        <Step3Budget
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
        />
      );
    case 4:
      return (
        <RadioStep
          title="Do you have a trade-in?"
          options={["Yes", "No", "Unsure"]}
          field="hasTradeIn"
          formData={formData}
          setFormData={setFormData}
          onAutoNext={nextStep}
        />
      );
    case 5:
      return (
        <RadioStep
          title="What is your estimated credit rating?"
          options={[
            "Poor (300-599)",
            "Fair (600-659)",
            "Good (660-724)",
            "Very Good (725-759)",
            "Excellent (760-900)",
            "No Credit / Unsure",
          ]}
          field="creditRating"
          formData={formData}
          setFormData={setFormData}
          onAutoNext={nextStep}
        />
      );
    case 6:
      return (
        <RadioStep
          title="What is your employment status?"
          options={[
            "Employed",
            "Self-Employed",
            "Student",
            "Retired/Pension",
            "Other",
          ]}
          field="employmentStatus"
          formData={formData}
          setFormData={setFormData}
          onAutoNext={nextStep}
        />
      );
    case 7:
      return (
        <RadioStep
          title="Income Details. Please Select One:"
          options={[
            "I know My Annual Salary",
            "I know My Hourly Wage",
            "I know My Monthly Income",
            "Other",
          ]}
          field="incomeType"
          formData={formData}
          setFormData={setFormData}
          onAutoNext={nextStep}
        />
      );
    case 8:
      return (
        <DoubleInputStep
          title="Income Details."
          subtitle="How much do you get paid per hour?"
          label1="Hourly Wage"
          label2="Average Hours Per week"
          field1="hourlyWage"
          field2="hoursPerWeek"
          formData={formData}
          setFormData={setFormData}
          icon="$"
        />
      );
    case 9:
      return (
        <SingleInputStep
          title="What is your annual income before taxes?"
          subtitle="Round to Nearest Dollar"
          label="Annual Salary"
          field="annualSalary"
          formData={formData}
          setFormData={setFormData}
          icon="$"
        />
      );
    case 10:
      return (
        <DoubleInputStep
          title="Where do you work?"
          subtitle="We need these details to confirm employment..."
          label1="Company Name"
          label2="Job Title"
          field1="companyName"
          field2="jobTitle"
          formData={formData}
          setFormData={setFormData}
        />
      );
    case 11:
      return (
        <div className="w-full text-center px-0 md:px-2">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
            Do you rent or own your home?
          </h2>
          <div className="flex gap-3 max-w-full mx-auto mb-6">
            {["Rent", "Own"].map((opt) => (
              <label
                key={opt}
                className={`flex-1 flex items-center justify-center p-4 border cursor-pointer transition-all ${
                  formData?.homeStatus === opt
                    ? "bg-blue-50 border-blue-400 ring-1 ring-blue-400"
                    : "border-[#9BA5AD]"
                }`}
              >
                <input
                  type="radio"
                  className="mr-2"
                  checked={formData?.homeStatus === opt}
                  onChange={() => setFormData({ ...formData, homeStatus: opt })}
                />
                <span className="font-bold text-gray-600 text-sm md:text-base">
                  {opt}
                </span>
              </label>
            ))}
          </div>
          <FloatingLabelInput
            label="Monthly Payment"
            isMoney={true}
            value={formData?.monthlyPayment || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                monthlyPayment: formatCurrency(e.target.value),
              })
            }
          />
        </div>
      );
    case 12:
      return (
        <div className="w-full text-center space-y-8 px-0 md:px-2">
          {[
            {
              q: "Are you a Canadian citizen or permanent resident?",
              f: "isCitizen",
            },
            {
              q: "Do you have a valid Canadian driver's license?",
              f: "hasLicense",
            },
          ].map((item) => (
            <div key={item.f}>
              <h3 className="text-base md:text-lg font-bold text-gray-500 mb-4">
                {item.q}
              </h3>
              <div className="flex gap-3">
                {["YES", "NO"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 p-3 border cursor-pointer flex items-center justify-center ${
                      formData?.[item.f] === (opt === "YES")
                        ? "bg-blue-50 border-blue-400"
                        : "border-[#9BA5AD]"
                    }`}
                  >
                    <input
                      type="radio"
                      className="mr-2"
                      checked={formData?.[item.f] === (opt === "YES")}
                      onChange={() =>
                        setFormData({ ...formData, [item.f]: opt === "YES" })
                      }
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case 13:
      return (
        <div className="w-full text-center max-w-full mx-auto md:px-2">
          <h2 className="text-xl md:text-2xl text-[#4A4A4A] font-bold mb-4">
            Personal Details
          </h2>
          <p className="text-[#8E8E93] text-sm font-semibold mb-2">
            What is your date of birth?
          </p>
          <div className="grid grid-cols-3 gap-2 mb-1">
            <div>
              <FloatingLabelInput
                label="DD"
                maxLength={2}
                value={formData?.dobDay || ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, dobDay: v });
                }}
              />
              <FieldError error={stepErrors.dobDay} />
            </div>
            <div>
              <FloatingLabelInput
                label="MM"
                maxLength={2}
                value={formData?.dobMonth || ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, dobMonth: v });
                }}
              />
              <FieldError error={stepErrors.dobMonth} />
            </div>
            <div>
              <FloatingLabelInput
                label="YYYY"
                maxLength={4}
                value={formData?.dobYear || ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, dobYear: v });
                }}
              />
              <FieldError error={stepErrors.dobYear} />
            </div>
          </div>
          <div className="mb-6" />
          <p className="font-semibold text-[#8E8E93] mb-4 text-sm">
            Create your account:
          </p>
          <div className="space-y-1 mb-6">
            <div>
              <FloatingLabelInput
                label="First Name"
                value={formData?.firstName || ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^a-zA-Z\s'-]/g, "");
                  setFormData({ ...formData, firstName: v });
                }}
              />
              <FieldError error={stepErrors.firstName} />
            </div>
            <div>
              <FloatingLabelInput
                label="Last Name"
                value={formData?.lastName || ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^a-zA-Z\s'-]/g, "");
                  setFormData({ ...formData, lastName: v });
                }}
              />
              <FieldError error={stepErrors.lastName} />
            </div>
            <div>
              <FloatingLabelInput
                label="Email Address"
                type="email"
                value={formData?.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FieldError error={stepErrors.email} />
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="relative flex items-center h-5 mt-1">
              <input
                id="newsletter"
                type="checkbox"
                className="peer w-5 h-5 border-2 appearance-none checked:bg-blue-600 checked:border-blue-600"
                checked={formData?.optIn || false}
                onChange={(e) =>
                  setFormData({ ...formData, optIn: e.target.checked })
                }
              />
              <svg
                className="absolute w-4 h-4 text-white hidden peer-checked:block left-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="text-left">
              <label
                htmlFor="newsletter"
                className="text-xs font-medium text-[#5A5A67]"
              >
                Never miss a deal from Autobon
              </label>
              <p className="text-[10px] text-gray-400">
                See our{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms-of-use" className="underline">
                  Terms
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      );
    case 14:
      return (
        <div className="w-full text-center px-0 md:px-2">
          <h2 className="text-lg md:text-2xl font-bold mb-2 text-[#4A4A4A] leading-tight">
            Where are you looking for a vehicle?
          </h2>
          <p className="text-gray-400 mb-6 md:mb-8 text-sm">Type in your address</p>
          <AddressAutocomplete
            label="Home Address"
            value={formData?.address || ""}
            onChange={(fullAddress) => {
              setFormData({ ...formData, address: fullAddress });
            }}
            error={stepErrors.address}
            required
            inputClassName="w-full border border-[#9BA5AD] p-4 pt-6 pb-2 rounded-none outline-none focus:border-blue-400 transition-all text-gray-700 text-sm"
          />
          <FieldError error={stepErrors.address} />
        </div>
      );
    case 15:
      return (
        <div className="w-full text-center mx-auto px-0">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-[#4A4A4A] uppercase">
            Verification
          </h2>
          <h3 className="text-md md:text-lg font-semibold text-[#8E8E93] my-6">
            Please verify your phone number.
          </h3>
          <p className="text-[#5A5A67] text-[14px] mb-8">
            This helps us confirm your identity and secure your account. When
            you tap "Submit" we will text you a verification code. Message and
            data rates may apply.
          </p>
          <div className="full mx-auto space-y-5 mb-8">
            {/* Phone input */}
            <div className="w-full">
              <label className="block text-left text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wide">
                Phone Number
              </label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="CA"
                value={formData.phoneNumber}
                onChange={(value) => {
                  setFormData({ ...formData, phoneNumber: value || "", phoneError: "" });
                }}
                onBlur={() => {
                  const phoneValue = formData.phoneNumber || "";
                  let error = "";
                  if (!phoneValue) {
                    error = "Phone number is required";
                  } else {
                    const digitsOnly = phoneValue.replace(/\D/g, "");
                    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
                      error = "Please enter a valid phone number";
                    }
                  }
                  setFormData({ ...formData, phoneError: error });
                }}
              />
              <FieldError error={formData.phoneError || stepErrors.phoneNumber} />
            </div>

            <style jsx global>{`
              .PhoneInput {
                display: flex !important;
                align-items: center !important;
                width: 100% !important;
                height: 52px !important;
                gap: 0 !important;
                border: 1px solid #c5ccd3 !important;
                background: white !important;
                transition: border-color 0.2s !important;
              }
              .PhoneInput:focus-within {
                border-color: #3b82f6 !important;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08) !important;
              }

              /* Flag + country code section */
              .PhoneInputCountry {
                display: flex !important;
                align-items: center !important;
                padding: 0 14px !important;
                background: #f9fafb !important;
                border: none !important;
                border-right: 1px solid #e5e7eb !important;
                min-width: auto !important;
                height: 100% !important;
                margin: 0 !important;
                position: relative !important;
                flex-shrink: 0 !important;
                gap: 6px !important;
              }
              .PhoneInputCountrySelect {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                opacity: 0 !important;
                cursor: pointer !important;
                z-index: 2 !important;
              }
              .PhoneInputCountryIcon {
                width: 24px !important;
                height: 17px !important;
                margin-right: 0 !important;
                flex-shrink: 0 !important;
              }
              .PhoneInputCountryIcon img {
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                border-radius: 2px !important;
              }
              .PhoneInputCountryIcon--border {
                box-shadow: none !important;
                background-color: transparent !important;
              }
              .PhoneInputCountrySelectArrow {
                display: inline-block !important;
                width: 6px !important;
                height: 6px !important;
                border-style: solid !important;
                border-color: #6b7280 !important;
                border-width: 0 1.5px 1.5px 0 !important;
                transform: rotate(45deg) !important;
                margin-left: 2px !important;
                margin-bottom: 2px !important;
                opacity: 0.7 !important;
              }

              /* Country calling code (the +1 part) */
              .PhoneInputCountryCallingCode {
                font-size: 15px !important;
                font-weight: 500 !important;
                color: #374151 !important;
                margin-right: 0 !important;
              }

              /* Remove old separator */
              .PhoneInputCountry::before {
                display: none !important;
              }

              /* Number input */
              .PhoneInputInput {
                flex: 1 !important;
                border: none !important;
                padding: 0 14px !important;
                outline: none !important;
                font-size: 16px !important;
                font-weight: 500 !important;
                height: 100% !important;
                background: transparent !important;
                transition: none !important;
                border-radius: 0 !important;
                margin: 0 !important;
                color: #1f2937 !important;
                letter-spacing: 0.01em !important;
              }
              .PhoneInputInput::placeholder {
                color: #9ca3af !important;
                font-weight: 400 !important;
              }
              .PhoneInputInput:focus {
                border: none !important;
                outline: none !important;
              }

              @media (max-width: 480px) {
                .PhoneInputCountry {
                  padding: 0 10px !important;
                  gap: 4px !important;
                }
                .PhoneInputCountryCallingCode {
                  font-size: 14px !important;
                }
                .PhoneInputCountryIcon {
                  width: 22px !important;
                  height: 15px !important;
                }
                .PhoneInputInput {
                  padding: 0 10px !important;
                  font-size: 15px !important;
                }
              }
            `}</style>

          </div>
        </div>
      );
    case 16:
      return (
        <div className="w-full text-center mx-auto px-0">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-[#4A4A4A] uppercase">
            Verification Code
          </h2>
          <h3 className="text-md md:text-lg font-semibold text-[#8E8E93] my-6">
            Please enter the verification code sent to you
          </h3>
          <div className="full mx-auto space-y-5 mb-8">
            <div>
              <FloatingLabelInput
                label="Verification Code"
                value={formData?.verificationCode || ""}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, verificationCode: v });
                }}
                maxLength={6}
              />
              <FieldError error={stepErrors.verificationCode} />
            </div>
            <p className="text-[#5A5A67] text-[11px] mb-0">
              By clicking “Submit” I agree to Autobon's Membership Rules,{" "}
              <a href="/website-terms" className="underline">
                General
              </a>{" "}
              <a href="/terms-of-use" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              . I give my consent to Autobon, car dealers and lenders obtaining
              credit reports about me to facilitate my application for a car
              loan.
            </p>
          </div>
        </div>
      );
    default:
      return (
        <div className="text-center py-20 text-gray-300">Form complete.</div>
      );
  }
}

export default function PreQualifyPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <MultiStepCarForm />
    </Suspense>
  );
}
