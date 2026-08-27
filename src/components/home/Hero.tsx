"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Play, TrendingUp, ShieldCheck, Users, Award, Star, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative bg-brand-primary text-white pt-10 pb-20 md:pb-28 rounded-b-[35px] lg:rounded-b-[50px] overflow-hidden border-b border-brand-teal/40">
      {/* Background Ambient Glow & Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E5866] via-brand-primary to-brand-dark opacity-90 -z-10" />
      <div 
        className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#2FFFB9_1px,transparent_1px)] [background-size:24px_24px] -z-10 pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-brand-mint/30 text-brand-mint text-xs sm:text-sm font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-mint animate-ping" />
              <span>Next Live Batch Starting This Weekend</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Master Online Trading with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mint via-emerald-300 to-brand-lime">Institutional Price Action</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Stop relying on random indicators and unverified tips. Learn how smart money moves the markets, master strict 1:3+ risk-to-reward setups, and trade live with experienced market mentors.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm text-slate-200 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                <span>Live Market Trading Room</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                <span>Smart Money & Order Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                <span>Options Buying & Hedging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                <span>Lifetime Mentor Community</span>
              </div>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#webinar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-brand-dark bg-brand-mint hover:bg-brand-accent transition-all duration-300 shadow-xl hover:shadow-brand-mint/30 hover:-translate-y-0.5 text-base"
              >
                <span>Reserve Free Masterclass Seat</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 backdrop-blur-md text-base"
              >
                <span>Explore All Programs</span>
              </a>
            </div>

            {/* Social Proof Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5</span>
                <span className="text-slate-400">(2,400+ reviews)</span>
              </div>
              <span className="text-slate-500">•</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-brand-lime" />
                <span>15,000+ Traders Trained</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card */}
              <div className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-6">
                
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center border border-brand-mint/30">
                      <Image
                        src="/brand/b.png"
                        alt="Logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Live Trading Dashboard</h4>
                      <p className="text-[11px] text-brand-mint flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" /> Live Analysis Mode
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-brand-mint border border-emerald-500/30 text-xs font-bold">
                    PRO
                  </span>
                </div>

                {/* Market PnL & Signals Preview */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-brand-dark/60 border border-white/10">
                    <span className="text-[11px] text-slate-400 block font-medium">NIFTY 50 (Index)</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-base font-bold text-white">24,852.40</span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +0.92%
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-brand-dark/60 border border-white/10">
                    <span className="text-[11px] text-slate-400 block font-medium">BANK NIFTY</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-base font-bold text-white">51,320.15</span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +1.28%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Strategy Snapshot */}
                <div className="p-4 rounded-2xl bg-brand-teal/40 border border-brand-mint/20 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">Risk-to-Reward Ratio</span>
                    <span className="text-brand-lime font-bold">1 : 3.5 Target</span>
                  </div>
                  <div className="w-full bg-brand-dark/80 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-mint to-brand-lime h-2 rounded-full w-[78%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>Stop Loss: 15 pts</span>
                    <span>Target: 52 pts</span>
                  </div>
                </div>

                {/* Webinar Highlight Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-dark border border-brand-mint/40 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">Upcoming Webinar</span>
                    <h5 className="text-xs sm:text-sm font-bold text-white line-clamp-1">BankNifty Price Action Blueprint</h5>
                    <p className="text-[11px] text-slate-300">Saturday • 7:00 PM IST (Zoom Live)</p>
                  </div>
                  <a
                    href="#webinar"
                    className="px-3.5 py-2 rounded-xl bg-brand-mint text-brand-dark font-bold text-xs shrink-0 hover:bg-brand-accent transition-colors"
                  >
                    Free Pass
                  </a>
                </div>

              </div>

              {/* Floating Badge 1 */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-brand-dark/95 border border-brand-mint/40 rounded-2xl p-3.5 shadow-2xl items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-brand-mint/20 flex items-center justify-center text-brand-mint">
                  <Award className="w-5 h-5 text-brand-mint" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">98.4% Retention</div>
                  <div className="text-[11px] text-slate-400">Practical Hands-On Learning</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Stat Strip */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-brand-mint">15K+</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Students Mentored</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-brand-lime">100+</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Live Market Sessions</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-brand-mint">1 : 3+</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Risk-Reward Discipline</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">4.9 ★</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Verified Student Rating</p>
          </div>
        </div>

      </div>
    </section>
  );
}
