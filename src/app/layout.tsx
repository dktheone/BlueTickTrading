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
  title: "BlueTick Trading School | Master Online Trading & Market Strategies",
  description: "Premier trading academy. Learn institutional price action, options strategies, risk management, and live market execution from expert traders.",
  keywords: ["stock market courses", "trading school", "price action", "options trading", "technical analysis", "trading webinar", "BlueTick Trading"],
  authors: [{ name: "BlueTick Trading School" }],
  icons: {
    icon: "/brand/b.png",
  },
  openGraph: {
    title: "BlueTick Trading School | Master Online Trading",
    description: "Learn proven price action and options trading strategies with live market webinars and mentorship.",
    url: "https://blueticktrading.com",
    siteName: "BlueTick Trading School",
    images: [
      {
        url: "/brand/BlueTick Trading School.png",
        width: 1200,
        height: 630,
        alt: "BlueTick Trading School",
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
      <body className="min-h-screen bg-[#F8FAFB] text-slate-800 font-sans flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}