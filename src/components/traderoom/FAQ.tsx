"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Traderoom and who is it for?",
      a: "Traderoom is a premier online trading education academy designed for traders of all experience levels—from absolute beginners to active intermediate and advanced traders wanting structured price action strategies.",
    },
    {
      q: "How are the courses structured?",
      a: "Our courses include structured video modules, comprehensive PDF trading guides, live market webinar sessions, and interactive trading community discussions.",
    },
    {
      q: "Do I get lifetime access to course materials?",
      a: "Yes, all purchased ebooks and course mentorship enrollments grant you full lifetime access to all learning materials, templates, and community channels.",
    },
    {
      q: "Can I ask questions and get feedback on my trades?",
      a: "Absolutely! Members have direct access to our live Q&A sessions and Discord community channels where mentors review charts and trade journals.",
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
            Everything you need to know about our trading education and community.
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