import React from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Alex Morgan",
      role: "Day Trader",
      avatar: "/images/traderoom/Testimonials-01.jpg",
      comment: "Traderoom completely transformed my approach to the market. The institutional order flow lessons and live chart breakdowns gave me confidence I never had before.",
    },
    {
      name: "Sophia Martinez",
      role: "Options Trader",
      avatar: "/images/traderoom/Testimonials-02.jpg",
      comment: "The precision entries course and risk-to-reward frameworks saved me thousands in unnecessary losses. Highly recommended for anyone serious about trading.",
    },
    {
      name: "David Chen",
      role: "Swing Trader",
      avatar: "/images/traderoom/Testimonials-03.jpg",
      comment: "Outstanding mentorship and community. Being able to ask questions and review real trades in the member channel is worth 10x the price of the course.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
            Testimonials ⭐
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
            (674,029 reviews of Traderoom Online)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Read real stories from our global community of active learners.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Row */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#2FFFB9]">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0E3B43]">{rev.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}