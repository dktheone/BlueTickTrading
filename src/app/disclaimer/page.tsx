import React from "react";
import Link from "next/link";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import { AlertTriangle, ArrowLeft, ShieldAlert, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Risk Disclaimer & Regulatory Disclosure | Blue Tick Trading School",
  description: "Mandatory regulatory disclosures and risk warnings regarding stock and derivatives trading education.",
};

export default function DisclaimerPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5FF7C]/20 text-[#C5FF7C] text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" /> Important Regulatory Disclosure
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Risk & Educational Disclaimer
            </h1>
            <p className="text-sm text-slate-300">
              Please review our mandatory risk notices regarding financial market trading.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">1. Strictly Educational Platform</h2>
              <p>
                <strong>Blue Tick Trading School</strong>, operated by <strong>Amit Gupta</strong>, is an independent educational training provider. We are <strong>NOT registered with the Securities and Exchange Board of India (SEBI)</strong> as an Investment Advisor or Research Analyst.
              </p>
              <p>
                Nothing on this website, in our webinars, YouTube live streams, or private community groups constitutes investment advice, financial planning, portfolio management, or a solicitation to buy or sell securities.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">2. Derivatives (F&O) & Stock Market Risk Warning</h2>
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-900 space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> SEBI Risk Disclosure on Derivatives:
                </p>
                <p className="leading-relaxed">
                  9 out of 10 individual traders in equity Futures and Options Segment incurred net losses. On average, loss makers registered net trading loss close to ₹50,000. Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs.
                </p>
              </div>
              <p className="pt-2">
                Trading in leveraged instruments carries a high level of risk and may not be suitable for all investors. You may lose more than your initial deposit. Only trade with money you can afford to lose.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">3. No Guarantees or Profit Assurances</h2>
              <p>
                We do NOT make any representation or guarantee that any student will or is likely to achieve profits or losses similar to those discussed in mentor case studies or historical chart patterns.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}