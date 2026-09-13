"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Lock,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Send as TelegramIcon,
  Key,
  Smartphone,
  ArrowRight,
} from "lucide-react";

export default function AdminLoginPage() {
  const [mode, setMode] = useState<"otp" | "password" | "reset">("otp");
  const [step, setStep] = useState<"identifier" | "otp">("identifier");
  const [resetStep, setResetStep] = useState<"request" | "verify">("request");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Request Telegram OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/otp-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to request passcode.");
        setLoading(false);
        return;
      }

      setSuccessMsg(data.message || "Passcode dispatched to Telegram!");
      setStep("otp");
    } catch {
      setErrorMsg("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Verify Telegram OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/otp-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Invalid passcode.");
        setLoading(false);
        return;
      }

      window.location.href = data.redirectUrl || "/admin";
    } catch {
      setErrorMsg("Network error during verification.");
      setLoading(false);
    }
  };

  // Login via Password
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Invalid credentials.");
        setLoading(false);
        return;
      }

      window.location.href = data.redirectUrl || "/admin";
    } catch {
      setErrorMsg("Network error during login.");
      setLoading(false);
    }
  };

  // Request OTP for Password Reset
  const handleRequestResetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/otp-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to dispatch verification code.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Verification passcode dispatched to your Telegram! Enter code and new password.");
      setResetStep("verify");
    } catch {
      setErrorMsg("Network error requesting reset code.");
    } finally {
      setLoading(false);
    }
  };

  // Commit Password Reset
  const handleCommitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          otp,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Failed to reset password. Please check your OTP.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Password reset successfully! Logging you into Admin Portal...");
      setTimeout(() => {
        window.location.href = data.redirectUrl || "/admin";
      }, 800);
    } catch {
      setErrorMsg("Network error saving new password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#082126] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#10505C]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0E3B43]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="relative h-12 w-48 mx-auto">
            <Image
              src="/brand/logo-wide.png"
              alt="Blue Tick Trading School"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Access Portal
          </div>
          <p className="text-xs text-slate-300">
            Authorized administrative access only.
          </p>
        </div>

        {/* Tab Switcher: Telegram OTP vs Password */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/30 border border-white/10 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode("otp");
              setErrorMsg("");
              setStep("identifier");
            }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mode === "otp"
                ? "bg-[#2FFFB9] text-[#0E3B43] shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <TelegramIcon className="w-3.5 h-3.5" />
            Telegram OTP
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("password");
              setErrorMsg("");
            }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mode === "password"
                ? "bg-[#2FFFB9] text-[#0E3B43] shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            Admin Password
          </button>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 leading-relaxed">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && step === "otp" && mode === "otp" && (
          <div className="p-3.5 rounded-2xl bg-[#2FFFB9]/10 border border-[#2FFFB9]/30 flex items-start gap-2.5 text-xs text-[#2FFFB9] leading-relaxed">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2FFFB9] mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* MODE 1: TELEGRAM OTP LOGIN */}
        {mode === "otp" && (
          <>
            {step === "identifier" ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Admin Username or Mobile
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Enter admin username or mobile"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2FFFB9] focus:border-[#2FFFB9] placeholder-slate-400"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Enter your registered administrative identifier.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-lg hover:shadow-[#2FFFB9]/20 text-sm disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching Passcode...</span>
                    </>
                  ) : (
                    <>
                      <TelegramIcon className="w-4 h-4" />
                      <span>Send Passcode to Telegram</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Enter 6-Digit Telegram Passcode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="••••••"
                    className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/15 text-white text-center tracking-[0.5em] text-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#2FFFB9] focus:border-[#2FFFB9] placeholder-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-lg hover:shadow-[#2FFFB9]/20 text-sm disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Session...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize 7-Day Session</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("identifier");
                      setOtp("");
                      setErrorMsg("");
                    }}
                    className="text-xs text-slate-400 hover:text-white underline font-medium transition-colors"
                  >
                    Change Identity or Re-request
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {/* MODE 2: PASSWORD LOGIN */}
        {mode === "password" && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                Admin Username or Mobile
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter admin username or mobile"
                className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2FFFB9] placeholder-slate-400"
              />
              <p className="text-[11px] text-slate-400">
                Enter your authorized credentials.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                Secure Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2FFFB9] placeholder-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-lg hover:shadow-[#2FFFB9]/20 text-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Log In to Admin Portal</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  setMode("reset");
                  setResetStep("request");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="text-[#2FFFB9] hover:underline font-semibold"
              >
                Forgot Password?
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("otp");
                  setStep("identifier");
                  setErrorMsg("");
                }}
                className="text-slate-400 hover:text-white underline"
              >
                Log in via Telegram OTP
              </button>
            </div>
          </form>
        )}

        {/* MODE 3: FORGOT / RESET PASSWORD */}
        {mode === "reset" && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <strong className="text-[#2FFFB9] block mb-1">Password Recovery:</strong>
              Reset your password securely by verifying a 6-digit one-time passcode delivered to your Telegram account.
            </div>

            {resetStep === "request" ? (
              <form onSubmit={handleRequestResetOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Admin Username or Mobile
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter admin username or mobile"
                    className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2FFFB9] placeholder-slate-400"
                  />
                  <p className="text-[11px] text-slate-400">
                    Verification passcode will be delivered to your authorized administrative channel.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-lg hover:shadow-[#2FFFB9]/20 text-sm disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching Reset Code...</span>
                    </>
                  ) : (
                    <>
                      <TelegramIcon className="w-4 h-4" />
                      <span>Send Recovery Code to Telegram</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("password");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="text-xs text-slate-400 hover:text-white underline font-medium"
                  >
                    Back to Password Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleCommitReset} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Enter 6-Digit Telegram Recovery Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="••••••"
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/15 text-white text-center tracking-[0.5em] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#2FFFB9] placeholder-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    New Secure Password (min 6 characters)
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2FFFB9] placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2FFFB9] placeholder-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6 || newPassword.length < 6}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-lg hover:shadow-[#2FFFB9]/20 text-sm disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving & Authorizing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Reset Password & Log In</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setResetStep("request")}
                    className="text-slate-400 hover:text-white underline font-medium"
                  >
                    Resend Code
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("password");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="text-slate-400 hover:text-white underline font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-white/10 text-center text-[11px] text-slate-400">
          Protected by encrypted administrative access control.
        </div>
      </div>
    </div>
  );
}
