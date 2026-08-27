import React from "react";
import { Star, Quote, CheckCircle2, TrendingUp } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rohit Verma",
      role: "BankNifty Options Trader",
      city: "Lucknow",
      pnl: "+142% ROI in 6 Months",
      comment: "Before joining BlueTick, I was jumping between YouTube indicators and losing money on option buying. The price action mentorship and liquidity concept completely changed how I look at BankNifty.",
      rating: 5,
    },
    {
      name: "Ananya Sharma",
      role: "Swing Trader & Working Professional",
      city: "Delhi NCR",
      pnl: "1:3.8 Avg Risk-Reward",
      comment: "The biggest takeaway for me was risk management. The mentors don't give fish; they teach you how to fish in live market sessions. Their weekend webinars are goldmines.",
      rating: 5,
    },
    {
      name: "Siddharth Mehta",
      role: "Full-Time Stock Trader",
      city: "Mumbai",
      pnl: "Consistent Monthly PnL",
      comment: "The Discord community and post-market review sessions are top-notch. Having veteran traders review your journal every week stops you from making silly overtrading mistakes.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint/15 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-brand-mint/30">
            Real Student Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            What Our Traders Are Saying
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Verified feedback from everyday learners who transformed their market discipline with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-8 bg-[#F8FAFB] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating & PnL Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <TrendingUp className="w-3 h-3" /> {rev.pnl}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.role} • {rev.city}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-primary text-brand-mint flex items-center justify-center font-bold text-xs">
                  {rev.name[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
