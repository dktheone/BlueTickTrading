import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotificationEmail, sendUserConfirmationEmail } from "@/lib/email";
import { sendTelegramLeadNotification } from "@/lib/telegram";
import { insertLead } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, experience, interest, message, website_url_hp, formLoadTime } = body;

    // 1. Bot Honeypot Check
    // If hidden honeypot field is filled by bot crawler, silently reject
    if (website_url_hp && website_url_hp.trim() !== "") {
      console.warn("[Spam Blocked] Honeypot triggered:", { ip: req.headers.get("x-forwarded-for") });
      return NextResponse.json({ success: true, message: "Thank you for contacting us." });
    }

    // 2. Submission Speed Check (Bots fill forms in < 1000ms)
    if (formLoadTime) {
      const duration = Date.now() - Number(formLoadTime);
      if (duration < 1000) {
        console.warn("[Spam Blocked] Form submitted too fast (< 1s)");
        return NextResponse.json({ success: true, message: "Thank you for contacting us." });
      }
    }

    // 3. Required Fields Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Phone validation (at least 10 digits)
    const digitsOnly = phone.replace(/[^0-9]/g, "");
    if (digitsOnly.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    // Extract client IP address
    const clientIp = 
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
      req.headers.get("x-real-ip") || 
      "127.0.0.1";

    const leadPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      experience: experience || "Complete Beginner",
      interest: interest || "Upcoming Saturday Live Masterclass",
      message: message ? message.trim() : "Webinar Registration",
      ip_address: clientIp,
    };

    // 4. Store entry permanently into SQLite3 database
    let storedRecordId: number | bigint | null = null;
    try {
      const dbResult = insertLead(leadPayload);
      storedRecordId = dbResult.id;
      console.log(`[SQLite3 Database] Lead persisted successfully with ID #${storedRecordId}`);
    } catch (dbErr) {
      console.error("[SQLite3 Database Error] Failed to persist lead:", dbErr);
    }

    // 5. Dispatch Email (Admin alert + User confirmation) & Telegram notifications in parallel
    const [adminEmailRes, userEmailRes, telegramRes] = await Promise.allSettled([
      sendLeadNotificationEmail(leadPayload),
      sendUserConfirmationEmail(leadPayload),
      sendTelegramLeadNotification(leadPayload),
    ]);

    if (adminEmailRes.status === "rejected") {
      console.error("[Dispatch Failure] Admin Email notification failed:", adminEmailRes.reason);
    }
    if (userEmailRes.status === "rejected") {
      console.error("[Dispatch Failure] User Confirmation Email failed:", userEmailRes.reason);
    }
    if (telegramRes.status === "rejected") {
      console.error("[Dispatch Failure] Telegram notification failed:", telegramRes.reason);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your registration has been confirmed. We have sent the details to your email and our team will connect with you.",
      leadId: storedRecordId ? Number(storedRecordId) : undefined,
      telegramLink: process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/blueticktrading",
    });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
