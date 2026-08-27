import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { 
  Calendar, Clock, Video, Users, CheckCircle2, ShieldCheck, 
  Sparkles, Award, Star, ArrowLeft, ArrowRight, Play, BookOpen 
} from "lucide-react";

interface WebinarPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WebinarLandingPage({ params }: WebinarPageProps) {
  const { slug } = await params;

  // Mock / dynamic data ready for Payload CMS binding
  const webinarData = {
    title: "BankNifty & Nifty Price Action Mastery: Smart Money Breakouts",
    subtitle: "Learn how institutional operators trade the Indian markets, avoid retail traps, and execute high-probability options buying setups.",
    date: "Upcoming Saturday",
    time: "7:00 PM – 9:00 PM IST",
    platform: "Live on Zoom (Interactive Q&A)",
    speaker: "BlueTick Senior Trading Faculty",
    experience: "8+ Years Trading Full-time",
    price: "FREE (Normal Value ₹2,499)",
    totalSeats: 100,
    filledSeats: 82,
    agenda: [
      { time: "07:00 PM", topic: "Introduction to Market Maker Psychology & Retail Traps" },
      { time: "07:25 PM", topic: "Institutional Liquidity Hunts & Fair Value Gaps (FVG)" },
      { time: "07:55 PM", topic: "High-Probability Options Buying Setup with 1:3+ Risk-Reward" },
      { time: "08:25 PM", topic: "Live Charting: Analyzing Tomorrow's Key BankNifty Levels" },
      { time: "08:45 PM", topic: "Open Interactive Q&A with Senior Mentor" },
    ],
    takeaways: [
      "Spot smart money accumulation & distribution before explosive breakouts",
      "Avoid theta decay traps in Options Buying with strict timing rules",
      "Exact mathematical position sizing formula to protect your trading capital",
      "Exclusive access to the BlueTick Morning Watchlist & Discord Community",
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      <Header />

      <main className="flex-grow">
        {/* Webinar Hero Section */}
        <section className="bg-brand-primary text-white pt-10 pb-16 md:pb-24 rounded-b-[35px] lg:rounded-b-[50px] relative overflow-hidden border-b border-brand-teal/40">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E5866] via-brand-primary to-brand-dark opacity-90 -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-brand-mint hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Main Website
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-brand-mint text-brand-dark font-extrabold text-xs flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-dark animate-ping" /> LIVE MASTERCLASS
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-brand-lime border border-brand-lime/30 text-xs font-semibold">
                    100% Free Seat
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs">
                    Limited to 100 Attendees
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                  {webinarData.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {webinarData.subtitle}
                </p>

                {/* Info Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-[10px] text-slate-300 font-bold block uppercase">Date</span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-4 h-4 text-brand-mint shrink-0" /> {webinarData.date}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-[10px] text-slate-300 font-bold block uppercase">Time</span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-4 h-4 text-brand-lime shrink-0" /> {webinarData.time}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-300 font-bold block uppercase">Format</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-mint flex items-center gap-1.5 mt-0.5">
                      <Video className="w-4 h-4 text-brand-mint shrink-0" /> Zoom Live
                    </span>
                  </div>
                </div>

                {/* Mentor Highlight */}
                <div className="p-4 rounded-2xl bg-brand-teal/40 border border-brand-mint/30 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-dark border-2 border-brand-mint flex items-center justify-center text-white font-bold text-base shrink-0">
                    BT
                  </div>
                  <div>
                    <span className="text-xs text-brand-mint font-bold block">Conducted By</span>
                    <h4 className="text-sm font-bold text-white">{webinarData.speaker}</h4>
                    <p className="text-xs text-slate-300">{webinarData.experience} • Mentored 15,000+ Students</p>
                  </div>
                </div>

              </div>

              {/* Right: Registration Form */}
              <div className="lg:col-span-5" id="register">
                <ContactForm defaultInterest="BankNifty Price Action Mastery Webinar" isWebinarMode={true} />
              </div>

            </div>
          </div>
        </section>

        {/* Webinar Content & Agenda Breakdown */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Col: Agenda & Key Takeaways */}
              <div className="lg:col-span-7 space-y-10">
                
                {/* Takeaways */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-extrabold text-brand-dark">
                    What You Will Walk Away With:
                  </h3>
                  <div className="space-y-3">
                    {webinarData.takeaways.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFB] border border-slate-200">
                        <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Masterclass Timeline */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-2xl font-extrabold text-brand-dark">
                    Masterclass Agenda & Timeline:
                  </h3>
                  <div className="space-y-3">
                    {webinarData.agenda.map((slot, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                        <span className="px-3 py-1 rounded-xl bg-brand-primary text-brand-mint text-xs font-bold font-mono shrink-0">
                          {slot.time}
                        </span>
                        <span className="text-sm font-semibold text-slate-800">{slot.topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Col: Future Premium Membership Preview */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-gradient-to-b from-brand-primary to-brand-dark text-white rounded-3xl p-8 border border-brand-teal shadow-xl space-y-6">
                  
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-brand-lime uppercase tracking-widest block">
                      Future Membership Roadmap
                    </span>
                    <h3 className="text-2xl font-extrabold text-white">
                      Want Daily Live Trading & Mentor Access?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Upgrade to our **BlueTick VIP Trading Community** for live daily Discord sessions, automated trade scanners, and instant mentorship.
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-mint" />
                      <span>Daily Live Audio Screen Sharing (9:15 AM - 11:30 AM)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-mint" />
                      <span>Weekly Journal Audits & 1-on-1 Guidance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-mint" />
                      <span>Zero-Theta Decay Options Hedging Templates</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Upcoming Feature</span>
                      <span className="text-sm font-bold text-brand-mint">Payment Gateway Ready</span>
                    </div>
                    <a
                      href="#register"
                      className="px-5 py-2.5 rounded-full bg-brand-mint text-brand-dark font-bold text-xs hover:bg-brand-accent transition-colors"
                    >
                      Join Free First
                    </a>
                  </div>

                </div>

                {/* Trust Seal */}
                <div className="p-6 rounded-3xl bg-[#F0F5F6] border border-slate-200 text-center space-y-2">
                  <ShieldCheck className="w-8 h-8 text-brand-teal mx-auto" />
                  <h4 className="text-sm font-bold text-brand-dark">100% Educational & Practical</h4>
                  <p className="text-xs text-slate-600">
                    No indicator gimmicks. Pure price action and institutional market structure.
                  </p>
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
