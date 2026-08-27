import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function Footer() {
  const socials = [
    { icon: "/images/traderoom/Icon-023.png", alt: "Facebook" },
    { icon: "/images/traderoom/Icon-024.png", alt: "Twitter" },
    { icon: "/images/traderoom/Icon-025.png", alt: "Instagram" },
    { icon: "/images/traderoom/Icon-026.png", alt: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#0E3B43] text-slate-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative h-10 w-44">
              <Image
                src="/images/traderoom/Logo-01-1.png"
                alt="Traderoom Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Traderoom is a premier online trading education academy empowering market participants with institutional knowledge, structured risk frameworks, and continuous mentorship.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socials.map((soc, i) => (
                <div
                  key={i}
                  className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-[#2FFFB9] p-2 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Image
                    src={soc.icon}
                    alt={soc.alt}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/" className="hover:text-[#2FFFB9] transition-colors">Home</Link></li>
              <li><a href="#about" className="hover:text-[#2FFFB9] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#2FFFB9] transition-colors">Services</a></li>
              <li><a href="#benefits" className="hover:text-[#2FFFB9] transition-colors">Benefits</a></li>
              <li><a href="#contact" className="hover:text-[#2FFFB9] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Courses</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#products" className="hover:text-[#2FFFB9] transition-colors">Technical Analysis</a></li>
              <li><a href="#products" className="hover:text-[#2FFFB9] transition-colors">Cryptocurrency Mastery</a></li>
              <li><a href="#products" className="hover:text-[#2FFFB9] transition-colors">Entries & Exits Precision</a></li>
              <li><a href="#products" className="hover:text-[#2FFFB9] transition-colors">Essential Candlesticks</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Newsletter</h4>
            <p className="text-xs text-slate-300">
              Subscribe to get daily market outlooks and webinar updates.
            </p>
            <div className="flex items-center rounded-full bg-white/10 border border-white/20 p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-[#2FFFB9] text-[#0E3B43] text-xs font-bold hover:bg-[#C5FF7C] transition-colors shrink-0"
              >
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Traderoom Online. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-[#2FFFB9]">Privacy Policy</a>
            <a href="#contact" className="hover:text-[#2FFFB9]">Terms of Service</a>
            <a href="#contact" className="hover:text-[#2FFFB9]">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}