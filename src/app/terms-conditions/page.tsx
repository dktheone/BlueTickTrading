import React from "react";
import Link from "next/link";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import { FileText, ArrowLeft, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Blue Tick Trading School",
  description: "Terms of service, user conduct, intellectual property, and educational guidelines for Blue Tick Trading School and Amit Gupta.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      <Header />
      
      <main className="flex-grow py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="bg-[#0E3B43] text-white p-8 sm:p-12 rounded-3xl border border-white/10 space-y-3 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2FFFB9]/20 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" /> Legal Agreement
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Terms & Conditions
            </h1>
            <p className="text-sm text-slate-300">
              Please read these terms carefully before accessing our website, attending webinars, or enrolling in our programs.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">1. Educational Nature of Services</h2>
              <p>
                <strong>Blue Tick Trading School</strong> and its mentor <strong>Amit Gupta</strong> operate strictly as an educational entity. All content, video masterclasses, live charting demonstrations, PDF materials, and social community discussions are for <strong>educational and training purposes only</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" /> NOT A SEBI REGISTERED ADVISOR
                </p>
                <p>
                  We are NOT registered with the Securities and Exchange Board of India (SEBI) as an Investment Advisor (RIA) or Research Analyst (RA). We do NOT offer portfolio management services (PMS), stock recommendations, tipping services, or guaranteed return schemes.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">2. Financial Risk & User Responsibility</h2>
              <p>
                Trading in equities, futures, options (derivatives), commodities, and currencies carries substantial financial risk. The participant acknowledges that past performance shown in case studies or simulated charts is not indicative of future returns. You are solely responsible for all trading decisions and capital allocations you make with your broker.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">3. Intellectual Property Rights</h2>
              <p>
                All course curriculums, video recordings, presentation slides, price action blueprints, and branding assets are the exclusive intellectual property of Blue Tick Trading School and Amit Gupta. You may not record, redistribute, resell, or publicly broadcast any course materials without express written authorization.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">4. User Conduct & Community Guidelines</h2>
              <p>
                Members participating in live Zoom sessions, WhatsApp discussion groups, or Discord channels must maintain professional conduct. We reserve the right to remove any attendee engaging in abusive language, spamming third-party schemes, or unauthorized self-promotion.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">5. Governing Law & Jurisdiction</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh, India.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}