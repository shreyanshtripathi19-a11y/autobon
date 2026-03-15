"use client";

import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import top from "../../assets/top.png";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { token, ...userData } = data;
      login(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login successful!");

      if (userData.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* CHANGE: 
       - Switched 'items-center' to 'lg:items-start' to move it up on desktops.
       - Added 'lg:pt-[10vh]' to give it a fixed percentage offset from the top on large screens.
    */
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 pt-[100px] lg:pt-[120px]">
      <div className="w-full ">
        <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold text-left text-gray-900">
              Login to your account
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
                {error}
              </p>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className={`w-full px-3 py-2 border rounded-md outline-none transition-all focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex w-full justify-between items-center">
                <label className="text-sm font-medium text-gray-700 block">
                  Password
                </label>
                <Link
                  href="  /forgot-password"
                  className="text-blue-500 text-sm hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded-md outline-none transition-all focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
        <img
          src={top.src}
          className="object-contain my-[4rem] object-center w-full max-h-[300px] md:max-w-4xl md:max-h-[400px] mx-auto"
          alt="Login to Autobon"
        />
      </div>
    </div>
  );
};

export default LoginPage;
