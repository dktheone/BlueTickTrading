import Header from "@/components/traderoom/Header";
import Hero from "@/components/traderoom/Hero";
import Partners from "@/components/traderoom/Partners";
import Services from "@/components/traderoom/Services";
import Community from "@/components/traderoom/Community";
import Benefits from "@/components/traderoom/Benefits";
import Products from "@/components/traderoom/Products";
import Testimonials from "@/components/traderoom/Testimonials";
import CTA from "@/components/traderoom/CTA";
import FAQ from "@/components/traderoom/FAQ";
import ContactSection from "@/components/traderoom/ContactSection";
import Footer from "@/components/traderoom/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Partners />
        <Services />
        <Community />
        <Benefits />
        <Products />
        <Testimonials />
        <CTA />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}