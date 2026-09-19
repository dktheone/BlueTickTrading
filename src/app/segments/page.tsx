import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/traderoom/Header";
import Footer from "@/components/traderoom/Footer";
import { 
  BarChart3, Flame, TrendingUp, ShieldAlert, ArrowRight, CheckCircle2, 
  Sparkles, Layers, DollarSign, Zap, Calendar, Target, Globe
} from "lucide-react";

export const metadata = {
  title: "Trading Segments | MCX Commodities, Nifty Index & Options | Blue Tick Trading School",
  description: "Discover how Amit Gupta's Time Cycle strategy applies universally across MCX Commodities (Crude, Gold, Silver), Nifty 50 Index, and disciplined Index Options Buying.",
  keywords: "MCX Crude trading strategy, Natural gas cycle, Nifty options buying, Bank Nifty swing trading, Indian market segments, time cycles",
};

export default function SegmentsPage() {
  const segments = [
    {
      id: "mcx",
      tag: "High-Beta Momentum",
      title: "MCX Commodities",
      subtitle: "Crude Oil • Natural Gas • Silver & Gold",
      accent: "from-amber-500/20 to-orange-500/5",
      borderAccent: "border-amber-500/30",
      badgeColor: "bg-amber-500/15 text-amber-300",
      description: "Commodities are the purest expression of physical supply-demand cycles and macroeconomic rhythm. Because they are driven by real physical shipments and EIA inventory releases, MCX assets exhibit textbook geometric cycle symmetry.",
      keyAssets: [
        {
          name: "Crude Oil (WTI / MCX)",
          cycleType: "28-Day & 56-Day Inventory Wave",
          edge: "Crude respects time harmonics with surgical precision around weekly inventory announcements and seasonal refinery runs.",
        },
        {
          name: "Natural Gas (NG)",
          cycleType: "Extreme Volatility Injection Cycles",
          edge: "The highest beta instrument on Indian exchanges. Time cycles keep you on the right side of explosive 5-8% intraday swings.",
        },
        {
          name: "Silver & Gold (Bullion)",
          cycleType: "Macro Astro-Harmonic Waves",
          edge: "Extended multi-month positional trends ideal for swing traders looking for high-conviction 2,000+ point bullion moves.",
        },
      ],
      advantages: [
        "Trades until 11:30 / 11:55 PM IST (perfect for working professionals).",
        "Immune to Indian domestic corporate earning surprises.",
        "Deep institutional liquidity with minimal slippage.",
      ],
    },
    {
      id: "index",
      tag: "Macro Institutional Structure",
      title: "Index Spot & Swing Trading",
      subtitle: "Nifty 50 • Bank Nifty • Sensex",
      accent: "from-[#2FFFB9]/20 to-[#10505C]/10",
      borderAccent: "border-[#2FFFB9]/40",
      badgeColor: "bg-[#2FFFB9]/15 text-[#2FFFB9]",
      description: "The benchmark indices represent the collective heartbeat of the Indian economy. Rather than scalping random 10-point noise, Time Cycles forecast the multi-day swing turning dates that move Nifty by 300-600 points.",
      keyAssets: [
        {
          name: "Nifty 50 Benchmark",
          cycleType: "Quarterly & 18-Day Cycle Harmonic",
          edge: "Projects major market tops and bottoms weeks ahead of consensus institutional brokerage reports.",
        },
        {
          name: "Bank Nifty (Banking Gauge)",
          cycleType: "High-Beta Financial Sector Rhythms",
          edge: "Anticipates 1,000+ point momentum swings driven by institutional bank rebalancing and RBI policy cycles.",
        },
        {
          name: "Sensex & FinNifty",
          cycleType: "Liquidity Expiry Alignment",
          edge: "Allows disciplined risk-managed exposure across diversified multi-cap sectors.",
        },
      ],
      advantages: [
        "Clear directional trends without the volatility chop of small-cap individual stocks.",
        "Zero company-specific fraud or management governance risk.",
        "Smooth geometric price-time squaring compatibility.",
      ],
    },
    {
      id: "options",
      tag: "Asymmetric Gamma Expansion",
      title: "Index Futures & Options",
      subtitle: "Disciplined Options Buying • Delta & Gamma Timing",
      accent: "from-sky-500/20 to-blue-500/5",
      borderAccent: "border-sky-500/30",
      badgeColor: "bg-sky-500/15 text-sky-300",
      description: "90% of retail option buyers burn capital due to rapid time decay (Theta). Amit Gupta's Time Cycle strategy reverses this trap: buy options ONLY when the cycle turn is imminent and implied volatility (IV) is crushed, capturing explosive 100% to 300% gamma moves.",
      keyAssets: [
        {
          name: "Turn-Date Options Buying",
          cycleType: "Low IV Compression Entry",
          edge: "Enter at the bottom of the volatility curve, turning Greeks in your favor as momentum accelerates.",
        },
        {
          name: "Futures Trend Riding",
          cycleType: "Institutional Orderflow Expansion",
          edge: "Captures multi-day directional trends with trailing cycle stops, eliminating premature exits.",
        },
        {
          name: "OI Unwinding Detection",
          cycleType: "Short-Covering Squeeze Triggers",
          edge: "Pinpoints the exact hour when option writers are forced to panic and cover, triggering massive vertical candles.",
        },
      ],
      advantages: [
        "Strictly limited, predefined financial risk on option purchases.",
        "Eliminates the daily anxiety of holding eroding options in consolidating sideways ranges.",
        "High payoff ratios (1:4+) allowing long-term profitability even with a 50% win rate.",
      ],
    },
  ];

  const comparisonTable = [
    {
      segment: "MCX Crude Oil",
      marketHours: "9:00 AM - 11:30 PM",
      volatility: "High (2-4% Daily)",
      strategy: "Harmonic Swing / Intraday",
      idealFor: "Working Professionals & Momentum Traders",
    },
    {
      segment: "MCX Natural Gas",
      marketHours: "9:00 AM - 11:30 PM",
      volatility: "Very High (4-8% Daily)",
      strategy: "Cycle Breakout / Reversal",
      idealFor: "Experienced Risk-Tolerant Traders",
    },
    {
      segment: "Nifty 50 Index",
      marketHours: "9:15 AM - 3:30 PM",
      volatility: "Medium (0.8-1.5% Daily)",
      strategy: "Positional Turn Dates",
      idealFor: "Capital Preservation & Swing Traders",
    },
    {
      segment: "Bank Nifty",
      marketHours: "9:15 AM - 3:30 PM",
      volatility: "High (1.5-2.5% Daily)",
      strategy: "Sector Wave Riding",
      idealFor: "Active Intraday & Swing Traders",
    },
    {
      segment: "Index Options Buying",
      marketHours: "9:15 AM - 3:30 PM",
      volatility: "High / Gamma Dependent",
      strategy: "IV Compression Turn Entry",
      idealFor: "Small Capital Accounts Seeking Asymmetry",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      <Header />

      <main className="flex-grow">
        {/* HERO HEADER */}
        <section className="relative bg-[#0E3B43] text-white pt-20 pb-24 sm:pb-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2FFFB9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2FFFB9]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#2FFFB9] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" /> Universal Asset Applicability
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
              Master Every Liquid Market.<br />
              <span className="text-[#2FFFB9]">One Unified Mathematical Edge.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Whether you trade evening MCX commodities after work or navigate high-stakes Nifty and Bank Nifty option expiry turns, Time Cycles provide the exact same geometric clarity.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-lg hover:shadow-[#2FFFB9]/20 text-sm sm:text-base group"
              >
                <span>Attend Live Multi-Market Breakdown</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/time-cycles"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-sm sm:text-base"
              >
                <span>Read Time Cycle Philosophy</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION: 3 SEGMENT DEEP DIVES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            
            {segments.map((seg, sIdx) => (
              <div 
                key={seg.id}
                id={seg.id}
                className="p-8 sm:p-12 rounded-3xl bg-[#082126] text-white border border-white/15 shadow-2xl relative overflow-hidden space-y-8"
              >
                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${seg.badgeColor}`}>
                      {seg.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Segment 0{sIdx + 1}</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {seg.title}
                  </h2>
                  <p className="text-sm font-semibold text-[#2FFFB9]">
                    {seg.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {seg.description}
                  </p>
                </div>

                {/* Sub-Assets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 pt-2">
                  {seg.keyAssets.map((asset, aIdx) => (
                    <div 
                      key={aIdx}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2FFFB9]/40 transition-colors space-y-3"
                    >
                      <h4 className="text-base font-bold text-white flex items-center justify-between">
                        <span>{asset.name}</span>
                        <Target className="w-4 h-4 text-[#2FFFB9]" />
                      </h4>
                      <div className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#2FFFB9]/10 text-[#2FFFB9] inline-block">
                        {asset.cycleType}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {asset.edge}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Strategic Advantages Strip */}
                <div className="pt-6 border-t border-white/10 relative z-10">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Key Tactical Advantages
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {seg.advantages.map((adv, advIdx) => (
                      <div key={advIdx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#2FFFB9] shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* SECTION: COMPARISON MATRIX TABLE */}
        <section className="py-20 bg-[#F0F5F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3B43]/10 text-[#0E3B43] text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5 text-[#0E3B43]" /> Strategy Matrix
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3B43]">
                Which Segment Fits Your Trading Routine?
              </h2>
              <p className="text-base text-slate-600">
                Compare trading hours, typical daily volatility, and strategy fit to pick the market that aligns with your capital and lifestyle.
              </p>
            </div>

            <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-4 px-4">Market Segment</th>
                    <th className="py-4 px-4">Exchange Hours</th>
                    <th className="py-4 px-4">Daily Volatility</th>
                    <th className="py-4 px-4">Primary Time Setup</th>
                    <th className="py-4 px-4">Recommended For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {comparisonTable.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-[#0E3B43]">
                        {row.segment}
                      </td>
                      <td className="py-4 px-4 text-slate-600 font-mono text-xs">
                        {row.marketHours}
                      </td>
                      <td className="py-4 px-4 text-slate-800">
                        {row.volatility}
                      </td>
                      <td className="py-4 px-4 text-[#10505C] font-semibold">
                        {row.strategy}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {row.idealFor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* SECTION: CTA BANNER */}
        <section className="py-16 bg-[#0E3B43] text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Watch Amit Gupta Analyze All 3 Segments Live
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Experience real-time chart projection across MCX Crude, Nifty 50, and Options setups in our upcoming live weekend masterclass.
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-[#0E3B43] bg-[#2FFFB9] hover:bg-[#C5FF7C] transition-all shadow-xl hover:shadow-[#2FFFB9]/20 text-base"
              >
                <span>Reserve Free Masterclass Seat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-[11px] text-slate-400">
              Zero Payment Gateway • Purely Educational Masterclass • Strictly No Tips or Calls.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
