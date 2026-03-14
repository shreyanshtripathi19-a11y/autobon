"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showCode, setShowCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Reset code sent! Check the console for the code (dev mode).");
        if (data.code) {
          setCode(data.code);
        }
        setStep(2);
      } else {
        toast.error(data.message || "Failed to send reset code");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code) {
      toast.error("Please enter the verification code");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        toast.success("Code verified! Now set your new password.");
        setStep(3);
      } else {
        toast.error(data.message || "Invalid verification code");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await res.json();
      if (res.ok && data.passwordReset) {
        toast.success("Password reset successfully! You can now log in.");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] 2xl:min-h-[70vh] items-center justify-center bg-[#f8f9fa] p-4">
      <div className="w-full max-w-md rounded-[24px] bg-white p-10 shadow-sm border border-gray-100">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 tracking-tight">
          Forgot Password?
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          {step === 1 && "Enter your email and we'll send you a verification code."}
          {step === 2 && "Enter the 6-digit code sent to your email."}
          {step === 3 && "Set your new password."}
        </p>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleSendCode} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-xl border-2 border-blue-500 px-4 py-3.5 outline-none transition-all focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1a73e8] py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Verification Code
              </label>
              <div className="relative">
                <input
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000-000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1a73e8] py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
            <p className="text-center text-gray-600 font-medium">
              Didn&apos;t get the code?{" "}
              <button
                type="button"
                onClick={handleSendCode}
                className="text-blue-600 hover:underline"
              >
                Resend
              </button>
            </p>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 chars)"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1a73e8] py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
