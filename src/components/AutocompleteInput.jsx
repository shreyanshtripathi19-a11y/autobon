"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * Reusable autocomplete input component.
 *
 * @param {Object} props
 * @param {string[]} props.suggestions - Array of suggestion strings
 * @param {string} props.value - Current input value
 * @param {(value: string) => void} props.onChange - Called when value changes
 * @param {string} [props.placeholder] - Input placeholder
 * @param {string} [props.className] - Additional CSS classes for the input
 * @param {string} [props.name] - Input name attribute
 * @param {boolean} [props.disabled] - Whether input is disabled
 * @param {string} [props.dropdownClassName] - Additional CSS classes for dropdown
 */
export default function AutocompleteInput({
  suggestions = [],
  value = "",
  onChange,
  placeholder = "",
  className = "",
  name = "",
  disabled = false,
  dropdownClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const listRef = useRef(null);

  // Filter suggestions based on current value
  const filtered = value
    ? suggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      )
    : suggestions;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (listRef.current && highlightIndex >= 0) {
      const item = listRef.current.children[highlightIndex];
      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightIndex]);

  const handleInputChange = useCallback(
    (e) => {
      onChange(e.target.value);
      setIsOpen(true);
      setHighlightIndex(-1);
    },
    [onChange]
  );

  const handleSelect = useCallback(
    (val) => {
      onChange(val);
      setIsOpen(false);
      setHighlightIndex(-1);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen || filtered.length === 0) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev < filtered.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev > 0 ? prev - 1 : filtered.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightIndex >= 0 && highlightIndex < filtered.length) {
            handleSelect(filtered[highlightIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightIndex(-1);
          break;
      }
    },
    [isOpen, filtered, highlightIndex, handleSelect]
  );

  const showDropdown = isOpen && filtered.length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className={className}
      />
      {showDropdown && (
        <ul
          ref={listRef}
          className={`absolute z-50 left-0 right-0 top-full mt-1 max-h-[200px] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg ${dropdownClassName}`}
        >
          {filtered.map((item, idx) => (
            <li
              key={item}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item);
              }}
              onMouseEnter={() => setHighlightIndex(idx)}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                idx === highlightIndex
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
