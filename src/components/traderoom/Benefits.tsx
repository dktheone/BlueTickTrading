import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, TrendingUp, Award, Clock, ArrowRight } from "lucide-react";

export default function Benefits() {
  const stats = [
    { icon: Clock, value: "15+ Yrs", label: "Market Journey" },
    { icon: TrendingUp, value: "10+ Yrs", label: "Cycle Research" },
    { icon: Users, value: "Thousands", label: "Traders Mentored" },
    { icon: Award, value: "Zero Tips", label: "100% Rule-Based" },
  ];

  const cards = [
    {
      icon: "/images/traderoom/Icon-015-1.png",
      title: "Turn Dates Over Breakout Traps",
      desc: "Retail indicators react after the move has occurred. Forecasting cycle turn dates helps you avoid buying at tops and selling at bottoms when institutions exit.",
    },
    {
      icon: "/images/traderoom/Icon-016-1.png",
      title: "Mathematical Price-Time Squaring",
      desc: "Price tells you where, but time tells you when. Squaring price ranges with cycle intervals identifies exact turning points with tight invalidation points.",
    },
    {
      icon: "/images/traderoom/Icon-017.png",
      title: "Universal Cross-Market Edge",
      desc: "One disciplined methodology deployed with precision across MCX Commodities (Crude, Gold, Silver), Index Spot (Nifty, Bank Nifty), and Options Buying.",
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
            Core Edge ⏳
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
            Why Time Cycle Analysis Over Lagging Indicators?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Break out of the cycle of lagging moving averages and indicators. Learn to trade institutional turn dates.
          </p>
        </div>

        {/* 4 Stats Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0E3B43] font-mono block">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Benefit Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#2FFFB9] transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="relative w-20 h-20 rounded-2xl bg-[#0E3B43]/5 p-3 flex items-center justify-center">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-2xl font-bold text-[#0E3B43]">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/time-cycles"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0E3B43] hover:text-[#10505C] group"
                >
                  <span>Learn Time Cycle Concept</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}