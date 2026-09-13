"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0E3B43] border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-48 sm:w-56">
              <Image
                src="/brand/logo-wide.png"
                alt="Blue Tick Trading School"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
            <Link href="/" className="hover:text-[#2FFFB9] transition-colors">
              Home
            </Link>
            <Link href="/webinars" className="hover:text-[#2FFFB9] transition-colors flex items-center gap-1.5 font-semibold text-[#2FFFB9]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2FFFB9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2FFFB9]"></span>
              </span>
              Webinars
            </Link>
            <Link href="/time-cycles" className="hover:text-[#2FFFB9] transition-colors">
              Time Cycles
            </Link>
            <Link href="/segments" className="hover:text-[#2FFFB9] transition-colors">
              Market Segments
            </Link>
            <Link href="/about-amit" className="hover:text-[#2FFFB9] transition-colors">
              About Mentor
            </Link>
            
            {/* Quick Sections Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setPagesDropdownOpen(true)}
              onMouseLeave={() => setPagesDropdownOpen(false)}
            >
              <button 
                type="button"
                className="flex items-center gap-1 hover:text-[#2FFFB9] transition-colors"
              >
                <span>Curriculum</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {pagesDropdownOpen && (
                <div className="absolute top-full left-0 w-52 py-2 bg-[#0E3B43] border border-white/15 rounded-2xl shadow-xl space-y-1 animate-in fade-in-50 duration-200">
                  <Link href="/webinars" className="block px-4 py-2 text-xs text-white/80 hover:text-[#2FFFB9] hover:bg-white/5 transition-all">
                    Live Saturday Masterclass
                  </Link>
                  <Link href="/time-cycles" className="block px-4 py-2 text-xs text-white/80 hover:text-[#2FFFB9] hover:bg-white/5 transition-all">
                    Time Cycle Framework
                  </Link>
                  <Link href="/segments#mcx" className="block px-4 py-2 text-xs text-white/80 hover:text-[#2FFFB9] hover:bg-white/5 transition-all">
                    MCX Commodities
                  </Link>
                  <Link href="/segments#options" className="block px-4 py-2 text-xs text-white/80 hover:text-[#2FFFB9] hover:bg-white/5 transition-all">
                    Index &amp; Options Buying
                  </Link>
                  <Link href="/#faq" className="block px-4 py-2 text-xs text-white/80 hover:text-[#2FFFB9] hover:bg-white/5 transition-all">
                    Student FAQ
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="hover:text-[#2FFFB9] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/webinars"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all duration-300 shadow-md hover:shadow-[#2FFFB9]/30 hover:-translate-y-0.5"
            >
              <span>Join Free Webinar</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/webinars"
              className="px-4 py-2 rounded-full text-xs font-bold text-[#0E3B43] bg-[#2FFFB9]"
            >
              Webinar
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#2FFFB9]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 space-y-2 animate-in fade-in slide-in-from-top-2">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              Home
            </Link>
            <Link 
              href="/webinars" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-[#2FFFB9] font-bold flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-[#2FFFB9] animate-pulse"></span>
              Live Webinars
            </Link>
            <Link 
              href="/time-cycles" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              Time Cycle Trading
            </Link>
            <Link 
              href="/segments" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              Market Segments (MCX &amp; Nifty)
            </Link>
            <Link 
              href="/about-amit" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              About Amit Gupta
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              Contact &amp; Student Support
            </Link>
          </div>
        )}

      </div>
    </header>
  );
}