import React from "react";
import Link from "next/link";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import { Database, ArrowLeft, ShieldCheck, Eye, Layers, Lock } from "lucide-react";

export const metadata = {
  title: "Data Collection & Advertising Policy | Blue Tick Trading School",
  description: "Detailed disclosure of data collected across our website, Meta Ads, Google Ads, and analytics tracking.",
};

export default function DataCollectionPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      <Header />
      
      <main className="flex-grow py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E3B43] hover:text-[#10505C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="bg-[#0E3B43] text-white p-8 sm:p-12 rounded-3xl border border-white/10 space-y-3 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2FFFB9]/20 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
              <Database className="w-4 h-4" /> Advertising & Analytics Compliance
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Data Collection & Cookie Policy
            </h1>
            <p className="text-sm text-slate-300">
              Clear disclosure on how user data is gathered across our website, ad funnels, and marketing platforms.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">1. Why We Collect Data</h2>
              <p>
                At <strong>Blue Tick Trading School</strong>, data collection is strictly purposeful and minimal. We gather information solely to facilitate webinar registrations, deliver educational trading handbooks, schedule mentor consultations with <strong>Amit Gupta</strong>, and provide relevant educational advertising.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#0E3B43]">2. Advertising Channel Specific Disclosures</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#F8FAFB] border border-slate-200 space-y-2">
                  <h3 className="font-bold text-[#0E3B43] text-sm">Meta Ads (FB/IG)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We use Meta Lead Forms and the Meta Pixel to deliver educational masterclass advertisements to users interested in stock and derivatives trading.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAFB] border border-slate-200 space-y-2">
                  <h3 className="font-bold text-[#0E3B43] text-sm">Google Ads & Search</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We use Google conversion tracking to measure search intent and optimize webinar registration page performance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAFB] border border-slate-200 space-y-2">
                  <h3 className="font-bold text-[#0E3B43] text-sm">LinkedIn Ads</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Used to reach working professionals seeking structured swing trading and weekend market learning programs.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">3. Types of Data Gathered</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-[#0E3B43] text-white">
                    <tr>
                      <th className="p-3">Data Field</th>
                      <th className="p-3">Source</th>
                      <th className="p-3">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-semibold">Name & Email</td>
                      <td className="p-3">Website Form / Instant Form</td>
                      <td className="p-3">Zoom link delivery & student identification</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">WhatsApp Number</td>
                      <td className="p-3">Website Form / Instant Form</td>
                      <td className="p-3">Instant class reminders & PDF study material</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Trading Experience</td>
                      <td className="p-3">Dropdown selection</td>
                      <td className="p-3">Categorizing beginner vs advanced student needs</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">IP & Device Cookies</td>
                      <td className="p-3">Automated browser tracking</td>
                      <td className="p-3">Spam protection (Honeypot) & campaign attribution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">4. Payment & Financial Data Statement</h2>
              <p>
                We currently run free informational webinars and consultations. <strong>No payment gateway is currently active on this website</strong>, and we do NOT request, collect, or store any banking, card, or UPI transaction data. When paid premium programs are introduced, a certified RBI/PCI-DSS compliant payment gateway (such as Razorpay/Stripe) will be integrated with end-to-end encryption.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">5. Data Retention & Erasure</h2>
              <p>
                We retain lead data only as long as necessary to provide educational updates and verify webinar attendance. You may request full deletion of your contact records at any time by emailing <strong>support@blueticktrading.com</strong>.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}