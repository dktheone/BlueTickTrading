import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { getPublishedWebinars, getActiveWebinar } from "@/lib/db";
import {
  Calendar,
  Clock,
  Video,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Award,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "Live Trading Masterclasses & Webinars | Blue Tick Trading School",
  description:
    "Join Amit Gupta for free, high-impact live masterclasses on Time Cycle Trading, BankNifty price action, and MCX Commodities turn date forecasting.",
};

export default function WebinarsPage() {
  const publishedWebinars = getPublishedWebinars();
  const activeWebinar = getActiveWebinar() || publishedWebinars[0] || null;

  const title =
    activeWebinar?.title ||
    "BankNifty, Nifty & MCX Time Cycle Masterclass: Turn Date Forecasting";
  const subtitle =
    activeWebinar?.subtitle ||
    "Learn mathematical price-time squaring to forecast market turning dates with high risk-to-reward.";
  const dateTime = activeWebinar?.date_time || "Upcoming Saturday, 7:00 PM IST";
  const duration = activeWebinar?.duration_minutes || 90;
  const bannerUrl =
    activeWebinar?.banner_image_url || "/images/traderoom/hero-02.png";
  const maxSeats = activeWebinar?.max_seats || 500;
  const registrantCount = activeWebinar?.registrant_count || 12;

  let topics: string[] = [
    "Institutional Turn Dates: Why markets reverse on specific calendar dates",
    "Price-Time Squaring: How mathematical equilibrium predicts price exhaustion",
    "Gann Geometric Angles: Identifying high-probability reversal confluences",
    "Live Market Breakdown: Practical case studies across Nifty, BankNifty & Crude Oil",
  ];

  if (activeWebinar?.topics_json) {
    try {
      const parsed = JSON.parse(activeWebinar.topics_json);
      if (Array.isArray(parsed) && parsed.length > 0) {
        topics = parsed;
      }
    } catch {
      // Use defaults on parse failure
    }
  }

  const fillPercentage = Math.min(
    100,
    Math.round((registrantCount / maxSeats) * 100)
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">
        {/* Page Hero Header */}
        <section className="bg-gradient-to-b from-[#0E5866] to-[#0E3B43] text-white pt-14 pb-20 md:pb-24 rounded-b-[40px] relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <Image
              src="/images/traderoom/Icon-001.png"
              alt="Pattern"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#2FFFB9] text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#2FFFB9]" />
              <span>Blue Tick Masterclass Hub • 100% Free Live Learning</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Live Masterclasses &amp; <span className="text-[#2FFFB9]">Webinar Schedule</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Reserve your seat for upcoming interactive masterclasses. Learn Time Cycle forecasting and Price Action with Amit Gupta.
            </p>
          </div>
        </section>

        {/* Featured Live Active Masterclass Section */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Media & Overview */}
              <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-8 bg-gradient-to-br from-slate-50 to-white border-b lg:border-b-0 lg:border-r border-slate-100">
                
                {/* 800x400 Fixed Aspect Ratio Banner */}
                <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-[#0E3B43] shadow-lg border border-slate-200/80 group">
                  <Image
                    src={bannerUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#2FFFB9] text-[#0E3B43] shadow-md flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" /> Next Live Batch
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-mono font-medium text-slate-200 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#2FFFB9]" /> {dateTime}
                    </p>
                  </div>
                </div>

                {/* Masterclass Meta Chips */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0E3B43] text-white text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#2FFFB9]" />
                    <span>{dateTime}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{duration} Minutes</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                    <Video className="w-3.5 h-3.5" />
                    <span>Zoom Live Interactive</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <span>100% Free Entry</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E3B43] leading-snug">
                    {title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {subtitle}
                  </p>
                </div>

                {/* Seat Capacity Progress */}
                <div className="p-4 rounded-2xl bg-[#0E3B43]/5 border border-[#0E3B43]/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0E3B43]">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#0E3B43]" /> Live Cohort Capacity
                    </span>
                    <span className="font-mono font-extrabold text-sm">
                      {registrantCount} / {maxSeats} Seats Filled
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0E3B43] to-[#2FFFB9] transition-all duration-1000 rounded-full"
                      style={{ width: `${fillPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-500 text-right">
                    {Math.max(0, maxSeats - registrantCount)} seats left before registration closes
                  </p>
                </div>

                {/* Key Learnings List */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What You Will Master in This Live Session:
                  </h3>
                  <ul className="space-y-2.5">
                    {topics.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#10505C] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mentor Credentials */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center font-bold text-base shrink-0">
                    AG
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0E3B43] flex items-center gap-1.5">
                      Amit Gupta <ShieldCheck className="w-4 h-4 text-[#10505C]" />
                    </h4>
                    <p className="text-xs text-slate-500">
                      SEBI &amp; NISM Certified Mentor • 15+ Years Indian Markets • 10+ Years Time Cycle Research
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Embedded Registration Form */}
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-white">
                <div className="space-y-4 mb-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E3B43]/10 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Fast Reservation
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0E3B43]">
                    Reserve Your Free Masterclass Pass
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complete 3 quick fields to secure your seat. You will instantly receive your calendar invite and Zoom link via WhatsApp, Email &amp; Telegram.
                  </p>
                </div>

                <ContactForm
                  isWebinarMode={true}
                  webinarId={activeWebinar?.id}
                  webinarTitle={title}
                  webinarDate={dateTime}
                  webinarDuration={duration}
                  webinarZoomUrl={activeWebinar?.zoom_join_url}
                  webinarSlug={activeWebinar?.slug}
                />
              </div>

            </div>
          </div>
        </section>

        {/* Published Masterclass Cohorts / Archives Section */}
        {publishedWebinars.length > 0 && (
          <section className="py-16 bg-[#F8FAFB] border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" /> Cohort Directory
                </div>
                <h2 className="text-3xl font-extrabold text-[#0E3B43]">
                  All Masterclass Batches
                </h2>
                <p className="text-slate-600 text-sm">
                  Explore current and upcoming cohorts conducted by Blue Tick Trading School.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedWebinars.map((w) => (
                  <div
                    key={w.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          Active Cohort
                        </span>
                        <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {w.duration_minutes} Mins
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#0E3B43] leading-snug line-clamp-2">
                        {w.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {w.subtitle || w.short_description || "Time Cycle Trading masterclass with Amit Gupta."}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-xs text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#10505C]" />
                        {w.date_time}
                      </div>

                      <Link
                        href={`/webinars/${w.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0E3B43] hover:text-[#10505C]"
                      >
                        <span>View Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
