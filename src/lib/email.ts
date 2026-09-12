import nodemailer from "nodemailer";

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
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
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
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER || "support@blueticktrading.com";
  const fromEmail = process.env.SMTP_FROM || `"Blue Tick Trading School" <${process.env.SMTP_USER || "support@blueticktrading.com"}>`;

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
      from: fromEmail,
      to: adminEmail,
      subject,
      html: htmlContent,
      text: textContent,
    });
    return { success: true, messageId: info.messageId, method: "smtp" };
  } catch (error) {
    console.error("[SMTP Error] Failed to send lead notification email:", error);
    return { success: false, error };
  }
}

/**
 * Sends a welcome confirmation email to the student who just registered.
 */
export async function sendUserConfirmationEmail(payload: LeadEmailPayload) {
  const fromEmail = process.env.SMTP_FROM || `"Blue Tick Trading School" <${process.env.SMTP_USER || "support@blueticktrading.com"}>`;
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/blueticktrading";
  const subject = `🎯 Registration Confirmed: Live Market Masterclass with Amit Gupta`;
  const textContent = `Hi ${payload.name},\nYour seat for the Blue Tick Trading School Live Masterclass is confirmed.\nJoin our Telegram: ${telegramLink}\nWhatsApp Support: +91 80048 55663`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F0F5F6; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: #0E3B43; padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 22px; color: #2FFFB9; letter-spacing: 0.5px; }
          .header p { margin: 8px 0 0; font-size: 14px; color: #ffffff; opacity: 0.9; }
          .content { padding: 32px 24px; }
          .greeting { font-size: 18px; font-weight: bold; color: #0E3B43; margin-bottom: 12px; }
          .message { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
          .box { background: #F8FAFB; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
          .box h3 { margin: 0 0 12px; font-size: 15px; color: #0E3B43; }
          .box p { margin: 4px 0; font-size: 13px; color: #64748b; }
          .btn-telegram { display: block; text-align: center; padding: 14px 24px; background: #2AABEE; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 14px; border-radius: 30px; margin: 20px 0; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>BLUE TICK TRADING SCHOOL</h1>
            <p>Your Masterclass Registration is Confirmed!</p>
          </div>
          <div class="content">
            <div class="greeting">Hi ${payload.name},</div>
            <p class="message">
              Thank you for registering for our upcoming live trading masterclass with <strong>Amit Gupta</strong>. 
              We have reserved your seat and our counseling team will send the private Zoom session link directly to your WhatsApp, Telegram, and Email prior to the market session.
            </p>

            <div class="box">
              <h3>Webinar Quick Details</h3>
              <p>📅 <strong>Date:</strong> Upcoming Saturday</p>
              <p>⏰ <strong>Time:</strong> 7:00 PM IST (Sharp)</p>
              <p>🎯 <strong>Focus:</strong> Time Cycle Trading, Smart Money Traps & High-Probability Options Setups</p>
              <p>💻 <strong>Platform:</strong> Zoom Live Stream</p>
            </div>

            <p class="message">
              To ensure you never miss turn dates, pre-market levels, and instant zoom links, join our official Telegram community below:
            </p>

            <a href="${telegramLink}" class="btn-telegram" target="_blank">👉 Join Official Telegram Community</a>

            <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
              If you have any questions, feel free to WhatsApp us at <strong>+91 80048 55663</strong> or reply directly to this email.
            </p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Blue Tick Trading School • All Rights Reserved.<br>
            Strictly for financial education and market literacy.
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
    const info = await transporter.sendMail({
      from: fromEmail,
      to: payload.email,
      subject,
      html: htmlContent,
      text: textContent,
    });
    return { success: true, messageId: info.messageId, method: "smtp" };
  } catch (error) {
    console.error("[SMTP Error] Failed to send student confirmation email:", error);
    return { success: false, error };
  }
}
