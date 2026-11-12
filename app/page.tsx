"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ribbon from "@/components/Ribbon";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import StudioPhilosophy from "@/components/StudioPhilosophy";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import ContactBrief from "@/components/ContactBrief";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F3EC] text-[#171514] selection:bg-[#D9B1AE] selection:text-[#171514]">
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      <Navbar />

      <main className="flex-1 pt-[88px]">
        <Hero isLoading={isLoading} />
        <Ribbon />
        <Portfolio />
        <Services />
        <StudioPhilosophy />
        <Testimonials />
        <Stats />
        <div id="faq">
          <FAQ />
        </div>
        <ContactBrief />
      </main>

      <Footer />
    </div>
  );
}
