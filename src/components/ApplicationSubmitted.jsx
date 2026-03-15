"use client";
import React from "react";
import Link from "next/link";

const ApplicationSubmitted = ({ email }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-70px)] items-center justify-center p-4 sm:p-6 md:px-2 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl sm:text-3xl text-center font-bold text-primary mb-4">
          Application Submitted!
        </h2>

        <p className="text-gray-600 text-center text-sm sm:text-base mb-0">
          Thank you, our team will review your details shortly
          {email && (
            <span className="block font-medium text-gray-800 mt-1 break-words">
              {email}
            </span>
          )}
        </p>

        <img
          src="/autobon approved.png"
          className="object-contain object-center w-full my-4"
          alt="Autobon Approved"
        />

        <div className="pt-4 border-t border-gray-100 mb-6">
          <p className="text-xs text-center sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Need Immediate Help?
          </p>
          <a
            href="tel:9058003100"
            className="group flex flex-col items-center justify-center gap-1 hover:opacity-90 transition-opacity"
          >
            <span className="text-gray-500 text-xs font-medium">
              24/7 Call Us
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-[#1969DB] group-hover:underline">
              905 800 3100
            </span>
          </a>
        </div>

        <Link
          href="/shop"
          className="block w-full text-center px-6 sm:px-8 py-3 bg-primary text-white rounded-full font-medium text-base hover:bg-primary/90 transition-all shadow-md"
        >
          Browse Cars
        </Link>
      </div>
    </div>
  );
};

export default ApplicationSubmitted;
