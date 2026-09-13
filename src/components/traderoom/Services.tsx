import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  const segments = [
    {
      title: "MCX Commodities",
      subtitle: "Crude Oil, Natural Gas, Silver & Gold",
      icon: "/images/traderoom/Icon-004.png",
      href: "/segments#mcx",
      description:
        "High-beta swing trading in Crude Oil (inventory cycle sync), Natural Gas (seasonal demand curves), Gold & Silver (astro-time symmetry confluences).",
    },
    {
      title: "Index Trading",
      subtitle: "Nifty 50, Sensex & Bank Nifty",
      icon: "/images/traderoom/Icon-003.png",
      href: "/segments#index",
      description:
        "Master macro market structure and key institutional liquidity zones by forecasting turning dates before retail breakout traps occur.",
    },
    {
      title: "Futures & Options",
      subtitle: "Derivatives & High R:R Options Buying",
      icon: "/images/traderoom/Icon-005.png",
      href: "/segments#options",
      description:
        "Time-squared options buying setups aligning cycle turn dates with gamma bursts and Open Interest (OI) unwinding for asymmetric risk-reward.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
            Market Segments We Master 📊
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
            Where We Apply Time Cycle Analysis
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            A unified mathematical approach to turn-date forecasting deployed across India's most liquid market segments.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {segments.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#2FFFB9] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                {/* Icon */}
                <div className="relative w-16 h-16 rounded-2xl bg-[#0E3B43]/5 p-3 flex items-center justify-center group-hover:bg-[#0E3B43] transition-colors duration-300">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className="text-2xl font-bold text-[#0E3B43] group-hover:text-[#10505C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#10505C] mt-1">
                    {item.subtitle}
                  </p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow link */}
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E3B43]">
                <span>Explore Segment Strategy</span>
                <div className="w-8 h-8 rounded-full bg-[#0E3B43]/10 flex items-center justify-center group-hover:bg-[#2FFFB9] group-hover:text-[#0E3B43] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}