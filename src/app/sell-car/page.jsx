"use client";
import React, { useState, useEffect } from "react";
import Step2_Confirm from "../../pages/SellCar/Step2";
import Step3_Mileage from "../../pages/SellCar/Step3";
import Step4_Contact from "../../pages/SellCar/Step4";
import Step5_Offer from "../../pages/SellCar/Step5";
import Step1_Details from "@/pages/SellCar/Step1";
import ApplicationSubmitted from "@/components/ApplicationSubmitted";

const SuccessScreen = ({ formData }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-in fade-in duration-700">
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-md">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
        Application Submitted!
      </h2>
      <p className="text-gray-600 text-sm md:text-base mb-8">
        Thank you,{" "}
        <span className="font-bold text-gray-800">
          {formData.contact?.firstName || "Customer"}
        </span>
        . Our team will review your details and contact you shortly at
        <span className="block font-medium text-gray-800">
          {formData.contact?.email || "your email"}
        </span>
      </p>

      <div className="pt-6 border-t border-gray-100">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Need Immediate Help?
        </p>
        <a
          href="tel:9058003100"
          className="group flex flex-col items-center justify-center gap-1"
        >
          <span className="text-gray-500 text-xs font-medium">
            24/7 Call Us
          </span>
          <span className="text-2xl md:text-3xl font-bold text-[#1969DB] group-hover:underline transition-all">
            905 800 3100
          </span>
        </a>
      </div>
    </div>
  </div>
);

const SellCarPage = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [formData, setFormData] = useState({
    vin: "",
    year: "",
    make: "",
    model: "",
    city: "",
    mileage: "",
    condition: "Excellent",
    contact: { firstName: "", lastName: "", email: "", phone: "" },
  });

  // Auto-scroll to top whenever screen changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentScreen]);

  // Update form data when steps progress
  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Update contact info specifically
  const updateContactInfo = (contactData) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactData },
    }));
  };

  // Screen 1 and 2 are both Step 1 (VIN vs Manual Details)
  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <Step1_Details
            onNext={() => setCurrentScreen(3)}
            onSwitch={() => setCurrentScreen(2)}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <Step1_Details
            onNext={() => setCurrentScreen(3)}
            onBack={() => setCurrentScreen(1)}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <Step2_Confirm
            onNext={() => setCurrentScreen(4)}
            onBack={() => setCurrentScreen(2)}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <Step3_Mileage
            onNext={() => setCurrentScreen(5)}
            onBack={() => setCurrentScreen(3)}
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <Step4_Contact
            onNext={() => {
              setCurrentScreen(6);
            }}
            onBack={() => setCurrentScreen(4)}
            formData={formData}
            updateContactInfo={updateContactInfo}
          />
        );
      case 6:
        return (
          <Step5_Offer
            onNext={() => setCurrentScreen(7)}
            onBack={() => setCurrentScreen(5)}
            formData={formData}
          />
        );
      case 7:
        return <ApplicationSubmitted email={formData.contact?.email} />;
      default:
        return <Step1_Details />;
    }
  };

  // Hide progress bar on success screen
  const showProgressBar = currentScreen !== 7;

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-[700px] mx-auto">
        {/* Progress Bar - Hidden on success screen */}
        {showProgressBar && (
          <div className="mb-10 text-center">
            <p className="text-gray-400 text-sm mb-2">
              Step{" "}
              {Math.min(
                currentScreen === 2
                  ? 1
                  : currentScreen - (currentScreen > 2 ? 1 : 0),
                6,
              )}{" "}
              of 6
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{
                  width: `${(Math.min(currentScreen === 2 ? 1 : currentScreen - (currentScreen > 2 ? 1 : 0), 6) / 6) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {renderScreen()}
      </div>
    </div>
  );
};

export default SellCarPage;
