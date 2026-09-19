import React from "react";
import Image from "next/image";
import Link from "next/link";
import WebinarBannerImage from "@/components/traderoom/WebinarBannerImage";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import ContactForm from "@/components/forms/ContactForm";
import { getWebinarBySlug } from "@/lib/db";
import {
  Calendar,
  Clock,
  Video,
  Users,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Award,
  Star,
  ArrowLeft,
  ArrowRight,
  Play,
  BookOpen,
  Lock,
  Flame,
} from "lucide-react";

interface WebinarPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    preview?: string;
  }>;
}

export async function generateMetadata({ params }: WebinarPageProps) {
  const { slug } = await params;
  const dbWebinar = await getWebinarBySlug(slug);

  if (dbWebinar) {
    return {
      title: `${dbWebinar.title} | Blue Tick Trading School`,
      description:
        dbWebinar.subtitle ||
        dbWebinar.short_description ||
        "Free Live Trading Masterclass with Amit Gupta.",
    };
  }

  return {
    title: "Live Market Masterclass | Blue Tick Trading School",
    description:
      "Join Amit Gupta for an intensive live session on institutional price action, Gann geometry, and multi-market turning points.",
  };
}

export default async function WebinarLandingPage({ params, searchParams }: WebinarPageProps) {
  const { slug } = await params;
  const sParams = searchParams ? await searchParams : {};
  const isPreview = sParams?.preview === "true";
  const dbWebinar = await getWebinarBySlug(slug);

  const status = dbWebinar?.status || (dbWebinar?.is_active ? "published" : "draft");
  const isDraft = status === "draft";
  const isArchived = status === "archived";

  // If draft and not in preview mode, display draft notice
  if (isDraft && !isPreview) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
        <Header />
        <main className="flex-grow flex items-center justify-center py-24 px-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#0E3B43]">Masterclass In Preparation</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This masterclass campaign is currently in private draft status and undergoing schedule finalization. Public registration will open soon!
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold hover:bg-[#10505C] transition-all shadow-md"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse topics JSON or fallback
  let topics: string[] = [
    "Mathematical Price-Time Squaring & Harmonic Equilibrium (W.D. Gann principles)",
    "Forecasting High-Probability Turn Dates in Nifty, Bank Nifty & MCX Crude Oil",
    "Low Implied Volatility (IV) Options Buying Execution with 1:4+ Asymmetric Payoffs",
    "Institutional Liquidity Hunts: Why Retail Support & Resistance Breakouts Get Trapped",
  ];

  if (dbWebinar?.topics_json) {
    try {
      const parsed = JSON.parse(dbWebinar.topics_json);
      if (Array.isArray(parsed) && parsed.length > 0) {
        topics = parsed;
      }
    } catch {
      // Keep default topics
    }
  }

  const webinarData = {
    id: dbWebinar?.id,
    title: dbWebinar?.title || "BankNifty, Nifty & MCX Time Cycle Masterclass: Turn Date Forecasting",
    subtitle:
      dbWebinar?.subtitle ||
      "Master institutional price-time squaring, anticipate explosive trend turns, and eliminate retail indicator traps.",
    date: dbWebinar?.date_time || "Upcoming Saturday, 7:00 PM IST",
    duration: dbWebinar?.duration_minutes ? `${dbWebinar.duration_minutes} Minutes` : "90 Minutes",
    platform: "Live on Zoom (Interactive Q&A)",
    speaker: dbWebinar?.mentor_name || "Amit Gupta",
    experience: dbWebinar?.mentor_bio || "15+ Years Active Market Veteran • Time Cycle Strategist",
    bannerImageUrl: dbWebinar?.banner_image_url || "/images/traderoom/time-cycle-trading.jpg",
    price: "100% FREE",
    totalSeats: dbWebinar?.max_seats || 500,
    registeredCount: dbWebinar?.registrant_count || 142,
    takeaways: topics,
    zoomJoinUrl: dbWebinar?.zoom_join_url || "",
    slug: dbWebinar?.slug || slug,
  };

  const seatsLeft = Math.max(0, webinarData.totalSeats - webinarData.registeredCount);
  const percentFilled = Math.min(100, Math.round((webinarData.registeredCount / webinarData.totalSeats) * 100));

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      {/* Admin Preview Floating Banner */}
      {isDraft && isPreview && (
        <div className="bg-amber-400 text-slate-950 font-black px-4 py-2.5 text-center text-xs flex items-center justify-center gap-2 shadow-md sticky top-0 z-50">
          <Clock className="w-4 h-4" />
          <span>ADMIN PREVIEW MODE — This webinar is in DRAFT status and not publicly published.</span>
          <Link
            href="/admin"
            className="ml-3 underline font-extrabold hover:text-black transition-colors"
          >
            Dashboard
          </Link>
        </div>
      )}

      <Header />

      <main className="flex-grow">
        {/* HERO SECTION WITH TRADEROOM DESIGN TOKENS */}
        <section className="bg-[#0E3B43] text-white pt-8 pb-16 md:pb-24 rounded-b-[35px] lg:rounded-b-[50px] relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#10505C] via-[#0E3B43] to-[#082126] opacity-95 -z-10" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to Home Navigation */}
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-[#2FFFB9] hover:text-white transition-colors font-bold"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Main Website
              </Link>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[11px] font-bold border border-white/15">
                  <Flame className="w-3.5 h-3.5 text-[#2FFFB9]" /> {seatsLeft} Seats Remaining
                </span>
              </div>
            </div>

            {/* 2-Column Split: Left = Banner + Details, Right = Streamlined Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Details Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-full bg-[#2FFFB9] text-[#0E3B43] font-black text-xs flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#0E3B43] animate-ping" /> LIVE MASTERCLASS
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[#C5FF7C] border border-[#C5FF7C]/30 text-xs font-bold">
                    100% Free
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-medium">
                    Batch Capacity: {webinarData.totalSeats}
                  </span>
                  {isDraft && (
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                      Draft Preview
                    </span>
                  )}
                </div>

                {/* Hero Title & Subtitle */}
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-5xl font-black text-white leading-[1.15] tracking-tight">
                    {webinarData.title}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                    {webinarData.subtitle}
                  </p>
                </div>

                {/* 800x400px (2:1 Ratio) Featured Banner Showcase */}
                <div className="relative w-full aspect-[2/1] max-w-[800px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#082126] group">
                  <WebinarBannerImage
                    src={webinarData.bannerImageUrl}
                    fallbackSrc="/images/traderoom/time-cycle-trading.jpg"
                    alt={webinarData.title}
                    fill
                    priority
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#2FFFB9] text-[11px] font-bold border border-white/15">
                      Live Video Broadcast • Zoom
                    </span>
                  </div>
                </div>

                {/* Schedule & Timing Info Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 font-bold block uppercase tracking-wider">Date &amp; Time</span>
                    <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 mt-1">
                      <Calendar className="w-4 h-4 text-[#2FFFB9] shrink-0" /> {webinarData.date}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 font-bold block uppercase tracking-wider">Duration</span>
                    <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 mt-1">
                      <Clock className="w-4 h-4 text-[#C5FF7C] shrink-0" /> {webinarData.duration}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 col-span-2 sm:col-span-1 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 font-bold block uppercase tracking-wider">Format</span>
                    <span className="text-xs sm:text-sm font-black text-[#2FFFB9] flex items-center gap-1.5 mt-1">
                      <Video className="w-4 h-4 text-[#2FFFB9] shrink-0" /> Zoom Live Q&amp;A
                    </span>
                  </div>
                </div>

                {/* Mentor Spotlight Bar */}
                <div className="p-4 rounded-2xl bg-[#10505C]/60 border border-[#2FFFB9]/30 flex items-center gap-4 backdrop-blur-xs">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[#082126] border border-[#2FFFB9]/40 shrink-0">
                    <Image
                      src="/brand/avatar-amit.svg"
                      alt={webinarData.speaker}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-[#2FFFB9] font-bold block">Lead Mentor &amp; Analyst</span>
                    <h4 className="text-base font-black text-white">{webinarData.speaker}</h4>
                    <p className="text-xs text-slate-300">{webinarData.experience}</p>
                  </div>
                </div>

              </div>

              {/* Right Form Column (5 cols) */}
              <div className="lg:col-span-5 sticky top-6" id="register">
                {/* Real-time Seat Fill Bar on top of form */}
                <div className="mb-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-1.5">
                    <span className="flex items-center gap-1 text-[#2FFFB9]">
                      <Users className="w-3.5 h-3.5" />
                      <span>{webinarData.registeredCount} Registered</span>
                    </span>
                    <span className="text-slate-300">{webinarData.totalSeats} Max Seats</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        percentFilled >= 90 ? "bg-rose-400" : percentFilled >= 70 ? "bg-amber-300" : "bg-[#2FFFB9]"
                      }`}
                      style={{ width: `${percentFilled}%` }}
                    />
                  </div>
                </div>

                {/* Redesigned Streamlined Form: Name, Email, Phone + Consent only */}
                <ContactForm
                  defaultInterest={webinarData.title}
                  isWebinarMode={true}
                  webinarId={webinarData.id}
                  webinarTitle={webinarData.title}
                  webinarDate={webinarData.date}
                  webinarDuration={webinarData.duration}
                  webinarZoomUrl={webinarData.zoomJoinUrl}
                  webinarSlug={webinarData.slug}
                />
              </div>

            </div>
          </div>
        </section>

        {/* CURRICULUM AGENDA BREAKDOWN SECTION */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Col: Masterclass Takeaways */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E3B43]/5 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#0E3B43]" /> Session Curriculum
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0E3B43] tracking-tight">
                    What You Will Master in This Live Session:
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Designed specifically for retail traders seeking mathematical clarity over arbitrary lagging indicators.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {webinarData.takeaways.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#F8FAFB] border border-slate-200/90 shadow-xs hover:border-[#2FFFB9] transition-all"
                    >
                      <div className="w-7 h-7 rounded-xl bg-[#0E3B43] text-[#2FFFB9] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        0{i + 1}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">{item}</span>
                        <span className="text-xs text-slate-500 mt-0.5 block">
                          Practical step-by-step institutional chart breakdown with Amit Gupta.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Philosophical Links */}
                <div className="p-6 rounded-3xl bg-[#F0F5F6] border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-[#0E3B43] uppercase tracking-wider">
                    Essential Reading Before the Masterclass
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/time-cycles"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors"
                    >
                      <span>Time Cycle Framework</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/about-amit"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors"
                    >
                      <span>Amit Gupta&apos;s Methodology</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/segments"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors"
                    >
                      <span>Supported Market Segments</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Col: Trust & Compliance Assurance */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-8 rounded-3xl bg-[#082126] text-white border border-white/10 shadow-xl space-y-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-black text-[#C5FF7C] uppercase tracking-widest block">
                      Guaranteed Free Access
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      Zero Fees • 100% Complimentary
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      No payment gateway, no credit card or UPI details requested. Simply provide your name, email, and WhatsApp number to get private meeting access.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2FFFB9] shrink-0" />
                      <span>Live 1-on-1 Q&amp;A directly with Amit Gupta</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2FFFB9] shrink-0" />
                      <span>Real-time live chart squaring on Nifty, BankNifty &amp; MCX</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2FFFB9] shrink-0" />
                      <span>Pre-session PDF study material via Telegram</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <a
                      href="#register"
                      className="w-full inline-flex items-center justify-center py-3.5 rounded-full bg-[#2FFFB9] hover:bg-[#C5FF7C] text-[#0E3B43] font-black text-xs shadow-md transition-all uppercase tracking-wider"
                    >
                      Fill Form to Claim Free Pass
                    </a>
                  </div>
                </div>

                {/* Compliance Seal */}
                <div className="p-6 rounded-3xl bg-[#F0F5F6] border border-slate-200 text-center space-y-2">
                  <ShieldCheck className="w-8 h-8 text-[#0E3B43] mx-auto" />
                  <h4 className="text-sm font-black text-[#0E3B43]">100% Pure Educational Masterclass</h4>
                  <p className="text-xs text-slate-600">
                    We do not provide tips, advisory services, or promised financial returns. All content is strictly for educational and mathematical study.
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
