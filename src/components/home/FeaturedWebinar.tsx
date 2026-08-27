"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Video, Users, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

export default function FeaturedWebinar() {
  // Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="webinar" className="py-20 bg-[#F0F5F6] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary text-brand-mint text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Upcoming Live Masterclass
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            Join Our Next Live Market Webinar
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Get exclusive access to real-time charting, institutional levels, and high-probability options setups directly from our senior trading mentor.
          </p>
        </div>

        {/* Featured Webinar Banner Box */}
        <div className="bg-brand-primary rounded-3xl text-white shadow-2xl overflow-hidden border border-brand-teal/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
            
            {/* Left Col: Webinar Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-brand-mint text-brand-dark font-extrabold text-xs flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-dark animate-ping" /> LIVE ON ZOOM
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-brand-lime border border-brand-lime/30 text-xs font-semibold">
                  100% Free (Limited Seats)
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10 text-xs font-medium">
                  Beginner to Advanced
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                BankNifty & Nifty Price Action Mastery: <span className="text-brand-mint">Smart Money Breakouts</span>
              </h3>

              {/* Schedule Info Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Calendar className="w-5 h-5 text-brand-mint shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">DATE</span>
                    <span className="text-xs sm:text-sm font-bold text-white">This Saturday</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-5 h-5 text-brand-lime shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">TIME</span>
                    <span className="text-xs sm:text-sm font-bold text-white">7:00 PM - 9:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Users className="w-5 h-5 text-brand-mint shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">SEATS</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-mint">78 / 100 Filled</span>
                  </div>
                </div>
              </div>

              {/* What You Will Learn */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">What You Will Discover:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                    <span>How to spot Institutional Order Flow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                    <span>Options Buying without theta decay traps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                    <span>High RR (1:3+) Intraday Setups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                    <span>Live Q&A and Chart Breakdown</span>
                  </div>
                </div>
              </div>

              {/* Educator / Host Preview */}
              <div className="pt-2 flex items-center gap-3.5 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-brand-teal border-2 border-brand-mint flex items-center justify-center text-white font-bold text-sm">
                  BT
                </div>
                <div>
                  <span className="text-xs text-brand-mint font-semibold block flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" /> Head Mentor & Fund Trader
                  </span>
                  <span className="text-sm font-bold text-white">BlueTick Lead Trading Faculty</span>
                  <p className="text-[11px] text-slate-400">8+ Years Market Experience • NISM Certified</p>
                </div>
              </div>

            </div>

            {/* Right Col: Live Countdown & Quick Registration Trigger */}
            <div className="lg:col-span-5 bg-brand-dark/90 backdrop-blur-xl border border-brand-teal/60 rounded-2xl p-6 sm:p-8 space-y-6 text-center shadow-xl">
              
              <div className="space-y-1">
                <span className="text-xs font-bold text-brand-lime uppercase tracking-widest">Registration Closes In</span>
                <h4 className="text-lg font-bold text-white">Reserve Your Free Spot</h4>
              </div>

              {/* Countdown Flip Cards */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-brand-primary p-2.5 rounded-xl border border-brand-teal/50">
                  <span className="text-2xl sm:text-3xl font-extrabold text-brand-mint font-mono block">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Days</span>
                </div>
                <div className="bg-brand-primary p-2.5 rounded-xl border border-brand-teal/50">
                  <span className="text-2xl sm:text-3xl font-extrabold text-brand-mint font-mono block">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Hours</span>
                </div>
                <div className="bg-brand-primary p-2.5 rounded-xl border border-brand-teal/50">
                  <span className="text-2xl sm:text-3xl font-extrabold text-brand-mint font-mono block">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Mins</span>
                </div>
                <div className="bg-brand-primary p-2.5 rounded-xl border border-brand-teal/50">
                  <span className="text-2xl sm:text-3xl font-extrabold text-brand-lime font-mono block">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Secs</span>
                </div>
              </div>

              {/* Instant Action CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/webinars/banknifty-price-action-masterclass"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-brand-dark bg-brand-mint hover:bg-brand-accent transition-all duration-300 shadow-xl hover:shadow-brand-mint/30 text-sm sm:text-base hover:-translate-y-0.5"
                >
                  <span>View Webinar Landing Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-xs sm:text-sm"
                >
                  <span>Quick Instant Registration</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-lime" />
                <span>Instant Zoom link delivered on WhatsApp & Email</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
