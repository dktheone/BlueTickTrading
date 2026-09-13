import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Award, UserCheck, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function Community() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/traderoom/Traderoom-02.jpg"
                  alt="Blue Tick Trading Community Session"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl mt-8">
                <Image
                  src="/images/traderoom/Traderoom-jpg-03.jpg"
                  alt="Amit Gupta Mentoring Traders"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0E3B43] text-white px-6 py-3.5 rounded-2xl shadow-xl border border-[#2FFFB9]/40 text-center whitespace-nowrap">
              <span className="text-xl font-extrabold text-[#2FFFB9]">15+ Years</span>
              <span className="text-xs block text-slate-300">Market Experience • 10+ Yrs Time Cycle Research</span>
            </div>
          </div>

          {/* Right Column: Copy & Credential Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43]/10 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
              Meet Your Lead Mentor
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43] leading-tight">
              A Trading Mentor Dedicated To Systematic Market Independence
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded by <b>Amit Gupta</b>, Blue Tick Trading School is built on one simple truth: <span className="font-semibold text-slate-800">Learn to trade price and time equilibrium, not emotions</span>. Having navigated Indian markets for over 15+ years, Amit teaches mathematical time-cycles, Gann geometry, and disciplined derivatives risk management.
            </p>

            {/* Mentor Credentials Box */}
            <div className="p-5 rounded-2xl bg-[#F8FAFB] border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-[#0E3B43] font-bold text-sm">
                <UserCheck className="w-5 h-5 text-[#10505C]" />
                <span>Amit Gupta • Lead Educator &amp; Market Strategist</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#10505C] shrink-0 mt-0.5" />
                  <span><b>SEBI &amp; NISM Certified:</b> SEBI-Investor Certification Examination cleared.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <TrendingUp className="w-4 h-4 text-[#10505C] shrink-0 mt-0.5" />
                  <span><b>10+ Years Research:</b> Dedicated to Gann Cycle dates &amp; Price-Time squaring.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <Users className="w-4 h-4 text-[#10505C] shrink-0 mt-0.5" />
                  <span><b>Connected Alumni:</b> Thousands of active traders actively connected across India.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#10505C] shrink-0 mt-0.5" />
                  <span><b>Strict No-Tips Policy:</b> 100% educational mentorship; no advisory or advisory calls.</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#webinar-section"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all duration-300 shadow-lg text-sm"
              >
                <span>Attend Free Masterclass</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/about-amit"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-[#0E3B43] bg-slate-100 hover:bg-slate-200 transition-all text-sm"
              >
                <span>Read Full Mentor Journey</span>
              </Link>
            </div>

            {/* Official Charting Ecosystem Badge */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Official Primary Charting &amp; Analysis Ecosystem
              </h4>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 max-w-sm shadow-sm">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-[#2962FF]/10 shrink-0">
                  <Image
                    src="/images/tools/tradingview.svg"
                    alt="TradingView"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-[#0E3B43]">TradingView</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2962FF]/10 text-[#2962FF]">
                      Primary Platform
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live cycle turn-date scripts &amp; Gann box geometric analysis
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}