"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Blue Tick Trading School and who is Amit Gupta?",
      a: "Blue Tick Trading School is a premier financial education academy founded by Amit Gupta, a full-time professional trader with 10+ years of experience in Indian equity, futures, and options markets. The school focuses on teaching institutional price action and strict risk management.",
    },
    {
      q: "Are Amit Gupta's live sessions and webinars recorded?",
      a: "Yes! Every single live webinar, weekend masterclass, and mentorship session is recorded in HD and provided to registered students with lifetime portal access.",
    },
    {
      q: "Do I need prior trading experience to join?",
      a: "No prior experience is necessary. We start from candlestick fundamentals and market structure before advancing to complex Options Buying and Smart Money Concepts.",
    },
    {
      q: "Does Blue Tick Trading School provide buy/sell tips or advisory?",
      a: "No. We are strictly an educational institution. We do NOT provide stock tips, investment advice, or guaranteed return schemes. Our sole mission is to teach you how to become an independent, self-sufficient trader.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
            FAQ Question ❓
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about Blue Tick Trading School and our mentorship format.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#F8FAFB] border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  type="button"
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "bg-[#2FFFB9] text-[#0E3B43] rotate-180" : "bg-white text-slate-600 border border-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}