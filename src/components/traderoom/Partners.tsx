import React from "react";
import Image from "next/image";

export default function Partners() {
  const logos = [
    "/images/traderoom/logo-preview-1.png",
    "/images/traderoom/logo-preview-2.png",
    "/images/traderoom/logo-preview-3.png",
    "/images/traderoom/logo-preview-4.png",
    "/images/traderoom/logo-preview-6.png",
    "/images/traderoom/logo-preview-8.png",
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
          Collaborated with over 800+ trusted worldwide partners
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {logos.map((src, i) => (
            <div key={i} className="relative w-32 h-12 flex items-center justify-center">
              <Image
                src={src}
                alt={`Partner Logo ${i+1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}