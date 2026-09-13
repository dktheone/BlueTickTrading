"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
  Phone,
  Mail,
  User,
  BookOpen,
  MessageCircle,
  Send as TelegramIcon,
  X,
  Lock,
  Calendar,
  Download,
  ExternalLink,
  Clock,
} from "lucide-react";
import { generateGoogleCalendarUrl, generateIcsCalendar } from "@/lib/calendar";

// ==========================================
// 1. Zod Validation Schemas
// ==========================================

// Schema for Webinar Mode: Only Name, Email, Phone, and Consent Checkbox
const webinarSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Name must be less than 80 characters")
    .regex(/^[a-zA-Z\s.]+$/, "Name should contain letters only"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address (e.g. name@domain.com)"),
  phone: z
    .string()
    .min(10, "Phone number must have at least 10 digits")
    .regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  consent: z.literal(true, {
    message: "You must consent to receive webinar links via WhatsApp, Email & Telegram",
  }),
  website_url_hp: z.string().optional(),
});

// Schema for General Contact Mode (Contact Page): Full inquiry with message & interest
const generalContactSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Name must be less than 80 characters"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must have at least 10 digits")
    .regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  experience: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().optional(),
  website_url_hp: z.string().optional(),
});

type WebinarFormValues = z.infer<typeof webinarSchema>;
type GeneralContactFormValues = z.infer<typeof generalContactSchema>;

interface ContactFormProps {
  defaultInterest?: string;
  isWebinarMode?: boolean;
  webinarId?: number;
  webinarTitle?: string | null;
  webinarDate?: string | null;
  webinarDuration?: string | number;
  webinarZoomUrl?: string | null;
  webinarSlug?: string | null;
}

export default function ContactForm({
  defaultInterest = "Upcoming Saturday Live Masterclass",
  isWebinarMode = false,
  webinarId,
  webinarTitle,
  webinarDate,
  webinarDuration = 90,
  webinarZoomUrl,
  webinarSlug,
}: ContactFormProps) {
  const [formLoadTime, setFormLoadTime] = useState<number>(0);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverFeedbackMsg, setServerFeedbackMsg] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("https://t.me/blueticktrading");
  const [showModal, setShowModal] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [calendarData, setCalendarData] = useState<{
    googleCalendarUrl?: string;
    icsContent?: string;
    title?: string;
    dateTimeStr?: string;
    durationMinutes?: number;
  } | null>(null);

  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  // React Hook Form initialized with Zod Resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<any>({
    resolver: zodResolver(isWebinarMode ? webinarSchema : generalContactSchema) as any,
    mode: "onBlur", // validate on blur for instant, responsive inline feedback
    defaultValues: isWebinarMode
      ? {
          name: "",
          email: "",
          phone: "",
          consent: false,
          website_url_hp: "",
        }
      : {
          name: "",
          email: "",
          phone: "",
          experience: "Complete Beginner (< 6 Months)",
          interest: defaultInterest,
          message: "",
          consent: true,
          website_url_hp: "",
        },
  });

  const handleDownloadIcs = () => {
    const content =
      calendarData?.icsContent ||
      generateIcsCalendar({
        id: webinarId,
        title: webinarTitle || defaultInterest,
        dateTimeStr: webinarDate || "Upcoming Saturday, 7:00 PM IST",
        durationMinutes: typeof webinarDuration === "number" ? webinarDuration : parseInt(String(webinarDuration)) || 90,
        locationUrl: webinarZoomUrl || undefined,
        slug: webinarSlug || undefined,
      });

    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${webinarSlug || "masterclass"}-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getGoogleCalendarUrl = () => {
    if (calendarData?.googleCalendarUrl) return calendarData.googleCalendarUrl;
    return generateGoogleCalendarUrl({
      id: webinarId,
      title: webinarTitle || defaultInterest,
      dateTimeStr: webinarDate || "Upcoming Saturday, 7:00 PM IST",
      durationMinutes: typeof webinarDuration === "number" ? webinarDuration : parseInt(String(webinarDuration)) || 90,
      locationUrl: webinarZoomUrl || undefined,
      slug: webinarSlug || undefined,
    });
  };

  const onSubmit = async (values: any) => {
    setSubmissionStatus("loading");
    setServerFeedbackMsg("");
    const currentName = values.name;

    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        experience: values.experience || (isWebinarMode ? "Live Masterclass Attendee" : "Complete Beginner"),
        interest: values.interest || defaultInterest,
        message: values.message ? values.message.trim() : isWebinarMode ? "Webinar Fast-Registration" : "",
        consent: values.consent,
        website_url_hp: values.website_url_hp || "",
        formLoadTime,
        webinarId: webinarId ? Number(webinarId) : undefined,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmissionStatus("success");
        setSubmittedName(currentName);
        setShowModal(true);
        setServerFeedbackMsg(data.message || "Thank you! Your registration has been confirmed.");
        if (data.telegramLink) {
          setTelegramUrl(data.telegramLink);
        }
        if (data.calendar) {
          setCalendarData(data.calendar);
        }
        reset();
      } else {
        setSubmissionStatus("error");
        setServerFeedbackMsg(data.error || "Failed to submit. Please check your details and try again.");
      }
    } catch {
      setSubmissionStatus("error");
      setServerFeedbackMsg("Network error occurred. Please check your internet connection.");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xl relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2FFFB9] via-[#C5FF7C] to-[#10505C]" />

      {/* Form Title & Subtitle */}
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2FFFB9]/15 text-[#0E3B43] text-xs font-black uppercase tracking-wider border border-[#2FFFB9]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#0E3B43]" />
          <span>{isWebinarMode ? "Free Masterclass Pass" : "Contact & Counseling"}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-[#0E3B43] tracking-tight">
          {isWebinarMode ? "Reserve Your Free Seat" : "Connect with Mentors"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isWebinarMode
            ? "Enter your details to receive private Zoom access, workbook, and turn date projections."
            : "Have questions about time cycle trading or batch schedule? Drop your details below."}
        </p>
      </div>

      {submissionStatus === "success" ? (
        <div className="p-8 rounded-3xl bg-emerald-50/90 border border-emerald-200 text-center space-y-6 animate-in fade-in-50 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h4 className="text-2xl font-black text-emerald-950">Seat Reserved Successfully!</h4>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
              {serverFeedbackMsg}
            </p>
          </div>

          {/* 1-Click Calendar Sync Box (Webinar Mode Only) */}
          {isWebinarMode && (
            <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-3.5 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black text-[#0E3B43] uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-[#0E3B43]" /> Add to Your Calendar:
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Instant Reminder
                </span>
              </div>

              {/* Masterclass Timing Chip */}
              <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <span className="font-bold text-[#0E3B43] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0E3B43]" />
                  {calendarData?.dateTimeStr || webinarDate || "Upcoming Saturday, 7:00 PM IST"}
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {calendarData?.durationMinutes || webinarDuration || 90} Mins
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-emerald-700 font-semibold">Zoom Live</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Sync the masterclass to your calendar with 1-click so your phone/laptop alerts you before we go live:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* 1-Click Google Calendar */}
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0E3B43] hover:bg-[#10505C] text-[#2FFFB9] font-bold text-xs shadow-sm transition-all hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4 text-[#2FFFB9]" />
                  <span>Add to Google Calendar</span>
                </a>

                {/* 1-Click Download .ics for Outlook / Apple Calendar */}
                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4 text-[#0E3B43]" />
                  <span>Download .ics (Apple / Outlook)</span>
                </button>
              </div>
            </div>
          )}

          {/* Direct Telegram & WhatsApp Action Box */}
          <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-3 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#2AABEE]" /> Instant Community & Zoom Delivery:
            </div>
            <p className="text-xs text-slate-600">
              Join the official Telegram broadcast channel to get the live Zoom link 15 minutes before the session:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
              >
                <TelegramIcon className="w-4 h-4" />
                <span>Join Official Telegram</span>
              </a>

              <a
                href="https://wa.me/918004855663?text=Hi%20Amit%20Sir%2C%20I%20just%20registered%20for%20the%20BlueTick%20Webinar!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSubmissionStatus("idle")}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium transition-colors"
            >
              Register Another Student
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Honeypot Spam Trap */}
          <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
            <input type="text" {...register("website_url_hp")} tabIndex={-1} autoComplete="off" />
          </div>

          {/* Perspective Header Card: Webinar Registration */}
          {isWebinarMode && (
            <div className="p-4 rounded-2xl bg-[#0E3B43] text-white border border-[#2FFFB9]/30 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2FFFB9]/20 text-[#2FFFB9] text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#2FFFB9]" /> Masterclass Registration
                </span>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  100% Free Live Access
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {webinarTitle || defaultInterest}
                </h4>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-300">
                  <span className="flex items-center gap-1 font-medium text-slate-200">
                    <Calendar className="w-3 h-3 text-[#2FFFB9]" />
                    {webinarDate || "Upcoming Saturday, 7:00 PM IST"}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {webinarDuration || 90} Mins
                  </span>
                  <span>&bull;</span>
                  <span className="text-emerald-400 font-semibold">Zoom Live</span>
                </div>
              </div>
            </div>
          )}

          {/* Perspective Header Card: General Student Counseling */}
          {!isWebinarMode && (
            <div className="p-4 rounded-2xl bg-[#0E3B43]/5 border border-[#0E3B43]/10 text-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0E3B43] uppercase tracking-wider">
                <MessageCircle className="w-3.5 h-3.5 text-[#10505C]" />
                <span>Student Counseling &amp; Inquiry Desk</span>
              </div>
              <p className="text-xs text-slate-500">
                Submit your inquiry below. Amit Gupta&apos;s academic counseling team will assist you with session details and course guidance.
              </p>
            </div>
          )}

          {/* 1. Full Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0E3B43]" /> Full Name <span className="text-rose-500">*</span>
              </span>
              {errors.name && (
                <span className="text-[11px] text-rose-500 font-bold lowercase">
                  {errors.name.message as string}
                </span>
              )}
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. Rahul Sharma"
              className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFB] border text-slate-900 text-sm font-medium transition-all focus:outline-none focus:bg-white ${
                errors.name
                  ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                  : "border-slate-200 focus:border-[#0E3B43] focus:ring-2 focus:ring-[#2FFFB9]/40"
              }`}
            />
          </div>

          {/* 2. Email Address Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0E3B43]" /> Email Address <span className="text-rose-500">*</span>
              </span>
              {errors.email && (
                <span className="text-[11px] text-rose-500 font-bold lowercase">
                  {errors.email.message as string}
                </span>
              )}
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="rahul@gmail.com"
              className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFB] border text-slate-900 text-sm font-medium transition-all focus:outline-none focus:bg-white ${
                errors.email
                  ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                  : "border-slate-200 focus:border-[#0E3B43] focus:ring-2 focus:ring-[#2FFFB9]/40"
              }`}
            />
          </div>

          {/* 3. Phone Number Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#0E3B43]" /> WhatsApp / Mobile Number{" "}
                <span className="text-rose-500">*</span>
              </span>
              {errors.phone && (
                <span className="text-[11px] text-rose-500 font-bold lowercase">
                  {errors.phone.message as string}
                </span>
              )}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 text-sm font-bold pointer-events-none">+91</span>
              <input
                type="tel"
                maxLength={10}
                {...register("phone")}
                placeholder="9876543210"
                className={`w-full pl-14 pr-4 py-3 rounded-xl bg-[#F8FAFB] border text-slate-900 text-sm font-medium transition-all focus:outline-none focus:bg-white ${
                  errors.phone
                    ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-200 focus:border-[#0E3B43] focus:ring-2 focus:ring-[#2FFFB9]/40"
                }`}
              />
            </div>
          </div>

          {/* NON-WEBINAR GENERAL CONTACT FIELDS ONLY (Hidden in Webinar Mode) */}
          {!isWebinarMode && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#0E3B43]" /> Your Trading Experience
                </label>
                <select
                  {...register("experience")}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFB] border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2FFFB9]/40"
                >
                  <option value="Complete Beginner (< 6 Months)">Complete Beginner (&lt; 6 Months)</option>
                  <option value="Intermediate (6 Months - 2 Years)">Intermediate (6 Months - 2 Years)</option>
                  <option value="Experienced Trader (2+ Years)">Experienced Trader (2+ Years)</option>
                  <option value="Full-Time Professional / Prop Trader">Full-Time Professional / Prop Trader</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0E3B43]" /> Topic of Interest
                </label>
                <select
                  {...register("interest")}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFB] border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2FFFB9]/40"
                >
                  <option value="Time Cycle Trading Masterclass">Time Cycle Trading Masterclass</option>
                  <option value="Upcoming Saturday Live Masterclass">Upcoming Saturday Live Masterclass</option>
                  <option value="Price Action & Smart Money Mentorship">Price Action & Smart Money Mentorship</option>
                  <option value="Futures & Options (F&O) Architecture">Futures & Options (F&O) Architecture</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Any Specific Question or Goal? (Optional)
                </label>
                <textarea
                  rows={2}
                  {...register("message")}
                  placeholder="Tell us what you want to achieve or any challenges you face in trading..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFB] border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2FFFB9]/40"
                />
              </div>
            </>
          )}

          {/* 4. Mandatory Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-1 w-4 h-4 rounded text-[#0E3B43] border-slate-300 focus:ring-[#0E3B43] cursor-pointer"
              />
              <span className="text-xs text-slate-600 leading-snug group-hover:text-slate-900 transition-colors">
                I agree to receive the private Zoom link, session reminders, and educational market study charts via{" "}
                <strong className="text-slate-800 font-semibold">WhatsApp, Telegram &amp; Email</strong>. Zero spam.
              </span>
            </label>
            {errors.consent && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.consent.message as string}</span>
              </p>
            )}
          </div>

          {/* Server Error Alert */}
          {submissionStatus === "error" && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-700 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverFeedbackMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || submissionStatus === "loading"}
            className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full font-black text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all duration-300 shadow-xl hover:shadow-[#2FFFB9]/30 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 mt-2"
          >
            {isSubmitting || submissionStatus === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Reserving Free Seat...</span>
              </>
            ) : (
              <>
                <span>{isWebinarMode ? "Claim Free Masterclass Seat" : "Submit Registration / Inquiry"}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Trust Seal & Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% Free • No Credit Card • DPDP Act 2023 Compliant</span>
          </div>
        </form>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-lg w-full border border-slate-200 shadow-2xl relative space-y-6 text-center animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2FFFB9]/20 text-[#0E3B43] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#0E3B43]" /> Registration Confirmed
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0E3B43]">
                Welcome{submittedName ? `, ${submittedName}` : ""}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                {serverFeedbackMsg ||
                  "Your free seat for the live trading masterclass with Amit Gupta is confirmed! Check your WhatsApp & Telegram for the private Zoom link."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFB] border border-slate-200 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#2AABEE]" /> Instant Broadcast Channel:
              </div>
              <p className="text-xs text-slate-600">
                Join our private Telegram channel to get live Zoom coordinates 15 minutes before the session:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                >
                  <TelegramIcon className="w-4 h-4" />
                  <span>Join Official Telegram</span>
                </a>

                <a
                  href="https://wa.me/918004855663?text=Hi%20Amit%20Sir%2C%20I%20just%20registered%20for%20the%20BlueTick%20Webinar!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-3.5 rounded-full bg-[#0E3B43] hover:bg-[#10505C] text-[#2FFFB9] font-bold text-sm transition-all shadow-md"
            >
              Done / Continue Browsing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
