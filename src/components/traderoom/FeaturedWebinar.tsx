"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import { WebinarRecord } from "@/lib/db";

interface FeaturedWebinarProps {
  webinar?: WebinarRecord | null;
}

export default function FeaturedWebinar({ webinar }: FeaturedWebinarProps) {
  // Default fallback if no webinar is currently published
  const title =
    webinar?.title ||
    "BankNifty, Nifty & MCX Time Cycle Masterclass: Turn Date Forecasting";
  const subtitle =
    webinar?.subtitle ||
    "Learn mathematical price-time squaring to forecast market turning dates with high risk-to-reward.";
  const dateTime = webinar?.date_time || "Upcoming Saturday, 7:00 PM IST";
  const duration = webinar?.duration_minutes || 90;
  const bannerUrl = webinar?.banner_image_url || "/images/traderoom/hero-02.png";
  const slug = webinar?.slug || "live-market-masterclass-poka";
  const maxSeats = webinar?.max_seats || 500;
  const registrantCount = webinar?.registrant_count || 12;

  let topics: string[] = [
    "Institutional Turn Dates: Why markets reverse on specific calendar dates",
    "Price-Time Squaring: How mathematical equilibrium predicts price exhaustion",
    "Gann Geometric Angles: Identifying high-probability reversal confluences",
    "Live Market Breakdown: Practical case studies across Nifty, BankNifty & Crude Oil",
  ];

  if (webinar?.topics_json) {
    try {
      const parsed = JSON.parse(webinar.topics_json);
      if (Array.isArray(parsed) && parsed.length > 0) {
        topics = parsed;
      }
    } catch {
      // Keep defaults on parse failure
    }
  }

  const fillPercentage = Math.min(
    100,
    Math.round((registrantCount / maxSeats) * 100)
  );

  return (
    <section id="webinar-section" className="py-20 bg-gradient-to-b from-white via-[#F8FAFB] to-[#F0F5F6] relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0E3B43]/5 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Flame className="w-4 h-4 text-[#2FFFB9] animate-bounce" />
            <span>Featured Live Masterclass • 100% Free</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0E3B43] tracking-tight">
            Join Our Next Live Saturday Session
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Experience real-time chart breakdowns, Gann time cycle confluences, and live market Q&amp;A directly with Amit Gupta.
          </p>
        </div>

        {/* Masterclass Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Banner Visual & Highlights */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-white border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="space-y-6">
                
                {/* 800x400 Aspect Banner Container */}
                <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-[#0E3B43] shadow-lg border border-slate-200/60 group">
                  <Image
                    src={bannerUrl}
                    alt={title}
                    fill
                    priority
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2FFFB9] text-[#0E3B43] shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Live Zoom Masterclass
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-mono font-medium text-slate-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#2FFFB9]" /> {dateTime}
                    </p>
                  </div>
                </div>

                {/* Seat Capacity Progress */}
                <div className="p-4 rounded-2xl bg-[#0E3B43]/5 border border-[#0E3B43]/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0E3B43]">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#0E3B43]" /> Seat Availability
                    </span>
                    <span className="font-mono font-extrabold text-sm">
                      {registrantCount} / {maxSeats} Reserved
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0E3B43] to-[#2FFFB9] transition-all duration-1000 rounded-full"
                      style={{ width: `${fillPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-500 text-right">
                    {Math.max(0, maxSeats - registrantCount)} free seats remaining for this cohort
                  </p>
                </div>

              </div>

              {/* Verified Mentor Tag */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center font-bold text-sm">
                  AG
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0E3B43] flex items-center gap-1">
                    Amit Gupta <ShieldCheck className="w-3.5 h-3.5 text-[#2FFFB9]" />
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    SEBI &amp; NISM Certified • 15+ Yrs Market Experience
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Schedule & Curriculum Takeaways */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                
                {/* Meta Strip */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0E3B43] text-white text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#2FFFB9]" />
                    <span>{dateTime}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{duration} Minutes</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <span>100% Free Live Access</span>
                  </div>
                </div>

                {/* Masterclass Title */}
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0E3B43] leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {subtitle}
                  </p>
                </div>

                {/* Curriculum Bullet Points */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What You Will Master in This Live Session:
                  </h4>
                  <ul className="space-y-2.5">
                    {topics.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#10505C] shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all duration-300 shadow-xl hover:shadow-[#2FFFB9]/30 text-sm hover:-translate-y-0.5 text-center"
                >
                  <span>Register Free For This Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href={`/webinars/${slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-[#0E3B43] bg-slate-100 hover:bg-slate-200 transition-all text-sm text-center"
                >
                  <span>Full Curriculum</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
