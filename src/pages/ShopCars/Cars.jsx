"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full font-semibold text-black text-[15px]"
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
  const categories = [
    "DEALS",
    "PRICE & PAYMENT",
    "MAKE & MODEL",
    "BODY TYPE",
    "YEAR",
    "MILEAGE (km)",
    "FUEL TYPE",
    "FEATURES",
    "EXTERIOR COLOUR",
    "SEATS",
    "DRIVETRAIN",
    "TRANSMISSIONS",
    "CYLINDERS",
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <button className="text-primary text-sm font-medium hover:underline">
          Clear all
        </button>
      </div>

      {categories.map((cat) => (
        <FilterItem key={cat} title={cat}>
          {/* Example internal filter list */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="accent-primary" /> Option A
            </label>
          </div>
        </FilterItem>
      ))}
    </div>
  );
};

export default Filters;
