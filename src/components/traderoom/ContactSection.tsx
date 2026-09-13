"use client";

import React from "react";
import ContactForm from "@/components/forms/ContactForm";
import { Mail, Phone, Sparkles, Calendar, Clock } from "lucide-react";
import { WebinarRecord } from "@/lib/db";

interface ContactSectionProps {
  webinar?: WebinarRecord | null;
}

export default function ContactSection({ webinar }: ContactSectionProps) {
  const webinarTitle = webinar?.title || "Upcoming Saturday Live Masterclass";
  const webinarDate = webinar?.date_time || "Upcoming Saturday, 7:00 PM IST";
  const webinarDuration = webinar?.duration_minutes || 90;

  return (
    <section id="contact" className="py-20 bg-[#F0F5F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Reserve Free Seat
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43] leading-tight">
              Ready to Master Price &amp; Time Equilibrium?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Register now for Amit Gupta's live interactive masterclass. Fast 3-field reservation with instant calendar invitation and Zoom room access.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                Scheduled Session
              </span>
              <p className="text-sm font-bold text-[#0E3B43] leading-snug">
                {webinarTitle}
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#10505C]" /> {webinarDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {webinarDuration} Mins
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium block">WhatsApp / Phone Support</span>
                  <a href="tel:+918004855663" className="text-sm font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors">
                    +91 80048 55663
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium block">Counseling Email</span>
                  <a href="mailto:support@blueticktrading.com" className="text-sm font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors">
                    support@blueticktrading.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Streamlined Webinar Mode Form */}
          <div className="lg:col-span-7">
            <ContactForm
              isWebinarMode={true}
              webinarId={webinar?.id}
              webinarTitle={webinarTitle}
              webinarDate={webinarDate}
              webinarDuration={webinarDuration}
              webinarZoomUrl={webinar?.zoom_join_url}
              webinarSlug={webinar?.slug}
            />
          </div>

        </div>
      </div>
    </section>
  );
}