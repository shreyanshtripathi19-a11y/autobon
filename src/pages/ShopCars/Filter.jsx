"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center font-[500] justify-between w-full font-medium text-black text-[16px]"
      >
        {title}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  );
};

const Filters = () => {
  const [price, setPrice] = useState(150000);
  const [year, setYear] = useState(2015);
  const [mileage, setMileage] = useState(200000);

  // Data mapping based on your requirements
  const filterData = {
    DEALS: ["On sale"],
    "MAKE & MODEL": ["Acura", "Honda", "Toyota", "BMW", "Mercedes-Benz"],
    "BODY TYPE": [
      "SUV",
      "Sedan",
      "Hatchback",
      "Wagon",
      "Truck",
      "Van",
      "Coupe",
      "Convertible",
    ],
    "FUEL TYPE": ["Diesel", "Electric", "Gasoline", "Hybrid", "Plug-In Hybrid"],
    FEATURES: [
      "Sunroof",
      "Leather Seats",
      "Navigation",
      "Heated Seats",
      "Backup Camera",
    ],
    "EXTERIOR COLOUR": ["Black", "Blue", "Brown", "Green", "Grey", "Other"],
    SEATS: ["2 seats", "4 seats", "5 seats", "6 seats", "7 seats", "9 seats"],
    DRIVETRAIN: ["4WD", "AWD", "FWD", "RWD"],
    TRANSMISSIONS: ["Automatic", "Manual"],
    CYLINDERS: [
      "Boxer (4 cyl.)",
      "Boxer (6 cyl)",
      "V6",
      "V8",
      "Rotary",
      "3Cyl",
    ],
  };

  const renderFilterContent = (cat) => {
    // Range Sliders
    if (cat === "PRICE & PAYMENT") {
      return (
        <div className="space-y-4 px-2">
          <div className="flex gap-2 mb-2">
            <button className="text-[12px] border px-3 py-1 rounded-full hover:bg-gray-100">
              Cash
            </button>
            <button className="text-[12px] border px-3 py-1 rounded-full hover:bg-gray-100">
              Finance
            </button>
          </div>
          <input
            type="range"
            min="5000"
            max="150000"
            step="1000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$5,000</span>
            <span className="font-bold text-primary">
              ${Number(price).toLocaleString()}
            </span>
          </div>
        </div>
      );
    }

    if (cat === "YEAR") {
      return (
        <div className="space-y-4 px-2">
          <input
            type="range"
            min="1990"
            max="2026"
            step="1"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>1990</span>
            <span className="font-bold text-primary">{year}</span>
          </div>
        </div>
      );
    }

    if (cat === "MILEAGE (km)") {
      return (
        <div className="space-y-4 px-2">
          <input
            type="range"
            min="0"
            max="300000"
            step="5000"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>0 km</span>
            <span className="font-bold text-primary">
              {Number(mileage).toLocaleString()} km
            </span>
          </div>
        </div>
      );
    }

    // Dynamic Checkbox Lists
    const options = filterData[cat] || ["None available"];
    return (
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black"
          >
            <input type="checkbox" className="accent-primary w-4 h-4 rounded" />
            {option}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {Object.keys(filterData)
        .concat(["PRICE & PAYMENT", "YEAR", "MILEAGE (km)"])
        .sort()
        .map((cat) => (
          <FilterItem key={cat} title={cat}>
            {renderFilterContent(cat)}
          </FilterItem>
        ))}
    </div>
  );
};

export default Filters;
