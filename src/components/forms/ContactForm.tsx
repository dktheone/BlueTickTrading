"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, ShieldCheck, AlertCircle, Loader2, Sparkles, Phone, Mail, User, BookOpen } from "lucide-react";

interface ContactFormProps {
  defaultInterest?: string;
  isWebinarMode?: boolean;
}

export default function ContactForm({ defaultInterest = "Upcoming Saturday Live Masterclass", isWebinarMode = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "Complete Beginner (< 6 Months)",
    interest: defaultInterest,
    message: "",
    website_url_hp: "", // Honeypot field for bot trap
  });

  const [formLoadTime, setFormLoadTime] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formLoadTime,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMsg(data.message || "Thank you! Your details have been submitted successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          experience: "Complete Beginner (< 6 Months)",
          interest: defaultInterest,
          message: "",
          website_url_hp: "",
        });
      } else {
        setStatus("error");
        setFeedbackMsg(data.error || "Failed to submit. Please check your details and try again.");
      }
    } catch (err) {
      setStatus("error");
      setFeedbackMsg("Network error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative">
      
      {/* Form Title */}
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/15 text-emerald-800 text-xs font-bold uppercase tracking-wide border border-brand-mint/30">
          <Sparkles className="w-3.5 h-3.5" /> {isWebinarMode ? "Free Masterclass Registration" : "Get in Touch / Enroll"}
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
          {isWebinarMode ? "Reserve Your Webinar Seat" : "Connect with Our Trading Counselors"}
        </h3>
        <p className="text-sm text-slate-600">
          {isWebinarMode
            ? "Fill out the quick form below to receive the private Zoom link on your WhatsApp & Email."
            : "Have questions about our mentorship or webinars? Leave your details below and we will guide you."}
        </p>
      </div>

      {status === "success" ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in-50 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-bold text-emerald-900">Registration Confirmed!</h4>
          <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
            {feedbackMsg}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Honeypot Spam Trap (Hidden from human users) */}
          <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="website_url_hp">Leave this empty</label>
            <input
              type="text"
              id="website_url_hp"
              name="website_url_hp"
              value={formData.website_url_hp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-teal" /> Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFB] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-brand-teal transition-all"
            />
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-teal" /> Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFB] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-brand-teal transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-teal" /> WhatsApp Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFB] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-brand-teal transition-all"
              />
            </div>
          </div>

          {/* Trading Experience Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-teal" /> Your Trading Experience Level
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFB] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-brand-teal transition-all"
            >
              <option value="Complete Beginner (< 6 Months)">Complete Beginner (Less than 6 months)</option>
              <option value="Intermediate (6 to 24 Months)">Intermediate (6 to 24 months of trading)</option>
              <option value="Active Options Trader">Active F&O / Options Trader</option>
              <option value="Working Professional seeking Swing Strategy">Working Professional seeking Swing Strategy</option>
            </select>
          </div>

          {/* Interest Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Program of Interest
            </label>
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFB] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-brand-teal transition-all"
            >
              <option value="Upcoming Saturday Live Masterclass">Upcoming Saturday Live Masterclass (Free)</option>
              <option value="Price Action & Smart Money Mentorship">Price Action & Smart Money Mentorship</option>
              <option value="Futures & Options (F&O) Architecture">Futures & Options (F&O) Architecture</option>
              <option value="Stock Market Foundation Batch">Stock Market Foundation Batch</option>
              <option value="1-on-1 Portfolio & Strategy Consultation">1-on-1 Portfolio & Strategy Consultation</option>
            </select>
          </div>

          {/* Optional Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Any Specific Question or Goal? (Optional)
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you want to achieve or any challenges you face in current trading..."
              className="w-full px-4 py-3 rounded-xl bg-[#F8FAFB] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-brand-teal transition-all"
            />
          </div>

          {/* Error message alert */}
          {status === "error" && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-700 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full font-extrabold text-brand-dark bg-brand-mint hover:bg-brand-accent transition-all duration-300 shadow-xl hover:shadow-brand-mint/30 text-base disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Securing Your Registration...</span>
              </>
            ) : (
              <>
                <span>{isWebinarMode ? "Confirm Free Webinar Seat" : "Submit Registration / Inquiry"}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Security & Spam disclaimer */}
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Encrypted transmission. No spam. Privacy guaranteed.</span>
          </div>

        </form>
      )}

    </div>
  );
}
