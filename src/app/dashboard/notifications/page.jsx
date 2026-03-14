"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import { Button } from "@/components/ui/button";
import ActionInfo from "@/components/accounts/ActionInfo";
import { toast } from "sonner";

const FormSchema = z.object({
  smsNotifications: z.boolean(),
  carValueUpdates: z.boolean(),
  newVehicleAlerts: z.boolean(),
  priceDropAlerts: z.boolean(),
});

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Notifications", href: "/dashboard/notifications" },
];

const notificationItems = [
  {
    id: "smsNotifications",
    title: "SMS Notifications",
    description:
      "SMS Notifications Get notified about changes to your car offer, real-time price updates, vehicle availability alerts, special offers, and communications from your customer advisor",
    label: "Notify me by text",
  },
  {
    id: "carValueUpdates",
    title: "Car value Updates",
    description: "Updates on offers for vehicle(s) you are selling",
    label: "Notify me by email",
  },
  {
    id: "newVehicleAlerts",
    title: "New Vehicle Alerts",
    description:
      "Get notified when vehicles matching your saved search criteria are added to our inventory",
    label: "Notify me by email",
  },
  {
    id: "priceDropAlerts",
    title: "Price Drop Alerts",
    description:
      "Get notified when a car you have shown interest in has dropped in price",
    label: "Notify me by text",
  },
];

export default function NotificationsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      smsNotifications: true,
      carValueUpdates: true,
      newVehicleAlerts: true,
      priceDropAlerts: true,
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      toast.success("Notification settings updated successfully");
    } catch (error) {
      toast.error("Failed to update notification settings");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
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
          <div className="flex items-center gap-x-6">
            <h3 className="font-semibold text-xl">Notifications</h3>
            <Button
              type="submit"
              className="px-6 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
              onClick={form.handleSubmit(onSubmit)}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {notificationItems.map((item) => (
              <ActionInfo
                key={item.id}
                title={item.title}
                description={item.description}
                label={item.label}
                status={form.watch(item.id)}
                onStatusChange={(checked) => form.setValue(item.id, checked)}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
