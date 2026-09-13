import crypto from "crypto";
import { cookies } from "next/headers";
import {
  getAdminByUsernameOrMobile,
  getAdminById,
  normalizePhone,
  AdminUserRecord,
  setAdminOtpChallenge,
  getAdminOtpChallenge,
  deleteAdminOtpChallenge,
} from "./db";

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days
export const ADMIN_COOKIE_NAME = "btt_admin_session";

export interface PendingOtp {
  otp: string;
  expiresAt: number;
  userId: number;
  username: string;
}

export interface AdminSessionPayload {
  id: number;
  username: string;
  displayName: string;
  role: "super_admin" | "admin";
  mobile: string;
  avatarUrl: string;
  designation: string;
  bio: string;
  tgChatId?: string;
  mustChangePassword: boolean;
  exp: number;
}

// In-memory store for active OTP challenges (keyed by user ID)
const activeOtps = new Map<number, PendingOtp>();

/**
 * Native Salted Scrypt Password Hashing (Zero external npm bloat)
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Constant-time verification of password against stored scrypt hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(key, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

/**
 * 2nd LAYER SECURITY CHECK:
 * Strictly cross-references the admin user's database mobile against the server environment whitelist.
 * Even if an attacker injects or modifies rows in SQLite, this check blocks unauthorized access.
 */
export function verifyAdminEnvWhitelist(user: AdminUserRecord): { allowed: boolean; error?: string } {
  const cleanDbMobile = normalizePhone(user.mobile);
  const superAdminMobile = process.env.ADMIN_SUPERADMIN_MOBILE
    ? normalizePhone(process.env.ADMIN_SUPERADMIN_MOBILE)
    : null;
  const amitMobile = process.env.ADMIN_AMIT_MOBILE
    ? normalizePhone(process.env.ADMIN_AMIT_MOBILE)
    : null;

  if (user.username.toLowerCase() === "deepak" || user.role === "super_admin") {
    if (!superAdminMobile || cleanDbMobile !== superAdminMobile) {
      console.error(
        `[SECURITY ALERT] Superadmin mobile mismatch! DB: "${cleanDbMobile}" vs ENV: "${superAdminMobile}"`
      );
      return {
        allowed: false,
        error: "SECURITY BREACH ALERT: User mobile number in database does not match verified server environment configuration.",
      };
    }
    return { allowed: true };
  }

  if (user.username.toLowerCase() === "amit_gupta" || user.role === "admin") {
    if (!amitMobile || cleanDbMobile !== amitMobile) {
      console.error(
        `[SECURITY ALERT] Admin mobile mismatch! DB: "${cleanDbMobile}" vs ENV: "${amitMobile}"`
      );
      return {
        allowed: false,
        error: "SECURITY BREACH ALERT: User mobile number in database does not match verified server environment configuration.",
      };
    }
    return { allowed: true };
  }

  return { allowed: false, error: "Access Denied: Unrecognized administrator identity." };
}

/**
 * Dispatches a cryptographically secure 6-digit OTP to either:
 * 1. The admin's private Telegram chat (if tg_chat_id is linked)
 * 2. The central closed Telegram Admin channel (as fallback)
 */
export async function dispatchTelegramOtp(identifier: string): Promise<{
  success: boolean;
  error?: string;
  target?: "private_telegram" | "channel";
  mobileMasked?: string;
  hasPassword?: boolean;
}> {
  const admin = getAdminByUsernameOrMobile(identifier);
  if (!admin) {
    return { success: false, error: "Access Denied: Unrecognized username or mobile number." };
  }

  // 2nd Layer Verification Check
  const envCheck = verifyAdminEnvWhitelist(admin);
  if (!envCheck.allowed) {
    return { success: false, error: envCheck.error };
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const channelChatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken) {
    return { success: false, error: "Telegram bot token is not configured on server." };
  }

  // Target chat: personal tg_chat_id if set, else channel chat id
  const targetChatId = admin.tg_chat_id ? admin.tg_chat_id : channelChatId;
  if (!targetChatId) {
    return { success: false, error: "No Telegram chat ID configured for delivery." };
  }

  const isPrivate = Boolean(admin.tg_chat_id);

  // Generate 6-digit numeric OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + OTP_EXPIRY_MS;

  // Store in memory AND persist in SQLite so it survives across worker processes
  activeOtps.set(admin.id, {
    otp,
    expiresAt,
    userId: admin.id,
    username: admin.username,
  });
  setAdminOtpChallenge(admin.id, otp, expiresAt, admin.username);

  const timeStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const messageText = isPrivate
    ? `
🔐 *YOUR PERSONAL ADMIN LOGIN OTP*
━━━━━━━━━━━━━━━━━━━━━
👤 *User:* \`${admin.display_name}\` (\`${admin.username}\`)
🔑 *One-Time Passcode:* \`${otp}\`
⏳ *Valid For:* 5 Minutes
⏰ *Requested At:* ${timeStr} IST
━━━━━━━━━━━━━━━━━━━━━
_Keep this passcode strictly confidential._
    `.trim()
    : `
🔐 *ADMIN LOGIN OTP REQUEST*
━━━━━━━━━━━━━━━━━━━━━
👤 *User:* \`${admin.display_name}\` (\`${admin.username}\`)
🔑 *Passcode:* \`${otp}\`
⏳ *Valid For:* 5 Minutes
⏰ *Requested At:* ${timeStr} IST
🛡️ *Target Mobile:* \`${admin.mobile.slice(0, 7)}****\`
━━━━━━━━━━━━━━━━━━━━━
_Notice: Delivered to Admin Channel. Link your personal Telegram ID in Admin Profile for private DMs._
    `.trim();

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    let data = await res.json();

    // Resilient fallback: If bot hasn't been added to channel yet, fallback to active channel bot
    if (!res.ok || !data.ok) {
      const fallbackToken = process.env.TELEGRAM_FALLBACK_BOT_TOKEN;
      if (fallbackToken && fallbackToken !== botToken) {
        console.warn(`[Telegram Auth Notice] Retrying with channel-authorized fallback bot token...`);
        const fallbackUrl = `https://api.telegram.org/bot${fallbackToken}/sendMessage`;
        res = await fetch(fallbackUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: targetChatId,
            text: messageText,
            parse_mode: "Markdown",
          }),
        });
        data = await res.json();
      }
    }

    if (!res.ok || !data.ok) {
      console.error("[Telegram Auth Error] Delivery failed:", data);
      return { success: false, error: "Failed to dispatch OTP via Telegram Bot API." };
    }

    const masked = admin.mobile.replace(/(\+\d{2}-\d{3})\d{4}(\d{3})/, "$1****$2");
    return {
      success: true,
      target: isPrivate ? "private_telegram" : "channel",
      mobileMasked: masked,
      hasPassword: Boolean(admin.hashed_password),
    };
  } catch (err) {
    console.error("[Telegram Auth Error] Network failure:", err);
    return { success: false, error: "Network error connecting to Telegram API." };
  }
}

/**
 * Validates OTP and issues a cryptographically signed 7-day session token.
 */
export function verifyOtpAndCreateSession(
  identifier: string,
  inputOtp: string
): { success: boolean; token?: string; error?: string; mustChangePassword?: boolean } {
  const admin = getAdminByUsernameOrMobile(identifier);
  if (!admin) {
    return { success: false, error: "Unrecognized administrator account." };
  }

  const envCheck = verifyAdminEnvWhitelist(admin);
  if (!envCheck.allowed) {
    return { success: false, error: envCheck.error };
  }

  // Check in-memory first, fallback to SQLite persistence
  let challenge = activeOtps.get(admin.id);
  if (!challenge) {
    const dbChallenge = getAdminOtpChallenge(admin.id);
    if (dbChallenge) {
      challenge = {
        otp: dbChallenge.otp,
        expiresAt: dbChallenge.expires_at,
        userId: admin.id,
        username: dbChallenge.username,
      };
    }
  }

  if (!challenge) {
    return { success: false, error: "No active OTP request found. Please request a new OTP." };
  }

  if (Date.now() > challenge.expiresAt) {
    activeOtps.delete(admin.id);
    deleteAdminOtpChallenge(admin.id);
    return { success: false, error: "Passcode has expired. Please request a new OTP." };
  }

  if (challenge.otp !== inputOtp.trim()) {
    return { success: false, error: "Invalid passcode. Please check your Telegram channel/chat." };
  }

  // Invalidate challenge immediately in both memory and SQLite
  activeOtps.delete(admin.id);
  deleteAdminOtpChallenge(admin.id);

  const token = createAdminSessionToken(admin);
  return {
    success: true,
    token,
    mustChangePassword: Boolean(admin.must_change_password || !admin.hashed_password),
  };
}

/**
 * Validates direct Password Login.
 */
export function verifyPasswordLogin(
  identifier: string,
  passwordInput: string
): { success: boolean; token?: string; error?: string } {
  const admin = getAdminByUsernameOrMobile(identifier);
  if (!admin) {
    return { success: false, error: "Invalid credentials." };
  }

  const envCheck = verifyAdminEnvWhitelist(admin);
  if (!envCheck.allowed) {
    return { success: false, error: envCheck.error };
  }

  if (!admin.hashed_password) {
    return {
      success: false,
      error: "No password configured yet. Please log in via Telegram OTP first.",
    };
  }

  if (!verifyPassword(passwordInput, admin.hashed_password)) {
    return { success: false, error: "Invalid password." };
  }

  const token = createAdminSessionToken(admin);
  return { success: true, token };
}

/**
 * Signs an HMAC session token containing admin profile details.
 */
export function createAdminSessionToken(admin: AdminUserRecord): string {
  const secret =
    process.env.ADMIN_AUTH_SECRET ||
    process.env.TELEGRAM_BOT_TOKEN ||
    "btt_super_secret_auth_key_2026";

  const payload: AdminSessionPayload = {
    id: admin.id,
    username: admin.username,
    displayName: admin.display_name,
    role: admin.role,
    mobile: admin.mobile,
    avatarUrl: admin.avatar_url || (admin.role === "super_admin" ? "/brand/avatar-deepak.svg" : "/brand/avatar-amit.svg"),
    designation: admin.designation || (admin.role === "super_admin" ? "Platform Architect & Super Admin" : "Lead Mentor"),
    bio: admin.bio || "",
    tgChatId: admin.tg_chat_id || undefined,
    mustChangePassword: Boolean(admin.must_change_password || !admin.hashed_password),
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(payloadStr).digest("base64url");
  return `${payloadStr}.${signature}`;
}

/**
 * Verifies and decodes a session token.
 */
export function verifySessionToken(token: string): { valid: boolean; payload?: AdminSessionPayload } {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false };

    const [payloadStr, signature] = parts;
    const secret =
      process.env.ADMIN_AUTH_SECRET ||
      process.env.TELEGRAM_BOT_TOKEN ||
      "btt_super_secret_auth_key_2026";
    const expectedSig = crypto.createHmac("sha256", secret).update(payloadStr).digest("base64url");

    if (signature !== expectedSig) {
      return { valid: false };
    }

    const payload: AdminSessionPayload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false }; // Expired
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

/**
 * Server-side helper to check if the current request has a valid admin session.
 * Always syncs live profile from DB so fresh edits are visible immediately.
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;

  const check = verifySessionToken(token);
  if (!check.valid || !check.payload) return null;

  // Retrieve live record to reflect any profile changes made in this session
  const liveAdmin = getAdminById(check.payload.id);
  if (!liveAdmin || !liveAdmin.is_active) return null;

  // Ensure 2-layer env check still passes
  const envCheck = verifyAdminEnvWhitelist(liveAdmin);
  if (!envCheck.allowed) return null;

  return {
    id: liveAdmin.id,
    username: liveAdmin.username,
    displayName: liveAdmin.display_name,
    role: liveAdmin.role,
    mobile: liveAdmin.mobile,
    avatarUrl: liveAdmin.avatar_url || (liveAdmin.role === "super_admin" ? "/brand/avatar-deepak.svg" : "/brand/avatar-amit.svg"),
    designation: liveAdmin.designation || (liveAdmin.role === "super_admin" ? "Platform Architect & Super Admin" : "Lead Mentor"),
    bio: liveAdmin.bio || "",
    mustChangePassword: Boolean(liveAdmin.must_change_password || !liveAdmin.hashed_password),
    exp: check.payload.exp,
  };
}
