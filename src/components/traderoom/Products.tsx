import React from "react";
import Image from "next/image";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";

export default function Products() {
  const products = [
    {
      title: "Technical Analysis",
      category: "Foundation",
      price: "$29.00",
      image: "/images/traderoom/Ebook-01.jpg",
      rating: "5.0",
      students: "1,240 learners",
      desc: "Complete guide to chart patterns, trend lines, and volume profile indicators for equity & index traders.",
    },
    {
      title: "Cryptocurrency Mastery",
      category: "Crypto",
      price: "$39.00",
      image: "/images/traderoom/Ebook-02.jpg",
      rating: "4.9",
      students: "980 learners",
      desc: "Navigate decentralized markets with blockchain analytics, on-chain metrics, and disciplined risk limits.",
    },
    {
      title: "Entries & Exits Precision",
      category: "Advanced Price Action",
      price: "$49.00",
      image: "/images/traderoom/Ebook-03.jpg",
      rating: "5.0",
      students: "2,150 learners",
      desc: "Master institutional order blocks, liquidity sweeps, and 1:3+ high probability intraday trade timing.",
    },
    {
      title: "Essential Candlesticks",
      category: "Core Patterns",
      price: "$19.00",
      image: "/images/traderoom/Ebook-04.jpg",
      rating: "4.8",
      students: "1,600 learners",
      desc: "Learn to read price psychology behind single and multi-candle formations in real-time execution.",
    },
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E3B43] text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
            Our Products 💻
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
            Explore Our Comprehensive Courses & Ebooks
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Get instant access to step-by-step trading handbooks and structured video curricula.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFB] rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#2FFFB9] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0E3B43]/90 text-[#2FFFB9] text-[11px] font-bold backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-500 font-medium">{item.students}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0E3B43] group-hover:text-[#10505C] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Button */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-200/60 mt-4 pt-4">
                <span className="text-xl font-extrabold text-[#0E3B43] font-mono">
                  {item.price}
                </span>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-md hover:shadow-[#2FFFB9]/30"
                >
                  <span>Get Course Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}