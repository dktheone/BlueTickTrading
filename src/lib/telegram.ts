export interface TelegramLeadPayload {
  name: string;
  phone: string;
  email: string;
  experience?: string;
  interest?: string;
  message?: string;
}

/**
 * Dispatches a Telegram notification to the BlueTick Trading counseling/admin channel or chat.
 * Uses Telegram Bot API: https://api.telegram.org/bot<TOKEN>/sendMessage
 */
export async function sendTelegramLeadNotification(payload: TelegramLeadPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const cleanPhone = payload.phone.replace(/[^0-9]/g, "");
  const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone;
  const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    `Hello ${payload.name}, this is from Blue Tick Trading School regarding your webinar registration!`
  )}`;
  const tgUserLink = `https://t.me/+${formattedPhone}`;

  const messageText = `
🚀 *NEW WEBINAR LEAD RECEIVED* 🚀
━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${payload.name}
📱 *Phone:* \`+${formattedPhone}\`
📧 *Email:* ${payload.email}
📈 *Experience:* ${payload.experience || "Beginner"}
🎯 *Target:* ${payload.interest || "Saturday Live Masterclass"}
${payload.message ? `💬 *Message:* _${payload.message}_\n` : ""}⏰ *Time:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
━━━━━━━━━━━━━━━━━━━━━
🔗 *Quick Action Links:*
• [Chat on WhatsApp](${waLink})
• [Open Telegram Direct](${tgUserLink})
• [Call Student](tel:+${formattedPhone})
  `.trim();

  if (!token || !chatId) {
    console.warn("[Telegram Notice] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set. Mocking Telegram Lead Dispatch:", {
      chatId,
      messageText,
    });
    return { success: true, simulated: true };
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error("[Telegram Error] API returned failure:", data);
      return { success: false, error: data };
    }

    return { success: true, result: data.result };
  } catch (err) {
    console.error("[Telegram Error] Network exception sending telegram notification:", err);
    return { success: false, error: err };
  }
}
