"use client";

import * as React from "react";

const DatePicker = React.forwardRef(({ value, onChange, placeholder = "Pick a date", ...props }, ref) => {
  const handleChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      // Parse as local date to avoid timezone offset issues
      const [year, month, day] = dateValue.split("-").map(Number);
      onChange(new Date(year, month - 1, day));
    }
  };

  const formattedValue = value instanceof Date && !isNaN(value)
    ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`
    : "";

  return (
    <input
      ref={ref}
      type="date"
      value={formattedValue}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1"
      {...props}
    />
  );
});

DatePicker.displayName = "DatePicker";

export { DatePicker };
