import { NextResponse } from "next/server";
import { dispatchTelegramOtp } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = (body.identifier || body.username || "").toString().trim();

    if (!identifier) {
      return NextResponse.json(
        { error: "Please enter your Admin username or registered mobile number." },
        { status: 400 }
      );
    }

    const res = await dispatchTelegramOtp(identifier);
    if (!res.success) {
      return NextResponse.json({ error: res.error || "Failed to dispatch OTP." }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      message: "A 6-digit one-time passcode has been sent to your authorized administrative channel.",
    });
  } catch (err) {
    console.error("[OTP Request API Error]:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
