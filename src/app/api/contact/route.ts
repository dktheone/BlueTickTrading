import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotificationEmail, sendUserConfirmationEmail } from "@/lib/email";
import { sendTelegramLeadNotification } from "@/lib/telegram";
import { insertLead, registerUserForWebinar, getWebinarById, findOrCreateUser, insertContactLead } from "@/lib/db";
import { generateGoogleCalendarUrl, generateIcsCalendar, WebinarCalendarEvent } from "@/lib/calendar";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, experience, interest, message, website_url_hp, formLoadTime, webinarId } = body;

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
      interest: interest || (webinarId ? "Live Webinar Registration" : "General Counseling & Inquiry"),
      message: message ? message.trim() : (webinarId ? "Webinar Registration" : "Counseling Inquiry"),
      ip_address: clientIp,
      status: "New",
      webinar_id: webinarId ? Number(webinarId) : null,
    };

    // 4. Store entry permanently into MongoDB Atlas database
    let storedRecordId: number | bigint | null = null;
    try {
      if (webinarId) {
        // Webinar Registrant -> insert into leads collection with webinar_id & status: 'New'
        const dbResult = await insertLead(leadPayload);
        storedRecordId = dbResult.id;
        console.log(`[MongoDB Atlas] Webinar Lead persisted successfully with ID #${storedRecordId}`);
      } else {
        // General Inquirer -> insert into users_master + leads_contact
        const userRes = await findOrCreateUser({
          name: leadPayload.name,
          email: leadPayload.email,
          phone: leadPayload.phone,
          experience: leadPayload.experience,
        });
        const contactRes = await insertContactLead({
          userId: userRes.id,
          subjectTopic: leadPayload.interest,
          message: leadPayload.message,
          sourceUrl: "/contact",
          ipAddress: clientIp,
        });
        // Also persist in fallback leads collection so it exists everywhere
        const fallbackLead = await insertLead(leadPayload);
        storedRecordId = contactRes.id || fallbackLead.id;
        console.log(`[MongoDB Atlas] General Contact Inquiry persisted into leads_contact #${storedRecordId}`);
      }
    } catch (dbErr) {
      console.error("[MongoDB Atlas Error] Failed to persist lead:", dbErr);
    }

    // 4b. If webinarId is present, register in users_master, webinar_registrations, and prepare calendar invite
    let webinarEvent: WebinarCalendarEvent | undefined = undefined;
    let googleCalendarUrl = "";
    let icsContent = "";

    if (webinarId) {
      try {
        const regRes = await registerUserForWebinar({
          webinarId: Number(webinarId),
          name: leadPayload.name,
          email: leadPayload.email,
          phone: leadPayload.phone,
          experience: leadPayload.experience,
          ipAddress: clientIp,
        });
        console.log(`[Webinar Registration Flow]: Registered user for webinar #${webinarId}`, regRes);

        const w = await getWebinarById(Number(webinarId));
        if (w) {
          webinarEvent = {
            id: w.id,
            title: w.title,
            description: w.subtitle || w.short_description || undefined,
            dateTimeStr: w.date_time,
            durationMinutes: w.duration_minutes || 90,
            locationUrl: w.zoom_join_url || "Zoom Live Broadcast (Link sent via Email & Telegram)",
            speakerName: w.mentor_name || "Amit Gupta",
            slug: w.slug,
          };
          googleCalendarUrl = generateGoogleCalendarUrl(webinarEvent);
          icsContent = generateIcsCalendar(webinarEvent);
        }
      } catch (wErr) {
        console.error("[Webinar Registration Error]:", wErr);
      }
    }

    // 5. Dispatch Email (Admin alert + User confirmation with calendar invite) & Telegram notifications in parallel
    const [adminEmailRes, userEmailRes, telegramRes] = await Promise.allSettled([
      sendLeadNotificationEmail(leadPayload),
      sendUserConfirmationEmail(leadPayload, webinarEvent),
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
      message: webinarEvent
        ? `Thank you! Your seat for "${webinarEvent.title}" has been confirmed. A calendar invite has been sent to your email.`
        : "Thank you! Your inquiry has been confirmed. Our team will connect with you.",
      telegramLink: process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/blueticktrading",
      calendar: webinarEvent
        ? {
            title: webinarEvent.title,
            dateTimeStr: webinarEvent.dateTimeStr,
            durationMinutes: webinarEvent.durationMinutes,
            googleCalendarUrl,
            icsContent,
          }
        : undefined,
    });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
