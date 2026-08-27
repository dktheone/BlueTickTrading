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
    "trading mentor India",
    "smart money concepts"
  ],
  authors: [{ name: "Amit Gupta - Blue Tick Trading School" }],
  icons: {
    icon: "/brand/logo-sq.png",
    apple: "/brand/logo-sq.png",
  },
  alternates: {
    canonical: "https://blueticktrading.com",
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
  twitter: {
    card: "summary_large_image",
    title: "Blue Tick Trading School | Master Online Trading with Amit Gupta",
    description: "Learn institutional price action, BankNifty & Nifty options strategies from Amit Gupta.",
    images: ["/brand/logo-wide.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Rich Structured Data (JSON-LD) for Search Engines & Knowledge Graph
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://blueticktrading.com/#organization",
        "name": "Blue Tick Trading School",
        "url": "https://blueticktrading.com",
        "logo": "https://blueticktrading.com/brand/logo-wide.png",
        "image": "https://blueticktrading.com/brand/logo-wide.png",
        "description": "Premier financial education academy in India specializing in institutional price action, options trading, and risk management.",
        "telephone": "+91-80048-55663",
        "email": "support@blueticktrading.com",
        "founder": {
          "@type": "Person",
          "@id": "https://blueticktrading.com/#amitgupta",
          "name": "Amit Gupta",
          "jobTitle": "Founder & Head Market Mentor",
          "description": "Professional stock and derivatives trader with 10+ years of active market experience.",
        },
        "sameAs": [
          "https://blueticktrading.com",
        ],
      },
      {
        "@type": "Person",
        "@id": "https://blueticktrading.com/#amitgupta",
        "name": "Amit Gupta",
        "jobTitle": "Lead Trading Mentor",
        "worksFor": {
          "@type": "EducationalOrganization",
          "name": "Blue Tick Trading School",
        },
        "knowsAbout": [
          "Technical Analysis",
          "Price Action Trading",
          "Options Buying and Hedging",
          "Smart Money Concepts (SMC)",
          "Risk Management",
        ],
      },
      {
        "@type": "ItemList",
        "name": "Featured Trading Courses & Handbooks",
        "itemListElement": [
          {
            "@type": "Course",
            "position": 1,
            "name": "Price Action & Technical Analysis Mastery",
            "description": "Complete masterclass in chart patterns, support-resistance dynamics, volume spread analysis, and market structure.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Blue Tick Trading School",
            },
          },
          {
            "@type": "Course",
            "position": 2,
            "name": "BankNifty & Nifty Options Buying Precision",
            "description": "Master high-momentum options buying setups without theta decay traps. Learn timing, Greeks, and zero-hero setups.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Blue Tick Trading School",
            },
          },
          {
            "@type": "Course",
            "position": 3,
            "name": "Institutional Smart Money Concepts (SMC)",
            "description": "Unpack liquidity sweeps, Fair Value Gaps (FVG), order blocks, and 1:3+ high probability trade confluences.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Blue Tick Trading School",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-800 font-sans flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}