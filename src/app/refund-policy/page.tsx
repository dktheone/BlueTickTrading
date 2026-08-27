import React from "react";
import Link from "next/link";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import { HelpCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Cancellation & Refund Policy | Blue Tick Trading School",
  description: "Information regarding webinar access, course enrollments, and refund policies for Blue Tick Trading School.",
};

export default function RefundPolicyPage() {
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
              <HelpCircle className="w-4 h-4" /> Enrollment Policy
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Cancellation & Refund Policy
            </h1>
            <p className="text-sm text-slate-300">
              Clear guidelines on course enrollments, webinar access, and future paid programs.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">1. Free Masterclasses & Webinars</h2>
              <p>
                All introductory live market masterclasses and strategy alignment consultations conducted by <strong>Amit Gupta</strong> and <strong>Blue Tick Trading School</strong> are currently offered free of charge. There are no registration fees or cancellation penalties for these sessions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">2. Future Paid Programs & Payment Gateway Terms</h2>
              <p>
                When premium paid mentorship programs or VIP community subscriptions are enabled with payment gateway checkout:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm">
                <li><strong>Live Mentorship Batches:</strong> Eligible for a 100% refund if cancellation is requested at least 48 hours prior to the official batch start date.</li>
                <li><strong>Digital Downloads & Ebooks:</strong> Due to the immediate access nature of downloadable PDF handbooks, digital goods are non-refundable once downloaded.</li>
                <li><strong>Refund Processing:</strong> Approved refunds are credited back to the original source method (Bank/UPI/Card) within 5-7 business days.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0E3B43]">3. Contact Support</h2>
              <p>
                For any enrollment or scheduling queries, please contact us at: <a href="mailto:support@blueticktrading.com" className="text-[#0E3B43] font-bold underline">support@blueticktrading.com</a> or call +91 98895 49999.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}