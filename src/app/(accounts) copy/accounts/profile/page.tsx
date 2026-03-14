"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/ui/datepicker";
import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Accounts = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/accounts/dashboard",
    },
    {
      label: "Personal Info",
      href: "/accounts/profile",
    },
  ];

  const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    dateOfBirth: z.date({
      message: "Date of birth is required",
    }),
    homeAddress: z.string().min(1, { message: "Home address is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      homeAddress: "",
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/accounts/profile");
      if (response.ok) {
        const data = await response.json();
        form.reset({
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          phone: data.phone,
          dateOfBirth: data.dob ? new Date(data.dob) : undefined,
          homeAddress: data.address,
        });
      } else if (response.status === 401) {
        toast.error("Please login to view your profile");
        router.push("/auth/login");
      } else {
        toast.error("Failed to load profile");
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSaving(true);
    try {
      const response = await fetch("/api/accounts/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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

  if (loading) {
    return (
      <div className="px-6 py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
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
                  fetchProfile(); // Reset form
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="account-form">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder="First Name"
                        className="w-full bg-transparent border-b  border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder="Middle Name"
                        className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder="Last Name"
                        className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePicker {...field} placeholder="Date of Birth" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="homeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder="Home Address"
                        className="w-full bg-transparent border-b border-gray-400 py-2 text-gray-900 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none my-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
