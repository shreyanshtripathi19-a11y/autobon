"use client";
import React, { useState, useEffect } from "react";
import civic from "../../assets/s1.png";
import Step2PersonalDetails from "@/pages/Checkout/Step2";
import Step1TradeIn from "@/pages/Checkout/Step1";
import Step5Delivery from "@/pages/Checkout/Step5";
import PaymentPackage from "@/pages/Checkout/Step3";
import ApplicationSubmitted from "@/components/ApplicationSubmitted";

const OrderSummary = ({ carImage }) => (
  <div className="w-full max-w-sm border border-blue-100 rounded-2xl p-8 shadow-2xl shadow-blue-50 h-fit bg-white">
    <div className="text-left mb-6">
      <h3 className="text-2xl font-bold text-gray-800">Honda Civic, 2021</h3>
      <p className="text-lg text-gray-400">76899 kms</p>
    </div>

    <img
      src={carImage}
      alt="Car"
      className="w-full h-auto object-contain mb-8"
    />

    <div className="space-y-4 border-t border-gray-100 pt-6">
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">Purchase value</span>
        <span className="text-gray-900 font-bold">$33,490</span>
      </div>
      <button className="text-[10px] text-blue-500 underline -mt-3 block">
        View full breakdown
      </button>

      <div className="flex justify-between items-center pt-2">
        <span className="text-gray-700 font-medium">Other fees</span>
        <span className="text-gray-900 font-bold">$59</span>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500 px-2">
        <span>Licensing</span>
        <span>$59</span>
      </div>

      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
        <span className="text-gray-700 font-bold">Subtotal</span>
        <span className="text-gray-900 font-bold">$33,549</span>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-gray-700 font-medium">Taxes</span>
        <span className="text-gray-900 font-bold">$4,354</span>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500 px-2">
        <span>HST</span>
        <span>$4,354</span>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <span className="text-lg font-black text-gray-800">Total</span>
        <span className="text-lg font-black text-gray-900">$37,903</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-black text-gray-800">Due today</span>
        <span className="text-lg font-black text-gray-900">$37,903</span>
      </div>
    </div>
  </div>
);

const SuccessScreen = ({ formData }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 animate-in fade-in duration-700">
    <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl sm:text-3xl text-centers font-bold text-primary mb-4">
        Application Submitted!
      </h2>

      <p className="text-gray-600 text-center text-sm sm:text-base mb-8">
        Thank you, Our team will review your details shortly at{" "}
        <span className="block font-medium text-gray-800 mt-1 break-words">
          {formData.email}
        </span>
      </p>

      <div className="pt-6 border-t border-gray-100 mb-6">
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

const FinanceForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4; // Steps 1-4, step 5 is success screen
  const [formData, setFormData] = useState({
    tradeIn: "different",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    kmsPerYear: 15000,
    selectedPackage: "Clutch Certified™",
    verificationCode: "",
  });

  const ProgressBar = () => (
    <div className="w-full absolute top-0 left-0 px-0 z-10">
      <div className=" mx-auto px-0 md:px-0">
        {/* <p className="text-[10px] md:block hidden md:text-xs text-gray-400 mb-2 italic text-center pt-4">
          3 minutes from finish
        </p> */}
        <div className="w-full bg-gray-200 h-1 rounded-none overflow-hidden mb-4">
          <div
            className="bg-primary h-full transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  // Auto-scroll to top whenever step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  const nextStep = () => {
    setStep((p) => Math.min(p + 1, 4)); // Steps 1-3 form, step 4 is success
  };

  const prevStep = () => {
    setStep((p) => Math.max(p - 1, 1));
  };

  // If we're on the success screen (step 4), show only that
  if (step >= 4) {
    return <ApplicationSubmitted email={formData.email} />;
  }

  return (
    <div className="min-h-screen relative bg-white font-sans">
      <a href="tel:9058003100" className="fixed right-2 md:right-20 bottom-10" aria-label="Call 905-800-3100" title="Call 905-800-3100">
        <img
          src="/call.png"
          alt="Call"
          className="w-7 h-7 transition ease-in-out hover:w-8 hover:h-8"
        />
      </a>
      {/* Progress Bar */}
      <ProgressBar />

      <div className="pt-24 p-6 md:p-12">
        {" "}
        {/* Added pt-24 to account for fixed progress bar */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* LEFT COLUMN: Form Steps */}
          <div
            className={`${step !== 6 ? "lg:col-span-7" : "lg:col-span-full"} flex flex-col`}
          >
            {step === 1 && (
              <Step1TradeIn
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
              />
            )}
            {step === 2 && (
              <Step2PersonalDetails
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {/* {step === 3 && (
              <PaymentPackage
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )} */}
            {step === 3 && (
              <Step5Delivery
                formData={formData}
                setFormData={setFormData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
          </div>

          {/* RIGHT COLUMN: Conditional Vehicle Info / Summary */}
          {
            <div className="lg:col-span-5 hidden md:flex justify-center lg:justify-start">
              {step === 3 ? (
                <OrderSummary carImage={civic.src} />
              ) : (
                <div className="sticky max-w-[350px] top-32 w-full border border-primary rounded-xl p-12 py-16 shadow-2xl h-fit text-center">
                  <h3 className="text-2xl font-bold text-[#3F3F3F] text-left">
                    Honda Civic, 2021
                  </h3>
                  <p className="text-[26px] text-[#8E8E93] w-full text-left mt-1 mb-10">
                    76899 kms
                  </p>
                  <div className="relative flex justify-center">
                    <img
                      src={civic.src}
                      alt="Car"
                      className="w-full h-auto object-contain object-center "
                    />
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default FinanceForm;
