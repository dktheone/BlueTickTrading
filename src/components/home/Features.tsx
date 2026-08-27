import React from "react";
import { LineChart, Shield, Target, Users, BookOpen, Clock, Award, CheckCircle2 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: LineChart,
      title: "Live Market Execution",
      description: "Don't learn from static historical charts. Watch our mentors analyze real order flow, identify liquidity sweeps, and execute trades in live market hours.",
      badge: "Real-Time",
      accent: "from-brand-mint/20 to-transparent",
    },
    {
      icon: Target,
      title: "Institutional Price Action",
      description: "Master Smart Money Concepts (SMC), Fair Value Gaps (FVG), Market Structure Shifts, and supply-demand imbalances without indicator clutter.",
      badge: "Smart Money",
      accent: "from-emerald-500/20 to-transparent",
    },
    {
      icon: Shield,
      title: "Strict Risk-First Management",
      description: "Capital protection comes first. Learn position sizing formulas, drawdown limits, and how to operate exclusively on high probability 1:3+ RR setups.",
      badge: "Discipline",
      accent: "from-brand-lime/20 to-transparent",
    },
    {
      icon: Users,
      title: "Lifetime Trading Community",
      description: "Join our active private trader network. Share daily morning watchlists, discuss post-market trade journals, and get continuous mentor feedback.",
      badge: "Community",
      accent: "from-cyan-500/20 to-transparent",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint/15 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-brand-mint/30">
            Why BlueTick Trading School
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            Built for Serious Traders Who Want Consistency
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We cut through the noise of false promises and indicator overload to provide institutional-grade trading education.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-7 bg-[#F8FAFB] border border-slate-200 hover:border-brand-mint/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Accent top gradient */}
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${feat.accent} group-hover:h-2 transition-all`}
                />

                <div className="space-y-4">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-mint flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-teal transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
