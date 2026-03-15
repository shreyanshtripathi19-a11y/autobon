"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { validators, formatPhone, validateAll } from "@/lib/validators";
import { FieldError, inputBorderClass } from "@/components/FieldError";

// Car images from uploaded photos
const CAR_IMGS = [
  "/images/c0e515790ae6cd243a0ae47e32ad732e993b78a2.png",
  "/images/eb30a4d65252692d4873d6b8a9fd07a49d03cca2.png",
  "/images/a3fcdda6786415d8d2e1e609eb1515fed34bf69d.png",
];

const CAR_TITLES = [
  "2020 Audi A3",
  "2022 Honda Civic",
  "2021 Kia Stinger",
  "2019 Tesla Model 3",
  "2021 Toyota RAV4",
  "2020 BMW 3 Series",
  "2021 Mercedes-Benz C-Class",
  "2020 Mazda CX-5",
  "2018 Ford Mustang",
  "2022 Hyundai Elantra",
  "2021 Subaru Crosstrek",
  "2019 Jeep Wrangler",
  "2021 Nissan Rogue",
  "2018 Chevrolet Silverado 1500",
  "2020 Volkswagen Golf",
  "2023 Tesla Model Y",
  "2021 Porsche Macan",
  "2022 Lexus IS 350",
  "2020 GMC Sierra 1500",
  "2021 Honda CR-V",
  "2019 Dodge Challenger",
  "2022 Volvo XC60",
  "2021 Subaru WRX STi",
  "2020 Land Rover Defender 110",
  "2021 BMW M4",
];

const BODY_TYPES = ["Coupe", "Hatchback", "SUV", "Sedan", "Truck"];
const PRICE_RATINGS = [
  "Fair Price",
  "Good Price",
  "Great Price",
  "Market Price",
];
const CONDITIONS = ["New", "Used"];
const COLORS = [
  "Black",
  "Blue",
  "Boulder Grey",
  "Crystal Black",
  "Cyber Grey",
  "Deep Black Pearl",
  "Deep Blue Metallic",
  "Infrared",
  "Isle of Man Green",
  "Jet Black Metallic",
  "Onyx Black",
  "Pangea Green",
  "Pine Grey",
  "Plasma Yellow",
  "Plum Crazy",
  "Polar White",
  "Red",
  "Silver",
  "Soul Red",
];

const mockCars = CAR_TITLES.map((title, i) => {
  const parts = title.split(" ");
  const year = parseInt(parts[0]);
  let make = parts[1];
  let modelWords = parts.slice(2);

  if (make === "Land") {
    make = "Land Rover";
    modelWords = parts.slice(3);
  }

  const model = modelWords.join(" ");
  const basePrice = 30000 + (i % 5) * 10000;

  let bodyType = "Sedan";
  if (
    model.includes("CX") ||
    model.includes("RAV4") ||
    model.includes("Rogue") ||
    model.includes("Macan") ||
    model.includes("XC60") ||
    model.includes("Defender") ||
    model.includes("CR-V") ||
    model.includes("Model Y") ||
    model.includes("Wrangler")
  ) {
    bodyType = "SUV";
  } else if (
    model.includes("Silverado") ||
    model.includes("Sierra") ||
    model.includes("F-150")
  ) {
    bodyType = "Truck";
  } else if (
    model.includes("Mustang") ||
    model.includes("Challenger") ||
    model.includes("M4") ||
    model.includes("STi")
  ) {
    bodyType = "Coupe";
  } else if (model.includes("Golf") || model.includes("Crosstrek")) {
    bodyType = "Hatchback";
  }

  return {
    id: i + 1,
    title: title,
    year: year,
    make: make,
    model: model,
    price: basePrice,
    priceRating: PRICE_RATINGS[i % PRICE_RATINGS.length],
    condition: CONDITIONS[i % CONDITIONS.length],
    bodyType: bodyType,
    color: COLORS[i % COLORS.length],
    trim: ["All Trims"][0],
    mileage: "14,200 km",
    priceStatus: "Competitive price",
    desc: "Excellent fuel efficiency & low maintenance Sporty design with advanced safety features.",
    oldPrice: "$" + basePrice.toLocaleString(),
    biWeekly: "$" + Math.round(basePrice / 120),
    down: "$0 down",
    noAccident: true,
    img: CAR_IMGS[i % CAR_IMGS.length],
  };
});

// Sidebar filter list options
const FP_MAKES = [
  "All Makes", "Audi", "BMW", "Chevrolet", "Dodge", "Ford", "GMC", "Honda",
  "Hyundai", "Jeep", "Kia", "Land Rover", "Lexus", "Mazda", "Mercedes-Benz",
  "Nissan", "Porsche", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo",
];
const FP_MODELS = ["All Models", "CR-V", "Civic"];
const FP_TRIMS = [
  "All Trims", "330i", "B5 Inscription", "C 300", "Competition", "Denali",
  "F SPORT", "GT Premium", "GT-Line", "Grand Touring", "Highline", "Komfort",
  "LTZ", "Long Range", "Outdoor", "P300", "Performance", "Platinum",
  "Preferred", "S",
];
const FP_PRICES = [
  "Max Price", "$20,000", "$30,000", "$40,000", "$50,000", "$60,000",
  "$70,000", "$80,000",
];
const FP_RATINGS = [
  "All Ratings", "Fair Price", "Good Price", "Great Price", "Market Price",
];
const FP_CONDITIONS = ["All Conditions", "New", "Used"];
const FP_BODY_TYPES = [
  "All Body Types", "Coupe", "Hatchback", "SUV", "Sedan", "Truck",
];
const FP_COLORS = [
  "All Colors", "Black", "Blue", "Boulder Grey", "Crystal Black", "Cyber Grey",
  "Deep Black Pearl", "Deep Blue Metallic", "Infrared", "Isle of Man Green",
  "Jet Black Metallic", "Onyx Black", "Pangea Green", "Pine Grey",
  "Plasma Yellow", "Plum Crazy", "Polar White", "Red", "Silver", "Soul Red",
];
const FP_YEARS = ["2018", "2019", "2020", "2021", "2022", "2023"];

const features = [
  "Air Conditioning", "Alloy Wheels", "Backup Camera", "Bluetooth Connection",
  "Brake Assist", "Cooled Seats", "Cruise Control", "Heated Seats",
  "Keyless Entry", "Lane Assist", "Leather Seats", "Navigation System",
  "Parking Sensors", "Power Seats", "Power Windows", "Remote Start",
];

// SVG Icon components
const IconCheck = ({ className = "" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconSpeed = ({ className = "" }) => (
  <svg width="15" height="15" viewBox="21 519 35 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M55.4983 536.128C55.4983 539.948 54.3535 543.356 52.0637 546.352C51.8347 546.652 51.5294 546.82 51.1478 546.858C50.7662 546.895 50.4227 546.801 50.1174 546.577C49.8121 546.352 49.6404 546.071 49.6022 545.734C49.564 545.397 49.6595 545.079 49.8884 544.779C51.8729 542.232 52.8651 539.349 52.8651 536.128C52.8651 533.581 52.2164 531.222 50.9188 529.05C49.6213 526.877 47.8467 525.155 45.5951 523.881C43.3435 522.608 40.9202 521.971 38.3251 521.971C35.7301 521.971 33.3067 522.608 31.0551 523.881C28.8035 525.155 27.029 526.877 25.7314 529.05C24.4339 531.222 23.7851 533.581 23.7851 536.128C23.7851 539.349 24.7774 542.232 26.7618 544.779C26.9908 545.079 27.0862 545.397 27.0481 545.734C27.0099 546.071 26.8382 546.352 26.5329 546.577C26.2276 546.801 25.8841 546.895 25.5025 546.858C25.1208 546.82 24.8155 546.652 24.5866 546.352C22.2968 543.356 21.1519 539.948 21.1519 536.128C21.1519 533.132 21.9152 530.342 23.4417 527.758C24.9682 525.173 27.0481 523.132 29.6813 521.634C32.3145 520.136 35.1958 519.387 38.3251 519.387C41.4545 519.387 44.3358 520.136 46.969 521.634C49.6022 523.132 51.6821 525.173 53.2086 527.758C54.7351 530.342 55.4983 533.132 55.4983 536.128ZM46.7972 528.263C47.1026 528.488 47.2552 528.787 47.2552 529.162C47.2552 529.536 47.1026 529.836 46.7972 530.061L42.4467 534.443C42.8283 535.117 43.0191 535.828 43.0191 536.577C43.0191 537.851 42.5612 538.937 41.6453 539.836C40.7294 540.734 39.6227 541.184 38.3251 541.184C37.0276 541.184 35.9209 540.734 35.005 539.836C34.0891 538.937 33.6311 537.851 33.6311 536.577C33.6311 535.304 34.0891 534.218 35.005 533.319C35.9209 532.42 37.0276 531.971 38.3251 531.971C39.0884 531.971 39.8135 532.158 40.5004 532.533L44.9654 528.263C45.1944 527.964 45.4997 527.814 45.8813 527.814C46.263 527.814 46.5683 527.964 46.7972 528.263ZM40.3859 536.577C40.3859 536.053 40.176 535.604 39.7562 535.229C39.3364 534.855 38.8594 534.667 38.3251 534.667C37.7909 534.667 37.3138 534.855 36.894 535.229C36.4742 535.604 36.2643 536.053 36.2643 536.577C36.2643 537.102 36.4742 537.57 36.894 537.982C37.3138 538.394 37.7909 538.6 38.3251 538.6C38.8594 538.6 39.3364 538.394 39.7562 537.982C40.176 537.57 40.3859 537.102 40.3859 536.577Z" fill="currentColor" />
  </svg>
);

const IconPrice = ({ className = "" }) => (
  <svg width="17" height="15" viewBox="184 524 31 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M196.911 539.054C197.475 538.279 201.911 535.136 201.911 535.136C201.911 535.136 200.281 540.322 199.716 541.097C199.152 541.872 198.067 542.043 197.292 541.478C196.517 540.914 196.346 539.828 196.911 539.054Z" fill="currentColor" />
    <circle cx="198.936" cy="540.081" r="0.8" fill="#D9D9D9" />
    <path d="M184.009 539.429C184.009 536.686 184.746 533.993 186.142 531.631L192.897 535.626C192.216 536.778 191.857 538.091 191.857 539.429H184.009Z" fill="#4079ED" />
    <path d="M187.083 530.224C188.83 527.901 191.201 526.122 193.921 525.096L196.691 532.439C195.364 532.939 194.208 533.807 193.356 534.94L187.083 530.224Z" fill="#4079ED" />
    <path d="M195.305 524.648C198.11 523.885 201.074 523.935 203.852 524.793L201.534 532.291C200.18 531.872 198.734 531.848 197.366 532.22L195.305 524.648Z" fill="#4079ED" />
    <path d="M204.875 525.15C207.584 526.202 209.939 528.004 211.663 530.345L205.344 534.999C204.503 533.857 203.355 532.978 202.033 532.465L204.875 525.15Z" fill="#4079ED" />
    <path d="M212.533 531.664C213.924 534.029 214.654 536.724 214.647 539.468L206.799 539.448C206.803 538.11 206.447 536.796 205.768 535.642L212.533 531.664Z" fill="#D9D9D9" />
  </svg>
);

const IconChevron = ({ size = 12, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const IconSearch = ({ className = "" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const IconX = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const IconMenu = ({ className = "" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconHeart = ({ className = "" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const IconChevronRight = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const IconChevronLeft = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const MAKES = [
  "Audi", "BMW", "Chevrolet", "Dodge", "Ford", "GMC", "Honda", "Hyundai",
  "Jeep", "Kia", "Land Rover", "Lexus", "Mazda", "Mercedes-Benz", "Nissan",
  "Porsche", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo",
];

function CheckAvailabilityModal({ isOpen, onClose, carTitle = "this vehicle" }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comment: "",
    hasTradeIn: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      router.push("/pre-qualify?submitted=true");
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white max-h-[90vh] overflow-y-auto rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all">
          <div className="flex items-center justify-between p-6 py-2">
            <h2 className="text-2xl font-bold text-gray-900">Check Availability</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close modal">
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          {isSuccess ? (
            <div className="p-6 sm:p-8 text-center animate-in fade-in duration-700">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Application Submitted!</h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                Thank you, our team will review your details shortly
                <span className="block font-medium text-gray-800 mt-1 break-words">{formData.email}</span>
              </p>
              <div className="pt-4 border-t border-gray-100 mb-6">
                <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Need Immediate Help?</p>
                <a href="tel:9058003100" className="group flex flex-col items-center justify-center gap-1 hover:opacity-90 transition-opacity">
                  <span className="text-gray-500 text-xs font-medium">24/7 Call Us</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#1969DB] group-hover:underline">905 800 3100</span>
                </a>
              </div>
              <button onClick={onClose} className="block w-full text-center px-6 sm:px-8 py-3 bg-primary text-white rounded-full font-medium text-base hover:bg-primary/90 transition-all shadow-md">
                Browse Cars
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 pt-2">
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900" placeholder="Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900" placeholder="john.doe@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900" placeholder="(555) 555-5555" />
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1.5">Comment <span className="text-red-500">*</span></label>
                  <textarea id="comment" name="comment" value={formData.comment} onChange={handleInputChange} required rows={2} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 resize-none" placeholder={"Hi, I'm interested in " + carTitle + " that's listed on Cars.ca. Is it still available?"} />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="hasTradeIn" name="hasTradeIn" checked={formData.hasTradeIn} onChange={handleInputChange} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="hasTradeIn" className="text-sm text-gray-700 cursor-pointer">I have a trade-in</label>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg text-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                <div className="space-y-4 text-[10px] text-gray-500 leading-relaxed">
                  <p>By submitting this form, I acknowledge that I accept and agree to be bound by the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> of cars.ca and further acknowledge that any personal information I may provide to cars.ca will be handled in accordance with the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>. I further agree to receive communications from cars.ca or sellers of motor vehicles advertised on cars.ca. I understand that I can unsubscribe from receiving such communication at any time.</p>
                  <p>This site is protected by reCAPTCHA and the Google <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> apply.</p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedCar, setSelectedCar] = useState(mockCars[0]);
  const [showForm, setShowForm] = useState(false);
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Relevance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // "Get Details" form state for desktop & mobile detail panels
  const [detailForm, setDetailForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", comment: "", hasTradeIn: false,
  });
  const [detailFormSubmitting, setDetailFormSubmitting] = useState(false);
  const [detailFormErrors, setDetailFormErrors] = useState({});
  const [detailFormTouched, setDetailFormTouched] = useState({});

  const handleDetailFormChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setDetailForm((prev) => ({ ...prev, [name]: e.target.checked }));
      return;
    }
    let v = value;
    if (name === "firstName" || name === "lastName") {
      v = value.replace(/[^a-zA-Z\s'-]/g, "");
    } else if (name === "phone") {
      v = formatPhone(value);
    }
    setDetailForm((prev) => ({ ...prev, [name]: v }));
    if (detailFormErrors[name]) {
      setDetailFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const detailFieldValidator = (name, value) => {
    const map = {
      firstName: () => validators.name(value, "First name"),
      lastName: () => validators.name(value, "Last name"),
      email: () => validators.email(value),
      phone: () => validators.phone(value),
    };
    return map[name] ? map[name]() : "";
  };

  const handleDetailFormBlur = (e) => {
    const { name, value } = e.target;
    setDetailFormTouched((prev) => ({ ...prev, [name]: true }));
    const err = detailFieldValidator(name, value);
    setDetailFormErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleDetailFormSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateAll({
      firstName: () => validators.name(detailForm.firstName, "First name"),
      lastName: () => validators.name(detailForm.lastName, "Last name"),
      email: () => validators.email(detailForm.email),
      phone: () => validators.phone(detailForm.phone),
    });
    setDetailFormErrors(errors);
    setDetailFormTouched({ firstName: true, lastName: true, email: true, phone: true });
    if (!isValid) return;
    setDetailFormSubmitting(true);
    setTimeout(() => {
      setDetailFormSubmitting(false);
      router.push("/pre-qualify?submitted=true");
    }, 800);
  };

  // Image carousel state
  const [cardImageIndices, setCardImageIndices] = useState({});
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const [mobileDetailImageIndex, setMobileDetailImageIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(50);

  // Touch swipe handlers for image carousels
  const touchStartRef = useRef(null);
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  const createTouchEndHandler = (setIndex, totalImages) => (e) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setIndex((prev) => (prev + 1) % totalImages);
      } else {
        setIndex((prev) => (prev - 1 + totalImages) % totalImages);
      }
    }
    touchStartRef.current = null;
  };

  // Measure actual fixed header height when mobile detail view opens
  useEffect(() => {
    if (!isMobileDetailView) return;
    const fixedHeader = document.querySelector('.fixed.top-0.left-0.right-0.z-\\[100\\]');
    if (fixedHeader) {
      setHeaderHeight(fixedHeader.getBoundingClientRect().height);
    }
    const observer = new MutationObserver(() => {
      if (fixedHeader) {
        setHeaderHeight(fixedHeader.getBoundingClientRect().height);
      }
    });
    if (fixedHeader) {
      observer.observe(fixedHeader, { childList: true, subtree: true, attributes: true });
    }
    return () => observer.disconnect();
  }, [isMobileDetailView]);

  /* filter dropdown state */
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedMake, setSelectedMake] = useState(null);
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  /* sidebar filter state */
  const [fpMake, setFpMake] = useState("All Makes");
  const [fpModel, setFpModel] = useState("All Models");
  const [fpTrim, setFpTrim] = useState("All Trims");
  const [fpMaxPrice, setFpMaxPrice] = useState("Max Price");
  const [fpPriceRating, setFpPriceRating] = useState("All Ratings");
  const [fpCondition, setFpCondition] = useState("All Conditions");
  const [fpBodyType, setFpBodyType] = useState("All Body Types");
  const [fpColor, setFpColor] = useState("All Colors");
  const [fpMinYear, setFpMinYear] = useState("Min. Year");
  const [fpMaxYear, setFpMaxYear] = useState("Max. Year");

  const router = useRouter();

  const toggleFilter = (name) =>
    setOpenFilter((prev) => (prev === name ? null : name));

  const filteredCars = mockCars.filter((c) => {
    if (selectedMake && c.make !== selectedMake) return false;
    if (fpMake !== "All Makes" && c.make !== fpMake) return false;
    if (fpModel !== "All Models" && !c.model.includes(fpModel)) return false;
    if (fpTrim !== "All Trims" && c.trim !== fpTrim) return false;
    if (fpMaxPrice !== "Max Price") {
      const maxVal = parseInt(fpMaxPrice.replace(/[^0-9]/g, ""));
      if (c.price > maxVal) return false;
    }
    if (fpPriceRating !== "All Ratings" && c.priceRating !== fpPriceRating) return false;
    if (fpCondition !== "All Conditions" && c.condition !== fpCondition) return false;
    if (fpBodyType !== "All Body Types" && c.bodyType !== fpBodyType) return false;
    if (fpColor !== "All Colors" && c.color !== fpColor) return false;
    if (fpMinYear !== "Min. Year" && c.year < parseInt(fpMinYear)) return false;
    if (fpMaxYear !== "Max. Year" && c.year > parseInt(fpMaxYear)) return false;
    return true;
  });

  // Sort options matching cars.ca
  const SORT_OPTIONS = [
    "Relevance",
    "Added: Newest to Oldest",
    "Added: Oldest to Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Mileage: Low to High",
    "Mileage: High to Low",
    "Make: A to Z",
    "Make: Z to A",
  ];

  const parseMileage = (m) => parseInt((m || "0").replace(/[^0-9]/g, "")) || 0;

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortOption) {
      case "Added: Newest to Oldest": return b.id - a.id;
      case "Added: Oldest to Newest": return a.id - b.id;
      case "Price: Low to High": return a.price - b.price;
      case "Price: High to Low": return b.price - a.price;
      case "Mileage: Low to High": return parseMileage(a.mileage) - parseMileage(b.mileage);
      case "Mileage: High to Low": return parseMileage(b.mileage) - parseMileage(a.mileage);
      case "Make: A to Z": return a.make.localeCompare(b.make);
      case "Make: Z to A": return b.make.localeCompare(a.make);
      default: return 0; // Relevance — original order
    }
  });

  const clearAllFilters = () => {
    setFpMake("All Makes");
    setFpModel("All Models");
    setFpTrim("All Trims");
    setFpMaxPrice("Max Price");
    setFpPriceRating("All Ratings");
    setFpCondition("All Conditions");
    setFpBodyType("All Body Types");
    setFpColor("All Colors");
    setFpMinYear("Min. Year");
    setFpMaxYear("Max. Year");
    setSelectedMake(null);
  };

  return (
    <>
      <div className={"min-h-screen bg-white font-sans " + (isMobileDetailView ? "mobile-detail-active" : "")}>
        {/* FILTER BAR */}
        <div className="bg-white py-3 sm:py-4 border-b border-[#E5E7EB]">
          <div className="mx-auto px-3 sm:px-8 lg:px-[120px]" style={{ maxWidth: "1600px" }}>
            <div className="flex items-center gap-2 sm:gap-[10px] overflow-x-auto sm:overflow-x-visible no-scrollbar pb-1 sm:pb-0 sm:flex-wrap">
              <button
                className="inline-flex items-center gap-1.5 sm:gap-2 h-[34px] sm:h-[46px] px-3 sm:px-5 text-[12px] sm:text-[15px] font-semibold text-[#4079ED] border border-[#3D8BFF] rounded-lg hover:bg-[#EEF4FF] transition-colors whitespace-nowrap justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(64, 121, 237, 0.17)" }}
                onClick={() => setIsFiltersPanelOpen(true)}
              >
                Filters
              </button>

              {/* YEAR */}
              <div className="relative flex-shrink-0">
                <button
                  className={"inline-flex items-center gap-1.5 sm:gap-2 h-[34px] sm:h-[46px] px-3 sm:px-5 text-[12px] sm:text-[15px] font-medium border border-[#3D8BFF] rounded-lg bg-white transition-colors whitespace-nowrap justify-center flex-shrink-0 " + (openFilter === "year" ? "border-[#4079ED] bg-[#EEF4FF]" : "hover:border-[#4079ED]") + " " + (minYear || maxYear ? "bg-[#EEF4FF] border-[#4079ED] text-[#4079ED]" : "text-gray-900")}
                  onClick={() => toggleFilter("year")}
                >
                  <span>{minYear || maxYear ? (minYear || "...") + " - " + (maxYear || "...") : "Year"}</span>
                  <IconChevron size={12} />
                </button>
                {openFilter === "year" && (
                  <>
                    {/* Mobile: bottom sheet */}
                    <div className="sm:hidden fixed inset-0 z-[100] flex flex-col justify-end">
                      <div className="absolute inset-0 bg-black/40" onClick={() => setOpenFilter(null)} />
                      <div className="relative bg-white rounded-t-[20px] px-4 pb-5 pt-3 animate-[slideUp_0.25s_ease-out]">
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
                        <h3 className="text-[15px] font-bold text-gray-900 mb-3">Select Year Range</h3>
                        <div className="flex items-center gap-2">
                          <input type="text" inputMode="numeric" className="flex-1 min-w-0 h-[42px] px-3 text-[14px] border border-[#D1D5DB] rounded-lg bg-[#F9FAFB] focus:outline-none focus:border-[#4079ED] focus:bg-white" placeholder="Min Year" value={minYear} onChange={(e) => setMinYear(e.target.value)} />
                          <span className="text-xs font-medium text-[#9CA3AF] flex-shrink-0">To</span>
                          <input type="text" inputMode="numeric" className="flex-1 min-w-0 h-[42px] px-3 text-[14px] border border-[#D1D5DB] rounded-lg bg-[#F9FAFB] focus:outline-none focus:border-[#4079ED] focus:bg-white" placeholder="Max Year" value={maxYear} onChange={(e) => setMaxYear(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <button className="text-sm font-semibold text-[#4079ED] hover:underline" onClick={() => { setMinYear(""); setMaxYear(""); }}>Clear</button>
                          <button className="h-10 px-8 text-sm font-semibold text-white bg-[#4079ED] rounded-full hover:bg-[#2a5fd4] transition-colors" onClick={() => setOpenFilter(null)}>Apply</button>
                        </div>
                      </div>
                    </div>
                    {/* Desktop: absolute dropdown */}
                    <div className="hidden sm:block absolute top-[calc(100%+8px)] left-0 z-[100] bg-white border border-[#E5E7EB] rounded-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-5 min-w-[310px] animate-[fdIn_0.15s_ease]">
                      <div className="flex items-center gap-3">
                        <input type="text" className="flex-1 h-[44px] px-3.5 text-sm border border-[#D1D5DB] rounded-[10px] bg-[#F9FAFB] focus:outline-none focus:border-[#4079ED] focus:bg-white" placeholder="Min. Year" value={minYear} onChange={(e) => setMinYear(e.target.value)} />
                        <span className="text-sm font-medium text-[#9CA3AF]">To</span>
                        <input type="text" className="flex-1 h-[44px] px-3.5 text-sm border border-[#D1D5DB] rounded-[10px] bg-[#F9FAFB] focus:outline-none focus:border-[#4079ED] focus:bg-white" placeholder="Max. Year" value={maxYear} onChange={(e) => setMaxYear(e.target.value)} />
                      </div>
                      <div className="flex items-center justify-between mt-[18px]">
                        <button className="text-sm font-semibold text-[#4079ED] hover:underline" onClick={() => { setMinYear(""); setMaxYear(""); }}>Clear</button>
                        <button className="h-10 px-8 text-sm font-semibold text-white bg-[#4079ED] rounded-full hover:bg-[#2a5fd4] transition-colors" onClick={() => setOpenFilter(null)}>Apply</button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* MAKE */}
              <div className="relative flex-shrink-0">
                <button
                  className={"inline-flex items-center gap-1.5 sm:gap-2 h-[34px] sm:h-[46px] px-3 sm:px-5 text-[12px] sm:text-[15px] font-medium border border-[#3D8BFF] rounded-lg bg-white transition-colors whitespace-nowrap justify-center flex-shrink-0 " + (openFilter === "make" ? "border-[#4079ED] bg-[#EEF4FF]" : "hover:border-[#4079ED]") + " " + (selectedMake ? "bg-[#EEF4FF] border-[#4079ED] text-[#4079ED]" : "text-gray-900")}
                  onClick={() => toggleFilter("make")}
                >
                  <span>{selectedMake || "Make"}</span>
                  <IconChevron size={12} />
                </button>
                {openFilter === "make" && (
                  <>
                    {/* Mobile: bottom sheet */}
                    <div className="sm:hidden fixed inset-0 z-[100] flex flex-col justify-end">
                      <div className="absolute inset-0 bg-black/40" onClick={() => setOpenFilter(null)} />
                      <div className="relative bg-white rounded-t-[20px] pt-3 animate-[slideUp_0.25s_ease-out] max-h-[70vh] flex flex-col">
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
                        <h3 className="text-[15px] font-bold text-gray-900 mb-3 px-4">Select Make</h3>
                        <div className="overflow-y-auto flex-1 pb-4">
                          {MAKES.map((m) => (
                            <button
                              key={m}
                              className={"block w-full text-left px-5 py-3.5 text-[15px] font-medium transition-colors " + (selectedMake === m ? "bg-[#EEF4FF] text-[#4079ED] font-bold" : "hover:bg-[#F0F5FF]")}
                              onClick={() => {
                                if (selectedMake === m) {
                                  setSelectedMake(null);
                                  setSelectedCar(mockCars[0]);
                                } else {
                                  setSelectedMake(m);
                                  const first = mockCars.find((c) => c.make === m);
                                  if (first) setSelectedCar(first);
                                }
                                setOpenFilter(null);
                              }}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Desktop: absolute dropdown */}
                    <div className="hidden sm:block absolute top-[calc(100%+8px)] left-0 z-[100] bg-white border border-[#E5E7EB] rounded-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-h-[320px] overflow-y-auto py-1.5 min-w-[220px] animate-[fdIn_0.15s_ease]">
                      {MAKES.map((m) => (
                        <button
                          key={m}
                          className={"block w-full text-left px-5 py-3 text-[15px] font-medium transition-colors " + (selectedMake === m ? "bg-[#EEF4FF] text-[#4079ED] font-bold" : "hover:bg-[#F0F5FF]")}
                          onClick={() => {
                            if (selectedMake === m) {
                              setSelectedMake(null);
                              setSelectedCar(mockCars[0]);
                            } else {
                              setSelectedMake(m);
                              const first = mockCars.find((c) => c.make === m);
                              if (first) setSelectedCar(first);
                            }
                            setOpenFilter(null);
                          }}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* PRICE */}
              <div className="relative flex-shrink-0">
                <button
                  className={"inline-flex items-center gap-1.5 sm:gap-2 h-[34px] sm:h-[46px] px-3 sm:px-5 text-[12px] sm:text-[15px] font-medium border border-[#3D8BFF] rounded-lg bg-white transition-colors whitespace-nowrap justify-center flex-shrink-0 " + (openFilter === "price" ? "border-[#4079ED] bg-[#EEF4FF]" : "hover:border-[#4079ED]") + " " + (minPrice || maxPrice ? "bg-[#EEF4FF] border-[#4079ED] text-[#4079ED]" : "text-gray-900")}
                  onClick={() => toggleFilter("price")}
                >
                  <span>{minPrice || maxPrice ? "$" + (minPrice || "...") + " - $" + (maxPrice || "...") : "Price"}</span>
                  <IconChevron size={12} />
                </button>
                {openFilter === "price" && (
                  <>
                    {/* Mobile: bottom sheet */}
                    <div className="sm:hidden fixed inset-0 z-[100] flex flex-col justify-end">
                      <div className="absolute inset-0 bg-black/40" onClick={() => setOpenFilter(null)} />
                      <div className="relative bg-white rounded-t-[20px] px-4 pb-5 pt-3 animate-[slideUp_0.25s_ease-out]">
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
                        <h3 className="text-[15px] font-bold text-gray-900 mb-3">Select Price Range</h3>
                        <div className="flex items-center gap-2">
                          <input type="text" inputMode="numeric" className="flex-1 min-w-0 h-[42px] px-3 text-[14px] border border-[#D1D5DB] rounded-xl bg-[#F9FAFB] focus:outline-none focus:border-[#4079ED] focus:bg-white" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                          <span className="text-xs font-medium text-[#9CA3AF]">To</span>
                          <input type="text" inputMode="numeric" className="flex-1 min-w-0 h-[42px] px-3 text-[14px] border border-[#D1D5DB] rounded-xl bg-[#F9FAFB] focus:outline-none focus:border-[#4079ED] focus:bg-white" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <button className="text-sm font-semibold text-[#4079ED] hover:underline" onClick={() => { setMinPrice(""); setMaxPrice(""); }}>Clear</button>
                          <button className="h-10 px-8 text-sm font-semibold text-white bg-[#4079ED] rounded-full hover:bg-[#2a5fd4] transition-colors" onClick={() => setOpenFilter(null)}>Apply</button>
                        </div>
                      </div>
                    </div>
                    {/* Desktop: absolute dropdown */}
                    <div className="hidden sm:block absolute top-[calc(100%+8px)] left-0 z-[100] bg-white border border-[#E5E7EB] rounded-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-5 min-w-[310px] animate-[fdIn_0.15s_ease]">
                      <div className="flex items-center gap-3">
                        <input type="text" className="flex-1 h-[44px] px-3.5 text-sm border border-[#D1D5DB] rounded-[10px] bg-[#F9FAFB] focus:outline-none focus:border-[#4079ED] focus:bg-white" placeholder="Min. Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        <span className="text-sm font-medium text-[#9CA3AF]">To</span>
                        <input type="text" className="flex-1 h-[44px] px-3.5 text-sm border border-[#D1D5DB] rounded-[10px] bg-[#F9FAFB] focus:outline-none focus:border-[#4079ED] focus:bg-white" placeholder="Max. Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                      </div>
                      <div className="flex items-center justify-between mt-[18px]">
                        <button className="text-sm font-semibold text-[#4079ED] hover:underline" onClick={() => { setMinPrice(""); setMaxPrice(""); }}>Clear</button>
                        <button className="h-10 px-8 text-sm font-semibold text-white bg-[#4079ED] rounded-full hover:bg-[#2a5fd4] transition-colors" onClick={() => setOpenFilter(null)}>Apply</button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="hidden lg:flex items-center flex-1" style={{ marginLeft: "16px" }}>
                <div className="relative w-full">
                  <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4079ED]" />
                  <input type="text" className="w-full py-3 pl-[42px] pr-4 text-sm bg-[#F3F4F6] rounded-lg border-none focus:outline-none focus:bg-white" placeholder="Search here..." aria-label="Search cars" />
                </div>
              </div>
            </div>

            <div className="lg:hidden mt-2 sm:mt-3">
              <div className="relative w-full">
                <IconSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#4079ED]" />
                <input type="text" className="w-full py-2.5 sm:py-3 pl-[36px] sm:pl-[42px] pr-4 text-sm bg-[#F3F4F6] rounded-lg border-none focus:outline-none focus:bg-white" placeholder="Search here..." aria-label="Search cars" />
              </div>
            </div>
          </div>
        </div>

        {/* Click-away overlay */}
        {openFilter && (
          <div className="fixed inset-0 z-[99]" onClick={() => setOpenFilter(null)} />
        )}

        {/* PAGE BODY */}
        <main className="mx-auto px-3 sm:px-8 lg:px-[120px] py-4 sm:py-6" style={{ maxWidth: "1600px" }}>
          <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <span>Home &gt; </span>
            <Link href="#" className="text-[#1a6adb] hover:underline font-medium">Cars for Sale in Canada</Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT: LISTINGS */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                    {sortedCars.length.toLocaleString()} Cars for Sale in Canada
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500">Location &gt; Canada</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-full hover:border-blue-600 transition-colors bg-white"
                  >
                    Sort {sortOption}
                    <IconChevron size={10} />
                  </button>
                  {showSortDropdown && (
                    <>
                      <div className="fixed inset-0 z-[199]" onClick={() => setShowSortDropdown(false)} />
                      <div className="absolute right-0 top-full mt-2 z-[200] w-[230px] bg-white rounded-xl border border-gray-200 shadow-lg py-1.5 overflow-hidden">
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => { setSortOption(opt); setShowSortDropdown(false); }}
                            className={"w-full text-left px-4 py-2.5 text-sm transition-colors " + (sortOption === opt ? "bg-[#1a6adb] text-white font-semibold" : "text-gray-700 hover:bg-gray-50")}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4" id="car-listings" aria-label="Car listings">
                {sortedCars.map((car) => (
                  <div
                    key={car.id}
                    className={"bg-white rounded-[14px] overflow-hidden flex flex-col cursor-pointer transition-all duration-200 border border-[#3D8BFF] " + (selectedCar.id === car.id ? "ring-2 ring-[#1a6adb] shadow-lg" : "")}
                    style={{ boxShadow: "-3px 3px 8px rgba(26, 106, 219, 0.2)" }}
                    onClick={() => {
                      setSelectedCar(car);
                      setShowForm(false);
                      if (window.innerWidth < 1024) {
                        setIsMobileDetailView(true);
                        window.scrollTo(0, 0);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={"View " + car.title}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedCar(car)}
                  >
                    {/* Card Image */}
                    <div className="relative w-full bg-white overflow-hidden group/card" style={{ aspectRatio: "356/225", borderBottom: "0.65px solid #E3E3E3" }}>
                      {car.noAccident && (
                        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 text-[10px] sm:text-[10px] font-semibold italic text-[#199121]">
                          <IconCheck className="w-4 h-4" />
                          No accident
                        </div>
                      )}
                      <img
                        src={CAR_IMGS[(cardImageIndices[car.id] || 0) % CAR_IMGS.length]}
                        alt={car.title}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-3 sm:p-2.5 pb-4 sm:pb-3.5 flex flex-col flex-1">
                      <h2 className="text-[16px] sm:text-[13px] font-bold text-black mb-1.5 sm:mb-1.5">{car.title}</h2>
                      <div className="flex items-center gap-2 sm:gap-1.5 text-[11px] sm:text-[9px] font-semibold text-black mb-2 sm:mb-2 pb-2 sm:pb-2" style={{ borderBottom: "1px solid #E3E3E3", marginLeft: "-12px", marginRight: "-12px", paddingLeft: "12px", paddingRight: "12px" }}>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <IconSpeed />
                          {car.mileage}
                        </span>
                        <span className="text-gray-200 font-light">|</span>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <IconPrice />
                          {car.priceStatus}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-[9px] text-[#595959] mb-2 sm:mb-2 line-clamp-2" style={{ lineHeight: 1.6 }}>{car.desc}</p>
                      <div className="mt-auto flex items-center justify-between gap-1">
                        <div className="flex flex-col gap-1 sm:gap-1 min-w-0">
                          <span className="text-[16px] sm:text-[14px] font-extrabold text-gray-900" style={{ filter: "blur(5.8px)", userSelect: "none", opacity: 0.85, lineHeight: 1 }}>
                            {car.oldPrice}
                          </span>
                          <span className="flex items-end gap-1 sm:gap-1" style={{ lineHeight: 1 }}>
                            <span className="text-[9px] sm:text-[7px] font-semibold text-[#595959]" style={{ filter: "blur(2px)", userSelect: "none", opacity: 0.85, whiteSpace: "nowrap" }}>
                              {car.biWeekly} /biweekly
                            </span>
                            <span className="text-[10px] sm:text-[8px] font-semibold text-black" style={{ whiteSpace: "nowrap" }}>{car.down}</span>
                          </span>
                        </div>
                        <button
                          className="px-4 sm:px-3.5 py-2 sm:py-1.5 text-[12px] sm:text-[11.5px] font-semibold text-white bg-[#3B82F6] rounded-full hover:bg-blue-700 transition-colors flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCar(car);
                            setShowForm(false);
                            if (window.innerWidth < 1024) {
                              setIsMobileDetailView(true);
                              window.scrollTo(0, 0);
                            }
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: DETAIL PANEL */}
            <aside className="hidden lg:block w-[480px] flex-shrink-0" aria-label="Car detail panel">
              <div className="sticky top-[20px] bg-white rounded-2xl overflow-hidden shadow-sm overflow-y-auto max-h-[calc(100vh-40px)] border-2 border-[#1a6adb]">
                {/* Hero Image Carousel */}
                <div className="relative bg-white group/detail"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={createTouchEndHandler(setDetailImageIndex, CAR_IMGS.length)}
                >
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-white text-green-600 text-xs font-medium rounded-full shadow-sm">
                    <IconCheck className="w-4 h-4" />
                    No accident
                  </div>
                  <img
                    src={CAR_IMGS[detailImageIndex % CAR_IMGS.length]}
                    alt={selectedCar.title}
                    className="w-full h-[280px] object-cover transition-opacity duration-300"
                  />
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-[#1a6adb] hover:bg-[#1558b4] rounded-full flex items-center justify-center shadow-md transition-colors duration-200"
                    onClick={() => setDetailImageIndex((prev) => (prev - 1 + CAR_IMGS.length) % CAR_IMGS.length)}
                    aria-label="Previous image"
                  >
                    <IconChevronLeft size={18} className="text-white" />
                  </button>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-[#1a6adb] hover:bg-[#1558b4] rounded-full flex items-center justify-center shadow-md transition-colors duration-200"
                    onClick={() => setDetailImageIndex((prev) => (prev + 1) % CAR_IMGS.length)}
                    aria-label="Next image"
                  >
                    <IconChevronRight size={18} className="text-white" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                    {[0, 1, 2, 3, 4].map((dotIdx) => (
                      <button
                        key={dotIdx}
                        className={"rounded-full transition-all duration-200 " + (detailImageIndex % 5 === dotIdx ? "bg-[#1a6adb] w-2.5 h-2.5" : "bg-white/70 w-2 h-2 hover:bg-white")}
                        onClick={() => setDetailImageIndex(dotIdx % CAR_IMGS.length)}
                        aria-label={"View image " + (dotIdx + 1)}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-2 px-6 py-3">
                  {CAR_IMGS.concat(CAR_IMGS.slice(0, 2)).slice(0, 5).map((img, idx) => (
                    <div
                      key={idx}
                      className={"w-1/5 aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-colors " + (detailImageIndex === idx % CAR_IMGS.length ? "border-[#1a6adb]" : "border-transparent hover:border-[#1a6adb]")}
                      onClick={() => setDetailImageIndex(idx % CAR_IMGS.length)}
                    >
                      <img src={img} alt={"Thumb " + (idx + 1)} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                <div className="px-6 pb-6">
                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-6">
                    <button className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-[#1a6adb] rounded-full hover:bg-blue-700 transition-colors" onClick={() => setIsAvailabilityModalOpen(true)}>
                      Check availability
                    </button>
                    <button onClick={() => router.push("/checkout")} className="flex-1 px-4 py-3 text-sm font-semibold text-[#1a6adb] border-2 border-[#1a6adb] rounded-full hover:bg-blue-50 transition-colors">
                      Get Approved
                    </button>
                  </div>

                  {/* Car Info */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedCar.title}</h2>
                  <div className="flex items-center gap-3 text-sm mb-5">
                    <span className="flex items-center gap-1 text-gray-600"><IconSpeed />{selectedCar.mileage}</span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1 text-[#1a6adb] font-medium"><IconPrice />{selectedCar.priceStatus}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">{selectedCar.desc}</p>

                  {/* Overview */}
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
                  <div className="grid grid-cols-2 gap-0 mb-6">
                    {[
                      { label: "Mileage", val: "14,563 km" },
                      { label: "Condition", val: "Used" },
                      { label: "Drive Train", val: "-" },
                      { label: "Transmission", val: "Automatic" },
                      { label: "Passengers", val: "5" },
                      { label: "Engine", val: "1.5L 4-Cyl" },
                      { label: "Fuel Type", val: "Gasoline" },
                      { label: "Stock Number", val: "T-OPDIKE" },
                    ].map((item, idx) => (
                      <div key={item.label} className={"py-3 " + (idx < 6 ? "border-b border-gray-100" : "")}>
                        <div className="text-sm font-bold text-gray-900">{item.val}</div>
                        <div className="text-xs text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    The 2025 GMC Terrain Elevation AWD delivers a fresh take on the compact SUV, combining bold design, intelligent technology, and versatile capability in a package that feels modern, confident, and distinctly upscale. With its sleek profile and athletic stance, this Terrain makes a statement from the moment you see it.
                  </p>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">Options</h3>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {features.map((feat) => (
                      <div key={feat} className="px-4 py-3 text-sm text-gray-700 bg-[#f0f4ff] rounded-xl border border-[#e0e7ff]">{feat}</div>
                    ))}
                  </div>

                  {/* Get Details Form */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Get Details</h3>
                  <p className="text-sm text-gray-600 mb-4">Please fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                  <form onSubmit={handleDetailFormSubmit} noValidate className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input name="firstName" value={detailForm.firstName} onChange={handleDetailFormChange} onBlur={handleDetailFormBlur} className={`w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none ${inputBorderClass(detailFormErrors.firstName)}`} placeholder="First Name *" type="text" />
                        <FieldError error={detailFormErrors.firstName} />
                      </div>
                      <div>
                        <input name="lastName" value={detailForm.lastName} onChange={handleDetailFormChange} onBlur={handleDetailFormBlur} className={`w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none ${inputBorderClass(detailFormErrors.lastName)}`} placeholder="Last Name *" type="text" />
                        <FieldError error={detailFormErrors.lastName} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input name="email" value={detailForm.email} onChange={handleDetailFormChange} onBlur={handleDetailFormBlur} className={`w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none ${inputBorderClass(detailFormErrors.email)}`} placeholder="E-mail *" type="email" />
                        <FieldError error={detailFormErrors.email} />
                      </div>
                      <div>
                        <input name="phone" value={detailForm.phone} onChange={handleDetailFormChange} onBlur={handleDetailFormBlur} className={`w-full px-3 py-2.5 text-sm rounded-lg focus:outline-none ${inputBorderClass(detailFormErrors.phone)}`} placeholder="Phone Number *" type="tel" />
                        <FieldError error={detailFormErrors.phone} />
                      </div>
                    </div>
                    <textarea name="comment" value={detailForm.comment} onChange={handleDetailFormChange} className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a6adb]" placeholder="Comment" rows={3} />
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" name="hasTradeIn" checked={detailForm.hasTradeIn} onChange={handleDetailFormChange} className="w-4 h-4 text-[#1a6adb] rounded" />
                      Do you have a trade in?
                    </label>
                    <button type="submit" disabled={detailFormSubmitting} className="w-full px-4 py-3 text-sm font-medium text-white bg-[#1a6adb] rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60">
                      {detailFormSubmitting ? "Sending..." : "Send Message"}
                    </button>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      By submitting this form, I acknowledge that I accept and agree to be bound by the Terms and Conditions of cars.ca and further acknowledge that any personal information I may provide to cars.ca will be handled in accordance with the Privacy Policy. I further agree to receive communications from cars.ca or sellers of motor vehicles advertised on cars.ca. I understand that I can unsubscribe from receiving such communication at any time.
                      <br /><br />
                      This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                      <br /><br />
                      *Prices listed exclude taxes, licensing fees, and other applicable charges.
                      <br /><br />
                      While we strive to provide accurate and up-to-date information, we recommend that you verify the details of any listing directly with the seller. Cars.ca is not responsible for any discrepancies or inaccuracies in the information provided.
                    </p>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* MOBILE DETAIL OVERLAY */}
        {isMobileDetailView && (
          <div className="lg:hidden fixed left-0 right-0 bottom-0 z-[99] bg-white flex flex-col" style={{ top: headerHeight + 'px' }}>
            {/* Back to search bar — sits right below navbar */}
            <div className="flex-shrink-0 bg-white shadow-sm flex items-center h-[48px] px-4 border-b border-gray-100">
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700" onClick={() => setIsMobileDetailView(false)}>
                <IconChevronLeft size={18} className="text-gray-500" /> <span>Back to search</span>
              </button>
            </div>
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
            <div className="p-4">

              <div className="relative mb-4 bg-white rounded-xl overflow-hidden group/mobile"
                onTouchStart={handleTouchStart}
                onTouchEnd={createTouchEndHandler(setMobileDetailImageIndex, CAR_IMGS.length)}
              >
                <div className="flex items-center justify-between absolute top-3 left-3 right-3 z-10">
                  {selectedCar.noAccident && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-green-600 text-xs font-semibold rounded-full shadow-sm backdrop-blur-sm">
                      <IconCheck className="w-4 h-4" /> No accident
                    </span>
                  )}
                  <button className="ml-auto p-2.5 bg-white rounded-full shadow-md"><IconHeart className="text-gray-400" /></button>
                </div>
                <img
                  src={CAR_IMGS[mobileDetailImageIndex % CAR_IMGS.length]}
                  alt={selectedCar.title}
                  className="w-full h-[280px] object-cover transition-opacity duration-300"
                />
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-[#1a6adb] hover:bg-[#1558b4] rounded-full flex items-center justify-center shadow-md transition-colors"
                  onClick={() => setMobileDetailImageIndex((prev) => (prev - 1 + CAR_IMGS.length) % CAR_IMGS.length)}
                  aria-label="Previous image"
                >
                  <IconChevronLeft size={18} className="text-white" />
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-[#1a6adb] hover:bg-[#1558b4] rounded-full flex items-center justify-center shadow-md transition-colors"
                  onClick={() => setMobileDetailImageIndex((prev) => (prev + 1) % CAR_IMGS.length)}
                  aria-label="Next image"
                >
                  <IconChevronRight size={18} className="text-white" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                  {CAR_IMGS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      className={"rounded-full transition-all duration-200 " + (mobileDetailImageIndex === dotIdx ? "bg-[#3B82F6] w-2.5 h-2.5" : "bg-white/70 hover:bg-white w-2 h-2")}
                      onClick={() => setMobileDetailImageIndex(dotIdx)}
                      aria-label={"View image " + (dotIdx + 1)}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 px-4 py-3.5 text-sm font-semibold text-white bg-[#1a6adb] rounded-full hover:bg-blue-700 transition-colors" onClick={() => setIsAvailabilityModalOpen(true)}>Check availability</button>
                <button className="flex-1 px-4 py-3.5 text-sm font-semibold text-[#1a6adb] border-2 border-[#1a6adb] rounded-full hover:bg-blue-50 transition-colors" onClick={() => router.push("/checkout")}>Get Approved</button>
              </div>

              {/* Title */}
              <h1 className="text-[22px] font-bold text-gray-900 mb-3">{selectedCar.title}</h1>

              {/* Mileage + Price Status */}
              <div className="flex items-center gap-3 text-sm mb-4 pb-4 border-b border-gray-100">
                <span className="flex items-center gap-1.5 text-gray-700 font-medium"><IconSpeed /> {selectedCar.mileage}</span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5 text-[#1a6adb] font-semibold"><IconPrice /> {selectedCar.priceStatus}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">{selectedCar.desc}</p>

              {/* Overview */}
              <h3 className="text-base font-bold text-gray-900 mb-4">Overview</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
                <div><div className="text-[#1a6adb] text-sm font-semibold">Clean CARFAX</div><div className="text-[#1a6adb] text-sm">No Accident</div></div>
                <div><div className="text-sm font-semibold text-gray-900">14,563 km</div><div className="text-xs text-gray-400 mt-0.5">Mileage</div></div>
                <div><div className="text-sm font-semibold text-gray-900">Used</div><div className="text-xs text-gray-400 mt-0.5">Condition</div></div>
                <div><div className="text-sm font-semibold text-gray-900">-</div><div className="text-xs text-gray-400 mt-0.5">Drive Train</div></div>
                <div><div className="text-sm font-semibold text-gray-900">Automatic</div><div className="text-xs text-gray-400 mt-0.5">Transmission</div></div>
                <div><div className="text-sm font-semibold text-gray-900">5</div><div className="text-xs text-gray-400 mt-0.5">Passengers</div></div>
                <div><div className="text-sm font-semibold text-gray-900">1.5L 4- Cyl</div><div className="text-xs text-gray-400 mt-0.5">Stock Number</div></div>
                <div><div className="text-sm font-semibold text-gray-900">Gasoline</div><div className="text-xs text-gray-400 mt-0.5">Fuel Type</div></div>
                <div><div className="text-sm font-semibold text-gray-900">T-OPDIKE</div><div className="text-xs text-gray-400 mt-0.5">Stock Number</div></div>
              </div>

              {/* Description */}
              <h3 className="text-base font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                The 2025 GMC Terrain Elevation AWD delivers a fresh take on the compact SUV, combining bold design, intelligent technology, and versatile capability in a package that feels modern, confident, and distinctly upscale. With its sleek profile and athletic stance, this Terrain makes a statement from the moment you see it.
              </p>

              {/* Options */}
              <h3 className="text-base font-bold text-gray-900 mb-3">Options</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {features.map((f) => (
                  <div key={f} className="px-4 py-2.5 text-sm text-gray-700 bg-[#f0f4ff] rounded-xl border border-[#e0e7ff]">{f}</div>
                ))}
              </div>

              {/* Get Details Form */}
              <h3 className="text-base font-bold text-gray-900 mb-3">Get Details</h3>
              <form onSubmit={handleDetailFormSubmit} noValidate className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input name="firstName" value={detailForm.firstName} onChange={handleDetailFormChange} onBlur={handleDetailFormBlur} className={`w-full px-3 py-3 text-sm rounded-lg focus:outline-none bg-white ${inputBorderClass(detailFormErrors.firstName)}`} placeholder="First Name *" />
                    <FieldError error={detailFormErrors.firstName} />
                  </div>
                  <div>
                    <input name="lastName" value={detailForm.lastName} onChange={handleDetailFormChange} onBlur={handleDetailFormBlur} className={`w-full px-3 py-3 text-sm rounded-lg focus:outline-none bg-white ${inputBorderClass(detailFormErrors.lastName)}`} placeholder="Last Name *" />
                    <FieldError error={detailFormErrors.lastName} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input name="email" value={detailForm.email} onChange={handleDetailFormChange} onBlur={handleDetailFormBlur} className={`w-full px-3 py-3 text-sm rounded-lg focus:outline-none bg-white ${inputBorderClass(detailFormErrors.email)}`} placeholder="E-mail *" type="email" />
                    <FieldError error={detailFormErrors.email} />
                  </div>
                  <div>
                    <input name="phone" value={detailForm.phone} onChange={handleDetailFormChange} onBlur={handleDetailFormBlur} className={`w-full px-3 py-3 text-sm rounded-lg focus:outline-none bg-white ${inputBorderClass(detailFormErrors.phone)}`} placeholder="Phone Number *" type="tel" />
                    <FieldError error={detailFormErrors.phone} />
                  </div>
                </div>
                <textarea name="comment" value={detailForm.comment} onChange={handleDetailFormChange} className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a6adb] bg-white" placeholder="Comment" rows={3} />
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" name="hasTradeIn" checked={detailForm.hasTradeIn} onChange={handleDetailFormChange} className="w-4 h-4 text-[#1a6adb] rounded border-gray-300" />
                  Do you have a trade in?
                </label>
                <button type="submit" disabled={detailFormSubmitting} className="w-full px-4 py-3.5 text-sm font-semibold text-white bg-[#1a6adb] rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60">
                  {detailFormSubmitting ? "Sending..." : "Send Message"}
                </button>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  By submitting this form, I acknowledge that I accept and agree to be bound by the <span className="text-[#1a6adb] underline">Terms and Conditions</span> of cars.ca and further acknowledge that any personal information I may provide to cars.ca will be handled in accordance with the <span className="text-[#1a6adb] underline">Privacy Policy</span>. I further agree to receive communications from cars.ca or sellers of motor vehicles advertised on cars.ca. I understand that I can unsubscribe from receiving such communication at any time.
                  <br /><br />
                  This site is protected by reCAPTCHA and the Google <span className="text-[#1a6adb] underline">Privacy Policy</span> and <span className="text-[#1a6adb] underline">Terms of Service</span> apply.
                  <br /><br />
                  *Prices listed exclude taxes, licensing fees, and other applicable charges.
                  <br /><br />
                  While we strive to provide accurate and up-to-date information, we recommend that you verify the details of any listing directly with the
                </p>
              </form>
            </div>

            {/* Minimal Footer */}
            <div className="w-full bg-white border-t border-gray-100 px-6 py-5">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Copyright © 2025 Autobon. All rights reserved. Autobon® and the Autobon Logo design are registered trademarks.
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-[10px] text-gray-400 mt-3 font-medium uppercase">
                  <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                  <span>|</span>
                  <Link href="/terms-of-use" className="hover:text-blue-600 transition-colors">Legal Agreements</Link>
                  <span>|</span>
                  <Link href="/website-terms" className="hover:text-blue-600 transition-colors">Website Terms</Link>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 justify-center">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                  className="h-7"
                  alt="Google Logo"
                />
                <div className="flex flex-col items-center">
                  <div className="text-[#1a6adb] text-2xl tracking-widest">★★★★★</div>
                  <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-tighter mt-0.5">
                    Over 2500 5 Star Reviews
                  </p>
                </div>
              </div>
            </div>

            </div>
          </div>
        )}

        {/* FILTERS SIDE PANEL */}
        {isFiltersPanelOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-[200] transition-opacity" onClick={() => setIsFiltersPanelOpen(false)} />
            <div
              className="fixed inset-y-0 right-0 w-full sm:max-w-[320px] bg-white z-[201] flex flex-col shadow-[-8px_0_32px_rgba(0,0,0,0.12)]"
              style={{ animation: "slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <IconMenu className="text-gray-700" />
                  <span className="text-lg font-bold text-gray-900">Filters</span>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsFiltersPanelOpen(false)}>
                  <IconX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Scrollable Filter Content */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {/* Year */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-gray-900">Year</span>
                    <IconChevron className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpMinYear} onChange={(e) => setFpMinYear(e.target.value)}>
                        <option>Min. Year</option>
                        {FP_YEARS.map((y) => (<option key={"min-" + y} value={y}>{y}</option>))}
                      </select>
                      <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">To</span>
                    <div className="relative flex-1">
                      <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpMaxYear} onChange={(e) => setFpMaxYear(e.target.value)}>
                        <option>Max. Year</option>
                        {FP_YEARS.map((y) => (<option key={"max-" + y} value={y}>{y}</option>))}
                      </select>
                      <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Make */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-gray-900">Make</span>
                    <IconChevron className="text-gray-400" />
                  </div>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpMake} onChange={(e) => { setFpMake(e.target.value); setSelectedMake(e.target.value === "All Makes" ? null : e.target.value); }}>
                      {FP_MAKES.map((m) => (<option key={m} value={m}>{m}</option>))}
                    </select>
                    <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Model */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-gray-900">Model</span>
                    <IconChevron className="text-gray-400" />
                  </div>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpModel} onChange={(e) => setFpModel(e.target.value)}>
                      {FP_MODELS.map((m) => (<option key={m} value={m}>{m}</option>))}
                    </select>
                    <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Trim */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-gray-900">Trim</span>
                    <IconChevron className="text-gray-400" />
                  </div>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpTrim} onChange={(e) => setFpTrim(e.target.value)}>
                      {FP_TRIMS.map((t) => (<option key={t} value={t}>{t}</option>))}
                    </select>
                    <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-gray-900">Price</span>
                    <IconChevron className="text-gray-400" />
                  </div>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpMaxPrice} onChange={(e) => setFpMaxPrice(e.target.value)}>
                      {FP_PRICES.map((p) => (<option key={p} value={p}>{p}</option>))}
                    </select>
                    <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Price Rating */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-gray-900">Price Rating</span>
                    <IconChevron className="text-gray-400" />
                  </div>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpPriceRating} onChange={(e) => setFpPriceRating(e.target.value)}>
                      {FP_RATINGS.map((r) => (<option key={r} value={r}>{r}</option>))}
                    </select>
                    <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-gray-900">Condition</span>
                    <IconChevron className="text-gray-400" />
                  </div>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpCondition} onChange={(e) => setFpCondition(e.target.value)}>
                      {FP_CONDITIONS.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                    <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Body Type */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-gray-900">Body Type</span>
                    <IconChevron className="text-gray-400" />
                  </div>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpBodyType} onChange={(e) => setFpBodyType(e.target.value)}>
                      {FP_BODY_TYPES.map((b) => (<option key={b} value={b}>{b}</option>))}
                    </select>
                    <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Color */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-gray-900">Color</span>
                    <IconChevron className="text-gray-400" />
                  </div>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-700" value={fpColor} onChange={(e) => setFpColor(e.target.value)}>
                      {FP_COLORS.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                    <IconChevron className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                <button className="text-sm font-semibold text-[#4079ED] hover:underline" onClick={clearAllFilters}>Clear All</button>
                <button className="px-8 py-2.5 text-sm font-semibold text-white bg-[#3B82F6] rounded-full hover:bg-[#2563EB] transition-colors" onClick={() => setIsFiltersPanelOpen(false)}>
                  Show {filteredCars.length} results
                </button>
              </div>
            </div>
          </>
        )}
        <CheckAvailabilityModal
          isOpen={isAvailabilityModalOpen}
          onClose={() => setIsAvailabilityModalOpen(false)}
          carTitle={selectedCar.title}
        />
      </div>
    </>
  );
}
