import React from "react";
import { Check, X, ShieldCheck, Info } from "lucide-react";

const PersonalizedProtection = () => {
  const plans = [
    {
      name: "Basic",
      subtitle: "(no protection)",
      eligibility: "Cash buyers only",
      features: {
        "10-day return policy": true,
        "Due at checkout": "Full purchase price",
        "Apply a trade-in credit": false,
        Warranty: false,
        "Tire & Rim protection": false,
        "Rust protection": false,
        "Pickup/Delivery": "Next-day pickup only",
        "Roadside assistance": false,
        Detailing: false,
        "Full tank of gas": false,
        "210-point inspection": true,
        "Safety standards certificate": true,
      },
    },
    {
      name: "Essential",
      subtitle: "",
      eligibility: "Cash & finance",
      features: {
        "10-day return policy": true,
        "Due at checkout": "$100 refundable",
        "Apply a trade-in credit": true,
        Warranty: "Standard Warranty",
        "Tire & Rim protection": false,
        "Rust protection": false,
        "Pickup/Delivery": "Free pickup/Fee delivery",
        "Roadside assistance": false,
        Detailing: true,
        "Full tank of gas": true,
        "210-point inspection": true,
        "Safety standards certificate": true,
      },
    },
    {
      name: "Certified™",
      subtitle: "",
      eligibility: "Cash & finance",
      features: {
        "10-day return policy": true,
        "Due at checkout": "$100 refundable",
        "Apply a trade-in credit": true,
        Warranty: "Standard Warranty",
        "Tire & Rim protection": false,
        "Rust protection": false,
        "Pickup/Delivery": "Free",
        "Roadside assistance": true,
        Detailing: true,
        "Full tank of gas": true,
        "210-point inspection": true,
        "Safety standards certificate": true,
      },
    },
    {
      name: "Certified Plus™",
      subtitle: "",
      eligibility: "Finance only",
      highlight: true,
      features: {
        "10-day return policy": true,
        "Due at checkout": "$100 refundable",
        "Apply a trade-in credit": true,
        Warranty: "Standard Warranty",
        "Tire & Rim protection": true,
        "Rust protection": true,
        "Pickup/Delivery": "Free",
        "Roadside assistance": true,
        Detailing: true,
        "Full tank of gas": true,
        "210-point inspection": true,
        "Safety standards certificate": true,
      },
    },
  ];

  const featureList = Object.keys(plans[0].features);

  const renderValue = (val) => {
    if (val === true) return <Check className="text-blue-600" size={18} />;
    if (val === false) return <X className="text-gray-300" size={18} />;
    return (
      <span className="text-[12px] font-medium text-gray-700 text-right">
        {val}
      </span>
    );
  };

  const SummaryTable = () => (
    <div className="hidden bg-[#4079ED1C] md:grid grid-cols-4 gap-0 border border-black rounded-lg overflow-hidden mb-18 shadow-sm">
      {plans.map((plan) => (
        <div key={plan.name} className="flex flex-col border-r last:border-r-0">
          <div className="p-6 text-center border-b border-black">
            <p className="text-md font-semibold text-black">
              {plan.name}{" "}
              <span className="text-gray-500 font-normal">{plan.subtitle}</span>
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
              {plan.eligibility}
            </p>
          </div>
          <div className="p-6 pt-6">
            <ul className="space-y-3">
              {featureList.slice(0, 7).map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2 text-[11px] text-black"
                >
                  {typeof plan.features[feat] === "boolean" ? (
                    plan.features[feat] ? (
                      <Check
                        className="text-blue-500 mt-0.5 flex-shrink-0"
                        size={14}
                      />
                    ) : (
                      <X
                        className="text-gray-300 mt-0.5 flex-shrink-0"
                        size={14}
                      />
                    )
                  ) : (
                    <Check
                      className="text-blue-500 mt-0.5 flex-shrink-0"
                      size={14}
                    />
                  )}
                  <span className="leading-tight">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full py-10 md:py-16 bg-white">
      <div className="w-full max-w-[1200px] px-4 mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[22px] md:text-[30px] font-bold text-[#5A5A5A] mb-4 leading-tight">
            Personalized protection when you buy from Autobon
          </h2>
          <p className="text-[#5A5A5A] text-[13px] max-w-2xl mx-auto px-4">
            Pick a package at checkout that fits your budget and needs. Package
            price varies by vehicle.
          </p>
        </div>

        {/* 1. Desktop Summary Grid */}
        <SummaryTable />

        {/* 2. Desktop Comparison Matrix */}
        <div className="hidden md:block overflow-hidden border border-black rounded-lg shadow-sm bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-6 text-left border-b border-r w-[250px]"> </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={`p-6 border-b border-r text-center ${plan.highlight ? "bg-blue-50/40" : ""}`}
                  >
                    <h3 className="text-[16px] font-bold text-black">
                      {plan.name}
                    </h3>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureList.map((feature) => (
                <tr
                  key={feature}
                  className="hover:bg-gray-50/30 transition-colors"
                >
                  <td className="p-4 border-b border-r text-[13px] font-semibold text-gray-500 bg-white">
                    {feature}
                  </td>
                  {plans.map((plan) => (
                    <td
                      key={`${plan.name}-${feature}`}
                      className={`p-4 border-b border-r text-center ${plan.highlight ? "bg-blue-50/20" : ""}`}
                    >
                      <div className="flex justify-center">
                        {renderValue(plan.features[feature])}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. Improved Mobile View (Swipeable Cards) */}
        <div className="md:hidden flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`min-w-[85vw] snap-center rounded-xl border border-black overflow-hidden bg-[#4079ED0A] flex-shrink-0 ${
                plan.highlight ? "ring-2 ring-blue-500 ring-inset" : ""
              }`}
            >
              <div className="p-5 text-center border-b border-black bg-[#4079ED12]">
                <h3 className="text-lg font-bold text-black">
                  {plan.name}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    {plan.subtitle}
                  </span>
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {plan.eligibility}
                </p>
              </div>
              <div className="p-5 space-y-4">
                {featureList.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-between gap-4 border-b border-black/5 pb-2 last:border-0"
                  >
                    <span className="text-[11px] font-semibold text-gray-500">
                      {feature}
                    </span>
                    <div className="flex-shrink-0">
                      {renderValue(plan.features[feature])}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalizedProtection;
