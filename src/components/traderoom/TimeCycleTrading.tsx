import React from "react";
import Image from "next/image";
import { Clock, TrendingUp, Compass, Cpu, ArrowRight, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

export default function TimeCycleTrading() {
  const cyclePillars = [
    {
      icon: Clock,
      badge: "Structured Rhythms",
      title: "Daily, Weekly & Monthly Cycles",
      desc: "Markets breathe in structured rhythmic sequences: daily swings, weekly exhaustion points, and monthly macro shifts that dictate exactly when institutional capital flows reverse direction.",
    },
    {
      icon: TrendingUp,
      badge: "Mathematical Equilibrium",
      title: "Price & Time Symmetry",
      desc: "When a cycle reaches maturity and price meets its mathematical equivalent, the market has no choice but to react. Support and resistance evolve dynamically across timeframes.",
    },
    {
      icon: Compass,
      badge: "Leading Edge",
      title: "Zero Lag Forecasting",
      desc: "Charts cease to be chaotic noise. Instead of reacting to lagging indicators or chasing breakouts near cycle peaks, you forecast exact pivot windows before indicators trigger.",
    },
    {
      icon: Cpu,
      badge: "The Foundational Law",
      title: "The Geometry of Time",
      desc: "Understanding the time dimension shifts your trading from reactive guesswork to high-conviction forecasting. Mastering this dimension is where true institutional edge begins.",
    },
  ];

  return (
    <section id="time-cycles" className="py-24 bg-[#082126] text-white relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#10505C]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10505C] text-[#2FFFB9] text-xs font-bold uppercase tracking-widest border border-[#2FFFB9]/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#2FFFB9]" /> Advanced Market Geometry
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Time Cycle Trading
          </h2>
          <p className="text-[#2FFFB9] text-lg sm:text-xl font-semibold italic">
            "Most traders spend their entire careers obsessing over where price will go. The elite few focus on when."
          </p>
        </div>

        {/* Hero Concept Grid: Visual Chart + Deep Architectural Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-[#2FFFB9]/30 shadow-2xl group bg-[#0E3B43]/50">
              <Image
                src="/images/traderoom/time-cycle-trading.jpg"
                alt="Time Cycle Trading Chart Analysis - Market Geometry and Harmonic Pivots"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082126] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0E3B43]/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#2FFFB9] font-bold block">
                    Harmonic Cycle Confluence
                  </span>
                  <span className="text-xs text-slate-300">
                    Sine Wave Exhaustion + Fibonacci Time Zones + Dynamic Pivots
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2FFFB9] text-[#082126] text-[11px] font-extrabold uppercase shrink-0">
                  Institutional Edge
                </span>
              </div>
            </div>
            
            <p className="text-[12px] text-slate-400 text-center italic">
              Real mathematical model demonstrating cyclical turning points and time-price harmony on Indian & Global benchmarks.
            </p>
          </div>

          {/* Master Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-white font-semibold">Price is only half the market equation; Time governs everything else.</strong> Every major market trend, explosive breakout, and brutal reversal does not happen at random—it unfolds along precise, repeating mathematical cycles.
              </p>
              <p>
                Markets breathe in structured rhythmic sequences: daily swings, weekly exhaustion points, and monthly macro shifts that dictate exactly when capital flows reverse direction.
              </p>
              <p>
                When you decode these underlying time cycles, charts cease to be chaotic noise. Instead of reacting to lagging indicators or buying breakouts near cycle peaks, you align with the hidden symmetry between time and price.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-[#082126] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-lg hover:shadow-[#2FFFB9]/30 hover:-translate-y-0.5"
              >
                <span>Learn Time Cycle Forecasting</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* 4 Deep Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cyclePillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#0E3B43]/60 border border-white/10 hover:border-[#2FFFB9]/60 hover:bg-[#0E3B43] transition-all duration-300 space-y-4 group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#10505C] text-[#2FFFB9] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#2FFFB9] font-bold px-2.5 py-1 rounded-full bg-[#2FFFB9]/10">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#2FFFB9] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Full-Width Core Philosophy Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0E3B43] to-[#10505C] border border-[#2FFFB9]/20 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Dynamic Law of Support & Resistance Across Time
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Support and resistance aren’t static lines drawn in stone; they evolve dynamically across timeframes, revealing turning points long before traditional indicators even trigger a signal.
            </p>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Understanding the time dimension shifts your trading from reactive guesswork to high-conviction forecasting. It is the difference between blindly chasing the market and knowing the exact window when an exhaustion or pivot is primed to trigger. The geometry of time is the foundational law driving every market movement—and mastering this dimension is where true market edge begins.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#082126] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all"
              >
                <span>Reserve Seat for Next Masterclass</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2FFFB9]" /> Covered Live by Amit Gupta
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
