/**
 * Shared form validation utilities.
 * Standard error messages that match top-tier web forms (Stripe, Shopify, etc.)
 */

// ─── Individual field validators ──────────────────────────────────────────────

export const validators = {
  /**
   * Required field — checks for empty / whitespace-only
   */
  required: (value, label = "This field") => {
    if (value === undefined || value === null) return `${label} is required`;
    if (typeof value === "string" && !value.trim()) return `${label} is required`;
    if (typeof value === "boolean" && !value) return `${label} is required`;
    return "";
  },

  /**
   * Name — letters, spaces, hyphens, apostrophes only, 2+ chars
   */
  name: (value, label = "Name") => {
    if (!value || !value.trim()) return `${label} is required`;
    if (value.trim().length < 2) return `${label} must be at least 2 characters`;
    if (!/^[a-zA-ZÀ-ÿ\s'\-\.]+$/.test(value.trim()))
      return `${label} can only contain letters, spaces, hyphens, and apostrophes`;
    return "";
  },

  /**
   * Email — standard format check
   */
  email: (value) => {
    if (!value || !value.trim()) return "Email address is required";
    if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value.trim()))
      return "Please enter a valid email address";
    return "";
  },

  /**
   * Phone — expects 10+ digits (North American), strips formatting
   */
  phone: (value) => {
    if (!value || !value.trim()) return "Phone number is required";
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10) return "Phone number must be at least 10 digits";
    if (digits.length > 15) return "Phone number is too long";
    return "";
  },

  /**
   * Postal code — Canadian format (A1A 1A1) or US ZIP (12345 / 12345-6789)
   */
  postalCode: (value) => {
    if (!value || !value.trim()) return "Postal code is required";
    const v = value.trim().toUpperCase().replace(/\s/g, "");
    const isCanadian = /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(v);
    const isUSZip = /^\d{5}(-\d{4})?$/.test(v);
    if (!isCanadian && !isUSZip) return "Please enter a valid postal code";
    return "";
  },

  /**
   * Address — basic non-empty, at least 5 chars
   */
  address: (value) => {
    if (!value || !value.trim()) return "Street address is required";
    if (value.trim().length < 5) return "Please enter a complete street address";
    return "";
  },

  /**
   * Currency / dollar amount — must be a positive number
   */
  currency: (value, label = "Amount") => {
    if (!value || !value.trim() || value === "$ " || value === "$")
      return `${label} is required`;
    const num = Number(value.replace(/[$,\s]/g, ""));
    if (isNaN(num) || num <= 0) return `Please enter a valid ${label.toLowerCase()}`;
    return "";
  },

  /**
   * Date of birth — day/month/year all present, valid date, 18+
   */
  dob: (day, month, year) => {
    if (!day || !month || !year) return "Please enter your full date of birth";
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return "Please enter valid date values";
    if (m < 1 || m > 12) return "Please enter a valid month (1-12)";
    if (d < 1 || d > 31) return "Please enter a valid day (1-31)";
    if (y < 1900 || y > new Date().getFullYear()) return "Please enter a valid year";
    const date = new Date(y, m - 1, d);
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) age--;
    if (age < 18) return "You must be at least 18 years old";
    return "";
  },

  /**
   * Message / comment — at least 10 chars
   */
  message: (value, label = "Message") => {
    if (!value || !value.trim()) return `${label} is required`;
    if (value.trim().length < 10) return `${label} must be at least 10 characters`;
    return "";
  },

  /**
   * Select dropdown — not default placeholder
   */
  select: (value, label = "Selection") => {
    if (!value || value === "Select" || value === "") return `Please select a ${label.toLowerCase()}`;
    return "";
  },

  /**
   * Checkbox consent — must be checked
   */
  consent: (value) => {
    if (!value) return "You must agree to the terms to continue";
    return "";
  },

  /**
   * Verification code — numeric, 4-6 digits
   */
  verificationCode: (value) => {
    if (!value || !value.trim()) return "Verification code is required";
    if (!/^\d{4,6}$/.test(value.trim())) return "Please enter a valid verification code (4-6 digits)";
    return "";
  },
};

// ─── Formatting helpers ───────────────────────────────────────────────────────

/**
 * Format phone number as user types: 905-800-3100
 */
export const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "").substring(0, 10);
  if (digits.length > 6) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return digits;
};

/**
 * Format currency as user types: 50,000
 */
export const formatCurrency = (value) => {
  const numeric = value.replace(/[^0-9]/g, "");
  if (!numeric) return "";
  return Number(numeric).toLocaleString("en-US");
};

/**
 * Format postal code as user types: A1A 1A1
 */
export const formatPostalCode = (value) => {
  const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "").substring(0, 6);
  if (clean.length > 3) return `${clean.slice(0, 3)} ${clean.slice(3)}`;
  return clean;
};

// ─── Bulk validation runner ───────────────────────────────────────────────────

/**
 * Validate multiple fields at once.
 * @param {Object} rules — { fieldName: () => "error" | "" }
 * @returns {{ errors: Object, isValid: boolean }}
 *
 * Usage:
 *   const { errors, isValid } = validateAll({
 *     firstName: () => validators.name(formData.firstName, "First name"),
 *     email: () => validators.email(formData.email),
 *   });
 */
export const validateAll = (rules) => {
  const errors = {};
  for (const [field, validatorFn] of Object.entries(rules)) {
    const error = validatorFn();
    if (error) errors[field] = error;
  }
  return { errors, isValid: Object.keys(errors).length === 0 };
};
