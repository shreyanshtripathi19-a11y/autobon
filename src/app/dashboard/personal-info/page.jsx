"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  dateOfBirth: z.coerce.date({ message: "Date of birth is required" }),
  homeAddress: z.string().min(1, { message: "Home address is required" }),
});

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Personal Info", href: "/dashboard/personal-info" },
];

export default function PersonalInfoPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      dateOfBirth: undefined,
      homeAddress: "",
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/accounts/profile");
      if (response.ok) {
        const data = await response.json();
        reset({
          firstName: data.firstName || "",
          middleName: data.middleName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
          dateOfBirth: data.dob ? new Date(data.dob) : undefined,
          homeAddress: data.address || "",
        });
      } else if (response.status === 401) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    setSaving(true);
    try {
      const response = await fetch("/api/accounts/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          middleName: values.middleName || "",
          lastName: values.lastName,
          phone: values.phone,
          dob: values.dateOfBirth
            ? values.dateOfBirth.toISOString().split("T")[0]
            : "",
          address: values.homeAddress,
        }),
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="px-6 py-10 max-w-[1073px] mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
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
        <div className="max-w-2xl my-8 flex flex-col gap-y-8">
          <div className="flex justify-between items-center gap-x-4">
            <h3 className="font-semibold text-xl">Personal info</h3>
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfile();
                  }}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="account-form"
                  className="px-5 py-1.5 rounded-2xl bg-blue-600 text-white"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-5 py-1.5 rounded-2xl bg-blue-600 text-white"
              >
                Edit
              </Button>
            )}
          </div>
          <div className="bg-gray-200 rounded-lg p-6 flex flex-col gap-6">
            <form onSubmit={handleSubmit(onSubmit)} id="account-form">
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <div className="space-y-1">
                    <input
                      placeholder="First Name"
                      disabled={!isEditing}
                      className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1 disabled:opacity-70"
                      {...field}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs">{errors.firstName.message}</p>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="middleName"
                render={({ field }) => (
                  <div className="space-y-1">
                    <input
                      placeholder="Middle Name"
                      disabled={!isEditing}
                      className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1 disabled:opacity-70"
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <div className="space-y-1">
                    <input
                      placeholder="Last Name"
                      disabled={!isEditing}
                      className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1 disabled:opacity-70"
                      {...field}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs">{errors.lastName.message}</p>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <div className="space-y-1">
                    <input
                      type="tel"
                      placeholder="Phone"
                      disabled={!isEditing}
                      className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1 disabled:opacity-70"
                      {...field}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs">{errors.phone.message}</p>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <div className="space-y-1">
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      disabled={!isEditing}
                      value={
                        field.value instanceof Date && !isNaN(field.value)
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val ? new Date(val) : undefined);
                      }}
                      className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1 disabled:opacity-70"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-xs">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="homeAddress"
                render={({ field }) => (
                  <div className="space-y-1">
                    <input
                      placeholder="Home Address"
                      disabled={!isEditing}
                      className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1 disabled:opacity-70"
                      {...field}
                    />
                    {errors.homeAddress && (
                      <p className="text-red-500 text-xs">{errors.homeAddress.message}</p>
                    )}
                  </div>
                )}
              />
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
