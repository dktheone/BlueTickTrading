import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="/images/traderoom/404-page-1.png"
              alt="404 - Page Not Found"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-[#0E3B43]">
            Oops! Page Not Found
          </h1>
          <p className="text-sm text-slate-600">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-md"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}