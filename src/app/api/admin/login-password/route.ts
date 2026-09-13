import { NextResponse } from "next/server";
import { verifyPasswordLogin, ADMIN_COOKIE_NAME } from "@/lib/auth";

const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = (body.identifier || body.username || "").toString().trim();
    const password = (body.password || "").toString();

    if (!identifier || !password) {
      return NextResponse.json({ error: "Username/Mobile and password are required." }, { status: 400 });
    }

    const verification = verifyPasswordLogin(identifier, password);
    if (!verification.success || !verification.token) {
      return NextResponse.json({ error: verification.error || "Invalid credentials." }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      message: "Password verified successfully! Welcome back.",
      redirectUrl: "/admin",
    });

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
    console.error("[Password Login API Error]:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
