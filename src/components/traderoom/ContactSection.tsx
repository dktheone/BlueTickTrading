"use client";

import React from "react";
import ContactForm from "@/components/forms/ContactForm";
import { Mail, Phone, MapPin, Sparkles, ShieldCheck } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-[#F0F5F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Get in Touch
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43] leading-tight">
              Ready to Accelerate Your Trading Journey?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Have questions about our mentorship batches, webinar schedules, or custom courses? Reach out to our expert counseling team directly.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Phone / WhatsApp</span>
                  <a href="tel:+919889549999" className="text-base font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors">
                    +91 98895 49999
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Email Support</span>
                  <a href="mailto:support@blueticktrading.com" className="text-base font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors">
                    support@blueticktrading.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Protected Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}