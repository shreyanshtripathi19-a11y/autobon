"use client";
import React, { useRef, useEffect, useState } from "react";

const GOOGLE_API_KEY = "AIzaSyD8qcZZZD_iXZNnFcaQ5auErE9G-pU-Tio";

// Lightweight loader — injects the script tag once, resolves when google.maps is ready
let loadPromise = null;
function loadGooglePlaces() {
  if (loadPromise) return loadPromise;
  if (typeof window !== "undefined" && window.google?.maps?.places) {
    return Promise.resolve();
  }
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Places"));
    document.head.appendChild(script);
  });
  return loadPromise;
}

/**
 * Reusable Google Places Autocomplete input for address fields.
 *
 * Props:
 *  - value: string
 *  - onChange: (fullAddress: string, components?: { street, city, province, postalCode, country }) => void
 *  - placeholder?: string
 *  - className?: string
 *  - error?: string
 *  - label?: string
 *  - required?: boolean
 *  - id?: string
 */
const AddressAutocomplete = ({
  value,
  onChange,
  placeholder = "Start typing your address…",
  className = "",
  error,
  label,
  required = false,
  id,
  inputClassName = "",
}) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Stable onChange ref to avoid re-initializing autocomplete
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    loadGooglePlaces()
      .then(() => setIsLoaded(true))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "ca" },
        types: ["address"],
        fields: ["address_components", "formatted_address"],
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (!place || !place.address_components) return;

      const get = (type) => {
        const comp = place.address_components.find((c) => c.types.includes(type));
        return comp ? comp.long_name : "";
      };
      const getShort = (type) => {
        const comp = place.address_components.find((c) => c.types.includes(type));
        return comp ? comp.short_name : "";
      };

      const streetNumber = get("street_number");
      const route = get("route");
      const street = streetNumber ? `${streetNumber} ${route}` : route;
      const city = get("locality") || get("sublocality_level_1") || get("administrative_area_level_3");
      const province = get("administrative_area_level_1");
      const provinceShort = getShort("administrative_area_level_1");
      const postalCode = get("postal_code");
      const country = get("country");

      onChangeRef.current(place.formatted_address || "", {
        street,
        city,
        province,
        provinceShort,
        postalCode,
        country,
      });
    });
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className={className}>
        {label && (
          <label className="text-[13px] text-gray-400 font-medium mb-1 block">
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Loading address search…"
          className={`w-full border border-gray-300 rounded-md p-3.5 text-sm outline-none bg-gray-50 ${inputClassName}`}
          disabled
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {label && (
        <label className="text-[13px] text-gray-400 font-medium mb-1 block">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        className={`w-full border rounded-md p-3.5 text-sm outline-none transition-all ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            : isFocused
              ? "border-blue-600 ring-4 ring-blue-100"
              : "border-gray-300"
        } ${inputClassName}`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default AddressAutocomplete;
