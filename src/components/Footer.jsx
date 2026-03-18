"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Added for route detection
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();

  // Hide footer completely on admin dashboard routes
  const isAdminDashboard = pathname === "/admin-dashboard" || pathname.startsWith("/admin-dashboard/");
  if (isAdminDashboard) return null;

  // Show minimal footer on dashboard routes (same as pre-qualify)
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  const minimalFooterRoutes = [
    "/pre-qualify",
    "/checkout",
    "/finance-application",
    "/payment",
    "/finance-form",
  ];
  const isMinimal = minimalFooterRoutes.includes(pathname) || isDashboard;

  const [expandedSections, setExpandedSections] = useState({
    model: false,
    body: false,
    location: false,
    sell: false,
  });

  const allFooterData = {
    model: {
      initial: [
        "Honda Civic",
        "Toyota Corolla",
        "Hyundai Elantra",
        "Toyota RAV4",
        "Nissan Rogue",
        "Honda CR-V",
        "Tesla Model 3",
        "Mazda CX-5",
        "Kia Forte",
        "Toyota Camry",
        "Mazda Mazda3",
      ],
      extra1: [
        "Ford F-150",
        "Chevrolet Silverado",
        "BMW 3 Series",
        "Audi A4",
        "Mercedes-Benz C-Class",
        "Subaru Outback",
        "Jeep Wrangler",
        "Volkswagen Golf",
      ],
      extra2: [
        "Lexus RX",
        "Acura MDX",
        "Porsche 911",
        "Land Rover Range Rover",
        "Mini Cooper",
        "Chrysler Pacifica",
        "Genesis G70",
        "Ram 1500",
      ],
    },
    body: {
      initial: ["SUV", "Sedan", "Hatchback", "Wagon", "Truck", "Van"],
      extra1: ["Coupe", "Convertible", "Sports Car", "Minivan", "Crossover"],
      extra2: [
        "Luxury Sedan",
        "Electric Vehicle",
        "Hybrid",
        "Pickup Truck",
        "Compact Car",
      ],
    },
    location: {
      initial: [
        "Used Cars in Toronto, ON",
        "Used Cars in Brampton, ON",
        "Used Cars in Mississauga, ON",
        "Used Cars in Markham, ON",
        "Used Cars in Ottawa, ON",
        "Used Cars in Hamilton, ON",
      ],
      extra1: [
        "Used Cars in London, ON",
        "Used Cars in Oshawa, ON",
        "Used Cars in Kitchener, ON",
        "Used Cars in Newmarket, ON",
        "Used Cars in Windsor, ON",
        "Used Cars in Barrie, ON",
      ],
      extra2: [
        "Used Cars in Kingston, ON",
        "Used Cars in Guelph, ON",
        "Used Cars in Thunder Bay, ON",
        "Used Cars in Sudbury, ON",
        "Used Cars in Sarnia, ON",
        "Used Cars in Peterborough, ON",
      ],
    },
    sell: {
      initial: [
        "Sell My Car in Toronto",
        "Sell My Car in Mississauga",
        "Sell My Car in London",
        "Sell My Car in Ottawa",
      ],
      extra1: [
        "Sell My Car in Kitchener",
        "Sell My Car in Hamilton",
        "Sell My Car in Halifax",
        "Sell My Car in Vancouver",
      ],
      extra2: [
        "Sell My Car in Calgary",
        "Sell My Car in Edmonton",
        "Sell My Car in Winnipeg",
        "Sell My Car in Montreal",
      ],
    },
  };

  // Handle View More click
  const handleViewMore = (type) => {
    setExpandedSections((prev) => {
      const currentState = prev[type];
      if (!currentState) return { ...prev, [type]: 1 }; // Show first extra
      if (currentState === 1) return { ...prev, [type]: 2 }; // Show second extra
      return { ...prev, [type]: false }; // Collapse
    });
  };

  // Get links for a section based on expansion state
  const getLinksForSection = (type) => {
    const data = allFooterData[type];
    const expansionLevel = expandedSections[type];

    if (expansionLevel === 1) {
      return [...data.initial, ...data.extra1];
    } else if (expansionLevel === 2) {
      return [...data.initial, ...data.extra1, ...data.extra2];
    }
    return data.initial;
  };

  const footerSections = [
    {
      title: "Browse Popular Models",
      type: "model",
      getLinks: () => getLinksForSection("model"),
    },
    {
      title: "Browse by Body Style",
      type: "body",
      getLinks: () => getLinksForSection("body"),
    },
    {
      title: "Browse by Location",
      type: "location",
      getLinks: () => getLinksForSection("location"),
    },
    {
      title: "Sell My Car",
      type: "sell",
      getLinks: () => getLinksForSection("sell"),
    },
    {
      title: "Explore",
      type: "page",
      getLinks: () => [
        "Home",
        "Shop cars",
        "Sell or Trade",
        "Finance",
        "Get Pre-Approved",
        "FAQ",
      ],
    },
    {
      title: "Company",
      type: "page",
      getLinks: () => ["About AUTOBON"],
    },
    {
      title: "Contact Us",
      type: "contact",
      getLinks: () => [
        "Chat with us",
        "Call us at (905) 800-3100",
        "Email us at info@autobon.ca",
        "Any Car, Any Where",
      ],
    },
  ];

  const handleFaqClick = (e) => {
    if (window.location.pathname === "/finance") {
      e.preventDefault();
      const element = document.getElementById("faq");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Helper function to generate URLs
  const getHref = (link, type) => {
    if (link === "FAQ") return "/finance#faq";
    if (link === "View More" || link === "Shop cars") return "/shop";
    if (link === "Home") return "/";
    if (link === "About AUTOBON") return "/about-us";
    if (link === "Sell or Trade") return "/sell-or-trade";
    if (link === "Finance") return "/finance";
    if (link === "Get Pre-Approved") return "/pre-qualify";
    if (link === "Chat with us") return "#chatra";
    if (link === "Any Car, Any Where") return "/contact-us";
    if (link.startsWith("Call us")) return "tel:9058003100";
    if (link.startsWith("Email us")) return "mailto:info@autobon.ca";

    const query = encodeURIComponent(link);

    switch (type) {
      case "model":
        return `/shop?model=${query}`;
      case "body":
        return `/shop?body_style=${query}`;
      case "location": {
        // Extract city name from 'Used Cars in Toronto, ON' → 'Toronto'
        const cityMatch = link.match(/in\s+(.+?)(?:,|$)/);
        const city = cityMatch ? cityMatch[1].trim() : query;
        return `/shop?location=${encodeURIComponent(city)}`;
      }
      case "sell": {
        // Extract city from 'Sell My Car in Toronto' → link to sell page
        const sellCity = link.replace(/Sell My Car in\s*/i, "").trim();
        return `/sell-or-trade?city=${encodeURIComponent(sellCity)}`;
      }
      case "page":
        return `/${link.toLowerCase().replace(/\s+/g, "-")}`;
      default:
        return "#";
    }
  };

  // --- MINIMAL FOOTER RENDER ---
  if (isMinimal) {
    return (
      <footer className="w-full bg-white lg:bg-[#fafafa] border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-8 py-5 lg:py-6 flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div className="text-center lg:text-left">
            <p className="text-[10px] lg:text-[11px] text-gray-400 max-w-[500px] leading-relaxed">
              Copyright © 2025 Autobon. All rights reserved. Autobon® and the
              Autobon Logo design are registered trademarks.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4 text-[10px] lg:text-[11px] text-gray-400 mt-3 font-medium uppercase">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden lg:inline">|</span>
              <Link href="/terms-of-use" className="hover:text-blue-600 transition-colors">
                Legal Agreements
              </Link>
              <span className="hidden lg:inline">|</span>
              <Link href="/website-terms" className="hover:text-blue-600 transition-colors">
                Website Terms
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 lg:mt-0 justify-center lg:justify-end">
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              className="h-7 lg:h-8"
              alt="Google Logo"
            />
            <div className="flex flex-col items-center">
              <div className="flex gap-0.5">{[...Array(5)].map((_,i) => (<svg key={i} viewBox="0 0 24 24" className="w-5 h-5 lg:w-7 lg:h-7 text-primary fill-primary"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>))}</div>
              <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-tighter mt-0.5">
                Over 2500 5 Star Reviews
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // --- ORIGINAL FULL FOOTER RENDER ---
  return (
    <footer className="w-full py-16 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col">
        {/* 1. LOGO */}
        <div className="mb-12 md:mb-[100px] flex justify-center">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Autobon Logo"
              className="h-[50px] w-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* 2. GRID SYSTEM */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          {footerSections.map((section, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 items-start text-left"
            >
              <h4 className="font-semibold text-black mb-1">{section.title}</h4>
              <div className="flex flex-col gap-2">
                {section.getLinks().map((link) => (
                  <a
                    key={link}
                    href={getHref(link, section.type)}
                    onClick={link === "FAQ" ? handleFaqClick : link === "Chat with us" ? (e) => { e.preventDefault(); if (typeof window !== 'undefined' && window.Chatra) window.Chatra('openChat', true); } : undefined}
                    className={`text-[#595959] ${section.title === "Contact Us" ? "text-nowrap" : ""} text-[14px] hover:text-black transition-colors`}
                  >
                    {link}
                  </a>
                ))}

                {["model", "body", "location", "sell"].includes(
                  section.type,
                ) && (
                  <button
                    onClick={() => handleViewMore(section.type)}
                    className="text-[#595959] text-[14px] hover:text-black transition-colors underline text-left"
                  >
                    {expandedSections[section.type] === 2
                      ? "Show Less"
                      : "View More"}
                  </button>
                )}
              </div>

              {section.title === "Contact Us" && (
                <div className="flex gap-4 mt-4">
                  <Link
                    target="__blank"
                    href={
                      "https://www.facebook.com/profile.php?id=61578909845485"
                    }
                  >
                    <Facebook
                      fill="currentColor"
                      className="w-5 h-5 text-black hover:text-primary cursor-pointer transition-colors"
                    />
                  </Link>
                  <Link
                    target="__blank"
                    href={"https://Instagram.com/autobon.ca"}
                  >
                    <Instagram className="w-5 h-5 text-black hover:text-primary cursor-pointer transition-colors" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 3. BOTTOM CREDITS */}
        <div className="w-full flex flex-col items-center border-t border-gray-100 pt-8">
          <p className="text-black text-[14px] mb-4 text-center">
            © 2026 AUTOBON. All Rights Reserved.
          </p>
          <div className="text-[12px] md:text-[14px] text-black font-medium flex flex-wrap justify-center items-center gap-x-3 gap-y-2 max-w-4xl">
            <Link href="/terms-of-use" className="hover:underline">
              Terms of Use
            </Link>
            <span className="text-gray-300 hidden md:inline">|</span>
            <Link href="/website-terms" className="hover:underline">
              Website Terms
            </Link>
            <span className="text-gray-300 hidden md:inline">|</span>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="text-gray-300 hidden md:inline">|</span>
            <Link href="/cookies" className="hover:underline">
              Cookies
            </Link>
            <span className="text-gray-300 hidden md:inline">|</span>
            <Link href="/disclaimer" className="hover:underline">
              Disclaimer
            </Link>
            <span className="text-gray-300 hidden md:inline">|</span>
            <Link href="/pricing-policy" className="hover:underline">
              Pricing Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
