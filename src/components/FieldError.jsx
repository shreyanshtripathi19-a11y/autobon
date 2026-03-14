"use client";
import React from "react";

/**
 * Standard inline error message matching top-tier form UX (Stripe, Shopify, etc.)
 * Shows a small ⚠ icon + red error text below the field.
 */
export const FieldError = ({ error }) => {
  if (!error) return null;
  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {error}
    </p>
  );
};

/**
 * Returns Tailwind border classes for an input based on whether it has an error.
 */
export const inputBorderClass = (error) =>
  error
    ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
    : "border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

export default FieldError;
