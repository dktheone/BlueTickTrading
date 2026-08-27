import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, ShieldAlert, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-300 pt-16 pb-12 border-t border-brand-teal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-teal/30">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary p-1.5 border border-brand-mint/30 flex items-center justify-center">
                <Image
                  src="/brand/b.png"
                  alt="BlueTick Trading Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                BLUETICK <span className="text-brand-mint font-light">TRADING</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              BlueTick Trading School empowers retail traders with institutional-grade price action, disciplined risk-to-reward frameworks, and real-time live market execution strategies.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="badge-dark text-xs px-3 py-1 bg-brand-primary text-brand-mint border border-brand-mint/20">
                100% Practical Mentorship
              </span>
              <span className="badge-dark text-xs px-3 py-1 bg-brand-primary text-brand-lime border border-brand-lime/20">
                Live Market Analysis
              </span>
            </div>
          </div>

          {/* Col 3: Programs & Webinars */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Trading Programs</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#courses" className="hover:text-brand-mint transition-colors flex items-center gap-1 group">
                  <span>Price Action Mastery</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-brand-mint transition-colors flex items-center gap-1 group">
                  <span>Options Buying & Selling</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-brand-mint transition-colors flex items-center gap-1 group">
                  <span>Institutional Order Flow</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#webinar" className="hover:text-brand-mint transition-colors flex items-center gap-1 group">
                  <span>Live Saturday Masterclass</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-mint" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#hero" className="hover:text-brand-mint transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="hover:text-brand-mint transition-colors">Why BlueTick</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-brand-mint transition-colors">Student Results</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-mint transition-colors">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-mint transition-colors">Contact Support</a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Reach Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-mint shrink-0 mt-0.5" />
                <span>SS/46, Moti Jheel Colony, Aishbagh, Lucknow, UP</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-mint shrink-0" />
                <a href="tel:+919889549999" className="hover:text-brand-mint transition-colors font-medium text-slate-200">
                  +91 98895 49999
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-mint shrink-0" />
                <a href="mailto:support@blueticktrading.com" className="hover:text-brand-mint transition-colors">
                  support@blueticktrading.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer (Crucial for Financial/Trading Schools) */}
        <div className="my-8 p-4 rounded-xl bg-brand-primary/40 border border-brand-teal/30 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-brand-lime font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>Important Risk & Educational Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            BlueTick Trading School is an educational platform dedicated strictly to market literacy, technical analysis education, and financial mentorship. We are NOT registered with SEBI as an investment advisor or research analyst. We do NOT provide buy/sell tips, stock recommendations, or guaranteed return schemes. Trading stocks, derivatives (Futures & Options), and commodities involves substantial risk of financial loss. Please trade only with risk capital and consult a certified financial advisor before making actual investments.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-4">
          <p>© {new Date().getFullYear()} BlueTick Trading School. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-brand-mint transition-colors">Privacy Policy</a>
            <a href="#contact" className="hover:text-brand-mint transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-brand-mint transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
