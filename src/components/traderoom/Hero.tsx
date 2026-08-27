"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Star, TrendingUp, Sparkles } from "lucide-react";

export default function Hero() {
  const avatars = [
    "/images/traderoom/Testimonial-0001.jpg",
    "/images/traderoom/Testimonial-0002.jpg",
    "/images/traderoom/Testimonial-0003.jpg",
    "/images/traderoom/Testimonial-0004.jpg",
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0E5866] to-[#0E3B43] text-white pt-12 pb-20 md:pb-28 rounded-b-[40px] lg:rounded-b-[50px] overflow-hidden">
      {/* Background Icon Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none -z-0">
        <Image
          src="/images/traderoom/Icon-001.png"
          alt="Pattern"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#2FFFB9] text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#2FFFB9]" />
              <span>Mastering the Art of Trading</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
              Unlock Your Potential in the <span className="text-[#2FFFB9]">Global Financial</span> Markets
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Empower your trading journey with comprehensive courses designed for all levels. Gain the skills, strategies, and confidence needed to navigate the markets successfully.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all duration-300 shadow-xl hover:shadow-[#2FFFB9]/30 text-sm sm:text-base hover:-translate-y-0.5"
              >
                <span>Explore Membership</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social Proof Avatars Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <div key={i} className="relative w-11 h-11 rounded-full border-2 border-[#0E3B43] overflow-hidden shadow-md">
                    <Image
                      src={src}
                      alt={`Member ${i+1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left text-xs sm:text-sm text-slate-200">
                <span className="font-bold text-white block">15,000 Members Joined</span>
                <span className="text-[#C5FF7C] flex items-center gap-1 font-medium">
                  ★ Rated Excellent at 9.1/10 from 200 Reviews
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-square flex items-center justify-center">
              <Image
                src="/images/traderoom/Heros-04.png"
                alt="Traderoom Hero Dashboard"
                width={560}
                height={560}
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}