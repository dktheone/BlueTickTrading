import React from "react";
import Link from "next/link";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { 
  Phone, Mail, MessageSquare, Clock, ShieldCheck, 
  Sparkles, CheckCircle2, HelpCircle, Send, Globe
} from "lucide-react";

export const metadata = {
  title: "Contact & Student Support | Blue Tick Trading School",
  description: "Get in touch with Amit Gupta and the Blue Tick Trading School counseling team. Inquire about upcoming webinars, mentorship batches, or time cycle masterclasses.",
  keywords: "Contact Blue Tick Trading, Amit Gupta contact, trading school support, webinar inquiry, mentorship admission",
};

export default function ContactPage() {
  const contactChannels = [
    {
      icon: Phone,
      title: "Direct WhatsApp & Call Support",
      detail: "+91 80048 55663",
      subtext: "Monday to Saturday • 9:00 AM to 7:00 PM IST",
      actionText: "Chat on WhatsApp",
      actionUrl: "https://wa.me/918004855663?text=Hi%20Amit%20Sir%2C%20I%20have%20an%20inquiry%20regarding%20Blue%20Tick%20Trading%20School",
    },
    {
      icon: Mail,
      title: "Official Support Desk",
      detail: "support@blueticktrading.com",
      subtext: "General student queries & admissions",
      actionText: "Send Email",
      actionUrl: "mailto:support@blueticktrading.com",
    },
    {
      icon: Send,
      title: "Official Telegram Updates",
      detail: "@blueticktrading",
      subtext: "Webinar announcements & market insights",
      actionText: "Join Telegram Channel",
      actionUrl: "https://t.me/blueticktrading",
    },
  ];

  const faqs = [
    {
      q: "How fast will the counseling team respond to my inquiry?",
      a: "Our student desk responds within 2 to 4 business hours via WhatsApp or Email between 9:00 AM and 7:00 PM IST.",
    },
    {
      q: "Are the Saturday Masterclasses truly 100% free?",
      a: "Yes. Every Saturday masterclass is 100% complimentary with zero payment gateway attached. It is designed to demonstrate authentic Time Cycle principles.",
    },
    {
      q: "Does Blue Tick Trading School offer stock tips or call services?",
      a: "Absolutely not. We are strictly an educational training platform. We teach you how to analyze charts independently.",
    },
    {
      q: "Is there a physical branch I can visit?",
      a: "To keep training accessible nationwide and maintain real-time screen-sharing capabilities, all mentorship and masterclasses are conducted 100% online via Zoom Live.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      <Header />

      <main className="flex-grow">
        {/* HERO BANNER */}
        <section className="relative bg-[#0E3B43] text-white pt-20 pb-28 sm:pb-36 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2FFFB9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute top-10 -right-24 w-96 h-96 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" /> Direct Communication
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
              We&apos;re Here to Help You<br />
              <span className="text-[#2FFFB9]">Navigate Your Trading Journey.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Have questions about the upcoming live masterclass, our mentorship methodology, or time cycle principles? Reach out directly to Amit Gupta&apos;s counseling team.
            </p>
          </div>
        </section>

        {/* SECTION: CONTACT CARDS & FORM CONTAINER */}
        <section className="py-16 -mt-16 sm:-mt-24 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top 3 Direct Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {contactChannels.map((ch, idx) => {
                const IconComp = ch.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shadow-md">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0E3B43]">
                        {ch.title}
                      </h3>
                      <p className="text-base font-extrabold text-[#10505C] font-mono">
                        {ch.detail}
                      </p>
                      <p className="text-xs text-slate-500">
                        {ch.subtext}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <a
                        href={ch.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E3B43] hover:text-[#2FFFB9] hover:underline transition-colors"
                      >
                        <span>{ch.actionText}</span>
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Form & Context Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Form Guidance & Operations Policy */}
              <div className="lg:col-span-5 space-y-8">
                <div className="p-8 rounded-3xl bg-[#082126] text-white border border-white/10 shadow-xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2FFFB9]/10 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Counseling
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white">
                    What Happens When You Submit an Inquiry?
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2FFFB9] shrink-0 mt-0.5" />
                      <span>Instant priority assignment to our senior trading counselor.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2FFFB9] shrink-0 mt-0.5" />
                      <span>Direct verification via WhatsApp with scheduled webinar access link.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2FFFB9] shrink-0 mt-0.5" />
                      <span>Zero spam guarantee: Your phone and email are strictly protected under the DPDP Act 2023.</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-1">
                    <span className="font-bold text-slate-200 block">Digital Operations Notice:</span>
                    <p>
                      Blue Tick Trading School operates 100% digitally to deliver real-time live trading desk mentorship across India without geographical restrictions.
                    </p>
                  </div>
                </div>

                {/* Quick FAQs */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <h4 className="text-lg font-bold text-[#0E3B43] flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#10505C]" /> Frequently Asked Questions
                  </h4>

                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className="space-y-1 text-xs sm:text-sm border-b border-slate-100 pb-3 last:border-b-0">
                        <span className="font-bold text-[#0E3B43] block">{faq.q}</span>
                        <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Inquiry Form Component */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#10505C] uppercase tracking-wider">
                      Student Counseling Desk
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E3B43]">
                      Send Us Your Query
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Fill in your details below and Amit Gupta&apos;s team will assist you with session details and mentorship guidance.
                    </p>
                  </div>

                  <ContactForm defaultInterest="General Student Inquiry" isWebinarMode={false} />
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
