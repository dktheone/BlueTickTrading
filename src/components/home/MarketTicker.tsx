import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MarketTicker() {
  const tickerItems = [
    { symbol: "NIFTY 50", price: "24,852.40", change: "+0.92%", isUp: true },
    { symbol: "BANK NIFTY", price: "51,320.15", change: "+1.28%", isUp: true },
    { symbol: "FINNIFTY", price: "23,610.80", change: "+0.65%", isUp: true },
    { symbol: "SENSEX", price: "81,420.50", change: "+0.78%", isUp: true },
    { symbol: "CRUDE OIL", price: "6,240.00", change: "-0.45%", isUp: false },
    { symbol: "GOLD 24K", price: "72,150.00", change: "+0.32%", isUp: true },
    { symbol: "USD/INR", price: "83.92", change: "+0.04%", isUp: true },
    { symbol: "NIFTY IT", price: "41,890.30", change: "+1.42%", isUp: true },
  ];

  return (
    <div className="bg-brand-dark border-y border-brand-teal/40 py-3 overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-8">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-3 py-1 rounded-lg bg-brand-primary/50 border border-brand-teal/30 text-xs font-mono"
          >
            <span className="text-white font-bold tracking-wide">{item.symbol}</span>
            <span className="text-slate-300">{item.price}</span>
            <span
              className={`flex items-center font-semibold ${
                item.isUp ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {item.isUp ? (
                <TrendingUp className="w-3 h-3 mr-0.5" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-0.5" />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
