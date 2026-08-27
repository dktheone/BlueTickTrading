"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Live Webinar", href: "#webinar" },
    { name: "Programs & Courses", href: "#courses" },
    { name: "Why Us", href: "#features" },
    { name: "Student Reviews", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification / Contact Bar */}
      <div className="bg-brand-dark text-slate-300 text-xs py-2 px-4 border-b border-brand-teal/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-brand-mint font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Next Live Masterclass: Saturday @ 7:00 PM IST
            </span>
            <span className="hidden md:inline-block text-slate-500">•</span>
            <span className="hidden md:inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-lime" /> Free Registration Open
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="mailto:support@blueticktrading.com"
              className="hidden sm:inline-flex items-center gap-1 hover:text-brand-mint transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-mint" /> support@blueticktrading.com
            </a>
            <a
              href="tel:+919889549999"
              className="inline-flex items-center gap-1 text-slate-200 hover:text-brand-mint font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-mint" /> +91 98895 49999
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-brand-primary/95 backdrop-blur-md shadow-lg border-b border-brand-teal/40 py-3"
            : "bg-brand-primary py-4 border-b border-brand-teal/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-brand-dark/40 p-1 border border-brand-mint/30 flex items-center justify-center group-hover:border-brand-mint transition-colors">
              <Image
                src="/brand/b.png"
                alt="BlueTick Trading Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-1">
                BLUETICK <span className="text-brand-mint font-light">TRADING</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-slate-300 font-medium -mt-1">
                School of Market Mastery
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-brand-mint transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-mint hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#webinar"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold bg-brand-mint text-brand-dark hover:bg-brand-accent transition-all duration-300 shadow-md hover:shadow-brand-mint/20 hover:-translate-y-0.5"
            >
              <span>Join Free Webinar</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#webinar"
              className="sm:hidden inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-brand-mint text-brand-dark"
            >
              Webinar
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-brand-teal/50 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-primary border-t border-brand-teal/40 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:text-brand-mint hover:bg-brand-teal/30 transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-brand-teal/30 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-bold bg-brand-mint text-brand-dark hover:bg-brand-accent transition-all text-sm"
              >
                Book 1-on-1 Consultation
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
