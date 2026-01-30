"use client";

import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import BrandMarquee from "@/components/BrandMarquee";
import TalentShowcase from "@/components/TalentShowcase";
import WhyUs from "@/components/WhyUs";

export default function Page() {
  return (
    <main>
      <Hero />
      <BrandMarquee />
      <AboutSection />
      <TalentShowcase />
      <WhyUs />
    </main>
  );
}
