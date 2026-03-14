"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import NavigationCard from "@/components/accounts/NavigationCard";

const navigations = [
  {
    title: "Personal Info",
    description: "Edit your personal details and contact info",
    iconName: "UserCircle",
    href: "/dashboard/personal-info",
  },
  {
    title: "My cars",
    description: "Manage offers on cars you're selling or trading",
    iconName: "Car",
    href: "/dashboard/my-cars",
  },
  {
    title: "My orders",
    description: "View pending orders for cars you're buying",
    iconName: "Truck",
    href: "/dashboard/my-orders",
  },
  {
    title: "Next steps",
    description: "View your tasks, whether you're buying or selling",
    iconName: "Calendar",
    href: "/dashboard/next-steps",
  },
  {
    title: "Notifications",
    description: "Manage notification preferences and how we reach you",
    iconName: "Bell",
    href: "/dashboard/notifications",
  },
  {
    title: "Saved searches",
    description: "View your saved car search criteria and latest results",
    iconName: "Search",
    href: "/dashboard/saved-searches",
  },
];

export default function UserDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="px-6 py-10 max-w-[1073px] mx-auto">
        <h2 className="mb-6 font-semibold text-2xl">Account Dashboard</h2>

        {/* Welcome Banner */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-8 py-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Welcome back! 👋
          </h3>
          <p className="text-gray-500 mt-1">
            Manage your account settings and preferences here.
          </p>
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigations.map((navigation) => (
            <NavigationCard
              title={navigation.title}
              description={navigation.description}
              iconName={navigation.iconName}
              href={navigation.href}
              key={navigation.title}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
