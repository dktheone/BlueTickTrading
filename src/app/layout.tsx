import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://blueticktrading.com"),
  title: "Blue Tick Trading School | Master Stock & Options Trading with Amit Gupta",
  description: "Learn institutional price action, BankNifty & Nifty options strategies, and risk management with Amit Gupta at Blue Tick Trading School.",
  keywords: [
    "Blue Tick Trading School",
    "Amit Gupta",
    "stock market course",
    "price action trading",
    "options trading course",
    "banknifty strategy",
    "trading mentor India"
  ],
  authors: [{ name: "Amit Gupta - Blue Tick Trading School" }],
  icons: {
    icon: "/brand/logo-sq.png",
    apple: "/brand/logo-sq.png",
  },
  openGraph: {
    title: "Blue Tick Trading School | Master Online Trading with Amit Gupta",
    description: "Learn proven price action and options trading strategies with live market webinars and mentorship by Amit Gupta.",
    url: "https://blueticktrading.com",
    siteName: "Blue Tick Trading School",
    images: [
      {
        url: "/brand/logo-wide.png",
        width: 1200,
        height: 630,
        alt: "Blue Tick Trading School Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-slate-800 font-sans flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}