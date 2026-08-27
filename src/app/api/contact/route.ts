import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, experience, interest, message, website_url_hp, formLoadTime } = body;

    // 1. Bot Honeypot Check
    // If hidden honeypot field is filled by bot crawler, silently reject or mock success
    if (website_url_hp && website_url_hp.trim() !== "") {
      console.warn("[Spam Blocked] Honeypot triggered:", { ip: req.headers.get("x-forwarded-for") });
      // Return 200 to confuse bots without processing
      return NextResponse.json({ success: true, message: "Thank you for contacting us." });
    }

    // 2. Submission Speed Check (Bots fill forms in < 800ms)
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

    // 4. Log / Save to Payload CMS or dispatch email
    console.log("[New Lead Received]:", {
      name,
      email,
      phone,
      experience: experience || "Beginner",
      interest: interest || "General Inquiry",
      message: message || "Webinar Registration",
      timestamp: new Date().toISOString(),
    });

    // In future with Payload CMS, this will call:
    // await payload.create({ collection: 'registrations', data: { name, email, phone, ... } })

    return NextResponse.json({
      success: true,
      message: "Thank you! Your registration / inquiry has been received. Our team will contact you shortly with the webinar link.",
    });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
