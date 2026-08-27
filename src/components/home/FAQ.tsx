"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need prior trading experience to attend the webinar or join the school?",
      a: "No prior experience is required. Our curriculum starts with market fundamentals and candlestick basics before progressing into advanced institutional price action and options trading.",
    },
    {
      q: "Are the live market sessions and webinars recorded?",
      a: "Yes! Every live webinar and mentor session is recorded in high definition and made available in the student portal with lifetime access.",
    },
    {
      q: "How much trading capital is required to get started?",
      a: "You can start paper trading or practicing with as little as ₹5,000 to ₹10,000 in equity. We emphasize risk management and proper position sizing so you never risk more than 1-2% of your capital on any single trade.",
    },
    {
      q: "Do you provide stock tips, calls, or guaranteed returns?",
      a: "No. BlueTick Trading School is strictly an educational platform. We do not provide buy/sell tips or financial advisory. Our sole mission is to teach you how to analyze charts independently and become a self-sufficient trader.",
    },
    {
      q: "How do I access the Zoom link for the upcoming webinar?",
      a: "Once you fill out the registration form below, your registration is instantly confirmed and the Zoom joining link is sent directly to your registered WhatsApp number and email.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#F8FAFB] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary text-brand-mint text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Clarity & Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Got questions? We have answers to everything you need to know about our webinars and programs.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  type="button"
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-brand-dark hover:text-brand-teal transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "bg-brand-mint text-brand-dark rotate-180" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in-50 duration-200">
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
