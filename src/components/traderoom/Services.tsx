import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Stock Trading",
      icon: "/images/traderoom/Icon-004.png",
      description: "Learn the fundamentals and advanced techniques of stock market trading to maximize returns with structured strategies.",
    },
    {
      title: "Crypto Trading",
      icon: "/images/traderoom/Icon-003.png",
      description: "Master volatile cryptocurrency markets with technical analysis, blockchain metrics, and smart risk management.",
    },
    {
      title: "Forex Trading",
      icon: "/images/traderoom/Icon-005.png",
      description: "Trade global currency pairs 24/5 with institutional price action, liquidity concepts, and multi-timeframe confluences.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
            Our Services 📈
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
            Services to help your success in the financial market
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Tailored mentorship tracks to guide you at every stage of your market trading career.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, idx) => (
            <div
              key={idx}
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
                <h3 className="text-2xl font-bold text-[#0E3B43] group-hover:text-[#10505C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow link */}
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E3B43]">
                <span>Discover More</span>
                <div className="w-8 h-8 rounded-full bg-[#0E3B43]/10 flex items-center justify-center group-hover:bg-[#2FFFB9] group-hover:text-[#0E3B43] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}