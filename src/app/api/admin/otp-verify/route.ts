import { NextResponse } from "next/server";
import { verifyOtpAndCreateSession, ADMIN_COOKIE_NAME } from "@/lib/auth";

const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = (body.identifier || body.username || "").toString().trim();
    const otp = (body.otp || "").toString().trim();

    if (!identifier || !otp) {
      return NextResponse.json({ error: "Username/Mobile and 6-digit OTP are required." }, { status: 400 });
    }

    const verification = await verifyOtpAndCreateSession(identifier, otp);
    if (!verification.success || !verification.token) {
      return NextResponse.json({ error: verification.error || "OTP verification failed." }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful! Welcome to BlueTick Admin Portal.",
      redirectUrl: "/admin",
      mustChangePassword: verification.mustChangePassword,
    });

    // Set signed httpOnly cookie for 7 days
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: verification.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_TTL_SECONDS,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[OTP Verify API Error]:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
