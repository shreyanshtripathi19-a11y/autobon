import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { findUserById, updateUserProfile } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("autobon_token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = findUserById(payload.id);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Parse name into parts if separate fields don't exist yet
    const nameParts = (user.name || "").split(" ");

    return Response.json({
      firstName: user.firstName || nameParts[0] || "",
      middleName: user.middleName || (nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : ""),
      lastName: user.lastName || (nameParts.length > 1 ? nameParts[nameParts.length - 1] : ""),
      phone: user.phone || "",
      dob: user.dob || "",
      address: user.address || "",
    });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("autobon_token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const updatedUser = updateUserProfile(payload.id, {
      firstName: body.firstName,
      middleName: body.middleName,
      lastName: body.lastName,
      phone: body.phone,
      dob: body.dob,
      address: body.address,
    });

    if (!updatedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
