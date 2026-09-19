import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import { 
  Clock, TrendingUp, Compass, Calendar, ArrowRight, ShieldCheck, 
  CheckCircle2, Sparkles, Activity, Layers, Target, HelpCircle,
  BarChart3, Zap, Lock
} from "lucide-react";

export const metadata = {
  title: "Time Cycle Trading Strategy | Price-Time Squaring | Blue Tick Trading School",
  description: "Master institutional Time Cycle turn-date forecasting with Amit Gupta. Discover how mathematical price-time squaring anticipates market reversals before breakouts trigger.",
  keywords: "Time cycle trading, Gann squaring, turn dates, Nifty cycle analysis, MCX crude cycle, price time equilibrium, Amit Gupta trader",
};

export default function TimeCyclesPage() {
  const pillars = [
    {
      icon: Clock,
      title: "Harmonic Cycle Rhythms",
      tagline: "Natural Market Vibrations",
      description: "Financial markets do not move in random chaos. They breathe in measurable daily, weekly, and 60-day institutional vibration rhythms driven by capital settlement cycles.",
      bullets: ["Daily Intraday Turn Windows (9:45 AM, 1:15 PM)", "Weekly High/Low Inversion Dates", "Monthly Settlement Cycle Alignment"],
    },
    {
      icon: Compass,
      title: "Price-Time Squaring",
      tagline: "Mathematical Equilibrium",
      description: "Based on W.D. Gann's law of cause and effect: When Price units match Time units in geometric proportion, an explosive trend reversal or accelerated breakout is mathematically compelled to occur.",
      bullets: ["1x1 Geometric Time Angles", "True Range vs Ellapsed Time Ratios", "Elimination of False Breakouts"],
    },
    {
      icon: Target,
      title: "Turn Date Anticipation",
      tagline: "Be Early, Not Late",
      description: "Retail traders wait for lagging indicators like MACD or RSI to cross over after 60% of the move has already transpired. Time Cycles project the exact turning date weeks in advance.",
      bullets: ["Pre-determined Reversal Calendars", "High-Probability Risk:Reward (1:4+)", "Clear Invalidation Stops"],
    },
    {
      icon: ShieldCheck,
      title: "Trap Inversion Defense",
      tagline: "Anti-Retail Liquidity Traps",
      description: "Smart money engineers breakouts on key resistance levels specifically on cycle expiry dates to absorb retail liquidity. Knowing the turn date turns traps into lucrative reversal trades.",
      bullets: ["Institutional Absorption Recognition", "Stop-Hunt Liquidity Sweeps", "Zero Guesswork Execution"],
    },
  ];

  const caseSteps = [
    {
      step: "01",
      title: "Cycle Harmonic Measurement",
      desc: "Identify the primary dominant wave length from prior swing low to swing low. Project the forward vibration window.",
    },
    {
      step: "02",
      title: "Price-Time Squaring Confluence",
      desc: "Calculate the exact price level where price units square the elapsed trading days (e.g., 54 days = 540 points).",
    },
    {
      step: "03",
      title: "Turn Date Window Confirmation",
      desc: "Monitor price action 1 session prior to the calculated turn date. Note volatility contraction and institutional orderflow.",
    },
    {
      step: "04",
      title: "Asymmetric Execution",
      desc: "Execute position with a defined low-risk invalidation stop, capturing a multi-day directional trend ahead of the crowd.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative bg-[#0E3B43] text-white pt-20 pb-28 sm:pb-36 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2FFFB9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 -left-20 w-80 h-80 bg-[#10505C]/50 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Core Value Hook */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Proprietary Methodology
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                  Price Tells You <span className="text-slate-300 underline decoration-[#2FFFB9]/40">Where</span>.<br />
                  Time Tells You <span className="text-[#2FFFB9]">When</span>.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                  90% of retail traders lose because they obsess over <em>price levels</em> while remaining completely blind to the dimension of <strong>Time</strong>. Discover how institutional time cycles anticipate market turning points days before breakout traps trigger.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-lg hover:shadow-[#2FFFB9]/20 text-sm sm:text-base group"
                  >
                    <span>Reserve Saturday Masterclass</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/about-amit"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-sm sm:text-base"
                  >
                    <span>Meet Amit Gupta</span>
                  </Link>
                </div>

                {/* Proof Pills */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white block">10+</span>
                    <span className="text-xs text-slate-300">Years Cycle Research</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#2FFFB9] block">1:4+</span>
                    <span className="text-xs text-slate-300">Avg Risk:Reward</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white block">Zero</span>
                    <span className="text-xs text-slate-300">Lagging Indicators</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Master Graphic */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-[#082126] group">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/traderoom/time-cycle-trading.jpg"
                      alt="Time Cycle Trading Chart Analysis"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="p-5 bg-[#082126]/95 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#2FFFB9] animate-ping" />
                      <span className="text-xs font-mono text-slate-300">Live Mathematical Equilibrium</span>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded bg-[#2FFFB9]/10 text-[#2FFFB9] font-bold">
                      Gann Symmetry
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: WHY TIME CYCLES BEAT LAGGING INDICATORS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3B43]/5 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-[#0E3B43]" /> The Retail Indicator Dilemma
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
                Why Traditional Indicators Keep You Trapped
              </h2>
              <p className="text-base text-slate-600">
                Most technical indicators (RSI, MACD, Moving Averages, Supertrend) are strictly <em>derivatives of past price</em>. By the time they flash a buy signal, the institutional move is already exhausting.
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Card 1: Retail Lagging Approach */}
              <div className="p-8 rounded-3xl bg-rose-50/60 border border-rose-100 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
                    Retail Flaw
                  </span>
                  <span className="text-xs text-rose-500 font-mono">90% Failure Rate</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Lagging Indicator Traps</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✕</span>
                    <span>Waiting for EMA crossover after 80 points of Nifty rally has already occurred.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✕</span>
                    <span>Buying breakout at resistance exactly when institutional cycles hit exhaustion.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✕</span>
                    <span>Wide stop-losses with unfavorable 1:1 or 1:0.8 risk-to-reward ratios.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✕</span>
                    <span>Constant emotional churn and revenge trading caused by false whipsaws.</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Time Cycle Edge */}
              <div className="p-8 rounded-3xl bg-[#0E3B43] text-white border border-[#2FFFB9]/30 shadow-xl space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2FFFB9]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#2FFFB9]/20 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
                    Institutional Edge
                  </span>
                  <span className="text-xs text-[#2FFFB9] font-mono">Precision Timing</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Time Cycle Forecasting</h3>
                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2FFFB9] shrink-0 mt-0.5" />
                    <span>Projecting the exact reversal calendar date 5 to 10 trading sessions in advance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2FFFB9] shrink-0 mt-0.5" />
                    <span>Entering positions at the origin of the turn before the public breakout candle triggers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2FFFB9] shrink-0 mt-0.5" />
                    <span>Asymmetric risk:reward (1:4 to 1:6) with tight mathematical invalidation points.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2FFFB9] shrink-0 mt-0.5" />
                    <span>Complete emotional serenity: you execute only on predetermined high-conviction dates.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION: 4 CORE PILLARS */}
        <section className="py-20 bg-[#F0F5F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3B43]/10 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-[#0E3B43]" /> Architectural Foundation
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
                The Four Pillars of Price-Time Mastery
              </h2>
              <p className="text-base text-slate-600">
                Every trade executed by Amit Gupta is filtered through four distinct mathematical parameters, eliminating emotional impulse and subjective opinion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pillars.map((pil, idx) => {
                const IconComponent = pil.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shadow-md">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-[#10505C] uppercase tracking-wider block">
                          {pil.tagline}
                        </span>
                        <h3 className="text-2xl font-bold text-[#0E3B43]">
                          {pil.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {pil.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      {pil.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2FFFB9]" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* SECTION: STEP BY STEP REVERSAL BLUEPRINT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3B43]/5 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#0E3B43]" /> Execution Workflow
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
                The Anatomy of a Cycle Turn Trade
              </h2>
              <p className="text-base text-slate-600">
                How a trade develops from initial calendar projection to institutional entry and profit locking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseSteps.map((cs, i) => (
                <div 
                  key={i} 
                  className="p-6 rounded-3xl bg-[#F8FAFB] border border-slate-200/80 space-y-4 relative hover:border-[#2FFFB9] transition-colors"
                >
                  <span className="text-4xl font-black text-[#0E3B43]/20 font-mono block">
                    {cs.step}
                  </span>
                  <h4 className="text-lg font-bold text-[#0E3B43]">
                    {cs.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cs.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION: FINAL WEBINAR CTA BANNER */}
        <section className="py-16 bg-[#082126] text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2FFFB9]/10 border border-[#2FFFB9]/30 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" /> Upcoming Live Session
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              See Time Cycle Analysis in Action.<br />
              <span className="text-[#2FFFB9]">Live Saturday Masterclass with Amit Gupta.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We decode real Nifty, Bank Nifty, and MCX Crude charts, calculate upcoming turn-date windows, and answer your market questions in a 100% free interactive session.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-xl hover:shadow-[#2FFFB9]/20 text-base"
              >
                <span>Register for Masterclass (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/segments"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-base"
              >
                <span>Explore Market Segments</span>
              </Link>
            </div>

            <p className="text-[11px] text-slate-400 pt-2">
              100% Pure Educational Masterclass • Strictly No Advisory or Tips Given.
            </p>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
