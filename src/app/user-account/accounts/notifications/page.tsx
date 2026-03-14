"use client";

import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import { Button } from "@/components/ui/button";
import ActionInfo from "./_components/actionInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  smsNotifications: z.boolean(),
  carValueUpdates: z.boolean(),
  newVehicleAlerts: z.boolean(),
  priceDropAlerts: z.boolean(),
});

const AccountCars = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/user-account/accounts/dashboard",
    },
    {
      label: "Notifications",
      href: "/user-account/accounts/notifications",
    },
  ];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      smsNotifications: true,
      carValueUpdates: true,
      newVehicleAlerts: true,
      priceDropAlerts: true,
    },
  });

  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  const fetchNotificationSettings = async () => {
    try {
      const response = await fetch("/api/accounts/notifications");
      if (response.ok) {
        const data = await response.json();
        form.reset({
          smsNotifications: data.smsNotification,
          carValueUpdates: data.carUpdateValue,
          newVehicleAlerts: data.newVehicleAlerts,
          priceDropAlerts: data.priceDropAlerts,
        });
      } else if (response.status === 401) {
        toast.error("Please login to view your notification settings");
        router.push("/auth/login");
      } else {
        toast.error("Failed to load notification settings");
      }
    } catch (error) {
      toast.error("Failed to load notification settings");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSaving(true);
    try {
      const response = await fetch("/api/accounts/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          smsNotification: data.smsNotifications,
          carUpdateValue: data.carValueUpdates,
          newVehicleAlerts: data.newVehicleAlerts,
          priceDropAlerts: data.priceDropAlerts,
        }),
      });

      if (response.ok) {
        toast.success("Notification settings updated successfully");
      } else {
        toast.error("Failed to update notification settings");
      }
    } catch (error) {
      toast.error("Failed to update notification settings");
    } finally {
      setSaving(false);
    }
  };

  const notificationItems: {
    id: keyof z.infer<typeof FormSchema>;
    title: string;
    description: string;
    label: string;
  }[] = [
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

  if (loading) {
    return (
      <div className="px-6 py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg">Loading notification settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <BreadcrumbWithCustomSeparator items={breadcrumbs} />
      <div className="my-8 flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between md:justify-normal md:gap-x-60">
          <h3 className="font-semibold text-xl">Notifications</h3>
          <Button
            type="submit"
            className="px-5 py-1.5 rounded-2xl bg-blue-600 text-white"
            onClick={form.handleSubmit(onSubmit)}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
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
  );
};

export default AccountCars;
