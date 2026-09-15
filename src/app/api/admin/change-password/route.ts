import { NextResponse } from "next/server";
import { getAdminSession, hashPassword, verifyOtpAndCreateSession, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { updateAdminPassword, getAdminById, getAdminByUsernameOrMobile } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    const body = await request.json();
    const { newPassword, otp, identifier } = body;

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    let targetAdminId: number | null = null;
    let sessionToken: string | null = null;

    // Case 1: Password setup immediately following OTP verification or with an active session
    if (session) {
      // If user already has a password and wants to change it, an OTP is required as a 2FA step
      const currentRecord = await getAdminById(session.id);
      if (!currentRecord) {
        return NextResponse.json({ error: "Admin not found." }, { status: 404 });
      }

      if (currentRecord.hashed_password && otp) {
        const verifyOtpResult = await verifyOtpAndCreateSession(currentRecord.username, otp);
        if (!verifyOtpResult.success) {
          return NextResponse.json(
            { error: verifyOtpResult.error || "Invalid OTP code for password update." },
            { status: 401 }
          );
        }
        sessionToken = verifyOtpResult.token || null;
      }

      targetAdminId = session.id;
    } else {
      // Case 2: Direct password reset with OTP without an active session
      if (!identifier || !otp) {
        return NextResponse.json(
          { error: "Username/Mobile and valid Telegram OTP are required." },
          { status: 400 }
        );
      }

      const verifyOtpResult = await verifyOtpAndCreateSession(identifier, otp);
      if (!verifyOtpResult.success) {
        return NextResponse.json(
          { error: verifyOtpResult.error || "OTP verification failed." },
          { status: 401 }
        );
      }

      sessionToken = verifyOtpResult.token || null;

      const admin = await getAdminByUsernameOrMobile(identifier);
      if (!admin) {
        return NextResponse.json({ error: "Admin record not found." }, { status: 404 });
      }
      targetAdminId = admin.id;
    }

    // Hash the password with native salted scrypt
    const hashed = hashPassword(newPassword);
    const success = await updateAdminPassword(targetAdminId, hashed);

    if (!success) {
      return NextResponse.json({ error: "Failed to save password." }, { status: 500 });
    }

    const response = NextResponse.json({
      success: true,
      message: "Password set and secured successfully! Logging you in...",
      redirectUrl: "/admin",
    });

    // If an auth token was issued during OTP verification, set the session cookie
    if (sessionToken) {
      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
    }

    return response;
  } catch (err) {
    console.error("[Change Password API Error]:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
