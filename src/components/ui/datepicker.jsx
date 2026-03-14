"use client";

import * as React from "react";

const DatePicker = React.forwardRef(({ value, onChange, placeholder = "Pick a date", ...props }, ref) => {
  const handleChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      onChange(new Date(dateValue));
    }
  };

  const formattedValue = value instanceof Date && !isNaN(value)
    ? value.toISOString().split("T")[0]
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
