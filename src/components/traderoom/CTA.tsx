import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative bg-gradient-to-r from-[#0E5866] to-[#0E3B43] rounded-[35px] lg:rounded-[45px] p-8 sm:p-14 text-white overflow-hidden shadow-2xl">
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <Image
              src="/images/traderoom/Icon-019.png"
              alt="Pattern"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" /> Start Learning Now
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Start Your Trading Journey With <span className="text-[#2FFFB9]">Traderoom</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto lg:mx-0">
                Join our private trading community today, access institutional-grade materials, and transform your consistency.
              </p>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-xl hover:shadow-[#2FFFB9]/30 text-sm sm:text-base hover:-translate-y-0.5"
                >
                  <span>Join Our Community</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/images/traderoom/Traderoom-jpg-08.jpg"
                  alt="Traderoom Community"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}