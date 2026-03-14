"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import NullDataInfo from "@/components/accounts/NullDataInfo";

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Orders", href: "/dashboard/my-orders" },
];

export default function MyOrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

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
          <h3 className="font-semibold text-xl">My Orders</h3>
          <NullDataInfo
            title="You Don't have any active orders"
            description="Start looking for your next ride"
            buttonLabel="Shop cars"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
