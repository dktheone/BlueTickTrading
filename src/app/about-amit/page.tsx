import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import { 
  Award, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, 
  BookOpen, Users, TrendingUp, Calendar, HeartHandshake, Compass, Lock
} from "lucide-react";

export const metadata = {
  title: "About Amit Gupta | Lead Mentor & Time Cycle Trader | Blue Tick Trading School",
  description: "Learn about Amit Gupta, Founder of Blue Tick Trading School. 15+ years in financial markets, SEBI/NISM certified, specialized in W.D. Gann Time Cycles and Price Action.",
  keywords: "Amit Gupta trader, Blue Tick Trading School founder, NISM certified trader, Time cycles mentor, Indian market educator",
};

export default function AboutAmitPage() {
  const milestones = [
    {
      year: "2011",
      title: "Market Inception & Retail Struggles",
      desc: "Started trading Indian equities. Suffered the typical retail trajectory of indicator overload, lagging MACD/RSI whipsaws, and option-buying capital erosion.",
    },
    {
      year: "2015",
      title: "The Mathematical Breakthrough",
      desc: "Discovered W.D. Gann's original papers on Price-Time Squaring and harmonic geometry. Began rigorous backtesting of turn-date algorithms on Nifty and MCX Crude.",
    },
    {
      year: "2019",
      title: "Proprietary Cycle Model Refinement",
      desc: "Finalized the 4-Pillar Time Cycle Framework. Replaced subjective chart reading with rule-based calendar turn dates and low-IV gamma execution.",
    },
    {
      year: "2023 - Present",
      title: "Blue Tick Trading School",
      desc: "Founded Blue Tick Trading School to dismantle retail trading myths and teach disciplined institutional time cycles to over 10,000+ students nationwide.",
    },
  ];

  const credentials = [
    {
      title: "15+ Years Active Experience",
      desc: "Navigated 3 major market cycles, bull runs, crashes, and black-swan volatility events.",
    },
    {
      title: "SEBI / NISM Compliant",
      desc: "Firm adherence to SEBI research analyst guidelines and purely educational knowledge dissemination.",
    },
    {
      title: "TradingView Chartist",
      desc: "Active chartist and Pine Script developer delivering clean, institutional price-time studies.",
    },
    {
      title: "10,000+ Traders Educated",
      desc: "Empowering working professionals, doctors, engineers, and full-time traders across India.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative bg-[#0E3B43] text-white pt-20 pb-28 sm:pb-36 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2FFFB9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#10505C]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Bio & Identity */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" /> Founder &amp; Head Educator
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  Meet Amit Gupta.<br />
                  <span className="text-[#2FFFB9]">Decoding the Rhythm of Indian Markets.</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                  With over <strong>15 years in financial markets</strong> and a decade dedicated to the mathematics of Time Cycles, Amit Gupta mentors retail traders to trade with institutional precision—transforming emotional guesswork into rule-based calendar forecasting.
                </p>

                {/* Verified Credentials Pills */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-white">
                    <ShieldCheck className="w-4 h-4 text-[#2FFFB9]" /> SEBI / NISM Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-white">
                    <TrendingUp className="w-4 h-4 text-[#2FFFB9]" /> TradingView Chartist
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-white">
                    <Users className="w-4 h-4 text-[#2FFFB9]" /> 10,000+ Students Mentored
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-lg hover:shadow-[#2FFFB9]/20 text-sm sm:text-base group"
                  >
                    <span>Join Free Saturday Masterclass</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/time-cycles"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-sm sm:text-base"
                  >
                    <span>Read Cycle Methodology</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Mentor Image Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-[#082126] group max-w-md">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src="/images/traderoom/hero-02.png"
                      alt="Amit Gupta - Lead Mentor Blue Tick Trading School"
                      fill
                      className="object-contain object-bottom p-2 group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="p-5 bg-[#082126]/95 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Amit Gupta</h3>
                      <p className="text-xs text-[#2FFFB9]">Lead Mentor &amp; Time Cycle Strategist</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sm font-mono font-bold text-[#2FFFB9]">
                      15Y+
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: 4 CORE CREDENTIALS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3B43]/5 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0E3B43]" /> Built on Authentic Experience
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
                Why Traders Trust Blue Tick Trading School
              </h2>
              <p className="text-base text-slate-600">
                In an industry flooded with fake screenshots and reckless tip channels, Amit Gupta stands for verifiable mathematical principles and strict risk containment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((cred, i) => (
                <div 
                  key={i}
                  className="p-8 rounded-3xl bg-[#F8FAFB] border border-slate-200/80 space-y-3 hover:border-[#2FFFB9] transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0E3B43]">
                    {cred.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cred.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION: AMIT'S JOURNEY TIMELINE */}
        <section className="py-20 bg-[#F0F5F6]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3B43]/10 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#0E3B43]" /> The 15-Year Evolution
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
                From Retail Confusion to Institutional Mastery
              </h2>
              <p className="text-base text-slate-600">
                Amit's approach wasn't built overnight. It was forged through years of trial, market crashes, and meticulous journaled data.
              </p>
            </div>

            <div className="space-y-6">
              {milestones.map((m, mIdx) => (
                <div 
                  key={mIdx}
                  className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center"
                >
                  <div className="w-24 shrink-0 text-3xl font-black font-mono text-[#0E3B43]">
                    {m.year}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-xl font-bold text-[#0E3B43]">
                      {m.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION: 3 CORE MENTORSHIP PRINCIPLES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
                Our Code of Ethics &amp; Teaching Philosophy
              </h2>
              <p className="text-base text-slate-600">
                What sets Blue Tick Trading School apart from commercial trading communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-[#082126] text-white border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#2FFFB9] flex items-center justify-center font-bold font-mono">
                  01
                </div>
                <h3 className="text-xl font-bold text-white">Strictly No Tips or Advisory</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We never run Telegram calls, PMS schemes, or promise daily returns. Our only mission is empowering you with complete independent trading capability.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#082126] text-white border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#2FFFB9] flex items-center justify-center font-bold font-mono">
                  02
                </div>
                <h3 className="text-xl font-bold text-white">Capital Preservation First</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Profits take care of themselves when risk is mathematically controlled. We teach tight stops and 1:4+ risk-to-reward frameworks before anything else.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#082126] text-white border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#2FFFB9] flex items-center justify-center font-bold font-mono">
                  03
                </div>
                <h3 className="text-xl font-bold text-white">Real-Time Live Demonstration</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We don't teach on historical charts. Amit applies Time Cycle turn-date models live during market sessions so you see the strategy work in real time.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: CTA INVITATION */}
        <section className="py-16 bg-[#0E3B43] text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Experience Amit Gupta's Masterclass Live This Saturday
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Join thousands of aspiring and experienced traders in a live, 90-minute interactive session. Ask your questions directly to Amit.
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-xl hover:shadow-[#2FFFB9]/20 text-base"
              >
                <span>Reserve Free Masterclass Seat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-[11px] text-slate-400">
              SEBI Compliant Pure Educational Masterclass • Strictly No Advisory or Tips Given.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
