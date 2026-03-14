import { NextResponse } from "next/server";
import { verifyPassword, createToken, getTokenCookieName } from "@/lib/auth";
import { findUserByEmail } from "@/lib/db";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken(user);

    // Build response (without password)
    const { password: _, resetCode, resetCodeExpiry, ...userData } = user;

    const response = NextResponse.json(
      {
        ...userData,
        token, // also send token in body for localStorage (existing frontend expects it)
        message: "Login successful",
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set(getTokenCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
