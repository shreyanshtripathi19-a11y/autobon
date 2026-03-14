import { NextResponse } from "next/server";
import { findUserByEmail, storeResetCode } from "@/lib/db";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = findUserByEmail(email);
    if (!user) {
      // Don't reveal whether the email exists - still return success
      return NextResponse.json(
        { message: "If this email is registered, a reset code has been sent." },
        { status: 200 }
      );
    }

    // Generate a 6-digit reset code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the reset code
    storeResetCode(email, code);

    // In a real app, you would send this code via email.
    // For development, we'll log it to the console.
    console.log(`\n========================================`);
    console.log(`  PASSWORD RESET CODE for ${email}`);
    console.log(`  Code: ${code}`);
    console.log(`  (Valid for 15 minutes)`);
    console.log(`========================================\n`);

    return NextResponse.json(
      {
        message: "If this email is registered, a reset code has been sent.",
        // Include code in dev mode so the user can test the flow
        ...(process.env.NODE_ENV !== "production" && { code }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
