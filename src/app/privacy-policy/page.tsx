import React from "react";
import Link from "next/link";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import { ShieldCheck, ArrowLeft, Lock, FileText, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Blue Tick Trading School",
  description: "Learn how Blue Tick Trading School collects, protects, and utilizes user data for webinars, communications, and ad platform compliance.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      <Header />
      
      <main className="flex-grow py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Top Breadcrumb */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          {/* Header Banner */}
          <div className="bg-[#0E3B43] text-white p-8 sm:p-12 rounded-3xl border border-white/10 space-y-3 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2FFFB9]/20 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Transparency & Security
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-300">
              Last Updated: August 27, 2026 • Compliant with Indian DPDP Act 2023, Meta Ads Policy, and Google Ads User Consent Framework.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">1. Introduction</h2>
              <p>
                Welcome to <strong>Blue Tick Trading School</strong> ("we", "our", or "us"), founded and managed by <strong>Amit Gupta</strong>. We respect your privacy and are committed to protecting any personal data you share with us through our website (<strong>https://blueticktrading.com</strong>), webinar registration forms, and advertising channels.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">2. Information We Collect</h2>
              <p>We collect information that you voluntarily provide when registering for webinars, requesting counseling, or submitting inquiries:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                <li><strong>Identity & Contact Details:</strong> Full Name, Email Address, WhatsApp / Phone Number, City.</li>
                <li><strong>Trading Background:</strong> Self-declared trading experience level (Beginner, Intermediate, Active Options Trader).</li>
                <li><strong>Inquiry Notes:</strong> Specific market interests, trading challenges, or questions submitted via our forms.</li>
                <li><strong>Technical & Usage Data:</strong> IP address, browser type, device information, operating system, and browsing activity collected via cookies and tracking pixels.</li>
              </ul>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                <strong>No Financial or Payment Data Collected:</strong> All current masterclasses and consultations are provided free of cost. We do NOT collect, store, or process credit card numbers, debit cards, bank account logins, or UPI PINs on this platform.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">3. How We Use Your Data</h2>
              <p>We use your information strictly for legitimate educational and communication purposes:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                <li>To send instant Zoom webinar joining links and calendar invitations.</li>
                <li>To deliver WhatsApp / Email updates regarding class timings, schedule changes, and study PDF handbooks.</li>
                <li>To provide one-on-one trading strategy consultations with Amit Gupta's advisory team.</li>
                <li>To prevent bot spam, automated abuse, and fraud on our forms.</li>
                <li>To measure website traffic and optimize advertising campaign relevance on Meta (Facebook/Instagram), Google Ads, and LinkedIn.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">4. Meta (Facebook/Instagram), Google & LinkedIn Advertising Disclosure</h2>
              <p>
                We use conversion tracking tags, pixels, and remarketing services provided by Meta Platforms Inc., Google LLC, and LinkedIn Corporation. These tools allow us to understand how users interact with our website after viewing our advertisements.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                <li><strong>Meta Pixel:</strong> Tracks webinar registrations and page visits to deliver relevant educational ads on Facebook and Instagram.</li>
                <li><strong>Google Ads & GA4:</strong> Measures campaign conversions, search query engagement, and page interaction.</li>
                <li><strong>No Sale of Personal Data:</strong> We NEVER sell, rent, or trade your personal contact details to third-party brokers, lenders, or telemarketers.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">5. Communication & Opt-Out Preferences</h2>
              <p>
                You have the right to unsubscribe from our marketing emails or WhatsApp notifications at any time. Simply reply <strong>"STOP"</strong> to any WhatsApp broadcast or click the <strong>"Unsubscribe"</strong> link in our emails.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">6. Contact Privacy Officer</h2>
              <p>If you have any questions regarding this Privacy Policy or wish to request deletion of your data, please contact:</p>
              <div className="p-4 rounded-2xl bg-[#F8FAFB] border border-slate-200 text-xs text-slate-700 space-y-1">
                <p><strong>Blue Tick Trading School</strong> (Lead Mentor: Amit Gupta)</p>
                <p>Address: SS/46, Moti Jheel Colony, Aishbagh, Lucknow, UP, India</p>
                <p>Email: <a href="mailto:support@blueticktrading.com" className="text-[#0E3B43] font-bold underline">support@blueticktrading.com</a></p>
                <p>Phone: +91 98895 49999</p>
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}