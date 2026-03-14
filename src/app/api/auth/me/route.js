import { NextResponse } from "next/server";
import { verifyToken, getTokenCookieName } from "@/lib/auth";
import { findUserById } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(getTokenCookieName())?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Get fresh user data from DB
    const user = findUserById(payload.id);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const { password, resetCode, resetCodeExpiry, ...userData } = user;

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
