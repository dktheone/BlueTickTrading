import nodemailer from "nodemailer";
import { generateIcsCalendar, generateGoogleCalendarUrl, WebinarCalendarEvent } from "@/lib/calendar";

export interface LeadEmailPayload {
  name: string;
  email: string;
  phone: string;
  experience?: string;
  interest?: string;
  message?: string;
}

interface GenericEmailOptions {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
  textContent: string;
}

/**
 * Sends an email via Hostinger Mail REST API if configured:
 * Reference: https://api.mail.hostinger.com/#tag/send/POST/api/v1/mailboxes/{mailboxResourceId}/send
 */
async function sendViaHostingerApi(options: GenericEmailOptions) {
  const apiToken = process.env.HOSTINGER_MAIL_API_TOKEN;
  const mailboxId = process.env.HOSTINGER_MAILBOX_RESOURCE_ID;
  const senderEmail = process.env.SMTP_USER || "support@blueticktrading.com";
  const senderName = "Blue Tick Trading School";

  if (!apiToken || !mailboxId) {
    return null; // Hostinger API credentials not present, fallback to SMTP
  }

  try {
    const url = `https://api.mail.hostinger.com/api/v1/mailboxes/${mailboxId}/send`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        from: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            name: options.toName || options.toEmail,
            email: options.toEmail,
          },
        ],
        subject: options.subject,
        html: options.htmlContent,
        text: options.textContent,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.warn("[Hostinger Mail API Warning] API responded with error:", data);
      return null;
    }

    return { success: true, method: "hostinger-rest-api", data };
  } catch (err) {
    console.warn("[Hostinger Mail API Warning] Failed to send via REST API, falling back to SMTP:", err);
    return null;
  }
}

/**
 * Creates and returns a Nodemailer transporter configured for Hostinger Webmail SMTP.
 * Hostinger settings:
 * - SMTP Host: smtp.hostinger.com
 * - SMTP Port: 465 (SSL) or 587 (TLS)
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const isSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.HOSTINGER_MAILBOX_APP_SECREET || process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  const fromName = process.env.SMTP_FROM_NAME || "Blue Tick Trading School";
  const senderEmail = process.env.SMTP_USER || "info@blueticktradingschool.com";

  return nodemailer.createTransport({
    name: "blueticktradingschool.com", // Valid FQDN eliminates @localhost in Message-ID
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends an urgent lead notification to the BlueTick Trading counseling/admin team.
 */
export async function sendLeadNotificationEmail(payload: LeadEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER || "info@blueticktradingschool.com";
  const fromName = process.env.SMTP_FROM_NAME || "Blue Tick Trading School";
  const senderEmail = process.env.SMTP_USER || "info@blueticktradingschool.com";
  const replyTo = payload.email || senderEmail;

  const cleanPhone = payload.phone.replace(/[^0-9]/g, "");
  const whatsappLink = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=${encodeURIComponent(
    `Hello ${payload.name}, thank you for registering for the Blue Tick Trading School webinar!`
  )}`;

  const subject = `🔥 New Lead: ${payload.name} (${payload.phone}) - ${payload.interest || "Webinar"}`;
  const textContent = `New Lead:\nName: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nExperience: ${payload.experience}\nProgram: ${payload.interest}\nMessage: ${payload.message}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F0F5F6; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .header { background: #0E3B43; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; color: #2FFFB9; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0; font-size: 13px; color: #e2e8f0; }
          .content { padding: 28px; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; background: #0E3B43; color: #2FFFB9; font-weight: bold; font-size: 11px; text-transform: uppercase; margin-bottom: 16px; }
          .lead-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .lead-table td { padding: 12px 8px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .lead-table td.label { font-weight: bold; color: #64748b; width: 35%; }
          .lead-table td.value { color: #0E3B43; font-weight: 600; }
          .btn-wa { display: inline-block; padding: 12px 24px; background: #25D366; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 13px; border-radius: 30px; margin-right: 10px; margin-top: 10px; }
          .btn-call { display: inline-block; padding: 12px 24px; background: #0E3B43; color: #2FFFB9; text-decoration: none; font-weight: bold; font-size: 13px; border-radius: 30px; margin-top: 10px; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>BLUE TICK TRADING SCHOOL</h1>
            <p>New Webinar Registration / Student Lead</p>
          </div>
          <div class="content">
            <span class="badge">Live Lead Alert</span>
            <table class="lead-table">
              <tr>
                <td class="label">Candidate Name:</td>
                <td class="value">${payload.name}</td>
              </tr>
              <tr>
                <td class="label">Phone Number:</td>
                <td class="value"><a href="tel:${payload.phone}" style="color: #0E3B43; text-decoration: none;">${payload.phone}</a></td>
              </tr>
              <tr>
                <td class="label">Email Address:</td>
                <td class="value"><a href="mailto:${payload.email}" style="color: #0E3B43; text-decoration: none;">${payload.email}</a></td>
              </tr>
              <tr>
                <td class="label">Trading Experience:</td>
                <td class="value">${payload.experience || "Not Specified"}</td>
              </tr>
              <tr>
                <td class="label">Target Program / Webinar:</td>
                <td class="value">${payload.interest || "Saturday Live Masterclass"}</td>
              </tr>
              ${
                payload.message
                  ? `<tr><td class="label">Message / Query:</td><td class="value">${payload.message}</td></tr>`
                  : ""
              }
              <tr>
                <td class="label">Submitted At:</td>
                <td class="value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
              </tr>
            </table>

            <div style="text-align: center; padding-top: 10px;">
              <a href="${whatsappLink}" class="btn-wa" target="_blank">Chat on WhatsApp</a>
              <a href="tel:${payload.phone}" class="btn-call">Call Lead Directly</a>
            </div>
          </div>
          <div class="footer">
            Blue Tick Trading School Lead Dispatch System • Hostinger Mail Integration
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Try Hostinger Mail REST API first if configured
  const apiRes = await sendViaHostingerApi({
    toEmail: adminEmail,
    toName: "BlueTick Admin",
    subject,
    htmlContent,
    textContent,
  });
  if (apiRes?.success) {
    return apiRes;
  }

  // 2. Fallback to Hostinger Webmail SMTP
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[Mail Notice] Neither Hostinger Mail API nor SMTP credentials configured. Simulating Admin Email dispatch:", {
      to: adminEmail,
      subject,
      payload,
    });
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: {
        name: fromName,
        address: senderEmail,
      },
      sender: senderEmail,
      replyTo: replyTo,
      to: adminEmail,
      subject,
      html: htmlContent,
      text: textContent,
      envelope: {
        from: senderEmail,
        to: adminEmail,
      },
    });
    return { success: true, messageId: info.messageId, method: "smtp" };
  } catch (error) {
    console.error("[SMTP Error] Failed to send lead notification email:", error);
    return { success: false, error };
  }
}

/**
 * Sends a welcome confirmation email to the student who just registered,
 * including a 1-click Google Calendar button and an attached .ics calendar invite if registered for a masterclass.
 */
export async function sendUserConfirmationEmail(payload: LeadEmailPayload, webinar?: WebinarCalendarEvent) {
  const fromName = process.env.SMTP_FROM_NAME || "Blue Tick Trading School";
  const senderEmail = process.env.SMTP_USER || "info@blueticktradingschool.com";
  const supportEmail = process.env.SUPPORT_EMAIL || "support@blueticktradingschool.com";
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/blueticktrading";

  const isWebinar = Boolean(webinar);
  const webinarTitle = webinar?.title || "Live Market Masterclass";
  const webinarDate = webinar?.dateTimeStr || "Upcoming Saturday, 7:00 PM IST";
  const webinarDuration = webinar?.durationMinutes ? `${webinar.durationMinutes} Minutes` : "90 Minutes";
  const webinarZoom = webinar?.locationUrl || "Private Zoom link will be sent prior to session";

  const subject = isWebinar
    ? `🎯 Seat Confirmed: ${webinarTitle} with Amit Gupta`
    : `🎯 Registration Confirmed: Blue Tick Trading School`;

  // Generate calendar invite assets if webinar is present
  const icsContent = webinar ? generateIcsCalendar(webinar) : "";
  const googleCalendarUrl = webinar ? generateGoogleCalendarUrl(webinar) : "";

  const textContent = isWebinar
    ? `Hi ${payload.name},\nYour seat for "${webinarTitle}" with Amit Gupta is confirmed!\n\n📅 Date & Time: ${webinarDate}\n⏱ Duration: ${webinarDuration}\n💻 Platform: Zoom Live Stream\n\nAdd to Google Calendar:\n${googleCalendarUrl}\n\nJoin our Telegram Community:\n${telegramLink}\nWhatsApp Support: +91 80048 55663`
    : `Hi ${payload.name},\nYour registration for Blue Tick Trading School is confirmed.\nJoin our Telegram: ${telegramLink}\nWhatsApp Support: +91 80048 55663`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F0F5F6; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
          .header { background: linear-gradient(135deg, #0E3B43 0%, #082126 100%); padding: 36px 24px; text-align: center; color: #ffffff; border-bottom: 3px solid #2FFFB9; }
          .header h1 { margin: 0; font-size: 22px; color: #2FFFB9; letter-spacing: 0.5px; font-weight: 800; }
          .header p { margin: 8px 0 0; font-size: 14px; color: #ffffff; opacity: 0.95; font-weight: 500; }
          .content { padding: 32px 24px; }
          .greeting { font-size: 18px; font-weight: 800; color: #0E3B43; margin-bottom: 12px; }
          .message { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px; }
          .ticket-box { background: #F8FAFB; border: 1px solid #cbd5e1; border-radius: 14px; padding: 22px; margin-bottom: 24px; position: relative; }
          .ticket-badge { display: inline-block; background: #0E3B43; color: #2FFFB9; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; rounded-radius: 20px; border-radius: 20px; margin-bottom: 12px; }
          .ticket-title { font-size: 17px; font-weight: 800; color: #0E3B43; margin: 0 0 12px 0; }
          .detail-row { font-size: 13px; color: #334155; margin: 6px 0; }
          .detail-row strong { color: #0E3B43; }
          .btn-calendar { display: block; text-align: center; padding: 13px 20px; background: #0E3B43; color: #2FFFB9; text-decoration: none; font-weight: 800; font-size: 13px; border-radius: 12px; margin: 16px 0 8px 0; border: 1px solid #2FFFB9; }
          .btn-telegram { display: block; text-align: center; padding: 13px 20px; background: #2AABEE; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 13px; border-radius: 12px; margin: 12px 0; }
          .ics-note { font-size: 11px; color: #64748b; text-align: center; margin: 6px 0 18px 0; }
          .footer { padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>BLUE TICK TRADING SCHOOL</h1>
            <p>Your Free Masterclass Seat is Confirmed!</p>
          </div>
          <div class="content">
            <div class="greeting">Hi ${payload.name},</div>
            <p class="message">
              Thank you for registering for our upcoming live market masterclass with <strong>Amit Gupta</strong>. 
              Your seat has been reserved in our upcoming batch.
            </p>

            <div class="ticket-box">
              <span class="ticket-badge">Live Masterclass Pass</span>
              <h2 class="ticket-title">${webinarTitle}</h2>
              <div class="detail-row">📅 <strong>Date &amp; Time:</strong> ${webinarDate}</div>
              <div class="detail-row">⏱ <strong>Duration:</strong> ${webinarDuration}</div>
              <div class="detail-row">👨‍🏫 <strong>Lead Mentor:</strong> Amit Gupta (15+ Years Market Experience)</div>
              <div class="detail-row">💻 <strong>Session Platform:</strong> Zoom Live Stream</div>

              ${
                googleCalendarUrl
                  ? `<a href="${googleCalendarUrl}" class="btn-calendar" target="_blank">📅 Add to Google Calendar</a>
                     <p class="ics-note">📎 An Apple/Outlook Calendar invite (.ics) is also attached to this email.</p>`
                  : ""
              }
            </div>

            <p class="message">
              To ensure you never miss pre-market turn date alerts, Gann cycle key levels, and the instant Zoom meeting link 15 minutes before the session, join our official Telegram channel below:
            </p>

            <a href="${telegramLink}" class="btn-telegram" target="_blank">👉 Join Official Telegram Community</a>

            <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin-top: 20px;">
              Need assistance? WhatsApp our Student Desk at <strong>+91 80048 55663</strong> or reply directly to this email.
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Blue Tick Trading School &bull; All Rights Reserved.<br>
            Strictly for financial education, institutional price-time squaring, and market literacy.
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Try Hostinger Mail REST API first if configured
  const apiRes = await sendViaHostingerApi({
    toEmail: payload.email,
    toName: payload.name,
    subject,
    htmlContent,
    textContent,
  });
  if (apiRes?.success) {
    return apiRes;
  }

  // 2. Fallback to Hostinger Webmail SMTP
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[Mail Notice] Neither Hostinger Mail API nor SMTP configured. Simulating Student Confirmation Email dispatch to:", payload.email);
    return { success: true, simulated: true };
  }

  try {
    const mailOptions: any = {
      from: {
        name: fromName,
        address: senderEmail,
      },
      sender: senderEmail,
      replyTo: supportEmail,
      to: payload.email,
      subject,
      html: htmlContent,
      text: textContent,
      envelope: {
        from: senderEmail,
        to: payload.email,
      },
    };

    // Attach .ics file if webinar event is present
    if (icsContent) {
      mailOptions.attachments = [
        {
          filename: "masterclass-invite.ics",
          content: icsContent,
          contentType: "text/calendar; charset=utf-8; method=REQUEST",
        },
      ];
      mailOptions.alternatives = [
        {
          contentType: "text/calendar; charset=utf-8; method=REQUEST",
          content: icsContent,
        },
      ];
    }

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId, method: "smtp" };
  } catch (error) {
    console.error("[SMTP Error] Failed to send student confirmation email:", error);
    return { success: false, error };
  }
}
