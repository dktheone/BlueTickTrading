import React from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rohit Verma",
      role: "BankNifty Options Trader • Lucknow",
      avatar: "/images/traderoom/Testimonials-01.jpg",
      comment: "Amit Gupta Sir's price action logic completely cleared all my confusion with indicator lag. Learning how to read liquidity sweeps made me consistently profitable in BankNifty options buying.",
    },
    {
      name: "Ananya Sharma",
      role: "Swing Trader & Working Professional • Delhi",
      avatar: "/images/traderoom/Testimonials-02.jpg",
      comment: "The risk management framework taught at Blue Tick Trading School is gold. I finally stopped overtrading and now focus strictly on 1:3+ risk-to-reward setups. The weekend masterclasses are incredible!",
    },
    {
      name: "Siddharth Mehta",
      role: "Full-Time Stock Trader • Mumbai",
      avatar: "/images/traderoom/Testimonials-03.jpg",
      comment: "Outstanding mentorship by Amit Sir. The community trade reviews and post-market chart breakdowns help you avoid common retail traps. Best investment I made in my trading career.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
            Student Reviews ⭐
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
            What Our Traders Say About Amit Gupta & Blue Tick
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Verified feedback from students who transformed their consistency with our mentorship.
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