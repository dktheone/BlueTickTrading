import React from "react";
import { BookOpen, MonitorPlay, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

export default function StrategySteps() {
  const steps = [
    {
      num: "01",
      title: "Master Institutional Structure",
      desc: "Learn how market makers create liquidity, engineer traps, and balance order books before explosive trends.",
      icon: BookOpen,
    },
    {
      num: "02",
      title: "Practice in Live Market Hours",
      desc: "Apply the framework in real-time with mentor screen shares, live audio commentary, and real-time execution.",
      icon: MonitorPlay,
    },
    {
      num: "03",
      title: "Scale Capital with Pure Discipline",
      desc: "Follow strict risk management algorithms and journal every trade to achieve consistent profitability.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 bg-brand-primary text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold text-brand-mint uppercase tracking-widest">
            The BlueTick Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How We Transform You Into an Independent Trader
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            A battle-tested 3-stage transformation methodology designed for longevity in financial markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-brand-dark/60 border border-brand-teal/40 rounded-3xl p-8 space-y-5 relative hover:border-brand-mint/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold text-brand-mint/40 font-mono group-hover:text-brand-mint transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal/60 flex items-center justify-center text-brand-mint">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-brand-mint transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
