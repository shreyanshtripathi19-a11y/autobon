"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import NullDataInfo from "@/components/accounts/NullDataInfo";

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Cars", href: "/dashboard/my-cars" },
];

const PLACEHOLDER_IMG = "/images/c0e515790ae6cd243a0ae47e32ad732e993b78a2.png";

export default function MyCarsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [savedCarIds, setSavedCarIds] = useState([]);
  const [savedCarsData, setSavedCarsData] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Load saved car IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("savedCars");
      if (stored) {
        setSavedCarIds(JSON.parse(stored));
      }
    } catch {}
  }, []);

  // Fetch car details for saved IDs
  useEffect(() => {
    if (savedCarIds.length === 0) {
      setSavedCarsData([]);
      setLoadingCars(false);
      return;
    }

    const fetchCars = async () => {
      try {
        setLoadingCars(true);
        const res = await fetch("/api/cars");
        if (res.ok) {
          const allCars = await res.json();
          const filtered = allCars.filter((car) => savedCarIds.includes(car.id));
          setSavedCarsData(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch saved cars:", err);
      } finally {
        setLoadingCars(false);
      }
    };

    fetchCars();
  }, [savedCarIds]);

  const removeSavedCar = (carId) => {
    const next = savedCarIds.filter((id) => id !== carId);
    setSavedCarIds(next);
    setSavedCarsData((prev) => prev.filter((c) => c.id !== carId));
    localStorage.setItem("savedCars", JSON.stringify(next));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="px-6 py-10 max-w-[1073px] mx-auto">
        <h2 className="mb-4 font-semibold text-2xl">Account Dashboard</h2>
        <BreadcrumbWithCustomSeparator items={breadcrumbs} />
        <div className="my-8 flex flex-col gap-y-8">
          <h3 className="font-semibold text-xl">My Cars</h3>

          {loadingCars ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : savedCarsData.length === 0 ? (
            <NullDataInfo
              title="You don't have any active offers"
              description="Share some info about your car and get a firm offer in minutes"
              buttonLabel="Sell or trade my car"
              href="/sell-or-trade"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCarsData.map((car) => {
                const imgUrl =
                  car.images && car.images.length > 0
                    ? car.images[0].url
                    : PLACEHOLDER_IMG;
                return (
                  <div
                    key={car.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative" style={{ aspectRatio: "16/10" }}>
                      <img
                        src={imgUrl}
                        alt={car.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeSavedCar(car.id)}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-red-50 transition-colors"
                        title="Remove from My Cars"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="red"
                          stroke="red"
                          strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-gray-900 mb-1 truncate">
                        {car.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span>{car.mileage || "N/A"}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span>{car.condition || "Used"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-base font-bold text-gray-900"
                          style={{
                            filter: "blur(5px)",
                            userSelect: "none",
                            opacity: 0.85,
                          }}
                        >
                          ${car.price?.toLocaleString()}
                        </span>
                        <Link
                          href="/shop"
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
