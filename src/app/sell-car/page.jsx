"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Step2_Confirm from "../../pages/SellCar/Step2";
import Step3_Mileage from "../../pages/SellCar/Step3";
import Step4_Contact from "../../pages/SellCar/Step4";
import Step1_Details from "@/pages/SellCar/Step1";
import ApplicationSubmitted from "@/components/ApplicationSubmitted";

const SellCarPageInner = () => {
  const searchParams = useSearchParams();

  // Read URL params from sell-or-trade form
  const urlYear = searchParams.get("year") || "";
  const urlMake = searchParams.get("make") || "";
  const urlModel = searchParams.get("model") || "";
  const urlCity = searchParams.get("city") || "";
  const hasPrefilledData = urlYear && urlMake && urlModel;

  // If all vehicle details were passed from the sell-or-trade form, skip Step 1
  const [currentScreen, setCurrentScreen] = useState(hasPrefilledData ? 3 : 1);
  const [formData, setFormData] = useState({
    vin: "",
    year: urlYear,
    make: urlMake,
    model: urlModel,
    city: urlCity,
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

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateContactInfo = (contactData) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactData },
    }));
  };

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
            onNext={() => setCurrentScreen(6)}
            onBack={() => setCurrentScreen(4)}
            formData={formData}
            updateContactInfo={updateContactInfo}
          />
        );
      case 6:
        return <ApplicationSubmitted email={formData.contact?.email} />;
      default:
        return <Step1_Details />;
    }
  };

  const showProgressBar = currentScreen !== 6;

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-[700px] mx-auto">
        {showProgressBar && (
          <div className="mb-10 text-center">
            <p className="text-gray-400 text-sm mb-2">
              Step{" "}
              {Math.min(
                currentScreen === 2
                  ? 1
                  : currentScreen - (currentScreen > 2 ? 1 : 0),
                5,
              )}{" "}
              of 5
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{
                  width: `${(Math.min(currentScreen === 2 ? 1 : currentScreen - (currentScreen > 2 ? 1 : 0), 5) / 5) * 100}%`,
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

// Wrap in Suspense for useSearchParams SSR compatibility
const SellCarPage = () => (
  <Suspense fallback={<div className="min-h-screen bg-white" />}>
    <SellCarPageInner />
  </Suspense>
);

export default SellCarPage;
