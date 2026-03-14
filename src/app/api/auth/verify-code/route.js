import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { verifyResetCode, updatePassword } from "@/lib/db";

export async function POST(request) {
  try {
    const { email, code, newPassword } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and verification code are required" },
        { status: 400 }
      );
    }

    // Verify the reset code
    const isValid = verifyResetCode(email, code);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    // If newPassword is provided, update the password
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { message: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }

      const hashedPassword = await hashPassword(newPassword);
      updatePassword(email, hashedPassword);

      return NextResponse.json(
        { message: "Password updated successfully", verified: true, passwordReset: true },
        { status: 200 }
      );
    }

    // If no newPassword, just verify the code
    return NextResponse.json(
      { message: "Code verified successfully", verified: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify code error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
