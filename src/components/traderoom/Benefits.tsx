import React from "react";
import Image from "next/image";
import { Users, TrendingUp, Award, Headphones } from "lucide-react";

export default function Benefits() {
  const stats = [
    { icon: Users, value: "15K+", label: "Active Members" },
    { icon: TrendingUp, value: "98%", label: "Positive Feedback" },
    { icon: Headphones, value: "24/7", label: "Mentor Support" },
    { icon: Award, value: "100+", label: "Live Market Hours" },
  ];

  const cards = [
    {
      icon: "/images/traderoom/Icon-015-1.png",
      title: "Expert-Led Instruction",
      desc: "Gain deep insights from professional traders who trade full-time and bring real execution clarity.",
    },
    {
      icon: "/images/traderoom/Icon-016-1.png",
      title: "Hands-On Practical Training",
      desc: "Move beyond theory with live market execution, screen sharing, and real-time trade journal feedback.",
    },
    {
      icon: "/images/traderoom/Icon-017.png",
      title: "Flexible Lifetime Access",
      desc: "Revisit high-definition webinar archives, trading blueprints, and study materials whenever you need.",
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
            Key Advantages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
            Benefits of joining our course
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Designed to bridge the gap between learning theory and making profitable trades.
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
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#2FFFB9] transition-all duration-300 space-y-6"
            >
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
          ))}
        </div>

      </div>
    </section>
  );
}