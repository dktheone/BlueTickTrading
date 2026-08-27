import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Award, UserCheck } from "lucide-react";

export default function Community() {
  const providerIcons = [
    { icon: "/images/traderoom/Icon-008.png", title: "Binance" },
    { icon: "/images/traderoom/Icon-012-1.png", title: "MetaTrader" },
    { icon: "/images/traderoom/Icon-010.png", title: "TradingView" },
    { icon: "/images/traderoom/Icon-009.png", title: "Coinbase" },
    { icon: "/images/traderoom/Icon-011-1.png", title: "Interactive Brokers" },
    { icon: "/images/traderoom/Icon-013.png", title: "Forex.com" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/traderoom/Traderoom-jpg-01.jpg"
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
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0E3B43] text-white px-6 py-3 rounded-2xl shadow-xl border border-[#2FFFB9]/40 text-center whitespace-nowrap">
              <span className="text-xl font-extrabold text-[#2FFFB9]">10+ Years</span>
              <span className="text-xs block text-slate-300">Amit Gupta's Market Experience</span>
            </div>
          </div>

          {/* Right Column: Copy & Learning Providers */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43]/10 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
              Meet Your Lead Mentor
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43] leading-tight">
              A Trading Community Dedicated To Your Financial Independence
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded by <b>Amit Gupta</b>, Blue Tick Trading School is built on one simple principle: <span className="font-semibold text-slate-800">Learn to trade what you see, not what you think</span>. We cut through the hype of fake screenshots and teach you institutional price action, risk-to-reward mathematics, and real-time live execution.
            </p>

            {/* Mentor Credentials */}
            <div className="p-4 rounded-2xl bg-[#F8FAFB] border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-[#0E3B43] font-bold text-sm">
                <UserCheck className="w-4 h-4 text-[#2FFFB9]" />
                <span>Amit Gupta • Head Mentor & Market Strategist</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specializing in Index Derivatives (Nifty / BankNifty), Smart Money Concepts (SMC), and rule-based swing trading. Mentored over 15,000+ traders across India.
              </p>
            </div>

            <div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all duration-300 shadow-lg text-sm"
              >
                <span>Register For Live Webinar</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* 6 Provider Icons */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Trading tools & charting ecosystems we master
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {providerIcons.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-[#F8FAFB] border border-slate-200 flex flex-col items-center justify-center gap-1.5 hover:border-[#2FFFB9] transition-all"
                  >
                    <div className="relative w-8 h-8">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 text-center">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}