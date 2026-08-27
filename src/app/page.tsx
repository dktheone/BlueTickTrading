import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import MarketTicker from "@/components/home/MarketTicker";
import FeaturedWebinar from "@/components/home/FeaturedWebinar";
import Features from "@/components/home/Features";
import CoursesGrid from "@/components/home/CoursesGrid";
import StrategySteps from "@/components/home/StrategySteps";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import ContactForm from "@/components/forms/ContactForm";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <MarketTicker />
        <FeaturedWebinar />
        <Features />
        <CoursesGrid />
        <StrategySteps />
        <Testimonials />
        <FAQ />

        {/* Contact & Consultation Section */}
        <section id="contact" className="py-20 bg-[#F0F5F6] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Direct Outreach & Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary text-brand-mint text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Start Your Journey
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
                  Take the First Step Toward Trading Independence
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Whether you are looking to attend our upcoming live Saturday webinar or enroll in full-time mentorship, our counseling team is here to assist you.
                </p>

                {/* Contact Perks */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-mint shrink-0" />
                    <span>Free 15-minute Strategy Alignment Call</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-mint shrink-0" />
                    <span>Detailed PDF Curriculum & Trading Checklist</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-mint shrink-0" />
                    <span>Immediate WhatsApp Group Invite for Live Updates</span>
                  </div>
                </div>

                {/* Direct Contact Cards */}
                <div className="pt-4 space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-mint flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium block">Direct Helpline / WhatsApp</span>
                      <a href="tel:+919889549999" className="text-base font-bold text-brand-dark hover:text-brand-teal transition-colors">
                        +91 98895 49999
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-mint flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium block">Support Email</span>
                      <a href="mailto:support@blueticktrading.com" className="text-base font-bold text-brand-dark hover:text-brand-teal transition-colors">
                        support@blueticktrading.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Protected Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
