"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0E3B43] border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-44">
              <Image
                src="/images/traderoom/Logo-01-1.png"
                alt="Traderoom Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
            <Link href="/" className="text-[#2FFFB9] font-bold transition-colors">
              Home
            </Link>
            <a href="#about" className="hover:text-[#2FFFB9] transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-[#2FFFB9] transition-colors">
              Services
            </a>
            
            {/* Pages Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setPagesDropdownOpen(true)}
              onMouseLeave={() => setPagesDropdownOpen(false)}
            >
              <button 
                type="button"
                className="flex items-center gap-1 hover:text-[#2FFFB9] transition-colors"
              >
                <span>Pages</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {pagesDropdownOpen && (
                <div className="absolute top-full left-0 w-48 py-2 bg-[#0E3B43] border border-white/15 rounded-2xl shadow-xl space-y-1 animate-in fade-in-50 duration-200">
                  <a href="#benefits" className="block px-4 py-2 text-xs text-white/80 hover:text-[#2FFFB9] hover:bg-white/5 transition-all">
                    Benefits
                  </a>
                  <a href="#products" className="block px-4 py-2 text-xs text-white/80 hover:text-[#2FFFB9] hover:bg-white/5 transition-all">
                    Our Courses & Ebooks
                  </a>
                  <a href="#testimonials" className="block px-4 py-2 text-xs text-white/80 hover:text-[#2FFFB9] hover:bg-white/5 transition-all">
                    Testimonials
                  </a>
                  <a href="#faq" className="block px-4 py-2 text-xs text-white/80 hover:text-[#2FFFB9] hover:bg-white/5 transition-all">
                    FAQ
                  </a>
                </div>
              )}
            </div>

            <a href="#products" className="hover:text-[#2FFFB9] transition-colors">
              Blog
            </a>
            <a href="#contact" className="hover:text-[#2FFFB9] transition-colors">
              Contact
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all duration-300 shadow-md hover:shadow-[#2FFFB9]/30 hover:-translate-y-0.5"
            >
              <span>Contact us</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2 rounded-full text-xs font-bold text-[#0E3B43] bg-[#2FFFB9]"
            >
              Contact
            </a>
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
              className="block px-3 py-2 rounded-lg text-sm text-[#2FFFB9] font-bold"
            >
              Home
            </Link>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              About
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              Services
            </a>
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              Products & Courses
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              Testimonials
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/90 hover:text-[#2FFFB9]"
            >
              Contact
            </a>
          </div>
        )}

      </div>
    </header>
  );
}