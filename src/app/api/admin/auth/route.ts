import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  isAuthenticatedRequest,
  verifyAdminPassword,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/auth
 * Returns whether the current caller is authenticated.
 */
export async function GET() {
  const authenticated = await isAuthenticatedRequest();
  return NextResponse.json({ authenticated });
}

/**
 * POST /api/admin/auth
 * Authenticates the admin and issues an HTTP-Only session cookie.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body || {};

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Invalid administrator passphrase." },
        { status: 401 }
      );
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ success: true, message: "Authentication successful." });

    // Set signed HTTP-Only cookie for 7 days
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Authentication failed.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/auth
 * Clears the administrative session cookie.
 */
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully." });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
