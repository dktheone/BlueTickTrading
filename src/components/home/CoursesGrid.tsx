import React from "react";
import { BookOpen, Clock, Users, Star, ArrowRight, CheckCircle2, Shield } from "lucide-react";

export default function CoursesGrid() {
  const courses = [
    {
      id: "foundation",
      title: "Stock Market Foundation & Technical Analysis",
      level: "Beginner",
      duration: "4 Weeks",
      students: "3,200+",
      rating: "4.9",
      description: "Ideal for beginners starting their journey in equities and indices. Master candlestick anatomy, trend lines, volume analysis, and market structure.",
      features: ["Candlestick & Chart Patterns", "Support, Resistance & Volume", "Market Psychology Basics", "Live Charting Homework"],
      popular: false,
    },
    {
      id: "price-action",
      title: "Institutional Price Action & Smart Money Concepts",
      level: "Intermediate / Advanced",
      duration: "6 Weeks",
      students: "6,800+",
      rating: "5.0",
      description: "Our flagship program. Learn to trade alongside institutional participants using liquidity hunts, fair value gaps, and high-reward intraday setups.",
      features: ["Liquidity Sweeps & Order Blocks", "Multi-Timeframe Confluence", "1:3+ Risk Reward Frameworks", "Live Market Trading Room"],
      popular: true,
    },
    {
      id: "options-mastery",
      title: "Advanced Futures & Options (F&O) Mastery",
      level: "Professional",
      duration: "6 Weeks",
      students: "4,500+",
      rating: "4.9",
      description: "Master high-speed BankNifty & Nifty derivatives. Unpack Option Greeks, open interest (OI) profiling, theta hedging, and expiry day zero-to-hero strategies.",
      features: ["Options Buying Momentum Trades", "Options Selling & Hedging", "Open Interest & PCR Analysis", "Expiry Special Trading Setups"],
      popular: false,
    },
  ];

  return (
    <section id="courses" className="py-20 bg-[#F8FAFB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary text-brand-mint text-xs font-bold uppercase tracking-wider">
              Structured Curriculum
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
              Flagship Mentorship Programs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Step-by-step mentorship tracks designed to take you from foundational basics to independent, profitable execution.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-teal font-bold text-sm group"
          >
            <span>Request Course Syllabus</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative bg-white border ${
                course.popular
                  ? "border-brand-mint ring-2 ring-brand-mint/40 shadow-2xl scale-[1.02] z-10"
                  : "border-slate-200 hover:border-slate-300 shadow-md hover:shadow-xl"
              }`}
            >
              {course.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-mint text-brand-dark font-extrabold text-xs tracking-wide shadow-md">
                  ★ MOST POPULAR PROGRAM
                </span>
              )}

              <div className="space-y-5">
                {/* Meta Pills */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold">
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-brand-dark leading-snug">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {course.description}
                </p>

                {/* Quick Info Strip */}
                <div className="flex items-center justify-between py-3 border-y border-slate-100 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-teal" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-teal" /> {course.students} Learners
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Core Curriculum:
                  </span>
                  {course.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-8">
                <a
                  href="#contact"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm transition-all duration-300 ${
                    course.popular
                      ? "bg-brand-mint text-brand-dark hover:bg-brand-accent shadow-lg hover:shadow-brand-mint/30"
                      : "bg-brand-primary text-white hover:bg-brand-teal"
                  }`}
                >
                  <span>Apply For Enrollment</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
