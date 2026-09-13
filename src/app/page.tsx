import Header from "@/components/traderoom/Header";
import Hero from "@/components/traderoom/Hero";
import FeaturedWebinar from "@/components/traderoom/FeaturedWebinar";
import Services from "@/components/traderoom/Services";
import Community from "@/components/traderoom/Community";
import Benefits from "@/components/traderoom/Benefits";
import TimeCycleTrading from "@/components/traderoom/TimeCycleTrading";
import Testimonials from "@/components/traderoom/Testimonials";
import CTA from "@/components/traderoom/CTA";
import FAQ from "@/components/traderoom/FAQ";
import ContactSection from "@/components/traderoom/ContactSection";
import Footer from "@/components/traderoom/Footer";
import { getActiveWebinar } from "@/lib/db";

export default function HomePage() {
  const activeWebinar = getActiveWebinar();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedWebinar webinar={activeWebinar} />
        <Services />
        <Community />
        <Benefits />
        <TimeCycleTrading />
        <Testimonials />
        <CTA />
        <FAQ />
        <ContactSection webinar={activeWebinar} />
      </main>
      <Footer />
    </div>
  );
}